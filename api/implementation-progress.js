import fs from 'node:fs';
import path from 'node:path';

const DEFAULT_PHASE4_STORIES = [
  { id: '1.1', epicId: 'Epic-1', title: 'Core Login & SSO Authentication UI', folder: '4-implementation/acl-quick-dev', filename: 'story-1.1.md' },
  { id: '1.2', epicId: 'Epic-1', title: 'Self-Service Password Reset & Modal', folder: '4-implementation/acl-quick-dev', filename: 'story-1.2.md' },
  { id: '2.1', epicId: 'Epic-2', title: 'Domain Navigation & Pillar Launchpad Cards', folder: '4-implementation/acl-quick-dev', filename: 'story-2.1.md' },
  { id: '2.2', epicId: 'Epic-2', title: 'Module Interactive Preview Modal', folder: '4-implementation/acl-quick-dev', filename: 'story-2.2.md' },
  { id: '3.1', epicId: 'Epic-3', title: 'Live Markdown Studio & Visual Preview', folder: '4-implementation/acl-quick-dev', filename: 'story-3.1.md' },
  { id: '3.2', epicId: 'Epic-3', title: 'AI Step Generator & Micro-Gate Validation', folder: '4-implementation/acl-quick-dev', filename: 'story-3.2.md' }
];

function getEnv(key, fallback = '') {
  if (process.env[key]) return process.env[key];
  try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const lines = fs.readFileSync(envPath, 'utf8').split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
          const [k, ...v] = trimmed.split('=');
          if (k.trim() === key) {
            return v.join('=').trim().replace(/^["']|["']$/g, '');
          }
        }
      }
    }
  } catch (e) {}
  return fallback;
}

function parseStatus(content) {
  if (!content) return 'Pending';
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

function findFileContentLocally(filename) {
  const root = process.cwd();
  const searchDirs = ['_acl-output', '_acl_output', 'acl-output'];

  for (const dir of searchDirs) {
    const fullDir = path.join(root, dir);
    if (!fs.existsSync(fullDir)) continue;

    function walk(current) {
      const entries = fs.readdirSync(current, { withFileTypes: true });
      for (const entry of entries) {
        const full = path.join(current, entry.name);
        if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== '.git') {
          const res = walk(full);
          if (res) return res;
        } else if (entry.isFile() && entry.name.toLowerCase() === filename.toLowerCase()) {
          return fs.readFileSync(full, 'utf8');
        }
      }
      return null;
    }

    const found = walk(fullDir);
    if (found) return found;
  }
  return null;
}

async function findFileContentFromGitHub(filename, owner, repo, token) {
  try {
    const treeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1&t=${Date.now()}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'ACL-Markdown-Studio',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      }
    });

    if (!treeRes.ok) return null;
    const data = await treeRes.json();
    const match = (data.tree || []).find(item =>
      item.type === 'blob' &&
      path.basename(item.path).toLowerCase() === filename.toLowerCase() &&
      (item.path.startsWith('_acl-output/') || item.path.startsWith('_acl_output/') || item.path.startsWith('acl-output/'))
    );

    if (match) {
      const fileRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${match.path}?ref=main&t=${Date.now()}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'ACL-Markdown-Studio',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
      if (fileRes.ok) {
        const fileData = await fileRes.json();
        return Buffer.from(fileData.content, 'base64').toString('utf8');
      }
    }
  } catch (e) {}
  return null;
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
    const token = getEnv('GITHUB_TOKEN');
    const owner = getEnv('GITHUB_OWNER', 'karthick1827');
    const repo = getEnv('GITHUB_REPO', 'sample');

    const storiesStatus = [];
    let previousStoryApproved = true; // Upstream gates unlocked for first story
    let nextStoryToGenerate = null;

    // Check upstream phase deliverables
    const phasesDefs = [
      { name: 'Phase 0: Context', filename: 'project-context.md' },
      { name: 'Phase 1: Analysis (Brief)', filename: 'brief.md' },
      { name: 'Phase 2: Planning (PRD)', filename: 'prd.md' },
      { name: 'Phase 3A: Architecture', filename: 'architecture.md' },
      { name: 'Phase 3B: UX Design', filename: 'ux.md' },
      { name: 'Phase 3C: Epics & Stories', filename: 'epics.md' }
    ];

    const phases = [];
    for (const p of phasesDefs) {
      let content = null;
      if (token) {
        content = await findFileContentFromGitHub(p.filename, owner, repo, token);
      }
      if (!content) {
        content = findFileContentLocally(p.filename);
      }

      const status = content ? parseStatus(content) : 'Pending';
      phases.push({
        name: p.name,
        filename: p.filename,
        exists: Boolean(content),
        status
      });
    }

    for (let i = 0; i < DEFAULT_PHASE4_STORIES.length; i++) {
      const def = DEFAULT_PHASE4_STORIES[i];
      let content = null;
      if (token) {
        content = await findFileContentFromGitHub(def.filename, owner, repo, token);
      }
      if (!content) {
        content = findFileContentLocally(def.filename);
      }

      let status = 'Pending';
      let fileExists = false;

      if (content) {
        fileExists = true;
        status = parseStatus(content);
      }

      const isApproved = status === 'Approved';
      const isLocked = !previousStoryApproved;

      storiesStatus.push({
        id: def.id,
        epicId: def.epicId,
        title: def.title,
        filename: def.filename,
        folder: def.folder,
        fileExists,
        status,
        locked: isLocked,
        isApproved
      });

      if (!isApproved && !nextStoryToGenerate) {
        nextStoryToGenerate = {
          id: def.id,
          epicId: def.epicId,
          title: def.title,
          filename: def.filename
        };
      }

      // Micro-gate: The NEXT story is only unlocked if THIS story is approved
      previousStoryApproved = isApproved;
    }

    const totalStories = storiesStatus.length;
    const completedStories = storiesStatus.filter(s => s.isApproved).length;
    const allCompleted = completedStories === totalStories && totalStories > 0;

    return res.status(200).json({
      success: true,
      progress: {
        totalStories,
        completedStories,
        percentComplete: Math.round((completedStories / totalStories) * 100),
        allCompleted,
        nextStoryToGenerate,
        stories: storiesStatus,
        phases
      }
    });
  } catch (err) {
    console.error('[implementation-progress] Error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
