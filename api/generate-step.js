import fs from 'node:fs';
import path from 'node:path';

const STEP_DEFINITIONS = {
  project_context: {
    agentName: 'Mary Analyst & System Architect',
    skillName: 'acl-generate-project-context',
    phase: 'Phase 0: Baseline & Context',
    folderPath: '_acl-output/planning-artifacts/context',
    filename: 'project-context.md',
    title: 'Project Context & Codebase Conventions'
  },
  brief: {
    agentName: 'Mary Analyst',
    skillName: 'acl-product-brief',
    phase: 'Phase 1: Analysis',
    folderPath: '_acl-output/planning-artifacts/briefs',
    filename: 'brief.md',
    title: 'Product Brief'
  },
  prd: {
    agentName: 'John PM',
    skillName: 'acl-prd',
    phase: 'Phase 2: Planning',
    folderPath: '_acl-output/planning-artifacts/prd',
    filename: 'prd.md',
    title: 'Product Requirements Document (PRD)'
  },
  architecture: {
    agentName: 'Winston Architect',
    skillName: 'acl-architecture',
    phase: 'Phase 3A: Solutioning',
    folderPath: '_acl-output/planning-artifacts/architecture',
    filename: 'architecture.md',
    title: 'Technical Architecture Specification'
  },
  ux: {
    agentName: 'Sally UX Designer',
    skillName: 'acl-ux',
    phase: 'Phase 3B: Solutioning',
    folderPath: '_acl-output/planning-artifacts/ux',
    filename: 'ux.md',
    title: 'UX Specification & Design System'
  },
  epics_stories: {
    agentName: 'Scrum Lead',
    skillName: 'acl-create-epics-and-stories',
    phase: 'Phase 3C: Solutioning',
    folderPath: '_acl-output/planning-artifacts/epics',
    filename: 'epics.md',
    title: 'Epics & User Stories Breakdown'
  },
  implementation_scaffold: {
    agentName: 'Amelia Developer',
    skillName: 'acl-quick-dev',
    phase: 'Phase 4: Implementation',
    folderPath: '_acl-output/planning-artifacts/implementation',
    filename: 'step-01-scaffold.md',
    title: 'Implementation Plan & Project Scaffold'
  },
  quick_dev: {
    agentName: 'Amelia Developer',
    skillName: 'acl-quick-dev',
    phase: 'Phase 4: Implementation',
    folderPath: '_acl-output/planning-artifacts/implementation',
    filename: 'quick-dev.md',
    title: 'Targeted Patch Plan & Quick Implementation'
  },
  story_impl: {
    agentName: 'Amelia Developer',
    skillName: 'acl-quick-dev',
    phase: 'Phase 4: Implementation',
    folderPath: '_acl-output/planning-artifacts/implementation',
    filename: 'story-1.1.md',
    title: 'Story Implementation Specification'
  }
};

// 1. Read the agent's exact SKILL.md instructions
async function loadSkillInstructions(skillName, owner, repo, token) {
  const root = process.cwd();
  const candidatePaths = [
    path.join(root, '.agents', 'skills', skillName, 'SKILL.md'),
    path.join(root, '.claude', 'skills', skillName, 'SKILL.md')
  ];

  for (const p of candidatePaths) {
    if (fs.existsSync(p)) {
      try {
        const content = fs.readFileSync(p, 'utf8');
        if (content && content.trim().length > 0) {
          return content;
        }
      } catch (e) {
        console.warn(`[generate-step] Failed to read local skill ${p}:`, e.message);
      }
    }
  }

  // Fallback to GitHub if running in serverless cloud without local skill files
  if (token || owner) {
    const urls = [
      `https://raw.githubusercontent.com/${owner}/${repo}/main/.agents/skills/${skillName}/SKILL.md`,
      `https://raw.githubusercontent.com/${owner}/${repo}/main/.claude/skills/${skillName}/SKILL.md`
    ];
    for (const url of urls) {
      try {
        const res = await fetch(url, {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        });
        if (res.ok) {
          const text = await res.text();
          if (text && text.trim().length > 0) return text;
        }
      } catch (err) {
        console.warn(`[generate-step] GitHub skill fetch error (${url}):`, err.message);
      }
    }
  }

  return `You are an expert AI agent executing the ${skillName} task in the ACL-ADLC lifecycle. Produce a complete, detailed, production-ready deliverable with full technical and business context.`;
}

