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
    const storiesStatus = [];
    let previousStoryApproved = true; // Upstream gates unlocked for first story
    let nextStoryToGenerate = null;

    // Check upstream phase deliverables
    const phases = [
      { name: 'Phase 0: Context', filename: 'project-context.md' },
      { name: 'Phase 1: Analysis (Brief)', filename: 'brief.md' },
      { name: 'Phase 2: Planning (PRD)', filename: 'prd.md' },
      { name: 'Phase 3A: Architecture', filename: 'architecture.md' },
      { name: 'Phase 3B: UX Design', filename: 'ux.md' },
      { name: 'Phase 3C: Epics & Stories', filename: 'epics.md' }
    ].map(p => {
      const content = findFileContentLocally(p.filename);
      const status = content ? parseStatus(content) : 'Pending';
      return {
        name: p.name,
        filename: p.filename,
        exists: Boolean(content),
        status
      };
    });

    for (let i = 0; i < DEFAULT_PHASE4_STORIES.length; i++) {
      const def = DEFAULT_PHASE4_STORIES[i];
      const content = findFileContentLocally(def.filename);

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
