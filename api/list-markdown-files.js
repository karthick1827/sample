import fs from 'node:fs';
import path from 'node:path';

const IGNORED_FILENAMES = new Set([
  'skill.md',
  'agents.md',
  'readme.md',
  'changelog.md',
  'claude.md',
  'security.md',
  'contributing.md',
  'addendum.md',
  'sources.md',
  'review-triage.md',
  'patch-plan.md',
  'research.md',
  '.memlog.md'
]);

function isAllowedMarkdownFile(relPath, filename) {
  const normRel = relPath.replace(/\\/g, '/').toLowerCase();
  const lowerName = filename.toLowerCase();

  if (IGNORED_FILENAMES.has(lowerName)) return false;
  if (lowerName.startsWith('.')) return false;

  // Must strictly be inside _acl-output / _acl_output / acl-output
  const isAclOutput =
    normRel.startsWith('_acl-output/') ||
    normRel.startsWith('_acl_output/') ||
    normRel.startsWith('acl-output/');

  if (!isAclOutput) return false;

  // Reject anything from internal framework / skill configs
  if (
    normRel.includes('.agents/') ||
    normRel.includes('.claude/') ||
    normRel.includes('_acl/') ||
    normRel.includes('.github/') ||
    normRel.includes('node_modules/')
  ) {
    return false;
  }

  return true;
}

function parseStatus(content) {
  if (!content) return 'In Review';
  const match = content.match(/status:\s*([^\n\r]+)/i);
  if (match && match[1]) {
    const raw = match[1].trim().toLowerCase();
    if (raw.includes('accept') || raw.includes('approved') || raw.includes('updated') || raw.includes('final')) {
      return 'Approved';
    }
    if (raw.includes('reject')) {
      return 'Rejected';
    }
    return 'In Review';
  }
  return 'In Review';
}

function collectLocalMarkdown(currentDir, relPrefix, mdFiles) {
  if (!fs.existsSync(currentDir)) return;
  try {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(currentDir, entry.name);
      const rel = relPrefix ? `${relPrefix}/${entry.name}` : entry.name;
      if (entry.isDirectory()) {
        if (
          entry.name !== 'node_modules' &&
          entry.name !== '.git' &&
          entry.name !== '.vscode' &&
          entry.name !== '.agents' &&
          entry.name !== '.claude' &&
          entry.name !== '_acl'
        ) {
          collectLocalMarkdown(full, rel, mdFiles);
        }
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        if (!isAllowedMarkdownFile(rel, entry.name)) continue;

        try {
          const content = fs.readFileSync(full, 'utf8');
          const stat = fs.statSync(full);
          const status = parseStatus(content);
          mdFiles.push({
            id: rel.replace(/[^a-zA-Z0-9_-]/g, '_'),
            folderPath: path.dirname(rel).replace(/\\/g, '/'),
            filename: entry.name,
            status,
            updatedAt: stat.mtime ? stat.mtime.toISOString() : new Date().toISOString(),
            content
          });
        } catch (readErr) {
          console.warn(`[list-markdown-files] Error reading ${full}:`, readErr.message);
        }
      }
    }
  } catch (dirErr) {
    console.warn(`[list-markdown-files] Error scanning ${currentDir}:`, dirErr.message);
  }
}

async function fetchGitHubMarkdown(owner, repo, token) {
  const mdFiles = [];
  try {
    const treeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'ACL-Markdown-Studio',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      }
    });

    if (!treeRes.ok) {
      console.warn(`[list-markdown-files] GitHub tree request failed with status: ${treeRes.status}`);
      return mdFiles;
    }

    const treeData = await treeRes.json();
    if (!treeData.tree || !Array.isArray(treeData.tree)) return mdFiles;

    // Strictly filter to ONLY _acl-output deliverables
    const mdItems = treeData.tree.filter(item =>
      item.type === 'blob' &&
      item.path.endsWith('.md') &&
      isAllowedMarkdownFile(item.path, path.basename(item.path))
    );

    for (const item of mdItems) {
      try {
        const rawRes = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/main/${item.path}`, {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        });
        if (rawRes.ok) {
          const content = await rawRes.text();
          const folderPath = path.dirname(item.path).replace(/\\/g, '/');
          const filename = path.basename(item.path);
          mdFiles.push({
            id: item.path.replace(/[^a-zA-Z0-9_-]/g, '_'),
            folderPath: folderPath === '.' ? '' : folderPath,
            filename,
            status: parseStatus(content),
            updatedAt: new Date().toISOString(),
            content
          });
        }
      } catch (fileErr) {
        console.warn(`[list-markdown-files] Failed to fetch ${item.path}:`, fileErr.message);
      }
    }
  } catch (err) {
    console.warn('[list-markdown-files] GitHub fetch error:', err.message);
  }
  return mdFiles;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const mdFiles = [];
    const scanCandidates = ['_acl-output', '_acl_output', 'acl-output'];
    const projectRoot = process.cwd();

    for (const folder of scanCandidates) {
      const fullPath = path.join(projectRoot, folder);
      collectLocalMarkdown(fullPath, folder, mdFiles);
    }

    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_OWNER || 'karthick1827';
    const repo = process.env.GITHUB_REPO || 'sample';

    // If local files are empty or GitHub token is provided, sync with GitHub repo
    if (mdFiles.length === 0 && (token || owner)) {
      const remoteFiles = await fetchGitHubMarkdown(owner, repo, token);
      for (const rf of remoteFiles) {
        if (!mdFiles.some(f => f.id === rf.id)) {
          mdFiles.push(rf);
        }
      }
    }

    return res.status(200).json({ files: mdFiles });
  } catch (err) {
    console.error('[list-markdown-files] Error:', err);
    return res.status(500).json({ files: [], error: err.message });
  }
}
