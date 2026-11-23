---
title: "Cybersecurity quick reference desk card"
domain: cyber
tags: [cyber, zero-trust, identity, rmf, ato, fedramp, logging, incident-response, bod, m-26-14]
summary: "Identity and zero trust, security operations, RMF and ATO, FedRAMP, policy deadlines and AI security on one reference card. Redacted from the original desk card."
status: draft
updated: 2026-11-23
handling: public
redacted: "Agency-specific names, tools, contracts, locations, people and plans removed under the approved redaction rules (2026-11-23)."
markings: teaching-examples
---

Companion to the deck Cybersecurity: The Things You Need to Know. Facts checked as of the date above; re-check the operations, RMF, FedRAMP, and policy sections every six months.

### The five ideas

1. Security is risk management, not risk elimination. Know the risk, cut what's worth cutting, and have an accountable official accept the rest in writing.
2. You can't protect what you don't know you have. Assets, accounts, software, data, certificates, keys. Nearly every 2026 directive starts with an inventory.
3. Identity is the perimeter now. Most damage is done with a valid account. Privilege decides the blast radius.
4. Speed is a control. Exploiting known flaws is now the top way in (31% of breaches, 2026 DBIR). Time to patch and time to detect beat any tool purchase.
5. An ATO is a decision, not a binder. A named official accepts residual risk for the agency. Monitoring keeps that decision true.

## Vocabulary

*FIPS 199 rates confidentiality, integrity, and availability separately; the rest of the RMF follows from that rating.*

| Objective | Means | Fails as |
|---|---|---|
| Confidentiality | Only authorized eyes | Breach, leak, oversharing |
| Integrity | Accurate, changed only by authorized means | Tampering, fraud, bad data |
| Availability | There when needed | Outage, DDoS, ransomware |

Also: authenticity, non-repudiation, privacy, safety. Attacker's mirror (DAD): disclosure, alteration, destruction or denial.

### Risk terms (SP 800-30 Rev 1)

| Term | Meaning |
|---|---|
| Threat | Anything that can cause harm, via a threat source |
| Vulnerability | A weakness a threat can use |
| Likelihood | Chance a threat acts and succeeds |
| Impact | Harm to mission, money, people |
| Risk | Likelihood combined with impact |
| Residual risk | What remains after controls; accepted in writing by the AO |

Risk responses: mitigate, accept, transfer or share, avoid. Ignoring is not a response. Quantitative (CISSP): SLE = asset value × exposure factor; ALE = SLE × annual rate of occurrence.

### Controls

- By type: administrative (policy, training, vetting), technical (MFA, encryption, EDR), physical (badges, locks).
- By function: deter, prevent, detect, correct, recover, compensate. Compensating controls need documentation and AO approval.
- By provider: common (inherited), hybrid, system-specific.

Design principles: least privilege · need to know · separation of duties · defense in depth (independent layers) · secure by default · fail secure · complete mediation · assume breach · keep it simple · open design.

### Framework map

| Framework | Answers |
|---|---|
| NIST CSF 2.0 (2024) | Outcomes: govern, identify, protect, detect, respond, recover |
| RMF, SP 800-37 Rev 2 | The process to authorize a system |
| SP 800-53 Rev 5 (release 5.2.0) | The control catalog; baselines in 800-53B |
| SP 800-53A | How to assess each control |
| SP 800-171 | CUI on contractor systems (CMMC uses Rev 2) |
| MITRE ATT&CK | How adversaries actually operate |
| CIS Controls v8.1 | Prioritized basics (IG1 first) |
| ISO/IEC 27001:2022, SOC 2 | Vendors' evidence; not a FedRAMP substitute |

## Technician cheat sheet

*Most crypto failures are key management and expired certificates; most cloud failures are configuration and identity.*

### Cryptography

| Tool | Use | Notes |
|---|---|---|
| AES-256 (symmetric) | Bulk encryption | Disk, storage, TLS sessions |
| RSA, ECC (asymmetric) | Key exchange, signatures | Quantum-vulnerable; ML-KEM and ML-DSA replace |
| SHA-256/384 (hash) | Integrity fingerprint | MD5, SHA-1 broken; passwords salted and slow |
| Digital signature | Who signed, unaltered | Code signing, PIV, SAML |
| PKI | CA vouches key belongs to a name | Federal PKI for PIV |
| FIPS 140-3 | Validated modules | Ask vendors for the CMVP certificate |

