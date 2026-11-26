---
title: "ITIL quick reference desk card"
domain: operations
tags: [itil, itil-5, itsm, service-desk, incident, change-enablement, cmdb, knowledge, sla, contracts, certification]
summary: "ITIL Version 5 and the 34 practices on one card: service desk and change cheat sheets, CMDB and knowledge, service levels and metrics, the federal overlay, contract checklist, certification path and a 90-day plan. Redacted from the original desk card."
status: draft
updated: 2026-11-23
handling: public
redacted: "Agency-specific names, tools, contracts, contract targets, people and plans removed under the approved redaction rules (2026-11-23)."
related: [cybersecurity-quick-reference, itil-things-you-need-to-know]
---

Companion to the deck ITIL: The Things You Need to Know. Facts checked as of the date above. Re-check the version, certification and federal sections every six months.

### The five ideas

1. ITIL is a menu, not a mandate. Nobody "implements ITIL" end to end. You adopt the practices that fix your real pain and adapt them to your size.
2. Value is co-created. A service is only worth what the user gets out of it. Measure what users feel (time to restore, time to fulfil, experience), not how many tickets moved.
3. Flow beats gates. Route changes by risk. Most should be standard and pre-authorized; the CAB is for the risky few. Speed is now a federal control: some patches are due in 3 days.
4. Data is the backbone. Incident, change, asset, and knowledge records only help if they're accurate. A wrong CMDB makes every other practice wrong.
5. Fix causes, not symptoms. Incident management restores service. Problem management removes the repeat work. Continual improvement keeps doing that on purpose.

### Where ITIL stands (November 2026)

- ITIL (Version 5) is current. PeopleCert released it on February 12, 2026, after an early-access phase in January (New Horizons). The official name has parentheses: "ITIL (Version 5)." Everyone says "ITIL 5" anyway.
- It is an evolution, not a reset. It keeps ITIL 4's guiding principles, service value system, value chain, practices, and continual improvement. The value chain is simplified (PeopleCert ITIL architects).
- What is new. An eight-stage product and service lifecycle (Discover, Design, Acquire, Build, Transition, Operate, Deliver, Support). Two overriding principles: AI-native and complexity-native. The service journey model moves into Foundation. A new AI Governance book and module.
- Practices. Still 34, with names reported unchanged (ITSM.tools). Full guidance lives in the Practice Guides, available through PeopleCert Plus membership.
- ITIL 4 sunset. PeopleCert's current plan is to retire all ITIL 4 exam modules on December 31, 2027. Certificates you already hold stay valid, subject to three-year renewal (ProcessExam summary of the PeopleCert FAQ).

## The model on one page

*ITIL turns demand into value through one system. Principles steer, governance directs, the lifecycle does the work, practices supply the know-how, and continual improvement keeps it honest.*

### ITIL service value system · Version 5 lifecycle highlighted

The highlighted lifecycle is what Version 5 changed; the principles, governance, practices, improvement, and four dimensions carry over from ITIL 4.

### Seven guiding principles (carried into Version 5 unchanged)

| Principle | What it means | At your agency’s desk |
|---|---|---|
| Focus on value | Every activity traces to user or mission value | Ask who benefits before building a catalog item |
| Start where you are | Measure and reuse what works before replacing it | Pull the ITSM platform baseline before any redesign |
| Progress iteratively with feedback | Small, reversible steps with checkpoints | Pilot Virtual Agent on one request type first |
| Collaborate and promote visibility | Shared data, no hidden queues | One P1 bridge, one status update cadence |
| Think and work holistically | A change to one part touches the others | Onboarding spans the HR office, ICAM, assets, and training |
| Keep it simple and practical | Fewest steps that still control the risk | Cut approval steps nobody reads |
| Optimize and automate | Fix the flow first, then automate it | Clean up offboarding before scripting it |

### Four dimensions (check all four before calling a change done)

| Dimension | Covers | Question to ask |
|---|---|---|
| Organizations and people | Roles, skills, culture, staffing | Who owns it, and are they trained? |
| Information and technology | Data, tools, platforms | What data and tooling does it need? |
| Partners and suppliers | Contracts, vendors, integrators | Which contract covers it, and how is it measured? |
| Value streams and processes | How work flows and where it waits | Where are the handoffs and queues? |

