---
title: "Cybersecurity: the things you need to know"
domain: cyber
tags: [cyber, rmf, ato, zero-trust, identity, secops, fedramp, supply-chain, classified, cissp, deck]
summary: "Full cybersecurity deck in 11 sections: foundations, the technician's toolkit, identity and zero trust, security operations, RMF and ATO, FedRAMP, law, supply chain, AI, classified environments and leading it. Redacted text version."
status: draft
updated: 2026-11-23
handling: public
redacted: "Agency-specific names, tools, contracts, locations, people and plans removed under the approved redaction rules (2026-11-23)."
markings: teaching-examples
---

## Cybersecurity: The Things You Need to Know

*A WORKING REFERENCE · NOVEMBER 2026 · COMPANION TO THE AI AND DATA DECKS*

- How attacks work, how defenses are built and run, how RMF and the ATO really decide risk, and how all of it changes on the high side. Written for the technician and the Deputy CIO in the same chair.

**69 slides · 11 sections · speaker notes carry the depth**


???

How to use this deck. Same structure as the AI and Data decks: the slides are the scannable layer, one idea each; the speaker notes are the understanding layer, with the mechanics, the reasoning, the federal hooks, and the questions you should be ready for. Read the notes once end to end and you can explain any slide without reading it. Two hats on purpose. Every section carries the technician view (how TLS, EDR, conditional access, SIEM rules, and authorization packages actually work) and the leadership view (who owns the risk, what the directive requires and by when, what to fund, what to put in a contract). Where they differ, the notes say so. Structure. Eleven sections. 01 Foundations: CIA, risk vocabulary, controls, principles, frameworks, threat actors. 02 The technician's toolkit: crypto, network, endpoint, cloud, appsec, one intrusion end to end. 03 Identity and zero trust. 04 Security operations: BOD 26-04 patching, BOD 26-02 edge devices, M-26-14 logging, detection, incident response, resilience. 05 RMF and ATO in depth, the longest section, because it's where Ops, the CISO, and the authorizing official meet. 06 Cloud and FedRAMP after the 2026 overhaul. 07 Law and policy. 08 Supply chain and contracts. 09 AI and security. 10 Classified environments, so the knowledge transfers if you move agencies. 11 Leading it: lines of responsibility, metrics, a 90-day plan, myths, vendor questions, a CISSP domain map, and the 2027 watch list. Currency. Facts were checked against primary and reputable secondary sources as of November 22, 2026. Re-check sections 04 through 07 every six months. Terminology. Executive Order 14434 (September 29, 2026) directs agencies to use "Super Intelligence" and "SI" in place of "AI" in official, non-statutory documents. This is a personal learning deck, so it keeps "AI" for clarity; anything you lift into an official your agency product should follow the order. Where it overlaps the other decks. Data protection, CUI, privacy, and spills are covered in depth in the Data deck; AI model mechanics and frontier risk in the AI deck. This deck links rather than repeats. The cover art is defense in depth. The amber line is an attack path from the internet. It slips through gaps in three dark layers (an unpatched edge device, a reused password, a flat network) and stops at the teal layer that held. To the right is the estate it was after; the light square is the crown jewel. The point: you need every layer, but you only need one to hold.

---

## Five ideas that carry most of the weight

*START HERE*

- 1. Security is risk management, not risk elimination. Know the risk, cut what’s worth cutting, and have an accountable official accept the rest in writing.
- 2. You can’t protect what you don’t know you have. Assets, accounts, software, data, certificates. Nearly every 2026 directive starts with an inventory.
- 3. Identity is the perimeter now. Most damage is done with a valid account. Privilege decides the blast radius.
- 4. Speed is a control. Exploiting known flaws is now the top way in. Time to patch and time to detect beat any tool purchase.
- 5. An ATO is a decision, not a binder. A named official accepts residual risk for the agency. Monitoring keeps that decision true.

**Start here**


???

If you absorb one slide, make it this one. Everything else elaborates one of these five. 1. Risk management. Zero risk doesn't exist and chasing it wastes money. The federal model (FISMA, A-130, RMF) is explicit: identify risk, apply controls proportionate to impact, and have an authorizing official accept the residual risk on the agency's behalf. Your job as Ops is to make that residual risk small, known, and honestly reported. 2. Inventory first. You can't patch, log, encrypt, back up, or migrate to post-quantum crypto on assets you haven't found. BOD 26-02 starts with an edge-device inventory, BOD 26-04 depends on asset exposure data, M-26-14 asks for a logging plan built on asset visibility, M-26-15 starts with a cryptographic inventory, and M-26-05 still requires complete software and hardware inventories even after dropping attestations. The CMDB is a security control. 3. Identity. Attackers log in more than they break in. Phishing, token theft, password reuse, and over-privileged service accounts turn one foothold into the whole estate. Phishing-resistant MFA, least privilege, and just-in-time admin rights shrink what any one stolen identity can do. 4. Speed. The 2026 Verizon Data Breach Investigations Report found exploitation of vulnerabilities was the top initial access vector for the first time in its 19 years: 31% of breaches, against 13% for credential abuse. The median time to fully patch rose to 43 days. Attackers now weaponize some flaws within days of disclosure, which is why CISA moved to risk-based clocks as short as three days. 5. The ATO. An authorization to operate is a senior official's signed acceptance of risk based on evidence (the security plan, the assessment, the open weaknesses). It isn't a certificate that the system is secure, and it goes stale the moment the system or the threat changes. Continuous monitoring is what keeps it honest. Analogy for the whole deck: running security for a touring show. The venue fence is the perimeter, but the laminate (identity) decides who gets backstage. The production manager's gear list (inventory) is how you know a road case went missing. How fast the crew swaps a failing amp (patch speed) matters more than how expensive the amp was. And the promoter signs the insurance (the ATO): they own the decision to put on the show with the known risks.

---

## Foundations

*01 / 11 · 01 · Foundations*

- The vocabulary every security conversation assumes: what we protect, how risk is framed, what a control is, the principles behind good design, the frameworks, and who’s attacking.
- CIA and beyond · Risk vocabulary · Controls · Design principles · The framework map · Threat actors

???

This section is CISSP Domain 1 territory (Security and Risk Management) plus a little of Domain 3. None of it is new to a 2210 with a sysadmin background, but the precise words matter: authorizing officials, inspectors general, and assessors use them in specific ways, and fuzzy vocabulary is the fastest way to lose a risk conversation. Six slides. The CIA triad and what sits beyond it. Risk terms the way an authorizing official uses them, including the four risk responses. Controls by type and by function. Design principles that defeat whole classes of attack. A map of which framework answers which question (CSF, RMF, 800-53, 800-171, ATT&CK, CIS, ISO). And the 2026 threat picture: who attacks, how they get in, and the numbers from the latest breach data. If you're short on time, read the risk slide notes and the framework map notes; they set up section 05 on RMF and the ATO.

---

## What we protect: confidentiality, integrity, availability

*01 · Foundations*

**Confidentiality**

**Integrity**

**Availability**

- Only the right eyes
- Accurate and unaltered
- There when needed
- Access control, encryption, labels
- Hashes, signatures, change control
- Redundancy, backups, capacity
- Fails as: breach, leak, oversharing
- Fails as: tampering, fraud, bad data Fails as: outage, DDoS, ransomware

**Also on the list**

**The attacker’s version**

- Authenticity · non-repudiation · privacy · safety (for OT and facilities)
- DAD: disclosure, alteration, destruction or denial
- FIPS 199 rates each of the three as low, moderate, or high impact. That rating drives the whole RMF.

???

The CIA triad is old, and still the frame every federal categorization uses. Confidentiality: information is disclosed only to authorized people, processes, and devices. Controls: access control, encryption at rest and in transit, sensitivity labels, DLP, need-to-know. Failure looks like a breach, a misdirected email, a SharePoint link shared with "anyone," or an AI tool indexing content its users shouldn't see. Integrity: information and systems are accurate, complete, and changed only in authorized ways. Controls: hashing, digital signatures, change control (your agency’s change board, input validation, file integrity monitoring, separation of duties. Failure looks like tampered payment instructions, altered configuration, a poisoned software update, or ransomware encrypting files (which is an integrity and availability attack at once). Availability: timely, reliable access. Controls: redundancy, capacity management, backups, DDoS protection, contingency planning, patching (unpatched systems crash and get crashed). Failure looks like outages, DDoS, and ransomware. Beyond the triad. Authenticity: the data or party is genuinely who or what it claims to be. Non-repudiation: someone can't credibly deny an action, which in federal systems usually means PIV-based digital signatures and good audit logs. Privacy is related but distinct; a system can be perfectly secure and still use PII in ways the Privacy Act doesn't permit. Safety matters wherever IT touches physical systems, such as building controls and environmental sensors in a server room. Donn Parker's hexad adds possession, authenticity, and utility, which shows up on the CISSP. DAD is the attacker's mirror image: disclosure defeats confidentiality, alteration defeats integrity, destruction or denial defeats availability. Priorities differ by environment. Most business systems weigh confidentiality heavily. Operational technology and life-safety systems put availability and safety first. Classified systems weight confidentiality heavily, and CNSSI 1253 rates C, I, and A separately rather than taking the single highest value (section 10). The trade-offs are real. Encrypt everything with keys only three people hold and availability suffers when they're on leave. Open every share and availability is great while confidentiality is gone. Good design picks the balance on purpose, by information type. Analogy: the master tapes of an album. Confidentiality: nobody bootlegs the unreleased tracks. Integrity: nobody overdubs a part without the producer's sign-off. Availability: the tapes play when the label needs to press the record.

---

## Risk, in the words the authorizing official uses

*01 · Foundations*

- Term
- Meaning
- Example
- Threat
- Anything that can cause harm
- Ransomware crew, insider, flood
- Vulnerability
- A weakness a threat can use
- Unpatched VPN appliance
- Likelihood
- Chance a threat acts and succeeds
- High if exposed and on KEV
- Impact
- Harm to mission, money, or people
- Deal data exposed
- Risk
- Likelihood combined with impact
- High: fix in days, not months
- Control
- A safeguard that lowers either
- Patch, MFA, segmentation
- Residual risk
- What remains after controls
- Accepted in writing by the AO
- Four answers to any risk: mitigate, accept, transfer or share, avoid. Ignoring it isn’t one of them.

???

The vocabulary, precisely, because assessors and inspectors general use it precisely. Threat: any circumstance or event with the potential to cause harm, through a threat source (adversarial, accidental, structural, environmental) exploiting a vulnerability. Vulnerability: a weakness in a system, procedure, control, or implementation. Likelihood: the probability a threat source initiates an event and that it succeeds, which depends on exposure, attacker capability, and existing controls. Impact: the magnitude of harm to operations, assets, individuals, other organizations, or the nation. Risk is the combination. NIST SP 800-30 Rev 1 is the federal risk assessment guide. Qualitative versus quantitative. Federal practice is mostly qualitative: very low to very high, on a matrix. The CISSP also tests the quantitative model: single loss expectancy equals asset value times exposure factor; annualized loss expectancy equals SLE times the annual rate of occurrence. Useful for business cases (is a $60,000 control worth it against a $20,000 annual expected loss?), but the inputs are usually guesses. Risk responses. Mitigate: apply controls. Accept: knowingly carry the risk, documented and approved by someone with authority, usually the authorizing official, with an end date or review point. Transfer or share: insurance, contracts, a cloud provider taking responsibility for its layer (note you can transfer the work, never the accountability). Avoid: stop doing the risky thing, such as retiring an unsupported system. Ignoring a known risk is a decision too, just an undocumented one, and it's what IGs and post-incident reviews find. Risk appetite and tolerance. Appetite is how much risk leadership is willing to pursue for mission; tolerance is the acceptable variation around it. NIST SP 800-39 describes three tiers: organization, mission and business process, and system. Tier 1 sets the appetite; Tier 3 is where an individual system's residual risk gets judged against it. Without Tier 1 direction, every AO decision is ad hoc. Who accepts risk. Not the ISSO, not the system administrator, not the contractor, and not IT Operations. Ops implements controls and recommends; the authorizing official (or the CISO, where the agency has delegated that authority) accepts. Keep a risk register so accepted risks don't quietly become permanent. Analogy: insuring a tour. Threat: a storm. Vulnerability: an outdoor stage. Likelihood: hurricane season in Florida. Impact: cancelled dates. Mitigate with a covered stage, transfer with insurance, avoid by moving indoors, or accept: the promoter signs off that the show goes on.

---

## Controls: what they are and what they do

*01 · Foundations*

**By type**

- Administrative
- Policy, training, background checks, separation of duties
- Technical
- MFA, encryption, firewalls, EDR, logging
- Physical
- Badges, locks, cameras, server room access

**Deter**

**Prevent**

**Detect**

- Login banners, visible cameras
- MFA, app allow-listing
- EDR alerts, log analytics

**Correct**

**Recover**

**Compensate**

- Patch, isolate a host
- Restore from immutable backup
- Extra monitoring when a control can’t be met
- Defense in depth: layer different types and functions so one failure is an event, not a breach.

???

A control is any safeguard or countermeasure that reduces likelihood or impact. Two ways to classify them, both tested on the CISSP and both useful in practice. By type (how it works). Administrative or managerial controls are policies, procedures, training, background investigations, and separation of duties. Technical or logical controls are implemented in hardware and software: MFA, encryption, firewalls, EDR, audit logging, conditional access. Physical controls protect facilities and hardware: badges, locks, mantraps, cameras, environmental monitoring in the server room. Older 800-53 revisions labeled families management, operational, and technical; Rev 5 dropped those labels, but the idea persists. By function (when it acts). Deterrent controls discourage (banners, visible cameras, known prosecution). Preventive controls stop the event (MFA, allow-listing, network segmentation). Detective controls notice it (EDR, SIEM rules, file integrity monitoring, audits). Corrective controls limit and fix damage (patching, isolating a host, disabling an account). Recovery controls restore operations (backups, failover, rebuild runbooks). Compensating controls substitute when the required control isn't feasible: an unsupported but mission-critical system that can't be patched gets network isolation and extra monitoring instead. A compensating control must be documented, justified, and approved by the AO; it isn't a quiet workaround. Existence isn't effectiveness. An assessor asks three questions of every control: is it implemented correctly, operating as intended, and producing the desired outcome? A DLP policy in audit-only mode exists; it doesn't prevent anything. An MFA policy with a broad exclusion group exists; attackers find the exclusions. Common, hybrid, and system-specific. In federal practice, controls are also classified by who provides them. Common controls are provided once and inherited by many systems (enterprise identity, logging, physical security). Hybrid controls are part inherited, part system-specific. This matters enormously for ATO speed (section 05): the more a new system inherits, the less it must build and prove. Defense in depth means layering controls of different types and functions so a single failure doesn't become a breach. The cover art shows it: three layers failed, one held. Analogy: running a big show. Deterrent: security shirts at the gate. Preventive: wristbands checked at every door. Detective: crowd cameras and spotters. Corrective: medics and a crew to clear an aisle. Recovery: the backup generator. Compensating: when a barrier breaks, extra staff stand where it was until it's fixed.

---

## Design principles that stop whole classes of attack

*01 · Foundations*

**Least privilege**

**Separation of duties**

- Only the access the task needs, only for as long as it needs it
- No one person can request, approve, and execute a sensitive change

**Defense in depth**

**Secure by default**

- Independent layers, so one failure isn’t a breach
- The out-of-box setting is the safe one; risk is opt-in

**Fail secure**

**Complete mediation**

- When a control breaks, it denies access rather than allowing it
- Check authorization on every access, not just the first

**Assume breach**

**Keep it simple**

- Design as if the attacker is already inside: zero trust
- Fewer moving parts, fewer exceptions, fewer places to hide

???

Most of these come from Saltzer and Schroeder's 1975 paper on protecting information in computer systems; they've outlived every technology since because they're about structure, not products. Least privilege: every user, process, service account, and AI agent gets only the access it needs, only for as long as it needs it. In practice: role-based access by default, just-in-time elevation through the cloud directory PIM, no standing Global Admins, service accounts scoped to one job. Need-to-know is its information-level cousin, central in classified environments. Separation of duties: split sensitive functions so no single person can commit and conceal fraud or a damaging change. Two-person integrity is the classified-world extreme. Defense in depth: independent, overlapping layers. The key word is independent: three controls that all depend on the same the identity provider tenant aren't three layers if the identity provider is compromised. Secure by default: the default configuration is the safe one; anything riskier requires a deliberate choice. CISA's Secure by Design campaign pushed vendors this way (MFA on by default, no default passwords, logging included at no extra cost). In your own builds: new SharePoint sites private by default, new devices enrolled and compliant before they get tokens. Fail secure (fail-safe defaults): if the policy engine is unreachable, deny rather than allow. The exception is life safety, where doors fail open; that tension is why physical security and IT security sometimes disagree. Complete mediation: check authorization on every request, not once at login. Long-lived tokens and cached permissions violate it; continuous access evaluation and short sessions honor it. It's also the core of zero trust. Assume breach: plan, segment, log, and respond as if an attacker already has a foothold, because eventually one will. It turns "keep them out" into "limit and catch them," which is more achievable. Keep it simple (economy of mechanism): every exception, special-case rule, and bespoke integration is somewhere to hide. Kerckhoffs's principle (open design) belongs here too: security shouldn't depend on keeping the design secret, only the keys. Analogy: a recording studio. The engineer doesn't sign off on their own mix (separation of duties). Session players get the studio key for their booked hours, not forever (least privilege). The tape vault locks if the power fails (fail secure). And the simplest signal chain usually sounds best and breaks least.

---

## The framework map: which document answers which question

*01 · Foundations*

**Outcomes**

- NIST CSF 2.0: govern, identify, protect, detect, respond, recover
- Agency posture, board talk

**Process**

- RMF, SP 800-37 Rev 2: seven steps to an authorization
- Every federal system

**Controls**

- SP 800-53 Rev 5 (release 5.2.0), baselines in 800-53B
- What to implement

**Assessment**

- SP 800-53A: examine, interview, test
- How to prove it works

**Cui outside**

- SP 800-171: CUI on contractor systems
- Contractors, CMMC

**Adversary**

- MITRE ATT&CK: real tactics and techniques
- Detection, threat-informed defense

**Basics first**

- CIS Controls v8.1: prioritized safeguards
- Where small teams start

**Industry**

- ISO/IEC 27001:2022, SOC 2 reports
- Vendors’ evidence

???

The frameworks aren't competitors; each answers a different question. Knowing which is which ends a lot of circular meetings. NIST Cybersecurity Framework 2.0 (February 2024): outcomes, not controls. Six functions: Govern (new in 2.0, putting strategy, roles, policy, and supply chain risk at the center), Identify, Protect, Detect, Respond, Recover. It's the right language for leadership and for describing agency posture; IG FISMA metrics are organized around its functions. Profiles (current and target) and tiers (partial to adaptive) let you describe maturity. Risk Management Framework, SP 800-37 Rev 2 (December 2018): the process every federal information system follows to get and keep an authorization. Seven steps, detailed in section 05. Required by FISMA and OMB Circular A-130. SP 800-53 Rev 5: the catalog of security and privacy controls, 20 families. Release 5.2.0 (August 2025) added controls for software update and patch integrity in response to EO 14306. SP 800-53B holds the low, moderate, high, and privacy baselines. FedRAMP and CNSSI 1253 both build on this catalog. SP 800-53A: assessment procedures for each control, by method (examine, interview, test) and depth. What your assessor works from. SP 800-171: requirements for protecting CUI in non-federal systems, meaning contractors. Rev 3 was published in May 2024; DoW's CMMC program is still anchored to Rev 2. It matters to you when your agency contractors handle CUI on their own systems. MITRE ATT&CK: a knowledge base of real adversary tactics (the why: initial access, persistence, lateral movement) and techniques (the how). Use it to check whether your detections cover what attackers actually do; CISA advisories map to it. CIS Controls v8.1: 18 prioritized safeguard groups with implementation groups (IG1 is the essential baseline). A practical sanity check: if you'd fail CIS IG1, no 800-53 package is telling the truth. ISO/IEC 27001:2022: the international management-system standard, with 93 Annex A controls. You'll see it, and SOC 2 Type II reports, as vendor evidence. Useful, but neither substitutes for FedRAMP for a federal cloud service. How they connect at your agency: CSF to brief leadership, RMF and 800-53 to authorize systems, 800-53A for assessors, ATT&CK for detection coverage, 800-171 in contracts where contractors hold CUI. Analogy: making records. CSF is music theory: the shared language of what good sounds like. RMF is the production process from demo to release. 800-53 is the chord book; 800-53A is the audition rubric. ATT&CK is a scouting report on how other bands steal your songs.

---

## Who’s attacking, and how they get in

*01 · Foundations*

**Nation states**

- China pre-positions in infrastructure and telecom; Russia, Iran, North Korea for espionage, disruption, and cash

**Ransomware crews**

**2026 breach data (verizon dbir)**

- 31% entered by exploiting a vulnerability, now the top vector Industrialized extortion; Qilin claimed ATF in August 2026
- 48%
- INSIDERS involved a third party, up 60% in a year
- Malicious or careless; already hold valid access
- 43 days
- THIRD PARTIES median time to fully patch
- Your vendors’ weaknesses become your entry points

**01 · foundations · source: verizon 2026 dbir**


???