- TLS 1.2 is the floor; support TLS 1.3 by January 2, 2030.
- Public TLS certificate lifetimes: 200 days (March 2026), 100 days (March 2027), 47 days (March 2029). Automate renewal (ACME) and inventory every certificate.

Network: edge devices patched or replaced first · segmentation stops lateral movement · admin interfaces on a management network · TLS inspection documented · ZTNA instead of VPN · Protective DNS and DNS logging · flow logs to the SIEM · TIC 3.0 by use case.

Endpoint: STIG or CIS baseline via endpoint management · BitLocker · app control and ASR rules · Credential Guard · no standing local admin (LAPS) · patch rings including firmware · EDR on every device · isolate from the console · compliance gates tokens.

### Cloud shared responsibility

| Layer | IaaS | PaaS | SaaS |
|---|---|---|---|
| Data, access, configuration | You | You | You |
| Application | You | Shared | Provider |
| OS and runtime | You | Provider | Provider |
| Hardware, facility | Provider | Provider | Provider |

Watch for: public storage and sharing, overprivileged service principals, replayed tokens, default logging, risky OAuth consent. BOD 25-01 requires CISA's SCuBA baselines for Microsoft 365.

Application security: threat modeling (STRIDE) · SAST and secrets scanning per commit · SCA and SBOM per build · DAST in test · pen test before release · WAF in production · SSDF (SP 800-218, 800-218A for AI) · broken access control leads the OWASP Top 10.

### Intrusion chain and where controls bite

| Stage | Typical move | Stops it |
|---|---|---|
| Initial access | Exploit an edge device; phish a token | Risk-based patching, EOS removal, phishing-resistant MFA |
| Persistence | Web shell, new account, task | EDR, alerts on new admins and services |
| Privilege | Dump credentials, abuse service account | Credential Guard, PIM, tiering |
| Lateral movement | RDP, SMB, admin tools | Segmentation, unique local admin passwords |
| Exfiltration | Stage and upload | DLP, egress filtering, logging |
| Impact | Encrypt, wipe, extort | Immutable backups, tested restores |

## Identity and zero trust

*Only phishing-resistant MFA (PIV, FIDO2 keys, device-bound passkeys) stops relay phishing; OMB M-22-09 requires it for staff, contractors, and partners.*

| Method | Phishing-resistant? |
|---|---|
| PIV or CAC smart card | Yes |
| FIDO2 security key, device-bound passkey, Windows Hello for Business | Yes |
| Authenticator push with number matching | No (relayable) |
| One-time code (app or hardware token) | No (relayable) |
| SMS or voice code | No (interceptable, SIM swap) |

NIST SP 800-63-4 (final 2025): IAL1–3 identity proofing · AAL1–3 authentication (AAL2 must offer a phishing-resistant option; AAL3 hardware-based) · FAL1–3 federation.

Federation: SAML 2.0 and OpenID Connect on OAuth 2.0 for sign-in; SCIM for provisioning and deprovisioning. Tokens are the new passwords: short lifetimes, continuous access evaluation, token protection.

### Privileged access rules

- Separate admin accounts; admin work only from privileged access workstations; cloud admins cloud-only.
- Just-in-time through the cloud directory PIM; no standing Global Admin or Domain Admin. Tier 0 (AD, the cloud directory, the identity provider, PKI, backups, sync servers) credentials never touch lower tiers.
- Every non-human identity (service account, app registration, API key, AI agent) has an owner, minimal scope, managed or short-lived credentials, rotation, monitoring. Two cloud-only break-glass accounts with phishing-resistant keys, alarmed on sign-in, tested quarterly.

Zero trust pillars (CISA ZTMM 2.0: traditional, initial, advanced, optimal)

| Pillar | Advanced looks like | Your agency tooling |
|---|---|---|
| Identity | Phishing-resistant MFA, risk-based access | the identity provider, the cloud directory, PIV |
| Devices | Full inventory; compliant devices only | endpoint management, EDR, mobile threat defense |
| Networks | Segmented, encrypted, no implicit trust | ZTNA and secure web gateway |
| Applications | Identity-aware access to every app | the identity provider, the cloud directory, the ZTNA service |
| Data | Classified, labeled, protected, monitored | the compliance and DLP suite |
| Cross-cutting | Visibility, automation, governance | the SIEM, the ITSM platform |

