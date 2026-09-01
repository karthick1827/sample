import fs from 'node:fs';
import path from 'node:path';

const STEP_DEFINITIONS = {
  project_context: {
    agentName: 'Mary Analyst & System Architect',
    phase: 'Phase 0: Baseline & Context',
    folderPath: '_acl-output/planning-artifacts/context',
    filename: 'project-context.md',
    title: 'Project Context & Codebase Conventions',
    systemPrompt: 'You are Mary Analyst, an expert technical business analyst and systems architect producing a project context and codebase conventions deliverable.',
    defaultTemplate: (title, mode) => `# Project Context & Codebase Conventions: ${title}

## Executive Summary
This document establishes the architecture baseline, technology stack, design system tokens, and development conventions for ${title}.

## Technology Stack
- **Frontend Framework:** React 19 + Vite 8
- **Language / Runtime:** JavaScript ES Modules (ESM)
- **Styling Architecture:** Modern CSS Design Tokens with CSS Variables
- **Component Architecture:** Atomic modular components with strict separation of concerns
- **State Management:** React Context + Hooks
- **Build / Tooling:** Rolldown Babel Compiler, Oxlint

## Codebase Structure
\`\`\`
src/
  ├── components/       # Reusable UI & Common layout components
  ├── features/         # Domain-specific feature modules (auth, landing)
  ├── context/          # Global application state contexts
  ├── pages/            # Top-level route pages (LoginPage, LandingPage, DomainPage)
  └── styles/           # CSS design tokens, auth, and landing stylesheets
\`\`\`

## Architecture & Code Conventions
1. **Separation of Concerns:** Business logic in contexts/hooks, pure presentation in components.
2. **Design Tokens:** Strict adherence to color palette, typography hierarchy, and spacing tokens.
3. **Micro-Gate Governance:** All deliverables require formal review and approval before downstream phase execution.
`
  },
  brief: {
    agentName: 'Mary Analyst',
    phase: 'Phase 1: Analysis',
    folderPath: '_acl-output/planning-artifacts/briefs',
    filename: 'brief.md',
    title: 'Product Brief',
    systemPrompt: 'You are Mary Analyst, an expert product strategist generating a comprehensive Product Brief.',
    defaultTemplate: (title, mode) => `# Product Brief: ${title}

## 1. Executive Summary
${title} is an enterprise-grade IoT fleet and intelligent facility management platform engineered to deliver end-to-end visibility and real-time operational control.

## 2. Problem Statement & Business Opportunity
- **Operational Friction:** Commercial facility operations are fragmented across multiple point solutions.
- **Triage Delay:** Operators lack a unified dashboard to rapidly triage hardware alerts and dispatch field technicians.
- **Enterprise Governance:** Organizations require fine-grained access control (RBAC) and audited sign-off gates.

## 3. Target Audience & Personas
- **Facility Managers:** Monitor multi-site asset footprints and optimize HVAC energy consumption.
- **Field Engineers:** Rapidly diagnose equipment fault codes, view telemetry streams, and update setpoints.
- **Enterprise Administrators:** Manage user permissions, SSO integrations, and compliance policies.

## 4. Key Value Pillars
- **Devices:** Real-time RTU/HVAC telemetries, operational setpoints, and diagnostic health scores.
- **Sites:** Multi-location geographical mapping and 3D architectural floor plans.
- **Users:** Enterprise RBAC, security auditing, and team provisioning.

## 5. Success Metrics (KPIs)
- Reduce average fault triage time by 45%.
- Achieve 99.9% uptime for telemetry ingestion.
- Zero-friction authentication with SSO compliance.
`
  },
  prd: {
    agentName: 'John PM',
    phase: 'Phase 2: Planning',
    folderPath: '_acl-output/planning-artifacts/prd',
    filename: 'prd.md',
    title: 'Product Requirements Document (PRD)',
    systemPrompt: 'You are John PM, a principal Product Manager authoring a detailed PRD with requirements, user stories, and acceptance criteria.',
    defaultTemplate: (title, mode) => `# Product Requirements Document: ${title}

## 1. Product Overview & Goals
Deliver a modern, highly reliable portal for ${title} comprising secure authentication and intuitive domain triage launchpads.

## 2. Functional Requirements
### FR-1: Authentication & Identity
- Email and password sign-in with client-side validation.
- Enterprise SSO integration support.
- Self-service password reset workflow with confirmation modal.
- Remember-me persistent session tokens.

### FR-2: Domain Landing Hub
- High-contrast navigation cards for Devices, Sites, and Users.
- Module preview modals with deep-link navigation.
- Responsive layout adapting smoothly to desktop and mobile viewport sizes.

### FR-3: Markdown Studio & Gate Governance
- In-browser markdown editing and live rendering.
- Visual status toggling (Approved, In Review, Rejected).
- Automated phase gate verification locking downstream steps until approved.

## 3. Non-Functional Requirements
- **Performance:** First Contentful Paint (FCP) < 1.0s; Lighthouse score > 90.
- **Accessibility:** WCAG 2.1 AA compliant contrast ratios and keyboard navigation.
- **Security:** CSRF protection, secure HTTP-only headers, sanitized markdown output.
`
  },
  architecture: {
    agentName: 'Winston Architect',
    phase: 'Phase 3A: Solutioning',
    folderPath: '_acl-output/planning-artifacts/architecture',
    filename: 'architecture.md',
    title: 'Technical Architecture Specification',
    systemPrompt: 'You are Winston Architect, a Principal Systems Architect producing technical architecture specifications.',
    defaultTemplate: (title, mode) => `# Technical Architecture Specification: ${title}

## 1. Architecture Spine & Principles
The architecture follows a decoupled, component-driven client architecture backed by serverless micro-services.

\`\`\`mermaid
graph TD
    Client[React 19 SPA / Vite] --> API[Vercel Serverless Functions]
    API --> LLM[NVIDIA NIM AI Gateway]
    API --> GitHub[GitHub REST API Storage]
    Client --> AuthCtx[Auth & Session Context]
\`\`\`

## 2. Data Flow & Invariants
- **Stateless Execution:** Serverless functions operate statelessly with GitHub repository serving as the single source of truth for planning deliverables.
- **Micro-Gate Locking:** Downstream phase deliverables cannot be advanced without explicit manager sign-off on upstream milestones.
- **Resilient Fallbacks:** Client and API gracefully degrade to structured templates if upstream AI services encounter timeouts.

## 3. Security & Compliance
- Environment variable isolation for sensitive API tokens (NVIDIA_API_KEY, GITHUB_TOKEN).
- Token sanitization and input validation on all API boundaries.
`
  },
  ux: {
    agentName: 'Sally UX Designer',
    phase: 'Phase 3B: Solutioning',
    folderPath: '_acl-output/planning-artifacts/ux',
    filename: 'ux.md',
    title: 'UX Specification & Design System',
    systemPrompt: 'You are Sally UX Designer, an expert UI/UX Lead creating UX specifications and design system tokens.',
    defaultTemplate: (title, mode) => `# UX Specification & Design System: ${title}

## 1. Design Direction & Visual Identity
- **Theme:** Industrial modern high-contrast dark theme with electric teal/emerald accents.
- **Typography:** Inter / system-ui typography hierarchy for maximum readability under field conditions.
- **Elevation & Surfaces:** Multi-layer card depth with subtle glassmorphism and crisp borders.

## 2. Key Screen Blueprints
1. **Authentication Portal:** Split-screen layout featuring equipment visual branding and high-focus login card.
2. **Landing Launchpad:** Clean greeting hero banner followed by a 3-column responsive card grid.
3. **Module Modal:** Contextual overlay with feature highlights and 1-click domain transition.
`
  },
  epics_stories: {
    agentName: 'Scrum Lead',
    phase: 'Phase 3C: Solutioning',
    folderPath: '_acl-output/planning-artifacts/epics',
    filename: 'epics.md',
    title: 'Epics & User Stories Breakdown',
    systemPrompt: 'You are Scrum Lead, breaking down product requirements into detailed Agile Epics, User Stories, and Acceptance Criteria.',
    defaultTemplate: (title, mode) => `# Epics & User Stories Breakdown: ${title}

## Epic 1: Authentication & Access Control
- **Story 1.1: Core Login & Authentication UI**
  - *Description:* Implement split-screen login page with form validation and error handling.
  - *Acceptance Criteria:* Valid credentials grant session; invalid input displays clear inline errors.
- **Story 1.2: Password Reset & Modal Interaction**
  - *Description:* Implement self-service password recovery modal with email confirmation.

## Epic 2: Domain Navigation Launchpad
- **Story 2.1: Domain Navigation Cards**
  - *Description:* Implement high-contrast cards for Devices, Sites, and Users.
- **Story 2.2: Module Preview & Deep Linking**
  - *Description:* Implement interactive module preview modal with routing transitions.

## Epic 3: Studio & Governance Engine
- **Story 3.1: Live Markdown Studio**
  - *Description:* Implement split-screen visual markdown editor and viewer.
- **Story 3.2: AI Step Generator & Micro-Gate Validation**
  - *Description:* Connect AI generation pipeline with phase gate approval checks.
`
  },
  implementation_scaffold: {
    agentName: 'Amelia Developer',
    phase: 'Phase 4: Implementation',
    folderPath: '_acl-output/planning-artifacts/implementation',
    filename: 'step-01-scaffold.md',
    title: 'Implementation Plan & Project Scaffold',
    systemPrompt: 'You are Amelia Developer, a Senior Software Engineer defining technical implementation steps.',
    defaultTemplate: (title, mode) => `# Implementation Plan & Project Scaffold: ${title}

## Technical Setup & Dependencies
- Configure React 19, Vite 8, Babel compiler plugins.
- Setup directory tree for components, features, and context providers.

## Implementation Tasks
1. Verify build pipeline and linting configurations.
2. Scaffold base layout, split container, and token variables.
3. Connect router pages and context state.
`
  },
  quick_dev: {
    agentName: 'Amelia Developer',
    phase: 'Phase 4: Implementation',
    folderPath: '_acl-output/planning-artifacts/implementation',
    filename: 'quick-dev.md',
    title: 'Targeted Patch Plan & Quick Implementation',
    systemPrompt: 'You are Amelia Developer, writing targeted patch implementation specifications.',
    defaultTemplate: (title, mode) => `# Targeted Patch Plan: ${title}

## Patch Scope
Targeted module improvements and verification tests for ${title}.

## Execution Checklist
- [x] Implement component updates
- [x] Verify responsive styling
- [x] Run test verification
`
  },
  story_impl: {
    agentName: 'Amelia Developer',
    phase: 'Phase 4: Implementation',
    folderPath: '_acl-output/planning-artifacts/implementation',
    filename: 'story-1.1.md',
    title: 'Story 1.1 Implementation Specification',
    systemPrompt: 'You are Amelia Developer, creating a user story implementation specification with test criteria.',
    defaultTemplate: (title, mode, storyId) => `# Story ${storyId || '1.1'} Implementation Specification

## Story Summary
Implementation of Story ${storyId || '1.1'} for ${title}.

## Implementation Details
- Component implementation in \`src/features/\`
- Style definitions adhering to design tokens
- Unit and integration tests

## Acceptance Verification
- [x] All acceptance criteria met
- [x] Micro-gate review ready
`
  }
};

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
    const def = STEP_DEFINITIONS[stepKey] || STEP_DEFINITIONS.brief;
    const filename = (stepKey === 'story_impl' && storyId) ? `story-${storyId}.md` : def.filename;

    let generatedBody = '';
    const userPrompt = customPrompt || `Generate the complete, professional deliverable for ${def.title} for project "${projectTitle}". Workflow Mode: ${mode}.`;

    try {
      if (apiKey) {
        generatedBody = await callNvidiaAI(apiKey, model, def.systemPrompt, userPrompt);
      }
    } catch (aiErr) {
      console.warn('[generate-step] AI generation warning, falling back to structured template:', aiErr.message);
    }

    if (!generatedBody || generatedBody.trim().length === 0) {
      generatedBody = def.defaultTemplate(projectTitle, mode, storyId);
    }

    // Strip existing frontmatter if LLM generated any duplicate
    const cleanBody = generatedBody.replace(/^---[\s\S]*?---\n*/, '').trim();

    const frontmatter = `---
status: In Review
phase: ${def.phase}
workflow_mode: ${mode}
created_at: ${new Date().toISOString()}
reviewed_by: Pending Manager Review
step_key: ${stepKey}
title: "${def.title}"
---

`;

    const fullContent = frontmatter + cleanBody;

    // Save to local filesystem if accessible
    try {
      const targetDir = path.resolve(process.cwd(), def.folderPath);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      fs.writeFileSync(path.join(targetDir, filename), fullContent, 'utf8');
    } catch (fsErr) {
      console.warn('[generate-step] Local fs write warning (normal in serverless):', fsErr.message);
    }

    // Save to GitHub if configured
    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_OWNER || 'karthick1827';
    const repo = process.env.GITHUB_REPO || 'sample';
    const filePath = `${def.folderPath}/${filename}`.replace(/^\/+/, '');

    const gitResult = await saveToGitHub(
      owner,
      repo,
      token,
      filePath,
      fullContent,
      `docs: generate ${filename} via AI [In Review]`
    );

    const fileId = `${def.folderPath}_${filename}`.replace(/[^a-zA-Z0-9_-]/g, '_');

    return res.status(200).json({
      success: true,
      agentName: def.agentName,
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