Outside forces (political, economic, social, technological, legal, environmental) press on all four. In Version 5 the dimensions cover products as well as services.

Value chain to lifecycle. ITIL 4's value chain had six activities: plan, improve, engage, design and transition, obtain/build, deliver and support. Version 5 recasts the work as an eight-stage product and service lifecycle: Discover, Design, Acquire, Build, Transition, Operate, Deliver, Support. Design and transition are now separate stages.

## All 34 practices at a glance

*The 34 practices are the toolkit; you don't need all of them at full depth. The 15 in the Version 5 Practice Manager modules are the operations core. Groupings below are ITIL 4's (general, service, technical); Version 5 keeps the practice names.*

| Practice | Purpose in one line | V5 module |  |
|---|---|---|---|
| Service desk | Single point of contact for users | MSF |  |
| Incident management | Restore normal service fast | MSF |  |
| Problem management | Find and remove causes of incidents | MSF |  |
| Service request management | Fulfil standard, pre-defined requests | MSF |  |
| Monitoring and event management | Watch components, act on meaningful events | MSF | Infrastructure and cloud ops |
| Change enablement | Maximize successful changes through risk- based authorization | PIC |  |
| Deployment management | Move components into live environments | PIC | Infrastructure, the application development team |
| Release management | Make new or changed features available | PIC | the application development team, M365 release cadence |
| Service configuration management | Keep accurate data on CIs and their relationships | PIC | the ITSM platform CMDB |
| IT asset management | Track the lifecycle and cost of every asset | PIC | Ops ITAM, MEGABYTE Act |
| Relationship management | Build trust with stakeholders and customers | CAI | the IT office to business offices |
| Supplier management | Get value from vendors | CAI |  |
| Service level management | Set and track agreed service targets | CAI |  |
| Continual improvement | Improve services and practices on purpose | CAI | KPIs, improvement register |
| Information security management | Protect confidentiality, integrity, availability | CAI | CISO, RMF |
| Architecture management | Show how business and technology parts fit |  | Enterprise architecture |
| Knowledge management | Capture and reuse what the organization knows |  | the ITSM platform knowledge base |
| Measurement and reporting | Turn data into decisions |  | Dashboards, performance plan |
| Organizational change management | Get people to adopt the change |  | Comms and training plans |
| Portfolio management | Fund the right mix of work for strategy |  | IT investment governance |
| Project management | Deliver projects on scope, time, cost |  | the IT office project work |
| Risk management | Understand and treat risk |  | Risk register, ATO decisions |
| Service financial management | Know what services cost and fund them |  | Budget, TBM-style cost views |
| Strategy management | Set direction and priorities |  | IT strategic plan |
| Workforce and talent management | Right people with the right skills |  | PDs, JOAs, training |
| Availability management | Deliver agreed availability |  | Uptime targets |
| Practice | Purpose in one line |  | V5 module |
| Business analysis | Turn business needs into requirements |  | Intake, PRISM |
| Capacity and performance management | Meet demand cost- effectively |  | Licensing, cloud sizing |
| Service catalogue management | One accurate list of available services |  | the ITSM platform catalog |
| Service continuity management | Keep services running through disaster |  | COOP, backups |
| Service design | Design services people can use |  | New services and workflows |
| Service validation and testing | Prove it works before release |  | Test/dev environment |
| Infrastructure and platform management | Run the underlying infrastructure |  | Azure, M365, network |
| Software development and management | Build and maintain applications |  | the application development team |

MSF = Monitor, Support and Fulfil. PIC = Plan, Implement and Control. CAI = Collaborate, Assure and Improve (module contents).

## Service desk cheat sheet

*Classify first; the record type decides the clock, the queue, and the metric. Definitions below are ITIL 4's. Version 5 refreshes the wording for incident, problem, and change, so check the V5 Practice Guides before quoting them in a contract.*