DoW target level: 91 activities by September 30, 2027 (61 more for advanced).

### Joiner, mover, leaver checklist

## Security operations

*BOD 26-04's remediation timelines apply from December 7, 2026; BOD 26-02's first removal milestone is February 2027.*

BOD 26-04, Prioritizing Security Updates Based on Risk (June 10, 2026). Supersedes BOD 19-02 and BOD 22-01. Four questions per finding:

1. Is the asset exposed to the internet?
2. Is the flaw on CISA's KEV list?
3. Can exploitation be automated?
4. Would it give an attacker total control?

Fastest tier: about 3 days plus forensic triage (exposed, exploited, total control). Graduated windows out to about 60 days as risk falls. Lowest risk: documented deferral to the next upgrade. Read the directive's table before writing policy.

### BOD 26-02, end-of-support edge devices (February 5, 2026)

| Milestone | Date | Requirement |
|---|---|---|
| Immediately | Feb 2026 | Patch what can be patched |
| 3 months | May 2026 | Inventory devices on CISA's EOS list; report |
| 12 months | Feb 2027 | Remove devices already past end of support |
| 18 months | Aug 2027 | All identified EOS edge devices removed |
| 24 months | Feb 2028 | Lifecycle process replaces devices before EOS |

ED 26-03 (February 25, 2026): Cisco SD-WAN actively exploited; inventory within about a day, forensic snapshots and external logging, patch by February 27, logs to CISA.

OMB M-26-14 logging (May 22, 2026). Rescinds M-21-31. Two objectives: continuous event monitoring (CEM) and threat hunting, investigation, response, and forensics (THIRF). Eleven outcome-based activities; maturity levels 0–4 on a timeline counted from CISA's Logging Reference Architecture (published August 20, 2026); reduced, risk-based retention; IoT and OT included; each agency writes a logging plan. High-value sources: the identity provider and the cloud directory sign-ins, EDR, the SSE platform, M365 audit, Azure activity, the ITSM platform admin, firewall and SD-WAN, DNS.

### Incident response clocks

| Event | Deadline | Authority |
|---|---|---|
| Incident identified | Report to CISA within 1 hour | CISA Federal Incident Notification Guidelines |
| Major incident determined | Notify OMB and CISA within 1 hour | OMB M-25-04 |
| Major incident | Notify Congress within 7 days | FISMA, M-25-04 |
| PII of 100,000+ people breached | Major incident determination required | M-25-04 |

Lifecycle: prepare · detect and analyze · contain (preserve evidence first) · eradicate · recover · learn. SP 800-61 Rev 3 (April 2025) maps it to CSF 2.0.

## RMF and the ATO

*An ATO is the authorizing official's signed acceptance of residual risk, based on the SSP, SAR, and POA&M, and kept current by monitoring. SP 800-37 Rev 2 (December 2018) is still current.*

### The seven steps

1. Prepare: risk strategy, roles, common controls, inventories, boundary.
2. Categorize: information types (SP 800-60), FIPS 199 rating, approval by AO or designee.
3. Select: 800-53B baseline, tailoring, parameters, overlays, inherited versus system-specific; documented in the SSP.
4. Implement: build controls; document each implementation specifically.
5. Assess: assessor tests under a plan (SAP) using 800-53A; writes the SAR.
6. Authorize: package to the AO; decision with terms and conditions; POA&M.
7. Monitor: change analysis, ongoing assessment, status reports, reauthorization on significant change.

### FIPS 199 and baselines

| Level | Impact if lost | 800-53B baseline (controls and enhancements) |
|---|---|---|
| Low | Limited adverse effect | about 149 |
| Moderate | Serious adverse effect | about 287 |
| High | Severe or catastrophic | about 370 |

High-water mark (FIPS 200): the highest of C, I, A sets the level. FedRAMP Rev5 baselines run larger (about 156, 323, 410). NSS use CNSSI 1253, which keeps C, I, A separate.

