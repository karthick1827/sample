---
status: In Review
phase: Phase 2: Planning
workflow_mode: greenfield
created_at: 2026-09-01T09:36:47.902Z
reviewed_by: Pending Manager Review
step_key: prd
title: "Product Requirements Document (PRD)"
skill_source: "acl-prd/SKILL.md"
upstream_documents_read: ["brief.md"]
---

**Product Requirements Document (PRD) for Fleet 360 Login Portal and Landing Experience**

**Document ID:** PRD-Fleet-360-2026-09-01
**Status:** In Review
**Created:** 2026-09-01
**Updated:** 2026-09-01
**Reviewers:** [List of reviewers assigned to this PRD]

**Table of Contents**

1. [Executive Summary](#executive-summary)
2. [Problem Statement](#problem-statement)
3. [Solution Overview](#solution-overview)
4. [Key Experience Elements](#key-experience-elements)
5. [What Makes This Different](#what-makes-this-different)
6. [Who This Serves](#who-this-serves)
7. [Success Criteria & Metrics](#success-criteria--metrics)
8. [Scope](#scope)
9. [Vision](#vision)

**Executive Summary**

Fleet 360 is an enterprise-grade IoT fleet and intelligent facility management platform designed to give building operators, facility managers, and enterprise administrators complete visibility and granular control over commercial HVAC, refrigeration, and energy assets. The Login Portal and Landing Experience serves as the initial mission-critical gateway and triage terminal for Fleet 360, delivering a secure, branded authentication entry point paired with an intuitive post-login launchpad.

**Problem Statement**

Enterprise fleet, facility, and HVAC operations are traditionally plagued by fragmented interfaces, high cognitive load, and cumbersome authentication workflows:

1. **Disjointed Access & High Cognitive Friction:** Operations personnel, field technicians, and facility directors often manage dozens of heterogeneous systems. A complex or generic onboarding/login surface slows daily response times during critical hardware fault events.
2. **Context Switching & "Where Do I Go?" Paralysis:** Directing every user to a monolithic, noisy dashboard upon login creates disorientation. Facility managers need immediate access to site floor plans, field service technicians need quick access to specific RTU/device units, and IT administrators need immediate user management tools.
3. **Enterprise Security & Compliance Obligations:** Commercial facilities require secure, authenticated entry compliant with organizational policies, explicit terms of service acceptance, and robust password recovery mechanisms.

**Solution Overview**

Fleet 360 resolves these friction points through a streamlined, two-tier entry architecture:

```mermaid
graph TD
A[Unauthenticated User] --> B[Fleet 360 Login Portal]
B -->|Email / Password Auth & SSO| C{Authentication Success}
C -->|New Session / Triage| D[Fleet 360 Landing Hub]
D -->|Card 1: Manage Devices| E[Devices Module: RTU/HVAC Telemetry & Controls]
D -->|Card 2: Manage Sites| F[Sites Module: 3D Multi-Floor & Facility Layouts]
D -->|Card 3: Manage Users| G[User Management: RBAC & Team Provisioning]
B -->|Forgot Password| H[Self-Service Credential Reset Flow]
```

**Key Experience Elements**

1. **Branded, High-Trust Authentication Portal (`/login`):**
	* Clean split-screen visual presentation combining commercial HVAC/industrial equipment imagery with a focused login interface.
	* Enterprise single-sign-on (SSO) and email/password authentication.
	* Inline self-service credential recovery ("Forgot Password?").
	* Explicit compliance notice linking to corporate Terms & Conditions and Privacy Policies.
	* Prominent brand attribution (*"Powered by ACE Digital"*).
2. **Focused Action-Oriented Landing Hub (`/landing`):**
	* Clean welcome typography: *"Welcome to Fleet 360 — Complete visibility into your data, take control with real insights."*
	* Three high-contrast navigation cards facilitating 1-click domain navigation:
		+ **Devices Card:** *"Manage devices efficiently and safely with real-time actionable insights"* -> CTA: `Manage Devices`.
		+ **Sites Card:** *"Status of multi-location assets and footprint view with max reliability"* -> CTA: `Manage Sites`.
		+ **Users Card:** *"Comprehensive view of your team and operators to stay on schedule"* -> CTA: `Manage Users`.

**What Makes This Different**

1. **Role-Optimized Entry, Zero Clutter:** Instead of dumping all users into a dense data table or heavy analytics dashboard by default, the landing hub acts as a clean navigational switchboard that respects the user's immediate intent.
2. **Visual Clarity & Industrial Elegance:** Professional, high-contrast dark slate card deck with active red CTA buttons aligned with the Rheem/ACE Digital brand system.
3. **Enterprise-Ready Extensibility:** Designed to integrate seamlessly with multi-tenant organization switchers (e.g., TotalView organization selector) and federated enterprise identity providers.

**Who This Serves**

| Persona | Primary Goal at Entry | Target Landing Destination |
| :--- | :--- | :--- |
| **Facility Operations Manager** | Check overall campus health, floor-by-floor HVAC status, and multi-site footprints. | **Sites Module** (`/sites`) |
| **Field Technician / HVAC Specialist** | Inspect specific RTUs, adjust temperature setpoints, and diagnose alarm codes. | **Devices Module** (`/devices`) |
| **Enterprise IT / Security Admin** | Invite new site managers, configure roles, and audit permissions. | **Users Module** (`/users`) |
| **Executive / Regional Director** | High-level fleet status and power consumption trends. | **TotalView Dashboard** (`/dashboard`) |

**Success Criteria & Metrics**

1. **Authentication Velocity & Friction Reduction:**
	* Average time-to-login under 4 seconds for returning users.
	* Self-service password reset success rate > 92%.
2. **Navigation Efficiency:**
	* > 85% of users reach their target operational task (Device, Site, or User Management) within 1 click from the landing page.
	* Reduction in session bounce rate on initial login.
3. **Security & Session Health:**
	* 100% adherence to enterprise session token expiry and secure cookie standards.
	* Zero unauthenticated leaks to protected application routes.

**Scope**

### In-Scope (Phase 1):

* Dedicated responsive Login page with email/password authentication, validation states, and error handling.
* Forgot Password request and reset trigger mechanism.
* Legal consent and compliance links (Terms of Service, Privacy Policy).
* Post-login Landing Page / Launchpad with three primary domain routing cards (`Devices`, `Sites`, `Users`).
* Client-side route protection and token-based session persistence.

### Explicitly Out-of-Scope (Deferred to Downstream Module PRDs):

* Detailed inner screens for Devices telemetry, RTU setpoints, and schedule configurations (covered under *Devices PRD*).
* 3D Floor visualizer, 2D floorplan CAD uploads, and site analytics (covered under *Sites PRD*).
* Fine-grained RBAC permission matrix editor and LDAP directory sync (covered under *User Management PRD*).
* Real-time alarm notification engine and dispatch webhooks (covered under *Alarms PRD*).

**Vision**

As Fleet 360 scales across global facilities, the Login and Landing experience will evolve into an **Intelligent Contextual Launchpad**:

* **Adaptive Landing:** Machine-learning-driven landing states that dynamically highlight urgent facility alarms or suggest the most relevant site based on the operator's shift, location, and role.
* **Biometric & Passwordless Auth:** Fast, seamless WebAuthn / Passkey support for mobile field tablets.
* **Unified Fleet Hub:** Single sign-on federation across the broader ACE Digital and Rheem commercial IoT ecosystem.