| Record | Plain definition | Goal | Clock that matters |
|---|---|---|---|
| Incident | Unplanned interruption or drop in quality of a service | Restore service | Time to restore |
| Service request | Standard, pre-agreed ask (access, device, information) | Fulfil it | Time to fulfil |
| Problem | The cause, or potential cause, of one or more incidents | Remove the cause | Time to workaround, time to fix |
| Known error | A problem analysed but not yet fixed | Publish the workaround | Workaround in the knowledge base |
| Event | A change of state that matters to managing a service | Detect early | Time to detect |
| Change | Adding, modifying, or removing anything that could affect a service | Change safely | Lead time, success rate |

Priority = impact × urgency. Impact is how many people or how much mission is hurt. Urgency is how fast it gets worse. A common P1–P4 pattern; set yours in policy.

| Impact / urgency | High urgency | Medium urgency | Low urgency |
|---|---|---|---|
| High impact | P1 | P2 | P3 |
| Medium impact | P2 | P3 | P4 |
| Low impact | P3 | P4 | P4 |

### Major incident: first 30 minutes

- Declare it. One person has authority to call a major incident.
- Open one bridge and name an incident manager and a separate communications lead. Post the first sit rep: what is down, who is affected, next update time. Check recent changes on the affected CIs first; most outages follow a change. Log every action with a timestamp in the incident record.
- After restore: open a problem record and schedule a blameless review.

Problem management toolkit. Run it reactively (from repeat incidents) and proactively (from trends). Techniques: five whys, Ishikawa (fishbone), timeline reconstruction, Kepner-Tregoe for complex faults. Output is a known error with a workaround, then a change that removes the cause.

## Change enablement cheat sheet

*ITIL 4 renamed change management to change enablement on purpose: the job is to get changes through safely and quickly, not to stop them.*

| Type | What it is | Who authorizes |
|---|---|---|
| Standard | Low-risk, repeatable, documented procedure | Pre-authorized once, when the model is approved |
| Normal | Assessed and scheduled one at a time | A change authority sized to the risk: peer, manager, or board |
| Emergency | Must go now to restore service or close a critical risk | A small, fast emergency authority; paperwork can follow |

Change authority, not "the CAB." ITIL 4 lets you push approval to the lowest level that can judge the risk. A board should see the risky few, not every patch. A healthy shop moves most volume through standard changes.

The 3-day patch problem. CISA's BOD 26-04, issued June 10, 2026, sets remediation as short as three days for the highest-risk known-exploited flaws, and agencies must meet its timelines from December 7, 2026 (Cybersecurity Dive, Tenable). A weekly change board cannot carry that. Make routine patching a standard change model with automated validation, and keep emergency changes for real exceptions.

Questions to ask before approving (the classic seven Rs, still useful)

- Who raised it, and why?
- What return or outcome does it deliver?
- What are the risks, including doing nothing?
- What resources does it need?
- Who is responsible for build, test, and implementation?
- What is it related to: CIs, other changes, the freeze calendar?
- Is there a tested back-out plan?

Good change records also serve as evidence for NIST SP 800-53 controls CM-3 (change control) and CM-4 (impact analysis).

## Knowledge, CMDB and assets

*Three records, three different questions. Keep them linked, and don't let one stand in for another.*

| Record | Question it answers | Fields that matter |
|---|---|---|
| Configuration item (CMDB) | What breaks if this breaks, and who owns it? | Class, owner, environment, lifecycle status, relationships |
| Asset (ITAM) | What do we own, where is it, what does it cost, is it licensed? | Tag, assignee, location, contract, cost, warranty, entitlement |
| Knowledge article | How do I fix or do this? | Symptom, cause, resolution, service or CI, review date |

### CMDB rules that hold up

- Start from services, then map the CIs each one depends on. A CMDB built bottom-up from discovery alone is a parts list, not a map.
- Relationships are the point. Without them you can't do impact analysis on a change or a P1.
- Automate discovery and reconcile against it.
- Every CI needs an accountable owner. Unowned data decays.

### Knowledge-Centered Service (KCS v6) in two loops

- Solve loop (every ticket): capture the user's words, structure the article, reuse it by searching early, improve it on every use. Reuse is review.
- Evolve loop (periodic): content health, process integration, performance assessment, leadership and communication.
- Tier 0 (Virtual Agent) is the next step left.

### Federal drivers