### The 20 families (bold = mostly implemented by IT Operations)

AC access control · AT awareness and training · AU audit and accountability · CA assessment, authorization, monitoring · CM configuration management · CP contingency planning · IA identification and authentication · IR incident response · MA maintenance · MP media protection · PE physical and environmental · PL planning · PM program management · PS personnel security · PT PII processing and transparency · RA risk assessment · SA system and services acquisition · SC system and communications protection · SI system and information integrity · SR supply chain risk management.

Key controls for Ops: AC-2 accounts, AC-6 least privilege, CM-2 baselines, CM-3 change control, CM-8 inventory, CP-9 backup, IA-2 MFA, IR-9 spillage, RA-5 scanning, SC-7 boundary, SI-2 flaw remediation, SI-4 monitoring. Release 5.2.0 (August 2025) added SA-15(13), SA-24, SI-02(07).

### The package and decisions

| Item | What it is |
|---|---|
| SSP | System, boundary, and how each control is met |
| SAR | Assessor's tests, findings, risk ratings |
| POA&M | Open weaknesses with owner, resources, dated milestones |
| Supporting | FIPS 199, PTA/PIA/SORN, contingency plan and test, IR plan, CM plan, ISCM strategy, ISAs/MOUs (SP 800-47 Rev 1), inventory, diagrams |
| ATO | Authorized to operate, usually with conditions |
| IATT | Interim authorization to test, limited time and scope |
| ATU | Authorization to use a provider's system (cloud, shared service) |
| Denial | Not authorized; stop or don't start |