// 2. Read all existing upstream deliverables from _acl-output
async function loadUpstreamDeliverables(owner, repo, token) {
  const deliverables = [];
  const root = process.cwd();
  const scanDirs = ['_acl-output', '_acl_output', 'acl-output'];

  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== '.git') {
          walk(full);
        } else if (entry.isFile() && entry.name.endsWith('.md') && !entry.name.startsWith('.')) {
          try {
            const content = fs.readFileSync(full, 'utf8');
            deliverables.push({
              path: path.relative(root, full).replace(/\\/g, '/'),
              filename: entry.name,
              content
            });
          } catch (e) {}
        }
      }
    } catch (e) {}
  }

  for (const d of scanDirs) {
    walk(path.join(root, d));
  }

  // If local files are empty, fetch from GitHub
  if (deliverables.length === 0 && (token || owner)) {
    try {
      const treeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'ACL-Markdown-Studio',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
      if (treeRes.ok) {
        const treeData = await treeRes.json();
        const aclBlobs = (treeData.tree || []).filter(item =>
          item.type === 'blob' &&
          item.path.endsWith('.md') &&
          !path.basename(item.path).startsWith('.') &&
          (item.path.startsWith('_acl-output/') || item.path.startsWith('_acl_output/') || item.path.startsWith('acl-output/'))
        );

        for (const blob of aclBlobs) {
          try {
            const fileRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${blob.path}?ref=main&t=${Date.now()}`, {
              headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'ACL-Markdown-Studio',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
              }
            });
            if (fileRes.ok) {
              const fileData = await fileRes.json();
              const content = Buffer.from(fileData.content, 'base64').toString('utf8');
              deliverables.push({
                path: blob.path,
                filename: path.basename(blob.path),
                content
              });
            }
          } catch (e) {}
        }
      }
    } catch (e) {}
  }

  return deliverables;
}

// 3. Call NVIDIA NIM AI
async function callNvidiaAI(apiKey, model, systemPrompt, userPrompt) {
  const url = 'https://integrate.api.nvidia.com/v1/chat/completions';
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: model || 'meta/llama-3.2-11b-vision-instruct',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.3,
      max_tokens: 4096
    })
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`NVIDIA API responded with status ${res.status}: ${errText}`);
  }

  const data = await res.json();
  const choice = data.choices && data.choices[0];
  if (!choice || !choice.message || !choice.message.content) {
    throw new Error('No content returned from NVIDIA API');
  }

  return choice.message.content;
}

// 4. Save to GitHub via REST API
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
    const {
      stepKey = 'brief',
      mode = 'greenfield',
      projectTitle = 'Fleet 360 Delivery',
      apiKey: reqApiKey,
      model = 'meta/llama-3.2-11b-vision-instruct',
      storyId,
      prompt: customPrompt
    } = req.body || {};

    const apiKey = process.env.NVIDIA_API_KEY || reqApiKey || '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';
    const owner = process.env.GITHUB_OWNER || 'karthick1827';
    const repo = process.env.GITHUB_REPO || 'sample';
    const token = process.env.GITHUB_TOKEN;

    const def = STEP_DEFINITIONS[stepKey] || STEP_DEFINITIONS.brief;
    const filename = (stepKey === 'story_impl' && storyId) ? `story-${storyId}.md` : def.filename;
    const title = (stepKey === 'story_impl' && storyId) ? `Story ${storyId} Implementation Specification` : def.title;

    // STEP A: Read the actual SKILL.md file for this agent
    const skillInstructions = await loadSkillInstructions(def.skillName, owner, repo, token);

    // STEP B: Read all upstream approved deliverables from _acl-output
    const upstreamDeliverables = await loadUpstreamDeliverables(owner, repo, token);

    let upstreamContextText = '';
    if (upstreamDeliverables.length > 0) {
      upstreamContextText = upstreamDeliverables.map(d => `
--------------------------------------------------------------------------------
DOCUMENT: ${d.path} (${d.filename})
--------------------------------------------------------------------------------
${d.content}
`).join('\n\n');
    } else {
      upstreamContextText = 'No prior upstream deliverables found. This is the initial step of the workflow.';
    }

    // STEP C: Construct the complete system prompt and rich user prompt
    const systemPrompt = `${skillInstructions}

You are acting as "${def.agentName}". You must follow all rules, structure templates, validation invariants, and guidelines specified in this skill definition.`;

    const userPrompt = `You are executing the delivery workflow step "${stepKey}" (${title}) for project "${projectTitle}".
Workflow Mode: ${mode}

================================================================================
UPSTREAM APPROVED DELIVERABLES (READ THOROUGHLY AND PRESERVE ALL CONTEXT):
================================================================================
${upstreamContextText}

================================================================================
TASK INSTRUCTIONS:
================================================================================
${customPrompt || `Generate the complete, in-depth, production-grade deliverable for "${title}" following ALL rules and structures in your skill instructions.
- Fully consume, align with, and build directly upon the upstream deliverables provided above.
- Maintain consistent entity names, architecture decisions, API designs, UX concepts, and domain terms from the upstream documents.
- Do NOT generate placeholders or truncated summaries; write full, detailed specifications.`}
`;

    // STEP D: Execute AI generation via NVIDIA NIM API
    let generatedBody = '';
    try {
      if (apiKey) {
        generatedBody = await callNvidiaAI(apiKey, model, systemPrompt, userPrompt);
      }
    } catch (aiErr) {
      console.error('[generate-step] NVIDIA API generation error:', aiErr.message);
      throw new Error(`AI Generation failed: ${aiErr.message}`);
    }

    if (!generatedBody || generatedBody.trim().length === 0) {
      throw new Error('NVIDIA AI returned an empty response.');
    }

    // Strip existing frontmatter if the model included duplicate frontmatter
    const cleanBody = generatedBody.replace(/^---[\s\S]*?---\n*/, '').trim();

    const frontmatter = `---
status: In Review
phase: ${def.phase}
workflow_mode: ${mode}
created_at: ${new Date().toISOString()}
reviewed_by: Pending Manager Review
step_key: ${stepKey}
title: "${title}"
skill_source: "${def.skillName}/SKILL.md"
upstream_documents_read: [${upstreamDeliverables.map(d => `"${d.filename}"`).join(', ')}]
---

`;

    const fullContent = frontmatter + cleanBody;

    // STEP E: Save to local filesystem
    try {
      const targetDir = path.resolve(process.cwd(), def.folderPath);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      fs.writeFileSync(path.join(targetDir, filename), fullContent, 'utf8');
    } catch (fsErr) {
      console.warn('[generate-step] Local fs write warning (expected in serverless):', fsErr.message);
    }

    // STEP F: Save to GitHub
    const filePath = `${def.folderPath}/${filename}`.replace(/^\/+/, '');
    const gitResult = await saveToGitHub(
      owner,
      repo,
      token,
      filePath,
      fullContent,
      `docs: generate ${filename} via ${def.agentName} [In Review]`
    );

    const fileId = `${def.folderPath}_${filename}`.replace(/[^a-zA-Z0-9_-]/g, '_');

    return res.status(200).json({
      success: true,
      agentName: def.agentName,
      skillUsed: `${def.skillName}/SKILL.md`,
      upstreamDocumentsRead: upstreamDeliverables.map(d => d.filename),
      githubSaved: gitResult.saved,
      file: {
        id: fileId,
        folderPath: def.folderPath,
        filename: filename,
        status: 'In Review',
        updatedAt: new Date().toISOString(),
        content: fullContent
      }
    });
  } catch (err) {
    console.error('[generate-step] Error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