- BOD 23-01: automated asset discovery every 7 days and vulnerability enumeration every 14 days.
- MEGABYTE Act (2016): software license inventory and savings reporting.
- SAMOSA Act: would require independent software asset assessments. The House passed it (H.R. 5457) in December 2025; check Senate status before citing it as law (Washington Technology).

## Service levels and metrics

*An SLA is a promise you can prove. If every SLA is green and users are still angry, you are measuring the wrong thing (the "watermelon effect": green outside, red inside).*

| Agreement | Between | Federal equivalent at your agency |
|---|---|---|
| Service level agreement (SLA) | Provider and customer | Service targets the IT office commits to business offices |
| Operational level agreement (OLA) | Two internal teams | Handoffs between Ops, the application development team, and the CISO's team |
| Underpinning contract (UC) | Provider and supplier |  |
| Experience level agreement (XLA) | Provider and users, on outcomes and sentiment |  |

### Metrics that matter

| Metric | Tells you | Watch for |
|---|---|---|
| Time to restore (median and 90th percentile) | Real user pain from incidents | Averages hide the long tail |
| First contact resolution | Desk capability and knowledge quality | Early closures that reopen later |
| Reopen rate | Whether fixes stick | Reopens logged as new tickets |
| Repeat incidents on the same CI or cause | Whether problem management works | Inconsistent categorization hides repeats |
| Fulfilment time by catalog item | Where requests wait | One average across all items |
| Change failure rate | Change quality | Failures not linked back to the change |
| Backlog age over 30 days | Neglected work | Tickets parked in "pending user" |
| Self-service deflection | Shift-left progress | Counting bot sessions, not resolutions |
| Satisfaction or experience score | How users feel | Low response rates, survey fatigue |

### Rules of thumb

- Declare the baseline before claiming improvement. The first year of a new metric sets the baseline; it doesn't promise a number.
- Don't let one good year become next year's floor unless capacity changed too. Pair every speed metric with a quality metric (time to restore with reopen rate). People hit the target they are measured on.
- Report percentiles, not averages, for anything time-based.

## Federal overlay

*ITIL is guidance; federal requirements are law and policy. The trick is to run one process that satisfies both, so the ITSM record is also the audit evidence.*

| ITIL practice | Federal anchor | What it means in practice |
|---|---|---|
| Change enablement | NIST SP 800-53 CM-3, CM-4; CISA BOD 26-04 | Change records are control evidence; the patch path must fit 3-day remediation |
| Configuration and asset management | NIST SP 800-53 CM-8; CISA BOD 23-01; MEGABYTE Act | Inventory is a security control, not just bookkeeping |
| Incident management | NIST SP 800-61 Rev. 3 (2025); FISMA major-incident rules | The desk is the first sensor; security-relevant incidents route to the CISO's team fast |
| Information security management | FISMA, NIST RMF (SP 800-37) | ITIL sits beside the RMF; it doesn't replace it |
| Service continuity | Federal continuity policy; NIST SP 800-34 | IT recovery plans support the agency continuity plan |
| Supplier and service level management |  | Contracts state outcomes and measurable standards, not methods |
| Service financial management | OMB A-11 Section 55; TBM |  |
| Measurement and reporting | Agency performance plans |  |

### Where each practice lives in the ITSM platform

| ITIL practice | the ITSM platform capability |
|---|---|
| Incident, major incident | Incident Management, Major Incident Management |
| Problem | Problem Management (known error articles) |
| Change, release | Change Management (change models, CAB workbench), Release |
| Service request, catalog | Service Catalog, Request Management |
| Knowledge | Knowledge Management |
| Configuration | CMDB, Discovery, Service Mapping |
| Asset | Hardware and Software Asset Management |
| Service level | SLA definitions and Service Level Management |
| Monitoring and event | Event Management (ITOM) |
| Tier 0 self-service | Virtual Agent, Now Assist (license-dependent) |

One line to remember: people get ITIL certificates; organizations certify against ISO/IEC 20000-1. ITIL itself is never "compliance."

## Contract checklist

*The rewritten FAR Part 37 puts a firm-fixed-price, performance-based order first in its order of precedence. ITIL gives you the*

vocabulary for those outcomes.