Threat actors, by motive and capability. Nation states. China is the most active against U.S. government and infrastructure. Volt Typhoon prepositioned in critical infrastructure using living-off-the-land techniques (built-in admin tools, no malware to detect). Salt Typhoon compromised telecom carriers' lawful-intercept systems; the FBI said in February 2026 that the threat was still very much ongoing. In 2026 the FBI declared a major incident after suspected Chinese actors reached its Digital Collection System Network, which manages court-authorized wiretap and penregister data, through a commercial ISP vendor's infrastructure; it was first detected February 17. Russia focuses on espionage and disruption, Iran on disruption and influence, North Korea on revenue (crypto theft, fraudulent IT workers hired by U.S. companies). Ransomware crews run as businesses: initial-access brokers sell footholds, affiliates deploy, operators negotiate. Qilin is among the most prolific; on August 26, 2026 it listed ATF on its leak site, and DOJ designated the ATF incident, on a standalone system holding investigative information, a major incident, triggering notice to Congress. Insiders hold legitimate access, so perimeter controls don't apply. Most insider incidents are careless, not malicious: misdirected email, oversharing, shadow AI. Third parties. Your contractors, SaaS providers, and their providers. In the DBIR, breaches involving a third party reached 48%, up 60% from the prior year. The 2026 Verizon DBIR (published May 19, 2026, covering incidents from November 2024 to October 2025; about 22,000 confirmed breaches in 145 countries). Exploitation of vulnerabilities became the top initial access vector for the first time in the report's 19 years: 31%, up from 20%, while credential abuse fell to 13%. Median time to fully patch rose to 43 days from 32. Only 26% of critical KEV vulnerabilities were fully remediated, down from 38%. Shadow AI showed up as a significant non-malicious factor. These numbers are why CISA rewrote its patching directive (section 04). How intrusions typically flow: initial access (an exploited edge device, a phished credential, a compromised vendor), then persistence, privilege escalation, lateral movement, collection, exfiltration, and impact. Section 02 walks one end to end. Analogy: who wants into the venue. Professionals who case it for months (nation states), smash-and-grab crews who hit whoever left a door open (ransomware), the roadie who already has keys (insider), and the catering company whose van gets waved through every night (third parties).

---

## The technician’s toolkit

*02 / 11 · 02 · Technician’S Toolkit*

- How the core defenses work underneath: cryptography, networks, endpoints, cloud, and application security, then one intrusion walked end to end so you can see where each control bites.
- Cryptography and PKI · Network defense · Endpoints · Cloud · Application security · Anatomy of an intrusion

???

This is the section that lets you hold your own with engineers, assessors, and contractor technical leads: how TLS and certificates actually work, why segmentation beats perimeter, what EDR does that antivirus didn't, why cloud breaches are mostly configuration and identity, how secure development is supposed to work, and the chain of steps in a real intrusion. It maps to CISSP Domains 3 (Security Architecture and Engineering), 4 (Communication and Network Security), 7 (Security Operations), and 8 (Software Development Security).

---

## Cryptography and PKI in one slide

*02 · Technician’S Toolkit*

- Tool
- What it does
- Where you see it
- Symmetric (AES-256)
- One shared key; fast bulk encryption
- BitLocker, storage, TLS sessions
- Asymmetric (RSA, ECC)
- Key pairs to agree keys and sign
- TLS handshake, PIV, S/MIME
- Hash (SHA-256, -384)
- Fingerprint that proves no change
- Integrity checks, salted passwords
- Digital signature
- Hash signed with a private key
- Code signing, PIV, SAML tokens
- PKI and certificates
- A CA vouches a key belongs to a name
- Web TLS, PIV, device certificates
- FIPS 140-3 modules
- Validated implementations
- Required in federal systems
- Most crypto failures are key management and expired certificates, not broken math. Public TLS certificate lifetimes are shrinking to 47 days by 2029.

???

The mechanics, in the order they work together in a TLS connection. Symmetric encryption uses one shared secret key for both directions. AES with 256-bit keys is the federal workhorse: fast enough for bulk data (disk encryption, database encryption, the body of every TLS session). The hard part is getting the key to both sides safely. Asymmetric encryption uses a key pair: a public key anyone can have and a private key only the owner holds. It's slow, so it's used to agree on or exchange symmetric keys (Diffie-Hellman or RSA key exchange in the TLS handshake) and to sign things. RSA and elliptic-curve crypto are what quantum computers will eventually break, which is why ML-KEM (FIPS 203) and ML-DSA (FIPS 204) are coming (section 07). Hashing produces a fixed-length fingerprint; change one bit and the hash changes completely, and you can't reverse it. SHA-256 and SHA-384 are standard; MD5 and SHA-1 are broken for security use. Passwords should be stored as salted, deliberately slow hashes (PBKDF2, bcrypt, Argon2) so a stolen database can't be cracked quickly. A digital signature is a hash of the content encrypted with the signer's private key; anyone with the public key can verify who signed and that nothing changed. That's integrity plus authenticity plus non-repudiation. It's how code signing, PIV email signing, SAML assertions, and software updates are trusted. PKI answers "whose public key is this?" A certificate authority signs a certificate binding a public key to a name (a website, a person's PIV, a device). Browsers and operating systems trust a set of root CAs; federal PIV chains up to the Federal PKI. Revocation (CRL, OCSP) handles compromised keys. FIPS 140-3 is the validation standard for cryptographic modules; federal systems must use validated modules, which is why "AES-256" on a vendor slide isn't enough: ask for the CMVP certificate. TLS: 1.2 is the floor; agencies are to support TLS 1.3 or a successor by January 2, 2030 (carried forward in EO 14306). Operations reality. Outages from expired certificates are more common than cryptographic breaks. The CA/Browser Forum approved shrinking maximum public TLS certificate lifetimes to 200 days from March 2026, 100 days from March 2027, and 47 days from March 2029. Manual renewal won't survive that; automate with ACME and track every certificate in an inventory. Analogy: symmetric is one key to the green room shared by the band. Asymmetric is a mailbox: anyone can drop a letter in, only you can open it. A hash is the fingerprint of the master tape. A signature is the producer signing the master. The CA is the label vouching that the signature is really the producer's.

---

## Network defense: segment, inspect, and see

*02 · Technician’S Toolkit*

**Edge**

- Firewalls, VPN, SD-WAN, load balancers
- Most-attacked; patch or replace first

**Segmentation**

- VLANs, microsegmentation, admin networks apart
- Stops lateral movement

**Inspection**

- IDS and IPS, TLS inspection, web gateway
- the secure web gateway

**Access**

- Zero trust network access replaces the VPN
- the ZTNA service

**Dns**

- Protective DNS, DNSSEC, block new domains
- Cheap, high-yield blocking

**Visibility**

- Flow logs, packet capture, network detection
- Feeds the SIEM

**Tic 3.0**

- Trusted internet connections, by use case
- CISA architecture guidance

???

The network is no longer the perimeter, but it's still where you stop lateral movement and where much of your evidence comes from. Edge. Firewalls, VPN concentrators, SD-WAN controllers, routers, and load balancers sit on the internet, run with high privilege, rarely have EDR, and log poorly. That's why they're the most exploited devices in federal networks: BOD 26-02 (February 2026) orders end-of-support edge devices out, and Emergency Directive 26-03 (February 25, 2026) ordered agencies to inventory, collect forensic data from, and patch Cisco SD-WAN systems under active exploitation. Treat edge firmware as tier-zero patching. Segmentation. A flat network lets one compromised laptop reach every server. VLANs and firewall rules separate user, server, management, and OT networks; microsegmentation (host-based rules or software-defined policy) goes further, down to workload-to-workload. Admin interfaces belong on a separate management network reachable only from privileged access workstations. Inspection. Intrusion detection and prevention systems look for attack signatures and anomalies. TLS inspection decrypts, inspects, and re-encrypts traffic (the secure web gateway does this for web traffic); it's powerful and is also a data-handling decision you should document, with exemptions for categories like health and finance sites. Zero trust network access (ZTNA). Instead of a VPN that drops users onto the network, ZTNA brokers a connection to one application at a time, after checking identity and device posture. the ZTNA service is your agency’s version. It shrinks the attack surface: no inbound VPN port to exploit. DNS. Most malware needs DNS to call home. CISA's Protective DNS service for federal civilian agencies blocks known-bad domains; blocking newly registered domains and logging all queries is cheap, high-yield defense. Visibility. NetFlow and VPC flow logs show who talked to whom; packet capture shows what was said; network detection and response tools find anomalies. All of it feeds the SIEM (the SIEM) and matters for M-26-14 logging (section 04). TIC 3.0. Trusted Internet Connections moved from forcing all traffic through a few physical chokepoints to use-case-based architecture (traditional, branch office, remote user, cloud) with security capabilities that can be delivered by cloud services like the SSE platform. Analogy: a festival site. Perimeter fence (edge), separate fenced areas for backstage, catering, and the production office (segmentation), bag checks (inspection), a wristband scanned at every stage rather than just the main gate (ZTNA), and cameras on every path (visibility).

---

## Endpoints: harden, patch, watch, and contain

*02 · Technician’S Toolkit*

**Harden**

**Patch**

- STIG or CIS benchmarks; endpoint management security baselines
- OS, browsers, third-party apps, firmware
- BitLocker, app control, no local admin (LAPS)
- Rings: pilot, broad, stragglers; measured by risk tier

**Watch**

**Contain**

- EDR (EDR) on every device
- Isolate a host from the EDR console in minutes
- Telemetry to the SIEM; compliance status in endpoint management
- Remote wipe; mobile threat defense for mobile threats
- Compliance should gate access: a laptop that isn’t enrolled, encrypted, and patched gets no token.

???

Endpoints are where users meet attackers: phishing payloads, malicious downloads, stolen session cookies. Harden. Start from a published baseline: DISA STIGs (DoW-flavored, very strict) or CIS Benchmarks, implemented through endpoint management security baselines and configuration profiles. The essentials: full-disk encryption (BitLocker with keys escrowed), application control (Windows EDR Application Control or AppLocker; at minimum block execution from user-writable folders), attack surface reduction rules (block Office macros from the internet, block credential theft from LSASS), Credential Guard, no standing local admin rights, and unique local admin passwords managed by Windows LAPS. Patch. Operating system, browsers, the long tail of third-party apps (PDF readers, Java, Zoom), drivers, and firmware. Use deployment rings: a small pilot group, then broad deployment, then a hunt for stragglers that silently failed. Measure against the BOD 26-04 risk tiers (section 04), not a monthly cycle. Watch. Endpoint detection and response records process, file, registry, and network activity and detects behavior (a Word document spawning PowerShell that contacts a new domain), not just known-bad files. EDR is EDR; its signals should flow to the SIEM. Coverage is a metric: an endpoint without EDR is invisible. Contain. When something fires, EDR can isolate the device from the network while keeping it connected to the console for investigation. endpoint management can retire or wipe a lost or compromised device. Compliance gates access. This is the zero trust device pillar in practice: the cloud directory conditional access requires a compliant device (enrolled, encrypted, healthy) before issuing tokens to Microsoft 365 and other apps. The fix is enrollment, not an exception. Analogy: each musician's rig. Hardened (set up to the house standard, no mystery pedals), restrung on a schedule (patched), watched by a tech who hears a problem before the audience does (EDR), and muted instantly when it feeds back (isolation). And nobody plugs into the house PA without passing the line check (compliance gate).

---

## Cloud security is mostly configuration and identity

*02 · Technician’S Toolkit*

- Layer
- IaaS
- PaaS
- SaaS
- Data and access
- You
- You
- You
- Configuration
- You
- You
- You
- Overprivileged service principals
- Application
- You
- Shared
- Provider
- Stolen tokens replayed
- OS and runtime
- You
- Provider
- Provider
- Logging left at defaults
- Hardware, facility
- Provider
- Provider
- Provider

**What goes wrong**

- Public storage, open sharing
- Risky third-party app consent
- BOD 25-01: CISA’s SCuBA baselines set the secure configuration for Microsoft 365 tenants in civilian agencies.

???

Cloud providers are very good at securing their layer. Most cloud breaches happen in the customer's layer: configuration and identity. Shared responsibility. In IaaS (Azure virtual machines) you own almost everything above the hypervisor: OS patching, network rules, identity, data. In PaaS (Azure App Service, Azure SQL) the provider runs the OS and runtime; you own the application code, configuration, identity, and data. In SaaS (Microsoft 365, the ITSM platform, the identity provider, Box, the SSE platform) the provider runs the application; you still own who has access, how it's configured, what data goes in, and whether logs are collected. Data and access are always yours. FedRAMP packages spell this out in a customer responsibility matrix: read it, because every "customer responsibility" line is a control you must implement and prove in your own ATO. What goes wrong. Storage containers or SharePoint sites exposed publicly. Service principals and app registrations with broad permissions and long-lived secrets. Stolen session tokens replayed from attacker infrastructure, bypassing MFA (adversary-in-the-middle phishing kits do this routinely). Audit logging that wasn't turned on or retained long enough to investigate. Users or admins consenting to third-party apps that then read mail and files via OAuth; the 2025 Salesloft Drift campaign stole OAuth tokens to pull data from many companies' Salesforce instances. Government clouds. Microsoft 365 comes in commercial, GCC (FedRAMP Moderate-level, U.S. data residency), GCC High (FedRAMP High, ITAR/CUI-heavy work), and DoD environments. Feature parity lags commercial, so check before you promise a capability. BOD 25-01 (December 2024) requires civilian agencies to assess their Microsoft 365 tenants with CISA's Secure Cloud Business Applications (SCuBA) tooling, implement the mandatory baseline configurations, and report continuously. It's the closest thing to a federal hardening standard for M365: conditional access, legacy authentication blocked, privileged role rules, sharing defaults, and audit logging. Tooling. Cloud security posture management (EDR for Cloud, other CNAPP tools) continuously checks configuration against baselines. the cloud directory protection and conditional access for workload identities cover non-human accounts. The Storm-0558 case (2023), where a stolen Microsoft signing key let attackers forge tokens into government mailboxes, is why agencies now insist on access to enhanced logs at no extra cost. Analogy: renting a venue. The owner secures the building, the fire exits, and the power. You decide who gets keys to the loading dock, whether the doors are propped open, and whether anyone is watching the cameras during your show.

---

## Application security: build it in, don’t bolt it on

*02 · Technician’S Toolkit*

- Practice
- What it catches
- When
- Threat modeling
- Design flaws (STRIDE)
- Design
- SAST, secrets scanning
- Code flaws, keys committed to code
- Every commit
- SCA and SBOM
- Vulnerable or malicious libraries
- Every build

**Dast**

- Flaws in the running application
- Test environment
- Penetration test
- Chained, real-world exploits
- Before release, then yearly
- WAF, runtime protection
- Attacks against production
- Always on
- Broken access control tops the OWASP Top 10. Most app breaches are logic and permissions, not exotic exploits.

???