Roles: AO accepts risk (decision can't be delegated) · CISO/SAISO runs the program · SAOP owns privacy · system owner owns and funds fixes · information owner or steward sets data rules · ISSO keeps the package current · assessor tests independently · common control provider supplies inherited controls.

A good POA&M item has: weakness tied to a control · source · risk rating · named owner · resources · milestones with dates · scheduled completion · status history. Track aging; risk acceptance is rare and AO-approved.

Significant change (triggers AO review): new boundary or interconnection · new hosting (on-premises to cloud) · new data type (adding PII) · major new function · an AI capability that reads data or takes actions.

Continuous monitoring: SP 800-137 strategy · automated asset, configuration, vulnerability, identity, and log monitoring · a subset of controls assessed yearly · security impact analysis on every change (CM-4) · status to the AO on schedule. A-130 (2016) dropped the three-year reauthorization habit in favor of ongoing authorization.

Faster, honest ATOs: inherit common controls (publish an Ops common control catalog) · reuse FedRAMP and reciprocity · ISSO at design · pre-approved patterns · automate evidence (OSCAL, config as code) · light path for low-risk SaaS. Refuse rubber-stamp or backdated ATOs, unfunded POA&Ms, unread vendor SSPs, and systems in production without an ATO.

## FedRAMP in 2026

| Date | Event |
|---|---|
| June 11, 2027 | FedRAMP stops accepting new Rev5 certifications |
| Mid-December 2026 | Phase 4 scale and timelines announced |
| October 29, 2026 | First full 20x Class C certification |
| August 2026 | 20x pipelines open: Class A, then B and C (Aug 31) |
| July 4, 2026 | Consolidated Rules (CR26) in effect |
| June 25, 2026 | CR26 published |

Existing Rev5 certifications remain valid until at least December 31, 2028. FY26: 92 new certifications (66 Rev5, 26 20x), 538 certified services, 760 new agency ATOs or ATUs.

Contract language: FedRAMP certification at the appropriate class · notice of any status change · access to certification materials · incident notification timeline · log access.

## Law and policy

*FISMA 2014 still governs; OMB issued no FY2026 FISMA memo, so M-25-04 (January 2025) remains the operative guidance and major incident definition.*

### Authority map

| Source | What it does | Examples |
|---|---|---|
| FISMA 2014 | Agency heads accountable; OMB oversees; CISA operates; IGs evaluate yearly | 44 U.S.C. 3551 et seq. |
| OMB Circular A-130 (2016) | Appendix I: RMF, authorization, ongoing monitoring |  |
| OMB memoranda | Annual FISMA guidance and topic mandates | M-22-09, M-25-04, M-26-05, M- 26-14, M-26-15, M-19-03, M-17-12 |
| CISA directives | Binding for civilian agencies, not NSS | BOD 25-01, 26-02, 26-04; ED 26- 03 |
| NIST | FIPS mandatory; SPs binding through OMB | FIPS 140-3, 199, 200, 201, 203– 205 |
| Executive orders | Direction and deadlines | EO 14306, 14409, 14412, 14434 |
| Other statutes | Cloud, privacy, information sharing, quantum | FedRAMP Act, Privacy Act, E- Gov Act §208, FITARA, CISA 2015, CIRCIA |
| NSS track | Separate governance | NSPM-12, CNSS, NSA as National Manager |

### What changed, 2025–26 (newest first)

| Date | Change |
|---|---|
| Oct 1, 2026 | CIRCIA final rule sent to OMB for review |
| Sep 29, 2026 | EO 14434: agencies use "Super Intelligence" and "SI" for "AI" |
| Aug 20, 2026 | CISA Logging Reference Architecture |
| Jul 13, 2026 | DoW suspends CMMC Phase II pending reform review |
| Jun 25, 2026 | FedRAMP Consolidated Rules for 2026 |
| Jun 22–24, 2026 | EO 14412 and M-26-15: post-quantum migration |
| Jun 12, 2026 | NSPM-12 replaces NSD-42 and NSM-8 for national security systems |
| Jun 10, 2026 | BOD 26-04: patch by risk |
| Jun 2, 2026 | EO 14409: AI-enabled cyber defense, frontier model access |
| May 22, 2026 | M-26-14 replaces M-21-31 (logging) |
| May 1, 2026 | Five Eyes "Careful Adoption of Agentic AI Services" |
| Mar 6, 2026 | National cyber strategy (six pillars) and cybercrime EO |
| Feb 25, 2026 | ED 26-03: Cisco SD-WAN |
| Feb 5, 2026 | BOD 26-02: end-of-support edge devices |
| Jan 23, 2026 | M-26-05 rescinds M-22-18 and M-23-16 (software attestation) |
| Sep 24, 2025 | DoW announces the CSRMC |
| Aug 27, 2025 | SP 800-53 release 5.2.0 |
| Jun 6, 2025 | EO 14306 amends EO 14144 and EO 13694 |

FISMA cycle: OMB guidance → CIO metrics (CyberScope) → IG evaluation (FY2026 used FY2025 IG metrics) → agency report to OMB, CISA, Congress → OMB report to Congress. Maturity: 1 ad hoc · 2 defined · 3 consistently implemented · 4 managed and measurable ("effective") · 5 optimized. IGs want evidence: inventories, POA&M aging, access reviews, contingency tests, training records, monitoring results.

### Post-quantum (EO 14412, OMB M-26-15; NSS excluded)

| Period | Phase |
|---|---|
| 2026–2027 | Strategy, planning, cryptographic inventory; agency plan due about October 22, 2026 |
| 2027–2028 | Pilots and early migration |
| 2028–2030 | Key establishment for HVAs and high-impact systems |
| 2031–2035 | Remaining systems; quantum-vulnerable public- key crypto retired |

Standards: FIPS 203 ML-KEM (key exchange), FIPS 204 ML-DSA (signatures), FIPS 205 SLH-DSA (hash-based signatures), August 2024. NIST IR 8547 (draft): deprecate after 2030, disallow after 2035. Ops actions: crypto inventory, vendor roadmaps, retire what can't upgrade, build crypto agility.

## Supply chain and contracts

*Third parties were involved in 48% of breaches in the 2026 DBIR; since M-26-05 ended mandatory vendor attestations, contract terms and intake review are the main levers.*

Still applies: SP 800-161 Rev 1 and the SR family · SBOMs where risk warrants · FASCSA exclusion orders · Section 889, Kaspersky, and TikTok bans · FedRAMP for cloud · security and IT review at intake (PRISM: "how will IT be used?") · complete software and hardware inventories (still required by M-26-05).

### Contract checklist

- Personnel: suitability tier per labor category before access; access removed within one business day Access: no self-granted access; named privileged accounts through PIM; phishing-resistant MFA Incidents: report to the agency within an hour; preserve evidence; cooperate; the SOC handoff spelled out where SOC is excluded Cloud: FedRAMP certification at the right class; notice of status change; access to certification materials Logs: agency access in usable formats, retained to the agency's M-26-14 logging plan Vulnerabilities: remediation on BOD 26-04 timelines; SBOM and disclosure policy on request Data: location limits where needed; no AI training on agency data without approval; return and certified destruction (SP 800-88)
- FAR clauses as applicable: 52.204-21, -23, -25, -27, FASCSA orders; DFARS 252.204-7012 and CMMC only for DoW Workforce: technical positions mapped to NICE work roles; security performance standards in the QASP Right to audit; key personnel for security roles

COR authority: you define and monitor requirements; the contracting officer changes terms or scope.

## AI and security

*AI speeds attackers and defenders alike; adding AI to a system is a significant change for its boundary, ATO, and logging plan. (EO 14434: official your agency documents say "Super Intelligence" and "SI".)*

Agentic AI risks (CISA, NSA, and Five Eyes partners, "Careful Adoption of Agentic AI Services," May 1, 2026)

| Risk | Meaning |
|---|---|
| Privilege | More access than the task needs |
| Design and configuration | Insecure components, poor isolation |
| Behavior | Prompt injection, jailbreaks, poisoned data |
| Structural | Many tool connections widen the attack surface |
| Accountability | Hard to tell why it acted or whether to trust it |

Controls that work: fold agents into zero trust and least privilege · start with low-risk, well-defined tasks · each agent its own verifiable identity with short-lived credentials · human approval for high-impact actions · log internal steps and tool calls, cross-check with independent logs · isolate agents · system prompts are instructions, not controls · retrieval enforces the user's own permissions at query time.

Threat picture: AI agents ran an estimated 80–90% of a 2025 state-linked intrusion campaign (Anthropic) · exploits arrive within days of disclosure · voice cloning weakens "call to verify" · shadow AI is a growing exposure path · EO 14409 (June 2, 2026) directs AI-enabled hardening of federal systems.

Standards in progress: NIST SP 800-53 overlays for AI (COSAiS, renamed COSIS in October 2026) · OWASP Top 10 for LLM applications · SP 800-218A. Until final, map AI risk to AC, IA, AU, SI, SR, and CM.

## Classified primer

*National security systems follow their own chain: NSPM-12 (June 12, 2026) re-established the CNSS and made the NSA Director National Manager, with emergency directive authority.*

NSS definition (44 U.S.C. 3552(b)(6)): intelligence, cryptologic, military command and control, weapons, mission-critical military or intelligence systems, or any system protected for classified information. Civilian agencies have some. OMB memos and CISA BODs generally don't apply to them.

| Topic | Civilian, unclassified | National security systems |
|---|---|---|
| Governance | OMB, CISA | NSPM-12, CNSS, NSA National Manager |
| Categorization | FIPS 199 high-water mark | CNSSI 1253: C, I, A kept separate |
| Controls | SP 800-53B baselines | CNSSI 1253 baselines plus overlays (Classified Information) |
| Process | SP 800-37, seven steps | DoW CSRMC: design, build, test, onboard, operations; IC: ICD 503 |
| Tooling | Agency GRC tools | eMASS at DoW; IC tools |
| Reuse | FedRAMP certification | Reciprocity; ODNI shared authorization repository (2026) |
| Crypto | FIPS 140-3 validated | NSA-approved (Type 1, CSfC); CNSA 2.0, 2035 end state |
| Directives | CISA BODs and EDs | National Manager directives |

Unique protections: COMSEC (keying material accounted for by custodians) · TEMPEST (emanations; certified TEMPEST authority sets separation and shielding) · cross-domain solutions on NSA NCDSMO's baseline, no sneakernet (DoDI 8540.01) · SCIFs under ICD 705, no personal electronics.

People: clearance (Confidential, Secret, Top Secret; SCI and SAP on top) plus need-to-know · SF-86; Tier 3 for Secret, Tier 5 for Top Secret · continuous vetting (Trusted Workforce 2.0) · reporting duties (SEAD 3) · insider threat programs (EO 13587) with user activity monitoring · spillage (IR-9): stop, report, don't forward or delete.

DoW context: zero trust target level by September 30, 2027 · CMMC Phase II suspended July 13, 2026 · cyber workforce qualifications under DoDD 8140.01 and DoDM 8140.03.

What transfers: RMF fluency · identity and zero trust design · patching, logging, and recovery discipline · COR oversight · incident response · leading contractors. Learn on arrival: CNSSI 1253 and overlays · CSRMC or ICD 503 · eMASS · COMSEC, TEMPEST, CDS ·

classification management · SCIF discipline and reporting.

## Leading it

*Ops owns the controls, the CISO owns the program and the risk picture, and the AO owns the decision.*

| Activity | IT Operations | CISO's office | AO |
|---|---|---|---|
| Policy and standards | Consulted | Owns | Informed |
| Implement and operate controls | Owns | Advises, verifies | – |
| Patching and hardening | Owns, executes | Sets clocks, checks | – |
| Monitoring and SOC | Feeds data, acts on tickets | Owns | – |
| Incident response | Contains, restores, preserves evidence | Leads, reports | Informed |
| Contractor security | COR enforces | Sets requirements | – |
| Risk acceptance | Recommends | Advises (decides where delegated) | Decides |

### Scorecard metrics (baseline first, then targets)

| Metric | Why | Source |
|---|---|---|
| Findings past BOD 26-04 deadline, by tier | The directive's clock | Scanner, the ITSM platform |
| Assets with an owner and EDR (%) | Unknown is unprotected | CMDB, EDR |
| End-of-support edge devices (count) | BOD 26-02 | CMDB, CISA list |
| Phishing-resistant MFA coverage (%), all and privileged | Identity is the perimeter | the identity provider, the cloud directory |
| Standing privileged assignments | Blast radius | the cloud directory PIM |
| Metric Why | Source |  |
| Log sources meeting the logging plan (%) M-26-14 | the SIEM |  |
| Restore tests passed this quarter Resilience proven | Backup tools |  |
| Ops POA&M items past due (count, age) IGs check this | POA&M tracker |  |

### 90-day plan (proposal)

Days 1–30, find:

- Confirm BOD 26-04 readiness before December 7: policy, exposure-aware scanning, three-day patch path including edge firmware List every system with ATO or ATU status, expiry, AO, ISSO, and controls Ops provides Match edge devices against CISA's end-of-support list Agree with the CISO and ISSOs on what Ops owns

Days 31–60, fix:

- Baseline the eight metrics Move standing admin assignments into PIM Restore-test one critical system end to end, identity included Sort Ops POA&M items by risk and age; agree dates

Days 61–90, operate:

### Myths and replies

| Myth | Reply |
|---|---|
| "We have an ATO, so we're secure." | An ATO says known risk was accepted, at a point in time. |
| "It's FedRAMP, so the vendor handles it." | They handle their layer; configuration and access are ours. |
| "We have MFA, so phishing is solved." | Only phishing-resistant MFA is; codes and pushes get relayed. |
| "Patch the criticals first." | Patch what's exposed and exploited first: BOD 26- 04. |
| "We're too small to be a target." | Automated attacks don't check org charts. |
| "Security is the CISO's job." | Most controls are run by IT Operations. |
| "It's air-gapped, so it's safe." | Media, updates, and people cross gaps every day. |
| "The cloud backs it up." | The provider keeps the service up; restoring data is on us. |

### Twelve vendor questions

1. FedRAMP class and status, and 20x transition date?
2. What's in your boundary, and what's left to us?
3. How fast will you tell us about an incident, and how?
4. Which logs can we get, in what format, for how long?
5. How do your patch timelines map to BOD 26-04?
6. Which of your admin and edge systems face the internet?
7. How is privileged access to our data controlled and logged?
8. Who are your subcontractors and key subprocessors?
9. Can you provide an SBOM and a vulnerability disclosure policy?

## 10. What's your post-quantum roadmap?

*11. What AI features touch our data, and can we turn them off? 12. How do we get our data back, with proof it's destroyed?*

## CISSP map

*The English CISSP is adaptive: 100–150 questions in up to three hours, passing score 700 of 1000; five years' paid experience in two or more domains (one year waivable).*

| Domain | Weight | Deck sections |
|---|---|---|
| 1 Security and risk management | 16% | 01 Foundations, 05 RMF, 07 Law and policy |
| 2 Asset security | 10% | 05 Categorization; Data deck |
| 3 Security architecture and engineering | 13% | 01 Principles, 02 Crypto, 10 Classified |
| 4 Communication and network security | 13% | 02 Network, 03 Zero trust |
| 5 Identity and access management | 13% | 03 Identity |
| 6 Security assessment and testing | 12% | 05 Assessment, 04 Vulnerabilities |
| 7 Security operations | 13% | 04 Security operations |
| 8 Software development security | 10% | 02 Application security, 09 AI |

Exam mindset: human safety first · follow policy and due process · get management approval · fix the root cause · prefer prevention when equally feasible · senior management is ultimately responsible. Know Bell-LaPadula (confidentiality), Biba and Clark-Wilson (integrity), DAC/MAC/RBAC/ABAC, and physical security basics.

## Watch list

*The next hard date is BOD 26-04's remediation timelines on Dec 7, 2026 ; re-check this list every six months.*

| Date | What happens | Action |
|---|---|---|

Dec 7, 2026 BOD 26-04 remediation timelines Policy, scanning, patch path

- apply ready

Dec 11, 2026 CISA 2015 information-sharing law Expect slower vendor sharing if

- and Federal Cybersecurity lapsed Enhancement Act lapse unless extended
| Mid-December 2026 | FedRAMP 20x Phase 4 scale and timelines | Update provider transition questions |
|---|---|---|
| Date | What happens | Action |
| February 2027 | BOD 26-02: devices already past EOS removed | Replacement funded and scheduled |

Jun 11, 2027 No new FedRAMP Rev5 Vendors "in process" need a

- certifications 20x plan
| August 2027 | BOD 26-02: all identified EOS edge devices removed | Count at zero |
|---|---|---|
| Mid-to-late 2027 | M-26-14 advanced logging maturity (confirm in memo) | Logging plan milestones |

- DoW moves
| 2027–2028 | Post-quantum phase 2: pilots | Vendor roadmaps in hand |
|---|---|---|
| February 2028 | BOD 26-02: lifecycle process in place | EOS tracking in ITAM |

Dec 31, 2028 Existing FedRAMP Rev5 Track each provider's move

- certifications valid at least to here
| Pending | Note when each lands |
|---|---|

### Glossary

| Term | Meaning |
|---|---|
| AO | Authorizing official; accepts residual risk |
| ATO, ATU, IATT | Authorization to operate; to use another's system; interim to test |
| CDS | Cross-domain solution between classification levels |
| CEM, THIRF | M-26-14's logging objectives: monitoring; hunting, investigation, response, forensics |
| CNSS, CNSSI 1253 | NSS governance body; its categorization and baselines |
| CNSA 2.0 | NSA's quantum-resistant suite for NSS |
| Common control | Provided once, inherited by many systems |
| CSRMC | DoW's Cybersecurity Risk Management Construct |
| EDR | Endpoint detection and response |
| FedRAMP 20x, KSI | Automation-based certification path; key security indicator |
| HVA | High value asset (M-19-03) |
| ISCM | Information security continuous monitoring (SP 800-137) |
| ISSO | Information system security officer |
| KEV | CISA's Known Exploited Vulnerabilities catalog |
| Major incident | OMB-defined; OMB and CISA in 1 hour, Congress in 7 days |
| Overlay | Controls tailored to a context (privacy, classified, AI) |
| PIM | Just-in-time privileged access in the cloud directory |
| POA&M | Plan of action and milestones |
| SAR | Security assessment report |
| SBOM | Software bill of materials |
| SCuBA | CISA's secure Microsoft 365 baselines (BOD 25-01) |
| SIEM, SOAR | Correlate security logs; automate response |
| SSP | System security and privacy plan |
| SSVC | CISA's decision trees for patch priority |
| ZTNA | Per-app access after identity and device checks |

### Sources

- OMB M-26-05, risk-based software and hardware security OMB M-26-14, logging; Logging Reference Architecture coverage OMB M-26-15, post-quantum migration OMB M-25-04, FISMA guidance; NARA OIG FY26 audit (no FY26 memo issued)
- ATF major incident; FBI wiretap network major incident