- Cite "the current version of ITIL," not "ITIL v4." ITIL 4 exams are planned to sunset December 31, 2027.
- State outcomes (service restored, request fulfilled), never staffing levels or methods. Give every SLA a definition, data source (named the ITSM platform report), measurement period, AQL, exclusions, and remedy.
- Add restore and fulfilment targets, not only acknowledgment times.
- Pair each speed SLA with a quality measure: reopen rate, ticket quality, change failure. Put the priority matrix in an attachment the COR can update without a modification. Require a standard change catalog and an expedited path that meets BOD 26-04 timelines.
- Make problem management a deliverable: known error records and repeat-incident reduction.
- Report XLAs or experience scores for a baseline year before attaching any remedy.
- Ask for ITIL Foundation for desk staff and a Practice Manager module (MSF or PIC) for leads. Don't name an exam version.
- the ITSM platform data, knowledge articles, CMDB, runbooks, and scripts are government property and transfer in usable form.
- Knowledge articles carry an owner and review date, so they survive the people who wrote them.
- Standard change models and automation code are delivered and documented.

QASP surveillance methods: automated reporting from the ITSM platform (100% of tickets), random sampling of ticket quality, periodic CMDB audits, and user feedback. Record results monthly; they feed past-performance evaluations.

## Certification path

*Version 5 has one entry exam, three role-based designations, and one AI extension. ITIL Transformation counts toward every designation and is taken once (Global Knowledge FAQ).*

| Designation | Modules | Who it fits |
|---|---|---|
| Practice Manager | Foundation + one of MSF, PIC, or CAI + Transformation | Desk leads, process owners, contractor PMs |
| Managing Professional | Foundation + Product + Service + Experience + Transformation | Service owners, operations managers |
| Strategic Leader | Foundation + Strategy + Transformation | Directors on a Deputy CIO or CIO track |
| Master | All three designations | Practitioners who want the full set |
| AI Governance (extension) | Requires ITIL 4 or V5 Foundation; 2- day course, 40 questions in 90 minutes | Anyone governing AI in services |

Exams. Foundation is 40 multiple-choice questions in 60 minutes, closed book, 65% to pass (26 of 40) (ProcessExam). The PeopleCert bundle is listed from US$690. The practice modules and AI Governance are closed-book multiple choice; Product, Service, Experience, Strategy, and Transformation are planned as open-book.

### If you already hold ITIL 4

| You hold | To reach Version 5 |
|---|---|
| ITIL 4 Foundation | Nothing; it counts as the prerequisite |
| ITIL 4 Practice Manager | Take ITIL Transformation (V5) |
| ITIL 4 Strategic Leader | Take ITIL Transformation (V5) |
| ITIL 4 Managing Professional or Master | Take the Managing Professional Transition (V5) course and exam |
| Partway to ITIL 4 Strategic Leader | Skip Direct, Plan and Improve; take Digital and IT Strategy plus ITIL Transformation |
| You hold To reach Version 5 |  |
| ITIL v3 Foundation only Take V5 Foundation |  |

Transition routes are from Learning Tree and the Global Knowledge FAQ; confirm with PeopleCert before booking. Finish any ITIL 4 module before December 31, 2027.

Keeping it current. Certificates carry a three-year renew-by date. Renew by logging 20 CPD points a year for three years through PeopleCert Plus, earning another ITIL certificate, or retaking the exam.

## 90-day plan

*This is a proposal, not an assigned requirement. It follows one rule: baseline first, then fix the flow, then lock it into contracts and reporting.*

### Days 1–30: Baseline

- Pull 12 months of the ITSM platform data: volume, restore time (median and 90th percentile), reopen rate, first contact resolution, change success, emergency change share.
- List the 10 most frequent normal changes; mark the repeatable ones as standard-change candidates.
- Dry-run the patch path with the CISO's team against BOD 26-04's 3-day timeline.

### Days 31–60: Fix the flow

- Get five standard change models approved by the change board.
- Open problem records for the top five repeat-incident causes.
- Audit the knowledge base: owner and review date on every article, stale ones retired. Publish a P1 communications template and the priority matrix as a COR-controlled attachment.

### Days 61–90: Lock it in