Threat modeling asks, at design time, what could go wrong. STRIDE is the common checklist: spoofing (identity), tampering (integrity), repudiation (logging), information disclosure (confidentiality), denial of service (availability), elevation of privilege (authorization). Cheap on a whiteboard, expensive after go-live. Static application security testing (SAST) scans source code for flaws (injection, unsafe deserialization, hard-coded secrets) on every commit. Secrets scanning catches API keys and passwords before they reach a repository. Software composition analysis (SCA) inventories open-source dependencies and flags known-vulnerable or malicious packages; the output is a software bill of materials (SBOM), an ingredient list you can check the next time a Log4j-style flaw lands. Dynamic testing (DAST) attacks the running application. Penetration testers chain small weaknesses into real compromises. Web application firewalls and runtime protection catch attacks in production and buy time to fix code. The NIST Secure Software Development Framework (SP 800-218, with 800-218A adding AI-specific practices) is the federal reference. OMB M-26-05 (January 23, 2026) rescinded the requirement to collect secure-development attestation forms from vendors, but it tells agencies to validate provider security through risk assessment instead, so the practices still matter; only the paperwork changed. SP 800-53 Release 5.2.0 added controls on update integrity and developer testing for the same reason. OWASP Top 10: broken access control (users reaching data or functions they shouldn't, such as changing an ID in a URL to see someone else's record) has topped the list since 2021. Injection, security misconfiguration, vulnerable components, and authentication failures follow. For APIs and AI apps, OWASP publishes separate lists; prompt injection leads the LLM list (section 09). Memory safety. The DBIR noted that 89% of organizations had to patch memory-safety vulnerabilities in 2025, a bug class known for decades. Memory-safe languages (Rust, Go, C#, Java) eliminate it; CISA and NSA have urged vendors to publish memory-safety roadmaps. DevSecOps puts these checks in the pipeline so they run every time, automatically, and produce evidence an assessor can use. That evidence is the basis of continuous ATO (section 05). For low-code (Power Platform, the ITSM platform): the same principles apply. Connectors are integrations, flows run with someone's permissions, and "citizen developers" need guardrails: DLP policies, environment strategy, and ownership. Analogy: soundcheck before the show versus fixing feedback mid-song. Threat modeling is reading the room before you set up; SAST is checking each cable; DAST is the full band run-through; the pen tester is the friend who tries to sneak backstage to test your crew.

---

## Anatomy of an intrusion, and where each control bites

*02 · Technician’S Toolkit*

**1 · initial access**

**2 · persistence**

**3 · privilege**

- Exploit an unpatched VPN or firewall
- Web shell, new account, scheduled task
- Dump credentials, abuse a service account
- Stops it: patch by risk tier; retire end-ofsupport edge
- Stops it: EDR, alerts on new admins and services
- Stops it: Credential Guard, PIM, tiered admin

**4 · lateral movement**

**5 · exfiltration**

**6 · impact**

- RDP, SMB, and admin tools to other hosts
- Stage data, upload to cloud storage
- Encrypt, wipe, or extort
- Stops it: segmentation, no shared local admin
- Stops it: DLP, egress filtering, logging
- Recovers it: immutable backups, tested restores

???

A composite intrusion, the kind that shows up repeatedly in CISA advisories and incident reports, mapped to MITRE ATT&CK tactics. 1. Initial access. The attacker scans the internet for a VPN appliance with a known vulnerability, often within days of disclosure, and exploits it. Alternatives: a phished user whose session token is stolen by an adversary-in-the-middle kit, or a compromised vendor connection (the FBI's 2026 wiretap-network breach came through an ISP vendor's infrastructure). Controls: BOD 26-04 risk-based patching, BOD 26-02 edge-device retirement, phishing-resistant MFA, vendor access reviews. 2. Execution and persistence. They drop a web shell on the appliance, create a local account, or register a scheduled task or service so they survive a reboot. On edge devices, persistence can sit in firmware and survive upgrades, which is why ED 26-03 required forensic snapshots before patching. Controls: EDR on servers, alerts on new accounts and services, configuration baselines with drift detection. 3. Privilege escalation and credential access. They dump credentials from memory (LSASS), find passwords in scripts or file shares, or abuse an over-privileged service account. In Active Directory: Kerberoasting service accounts, then DCSync to pull every hash. Controls: Credential Guard, LAPS, strong service-account passwords or managed identities, the cloud directory PIM with no standing admin, a separate tier for domain controllers and identity systems. 4. Discovery and lateral movement. They map the network with built-in tools (living off the land, as Volt Typhoon does: no malware to catch) and move with RDP, SMB, PowerShell remoting, or the organization's own remote management tools. Controls: segmentation, blocking workstation-to-workstation traffic, unique local admin passwords, detection rules for unusual admin-tool use. 5. Collection and exfiltration. They stage data in an archive and send it to cloud storage or attacker infrastructure, often slowly to avoid notice. Controls: DLP, egress filtering through the SSE platform, alerts on large uploads to new destinations, and logging that's retained long enough to reconstruct what left (M-2614). 6. Impact. Ransomware encrypts files and backups; data is posted to a leak site to force payment; or, for state actors, nothing visible happens, because espionage was the goal. Recovery depends on immutable, tested backups and a rehearsed rebuild of identity systems. Dwell time is the gap between steps 1 and detection. Every control that fires earlier shortens it. The full ATT&CK enterprise matrix has 14 tactics; this slide compresses them to six. Analogy: a heist film. The crew finds an unlocked service door (initial access), props it open (persistence), lifts a master key from a guard (privilege), walks the corridors in staff uniforms (lateral movement), loads the van slowly (exfiltration), and leaves a ransom note (impact). Every guard, camera, and locked inner door is a chance to end the movie early.

---

## Identity and zero trust

*03 / 11 · 03 · Identity*

- Most serious intrusions end with an attacker using a real account. Proving who someone is, controlling what they can do, and the zero trust model built on both.
- Authentication and assurance levels · Privileged access · Zero trust architecture · Joiner, mover, leaver

???

Identity is where IT Operations and security overlap most. Four slides: authentication and authorization, including the 2025 update to NIST's digital identity guidelines; privileged access, the single biggest lever on blast radius; zero trust as federal policy and as architecture, with CISA's maturity model and DoW's 2027 deadline; and the joiner-mover-leaver process, where access quietly goes wrong. CISSP mapping: Domain 5 (Identity and Access Management) and parts of Domains 3 and 4.

---

## Identity: prove who it is, then decide what it gets

*03 · Identity*

**Authentication**

**Authorization**

**Federation**

- Who are you?
- What may you do?
- One identity, many apps
- Phishing-resistant: PIV, FIDO2 keys, device-bound passkeys
- Not: SMS codes, simple push approvals
- Roles by default, attributes for nuance
- SAML, OpenID Connect, OAuth
- Conditional access: user, device, location, risk
- SCIM to create and remove accounts
- NIST SP 800-63-4 (final 2025) sets assurance levels for identity proofing (IAL), authentication (AAL), and federation (FAL).

???

Authentication proves identity; authorization decides what that identity may do; federation lets one trusted identity provider vouch for a user to many applications. Authentication factors: something you know (password, PIN), have (PIV card, security key, enrolled phone), or are (biometric). MFA combines two different types. Not all MFA is equal. SMS codes can be intercepted or SIM-swapped. Push notifications get approved by tired users (MFA fatigue) unless number matching is enforced. One-time codes and push both fail against adversary-in-the-middle phishing, where a proxy site relays the login and steals the session cookie. Phishing-resistant methods bind the login to the real site cryptographically, so a fake site gets nothing usable: PIV and CAC smart cards, FIDO2 security keys, and device-bound passkeys (Windows Hello for Business is one). OMB M-22-09 requires phishing-resistant MFA for agency staff, contractors, and partners. NIST SP 800-63-4, finalized in 2025, revises the digital identity guidelines. Identity assurance levels (IAL1 to IAL3) cover how confidently you proved a person is who they claim at enrollment. Authenticator assurance levels (AAL1 to AAL3) cover login strength; AAL2 must offer a phishing-resistant option and AAL3 requires a hardware-based phishing-resistant authenticator. Federation assurance levels (FAL1 to FAL3) cover how assertions are protected. Your system's e-authentication assessment picks the levels. Authorization. Role-based access control assigns permissions to roles and people to roles; it's manageable but gets coarse. Attribute-based access control decides by attributes of the user (office, employee type, citizenship), the resource (label, sensitivity), and the context (device compliance, location, sign-in risk). the cloud directory conditional access and the identity provider policies are practical attribute-based engines: for example, require a compliant device and phishing-resistant MFA for the finance app; block legacy authentication everywhere. Federation. SAML 2.0 (common in enterprise apps) and OpenID Connect on top of OAuth 2.0 (modern apps and APIs) let the identity provider or the cloud directory issue signed assertions so apps never see passwords. SCIM automates account creation and removal in connected apps, which is how deprovisioning actually reaches SaaS. Tokens are the new passwords. After login, apps hold session and refresh tokens. Steal one and you skip MFA entirely. Shorter token lifetimes, continuous access evaluation, and token protection (binding tokens to the device) shrink that window. Analogy: the festival laminate. Checking your ID at the box office is identity proofing; the laminate with your photo is the authenticator; its color-coding (all access, stage only, catering) is authorization; and one promoter's laminate working at every stage is federation.

---

## Privileged access is the blast radius

*03 · Identity*

**Separate**

**Just in time**

- Admins get separate admin accounts
- the cloud directory PIM: request, approve, expire
- Admin work only from hardened admin workstations
- No standing Global Admin or Domain Admin

**Tiered**

**Non-human**

- Tier 0: AD, the cloud directory, the identity provider, PKI, backups
- Service accounts, app registrations, API keys, AI agents
- Tier 0 credentials never touch lower tiers
- Each has an owner, scope, rotation, and monitoring
- Break-glass: two cloud-only emergency accounts with phishing-resistant keys, alarmed on every sign-in, tested quarterly.

???

A compromised user account hurts; a compromised admin account ends careers. Privileged access management is the highest-yield identity work there is. Separate. Administrators use a distinct admin identity for privileged tasks and a normal account for email and browsing, so a phishing link can't run with admin rights. Admin work happens from privileged access workstations: hardened devices with no email or web browsing. Cloud admin accounts should be cloud-only, not synced from on-premises AD, so an AD compromise doesn't hand over the cloud. Just in time. the cloud directory Privileged Identity Management makes roles eligible rather than active: the admin requests elevation, gives a reason, optionally gets approval, and the role expires after a set time. Every activation is logged. Tiering. Tier 0 is anything that controls identity or can grant itself control: domain controllers, the cloud directory and the identity provider admin roles, the PKI, identity sync servers, backup systems, and the management plane of virtualization. Tier 1 is servers and applications; Tier 2 is user endpoints. The rule: higher-tier credentials never log on to lower-tier systems, because credentials left in a laptop's memory are what attackers harvest. Microsoft's enterprise access model is the current version of this. Non-human identities now outnumber people in most enterprises: service accounts, scheduled-task accounts, Azure app registrations and service principals, API keys, automation runbooks, the ITSM platform integration users, and, increasingly, AI agents (section 09). Each needs a named human owner, the narrowest scope, managed or short-lived credentials (managed identities in Azure, workload identity federation), rotation, and monitoring for use outside its normal pattern. Long-lived secrets in scripts are a favorite find for attackers. Break-glass accounts. Two emergency access accounts, cloud-only, with phishing-resistant authentication (for example, FIDO2 keys kept in separate safes), excluded only from the conditional access policies that could lock everyone out, alerted on any sign-in, and tested on a schedule. Their purpose is recovery when federation or MFA fails. Measure: standing privileged assignments, privileged accounts without phishing-resistant MFA, service accounts with no owner, secrets older than their rotation period, and admin sign-ins from non-admin workstations. Analogy: the keys to the master-tape vault. Only a few people have them, they sign them out for a session and return them, they never carry them to the bar after the gig, and the spare set sits in a safe with an alarm on the door.

---

## Zero trust: never assume, always verify, limit the damage

*03 · Identity*

- Pillar
- What “advanced” looks like
- Your agency tooling
- Identity
- Phishing-resistant MFA, risk-based access
- the identity provider, the cloud directory, PIV
- Devices
- Full inventory; only compliant devices get in
- endpoint management, EDR, mobile threat defense
- Networks
- Segmented, encrypted, no implicit trust
- ZTNA and secure web gateway
- Applications
- Every app behind identity-aware access
- the identity provider, the cloud directory, the ZTNA service
- Data Classified, labeled, protected, monitored
- the compliance and DLP suite
- Cross-cutting
- Visibility, automation, governance
- the SIEM, the ITSM platform
- CISA maturity model: traditional, initial, advanced, optimal. DoW target level: 91 activities by September 30, 2027.

???

Zero trust is a strategy, not a product: stop granting trust based on network location, verify every request explicitly, grant least privilege, and assume breach. NIST SP 800-207 (2020) defines the architecture: a policy decision point evaluates each access request using identity, device, and context signals, and a policy enforcement point allows or blocks it. Federal policy. OMB M-22-09 (January 2022) set the civilian strategy with goals for each pillar: centrally managed identity with phishing-resistant MFA; a complete device inventory with EDR; encrypted DNS and HTTP traffic and segmentation; applications treated as internet-connected and tested; and data categorization and protection. Its original deadlines (end of FY2024) have passed; the expectations haven't, and the FY2026 cybersecurity budget priorities memo asked agencies for updated zero trust implementation plans with current and target maturity for every system. CISA's Zero Trust Maturity Model 2.0 (April 2023) has five pillars (identity, devices, networks, applications and workloads, data) and three cross-cutting capabilities (visibility and analytics, automation and orchestration, governance), each rated traditional, initial, advanced, or optimal. It's a good self-assessment tool: score each pillar honestly, pick a target per pillar, and fund the gaps. DoW has the harder deadline. Its 2022 Zero Trust Strategy requires all components to reach target level, 91 capability activities across seven pillars, by September 30, 2027, with 61 more for advanced level later. NSA publishes Zero Trust Implementation Guidelines and launched a central web page for them in May 2026. Earlier assessments found only a small share of target-level activities complete, so expect a scramble through 2027; that matters if you move to a DoW-adjacent agency. at your agency, most of the plumbing exists: the identity provider and the cloud directory conditional access, endpoint management compliance, the SSE platform the ZTNA service instead of a traditional VPN, the compliance and DLP suite for labels and DLP, the SIEM for visibility. The work is closing gaps between them: are there conditional access exclusions nobody can explain? Do unmanaged devices still reach anything? Are service accounts subject to the same policies as people? Is data labeling real or aspirational? Common traps: buying a "zero trust platform" and calling it done; exempting executives and admins (the highest-value targets) from controls; and forgetting non-human identities. Analogy: a venue where every door checks the laminate, not just the front gate. Being inside the building isn't proof you belong backstage; the scanner at each door asks again, and the laminate stops working the moment the tour manager revokes it.

---

## Joiner, mover, leaver: where access goes wrong

*03 · Identity*

**Joiner**

- HR record triggers the account

**Mover**

- Role-based access by default
- Remove old access when new access is granted
- Never “same as Bob”
- The biggest source of access creep

**Leaver**

- Disable at separation
- Revoke sessions and tokens, not just the password

**Access reviews**

**Orphans**

**Contractors**

- Quarterly for privileged roles, yearly for everyone
- Enabled accounts with no matching
- HR record
- An end date on every account, tied to the contract

???

Joiner-mover-leaver (JML) is unglamorous and it's where most access problems are born. It's also where IT Operations, HR, and security share one process, which is why it belongs in your stewardship of IT and HR data. Joiner. An HR record (or a contractor onboarding record approved by the COR) should trigger account creation, with access assigned by role: the standard bundle for a position. Requests like "give her the same access as Bob" copy every exception Bob has accumulated over ten years. Provision downstream SaaS through SCIM from the identity provider or the cloud directory so creation and removal are automatic. Mover. When someone changes jobs, the new access gets added promptly because they complain; the old access is rarely removed because nobody complains. Over years, movers accumulate access far beyond any role (privilege creep). The fix is a mover workflow that removes the old role's bundle by default, with exceptions approved and time-limited. Leaver. Disable the account at separation, not after the property turn-in. Disabling an Active Directory account doesn't immediately end cloud sessions: refresh tokens can keep a mail client or Teams session alive. Revoke sessions in the cloud directory and the identity provider, remove MFA methods, reclaim devices, deactivate badges, and decide what happens to the mailbox and OneDrive under records rules. Access reviews. Managers or data owners recertify who has what: quarterly for privileged roles, at least yearly for everyone. Rubber-stamp reviews are a known IG finding; make them small and specific (review the 12 people with access to the finance app, not a 4,000-line spreadsheet). the cloud directory access reviews and the ITSM platform can automate the mechanics. Orphans. Enabled accounts with no matching active HR or contractor record. The query from the Data deck (active in HR versus enabled in the cloud directory and the identity provider) finds them; run it monthly and report the count. Shared and generic accounts belong in the same review. Contractors. Every contractor account gets an expiration date tied to the period of performance or the individual's assignment, and the COR is notified when someone leaves the contract. This is a frequent gap across agencies. Analogy: when a musician leaves the band, you take back the studio key, change the alarm code, remove them from the group chat and the shared drive, and reassign their parts. When someone switches from guitar to keys, they don't keep the guitarist's pedalboard.

---

## Security operations

*04 / 11 · 04 · Security Operations*

- The daily work that decides most outcomes: fixing vulnerabilities on the right clock, retiring unsupported edge devices, logging what matters, detecting, responding, and recovering.
- Vulnerability management under BOD 26-04 · Edge devices · Logging under M-26-14 · Detection · Incident response · Resilience

???

This section is the most operational, and the most time-sensitive. Three 2026 mandates reshape it. BOD 26-04 (June 10, 2026) replaced the KEVdeadline and internet-facing directives with a four-variable risk model; its new remediation timelines apply from December 7, 2026, about two weeks after this deck's date. BOD 26-02 (February 5, 2026) orders end-of-support edge devices off federal networks on a 24-month schedule, with the 12month removal milestone landing in February 2027. OMB M-26-14 (May 22, 2026) replaced M-21-31's fixed logging tiers with a risk-based maturity model and an agency logging plan, supported by CISA's Logging Reference Architecture (August 20, 2026). Then detection, incident response (including the federal reporting clocks and the major incident definition), and resilience against ransomware. So IT Operations implements and executes (patching, configuration, containment actions, restoration), while the CISO's organization owns monitoring, adjudication, and reporting. The handoffs between them are where things fail; the leading-it section returns to this. CISSP mapping: Domain 7 (Security Operations) and Domain 6 (Security Assessment and Testing).

---

## Vulnerability management now runs on BOD 26-04’s clock

*04 · Security Operations*

**Four questions for every finding**

**Fastest**

- 3 days, plus forensic triage: exposed, exploited, full control

**Graduated**

- Longer windows, out to about 60 days, as risk falls

**Deferred**

- Lowest risk: documented, fixed at the next upgrade
- Is the asset exposed to the internet?
- Is the flaw on CISA’s Known Exploited Vulnerabilities list?
- Can exploitation be automated?
- Would it give an attacker full control?
- New timelines apply from December 7, 2026. BOD 26-04 supersedes BOD 19-02 and BOD 22-01.

???

BOD 26-04, "Prioritizing Security Updates Based on Risk," issued June 10, 2026, is the biggest change to federal patching since the KEV catalog. It supersedes and revokes BOD 19-02 (internet-facing critical and high flaws on CVSS-based deadlines) and BOD 22-01 (the KEV catalog with flat deadlines). It applies to federal civilian executive branch agencies, not national security systems. The model. Each vulnerability on each asset is evaluated on four variables: public exposure of the asset, KEV status, whether exploitation is automatable, and technical impact (partial versus total control). The combination sets the remediation window. At the top, an exposed asset with a known-exploited flaw that grants total control gets roughly three days and mandatory forensic triage, because when a flaw like that has been exploited in the wild, patching alone doesn't tell you whether you were already compromised. Lower combinations get graduated windows; vendor summaries put the outer windows around 60 days. The lowest-risk findings can be formally deferred until the next major upgrade, with documentation. The logic comes from CISA's Stakeholder-Specific Vulnerability Categorization (SSVC) decision trees. Read the directive's table for exact tiers before you write policy. Timeline. Agencies had to update vulnerability management policies first; the new remediation deadlines apply 180 days after issuance, December 7, 2026. CISA can request your policy. FedRAMP mapped its 2026 vulnerability rules to BOD 26-04, so cloud providers will report on the same model. Why the change. CVSS measures severity, not risk; patching every "critical" on a fixed clock burned effort on unreachable systems while exploited flaws on exposed ones waited. Meanwhile attackers moved faster: the DBIR's median time to full patch was 43 days, and CISA cited AI-accelerated exploitation in its rationale. What it demands of Ops. An accurate asset inventory that knows which assets are internet-exposed; scanning that's authenticated and frequent enough to catch KEV additions daily; automated KEV and exploit-status enrichment; patch orchestration fast enough for a three-day window, including firmware on edge devices; a forensic triage playbook for the top tier; and a deferral record an IG can audit. EPSS (the Exploit Prediction Scoring System) estimates the probability of exploitation in the next 30 days; it's a useful extra signal for the middle tiers. Analogy: triage in a festival medical tent. Not first come, first served, and not by how loud someone is (CVSS). Who's actually bleeding (exploited), who's in the crowd crush (exposed), and who will get worse fast (automatable) go first; the sprained ankle gets an ice pack and an appointment (deferral).

---

## Edge devices: the front door attackers try first

*04 · Security Operations*

**Bod 26-02 · issued feb 5, 2026**

**Ed 26-03 · feb 25, 2026**

**Now**

- Patch what can be patched

**3 months**

- Inventory devices on CISA’s end-of-support list

**12 months**

- Remove devices already past end of support

**18 months**

- All identified end-of-support edge devices gone

**24 months**

- Lifecycle process replaces devices before support ends
- Cisco SD-WAN under attack
- Inventory within about a day
- Forensic snapshots and logs to CISA
- Patch within two days
- Hunt and harden, report back
- Edge devices face the internet, run privileged, rarely have EDR, and log poorly. Old ones can’t be fixed at all.

???

Edge devices (firewalls, VPN gateways, routers, SD-WAN components, load balancers, wireless controllers) have been the favorite initial access point for state actors for years: Ivanti, Fortinet, Citrix, the firewalls, Cisco ASA, and F5 all drew CISA emergency directives or urgent advisories in 2024 and 2025. They're internet-facing by design, run with high privilege, can't run EDR, often log little, and are patched less often than servers because outages hurt. BOD 26-02, "Mitigating Risk From End-of-Support Edge Devices," issued February 5, 2026. Schedule, counted from issuance: patch supportable devices immediately where it won't break mission functions; within three months (May 2026), inventory every device on CISA's end-ofsupport edge device list and report it; within 12 months (February 2027), remove and replace devices already past end of support; within 18 months (August 2027), remove all identified end-of-support edge devices; within 24 months (February 2028), have a continuous lifecycle process that catches devices before they reach end of support. Unsupported devices get no patches at all, so no patching program can fix them. Emergency Directive 26-03 (February 25, 2026) shows the operational tempo. Attackers were actively exploiting Cisco Catalyst SD-WAN (CVE-2026-20127, rated maximum severity, chained with an older flaw). Agencies had to report an inventory of affected systems by 11:59 p.m. the next day, configure external logging and collect forensic snapshots, patch by February 27, then follow hunt and hardening guidance; a March 11 update added reporting and required logs to be sent to CISA's Cloud Logging Aggregation Warehouse. FedRAMP pushed matching instructions to every cloud provider the same evening. CISA issued it during a DHS funding lapse, with most of its staff furloughed. ED housekeeping: in January 2026 CISA closed ten emergency directives issued from 2019 to 2024, including the SolarWinds directive, judging their actions complete or absorbed into other policy. Patching an exploited edge device isn't enough: if it was compromised before the patch, the attacker may have persistence. That's why the directives demand forensic collection first and why BOD 26-04 requires forensic triage for the top tier. Analogy: the loading dock door. It faces the street, the crew props it open, nobody watches it, and on old venues the lock is a model the manufacturer stopped making parts for. You don't keep re-oiling that lock; you replace the door.

---

## Logging under M-26-14: purpose over volume

*04 · Security Operations*

**Objective 1 · cem**

- Continuous event monitoring: see attacks as they happen

**What changed on may 22, 2026**

- Rescinds M-21-31 and its fixed tiers
- Eleven outcome-based activities
- Maturity levels 0 to 4, on a timeline

**Objective 2 · thirf**

- Threat hunting, investigation, response, and forensics: reconstruct what happened
- Retention reduced and risk-based
- Covers IoT and OT, too
- Each agency writes a logging plan
- CISA reference architecture: Aug 20
- You can’t write a logging plan for assets you haven’t found. Inventory comes first.

???

OMB M-26-14, "Ensuring Effective and Efficient Agency Logging and Network Visibility to Defend Against Evolving Cyber Threats," issued May 22, 2026, and rescinded M-21-31 effective immediately. What M-21-31 did (2021, after SolarWinds): a prescriptive catalog of log types with fixed retention periods (12 months active, 18 months cold for many types) and maturity tiers EL0 to EL3. Agencies collected enormous volumes, often without the detections or analysts to use them, at significant cost. What M-26-14 does instead. Two objectives: continuous event monitoring (CEM), meaning detect and respond to threats in near real time; and threat hunting, investigation, response, and forensics (THIRF), meaning keep what you need to reconstruct and scope an intrusion. Eleven outcome-oriented activities replace the log catalog. A maturity model (levels 0 to 4) with deadlines counted from publication of CISA's Logging Reference Architecture. Retention requirements are reduced and risk-based; one analysis estimated roughly 60% less. Coverage extends explicitly to IoT and operational technology, including devices with no native logging. Each agency writes an agency logging plan that ties it together. Vendor summaries put advanced maturity at roughly a year after the architecture's release, so mid-to-late 2027; confirm the exact milestones in the memo. CISA published the Logging Reference Architecture on August 20, 2026. It translates the memo into architecture, operations, and governance patterns, and it's useful outside government too. What it means for Ops. First, asset visibility: the plan must cover your assets, so the CMDB and discovery tools become logging prerequisites (Tenable and others made the same point). Second, merge projects: if zero trust telemetry and logging compliance were separate efforts, they now belong in one plan. Third, cost: the SIEM and Log Analytics charge by ingestion and retention, so a purpose-based plan can cut spend; tier noisy logs to cheaper storage and keep high-value sources (identity sign-ins, EDR, DNS, firewall, privileged activity, M365 audit) hot. High-value sources for your agency: the identity provider and the cloud directory sign-in and audit logs; EDR; the SSE platform; Microsoft 365 unified audit log; Azure activity logs; the ITSM platform admin and integration logs; firewall and SD-WAN; DNS. Logging has legal weight. Logs create knowledge, and knowledge creates duties to act and to preserve evidence; involve counsel on retention for incidents and litigation holds. Analogy: multitrack recording. Under the old rule you recorded every microphone in the building all night, including the hallway. Now you record each instrument you'd need for the remix, keep the takes that matter, and actually listen to them.

---

## Detection: turning telemetry into a decision

*04 · Security Operations*

**Collect**

**Correlate**

**Detect**

**Triage**

**Respond**

- Identity, endpoint, network, cloud, app logs
- SIEM: the SIEM normalizes and joins
- Rules mapped to ATT&CK, anomalies, intel
- Analyst decides: real, benign, or noise
- Playbooks isolate, disable, block

**Hunt**

**Tune**

**Test**

- Search for what no rule caught, from a hypothesis
- Kill noisy rules; alert fatigue is a vulnerability
- Purple-team: run the technique, confirm the alert
- Measure time to detect, time to contain, and the share of likely ATT&CK techniques you can actually see.

???

Logs are raw material; detection is the product. The pipeline has five stages. Collect: identity sign-ins and audit events (the identity provider, the cloud directory), EDR telemetry, DNS and proxy logs (the SSE platform), firewall and flow data, cloud control-plane logs (Azure activity, M365 audit), and application logs. Coverage gaps are blind spots; M-26-14's logging plan is the inventory of what you collect and why. Correlate: the SIEM (the SIEM) normalizes formats and joins events across sources: a risky sign-in, followed by a new inbox rule, followed by a large download is three weak signals that together mean account takeover. Detect: rules (KQL analytics in the SIEM), behavior analytics (UEBA baselines each user and flags deviations), and threat intelligence matches. Good detections map to MITRE ATT&CK techniques so you can see coverage, and are managed like code: versioned, tested, reviewed (detection engineering). Triage: an analyst decides whether an alert is a true positive, a benign true positive (real activity, authorized), or a false positive, and escalates. Tier 1 triages, tier 2 investigates, tier 3 and incident responders handle the serious cases. AI assistants now summarize alerts and draft investigation steps; EO 14409 (June 2026) pushes agencies to adopt AI-enabled defensive tools. Respond: SOAR playbooks automate the first moves: isolate the host through EDR, disable the account and revoke sessions in the cloud directory or the identity provider, block the indicator at the SSE platform, open the ITSM platform incident. Automation is what makes a three-day patch window and a one-hour reporting clock survivable. Hunting looks for attackers who didn't trip a rule, starting from a hypothesis ("if Volt Typhoon-style actors were here, we'd see unusual use of built-in admin tools from these servers"). Tuning removes noisy rules; analysts drowning in false positives miss the real one. Purple-teaming runs a known technique and checks the alert fires. Who does this at your agency: the CISO's SOC function. Your levers: make sure every system you run sends the right logs, that response actions you own (isolation, disabling accounts, blocking) are fast and documented, and that the handoff from SOC ticket to Ops action is measured. CISA's Continuous Diagnostics and Mitigation (CDM) program supplies many agencies with asset, identity, and vulnerability tooling and feeds a federal dashboard; know what your agency reports through it. Analogy: the front-of-house engineer. Forty channels come in (collect), the console routes and groups them (correlate), the meters flash when a channel clips (detect), the engineer decides whether it's a problem or just the drummer's big fill (triage), and they pull the fader before the PA blows (respond). Hunting is walking the room to hear what the meters don't show.

---

## Incident response: the plan, the clocks, and Congress

*04 · Security Operations*

**Prepare**

- Plan, roles, contacts, playbooks, exercises

**Detect, analyze**

- Confirm, scope, classify severity
- 1 hour: report incidents to CISA after identifying them

**Contain**

- Isolate, disable, block; preserve evidence
- 1 hour: notify OMB and CISA after a major incident determination

**Eradicate**

- Remove access and persistence

**Recover, learn**

- Restore clean, monitor, fix root cause

**The clocks**

- 7 days: notify Congress of a major incident
- 100,000+ people’s PII breached: major incident determination required

???

The lifecycle. NIST SP 800-61 Rev 3 (April 2025) re-framed incident response around the CSF 2.0 functions (govern, identify, protect for preparation; detect; respond; recover), but the classic phases still describe the work. Prepare: a written plan, named roles (incident commander, technical lead, communications, legal, privacy), contact lists that work when email is down, playbooks for ransomware, account takeover, and data exposure, and exercises. Detect and analyze: confirm it's real, scope it, rate severity. Contain: isolate hosts, disable accounts and revoke sessions, block indicators, while preserving evidence (memory images, logs, disk snapshots) before wiping anything. Eradicate: remove the attacker's access and persistence, including in identity systems. Recover: restore from known-good sources, monitor closely for return. Learn: a blameless review that fixes root causes and updates the plan. The federal clocks. CISA's Federal Incident Notification Guidelines require agencies to report incidents to CISA within one hour of identifying them. OMB defines a major incident in its annual FISMA guidance; the current definition is in M-25-04 (January 2025), because OMB issued no FY2026 FISMA memo, and FY2026 IG audits used the FY2025 metrics. When an agency determines an incident is major, it notifies OMB and CISA within one hour of the determination and Congress within seven days, with supplemental updates. A breach involving unauthorized access to, modification, deletion, or exfiltration of the PII of 100,000 or more people requires a major incident determination. Breaches of PII also run through the senior agency official for privacy under OMB M-17-12. 2026 examples. The FBI declared a major incident over the breach of its Digital Collection System Network (activity first detected February 17), and DOJ declared one for ATF's standalone system breach (August 26 to 27) after Qilin's claim. Both notified Congress. Both show that "major" is a legal category with consequences, not an adjective. Who does what at your agency. The CISO's office leads, determines severity, and reports. IT Operations executes containment and recovery and preserves evidence. Common failures: wiping a machine before imaging it; announcing too early or too late; no out-of-band communication when email is compromised; forgetting that backups and identity systems may be compromised too. Analogy: a fire at a venue. Drills beforehand (prepare), find the source and how big it is (analyze), close the fire doors (contain), put it out (eradicate), inspect before reopening (recover), and change the pyro rules (learn). The fire marshal has to be called within the hour, and the city council hears about it within the week.

---

## Resilience: assume you’ll be hit, practice coming back

*04 · Security Operations*

**Backups: 3-2-1-1-0**

**Identity recovery**

- 3 copies, 2 media, 1 offsite, 1 immutable or offline, 0 errors on restore tests
- Rebuild AD, the cloud directory, and the identity provider admin control first; keep offline runbooks and credentials

**Continuity and dr**

**Ransomware playbook**

- RTO and RPO per system, from a business impact analysis; tabletop and failover tests
- Isolate, preserve evidence, scope, restore clean; payment decisions go to leadership and counsel
- A backup you haven’t restored is a hope, not a control.

???

Prevention fails eventually. Resilience is whether you're down for hours or for weeks. Backups. The 3-2-1 rule (three copies, two media types, one offsite) gained two digits for ransomware: one copy immutable or offline so an attacker with admin rights can't delete or encrypt it, and zero errors when you test a restore. Attackers now target backup consoles first, which is why backup systems are Tier 0 (privileged access slide). Test restores on a schedule and track the result as a metric. Identity recovery. If Active Directory or your cloud identity is compromised, nothing else can be trusted until it's rebuilt. Keep an offline, current runbook; protected break-glass accounts; known-good backups of domain controllers; and a plan for restoring the cloud directory and the identity provider admin control. Many agencies have practiced restoring servers but never practiced restoring identity. Continuity and disaster recovery. A business impact analysis (SP 800-34) determines each system's recovery time objective (how long it can be down) and recovery point objective (how much data you can lose). These drive architecture and cost; don't let them be set by default. That's a strong clause; enforce it with an exercise schedule and after-action reports. Ransomware playbook. Isolate affected systems and segments; preserve evidence; determine what was encrypted and what was stolen (double extortion means restoration doesn't end the incident); restore from clean, immutable backups into a rebuilt environment; and watch for re-entry. Whether to engage with extortion demands is a leadership, legal, and law-enforcement question, not an IT one; federal guidance strongly discourages paying, and payments can violate sanctions. Your job is to make paying unnecessary. Contingency planning is the CP family in 800-53: plan, train, test, alternate sites, backups, and system recovery. IGs test it every year. Analogy: the backing tracks on a second laptop, a spare amp in the truck, and a band that has rehearsed what to do when the power cuts mid-song. Nobody in the audience should notice more than a short pause.

---

## RMF and the ATO, in depth

*05 / 11 · 05 · Rmf And Ato*

- How a federal system earns permission to operate: categorize it, select and build controls, assess them, have an accountable official accept what’s left, and keep that decision true.
- The seven steps · Categorization · Control families · The package · Roles · Assessment and POA&Ms ·
- Continuous monitoring · Boundaries · Faster ATOs, honestly

???

This is the section you asked for most directly, and the one where IT Operations, the CISO, system owners, and the authorizing official meet. Ten slides. The seven RMF steps and what each produces. Categorization under FIPS 199, which sets everything downstream. The 20 control families and where Ops does the implementing. What's actually in an authorization package and what decisions an AO can make. Who does what. How assessors test, and what a good POA&M looks like. Continuous monitoring and ongoing authorization, which retire the three-year cycle. Authorization boundaries and interconnections. And how to make ATOs faster without making them fiction. Where the rules come from: FISMA requires agencies to manage risk to their systems; OMB Circular A-130 (2016) Appendix I requires the RMF and authorization; NIST SP 800-37 Rev 2 defines the process; SP 800-53, 53A, and 53B supply controls, assessment procedures, and baselines; SP 800-137 covers continuous monitoring; FIPS 199 and 200 set categorization and minimum requirements. National security systems and DoW run variants (CNSSI 1253, DoDI 8510.01 now giving way to DoW's CSRMC, and ICD 503 in the intelligence community); section 10 covers the differences. FedRAMP is the cloud-provider side and changed substantially in 2026 (section 06). CISSP mapping: Domain 1 (governance, risk), Domain 6 (assessment and testing), and Domain 2 (asset security, categorization). If you've built an RMF cheat sheet before, this goes a layer deeper into what each artifact is for and where the process typically breaks.

---

## The Risk Management Framework: seven steps, one decision

*05 · Rmf And Ato*

- Step
- The question
- What it produces
- Prepare
- Are we set up to manage risk?
- Risk strategy, roles, common controls, inventory
- Categorize
- How bad if this fails?
- FIPS 199 rating, information types, boundary
- Select
- Which controls apply?
- Tailored baseline, overlays, allocation
- Implement
- Are they built?
- Working controls, documented in the SSP
- Assess
- Do they work?
- Assessment plan and report (SAP, SAR)
- Authorize
- Is what’s left acceptable?
- AO decision, POA&M, terms and conditions
- Monitor Is it still true?
- Ongoing assessment, status reports, updates
- SP 800-37 Rev 2 (December 2018) is still current. Its big additions: the Prepare step, privacy, and supply chain risk.

???

The RMF, step by step, with what you'd actually see. Prepare (organization and system level). Agency-wide: a risk management strategy and appetite, assigned roles, a list of common controls available for inheritance, a continuous monitoring strategy, and asset and information inventories. Systemlevel: identify the mission, stakeholders, the information the system handles, and its boundary. Rev 2 added this step because most RMF failures traced back to skipping it. Categorize. Identify the information types (SP 800-60), rate the impact on confidentiality, integrity, and availability under FIPS 199, and set the overall level. The system owner proposes; the AO or designee approves. Next slide. Select. Start from the SP 800-53B baseline for that level (low, moderate, high), then tailor: scope out controls that don't apply, set organization-defined parameters (password length, log retention), apply overlays (privacy, cloud, classified), and decide which controls are inherited from common control providers versus implemented by the system. Document the result in the system security and privacy plan (SSP), along with a continuous monitoring strategy for the system. Implement. Build and configure the controls, then document how each is implemented, honestly and specifically: "the cloud directory conditional access policy CA07 requires a compliant device and phishing-resistant MFA for all users; exclusions: two break-glass accounts," not "the organization implements access control." Assess. An assessor, independent to the degree the AO requires, tests the controls under a security assessment plan using SP 800-53A procedures, then writes the security assessment report with findings and recommendations. Authorize. The system owner compiles the package (SSP, SAR, POA&M) and an executive summary. The AO weighs residual risk against mission need and issues a decision: authorize (usually with terms and conditions), or deny. The decision is documented in a signed authorization decision document. Monitor. Track changes and their security impact, assess a subset of controls on a schedule, remediate POA&M items, report status to the AO, and trigger reauthorization when changes are significant. With mature monitoring this becomes ongoing authorization. Rev 2's other additions: integrating privacy (the SAOP has defined roles at each step), supply chain risk management, alignment with the CSF, and allowing organization-generated control selection rather than only baselines. Analogy: making an album. Pre-production (prepare), deciding what kind of record it is (categorize), choosing arrangements (select), recording (implement), a mix review by someone who didn't record it (assess), the label signing off for release (authorize), then playing it live every night and keeping it tight (monitor).

---

## Categorization sets everything downstream

*05 · Rmf And Ato*

- Impact
- If confidentiality, integrity, or availability is lost…
- Low
- Limited adverse effect: minor harm, operations degraded
- Moderate
- Serious effect: significant harm or financial loss
- High
- Severe or catastrophic: loss of life, mission failure

**High-water mark**

- The highest of the three ratings sets the system’s level (FIPS 200).
- C: Moderate · I: Moderate · A: Low →
- Moderate system

**Low baseline**

**Moderate baseline**

**High baseline**

- 149
- 287
- 370 controls and enhancements most your agency business systems severe or catastrophic impact

**05 · rmf and ato · baseline counts: sp 800-53b**


???

Categorization is the most consequential ten pages in an ATO: it sets the control baseline, the assessment depth, and the cost of everything after. FIPS 199 defines three impact levels for each security objective. Low: limited adverse effect (degraded capability, minor damage or loss, minor harm to people). Moderate: serious adverse effect (significant degradation, significant damage or financial loss, significant but not life-threatening harm). High: severe or catastrophic (inability to perform primary functions, major loss, loss of life or life-threatening injury). How it's done. List the information types the system processes, stores, or transmits, using SP 800-60 as the catalog with provisional ratings (for example, financial management, personnel records, contracting, mission-specific types like your agency’s investment and insurance data). Adjust the ratings for your context and document why. The system's rating per objective is the highest among its information types; the overall level is the high-water mark across C, I, and A (FIPS 200). PII, CUI, and aggregation push ratings up. Baselines. SP 800-53B maps each level to a control baseline: about 149 controls and enhancements at Low, 287 at Moderate, and 370 at High, plus a separate privacy baseline for systems with PII. FedRAMP's Rev5 baselines add their own extras (roughly 156, 323, and 410). Most agency business systems land at Moderate; High is for systems whose failure is catastrophic or whose data is extremely sensitive. Over-categorizing wastes money for years; under-categorizing leaves real risk uncontrolled and fails audits. Then tailor. Scoping removes controls that genuinely don't apply (no wireless, no wireless controls), compensating controls substitute with justification, parameters get set, and overlays add or adjust controls for a context (privacy, cloud, classified, AI when NIST's overlays arrive). High Value Assets are a separate designation (OMB M-19-03): systems or data so important that their compromise would affect national security, economic security, or public health and safety, or the agency's ability to function. HVAs get CISA assessments and priority in the PQC migration. On the classified side, CNSSI 1253 keeps C, I, and A as separate values (for example, High-Moderate-Low) instead of collapsing to one level, so controls can be targeted at the objective that matters (section 10). Who signs: the system owner proposes, with the information owners and privacy office; the AO or a designee approves. Get the information owners in the room; they know which data would really hurt. Analogy: deciding whether a gig is a coffee shop, a club, or a stadium. That one decision sets the PA, the security staffing, the insurance, and the crew size for the whole tour; get it wrong and you're either overspending every night or under-protected when the crowd shows up.

---

## The 20 control families in SP 800-53 Rev 5

*05 · Rmf And Ato*

- ACAccess control
- PEPhysical and environmental protection
- ATAwareness and training
- PLPlanning
- AUAudit and accountability
- PMProgram management
- CAAssessment, authorization, monitoring
- PSPersonnel security
- CMConfiguration management
- PTPII processing and transparency
- CPContingency planning
- RARisk assessment
- IAIdentification and authentication
- SASystem and services acquisition
- IRIncident response
- SCSystem and communications protection
- MAMaintenance
- SISystem and information integrity
- MPMedia protection
- SRSupply chain risk management
- Bold families are where IT Operations does most of the implementing. Release 5.2.0 (August 2025) added SA-15(13), SA-24, and SI-02(07).

???

SP 800-53 Rev 5 organizes more than 1,000 controls and enhancements into 20 families. Each control has a base statement, optional enhancements (numbered in parentheses: AC-2(1)), organization-defined parameters you fill in (how often, how long, which events), discussion text, and related controls. Where Ops lives (bold on the slide): AC, access control: account management (AC-2), least privilege (AC-6), remote access, session controls. Your identity team's daily work. AU, audit and accountability: what's logged, protected, retained, reviewed. Now shaped by M-26-14. CM, configuration management: baselines (CM-2), change control (CM-3, your agency’s change board, least functionality, software and hardware inventory (CM-8). CM-8 is the inventory control everything else depends on. CP, contingency planning: plans, tests, backups, alternate sites, recovery. IA, identification and authentication: MFA (IA-2), authenticator management, device identity. IR, incident response: handling, reporting, testing, spillage (IR-9). MA, maintenance: controlled maintenance, remote maintenance, tools, and vendor maintenance personnel. MP, media protection: marking, storage, transport, sanitization (SP 800-88 Rev 2, published September 2025). SC, system and communications protection: boundary protection (SC-7), encryption in transit and at rest (SC-8, SC-28), cryptographic key management, DNS. SI, system and information integrity: flaw remediation (SI-2, where BOD 26-04 lands), malicious code protection, system monitoring (SI-4), and information input validation. Shared or owned elsewhere: AT (training, often HR-led with security), CA (assessment and authorization, the CISO's program), PE (facilities, with Ops for the server room), PL (system security plans, rules of behavior), PM (agency-wide program management, the CISO's), PS (personnel security, HR and security; contractor suitability tiers live here), PT (privacy, the SAOP's), RA (risk assessment and vulnerability scanning, RA-5), SA (acquisition, development, and external services; your contract clauses map here), SR (supply chain risk management, new as a family in Rev 5). Release 5.2.0, issued August 27, 2025 in response to EO 14306, focused on software update and patch integrity: SA-15(13) on logging syntax in development, SA-24 on designing for cyber resiliency, and SI-02(07) on root cause analysis of flaws, plus a revision to SI-07(12). Baselines didn't change. NIST now publishes the catalog through its Cybersecurity and Privacy Reference Tool in OSCAL and JSON, which is what makes automated packages possible. Common controls. Many controls in these families can be provided once for the enterprise: IT Operations can be the common control provider for identity, logging, patching, backup, and physical server room controls, so every application inherits them. That's the biggest single lever on ATO speed (faster-ATO slide). Analogy: an orchestra's sections. You don't need to know every part, but you should know which sections you play in (strings and percussion here) and who's conducting each of the others.

---

## What’s in an authorization package, and what the AO can decide

*05 · Rmf And Ato*

**The core three**

**Supporting**

**The decision**

- SSP: what the system is, its boundary, how each control is met
- FIPS 199 categorization
- ATO: authorized, often with conditions
- PTA, PIA, and SORN
- IATT: interim, for testing only
- SAR: what the assessor tested and found
- Contingency plan and test
- Denial: not authorized to operate
- Incident response and config plans
- POA&M: each open weakness, owner, and date
- Interconnection agreements
- ATU: authorized to use a provider’s system
- Inventory and diagrams
- The package is evidence. The AO’s signed decision document is the authorization.

???

The core three. System security and privacy plan (SSP): the system's description, purpose, information types, categorization, users, boundary and architecture diagrams, interconnections, and for every control in the tailored baseline, how it's implemented, by whom, and whether it's inherited, hybrid, or system-specific. A good SSP is specific enough that an assessor can test from it; a bad one paraphrases the control text. Security assessment report (SAR): written by the assessor. What was tested, how (examine, interview, test), results per control (satisfied or other than satisfied), the risk of each finding, and recommendations. Sometimes paired with a penetration test report. Plan of action and milestones (POA&M): every weakness not yet fixed, with the control, source, risk, owner, resources, milestones, and scheduled completion date. It's both a work plan and a risk register; the AO reads it to understand what they're accepting. Supporting artifacts typically include: the FIPS 199 categorization; privacy threshold analysis, privacy impact assessment, and system of records notice where PII is involved; contingency plan and test results; incident response plan; configuration management plan; continuous monitoring strategy; interconnection security agreements or memoranda of understanding (SP 800-47 Rev 1); hardware and software inventory; data flow diagrams; e-authentication assessment; rules of behavior. The decisions. Authorization to operate, usually with terms and conditions (for example, fix the two high findings within 30 days, or no PII until encryption is verified). Interim authorization to test lets a system run in a test or pilot setting with real data or connections for a limited time. Denial of authorization means it can't operate, or must stop. Authorization to use is how an agency accepts a provider's system it doesn't own (a FedRAMPcertified cloud service or another agency's shared service) based on that provider's package plus the agency's own review. SP 800-37 Appendix F also describes common control authorizations, type authorizations (one decision for identical deployments), facility authorizations, joint authorizations by multiple AOs, and leveraged authorizations. Authorization termination dates are optional once a system is under ongoing authorization (conmon slide). FedRAMP's 2026 rules rename the provider-side SSP the Certification Package Overview and Security Decision Record, and move packages from Word and Excel to JSON or OSCAL. Agency packages don't automatically change, but the direction is clear: machinereadable evidence. Analogy: releasing an album. The liner notes and session sheets (SSP), the mastering engineer's report (SAR), the punch list of known pops and clicks to fix in the reissue (POA&M). Then the label exec's signature on the release form, which is the actual decision.

---

## Who does what in an authorization

*05 · Rmf And Ato*

- Role
- Owns
- Authorizing official (AO)
- Accepts residual risk; signs the decision

**Ciso (saiso)**

- Security program, policy, risk posture across systems
- Senior privacy official (SAOP)
- Privacy risk, PIAs, breach response
- System owner
- The system end to end; funds and fixes
- Information owner or steward
- Rules for the data: use, sharing, protection

**Isso**

- Day-to-day security of the system; keeps the package current
- Control assessor Independent testing and the SAR
- Common control provider
- Controls many systems inherit
- Only the AO accepts risk. Others can prepare the decision; the decision itself can’t be delegated.

???

SP 800-37 Rev 2 Appendix D defines the roles. Titles vary by agency; the responsibilities don't. Authorizing official: a senior federal official with the authority to accept risk to operations, assets, and individuals for a system. Must be a government employee and senior enough to own the consequences, often a CIO, deputy, or mission executive. May have an AO designated representative who coordinates and prepares, but the authorization decision and signature can't be delegated. Senior agency information security officer (usually the CISO): runs the security program, sets policy and standards, advises the AO, and often oversees assessment. At some agencies the CISO is also delegated AO authority for certain systems; confirm where that line sits for each your agency system. Senior agency official for privacy: owns privacy risk, approves PIAs and SORNs, and leads breach response for PII. System owner: the official responsible for the system across its life: requirements, funding, implementation, operations, and remediation. Usually the program or business office for applications, sometimes IT for infrastructure. The owner, not the ISSO, is accountable for fixing POA&M items. Information owner or steward: sets rules for the information (who may access it, how it may be shared, what protection it needs). You are your agency’s designated data steward for IT and HR data, which makes you an input to categorization and access decisions for systems holding that data. Information system security officer: the hands-on security lead for a system: keeps the SSP and POA&M current, coordinates scans and assessments, reviews changes for security impact, and reports status. ISSOs often support several systems. DoW also uses information system security manager (ISSM) for the supervisory layer. Security control assessor: tests controls and writes the SAR. Independence matters: the AO decides the required degree, and for moderate and high systems the assessor shouldn't work for the system owner. FedRAMP requires accredited third-party assessors. Common control provider: the organization that implements and assesses controls inherited by many systems. IT Operations is the natural common control provider for infrastructure: identity, logging, endpoint protection, patching, backup, network boundary, the server room. Each inheritable control needs its own documentation and assessment. Also in the room: the enterprise architect (boundary and integration), the risk executive function (agency-level view across systems), the head of agency (ultimately accountable under FISMA), and contracting officers and CORs (security requirements in contracts). Analogy: releasing a record. The label head signs off (AO); the A&R director sets the label's standards (CISO); the artist owns the album (system owner); the publisher controls the song rights (information owner); the producer runs the sessions day to day (ISSO); the mastering engineer checks it independently (assessor); and the studio provides the room, desk, and mics every session uses (common control provider).

---

## Assessment and POA&Ms: proving controls work

*05 · Rmf And Ato*

**How assessors test (sp 800-53a)**

- Examine: policies, configurations, logs, records

**A good poa&m item has**

- The weakness, tied to a control
- Its source and risk rating
- Interview: the people who run it
- A named owner and resources
- Test: scans, config checks, pen tests, failover
- Milestones with real dates
- Depth and coverage rise with impact level. The AO sets how independent the assessor must be.
- Status, changes, and why
- Not: “Remediate vulnerabilities. Due: TBD.”
- FedRAMP’s 2026 rules replace provider POA&Ms with “accepted weaknesses.” Agencies still track their own.

???

Assessment answers whether controls are implemented correctly, operating as intended, and producing the desired outcome. Methods (SP 80053A). Examine: review documents, configurations, logs, and records (the conditional access policy export, the patch report, the last restore test). Interview: talk to the people who operate the control, to see whether practice matches paper. Test: exercise the control: authenticated vulnerability scans, configuration compliance checks against baselines, penetration tests, attempting a login without MFA, failing over a server. Each procedure has a depth (basic, focused, comprehensive) and coverage (how many items are sampled), which rise with impact level and the AO's need for assurance. Independence. The AO decides how independent the assessor must be; for moderate and high systems, assessors normally sit outside the system owner's chain. FedRAMP requires accredited third-party assessment organizations (3PAOs). Agencies often use a contracted assessment team under the CISO. Findings. Each control is "satisfied" or "other than satisfied," with the specific deficiency and a risk rating based on likelihood and impact in context. Assessors recommend; they don't accept risk. The POA&M. Every other-than-satisfied finding, plus weaknesses from scans, audits, incidents, and continuous monitoring, goes into the POA&M with: the weakness description and affected control; source; risk level; point of contact; resources required (funding is often the real blocker); milestones with dates; scheduled completion; and status, with a record of every date change and why. POA&M aging (items past their scheduled date) is a perennial IG finding and a good metric. "Risk accepted" items should be rare, approved by the AO, and reviewed periodically, not a parking lot. Deviations. Some findings turn out to be false positives (documented with evidence and closed), operational requirements (the system genuinely needs the configuration; becomes a risk acceptance), or risk adjustments (other controls reduce the real risk; documented and approved). FedRAMP change. Under the 2026 Consolidated Rules, cloud providers no longer maintain POA&Ms for FedRAMP; they publish a list of accepted weaknesses instead, alongside broadened vulnerability detection and response rules. That changes what you'll receive from providers, not your own obligation: agencies still track POA&Ms for their systems under OMB guidance and IG metrics. Ask your ISSOs for a monthly list of POA&M items assigned to Ops, by age and risk, and treat it like a service queue with a due date. Analogy: the mix review. The engineer who didn't record the album listens on several systems (examine, test) and asks the band how they tracked it (interview). The punch list that comes back, with who fixes what by when, is the POA&M. "Make it sound better, someday" isn't a punch list item.

---

## Continuous monitoring keeps the ATO true

*05 · Rmf And Ato*

**Strategy**

- SP 800-137: what is monitored, how, how often
- Agency and system level

**Automated**

- Assets, configuration, vulnerabilities, identity, logs
- Daily to weekly, via tools

**Ongoing assessment**

- A subset of controls each year; all over the cycle
- Prioritized by volatility, risk

**Change control**

- Security impact analysis on every change
- Significant change: AO review

**Reporting**

- Status to the AO on a set schedule
- Ongoing authorization

**Pipeline**

- DevSecOps evidence on every release
- Continuous ATO
- The three-year ATO was habit, not law. A-130 (2016) moved agencies to ongoing authorization backed by real monitoring.

???

An authorization is a judgment at a point in time. Continuous monitoring is what keeps that judgment valid as systems and threats change. Strategy. SP 800-137 describes information security continuous monitoring (ISCM): define what you'll monitor (controls, assets, threats, vulnerabilities), how (automated tools, manual checks), how often (based on how volatile each control is and how much risk it carries), and who receives the results. There's an agency-level strategy and a system-level one. Automated monitoring covers the data that changes fastest: asset discovery, configuration compliance, vulnerability scans, identity and privilege changes, and security logs. CISA's CDM program supplies many agencies with tools and dashboards for this; endpoint management compliance, EDR, Tenable or Qualys scans, the cloud directory and the identity provider reports, and the SIEM are your agency’s equivalents. Ongoing assessment. Instead of re-testing everything every three years, assess a subset of controls each year so that all are covered over the cycle, with volatile and high-risk controls tested more often. Results update the SAR and POA&M. Change control. Every change gets a security impact analysis (CM-4); the change board is the natural place. A significant change triggers AO review and possibly reauthorization: a new boundary, a new interconnection, moving hosting (on-premises to cloud), a new type of data (adding PII), a major new function, or, increasingly, adding an AI capability that reads data or takes actions. Reporting and ongoing authorization. With a mature program, the AO receives security status reports at an agreed frequency and makes ongoing risk decisions, instead of a big reauthorization event. OMB Circular A-130's 2016 revision removed the old expectation of reauthorizing every three years and pointed agencies to ongoing authorization. Many agencies kept three-year cycles anyway, out of habit or because monitoring wasn't mature enough to justify dropping them. SP 800-37 Appendix F describes the conditions. Continuous ATO (cATO). In DevSecOps environments, the pipeline produces evidence (tests, scans, configuration checks, SBOMs) on every release, and the AO authorizes the pipeline and its guardrails rather than each release. DoW has published cATO evaluation criteria; it's demanding, and only works with real automation. What breaks it: monitoring data that nobody reviews; changes that bypass security review; POA&M items that age silently; and status reports that say "no change" because nobody looked. Analogy: a touring production that soundchecks every night, not just at the first show. The setlist changes, the venues change, gear gets swapped; the crew checks what matters each night, does a full rig inspection every so often, and calls the tour manager when something big changes, like adding pyro.

---

## Boundaries decide what you’re actually authorizing

*05 · Rmf And Ato*

**Inside**

**Leveraged**

**Connected**

- You own the controls
- You inherit, then configure
- You document and agree
- Servers, apps, databases
- Admin workstations and accounts
- The data and its flows
- Azure, M365, the identity provider, other certified services
- Other systems and partner portals
- Their package plus your customer responsibilities
- Interconnection agreements
- APIs and external services
- Draw the boundary first. A blurry boundary means an ATO that covers less than everyone thinks.

???

The authorization boundary is the set of components the AO is accepting risk for. Everything else is either inherited from something already authorized or connected to it under an agreement. Most ATO arguments are really boundary arguments. Inside the boundary: the components the system owner controls and must document and secure: servers and services, application code, databases, administrative interfaces and accounts, management tools, and the data stores and flows. Every control in the baseline applies here, either implemented directly or inherited. Leveraged services: components provided by another authorized system, such as Azure infrastructure, Microsoft 365, the identity provider, the ITSM platform, or Box, each with a FedRAMP certification and an agency authorization to use. The system inherits the provider's controls for the provider's layer, and must implement the customer responsibilities the provider lists (tenant configuration, user access, logging, data handling). An SSP should say exactly which controls are inherited from which provider; "it's in the cloud" isn't inheritance. Connected systems: other systems the boundary exchanges data with: another agency, a partner's portal, an internal system with its own ATO. Each interconnection is documented, with the data exchanged, direction, security of the connection, and responsibilities, usually in an interconnection security agreement or memorandum of understanding (SP 800-47 Rev 1, "Managing the Security of Information Exchanges"). External services and APIs: SaaS tools and APIs the system calls that aren't part of a leveraged authorization. These are frequent blind spots, especially low-cost SaaS bought outside IT, which is why the PRISM intake question changed from "is this an IT contract?" to "how will IT be used?" Drawing it. Start from a data flow diagram: where data enters, where it's stored, where it goes, who administers what. Mark what you control, what you inherit, and what you connect to. Settle disputes early, because the boundary sets the control baseline's scope, the assessor's scope, and the cost. Common traps: management tools (a remote management agent with admin rights everywhere) left outside every boundary; shared services that every system "connects" to but no one authorizes; and AI features added inside an existing SaaS that start sending data to a new processor. The OneGov AI tools sit outside any agency gateway, which is a boundary fact worth stating plainly in any AI risk discussion. Analogy: the stage plot and input list. It shows what's on your stage (inside), what the venue provides (house PA and lights, leveraged, though you still set your own levels), and what comes in from outside (a broadcast truck feed, connected, with a signed agreement on who controls what).

---

## Faster ATOs without paper-thin ones

*05 · Rmf And Ato*

**What works**

**What to refuse**

- Inherit common controls: one infrastructure ATO, many apps
- Rubber-stamp or backdated ATOs
- Reuse FedRAMP packages and other agencies’ work
- An ATO with a POA&M nobody will fund
- Bring the ISSO in at design, not at go-live
- A vendor-written SSP nobody at the agency has read
- Pre-approved patterns: a paved road
- Treating the ATO as a finish line
- Automate evidence: OSCAL, config as code, scan feeds
- Systems in production with no ATO at all
- A light path for low-risk SaaS
- The real speed lever: how many controls a new system inherits on day one.

???

Slow ATOs push people to work around the process; fake ATOs leave risk unmanaged. The goal is fast and true. Inheritance. If IT Operations is authorized as a common control provider for infrastructure (identity and MFA, endpoint protection, patching, logging, backup, boundary protection, the server room), every application inherits those controls with a reference instead of re-documenting and re-testing them. A concrete proposal: publish an IT Operations common control catalog listing each inheritable control, its implementation, its assessment date, and its customer responsibilities, so the application development team and program offices can build on it. It's the most valuable security artifact Ops can produce. Reuse. FedRAMP-certified services come with packages; reciprocity lets agencies accept each other's assessments. In the intelligence community, ODNI launched a shared IC-wide repository of cybersecurity authorizations in 2026 to end duplicate assessments, and DoW's new construct leans on inheritance and reciprocity. Early engagement. Bring the ISSO and assessor in when architecture is chosen. Most ATO delays come from discovering at the end that the boundary is wrong, a component isn't certified, or logging wasn't built in. Paved road. Pre-approved reference architectures (a standard Azure landing zone, a standard Power Platform environment, a standard SaaS integration pattern with SSO, SCIM, and logging) let teams pick a known-good design and skip debates. Automation. Machine-readable packages (OSCAL), configuration as code, and direct feeds from scanners and configuration tools turn evidence collection from weeks of screenshots into reports. FedRAMP's 2026 move to JSON and OSCAL packages and key security indicators shows the direction; NIST's control catalog is published in OSCAL. Light path. Some agencies (GSA's lightweight ATO is the best-known example) use a shorter process for lowimpact SaaS with no sensitive data, with limited scope and duration. A tiered intake that routes low-risk tools to a light path is far better than tools bought outside IT entirely. What to refuse. Backdated or rubber-stamp ATOs (they surface in IG reports and post-incident reviews). Authorizations with long POA&Ms and no funding to close them. Vendor-written SSPs the agency hasn't validated. Treating authorization as done; it lasts only as long as monitoring backs it. And shadow systems: tools in production with no ATO or ATU, which are worse than a slow ATO. Analogy: a session band that already knows the house style. The studio's drummer, bassist, and engineer (common controls) are booked, rehearsed, and trusted, so a new artist only has to bring the song.

---

## Cloud and FedRAMP

*06 / 11 · 06 · Cloud And Fedramp*

- FedRAMP 20x and the 2026 rules · What it means for an agency

???

FedRAMP is the government-wide program that assesses cloud services once so agencies can reuse the result. The FedRAMP Authorization Act (in the FY2023 NDAA) put it in statute with a presumption of adequacy for authorized services, and OMB M-24-15 (July 2024) set its modernization direction: automation, machine-readable packages, and a better agency experience. In 2025 FedRAMP launched 20x, an approach built on key security indicators validated by automation rather than narrative documents. It ran pilots through 2025 and early 2026 (Phase 2 was delayed by the fall 2025 shutdown), then published the Consolidated Rules for 2026 (CR26) on June 25, 2026, effective July 4. CR26 changed the vocabulary, opened 20x to all providers, and set end dates for the old Rev5 path.

---

## FedRAMP in 2026: new rules, new words, new path

*06 · Cloud And Fedramp*

**Jun 25**

- Consolidated Rules for 2026 published

**Jul 4**

- Rules in effect for all providers
- Authorization → Certification

**Aug**

- 20x pipelines open: Class A, then B and C
- Low, Moderate, High → Classes A to D

**Oct 29**

- First full 20x Class C certification

**Jun 11, 2027**

- No new Rev5 certifications
- POA&Ms → Accepted weaknesses

**Dec 31, 2028**

- Existing Rev5 certifications good at least to here
- Word templates → JSON or OSCAL

**New vocabulary**

- SSP → Certification package overview
- Continuous monitoring → Ongoing certification
- FY26: 92 new certifications, 538 certified services, and 760 new agency ATOs or ATUs.

**06 · cloud and fedramp · source: fedramp.gov**


???

What changed, and when. FedRAMP 20x is the new certification path. Instead of a long narrative SSP reviewed by humans, providers demonstrate key security indicators, outcome statements that are validated continuously by automation and checked by an assessor, and make their certification materials available through APIs. The Phase 1 pilot (2025) produced the first low-impact pilot authorizations; Phase 2 ran from November 18, 2025 to the end of March 2026 at moderate level; Phase 3 prepared the public rules. The Consolidated Rules for 2026 (CR26) were published June 25, 2026 and took effect July 4. They apply to every provider seeking or keeping a certification, including legacy Rev5 providers, with only a few rulesets mandatory for Rev5 before January 1, 2027 and full enforcement after. The 20x Class A pipeline opened in early August, Class B and C at the end of August. FedRAMP granted the first 20x Class A certification on August 25 and the first full CR26-compliant Class C certification on October 29, 2026. FedRAMP Ready was retired in July. FedRAMP says it will announce the scale and timelines of Phase 4 by mid-December 2026, and the FedRAMP Board was fully established in late October. Vocabulary. "Authorization" became "certification," because the old word was widely misread as government-wide risk acceptance. The provider's SSP becomes a certification package overview and security decision record. Continuous monitoring becomes ongoing certification, with broader requirements and loss of certification for failing them; "continuous monitoring" now mainly means collaborative work with agencies. Provider POA&Ms are replaced by a list of accepted weaknesses. Packages move to JSON, or optionally OSCAL. Encryption rules shift toward FIPS-validated crypto mainly for sensitive data, with providers documenting their use, and vulnerability detection and response goes beyond monthly scanning, mapped to BOD 26-04. Rev5 sunset. FedRAMP stops accepting new Rev5 certifications on June 11, 2027. Every Rev5 provider has been told to plan its move. Numbers (FY26, per FedRAMP): 92 new certifications (66 Rev5, 26 20x), 538 certified offerings at year end, 71 services in the initial implementation listing, and 760 new agency ATOs or ATUs. Analogy: the change from album certifications counted by units shipped to streaming-equivalent units. Same idea (prove the record reached people), new measurement, new paperwork, and everyone has to relearn what "gold" means.

---

## What FedRAMP’s changes mean for your agency

*06 · Cloud And Fedramp*

**Still yours**

**Your side of the line**

- The agency’s own authorization to use. FedRAMP says certification isn’t government-wide risk acceptance.
- Tenant configuration, identity, logging, data, and users. In Microsoft
- 365, CISA’s SCuBA baselines.

**Ask every provider**

- Class and status; 20x or Rev5 and their move date; what they report to you and how; their accepted weaknesses.
- Agency Cloud Use Framework; Class D for high-impact services; the June 11, 2027 Rev5 cutoff.

???

Still yours. OMB Circular A-130 requires agencies to authorize the information systems and services they use, and to monitor them. FedRAMP's 2026 materials say plainly that certification has a different meaning from an agency authorization and isn't a government-wide risk acceptance; that was the reason for the rename. In practice your agency issues an authorization to use (ATU) for each cloud service, based on the provider's package, your agency’s review of the customer responsibilities, and your agency’s own configuration and monitoring. FedRAMP reported 760 new agency ATOs or ATUs in FY26, so the agency step is alive and well. Your side of the line. Each provider lists customer responsibilities: the controls you implement in your tenant. For Microsoft 365, CISA's BOD 25-01 already requires civilian agencies to apply the SCuBA secure configuration baselines and report continuously. Questions for every provider. Which class, and is it 20x or Rev5? If Rev5, when do they transition, and what changes for you? What ongoing-certification data will they share, how (APIs, a trust center, monthly reports), and how quickly will they notify you of incidents and significant changes? What's on their accepted weaknesses list? How do their vulnerability timelines map to BOD 26-04? Who are their critical subprocessors? What new AI features process your data, and can you turn them off? Contract language. Require FedRAMP certification at the appropriate class for any cloud service, notification if status changes, and access to the provider's certification materials. Analogy: a venue certified by the fire marshal. That certification is real and saves every promoter from re-inspecting the building. It doesn't approve your pyro, your crowd size, or your exits for tonight's layout. That sign-off is still yours.

---

## Law and policy

*07 / 11 · 07 · Law And Policy*

- The statutes, memos, and directives that set federal cyber requirements, what changed in
- 2025–26, how the annual FISMA cycle grades you, and the post-quantum migration now on a clock.
- The authority map · What changed in 2025–26 · The FISMA cycle · Post-quantum migration

???

Federal cybersecurity requirements come in layers: statute (FISMA and others), OMB policy (Circular A-130 and memoranda), CISA's binding directives, NIST standards and guidance, and executive orders that set direction. National security systems sit on a separate track. 2025 and 2026 brought an unusual amount of change: a new national cyber strategy (March 6, 2026), new executive orders on AI security, post-quantum cryptography, and terminology, rescinded and replaced OMB memos for software security and logging, new CISA directives on edge devices and patching, a new presidential memorandum governing national security systems, the FedRAMP overhaul, and the suspension of DoW's CMMC Phase II. The agencies implementing it changed too. CISA lost roughly a third of its workforce after early 2025, had no Senate-confirmed director through 2026 (the nominee withdrew in April 2026; Nick Andersen became acting director after Madhu Gottumukkala), and operated through funding lapses with most staff furloughed. Expect guidance to arrive late and implementation help to be thinner; plan for that rather than waiting. Four slides: the authority map; a timeline of what changed; the annual FISMA cycle and how inspectors general grade maturity; and the post-quantum cryptography migration, which now has a schedule. A note on neutrality: this section describes what the policies require and when, not whether they're wise. Where the change is contested (for example, rescinding software attestations, shorter strategy documents, CISA's downsizing), the notes describe the stated rationale and

---

## Where the requirements come from

*07 · Law And Policy*

- Source
- What it does
- Examples

**Fisma 2014**

- Heads accountable; OMB oversees; CISA operates; IGs evaluate
- 44 U.S.C. 3551 et seq.

**Omb a-130**

- Information policy; Appendix I requires RMF and ATOs
- 2016 revision
- OMB memoranda Annual FISMA guidance and topic mandates

**M-22-09, m-26-14, m-26-15**

- CISA directives
- Binding and emergency directives for civilian agencies

**Bod 26-02, 26-04; ed 26-03**

**Nist**

- Mandatory FIPS standards; SP guidance OMB makes binding

**Fips 199, 140-3; sp 800-53**

- Executive orders
- Set direction and deadlines

**Eo 14306, 14409, 14412**

- Other statutes
- Cloud, privacy, info sharing, quantum
- FedRAMP Act, Privacy Act
- National security systems run on a separate line: NSPM-12, the CNSS, and NSA as national manager (section 10).

???

The authority chain, top to bottom. FISMA 2014 (44 U.S.C. 3551 and following) makes each agency head responsible for information security; OMB oversees agency policies and practices; DHS, through CISA, administers operational aspects and issues binding operational directives; NIST develops standards; and each inspector general evaluates the agency's program every year. Bicameral FISMA reform efforts haven't become law; the 2014 statute still governs. OMB Circular A-130, "Managing Information as a Strategic Resource" (2016 revision), sets federal information policy. Appendix I requires agencies to implement the RMF, authorize systems before operation, and conduct continuous monitoring, and it moved agencies from periodic reauthorization to ongoing authorization. OMB memoranda. The annual FISMA guidance (most recently M-25-04, January 2025; no FY2026 memo was issued) sets reporting and defines major incidents. Topic memos carry most mandates: M-22-09 (zero trust), M-26-05 (risk-based software and hardware security, rescinding the attestation memos M-22-18 and M-23-16), M-26-14 (logging, rescinding M-21-31), M-26-15 (post-quantum migration), M-19-03 (high value assets), M-17-12 (breach response), and M-24-15 (FedRAMP). CISA directives. Binding operational directives are compulsory for federal civilian executive branch agencies; emergency directives address urgent threats. Current examples: BOD 25-01 (secure cloud configuration), BOD 26-02 (end-of-support edge devices), BOD 26-04 (risk-based patching), ED 26-03 (Cisco SD-WAN). They don't apply to national security systems. NIST. Federal Information Processing Standards (FIPS 140-3, 199, 200, 201 for PIV, and 203 to 205 for post-quantum) are mandatory. Special Publications are guidance that OMB policy makes binding in practice (800-37, 800-53, 800-137). Executive orders. EO 14028 (2021) launched much of the current agenda; EO 14144 (January 2025) added more, and EO 14306 (June 6, 2025) removed parts of it while keeping others (the TLS 1.3 date, post-quantum direction, software update integrity). In 2026: EO 14409 (June 2, AI-enabled cyber defense and frontier model access), EO 14412 (June 22, post-quantum migration), and EO 14434 (September 29, "Super Intelligence" terminology). The national cyber strategy of March 6, 2026 has six pillars: shaping adversary behavior, streamlining regulation, modernizing federal networks, securing critical infrastructure and supply chains, leading in emerging technology, and building the workforce. It came with an executive order on cybercrime and fraud. Other statutes: the FedRAMP Authorization Act (FY2023 NDAA); the Privacy Act and E-Government Act section 208 (PIAs); FITARA (CIO authorities); the Federal Cybersecurity Enhancement Act and the Cybersecurity Information Sharing Act of 2015, both extended only to December 11, 2026 by the stopgap funding law; CIRCIA, which covers critical infrastructure reporting, not agencies (its final rule went to OMB on October 1, 2026); and the Quantum Computing Cybersecurity Preparedness Act (2022). Analogy: copyright law is the statute (FISMA); the label's policy manual is OMB; the tour manager's daily sheet is CISA's directives; the engineering handbook is NIST; and the label president's memos about this year's priorities are the executive orders.

---

## What changed in 2025–26

*07 · Law And Policy*

**Jun 2025**

- EO 14306 trims and refocuses EO 14144

**Jun 2026**

- EO 14409: AI-enabled cyber defense

**Aug 2025**

- SP 800-53 release 5.2.0

**Jun 2026**

- BOD 26-04: patch by risk

**Sep 2025**

- DoW announces CSRMC to replace RMF

**Jun 2026**

- NSPM-12 replaces NSD-42 for NSS

**Jan 2026**

- M-26-05 ends software attestation mandate

**Jun 2026**

- EO 14412 and M-26-15: post-quantum

**Feb 2026**

- BOD 26-02: retire end-of-support edge

**Jun 2026**

- FedRAMP rules: certification, classes

**Feb 2026**

- ED 26-03: Cisco SD-WAN exploited

**Jul 2026**

- CMMC Phase II suspended

**Mar 2026**

- National cyber strategy, six pillars

**Aug 2026**

- CISA logging reference architecture

**May 2026**

- Five Eyes agentic AI guidance

**Sep 2026**

- EO 14434: “SI” replaces “AI”

**May 2026**

- M-26-14 replaces M-21-31 on logging

**Oct 2026**

- CIRCIA final rule sent to OMB

???

Eighteen changes in eighteen months, with what each means for you. EO 14306 (June 6, 2025) amended EO 14144 and EO 13694: it dropped some requirements (including parts of the software attestation push) and kept others (TLS 1.3 by 2030, post-quantum direction, NIST work on software update integrity). SP 800-53 Release 5.2.0 (August 27, 2025) was that NIST work. DoW announced the Cybersecurity Risk Management Construct (September 24, 2025) to replace its RMF implementation (section 10). M-26-05 (January 23, 2026) rescinded M-22-18 and M-23-16: agencies no longer must collect vendor self-attestations, but must validate provider security by risk assessment and keep complete software and hardware inventories. The stated rationale was that attestation was burdensome compliance without proven security value; critics argue that "risk-based" without a common evidence standard becomes uneven. BOD 26-02 (February 5) and ED 26-03 (February 25) are in section 04. The national cyber strategy (March 6) is short (a few pages of substance against 34 in 2023) and more offense-oriented, with an action plan promised. The Five Eyes joint guidance "Careful Adoption of Agentic AI Services" (April 30 to May 1) is in section 09. M-26-14 (May 22) is in section 04. June was crowded. EO 14409 (June 2) ordered rapid AI-enabled hardening of federal systems and a voluntary framework for federal pre-release access to covered frontier models. BOD 26-04 (June 10) rewrote patching. NSPM-12 (June 12) replaced the 1990 NSD-42 and 2022 NSM-8 for national security systems. EO 14412 (June 22) and M-26-15 (June 24) set the post-quantum migration. FedRAMP published its Consolidated Rules (June 25). July: DoW suspended CMMC Phase II (July 13), which would have required third-party assessments for contractors handling CUI starting November 10, 2026, pending a reform task force review; Phase I self-assessments continue. August: CISA released the Logging Reference Architecture (August 20). September: EO 14434 (September 29) directs agencies to use "Super Intelligence" and "SI" in place of "AI" in official non-statutory documents; NIST renamed its AI control overlays project accordingly in October. October: CISA sent the CIRCIA final rule to OMB for review (October 1), after missing the October 2025 statutory deadline and May and September 2026 targets. Analogy: a setlist that changed every night this year. You don't have to love every change; you have to know tonight's order before the first song starts.

---

## The annual FISMA cycle: how the agency is graded

*07 · Law And Policy*

**Omb guidance**

**Cio metrics**

**Ig evaluation**

**Agency report**

**Omb to congress**

- Annual memo; none for FY26, so M-2504 governs
- Agency reports quarterly and yearly
- Maturity scored by domain against
- IG metrics
- To OMB, CISA, and Congress
- Government-wide
- FISMA report

**Maturity levels**

**What igs ask for**

- 1 Ad hoc · 2 Defined · 3 Consistently implemented · 4 Managed and measurable · 5 Optimized
- Evidence, not policy: inventories, POA&M aging, access reviews, contingency tests, training records, monitoring results
- Level 4 is the bar for “effective.”

???

Every year, FISMA produces a report card. Knowing how it's scored tells you which evidence to keep. OMB guidance. OMB normally issues an annual memo setting FISMA reporting requirements and deadlines and defining a major incident. The latest is M-25-04 (January 15, 2025). OMB did not issue FY2026 guidance; on March 17, 2026, OMB and CIGIE told inspectors general to use the FY2025 IG FISMA metrics for FY2026 audits, and several published FY2026 audits say exactly that. CIO metrics. Agencies report CIO FISMA metrics quarterly and annually through CISA's CyberScope: asset inventories, MFA coverage, vulnerability and configuration management, incident counts, and more. Your teams generate much of this data. IG evaluation. Each IG (or an auditor it hires) assesses the agency's program against the IG FISMA metrics, organized under the CSF functions and domains: cybersecurity governance, supply chain risk management, risk and asset management, configuration management, identity and access management, data protection and privacy, security training, continuous monitoring, incident response, and contingency planning. Each domain gets a maturity level, and the program is "effective" overall when it reaches Level 4, managed and measurable. Core metrics are evaluated every year; supplemental metrics rotate. The maturity levels. Ad hoc: no formal policy or inconsistent practice. Defined: policies and procedures exist. Consistently implemented: they're followed everywhere, with evidence. Managed and measurable: performance is measured with metrics and used to manage. Optimized: continuous improvement, automation, and responsiveness. The jump from 3 to 4 is the hard one: it requires metrics you actually use. Reporting. Agencies send annual reports to OMB, CISA, and the congressional committees; OMB sends Congress a government-wide FISMA report. Major incidents get their own reporting (section 04). What IGs want. Evidence of operation, not policy text: complete inventories (hardware, software, accounts), POA&M items with realistic dates and low aging, access recertifications completed, contingency plans tested with after-action reports, role-based training completion for privileged users, configuration baselines with compliance results, and monitoring that someone reviews. High value assets get separate attention: CISA assesses them, and M-19-03 governs the program. Analogy: the label's annual review of the act. They don't care that you have a practice schedule; they want recordings of the rehearsals, the attendance log, setlist changes with reasons, and proof you can play the backup set when the headliner cancels.

---

## Post-quantum cryptography: a migration with a schedule

*07 · Law And Policy*

**Eo 14412 (jun 22) · omb m-26-15 (jun 24, 2026)**

**The new standards (aug 2024)**

- 2026–2027
- Strategy, planning, cryptographic inventory
- 2027–2028
- Pilots and early migration
- 2028–2030
- Key exchange for HVAs and high-impact systems
- 2031–2035
- Remaining systems; old public-key crypto retired
- Agency migration plans were due about October 22, 2026.
- FIPS 203, ML-KEM: key exchange
- FIPS 204, ML-DSA: signatures
- FIPS 205, SLH-DSA: hash-based signatures

**Why now**

- Harvest now, decrypt later: data stolen today can be read once quantum computers arrive.
- For Ops: confirm what your agency’s plan assigns to you, inventory where crypto lives, and ask every vendor for a post-quantum roadmap.

???

A large enough quantum computer would break the public-key cryptography (RSA, elliptic curve) that protects key exchange and digital signatures everywhere: TLS, VPNs, PIV, code signing, SSH. Nobody knows exactly when one will exist. Adversaries are already collecting encrypted traffic to decrypt later, so data that must stay secret into the 2030s is at risk now. Symmetric crypto (AES) and hashes are much less affected; AES-256 remains fine. The standards. NIST published FIPS 203 (ML-KEM, from CRYSTALS-Kyber, for key establishment), FIPS 204 (ML-DSA, from CRYSTALSDilithium, for signatures), and FIPS 205 (SLH-DSA, from SPHINCS+, a hash-based signature backup) in August 2024, and selected HQC as an additional key-establishment algorithm in 2025. NIST IR 8547, still a draft, proposes deprecating quantum-vulnerable public-key algorithms after 2030 and disallowing them after 2035. The mandate. Executive Order 14412 (June 22, 2026) ordered an accelerated federal migration, and OMB issued M-26-15, "Execution of the Migration to Post-Quantum Cryptography," two days later. It applies to civilian agencies, not national security systems (which follow NSA's CNSA 2.0 and DoW's own strategy, which targets high-impact systems by 2030). It requires each agency to prioritize systems by risk (high value assets, high-impact systems, and systems holding data that must stay sensitive past 2030 first), assign migration ownership at the leadership level rather than leaving it to the CISO alone, and submit a migration plan within 120 days, which put the deadline around October 22, 2026. The plan has nine required elements, including a cryptographic inventory, prioritization, phased milestones, vendor coordination, and crypto agility. The phases. 2026 to 2027: strategy, planning, and discovery. 2027 to 2028: pilots and early migration of prioritized systems. 2028 to 2030: prioritized migration of key establishment for HVAs and high-impact systems. 2031 to 2035: the remaining migration, completing by 2035. What it means for Ops. The inventory is the hard part: every place cryptography is used (TLS endpoints, VPNs, certificates, SSH, code signing, PIV, application libraries, embedded devices). Most migration will arrive through vendors: Microsoft, the SSE platform, the identity provider, browsers, and network gear will add hybrid post-quantum key exchange in updates. Your job is to know where you depend on what, ask every vendor for a post-quantum roadmap, retire things that can't upgrade, and build crypto agility (the ability to swap algorithms without re-architecting). Confirm your agency’s plan was submitted and what Ops owns in it. Analogy: remastering a whole catalog for a new format before the old players stop being sold. You start by listing every recording and where the masters are, do the hits first, and stop buying gear that can't play the new format.

---

## Supply chain and contracts

*08 / 11 · 08 · Supply Chain And Contracts*

- Nearly half of breaches now involve a third party. How supply chain risk is managed after the attestation mandate ended, and what a security-literate IT contract says.
- Supply chain risk · Security in contracts

???

This is where your acquisition experience and security meet. Every one of them is part of your agency’s attack surface. Two slides. Supply chain risk: what changed in 2026, which tools still apply, and why vendor compromise is now the dominant path into federal systems. CISSP mapping: Domain 1 (supply chain risk management) and Domain 8 (acquired software). One limit to remember from the acquisition side: COR authority. Security requirements belong in the contract; enforcing them is COR oversight; changing them is the contracting officer's job.

---

## Supply chain risk: your vendors’ weaknesses are yours

*08 · Supply Chain And Contracts*

- 48% of breaches involved a third party in the 2026 DBIR, up 60% in a year

**Tools that still apply**

- SP 800-161 Rev 1 for supply chain risk
- SBOMs where the risk warrants
- FASCSA exclusion orders
- Section 889 and Kaspersky bans

**What changed: m-26-05, jan 23, 2026**

- FedRAMP for cloud services
- Vendor self-attestation no longer required. Agencies must assess provider security by risk and keep full software and hardware inventories.
- Security review at intake, before award
- The FBI’s 2026 wiretap-network breach came through a vendor’s infrastructure. Third-party access is a front door.

???

Supply chain risk is the risk that something you buy, or someone you rely on, becomes the path in. SolarWinds (2020, a poisoned software update), MOVEit (2023, a file-transfer product exploited at thousands of organizations), the 2025 Salesloft Drift campaign (stolen OAuth tokens used to pull data from Salesforce instances), and the 2026 FBI breach via an ISP vendor's infrastructure all fit. The numbers. The 2026 DBIR found third-party involvement in 48% of breaches, up 60% year over year, and that third parties were slow to fix basic issues like missing MFA on cloud accounts. What changed in 2026. OMB M-26-05 rescinded M-22-18 and M-23-16, which had required agencies to collect secure software development attestations (the CISA "Common Form") from software producers. Agencies no longer must collect them, though they may still use the form. Instead each agency should validate provider security using secure development principles and a comprehensive risk assessment, and must maintain complete inventories of software and hardware. The memo also emphasizes hardware risk, which the old memos didn't cover. Supporters call it the end of compliance theater; critics worry that without a shared standard, "risk-based" becomes inconsistent. Either way, the burden of judgment now sits with the agency. Tools that still apply. NIST SP 800-161 Rev 1 (cyber supply chain risk management practices) and the SR control family. SBOMs, where the software's risk warrants: they let you answer "are we affected?" within hours of the next Log4j. FASCSA (the Federal Acquisition Supply Chain Security Act) lets the government issue exclusion and removal orders for covered articles and sources; FAR clauses require checking them. Section 889 (Huawei, ZTE, and certain video surveillance makers), the Kaspersky prohibition, and the TikTok ban are implemented through FAR clauses. FedRAMP covers cloud services. And the most practical tool of all: a security and IT review at intake, before award. That's why reframing PRISM's question from "is this an IT contract?" to "how will IT be used?" is a supply chain control. Fourth parties. Your vendor's vendors (their hosting, their subprocessors, their AI providers) are your risk too. Ask for the list and for notification when it changes. Practical program for an Ops director: a register of vendors with access to your agency systems or data, tiered by risk; security questions at intake scaled to the tier; contract clauses (next slide); periodic review of high-tier vendors' certifications and incidents; and offboarding that actually removes access. Analogy: the safety of your show depends on the rigging company's inspections, the pyro vendor's licensing, and the catering truck's driver. You can't inspect everything yourself, so you choose vendors carefully, write requirements into the contract, and check the high-risk ones more often.

---

## What a security-literate IT contract says

*08 · Supply Chain And Contracts*

- Topic
- Require
- Personnel
- Suitability tier by role before access; access removed within one business day
- Access
- No self-granted access; named privileged accounts; phishing-resistant MFA
- Incidents
- Report to the agency within an hour; preserve evidence; cooperate fully
- Cloud
- FedRAMP certification at the right class; notice of any status change
- Logs
- Agency access to logs, retained to the agency’s logging plan
- Vulnerabilities
- Fix on BOD 26-04 timelines; SBOM and disclosure policy on request
- Data Location limits if needed; return and certified destruction at the end
- FAR clauses
- 52.204-21, -23, -25, -27, and FASCSA orders, as applicable

???

A contract is a security control you can enforce. These requirements, adapted to each acquisition, cover most of the risk. Personnel. Background investigation tier by labor category before any access. Access. Incident reporting. The contractor reports suspected incidents to the agency quickly (an hour is a sensible requirement given the agency's own one-hour clock to CISA), preserves evidence, gives access for investigation, and supports response. Cloud. Any cloud service at the appropriate FedRAMP class, with notice if certification status changes, and access to the provider's certification materials. Logs. Government access to logs generated in performing the contract, in usable formats, retained to the agency's M-26-14 logging plan. Vulnerabilities. Remediation on BOD 26-04 timelines for anything the contractor manages; for delivered software, an SBOM on request and a vulnerability disclosure policy. With M-26-05 ending mandatory attestations, contract terms are now the main lever for secure development. Data. U.S. location where required; no use of agency data to train AI models without approval; return of data and certified destruction (NIST SP 800-88) at the end; records obligations. FAR clauses, as applicable: 52.204-21 (basic safeguarding of covered contractor information systems), 52.204-23 (Kaspersky), 52.204-25 (Section 889 telecommunications and video surveillance), 52.204-27 (TikTok), and the FASCSA order clauses. DFARS 252.204-7012 and CMMC apply only to DoW contracts. A FAR rule on CUI was re-proposed in June 2026 and isn't final. Remember authority lines: you define and monitor requirements as COR; changing scope or terms is the contracting officer's call. Analogy: the rider. Promoters honor what's written in it: the stage dimensions, the power, who's allowed backstage, what happens if the show is cancelled. If it isn't in the rider, don't expect it on the night.

---

## AI and security

*09 / 11 · 09 · Ai And Security*

- AI cuts both ways: it speeds up attackers and defenders, and every AI system you deploy is itself something to secure. Federal documents now say “Super Intelligence” (EO 14434); this deck keeps “AI” for clarity.
- AI in the threat landscape · Securing AI systems and agents

???

The AI deck covers how models work, agents, and the frontier in depth. This section is the security slice: how AI is changing attacks and defense, and how to secure AI systems and agents you deploy. Two slides. AI in the threat landscape: AI-run intrusions, faster exploitation, AI-scale vulnerability discovery, shadow AI, and the June 2026 executive order on AI-enabled defense. Securing AI systems and agents: the Five Eyes joint guidance from May 2026, the controls that work, and how AI fits into ATOs and boundaries. Terminology. EO 14434 (September 29, 2026) directs executive branch agencies to use "Super Intelligence" and "SI" in place of "Artificial Intelligence" and "AI" in official correspondence, public communications, and nonstatutory documents, and asks the President's science adviser to propose a federal definition. Statutory references are unchanged until Congress acts. NIST renamed its AI control overlay project (COSAiS) to Control Overlays for Super Intelligence Systems (COSIS) in October 2026.

---

## AI is speeding up both sides

*09 · Ai And Security*

**Attackers**

**Defenders**

- AI agents running most of an intrusion campaign
- Vulnerability discovery at machine scale
- Exploits built within days of disclosure
- Alert triage and investigation summaries
- Convincing phishing and voice cloning at scale
- Code review and patch generation
- Shadow AI leaking data from inside
- EO 14409: AI-enabled hardening of federal systems
- The practical effect is shorter clocks. CISA cited AI-accelerated exploitation when it moved patch deadlines to as little as three days.

???

What's changed, with the evidence. AI-run intrusions. In late 2025, Anthropic reported disrupting a campaign by a group it attributes to Chinese state sponsorship that used an AI agent to perform an estimated 80 to 90 percent of the operation's tactical work (reconnaissance, exploit development, credential harvesting, data analysis), with humans approving key steps. It was the first well-documented case of largely autonomous AI-driven intrusion at scale. Faster exploitation. Exploit development that took weeks now takes days or hours for known vulnerability classes. That's part of why exploitation overtook stolen credentials as the top initial access vector in the 2026 DBIR, and why CISA's BOD 26-04 compressed the top tier to three days. Social engineering. Generative models write fluent, personalized phishing in any language and clone voices from short samples, so "call to verify" and "it sounded like the deputy" are weaker checks than they were. Out-of-band verification through known numbers and phishingresistant MFA matter more. Shadow AI. Employees paste sensitive content into unapproved tools. The DBIR reported regular AI use on corporate devices jumping sharply and flagged shadow AI as a growing non-malicious factor in data exposure. DLP, approved alternatives (which your agency has), and clear rules beat bans. Defense at machine scale. Frontier models now find serious vulnerabilities in widely used software at a pace human researchers can't match; Anthropic's restricted Mythos program and its partners reported more than 10,000 high- or critical-severity findings in a month, which also means a flood of patches for defenders to absorb. In the SOC, AI summarizes alerts, drafts queries, and speeds investigations; in development, it reviews code and proposes fixes. Federal response. EO 14409, "Promoting Advanced Artificial Intelligence Innovation and Security" (June 2, 2026), directed rapid hardening of federal systems with AI-enabled defenses on 30- and 60-day timelines, told the CNSS and DoW to prioritize national security systems, directed CISA to issue directives and guidance (BOD 26-04 cites it), and set up a voluntary framework giving the government early access to "covered frontier models" with advanced cyber capabilities. It expressly avoids licensing or preclearance requirements. The bottom line for Ops: the same fundamentals, faster. Inventory, patch on risk-based clocks, phishing-resistant MFA, least privilege, logging, and tested recovery all matter more when attackers move at machine speed. Analogy: auto-tune and sampling arrived for everyone at once. Forgers can now fake a voice convincingly, and the forensic engineers can scan a whole catalog for fakes overnight. The studios that win are the ones that changed their verification habits.

---

## Securing AI systems and agents

*09 · Ai And Security*

- Agentic risk
- What it means
- Privilege
- More access than the task needs
- Design, configuration
- Insecure components, poor isolation
- Its own identity, least privilege, shortlived credentials
- Behavior Prompt injection, jailbreaks, poisoned data Human approval for high-impact actions
- Structural
- Many tool connections widen the attack surface
- Accountability
- Hard to tell why it acted or whether to trust it

**Controls that work**

- Log its steps, not just inputs and outputs
- System prompts are instructions, not controls
- Adding AI to a system is a significant change. It belongs in the boundary, the ATO, and the logging plan.
- 09 · AI AND SECURITY · SOURCE: CAREFUL ADOPTION OF AGENTIC AI SERVICES

???

On April 30 to May 1, 2026, CISA and NSA, with the cyber agencies of Australia, Canada, New Zealand, and the United Kingdom, published "Careful Adoption of Agentic AI Services," the first joint Five Eyes guidance on securing AI agents. Its five risk categories. Privilege: agents get more access than their task needs, so a manipulated or compromised agent can do more damage. Design and configuration: insecure choices such as untested third-party tools, plugins, or poor segmentation make identity and privilege risks worse. Behavior: agents act unexpectedly or are manipulated through prompt injection (instructions hidden in a document, email, or web page the agent reads), jailbreaks, data poisoning, or adversarial inputs. Structural: each tool and system an agent connects to widens the attack surface, and chains of agents compound it. Accountability: in complex agent systems it's hard to reconstruct why an action happened and whether to trust the result. Its main recommendations: fold agentic AI into existing zero trust, defense-in-depth, and least-privilege programs rather than building a separate regime; start with low-risk, well-defined tasks; give each agent a verifiable identity and only the access its task requires, with temporary credentials for sensitive actions; require human review or approval for highimpact actions; monitor the agent's internal steps and tool calls, not just inputs and outputs, and cross-check its reports with independent logs; isolate agents and plan for unexpected behavior. Prompt injection is the defining flaw: models can't reliably separate instructions from data, so anything an agent reads can try to steer it. That's why system prompts and guardrail text are instructions, not security controls. Real controls sit outside the model: identity, permissions, network limits, approval gates, and logging. Retrieval systems. For AI that searches internal content, the key control is enforcing the user's own permissions at query time, so the AI can't surface documents the user couldn't open. Oversharing in SharePoint becomes oversharing in AI answers, so permissions hygiene and sensitivity labels are AI controls. ATOs and boundaries. Adding an AI capability that reads agency data or takes actions is a significant change: it can add a new processor, new data flows, and new privileges. Bring the ISSO and assessor in early, update the boundary and SSP, and add the AI's activity to the logging plan. Standards in progress: NIST's SP 800-53 control overlays for AI (COSAiS, renamed COSIS in October 2026 under EO 14434), the OWASP Top 10 for LLM applications and agentic risks, and SP 800-218A for AI development. Until the overlays are final, map AI risks onto existing controls: AC, IA, AU, SI, SR, and CM all apply. Analogy: hiring a brilliant session player who will play whatever is written on the chart in front of them, including a chart someone slipped onto the stand. You don't fix that by telling them to be careful; you control who can put charts on the stand, and you listen to every take before it's released.

---

## Classified environments

*10 / 11 · 10 · Classified*

- The same disciplines with harder walls: how national security systems are governed, authorized, protected, and staffed, so the knowledge transfers if you move agencies.
- National security systems · RMF on the high side · COMSEC, TEMPEST, cross-domain, facilities · Cleared people and insider threat · What transfers

???

And a move to a defense or intelligence agency later in your career would put all of this in front of you on day one. The Data deck covered classified information itself: classification levels, original and derivative classification, markings, networks (SIPRNet, JWICS), cross-domain transfer of data, spills, and declassification. This section covers the security program around classified systems: who governs national security systems and how that changed in June 2026; how RMF and authorization differ on the high side, including DoW's new construct and the IC's approach; the protections unique to classified environments (COMSEC, TEMPEST, cross-domain solutions, accredited facilities); the people side (clearances, continuous vetting, insider threat); and what carries over from your current role. Everything here is unclassified and drawn from public sources. Specific system configurations and some policy details at each agency are themselves controlled; expect to learn those on arrival.

---

## National security systems: a separate chain of authority

*10 · Classified*

**Definition**

- Intelligence, cryptologic, military, weapons, or classified
- Civilian agencies have some

**Governance**

- NSPM-12 (June 12, 2026) replaced NSD-42 and NSM-8
- CNSS re-established

**National manager**

- NSA Director: standards, crypto, emergency directives
- CISA’s role, for NSS

**Standards**

- CNSS policies and instructions, e.g. CNSSI 1253
- Built on NIST, plus overlays

**Dept. of war**

- RMF instruction giving way to the CSRMC

**Intel community**

- ICD 503 risk management; shared authorizations
- Reciprocity push in 2026

???

National security systems (NSS) are defined in 44 U.S.C. 3552(b)(6): systems used for intelligence activities, cryptologic activities related to national security, command and control of military forces, equipment integral to weapons systems, or systems critical to military or intelligence missions, plus any system protected by procedures for classified information. A civilian agency's classified terminals and networks are NSS even if the agency isn't a defense or intelligence agency. Why it matters: most civilian rules don't apply. OMB memos such as M-26-15 exclude NSS, and CISA's directives, including BOD 26-04, apply to federal civilian systems, not NSS or DoW and IC systems. NSS follow their own chain. Governance changed in 2026. National Security Presidential Memorandum 12 (June 12, 2026), "National Policy for the Cybersecurity of National Security Systems," rescinded National Security Directive 42 (1990) and National Security Memorandum 8 (2022). It re-established the Committee on National Security Systems with a mandate to set baseline cybersecurity requirements for all NSS and enforce accountability across DoW, the IC, and civilian agencies that operate NSS, chaired by a National Security Council staff member, with NSA as technical adviser. It designates the NSA Director as National Manager for NSS: the cryptologic authority, the source of minimum requirements for cryptography, and an authority that can issue emergency directives for NSS (the counterpart to CISA's role for civilian systems). A policy coordination committee can request assessments of NSS posture. EO 14409 separately told the CNSS and DoW to prioritize NSS cyber defense. Standards. CNSS issues policies (CNSSP) and instructions (CNSSI). CNSSP 22 establishes risk management for NSS, and CNSSI 1253 provides categorization and control baselines built on SP 800-53, plus overlays, including one for classified information (next slide). Department of War. DoDI 8510.01 (2022) implemented RMF for DoW systems with eMASS as the system of record. In September 2025 DoW announced the Cybersecurity Risk Management Construct (CSRMC) to replace that implementation with a faster, automation-heavy, continuous approach; implementation guidance and legacy transition were still being worked out in 2026, and the RMF instruction and eMASS remain in use meanwhile. DoW's zero trust target-level deadline is September 30, 2027. Intelligence community. ICD 503 governs risk management and authorization for the IC information environment. In March 2026 ODNI reported new policies promoting reciprocity between IC and DoW systems and a shared IC-wide repository of cybersecurity authorizations to end duplicate assessments. Analogy: the main stage and the VIP stage at a festival. Same music, same physics, but the VIP stage has its own security company, its own rulebook, its own head of security who can shut it down, and the main-stage crew's memos don't apply there.

---

## How RMF changes on the high side

*10 · Classified*

- Topic
- Civilian, unclassified
- National security systems
- Categorization
- FIPS 199 high-water mark: one level
- CNSSI 1253: C, I, and A kept separate
- Controls
- SP 800-53B baselines
- CNSSI 1253 baselines plus overlays
- Process
- SP 800-37, seven steps
- DoW CSRMC: design, build, test, onboard, operate
- Tooling
- Agency GRC tools eMASS at DoW; IC tools
- Reuse
- FedRAMP certification
- Reciprocity; IC shared repository
- Crypto FIPS 140-3 validated
- NSA-approved; CNSA 2.0 for quantum
- Directives
- CISA BODs and EDs
- National Manager directives
- Same logic, stricter defaults: more controls, more independence, less tolerance for undocumented risk.

???

The RMF concepts carry over intact: categorize, select, implement, assess, authorize, monitor. The differences are in the details. Categorization. CNSSI 1253 keeps confidentiality, integrity, and availability as separate impact values instead of collapsing them to the highest one. A system might be High for confidentiality, Moderate for integrity, Low for availability (written H-M-L), and its baseline is assembled to match, so you don't buy highavailability controls for a system whose availability barely matters. Classified systems almost always rate confidentiality High. Controls. CNSSI 1253 baselines build on SP 800-53, then add overlays: the Classified Information Overlay (for systems processing classified information), plus overlays for things like cross-domain solutions, privacy, space, and intelligence. Parameter values are set by CNSS rather than by each agency, so there's less room to tailor. Process at DoW. DoDI 8510.01 (2022) implements RMF for DoW systems. The Cybersecurity Risk Management Construct, announced September 24, 2025, reorganizes it into five phases aligned to the system life cycle (design, build, test, onboard, and operations) with ten strategic tenets centered on automation, critical controls, continuous monitoring, DevSecOps, enterprise inheritance, and reciprocity. The aim is real-time risk visibility in place of point-in-time assessments, essentially continuous ATO by default. Implementation guidance was delayed by the fall 2025 shutdown and was still maturing in 2026; existing RMF processes and eMASS continue in the meantime. If you join a DoW organization, ask early which systems have moved to CSRMC. Process in the IC. ICD 503 governs authorization in the IC information environment, emphasizing reciprocity (accepting another IC element's authorization unless there's a specific reason not to). ODNI's 2026 shared repository of authorizations makes that easier in practice. Tooling. eMASS (the Enterprise Mission Assurance Support Service) is DoW's system of record for authorization packages; civilian agencies use a mix of governance, risk, and compliance tools. Crypto. NSS use NSA-approved cryptography: Type 1 equipment, or Commercial Solutions for Classified (CSfC) layered commercial products. The quantum transition follows CNSA 2.0, NSA's suite, with NSS-wide completion targeted for 2035 and many categories required earlier. Directives. The NSA Director, as National Manager under NSPM-12, can issue emergency directives for NSS, parallel to CISA's for civilian systems. Assessor independence and authorizing official seniority are typically stricter, and risk acceptance is more conservative, because the consequences of compromise are measured in lives and national security, not just money. Analogy: same songs, different studio. This one has a vault, two engineers on every session, a stricter producer, separate settings for each microphone instead of one master volume, and nothing leaves on a USB stick.

---

## COMSEC, TEMPEST, cross-domain, and facilities

*10 · Classified*

**Comsec and crypto**

**Tempest**

- NSA-approved encryption (Type 1 or CSfC). Keying material is accounted for by COMSEC custodians.
- Electronics leak signals. Placement, separation, and shielding rules come from a certified TEMPEST authority.

**Cross-domain**

**Facilities**

- Data moves between classification levels only through approved cross-domain solutions. No sneakernet.
- Accredited spaces: SCIFs under ICD 705 for SCI. No personal electronics; controlled entry and media.
- On the high side, physical and electronic security are one discipline. The room is part of the system.

???

Four protections that barely exist in unclassified IT and dominate classified IT. COMSEC and crypto. Communications security covers the cryptographic equipment, keys, and procedures that protect classified communications. NSA approves the cryptography: Type 1 devices (for example, network encryptors like TACLANE-class devices) or Commercial Solutions for Classified (CSfC), which layers two independent commercial encryption products in NSA-approved configurations so classified data can ride commercial technology. Keying material is accountable: COMSEC custodians track every key and device, and losses are reportable incidents. The post-quantum transition for these systems follows NSA's CNSA 2.0 suite. TEMPEST (emanations security). Electronic equipment unintentionally emits signals (electromagnetic, and sometimes acoustic) that can be intercepted and reconstructed. A certified TEMPEST technical authority determines countermeasures for each facility: separation between classified (red) and unclassified (black) equipment and cabling, filtered power, shielding, and approved equipment placement. It's why you can't just put a classified workstation wherever there's a desk. Cross-domain solutions. A cross-domain solution (CDS) is an approved device or service that moves data between security domains (for example, unclassified to Secret, or Secret to Top Secret), inspecting and filtering content in both directions. NSA's National Cross Domain Strategy and Management Office maintains a baseline list of approved solutions, and DoW policy (DoDI 8540.01) governs their use. Moving data by removable media instead (sneakernet) is tightly restricted or prohibited, because it bypasses the inspection; it's also how many spills and compromises happen. The Data deck covers cross-domain data flows in more depth. Facilities. Classified processing happens in accredited spaces. Sensitive compartmented information requires a SCIF built and accredited under ICD 705 (construction, acoustic protection, alarms, access control). Collateral Secret work happens in approved secure areas. Personal electronics (phones, smartwatches, fitness trackers) generally stay outside. Media entering and leaving are controlled and logged. Some functions require two-person integrity. For an Ops leader, the shift is that infrastructure decisions (where a rack goes, how cables run, what devices are allowed in a room) become security decisions with accreditation consequences. Changes need the security office's approval before, not after. Analogy: a recording vault. The master tapes are encrypted and every copy is signed out (COMSEC); the vault is shielded so nobody can pick up the playback from the parking lot (TEMPEST); nothing goes from the vault to the public studio except through one inspected pass-through window (cross-domain); and no phones in the room, ever (facilities).

---

## Cleared people and insider threat

*10 · Classified*

- Topic
- How it works
- Clearance
- Confidential, Secret, Top Secret; SCI and special access added on top
- Need to know
- A clearance makes you eligible; you still need a reason to see it
- Vetting
- SF-86 investigation; continuous vetting under Trusted Workforce 2.0
- Your duties
- Report foreign contacts, travel, finances, and other changes
- Insider threat
- EO 13587 programs; user activity monitoring on classified networks
- Spillage
- Classified on the wrong system: stop, report, don’t forward or delete
- Secret-cleared engineers for classified terminals; public trust tiers elsewhere

???

The people side of classified security. Clearances. Eligibility for access at Confidential, Secret, or Top Secret. Sensitive compartmented information (SCI) and special access programs add formal access controls on top of a clearance, with their own briefings and read-ins. A clearance is eligibility, not entitlement: you also need need-to-know for each piece of information. Investigations. The SF-86 questionnaire starts the background investigation; Tier 3 investigations support Secret, Tier 5 support Top Secret and SCI. Public trust positions use different tiers: Tier 1 (low risk), Tier 2 (moderate risk), Tier 4 (high risk). Continuous vetting. Trusted Workforce 2.0 replaced periodic reinvestigations every five or ten years with continuous vetting: automated checks of records (criminal, financial, and others) plus agency-reported information, so issues surface as they arise. Your reporting duties. Cleared people must report certain events: foreign travel and contacts, financial difficulties, arrests, and other changes, under Security Executive Agent Directive 3. Failing to report is itself an adjudication issue. The adjudicative guidelines (SEAD 4) cover areas like allegiance, foreign influence, personal conduct, financial considerations, and use of IT systems. Insider threat. Executive Order 13587 (2011), issued after the WikiLeaks disclosures, requires agencies with classified networks to run insider threat programs meeting national minimum standards, including user activity monitoring on classified systems and a hub that can bring together HR, security, counterintelligence, and IT signals. Users consent to monitoring as a condition of access. From an IT perspective, this means logging and analytics on classified systems are richer and more personal than anything in unclassified IT. Spillage. Classified information on an unclassified or lower-classified system. Rules: stop, don't forward it (even to security, which spreads it), don't delete it (which loses evidence and leaves copies), and report immediately. Security then traces every copy, including mailboxes, backups, sync clients, mobile devices, search indexes, and AI indexes, and directs sanitization. IR-9 is the 800-53 control. The Data deck has the full playbook. Analogy: the VIP stage pass. The laminate gets you considered (clearance), the stage manager still has to put you on tonight's list (need-to-know), security keeps checking your record all season (continuous vetting), and you're expected to tell them if something changes, before they find out.

---

## What transfers if you move to a classified agency

*10 · Classified*

**Transfers directly**

**Learn on arrival**

- RMF fluency: controls, packages, POA&Ms
- CNSSI 1253 categorization and overlays
- Identity, privileged access, zero trust design
- The agency’s process: CSRMC or ICD 503
- Patching, logging, and recovery discipline eMASS or the agency’s tools
- COR oversight and security in contracts
- COMSEC, TEMPEST, cross-domain rules
- Incident response and continuity
- Classification management and marking
- Leading contractors and governance
- SCIF discipline and reporting duties
- A CISSP plus hands-on RMF on real systems is a credible base. DoW will also ask for qualifications under its 8140 program.

???

Most of what you do now carries over; the classified world adds rules and rigor on top. Transfers directly. RMF: you know the steps, the artifacts, the roles, and how authorizations actually get made, which is the same logic under CNSSI 1253, ICD 503, or DoW's construct. Operational discipline: risk-based patching, logging plans, incident response, and recovery are the same practices with stricter timelines. Governance: running IT operations through contractors with clear decision rights and metrics is the job at most agencies. Learn on arrival. CNSSI 1253 categorization (separate C, I, A values) and overlays. The agency's authorization process and tools: CSRMC and eMASS at DoW, ICD 503 and IC tools in the intelligence community. Classified-specific protections: COMSEC accounting, TEMPEST, cross-domain solutions, accredited facilities. Classification management: original versus derivative classification, marking, handling, and the Data deck's section on classified information. Personal obligations: SCIF rules, reporting requirements, and working without your phone. Mission context: agency-specific threat intelligence you'll only see once cleared. Credentials. The CISSP you're studying for is the most widely accepted senior security certification and is recognized across DoW's cyber workforce qualification program (DoD Directive 8140.01 and DoDM 8140.03), which assigns qualification requirements by work role. Expect a new role to come with a qualification deadline. Some roles also value CISM (management), CCSP (cloud), or CGRC (the ISC2 certification formerly called CAP, focused on authorization). Clearance. Positions requiring clearances are sponsored by the hiring agency; investigations take months, and some positions require SCI eligibility and a polygraph. If a move is a serious option, prepare: keep finances, foreign contacts, and records clean and documented, and be ready for a long SF-86. Analogy: a session player moving from the studio to an orchestra pit. Your musicianship transfers completely; you learn to read the conductor, follow stricter cues, wear the dress code, and leave your phone in the locker.

---

## Leading it

*11 / 11 · 11 · Leading It*

- How a Director of IT Operations runs security in practice: where Ops ends and the CISO begins, what to measure, a 90-day plan, myths to retire, questions for vendors, and what to watch in 2027.
- Ops and security lines · Metrics · First 90 days · Myths · Vendor questions · CISSP map · What’s next

???

The previous ten sections explain how security works. This one is about running it from your chair. You're not the CISO, and that's the point: most security controls are implemented and operated by IT Operations, while the CISO's office sets policy, monitors, adjudicates, and advises the authorizing official. An Ops director who runs security well is the CISO's most valuable partner and a credible candidate for Deputy CIO, because the Deputy CIO role is exactly where operations and risk meet. Seven slides: the lines of responsibility between Ops, the CISO, and the AO; metrics worth putting in front of the CIO, with baselines first; a 90-day plan (my proposal, not an assigned requirement); myths to retire; twelve questions for any vendor; how this deck maps to the CISSP domains for your exam prep; and what to watch through 2027. Security work crosses all four (operations, applications and AI, policy and records, and security itself), so the responsibility lines on the next slide are worth writing down and agreeing on formally, not just understanding.

---

## Where IT Operations ends and security begins

*11 · Leading It*

- Activity
- IT Operations
- CISO’s office

**Ao**

- Policy and standards
- Consulted
- Owns
- Informed
- Implement controls
- Owns
- Advises, verifies
- – Patching, hardening
- Owns, executes
- Sets clocks, checks
- – Monitoring, SOC
- Feeds data, acts
- Owns
- – Incident response
- Contains, restores
- Leads, reports
- Informed
- Contractor security
- COR enforces
- Sets requirements
- – Risk acceptance
- Recommends
- Advises
- Decides
- Ops owns the controls. The CISO owns the program and the risk picture. The AO owns the decision.

???

Clear lines prevent the two classic failures: security owning things it can't operate, and operations making risk decisions it isn't authorized to make. Policy and standards. The CISO's office writes security policy and technical standards; IT Operations should be consulted so standards are implementable and costed. Implementing and operating controls. You own whether they actually work. The CISO's office advises and independently verifies. Patching and hardening. Ops owns execution and meeting the clock. The CISO's office sets the clock (BOD 26-04 timelines, configuration baselines), verifies compliance, and escalates exceptions. Monitoring and the SOC. The CISO's organization owns detection, triage, and adjudication. Measure that handoff: time from SOC request to Ops action. Incident response. The CISO leads, determines severity and major incident status, and reports. Ops contains (isolates hosts, disables accounts, blocks), preserves evidence, and restores. Practice the handoffs before you need them. Contractor security. Ops, as COR, enforces the contract's security requirements (suitability, access removal, incident coordination, patch performance); the CISO's office defines security requirements for solicitations; the contracting officer changes terms. Risk acceptance. The authorizing official decides; where the agency has delegated some acceptance authority to the CISO, the CISO decides within it. Ops recommends with a clear statement of the risk, options, and cost. Never accept risk informally ("we'll live with it") by leaving something unfixed; route it. Where friction usually shows up: who pays for security tools (Ops budget, security requirement); who owns logging costs; who approves emergency changes during an incident; who maintains the CMDB data that security depends on; and who owns AI-related security reviews. Settle these in writing, ideally as part of documenting decision rights across the four co-equal the IT office directors. What makes Ops a strong partner: publishing your own security metrics before you're asked, offering the common control catalog, treating POA&M items as a service queue, and bringing the ISSO into architecture decisions early. Analogy: the band, the producer, and the label. The band plays (Ops). The producer sets the standard, listens critically, and calls retakes (CISO). The label decides whether it's released (AO). When the band starts deciding release dates, or the producer starts playing the guitar parts, the record suffers.

---

## Metrics worth putting in front of the CIO

*11 · Leading It*

- Metric
- Why it matters
- Source
- Findings past their BOD 26-04 deadline, by tier
- The directive’s clock
- Scanner, the ITSM platform
- Assets with an owner and EDR (%)
- Unknown is unprotected

**Cmdb, edr**

- End-of-support edge devices (count)

**Bod 26-02**

- CMDB, CISA list
- Phishing-resistant MFA coverage (%)
- Identity is the perimeter
- the identity provider, the cloud directory Standing privileged assignments
- Blast radius
- the cloud directory PIM
- Log sources meeting the plan (%)

**M-26-14**

- the SIEM
- Restore tests passed this quarter
- Resilience is proven
- Backup tools
- POA&M items past due (count, age)
- IGs check this
- POA&M tracker
- Declare the baseline before the target. Anti-ratchet applies to security metrics too.

???

Eight metrics that describe real risk, map to current mandates, and come from systems you already run. Each should show a baseline, a trend, and a target set after the baseline is known. Findings past deadline, by BOD 26-04 tier. Not "percent patched," which hides the one exposed, exploited, fullcontrol flaw among thousands of low-risk ones. Report counts past deadline in each tier, with the oldest item named. From December 7, 2026 this is the directive's measure. Assets with an owner and EDR coverage. The denominator is the CMDB plus discovery; the numerator is devices with a named owner and a healthy EDR sensor. Gaps here mean blind spots everywhere else. End-of-support edge devices. A count that should go to zero on BOD 26-02's schedule (all identified devices out by August 2027). Phishing-resistant MFA coverage. Share of users, and separately of privileged users, whose sign-ins require PIV, FIDO2, or device-bound passkeys. Admins should be at 100%. Standing privileged assignments. Permanently active admin roles in the cloud directory, the identity provider, AD, and key SaaS, excluding break-glass. Should trend toward zero as PIM covers them. Log sources meeting the logging plan. Share of required sources (by the agency's M-26-14 plan) actually arriving in the SIEM with the right retention. Restore tests passed. Number of scheduled restore tests run and passed this quarter, including at least one identity system and one M365 workload per year. POA&M items past due. Count and age of items assigned to IT Operations past their scheduled completion date. Inspectors general look at this every year. Metrics to avoid: "attacks blocked" (big, meaningless, and unrelated to risk), "number of policies," and raw vulnerability counts without context. Presentation: one page, monthly, eight rows, each with baseline, current, trend arrow, target, and a one-line note. Analogy: the monitor mix. You don't need every channel in your wedge, just the few that tell you whether the band is in time and in tune. Too many and you hear nothing; the wrong ones and you play confidently out of key.

---

## A 90-day plan for IT Operations’ security posture

*11 · Leading It*

**Days 1–30 · find**

**Days 31–60 · fix**

**Days 61–90 · operate**

- Confirm BOD 26-04 readiness: in force
- Dec 7
- Baseline the eight metrics
- Monthly security scorecard to the CIO
- Move standing admin rights into PIM
- Draft an Ops common control catalog
- List every system, its ATO status and expiry
- Restore-test one critical system
- Tabletop the contractor incident handoff
- Match edge devices to CISA’s end-ofsupport list
- Sort Ops POA&M items by risk and age
- Security duties in PWPs and the QASP
- Meet the CISO and ISSOs on what
- Ops owns
- Day-90 package: a baselined scorecard, a draft common control catalog, and one tabletop’s lessons learned.

???

This is my proposal, not an assigned requirement. It's sequenced around what's due soonest and what earns credibility fastest. Days 1 to 30: find. Then build a system list with ATO or ATU status, expiration or ongoing-authorization status, AO, ISSO, and which controls Ops provides. Match the network inventory against CISA's end-of-support edge device list (BOD 26-02's 12-month removal milestone is February 2027). And sit down with the CISO and ISSOs to agree what Ops owns, using the responsibility table two slides back. Days 31 to 60: fix. Baseline the eight metrics, recording starting numbers before announcing any targets. Move remaining standing admin assignments in the cloud directory, the identity provider, and AD into PIM or equivalent just-in-time access. Restore-test one critical system end to end, ideally including identity dependencies, and write down what broke. Sort POA&M items assigned to Ops by risk and age, and agree dates with the ISSOs. Days 61 to 90: operate. Start a one-page monthly security scorecard to the CIO. Draft an IT Operations common control catalog: each inheritable control (identity and MFA, endpoint protection, patching, logging, backup, boundary protection, server room), how it's implemented, its last assessment, and the customer responsibilities for systems that inherit it. The day-90 package gives the CIO evidence: a scorecard with honest baselines, a catalog that speeds every future ATO, and a tested incident process. Watch for scope creep: you're improving the controls Ops owns and the handoffs with security, not taking over the CISO's program. Analogy: the first rehearsals with a new band before tour. Check the gear against the venue rules that change next week, learn who plays which part, record a run-through to hear where you really are, and drill the song that always falls apart.

---

## Myths you’ll hear, and the reply

*11 · Leading It*

- Myth
- Reply
- “We have an ATO, so we’re secure.”
- An ATO says known risk was accepted, at a point in time.
- “It’s FedRAMP, so the vendor handles it.”
- They handle their layer. Configuration and access are ours.
- “We have MFA, so phishing is solved.”
- Only phishing-resistant MFA is. Codes and pushes get relayed.
- “Patch the criticals first.”
- Patch what’s exposed and exploited first. That’s BOD 26-04.
- “We’re too small to be a target.”
- Automated attacks don’t check org charts. Our data has value.
- “Security is the CISO’s job.”
- Most controls are run by IT Operations.
- “It’s air-gapped, so it’s safe.”
- Media, updates, and people cross gaps every day.
- “The cloud backs it up.”
- The provider keeps the service up. Restoring your data is on you.

???

Each myth, with the longer answer. "We have an ATO, so we're secure." An authorization records that an official accepted the residual risk, including known weaknesses in the POA&M, based on evidence at a point in time. It doesn't say the system is secure, and it decays as the system and threats change. Continuous monitoring is what keeps it meaningful. "It's FedRAMP, so the vendor handles it." FedRAMP certification covers the provider's layer. Tenant configuration, identity, sharing settings, data, logging, and user behavior are customer responsibilities, and most cloud breaches happen there. FedRAMP renamed authorization to certification in 2026 precisely because the old word was misread as blanket risk acceptance. "We have MFA, so phishing is solved." Adversary-in-the-middle kits relay one-time codes and push approvals in real time and steal the session token. Only phishing-resistant methods (PIV, FIDO2, device-bound passkeys) defeat that. Token theft from compromised devices can bypass even those, which is why device compliance and token protection matter. "Patch the criticals first." CVSS measures how bad a flaw could be, not how likely it is to be used against you. An exposed, actively exploited "high" outranks an unreachable "critical." BOD 26-04 makes that the rule. "We're too small to be a target." Most exploitation is automated and opportunistic: scanners find any vulnerable device on the internet. "Security is the CISO's job." The CISO runs the program, policy, monitoring, and risk advice. IT Operations configures, patches, monitors health, manages identities, backs up, and restores. If Ops doesn't do its part, the CISO's program is a document. "It's air-gapped, so it's safe." Isolated networks still receive updates, removable media, maintenance laptops, and people. Stuxnet crossed an air gap on USB drives. Isolation reduces risk; it doesn't remove it. "The cloud backs it up." SaaS providers protect against their own failures; recovering data that users, admins, or attackers deleted or encrypted beyond native retention is the customer's job. Third-party backups and tested restores close the gap. Bonus answers for the room. "Compliance equals security": compliance is the floor and the evidence; security is whether the controls stop attacks. "AI will handle it": AI speeds both sides; the fundamentals still decide outcomes. "We'll fix it after golive": that's when it costs ten times more and the ATO conditions start. Analogy: the band telling itself "we soundchecked, so the show will be fine." Soundcheck matters, but the room fills up, the levels drift, and someone still has to listen all night.

---

## Twelve questions for any vendor or contractor What’s your FedRAMP class and status, and your 20x move date?

*11 · Leading It*

- How is privileged access to our data controlled and logged?
- What’s in your boundary, and what’s left to us?
- Can you provide an SBOM and a disclosure policy?
- How fast will you tell us about an incident, and how?
- What’s your post-quantum roadmap?
- Can we get our logs? Which, in what format, for how long?
- What AI features touch our data, and can we turn them off?
- How do your patch timelines map to BOD 26-04?
- How do we get our data back, with proof it’s destroyed?
- Who are your subcontractors and key subprocessors?
- Which of your admin and edge systems face the internet?

???

Use these in market research, technical evaluations, renewals, and quarterly reviews. Good vendors answer quickly and specifically; vague answers are themselves the answer. 1. Certification. Which FedRAMP class, Rev5 or 20x, and if Rev5, when they'll transition before the June 11, 2027 cutoff for new Rev5 certifications. Ask for the marketplace listing, not a slide. 2. Boundary and customer responsibilities. Which components are in their certified boundary (watch for "our AI features are delivered by a partner"), and the list of controls you must implement in your tenant. 3. Incident notification. Time from their detection to your notification, the channel, what information you'll get, and who to call at 2 a.m. You have a one-hour clock to CISA; their delay is your delay. 4. Logs. Which logs you can get (admin actions, sign-ins, data access, API calls), in what format, by API or export, retained for how long, at what cost. Map against your M-26-14 logging plan. 5. Vulnerability timelines. How they prioritize and how fast they fix exploited flaws, and whether their process maps to BOD 26-04 (FedRAMP has mapped its rules to it). 6. Exposure. Which of their administrative interfaces, support tools, and edge devices face the internet. Their support portal is part of your attack surface. 7. Privileged access. Who on their staff can reach your data, from where, with what approval, and whether you can see that access in logs. Ask about customer lockbox or equivalent. 8. Fourth parties. Subcontractors and subprocessors, especially hosting and AI providers, with notification when the list changes. 9. SBOM and disclosure. For software, can they provide an SBOM, and do they have a public vulnerability disclosure policy? With mandatory attestations rescinded, this is how you assess secure development. 10. Post-quantum. When they'll support post-quantum key exchange and signatures; it's part of your M-26-15 plan. 11. AI. Which features use AI, what data they send and where, whether your data trains anything, and whether you can disable features per tenant. EO 14434 means their federal materials may say "SI." 12. Exit. Data return in usable formats, timelines, and certified destruction under SP 800-88, including backups. Analogy: advancing a show. Before you book a venue, you ask about load-in, power, house crew, security, curfew, and how you get your gear back out. Asking after the show is too late.

---

## How this deck maps to the CISSP’s eight domains

*11 · Leading It*

- Domain (exam weight)
- Where it is in this deck
- 1 · Security and risk management (16%)
- 01 Foundations; 05 RMF; 07 Law and policy
- 2 · Asset security (10%)
- 05 Categorization; the Data deck
- 3 · Architecture and engineering (13%)
- 01 Principles; 02 Crypto; 10 Classified
- 4 · Network security (13%)
- 02 Network; 03 Zero trust
- 5 · Identity and access (13%)
- 03 Identity and zero trust
- 6 · Assessment and testing (12%)
- 05 Assessment; 04 Vulnerabilities
- 7 · Security operations (13%)
- 04 Security operations
- 8 · Software development (10%)
- 02 Application security; 09 AI
- The exam rewards the manager’s answer: protect people first, follow policy, and fix the root cause.

???

A study aid for the CISSP you're preparing for. Weights are from ISC2's 2024 exam outline; check ISC2's site before you schedule, since outlines are refreshed every few years. Format. The English exam is computerized adaptive: 100 to 150 questions in up to three hours, with a scaled passing score of 700 out of 1000. You need five years of paid work experience in two or more domains (a degree or an approved certification can substitute one year); without it you can pass and become an Associate of ISC2 while you finish the experience. After passing, a current certificant endorses you. How the deck helps by domain. Domain 1 is the largest: governance, risk concepts (including the quantitative formulas on the risk slide), legal and regulatory issues, ethics (the ISC2 code), business continuity, and supply chain risk. Sections 01, 05, 07, and 08 cover most of it. Domain 2: information and asset classification, ownership roles, data states, retention, and sanitization; the Data deck covers this deeply. Domain 3: security models (BellLaPadula for confidentiality, Biba for integrity, Clark-Wilson for commercial integrity), design principles, cryptography, and physical security, which the exam still tests (fire suppression, fences, lighting). Domain 4: OSI and TCP/IP, secure protocols, network attacks, and components; your networking cheat sheet plus section 02. Domain 5: identification, authentication, authorization models (DAC, MAC, RBAC, ABAC), federation, and the identity lifecycle. Domain 6: assessment strategies, audits (SOC reports), vulnerability scanning, penetration testing, log review, and test coverage. Domain 7: investigations and evidence, logging and monitoring, incident management, change and configuration management, patching, backup and recovery, and disaster recovery testing. Domain 8: secure development life cycle, testing methods, software assurance, and risks of acquired software. Exam mindset. Many questions offer several technically correct answers. Pick the one a risk-aware manager would choose: human safety first; follow policy and due process; get management approval; address the root cause rather than the symptom; and prefer prevention over detection when equally feasible. Your daily federal work trains exactly that judgment; the exam's vocabulary sometimes differs (for example, it says "senior management is ultimately responsible"). Study method that works for experienced people: take a diagnostic practice test, study your weakest two domains first, do a few hundred quality practice questions while reading every explanation, and read the notes in sections 01 and 05 once more the week before. Analogy: the difference between playing a gig and passing a theory exam. You already play; the exam asks you to name what you're doing, in its terms, and pick the textbook answer even when you'd improvise differently on stage.

---

## What to watch through 2027

*11 · Leading It*

**Dec 7, 2026**

- BOD 26-04 timelines take effect

**Aug 2027**

- BOD 26-02: all identified EOS gone

**Dec 11, 2026**

- Info-sharing law lapses unless extended

**Sep 30, 2027**

- DoW zero trust target level

**Mid-dec 2026**

- FedRAMP 20x Phase 4 plans
- 2027–2028
- Post-quantum pilots (phase 2)

**Feb 2027**

- BOD 26-02: past-EOS edge removed

**Pending**

- CIRCIA rule; CMMC reform; CSRMC

**Jun 11, 2027**

- No new FedRAMP Rev5 certifications

**Pending**


???

The dated items and what to do about each. December 7, 2026: BOD 26-04 remediation timelines apply. Confirm policy, scanning, and patch orchestration readiness now. December 11, 2026: the Cybersecurity Information Sharing Act of 2015 (and the Federal Cybersecurity Enhancement Act) were extended only to this date by the stopgap funding law. If they lapse again, private-sector threat sharing with government loses its liability protections, as it briefly did in October 2025. Mostly affects vendors and partners, but expect slower sharing if it lapses. Mid-December 2026: FedRAMP has said it will announce timelines and scale for 20x Phase 4 (likely Class D and broader Rev5 transition). February 2027: BOD 26-02's 12month milestone, removing edge devices already past end of support. August 2027: all identified end-of-support edge devices removed. February 2028: continuous lifecycle process in place. June 11, 2027: FedRAMP stops accepting new Rev5 certifications. Vendors "in process" on Rev5 need a 20x plan. Also on the calendar but not shown: M-26-14 logging maturity milestones counted from the August 2026 reference architecture (advanced maturity around midto-late 2027; confirm against the memo), and existing FedRAMP Rev5 certifications valid until at least December 31, 2028. Process tip: set a six-month calendar reminder to re-check sections 04 through 07 against current sources, and keep a one-page "what changed" log for the CIO. Being the person who knows what changed and what it means is a Deputy CIO skill. Analogy: the tour calendar. Some dates are fixed (the venues are booked), some are holds (pending confirmation), and a good tour manager checks both every week and tells the band before the bus leaves.

---

## Glossary: risk, RMF, and authorization

*REFERENCE*

- AO: authorizing official; the senior official who accepts residual risk.
- FIPS 199: low, moderate, or high impact for C, I, and A.
- ATO, ATU: authorization to operate a system; to use another’s.
- High-water mark: the highest of the three sets the level.
- IATT: interim authorization to test, limited in time and scope.
- ISCM: information security continuous monitoring, SP 800-137.
- SSP: system security and privacy plan; how each control is met.
- Ongoing authorization: the AO decides from live monitoring.
- SAR: security assessment report; what was tested and found.
- ISSO: information system security officer; daily security lead.
- POA&M: plan of action and milestones for open weaknesses.
- SCA: security control assessor; tests independently.
- Common control: provided once, inherited by many systems.
- HVA: high value asset, designated under OMB M-19-03.
- Overlay: controls tailored to a context: privacy, classified, AI.
- Major incident: OMB-defined; OMB and CISA in 1 hour, Congress in
- 7 days.

**Reference**


???

Extra detail on terms that cause confusion. ATO versus ATU. An authorization to operate covers a system the agency owns or operates. An authorization to use covers a system someone else operates (a FedRAMP-certified cloud service, another agency's shared service), based on that provider's package plus the agency's own review of its responsibilities. Both are agency risk decisions. Denial of authorization. If the AO finds the risk unacceptable, the system may not operate, or must stop. Terms and conditions. Most ATOs carry conditions: fix specific findings by a date, limit use (no PII until X), or require extra monitoring. Common, hybrid, system-specific. A common control is implemented once and inherited (enterprise MFA, logging, physical security); hybrid is partly inherited, partly implemented by the system; system-specific is implemented by the system alone. Overlay versus baseline. A baseline is the starting control set for an impact level (SP 800-53B). An overlay adjusts it for a context: the privacy overlay, CNSSI 1253's classified information overlay, FedRAMP's additions, and NIST's forthcoming AI overlays (COSAiS, renamed COSIS). High-water mark. FIPS 200's rule on civilian systems. National security systems under CNSSI 1253 keep C, I, and A separate instead. Ongoing authorization versus continuous ATO. Ongoing authorization is SP 800-37's model: the AO keeps the authorization current through monitoring data and periodic reviews, without a fixed reauthorization date. Continuous ATO (cATO) is the DevSecOps version, where pipeline evidence supports each release. Major incident. OMB's definition (currently in M-25-04) covers incidents likely to cause demonstrable harm to national security, foreign relations, the economy, public confidence, civil liberties, or public health and safety, and any breach of PII affecting 100,000 or more people. It triggers notification to OMB and CISA within one hour of determination and to Congress within seven days. Don't confuse it with an ITSM "major incident," which is a Priority 1 outage. HVA. High value assets are systems or data whose compromise would significantly affect national security, the economy, public health and safety, or the agency's essential functions. They get CISA assessments and priority in post-quantum migration. SAISO and SAOP. The senior agency information security officer (usually the CISO) and the senior agency official for privacy. Analogy: a band's glossary. Everyone in the room knows what "the bridge" and "the outro" mean, and a new player who doesn't loses the next three bars.

---

## Glossary: operations, programs, and the high side

*REFERENCE*

- KEV: CISA’s Known Exploited Vulnerabilities catalog.
- FedRAMP 20x: the automation-based certification path.
- SSVC: decision trees for patch priority; behind BOD 26-04.
- KSI: key security indicator, an outcome FedRAMP 20x validates.
- EDR: endpoint detection and response.
- SCuBA: CISA’s secure Microsoft 365 baselines (BOD 25-01).
- SIEM, SOAR: correlate security logs; automate the response.
- SBOM: software bill of materials, the ingredient list.
- CEM, THIRF: M-26-14’s two logging objectives.
- CNSS, CNSSI 1253: NSS governance body; its baselines.
- PIM: just-in-time privileged access in the cloud directory.
- CSRMC: DoW’s construct replacing its RMF implementation.
- Phishing-resistant MFA: PIV, FIDO2 keys, device-bound passkeys.
- CDS: cross-domain solution between classification levels.
- ZTNA: per-application access after identity and device checks.
- CNSA 2.0: NSA’s quantum-resistant algorithms for NSS.

**Reference**


???

Extra detail on the operations and program terms. KEV. CISA's catalog of vulnerabilities with evidence of active exploitation. Under BOD 26-04 it's one of four variables, not a flat deadline list. SSVC. Stakeholder-Specific Vulnerability Categorization: CISA's decision-tree method that weighs exploitation status, exposure, automatability, and impact to produce an action (track, attend, act). BOD 26-04's tiers follow its logic. EPSS (Exploit Prediction Scoring System) estimates the probability of exploitation in the next 30 days and is a useful companion signal. CVSS measures severity, not risk. EDR, XDR, NDR. Endpoint detection and response watches device behavior and can isolate hosts; extended detection and response correlates across endpoint, identity, email, and cloud; network detection and response watches traffic. SIEM and SOAR. A security information and event management platform (the SIEM at your agency) collects and correlates logs and runs detections; security orchestration, automation, and response runs playbooks. CEM and THIRF. Continuous event monitoring and threat hunting, investigation, response, and forensics: the two objectives M-26-14 asks logging to serve. PIM and PAM. Privileged identity management (the cloud directory's just-in-time role activation) is one form of privileged access management, which also covers vaulting credentials and recording admin sessions. Phishing-resistant MFA. Authentication bound cryptographically to the legitimate site, so relay phishing fails: PIV and CAC cards, FIDO2 security keys, and device-bound passkeys such as Windows Hello for Business. FedRAMP 20x and KSIs. The certification path introduced in 2025 and opened to all providers by the Consolidated Rules for 2026. Key security indicators are outcome statements validated by automation and assessors. Classes A to D replace Low, Moderate, and High. SCuBA. Secure Cloud Business Applications: CISA's configuration baselines and assessment tool for Microsoft 365 (and Google Workspace), made mandatory for M365 in civilian agencies by BOD 25-01. SBOM. A machine-readable inventory of a software product's components and versions (SPDX or CycloneDX formats). CNSS and CNSSI 1253. The Committee on National Security Systems, re-established by NSPM-12 in June 2026, sets NSS policy; CNSSI 1253 provides NSS categorization and baselines with overlays. CSRMC. DoW's Cybersecurity Risk Management Construct (September 2025): five phases and ten tenets for continuous, automated risk management. CDS. A cross-domain solution inspects and transfers data between security domains; NSA's National Cross Domain Strategy and Management Office maintains the approved baseline. CNSA 2.0. NSA's Commercial National Security Algorithm Suite 2.0, the quantum-resistant algorithm set and timeline for NSS, with 2035 as the end state. Analogy: the gear list on a tour. Everyone should know what a DI box, an IEM, and a snake are before load-in, not while the doors are opening.

---

## Sources and where to go deeper

*REFERENCE · CURRENT AS OF NOV 22, 2026*

**Policy and law**

**Standards and programs**

**Defense, ic, and ai**

- OMB M-26-05 software, hardware
- SP 800-53 release 5.2.0
- NSPM-12 NSS policy
- OMB M-26-14 logging
- SP 800-37 Rev 2 RMF
- DoW CSRMC
- OMB M-26-15 post-quantum
- FedRAMP 2026 rules
- CMMC status
- OMB M-25-04 FISMA guidance
- ODNI modernization
- Cyber Strategy March 2026
- BOD 26-04 patch by risk

**Icd 503**

- EO 14409 AI and security
- BOD 26-02 edge devices
- Agentic AI guidance
- EO 14434 terminology
- Verizon 2026 DBIR
- NIST AI overlays

**Reference**


???

Additional sources behind specific claims: ED 26-03 Cisco SD-WAN: https://executivegov.com/articles/cisa-agencies-cisco-sd-wan-threats FedRAMP response to BOD 26-04: https://fedramp.gov/notices/0014 First 20x Class C certification: https://www.fedramp.gov/2026-11-02-memo-to-milestone/ CISA Logging Reference Architecture coverage: https://www.wiley.law/alert-OMB-Overhauls-Federal-Cyber-Logging-Requirements-ProvidingClarity-for-Private-Sector EO 14412 and M-26-15 timeline: https://www.encryptionconsulting.com/pqc-for-government-defense-inventory-to-cnsa-20-execution/ No FY2026 FISMA guidance (NARA OIG): https://naraoig.oversight.gov/sites/default/files/reports/2026-10/Public%20Version%20%2026-AUD-09.pdf CIRCIA final rule to OIRA: https://www.insideprivacy.com/critical-infrastructure/cisa-submits-final-circia-rule-for-omb-review/ CISA 2015 extension: https://www.everycrsreport.com/reports/IF12959.html CMMC Phase II suspension: https://hklaw.com/en/insights/publications/2026/07/dow-suspends-cmmc-phase-ii-requirements ATF major incident: https://techcrunch.com/2026/08/27/atf-declares-major-incident-as-ransomware-gang-claims-hack/ FBI wiretap network major incident: https://www.securitymagazine.com/articles/102207-breach-of-fbi-surveillance-system-considered-a-major-incident-security-experts-weigh-in CISA leadership change: https://www.nextgov.com/people/2026/02/cisa-acting-director-moved-new-dhs-role/411737/ DoW zero trust 2027 deadline: https://defensescoop.com/?p=87754 Agentic AI guidance summary: https://www.mayerbrown.com/en/insights/publications/2026/06/multi-agencyguidance-on-securing-agentic-ai-systems National cyber strategy analysis (CRS): https://www.everycrsreport.com/files/2026-0311_IN12667_24ec5829b10838423d611f797a441c153c277faa.html Classic references: Saltzer and Schroeder (1975), The Protection of Information in Computer Systems; NIST SP 800-30 Rev 1, 800-39, 800-61 Rev 3, 800-63-4, 800-137, 800-161 Rev 1, 800-207; FIPS 199, 200, 140-3, 203, 204, 205; CNSSI 1253; MITRE ATT&CK.
