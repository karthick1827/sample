import fs from 'node:fs';
import path from 'node:path';
import { exec } from 'node:child_process';

async function saveToGitHub(owner, repo, token, filePath, content, commitMessage) {
  if (!token) return { saved: false, reason: 'No GITHUB_TOKEN configured' };
  try {
    let existingSha = undefined;
    const getRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'ACL-Markdown-Studio'
      }
    });

    if (getRes.ok) {
      const existingData = await getRes.json();
      existingSha = existingData.sha;
    }

    const putRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'ACL-Markdown-Studio'
      },
      body: JSON.stringify({
        message: commitMessage,
        content: Buffer.from(content, 'utf8').toString('base64'),
        sha: existingSha
      })
    });

    if (putRes.ok) {
      return { saved: true };
    } else {
      const errText = await putRes.text();
      return { saved: false, error: errText };
    }
  } catch (err) {
    return { saved: false, error: err.message };
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { folderPath, filename, content, status, autoPush } = req.body || {};

    if (!filename || content === undefined) {
      return res.status(400).json({ success: false, error: 'Filename and content are required' });
    }

    const projectRoot = process.cwd();
    const targetDir = path.resolve(projectRoot, folderPath || '');
    let localSaved = false;

    // Try saving to local filesystem (e.g. in local development mode)
    try {
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      const targetFile = path.join(targetDir, filename);
      fs.writeFileSync(targetFile, content, 'utf8');
      localSaved = true;
    } catch (fsErr) {
      console.warn('[save-markdown] Local filesystem write warning (expected in serverless):', fsErr.message);
    }

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

    // Save to GitHub via API
    const token = getEnv('GITHUB_TOKEN');
    const owner = getEnv('GITHUB_OWNER', 'karthick1827');
    const repo = getEnv('GITHUB_REPO', 'sample');
    const relativePath = (folderPath ? `${folderPath}/${filename}` : filename).replace(/^\/+/, '');

    const commitMsg = `docs: update ${filename} [${status || 'Approved'}]`;
    const gitResult = await saveToGitHub(owner, repo, token, relativePath, content, commitMsg);

    // Optional local git commit & push if running in local development
    if (autoPush && localSaved) {
      const gitCmd = `git add "${path.join(targetDir, filename)}" && git commit -m "${commitMsg}" && git push`;
      const env = {
        ...process.env,
        PATH: (process.env.PATH || '') + ';C:\\Users\\karthick.natarajan\\AppData\\Local\\Programs\\Git\\cmd;C:\\Program Files\\Git\\cmd'
      };
      exec(gitCmd, { cwd: projectRoot, env }, (gitErr) => {
        if (gitErr) {
          console.warn('[save-markdown] Local git push warning:', gitErr.message);
        }
      });
    }

    return res.status(200).json({
      success: true,
      path: path.join(folderPath || '', filename).replace(/\\/g, '/'),
      status: status || 'In Review',
      localSaved,
      githubSaved: gitResult.saved,
      githubError: gitResult.error || undefined
    });
  } catch (err) {
    console.error('[save-markdown] Error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