- Add restore-time percentiles and reopen rate to the monthly dashboard.
- Choose a certification path and book the next module.
- Brief the CIO on one page: declared baselines and what moved.

### Watch list

| Item | Date | Why it matters |
|---|---|---|
| BOD 26-04 remediation timelines in force | December 7, 2026 | Patch path and change windows must fit 3-day remediation |
| FedRAMP vulnerability rules for cloud providers (VDR, VER) | December 7, 2026; corrective-action grace to March 7, 2027 | Your SaaS vendors, the ITSM platform included, must patch on the same clock (CSA) |
| ITIL 4 exam modules sunset (current plan) | December 31, 2027 | Finish ITIL 4 modules in progress; voucher dates still to be announced |
| ITIL V5 Practice Guide definitions | As published | Update your agency policy wording for incident, problem, change |
| FAR overhaul formal rule for Part 37 | Proposed June 2026 | Final text may adjust performance-based contracting language |
| SAMOSA Act in the Senate | Pending | Would add software asset assessments to ITAM |

### Glossary

| Term | Meaning |
|---|---|
| AQL | Acceptable quality level: the performance threshold in a contract standard |
| CAB | Change advisory board; one possible change authority, not a required one |
| Change authority | The person or group that authorizes a change, sized to its risk |
| Change enablement | ITIL 4's name for change management: getting changes through safely and fast |
| CI | Configuration item: any component managed to deliver a service |
| CMDB | Configuration management database: CIs and their relationships |
| Continual improvement | Ongoing, deliberate improvement of services and practices |
| Event | A change of state that matters to managing a service |
| FCR | First contact resolution: fixed in the first interaction |
| Four dimensions | Organizations and people; information and technology; partners and suppliers; value streams and processes |
| Incident | Unplanned interruption or drop in quality of a service |
| KCS | Knowledge-Centered Service: capture and improve knowledge inside the work |
| Known error | A problem analysed but not yet resolved, usually with a workaround |
| Major incident | An incident with high enough impact to need a separate, faster procedure |
| MSF, PIC, CAI | V5 Practice Manager modules: Monitor, Support and Fulfil; Plan, Implement and Control; Collaborate, Assure and Improve |
| MTTR | Mean time to restore service |
| OLA | Operational level agreement between internal teams |
| Practice | A set of resources for doing a type of work; ITIL has 34 |
| Priority | Impact combined with urgency; sets the order of work |
| Problem | A cause, or potential cause, of one or more incidents |
| Product and service lifecycle | V5's eight stages: Discover, Design, Acquire, Build, Transition, Operate, Deliver, Support |
| QASP | Quality assurance surveillance plan: how the government checks contractor performance |
| Service | A way to deliver outcomes customers want without them managing the specific costs and risks |
| Service request | A standard, pre-agreed request from a user |
| Shift-left | Moving work to a lower, cheaper tier or to self- service |
| SIAM | Service integration and management: coordinating multiple suppliers as one service |
| SLA | Service level agreement between provider and customer |
| Standard change | Low-risk, pre-authorized change done by a documented procedure |
| SVS | Service value system: principles, governance, value chain, practices, continual improvement |
| Tier 0 | Self-service before a human touches the ticket (portal, knowledge, virtual agent) |
| UC | Underpinning contract with a supplier |
| Value stream | The steps that turn a specific demand into value |
| Workaround | A way to reduce or remove impact until the cause is fixed |
| XLA | Experience level agreement: targets for user outcomes and sentiment |

## Sources

*ITIL version and certification*

- ITIL Foundation (Version 5), what's new? — PeopleCert ITIL architects ITIL (Version 5): What's known — ITSM.tools What is ITIL Version 5 — New Horizons (release date)
- ITIL (Version 5) certification FAQ — Global Knowledge ITIL (Version 5) has arrived — Learning Tree (transition paths)
- Where is ITIL heading? — ProcessExam (sunset plan, exam format)
- ITIL AI Governance (Version 5) — PeopleCert

### Federal

- FAR overhaul, Part 37 — acquisition.gov BOD 26-04 coverage — Cybersecurity Dive; Tenable FAQ CSA research note on BOD 26-04 and FedRAMP GAO-25-106488, Technology Business Management SAMOSA Act passes House — Washington Technology
