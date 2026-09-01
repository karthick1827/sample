---
status: Approved
reviewed_by: Manager (via Markdown Studio)
review_timestamp: 2026-09-01T09:57:06.525Z
gate_signature: ACL-STUDIO-APPROVAL-APPROVED
phase: Phase 2: Planning
workflow_mode: greenfield
created_at: 2026-09-01T09:30:37.666Z
step_key: prd
title: "Product Requirements Document (PRD)"
skill_source: "acl-prd/SKILL.md"
upstream_documents_read: ["brief.md"]
---

**Product Requirements Document (PRD) for Fleet 360 Login Portal and Landing Experience**

**Document ID:** PRD-Fleet-360-Login-Landing-2026-09-01
**Status:** In Review
**Created:** 2026-09-01
**Updated:** 2026-09-01
**Reviewers:** [List of reviewers assigned to this PRD]

**Table of Contents**

1. [Introduction](#introduction)
2. [Problem Statement](#problem-statement)
3. [Solution Overview](#solution-overview)
4. [Key Experience Elements](#key-experience-elements)
5. [What Makes This Different](#what-makes-this-different)
6. [Who This Serves](#who-this-serves)
7. [Success Criteria & Metrics](#success-criteria--metrics)
8. [Scope](#scope)
9. [Vision](#vision)
10. [Assumptions & Dependencies](#assumptions--dependencies)
11. [Risks & Mitigation Strategies](#risks--mitigation-strategies)
12. [Technical Requirements](#technical-requirements)
13. [Non-Functional Requirements](#non-functional-requirements)
14. [Security Requirements](#security-requirements)
15. [Usability Requirements](#usability-requirements)
16. [Accessibility Requirements](#accessibility-requirements)
17. [Internationalization & Localization Requirements](#internationalization--localization-requirements)
18. [Testing & Quality Assurance](#testing--quality-assurance)
19. [Deployment & Operations](#deployment--operations)
20. [Maintenance & Support](#maintenance--support)

**Introduction**

The Fleet 360 Login Portal and Landing Experience is a critical component of the Fleet 360 platform, providing a secure, branded authentication entry point paired with an intuitive post-login launchpad. This PRD outlines the requirements for the development of this feature, ensuring that it meets the needs of the target audience and aligns with the overall vision of the Fleet 360 platform.

**Problem Statement**

The current fleet and facility management systems are plagued by fragmented interfaces, high cognitive load, and cumbersome authentication workflows, leading to:

1. Disjointed access and high cognitive friction
2. Context switching and "where do I go?" paralysis
3. Enterprise security and compliance obligations

**Solution Overview**

The Fleet 360 Login Portal and Landing Experience resolves these friction points through a streamlined, two-tier entry architecture:

1. Branded, high-trust authentication portal
2. Focused action-oriented landing hub

**Key Experience Elements**

1. **Branded, High-Trust Authentication Portal (`/login`):**
	* Clean split-screen visual presentation combining commercial HVAC/industrial equipment imagery with a focused login interface
	* Enterprise single-sign-on (SSO) and email/password authentication
	* Inline self-service credential recovery ("Forgot Password?")
	* Explicit compliance notice linking to corporate Terms & Conditions and Privacy Policies
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

1. Dedicated responsive Login page with email/password authentication, validation states, and error handling.
2. Forgot Password request and reset trigger mechanism.
3. Legal consent and compliance links (Terms of Service, Privacy Policy).
4. Post-login Landing Page / Launchpad with three primary domain routing cards (`Devices`, `Sites`, `Users`).
5. Client-side route protection and token-based session persistence.

### Explicitly Out-of-Scope (Deferred to Downstream Module PRDs):

1. Detailed inner screens for Devices telemetry, RTU setpoints, and schedule configurations (covered under *Devices PRD*).
2. 3D Floor visualizer, 2D floorplan CAD uploads, and site analytics (covered under *Sites PRD*).
3. Fine-grained RBAC permission matrix editor and LDAP directory sync (covered under *User Management PRD*).
4. Real-time alarm notification engine and dispatch webhooks (covered under *Alarms PRD*).

**Vision**

As Fleet 360 scales across global facilities, the Login and Landing experience will evolve into an **Intelligent Contextual Launchpad**:

1. **Adaptive Landing:** Machine-learning-driven landing states that dynamically highlight urgent facility alarms or suggest the most relevant site based on the operator's shift, location, and role.
2. **Biometric & Passwordless Auth:** Fast, seamless WebAuthn / Passkey support for mobile field tablets.
3. **Unified Fleet Hub:** Single sign-on federation across the broader ACE Digital and Rheem commercial IoT ecosystem.

**Assumptions & Dependencies**

1. The Fleet 360 platform will provide the necessary APIs and infrastructure for the Login Portal and Landing Experience.
2. The Rheem/ACE Digital brand system will be used for visual consistency.
3. The TotalView organization selector and federated enterprise identity providers will be integrated for enterprise-ready extensibility.

**Risks & Mitigation Strategies**

1. **Security Risks:** Mitigation strategy: Implement robust security measures, such as encryption, secure authentication, and regular security audits.
2. **Usability Risks:** Mitigation strategy: Conduct user testing and gather feedback to ensure the Login Portal and Landing Experience are intuitive and easy to use.
3. **Technical Risks:** Mitigation strategy: Use established technologies and frameworks, and conduct thorough testing to ensure the solution is stable and scalable.

**Technical Requirements**

1. **Front-end:** Use a modern front-end framework, such as React or Angular, to build the Login Portal and Landing Experience.
2. **Back-end:** Use a robust back-end framework, such as Node.js or Python, to handle authentication, authorization, and data storage.
3. **Database:** Use a scalable database, such as MongoDB or PostgreSQL, to store user data and other relevant information.

**Non-Functional Requirements**

1. **Performance:** The Login Portal and Landing Experience must be responsive and performant, with a minimum of 3-second load time.
2. **Scalability:** The solution must be able to handle a large number of users and scale horizontally to meet increasing demand.
3. **Security:** The solution must implement robust security measures to protect user data and prevent unauthorized access.

**Security Requirements**

1. **Authentication:** Implement robust authentication mechanisms, such as password hashing and salting, to protect user credentials.
2. **Authorization:** Implement role-based access control to ensure that users have the necessary permissions to access sensitive data.
3. **Data Encryption:** Use encryption to protect sensitive data, such as user credentials and other confidential information.

**Usability Requirements**

1. **Intuitive Interface:** The Login Portal and Landing Experience must have an intuitive interface that is easy to use and navigate.
2. **Clear Instructions:** Provide clear instructions and feedback to users throughout the login and landing experience.
3. **Accessibility:** Ensure that the solution is accessible to users with disabilities, following Web Content Accessibility Guidelines (WCAG 2.1).

**Accessibility Requirements**

1. **WCAG 2.1 Compliance:** Ensure that the solution meets the Web Content Accessibility Guidelines (WCAG 2.1) for accessibility.
2. **Screen Reader Compatibility:** Ensure that the solution is compatible with popular screen readers, such as JAWS and NVDA.
3. **Keyboard Navigation:** Ensure that the solution is navigable using only a keyboard.

**Internationalization & Localization Requirements**

1. **Language Support:** Support multiple languages, including English, Spanish, French, and other languages as required.
2. **Date and Time Formats:** Use date and time formats that are consistent with the user's locale.
3. **Currency Formats:** Use currency formats that are consistent with the user's locale.

**Testing & Quality Assurance**

1. **Unit Testing:** Write unit tests to ensure that individual components of the solution are working correctly.
2. **Integration Testing:** Write integration tests to ensure that components of the solution are working together correctly.
3. **User Acceptance Testing:** Conduct user acceptance testing to ensure that the solution meets the requirements and is usable.

**Deployment & Operations**

1. **Deployment:** Deploy the solution to a cloud-based platform, such as AWS or Azure.
2. **Monitoring:** Monitor the solution for performance, security, and other issues.
3. **Maintenance:** Perform regular maintenance, such as software updates and security patches.

**Maintenance & Support**

1. **Documentation:** Provide detailed documentation for the solution, including user manuals and technical guides.
2. **Training:** Provide training for users and administrators on how to use the solution.
3. **Support:** Provide support for users and administrators, including email support and phone support.