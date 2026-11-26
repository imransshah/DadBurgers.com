---
title: "ITIL: the things you need to know"
domain: operations
tags: [itil, itil-5, itsm, service-desk, incident, problem, change-enablement, cmdb, knowledge, sla, xla, devops, sre, contracts, deck]
summary: "Full ITIL deck: foundations and Version 5, the practices in depth, measuring service, frameworks (DevOps, SRE, Lean), tools and AI, contracts and leading it. Speaker notes carry the depth. Redacted text version."
status: draft
updated: 2026-11-24
handling: public
redacted: "Agency-specific names, tools, contracts, contract targets, people and plans removed under the approved redaction rules (2026-11-23)."
related: [itil-quick-reference]
---

## ITIL: The Things You Need to Know

*A WORKING REFERENCE · NOVEMBER 2026 · COMPANION TO THE AI, DATA AND CYBER DECKS*

- How service management really works, what ITIL (Version 5) changed, and where it meets federal policy, contracts and the ITSM platform. Written for the technician and the Deputy CIO in the same chair.

**63 slides · 8 sections · speaker notes carry the depth**


???

How to use this deck. Same structure as the AI, Data and Cyber decks: the slides are the scannable layer, one idea each; the speaker notes are the understanding layer, with the mechanics, the reasoning, the federal hooks, and the questions you should be ready for. Read the notes once end to end and you can explain any slide without reading it. Two hats on purpose. Where they differ, the notes say so. Structure. Currency. ITIL (Version 5) launched on February 12, 2026. PeopleCert's current plan is to retire ITIL 4 exam modules on December 31, 2027. Facts were checked as of November 23, 2026. The fast-moving items are the Version 5 practice guides, the ITIL 4 retirement details, BOD 26-04 (in force December 7, 2026), and the FAR overhaul's formal rule for Part 37. Re-check sections 01, 05 and 07 every six months. Terminology. As the Cyber deck noted, EO 14434 directs "Super Intelligence" and "SI" in place of "AI" in official, non-statutory documents. This is a personal learning deck, so it keeps "AI." Anything you lift into an official your agency product should follow the order. Where it overlaps the other decks. Security incident handling, RMF and BOD 26-04 are covered in depth in the Cyber deck; data quality, records and stewardship in the Data deck; how AI agents work in the AI deck. This deck links rather than repeats. The cover art is the Version 5 lifecycle as a rising scale: eight stages from Discover to Support, each building on the last. The amber line underneath runs back from the end to the start. That's continual improvement: what you learn in Support feeds the next Discover. Think of it as a chord progression that resolves and then loops back to the top, a little better each pass.

---

## Five ideas that carry most of the weight

*START HERE*

- 1. ITIL is a menu, not a mandate. Adopt what fixes your real pain, at your size.
- 2. Value is co-created. Measure what users feel, not how many tickets moved.
- 3. Flow beats gates. Route change by risk; most changes should be standard.
- 4. Data is the backbone. A wrong CMDB makes every other practice wrong.
- 5. Fix causes, not symptoms. Problem management removes the repeat work.

**Start here**


???

If you remember nothing else, remember these five. Every later section is one of them in more detail. 1. A menu, not a mandate. ITIL is guidance, not a standard you comply with. Nobody "implements ITIL" end to end, and anyone who tells you they did either has a very small shop or a very big binder. The framework itself says adopt and adapt. Value is co-created. ITIL 4 moved the definition of value away from "IT delivers, users receive" to "value happens when the user gets an outcome they care about, with IT's help." The practical consequence: your best metrics are the ones a user would recognize (how long was I down, how long did my laptop take, did the fix stick), not the ones only IT understands (tickets closed, SLA met). 3. Flow beats gates. Old-school change management treated every change as dangerous. Modern practice routes changes by risk: the boring, repeatable ones are pre-authorized as standard changes and go fast; the risky few get a board's attention. BOD 26-04's three-day remediation window makes this a compliance issue, not just an efficiency one. 4. Data is the backbone. Incident routing, change impact analysis, asset audits, and knowledge reuse all run on records. If the CMDB says a server has no dependencies when it actually hosts three services, your change risk assessment is fiction. This is where the Data deck and this deck meet. 5. Fix causes, not symptoms. Incident management is a firefighter; problem management is the fire marshal. A desk that only restores service will restore the same service every Tuesday forever. Problem management is how repeat work disappears, and continual improvement is how you keep doing that on purpose. Music analogy for the whole deck: ITIL is music theory, not a score. Theory tells you why a progression works and what tends to sound good. It doesn't tell you what song to play. The band that knows theory improvises better; the band that thinks theory is the song plays scales at the gig.

---

## Foundations

*01 / 08 · 01 · Foundations*

- What ITIL is and isn’t, how it defines value, and the model every practice hangs from, including what Version 5 changed.
- What ITIL is · Value · The service value system · Seven principles · Four dimensions · The lifecycle ·
- What Version 5 changed

???

This section is the vocabulary layer. Most of it will feel familiar to a 2210 who has worked a service desk, run infrastructure, and sat through ITIL Foundation at some point in the last fifteen years. The reason to go through it carefully anyway: the words changed between v3, ITIL 4 and Version 5, and contractors, auditors and vendors use them in specific ways. Seven slides. What ITIL is and where it came from, ending with who owns it now. How ITIL defines value, outcomes, utility and warranty, and why that definition matters for metrics. The service value system as a single picture. The seven guiding principles with your agency examples. The four dimensions as a checklist. The ITIL 4 value chain against the Version 5 lifecycle. And a one-slide summary of what Version 5 kept and changed. If you're short on time, read the value slide notes and the Version 5 slide notes. The first sets up section 03 on metrics. The second sets up section 07 on certification. Music frame for the section: this is the theory chapter. Scales, intervals, keys. Nobody pays to hear scales, but every good arrangement is built from them, and when something sounds wrong, theory is how you find out why.

---

## What ITIL is, and what it isn’t

*01 · Foundations*

- 1989
- UK government’s CCTA publishes the first books
- 2000–01 v2: service support and service delivery
- Guidance and a shared vocabulary
- 2007 v3: the five-book service lifecycle
- A body of practice to adopt and adapt
- 2011 v3 refresh, the “2011 edition”
- 2014
- AXELOS joint venture takes ownership
- 2019
- ITIL 4: value system, 34 practices
- 2021
- PeopleCert acquires AXELOS

**Feb 2026**

- ITIL (Version 5): product and service

**It is**

- A certification scheme for people

**It isn’t**

- A standard you comply with
- A process you install from a box
- Something an organization is certified in
- Organizations certify against ISO/IEC 20000-1. People certify in ITIL.

???

ITIL started as UK government guidance. In the late 1980s the Central Computer and Telecommunications Agency (CCTA) wrote down how well-run government IT shops actually worked, and published it as a library of books from 1989. That's the "L" in the name: it was literally a library, more than thirty volumes in v1. v2 (2000 to 2001) collapsed the library into two famous books, Service Support (the service desk, incident, problem, change, release, configuration) and Service Delivery (service level, availability, capacity, continuity, financial). If you learned ITIL early in your career, this is probably the model in your head: process silos with handoffs. v3 (2007, refreshed in 2011) reorganized everything around a five-stage service lifecycle: strategy, design, transition, operation, continual service improvement. Twenty-six processes and four functions. It was thorough and heavy, and it's where a lot of the "ITIL means bureaucracy" reputation comes from. Ownership moved from the UK government to AXELOS, a joint venture between the Cabinet Office and Capita, in 2014. PeopleCert, the exam body, bought AXELOS in 2021 and now owns ITIL outright. ITIL 4 (2019) was the big conceptual shift: from processes to "practices," from a lifecycle to a value system, and from IT-delivers-to-the-business to value co-creation. It also absorbed ideas from Agile, Lean and DevOps. ITIL (Version 5) launched February 12, 2026, after an early-access phase in January. PeopleCert calls it an evolution, not a reset. Its headline changes: products and services treated together, an eight-stage lifecycle, AI-native design, and a new AI Governance module. Note the parentheses in the official name; PeopleCert initially discouraged "ITIL v5," and everyone says it anyway. The "isn't" column matters in federal contracting. It can't meaningfully require a contractor to "be ITIL compliant," because there's nothing to comply with. If you want an auditable management-system standard, that's ISO/IEC 20000-1, which is certifiable and maps closely to ITIL practices. Most federal agencies don't require it, and your agency doesn't need to. Music analogy: ITIL is like a method book series, Berklee's or Suzuki's. Each edition reflects how musicians actually play at the time. You can be a great player without finishing the series, and nobody certifies a band in "Berklee." They certify the players.

---

## Value: the outcome a user gets, net of cost and risk

*01 · Foundations*

- A service enables outcomes customers want, without them having to manage the specific costs and risks.

**Output vs outcome**

**Utility**

**Warranty**

- Laptop delivered ≠ new hire working
- Fit for purpose
- Fit for use
- Does it do what’s needed? Features, functions, the right access.
- Is it available, secure, fast enough, and recoverable when it matters?

**Sponsor**

**Customer**

**User**

- Pays: the office that funds it
- Defines what’s needed
- Uses it every day
- Outputs are what IT ships. Outcomes are what the user can now do.

???

The definition on the band is a paraphrase of ITIL 4's definition of a service: a means of enabling value co-creation by facilitating outcomes customers want to achieve, without the customer having to manage specific costs and risks. Read the last clause twice. The user doesn't want a mail server. They want mail to work, without owning patching, backups, licensing and spam filtering. The value of the service is partly what it lets them do and partly what it lets them not worry about. Outputs versus outcomes. This is the single most useful distinction for metrics. "Laptop delivered on day one" is an output. "New hire productive by day two" is an outcome: it also depends on accounts, licenses, training, and a working VPN. A service desk can hit every output SLA while the outcome fails, which is how users end up angry at an IT shop with green dashboards. Section 03 picks this up. Utility and warranty. Utility is "fit for purpose": does the thing do what's needed? Warranty is "fit for use": is it available when needed, with enough capacity, secure, and continuous through a disaster? A system with great utility and poor warranty is a brilliant app that's down every Monday. A system with great warranty and poor utility is a rock-solid app nobody can use for their actual job. You need both, and they usually have different owners: utility is often the application development team and the business office, warranty is often Operations and the CISO. Three roles that people blur. The sponsor pays (authorizes budget). The customer defines requirements and accepts the outcome. The user uses it. at your agency these can be three different people: a vice president who funds a capability, an office director who decides what it must do, and analysts who use it daily. Requirements gathered only from the sponsor tend to miss what users need; satisfaction surveys sent only to users miss whether the customer got the outcome they paid for. Costs and risks cut both ways. A service removes some costs and risks from the user (they don't maintain servers) and can impose others (license fees, a new dependency, data residing in a vendor's cloud). ITIL calls these "costs and risks imposed." It's a good prompt in an acquisition: what new risk does this service introduce, and who carries it? Music analogy: the audience doesn't buy a PA system; they buy hearing the band clearly. Utility is the PA being loud enough for the room. Warranty is it not cutting out during the bridge. The sponsor is the venue, the customer is the band, and the users are the crowd.

---

## The service value system: one engine, five parts

*01 · Foundations*


???

This is the one picture to be able to draw on a whiteboard from memory. Everything else in ITIL hangs off it. Read it left to right. Opportunity (something the organization could do better) and demand (something someone needs) enter the system. The system turns them into value. Inside the box are five components. Guiding principles: the seven rules of thumb on the next slide. They apply to every decision at every level, from how the CIO sets strategy to how a Tier I tech writes a work note. Governance: how the organization is directed and controlled. For your agency, that's the CIO, the IT governance boards, the change board and change board for changes, investment review, and the policies that come from OMB, CISA and the agency. ITIL doesn't replace governance; it says governance must be part of the system, not bolted on. The value chain, which Version 5 recasts as the product and service lifecycle (highlighted). Eight stages: Discover, Design, Acquire, Build, Transition, Operate, Deliver, Support. Two slides from now compares this to the ITIL 4 value chain. The key idea in both: work flows through stages, and a "value stream" is a specific path through them for a specific kind of demand, such as onboarding a new hire or fulfilling a software request. Practices: the 34 sets of organizational resources for doing a type of work. Incident management, change enablement and the others. Practices are the know-how; the lifecycle is where it gets applied. One practice contributes to many stages: knowledge management helps Design, Support and Operate alike. Continual improvement: the component that keeps all the others honest. It's both a practice and a part of the system, which is ITIL's way of saying it isn't optional. The four dimensions underneath apply to every part. Any change to any component has a people side, an information and technology side, a partner and supplier side, and a value stream and process side. Miss one and the change fails in a predictable way. Why this matters at the desk. When someone proposes "let's buy a tool to fix onboarding," the picture tells you what else to ask. Does it fit governance? Which practices change? Who are the partners? What does the value stream look like end to end? A tool alone touches one dimension. Music analogy: it's a band. Demand is the setlist request. Principles are the band's shared musical taste. Governance is the bandleader. The lifecycle is the arrangement, from writing to rehearsal to the gig. Practices are each player's chops. Continual improvement is listening back to the recording after every show. And the four dimensions are the people, the gear, the venue and promoter, and the run-of-show.

---

## Seven guiding principles, unchanged in Version 5

*01 · Foundations*

- Principle
- What it means
- At your agency’s desk
- Focus on value
- Trace every activity to a user or mission outcome
- Ask who benefits before building a catalog item
- Start where you are
- Measure and reuse before replacing
- Pull the ITSM platform baseline before any redesign
- Progress iteratively with feedback
- Small, reversible steps with checkpoints
- Pilot Virtual Agent on one request type
- Collaborate and promote visibility
- Shared data, no hidden queues
- One P1 bridge, one update cadence
- Think and work holistically
- A change to one part touches the rest
- Onboarding spans the HR office, ICAM, assets, training
- Keep it simple and practical
- Fewest steps that still control the risk
- Cut approval steps nobody reads
- Optimize and automate
- Fix the flow first, then automate it
- Clean up offboarding before scripting it

???

The seven principles are the part of ITIL 4 that travels best, and Version 5 keeps them. They're short enough to quote in a meeting and concrete enough to settle arguments. Focus on value. Everything should map, directly or indirectly, to value for someone. The useful question is "who is the consumer of this, and what do they get?" A the ITSM platform catalog item nobody requests, a report nobody reads, and an approval step nobody acts on all fail this test. Start where you are. Before replacing something, look at what exists and what works. This is also where your anti-ratchet discipline lives: measure the current state honestly, declare the baseline, and only then claim improvement. Rebuilding a working process from scratch because it's "not ITIL" is the classic violation. Progress iteratively with feedback. Break work into small pieces that each deliver something and teach you something. The Virtual Agent pilot is a good example: one or two request types, watch real usage, then expand. Collaborate and promote visibility. Work, queues, decisions and data should be visible to the people who need them. Hidden queues are where SLAs go to die: a ticket sitting in a team's inbox outside the ITSM platform is invisible to everyone measuring flow. During a P1, one bridge and one cadence of updates is this principle in action. Think and work holistically. No service is an island. Onboarding is the your agency example: it touches the HR office's data, identity and access, asset assignment, licensing, training, and the user's office. Fixing only the IT steps leaves the new hire waiting on something else. Keep it simple and practical. If a step doesn't contribute value, remove it. A good test: if the approver always approves, the approval is ceremony. Replace it with a standard change model or a notification. Optimize and automate. In that order. Automating a bad process makes bad outcomes faster and harder to change. Map the flow, cut the waste, standardize, then automate. ITIL 4 also warns against automating so much that humans lose the ability to intervene, which matters more with AI agents in the mix. How they interact. The principles pull against each other on purpose. "Keep it simple" can fight "think holistically." "Start where you are" can fight "optimize." The skill is knowing which one wins in a given situation, and saying so out loud. Music analogy: these are the rules a good session player lives by. Serve the song. Learn the chart before rewriting it. Rehearse in sections. Listen to the rest of the band. Know where your part sits in the whole mix. Don't overplay. And only loop a part once it's right.

---

## Four dimensions: check all four before calling it done

*01 · Foundations*

**Organizations and people**

**Information and technology**

- Who owns it, and are they ready?
- What data and tools does it need?
- Roles, skills, staffing, culture, decision rights
- Platforms, data quality, security, automation, AI

**Partners and suppliers**

**Value streams and processes**

- Which contract covers it?
- Where does the work wait?
- Vendors, integrators, SaaS providers, other agencies
- Steps, handoffs, queues, controls, flow
- Outside forces press on all four: political, economic, social, technological, legal, environmental. In Version 5 the dimensions cover products as well as services.

???

The four dimensions are a completeness check. Any change to a service, a practice or the whole system has to work in all four, and failures are usually traceable to the one somebody skipped. Organizations and people. Structure, roles, skills, staffing levels, culture, and who's allowed to decide what. A new process with no named owner fails here. So does a the ITSM platform redesign that nobody trained the contractor's Tier I staff on. Decision rights matter more than org charts: in an office with four co-equal directors, "who decides the CMDB data model?" is a people-dimension question with real consequences. Information and technology. The data the service needs and produces, the tools that run it, and how they're secured and integrated. the ITSM platform, the cloud directory, endpoint management, Azure, M365, the knowledge base, and now AI capabilities like Now Assist. This dimension includes data quality, which is why a wrong CMDB undermines everything. Partners and suppliers. Every organization relies on others. The questions: which contract covers this, what does it require, how is it measured, and who integrates across suppliers? Section 04 covers SIAM, the discipline for multi-supplier integration. Value streams and processes. How work actually flows: the steps, the handoffs, the queues, the controls. A value stream is the end-to-end path for one kind of demand. A process is a set of steps inside it. This is where waste lives, mostly as waiting. The outside forces are PESTLE: political, economic, social, technological, legal and environmental factors. In federal IT, the P and the L are loud. A new executive order, an OMB memo, a CISA directive or a FAR rewrite can change any of the four dimensions overnight. BOD 26-04 is a live example: it's an external legal force that changes the value stream for patching, the technology for vulnerability prioritization, the supplier obligations of cloud providers, and the skills needed to triage with SSVC. A practical use. It takes two minutes and catches most of the "we forgot that" failures. Version 5 note: the dimensions are now framed for products as well as services, matching the new focus on digital product and service management. In practice the questions don't change. Music analogy: putting on a show. People: the band, the crew, who calls the set. Information and technology: the instruments, the mixing desk, the setlist file. Partners: the venue, the promoter, the backline rental company. Value stream: load-in, soundcheck, doors, set, load-out. A great band with no PA still has a bad night.

---

## From value chain to lifecycle

*01 · Foundations*

**Itil 4 · service value chain · six activities**

- Plan
- Improve
- Engage
- Design and transition
- Obtain / build
- Deliver and support

**Version 5 · product and service lifecycle · eight stages**

- 1. 2
- 3. 4
- 5. 6
- 7. 8
- Discover
- Design
- Acquire
- Build
- Transition
- Operate
- Deliver
- Support
- What moved: design and transition are separate stages; acquiring is distinct from building; operating, delivering and supporting are named apart. Products and services share one lifecycle.

???

ITIL 4's service value chain had six activities: plan, improve, engage, design and transition, obtain/build, and deliver and support. They weren't sequential steps; they were building blocks you combined into value streams. PeopleCert's own architects have said learners found some of those activities confusing, and "obtain/build" and "design and transition" in particular bundled very different work. Version 5 replaces the value chain's activities with an eight-stage product and service lifecycle: Discover, Design, Acquire, Build, Transition, Operate, Deliver, Support. PeopleCert describes the value chain as simplified and easier to relate to, and calls the lifecycle model the serious shift in Version 5. It treats products and services as two sides of one digitally enabled solution rather than separate things, which is meant to bring product teams (often the application development team, with a product owner and a backlog) and service teams (often Operations, with a catalog and SLAs) onto one map. What each stage means in your agency terms, as a working interpretation rather than official definitions: Discover: understand the need and the opportunity. Intake, business analysis, PRISM-style acquisition intake questions. Design: decide what the product or service will be and how it will work, including the experience and the controls. Acquire: get what you'll buy, whether licenses, SaaS, hardware or contractor services. In federal terms, this is acquisition planning through award. Having it as a named stage is a gift to anyone who has watched an IT project stall in procurement. Build: make or configure what you won't buy. the ITSM platform configuration, application development, infrastructure as code. Transition: move it into live use safely. Change enablement, release and deployment, testing, training, knowledge transfer. Operate: run the technology. Monitoring, patching, capacity, backups. Deliver: provide the service to users. Catalog, request fulfilment, access. Support: help users when something goes wrong or they need help. Service desk, incident, problem, knowledge. Splitting Operate, Deliver and Support is useful in contracts. Caution: the full Version 5 definitions of each stage live in the Foundation book and practice guides. Use the stage names freely; check the official wording before writing them into policy. Music analogy: the old value chain was like describing a recording session as "compose, arrange-and-record, mix-and-release." Version 5 splits it the way a producer would: write, arrange, book the studio and players, track, mix and master, release, play it live, and handle the fan mail.

---

## What Version 5 changed, and what it kept

*01 · Foundations*

**Kept from itil 4**

**New in version 5**

- The seven guiding principles
- Eight-stage product and service lifecycle
- Service value system, governance included
- Two overriding principles: AI-native and complexity-native
- 34 practices, names unchanged
- Service journey model now at Foundation level
- Four dimensions, now for products too
- Refreshed terms for incident, problem, change
- Continual improvement, with a refined model
- AI Governance book and extension module
- Feb 12, 2026
- Dec 31, 2027
- 34. Version 5 officially released
- Planned sunset of ITIL 4 exam modules
- Practices; full guidance in the Practice Guides

???

The short version: Version 5 is closer to "ITIL 4.1" than to the v3-to-4 jump. One commentator said exactly that. If you know ITIL 4, you know most of Version 5. What carried over. The seven guiding principles, word for word. The service value system, including governance and continual improvement. The value chain concept, simplified. The 34 practices, whose names reportedly haven't changed. The four dimensions, reframed to cover products as well as services. Continual improvement gets a refined model; the ITIL 4 seven-step model (what is the vision, where are we now, where do we want to be, how do we get there, take action, did we get there, how do we keep momentum) is still the reasonable mental model until you've read the new one. What's new. The product and service lifecycle from the previous slide. Two overriding design principles. AI-native means the guidance was written assuming AI is part of how work gets done and governed, not a bolt-on. Complexity-native means it explicitly supports experimentation under uncertainty, not just executing a plan; PeopleCert frames this with VUCA (volatility, uncertainty, complexity, ambiguity). The service journey model, which used to live in the ITIL 4 Drive Stakeholder Value module, now appears in Foundation, so everyone learns to think about the user's end-to-end journey from day one. New terminology and definitions for several practices, including incident, problem and change, with full guidance in the Practice Guides. And a new seven-book portfolio: Foundation, Product, Service, Experience, Strategy, Transformation, and AI Governance. Practice guides moved. Version 5 Foundation teaches key terms for the practices but leaves full guidance to separate Practice Guides. All 34 are available through PeopleCert Plus membership; the 15 practices in the three Practice Manager modules also come as course materials. Dates. PeopleCert released Version 5 on February 12, 2026, after a partner and early-access phase starting in January. ITIL 4 and Version 5 run in parallel. PeopleCert's FAQ states a current plan to sunset all ITIL 4 modules on December 31, 2027, with voucher validity dates still to be announced. Certificates you already hold don't expire on that date; they follow the normal three-year renewal cycle. What it means for your agency. Very little operationally in the short term: your processes don't break because the book changed. Three practical moves. First, update contract language from "ITIL v4" to "the current version of ITIL" at the next opportunity. Second, when the Version 5 Practice Guide definitions for incident, problem and change are in hand, check your agency’s the ITSM platform and policy definitions against them. Third, if you're mid-way through ITIL 4 certifications, finish them before the end of 2027 or move to the Version 5 path (section 07). Music analogy: it's a remaster with a few new tracks, not a new album. The songs you know are still there, a little cleaner, and the liner notes now talk about the producer's new gear (AI) and how to work without a fixed setlist (complexity).

---

## The practices

*02 / 08 · 02 · The Practices*

- The 34-practice map, then the operations core in depth: the work your desk, your contractor and your COR file run on every day.
- The practice map · Service desk · Incident · Major incident · Problem · Requests · Change · Change models · Release and deployment · Configuration and assets · Knowledge · Service levels · Resilience ·
- Security · Suppliers · Improvement

???

This is the longest section because it's your day job. Sixteen slides: the map of all 34 practices, then the fifteen that make up the Version 5 Practice Manager modules plus knowledge management, each with the technician view and the leadership view. How to read a practice slide. Each one answers four questions. What is the practice for? How does the work actually flow? And what would you change? A note on "practice" versus "process." ITIL 4 deliberately stopped calling these processes. A practice is a set of organizational resources for performing work: people and skills, information and tools, partners, and processes. Incident management isn't just the incident process; it's also the people who do it, the ITSM platform configuration, the knowledge base, and the contractor who staffs it. That's why the four dimensions apply to every practice. The three groups. ITIL 4 grouped practices as general management (14, borrowed from business management: strategy, risk, finance and so on), service management (17, the core ITSM work), and technical management (3, adapted from technology management). Version 5 keeps the 34 practice names; the full guidance lives in separate Practice Guides. The operations core. Version 5's Practice Manager designation bundles fifteen practices into three modules. Monitor, Support and Fulfil: service desk, incident, problem, service request, and monitoring and event. Plan, Implement and Control: change enablement, deployment, release, service configuration, and IT asset management. Collaborate, Assure and Improve: relationship, supplier, service level, continual improvement, and information security. Music frame: if section 01 was theory, this is the instrument section of the method book. Each practice is an instrument with its own technique. The band sounds good when each player knows their part and listens to the others.

---

## All 34 practices; the operations core in bold

*02 · The Practices*

- General · 14
- Service · 17 (1 of 2)
- Service · 17 (2 of 2)
- Technical · 3
- Architecture management
- Availability management
- Service catalogue
- Deployment management
- Continual improvement
- Business analysis
- Service configuration
- Infrastructure and platform
- Information security
- Capacity and performance
- Service continuity
- Software development
- Knowledge management
- Change enablement
- Service design
- Measurement and reporting
- Incident management
- Service desk
- Organizational change
- IT asset management
- Service level management
- Portfolio management
- Monitoring and event
- Service request management
- Project management
- Problem management
- Service validation and testing
- Relationship management
- Release management
- Bold = the 15 in the V5
- Practice Manager modules:

**Msf, pic, cai**

- Risk management
- Service financial management
- Strategy management
- Supplier management
- Workforce and talent

???

Thirty-four practices sounds like a lot, and PeopleCert itself acknowledged the number overwhelmed learners. The trick is to know they exist, know roughly what each is for, and go deep on the dozen or so you run. The groups are ITIL 4's. General management practices are borrowed from business management and apply across the organization: architecture, continual improvement, information security, knowledge, measurement and reporting, organizational change, portfolio, project, relationship, risk, service financial management, strategy, supplier, and workforce and talent. Service management practices are the ITSM core: availability, business analysis, capacity and performance, change enablement, incident, IT asset management, monitoring and event, problem, release, service catalogue, service configuration, service continuity, service design, service desk, service level, service request, and service validation and testing. Technical management practices are adapted from technology management: deployment, infrastructure and platform, and software development and management. The bold fifteen are the Version 5 Practice Manager modules, which is a good working definition of the operations core. Monitor, Support and Fulfil (MSF) is the "keep users working" set: service desk, incident, problem, service request, monitoring and event. Plan, Implement and Control (PIC) is the "change things safely" set: change enablement, deployment, release, service configuration, IT asset management. Collaborate, Assure and Improve (CAI) is the "manage the relationships and keep getting better" set: relationship, supplier, service level, continual improvement, information security. Who owns which at your agency, roughly. Information security management is the CISO's practice; Operations runs many of its controls. Strategy, portfolio, architecture and financial management sit with the CIO and governance. Knowledge management isn't in a Practice Manager module, but it's central to the desk, so this section covers it. A useful exercise. Put the 34 names in a spreadsheet with three columns: practice owner, current maturity (a 1 to 5 gut score is fine), and pain level. The intersection of low maturity and high pain is your improvement list. It takes an hour and it's a strong conversation starter with the CIO. Music analogy: an orchestra has dozens of instruments. A conductor doesn't play them all, but knows what each one does, which ones carry this piece, and which ones are out of tune.

---

## Service desk: the front door, not a call center

*02 · The Practices*

- Tier 0
- Self-service: portal, knowledge, Virtual Agent
- Tier I
- Triage, scripted fixes, owns the ticket to closure
- Tier II
- Specialists: deskside, M365, identity, devices
- Tier III
- Engineering, infrastructure, network, vendors
- 7 a.m. to 6 p.m. ET, weekdays
- After-hours on-call for P1
- Weekly ticket quality sampling
- Intake: phone · email-to-ticket · portal · walk-up · Teams chat. Every contact becomes a the ITSM platform record.

???

The service desk is the single point of contact between the service provider and its users. ITIL 4 is pointed about this: it's not a call center that logs and forwards. It should understand the user's situation, resolve what it can, own the ticket end to end, and be the user's advocate with the rest of IT. Tiers. Tier 0 is self-service before a human touches anything: the portal, the catalog, knowledge articles, and a virtual agent. Tier II brings specialist skills: deskside hardware, M365, identity and MFA, mobile devices. Tier III is engineering, infrastructure, network, and vendor escalation. Intake channels. That rule is what makes every metric in section 03 possible. Coverage from 7 a.m. to 6 p.m. Eastern, Monday through Friday, excluding federal holidays, with an afterhours on-call process for P1s and a published rotation. Acknowledgment targets by priority (next slide). Weekly ticket quality sampling by the Service Desk Lead. No closures without user confirmation, unless three documented contact attempts fail. Shift-left. Tier 0 is the next step: the ITSM platform Virtual Agent in Teams, which section 06 covers. Shift-left is the main lever on cost and speed, because work resolved lower is cheaper and faster. What good looks like. The desk measures itself on restore time and first contact resolution, not call answer speed. Agents can see the user's devices, recent tickets and recent changes on one screen. Knowledge is searched before anything else. Repeat contacts trigger a problem record. Leadership watch-outs. Desks get judged by abandonment rate and answer time because those are easy. They're the least useful measures. A desk that answers in ten seconds and transfers everything is worse than one that answers in a minute and fixes it. Music analogy: the front-of-house engineer. The audience never sees them, but if the mix is bad, nothing else matters. A good one fixes problems before the band notices.

---

## Incident management: restore first, diagnose later

*02 · The Practices*

- 1 · Log every contact, with the user’s words
- 2 · Categorize against the service and CI
- 3 · Prioritize by impact × urgency
- 4 · Diagnose: knowledge first, recent changes second
- Impact
- High urgency
- Medium
- Low
- High

**P1**

**P2**

**P3**

- Medium

**P2**

**P3**

**P4**

- Low

**P3**

**P4**

**P4**

- Your agency ACKNOWLEDGE TARGETS
- 5 · Escalate by skill or by authority
- Common pattern shown; your agency uses its own approved matrix.
- 6 · Restore, with a workaround if needed
- 7 · Close with user confirmation

???

Incident management exists to minimize the negative impact of incidents by restoring normal service as quickly as possible. The key word is restoring. Diagnosis of the underlying cause belongs to problem management. A tech who spends two hours on root cause while the user can't work has the priorities backwards. Use the workaround, restore service, then open a problem record if the cause matters. The flow. Log: every contact becomes a record, ideally with the user's own words in the description, because that's what future users will search for. Categorize: map to the service and, where applicable, the configuration item. Prioritize: impact times urgency. Diagnose: search knowledge first, then check recent changes on the affected CI. Most outages follow a change, and the answer to "what changed?" is frequently the answer. Escalate: functionally, to someone with more skill, or hierarchically, to someone with more authority. Restore: a workaround counts. Close: confirm with the user that they're working again. Priority. Impact is how much damage: how many users, how much mission. Urgency is how fast it gets worse. The matrix on the slide is a common three by three pattern mapped to four priorities. Priority gets reviewed as information arrives, and P1 and P2 assignments require written justification on the ticket. Notice what's missing: restore targets. Technician tip: the single best predictor of fast restoration is a good knowledge article linked to the right CI. The second best is a CMDB accurate enough to show what changed recently. Leadership tip: watch for priority inflation (everything's a P2 because P2s get attention) and deflation (P1s downgraded to protect SLA numbers). Sampling P1 and P2 justifications monthly keeps both honest. Music analogy: a string breaks mid-song. Incident management is grabbing the backup guitar and finishing the song. Problem management is figuring out later why strings keep breaking on that guitar.

---

## Major incident: a separate procedure, not just a higher number

*02 · The Practices*

**Roles, named up front**

**First 30 minutes**

**After restore**

- Incident manager runs it
- Declare it; open one bridge
- Open a problem record
- Communications lead speaks
- First sit rep: what, who, next update
- Blameless review within days
- Technical lead fixes
- Check recent changes on affected CIs
- Actions with owners and dates
- Scribe logs every action
- Pull vendors in early
- Update knowledge and runbooks
- 30 min
- 1 day
- To reconcile work done without tickets during a major incident

**Watch the word**

- An ITIL “major incident” and a FISMA
- “major incident” are different things.
- Section 05.

???

A major incident is one with enough impact that the organization needs a separate, faster procedure. Not just "a P1 with more people on it." The difference is structure: named roles, one bridge, one voice, a fixed update rhythm, and a disciplined record. Roles. The incident manager runs the response and makes calls; they don't fix anything themselves. The communications lead handles all outbound updates to leadership and users, so the technical people aren't interrupted. The technical lead coordinates the fix. A scribe keeps a timestamped log of every action and decision. In a small shop one person may wear two hats, but never the incident manager and technical lead at once; the person with their hands in the console can't also see the whole picture. First thirty minutes. Someone with authority declares it. Open one bridge. Send a first situation report: what's down, who's affected, what we know, when the next update comes. Check recent changes on the affected CIs, because most major incidents follow a change. Pull in vendors early; Microsoft, the SSE platform or the ITSM platform support queues take time, and a ticket opened in minute five beats one opened in hour two. After restore. Open a problem record so the cause gets investigated. Run a blameless review: focus on what in the system allowed this, not who pushed the button. Capture actions with owners and dates, and track them to closure. Update knowledge and runbooks so the next responder is faster. P1 status updates at least every 30 minutes until restoration, P2 every two business hours. Work done during a major incident without tickets must be reconciled within one business day. The contractor also documents root indicators and resolution actions before incident closure. The word trap. ITIL's "major incident" is about service impact. FISMA's "major incident," defined by OMB, is a security term with specific reporting obligations to OMB, CISA and Congress. A full email outage is an ITIL major incident and almost certainly not a FISMA one. A quiet exfiltration of sensitive data may be a FISMA major incident while users notice nothing. Section 05 covers how to keep the two straight, and the Cyber deck covers the security side in depth. Practical tip: write the first sit rep template now, before you need it. Three lines: impact, current status, next update time. During a real P1 nobody writes well. Music analogy: the power cuts mid-set. One person (the stage manager) runs it, one person talks to the crowd, the crew fixes the power, and someone notes what happened for the post-show debrief. Everyone shouting at once is how a ten-minute fix becomes a cancelled show.

---

## Problem management: remove the cause, not just the symptom

*02 · The Practices*

**Phase 1**

- Problem identification

**Phase 2**

- Problem control

**Phase 3**

- Error control
- Spot repeats and trends; take in major incidents and vendor advisories
- Analyse the cause; publish a workaround as a known error Fix it through a change, or accept and document the risk

**Techniques**

**Measures**

- Five whys
- Repeat incidents on the same cause
- Ishikawa (fishbone)
- Time to workaround
- Timeline reconstruction
- Known errors published
- Kepner-Tregoe for complex faults
- Problems closed by a change
- Your agency GAP

???

A problem is a cause, or potential cause, of one or more incidents. A known error is a problem that has been analysed but not resolved, usually with a documented workaround. Problem management reduces the likelihood and impact of incidents by finding causes and managing workarounds and known errors. ITIL 4 describes three phases. Problem identification: noticing that something deserves investigation. Sources include repeat incidents (the same category on the same CI five times this month), trend analysis, major incidents, and information from vendors and suppliers, such as a Microsoft advisory about a known issue. Problem control: analysing the problem, finding the cause, and documenting workarounds. When a workaround exists, publish it as a known error so the desk can use it immediately. Error control: deciding what to do about the known error. Usually that's a change to fix it permanently. Sometimes the fix isn't worth the cost and risk, and the right answer is to accept it, document the decision, and keep the workaround. Techniques, briefly. Five whys: ask "why" repeatedly until you reach something you can act on; simple, fast, and prone to stopping too early. Ishikawa or fishbone: organize possible causes into categories such as people, process, technology and suppliers; good for group sessions. Timeline reconstruction: lay out every event in order with timestamps; best after major incidents. Kepner-Tregoe: a structured comparison of what the problem is versus what it is not, which narrows causes fast in complex technical faults. Reactive and proactive. Reactive problem management starts from incidents that already happened. Proactive starts from trends, vendor bulletins and near-misses, before users feel it. Most shops do only reactive, and only after major incidents. The real payoff is the boring repeat problem that costs five tickets a week forever. What it doesn't do is measure any of it. Leadership note: problem management is where ops cost actually comes down, but it never feels urgent. Protect time for it. A standing monthly review of the top five repeat categories is enough to start. Music analogy: the same note keeps buzzing on your bass every gig. Incident management is retuning between songs. Problem management is taking it to the luthier, finding the high fret, and getting it leveled. Error control is deciding whether to level the fret or just avoid that note.

---

## Requests and the catalog: make the normal easy

*02 · The Practices*

**Incident or request?**

**Measure by item**

- Something broke → incident. I need something standard → request. Mixing them corrupts both sets of metrics.
- Fulfilment time per catalog item, not one average. The slow items are where requests wait.

**Anatomy of a good catalog item**

- Who can ask, and for whom
- Approvals only where they add control
- Fulfilment tasks routed automatically
- Contractor helps build and tune the catalog
- A target time the user can see
- An owner who reviews it yearly

???

A service request is a user request for something that's a normal part of service delivery: information, access, a device, a software install, a new mailbox. It isn't a failure. Service request management supports the agreed quality of a service by handling all pre-defined, user-initiated requests effectively and in a user-friendly way. Why the split matters. Incidents and requests have different goals (restore versus fulfil), different clocks, and different improvement levers. If password resets are logged as incidents, your incident volume is inflated and your restore time looks great because resets are quick. If a broken laptop is logged as a request for a new laptop, a real failure hides. Clean classification is the foundation of honest metrics. Anatomy of a good catalog item. Who can request it, and on whose behalf (managers ordering for new hires is a common gap). Approvals only where they add a real control, such as cost or privileged access; an approval that's always granted is ceremony and should become a pre-approved request. Fulfilment tasks that route automatically to the right teams, in parallel where possible. A target time the user can see, so they stop calling to ask. And an owner who reviews the item once a year: does anyone use it, is the form still right, is the target still met. Standard requests are to requests what standard changes are to changes: pre-approved, repeatable, and fast. The more of your volume that runs through clean standard items, the more predictable the desk becomes. Onboarding is the hard case. It's really a bundle of requests across the HR office, identity, assets, licensing and training, which is why it's slow everywhere. Treat it as one value stream with one owner and one clock (section 03), even if the ITSM platform fulfils it as many tasks. The weakness of a single percentage is that it hides which items are slow. Report fulfilment time by item, and the long poles become obvious. Technician tip: in the ITSM platform, variables and variable sets let you reuse form fields across items, and flows let fulfilment run in parallel. Most slow catalog items are slow because tasks run in sequence when they don't need to. Music analogy: requests are the setlist favorites the band plays every night. They should be tight and automatic, so the band's attention goes to the moments that need it, like the improvised solo or the string that breaks.

---

## Change enablement: three types, one goal

*02 · The Practices*

- Type
- What it is
- Who authorizes
- Standard
- Low risk, repeatable, documented procedure
- Pre-authorized once, when the model is approved
- Pre-approved procedures
- Normal
- Assessed and scheduled one at a time
- A change authority sized to the risk
- change board review first
- Emergency
- Must go now to restore service or close a critical risk
- A small, fast emergency authority
- Expedited approval, then review

**The goal**

**Change authority**

- Your agency TARGET
- Maximize the number of successful changes, not minimize the number of changes
- Push approval to the lowest level that can judge the risk; boards see the risky few

???

ITIL 4 renamed change management to change enablement on purpose. Its purpose is to maximize the number of successful service and product changes by ensuring risks are properly assessed, changes are authorized, and the change schedule is managed. The emphasis is on enabling successful change, not on stopping change. A change process that makes every change slow and painful pushes people to make changes without telling anyone, which is the most dangerous outcome of all. A change is the addition, modification or removal of anything that could have a direct or indirect effect on services. Version 5 refreshes the terminology here; check the Practice Guide before quoting a definition in policy. Three types. Standard changes are low risk, relatively common, and follow a documented procedure. They're pre-authorized once, when the change model is approved, and then run without per-change approval. Normal changes need to be assessed and authorized individually, and the authority should be sized to the risk: a peer review for low risk, a manager for medium, a board for high. Emergency changes must be implemented as soon as possible, to restore service or fix a critical risk. They use a small, fast emergency authority, and documentation can be completed after implementation. Standard changes are pre-approved, low-risk, repeatable changes executed through defined procedures. Normal changes require change board review and approval before implementation. Emergency changes get expedited approval and post-implementation review. Every change is managed in the ITSM platform, and the contractor prepares change requests with scope, impact analysis, risk assessment and back-out plans. Notice the nuance. Under ITIL 4, normal changes don't all need a board; the board is one possible change authority. That's fine at your agency’s scale if the board meets often and the standard change catalog is healthy. It becomes a bottleneck if most changes are classed as normal. Measures. Also worth watching: incidents caused by changes, unauthorized changes found by discovery, and lead time from request to implementation. A rising emergency change share is a warning sign: either planning is weak, or people are using "emergency" to skip the board. NIST tie-in: good change records are evidence for SP 800-53 CM-3 (configuration change control) and CM-4 (impact analyses). One process satisfies both ITIL and the assessor. Music analogy: changing the setlist mid-tour. Swapping two songs (standard) the band just does. Adding a new song (normal) gets rehearsed and agreed. The singer losing their voice an hour before the show (emergency) gets a fast decision from the bandleader, and a talk afterward.

---

## Make the safe path the fast path

*02 · The Practices*

- 1. Find candidates
- 2. Write the model
- 3. Approve once
- 4. Run and watch
- 5. Revoke on failure
- Normal changes done often, always approved
- Steps, test, back-out, validation checks
- change board authorizes the model, not each run
- Automated checks; failures reported
- A failed run sends it back to normal
- 3 days
- Dec 7, 2026
- Shortest BOD 26-04 remediation window for the highest-risk flaws
- Agencies must meet BOD 26-04 timelines

**The math**

- A weekly board can’t clear a three-day deadline. Routine patching has to be a standard change.

???

The single biggest lever in change enablement is moving routine work from normal to standard. It speeds up delivery, frees the board for changes that need judgment, and, done well, lowers the failure rate, because a documented model with automated checks beats a one-off change every time. Step 1, find candidates. Pull a year of normal changes from the ITSM platform. Look for changes done many times, almost always approved, with low failure rates: monthly patching, certificate renewals, firewall rule additions from a template, adding users to standard groups, scheduled maintenance on known systems. If the board has approved the same type of change twenty times without comment, it's a standard change waiting to be written. Step 2, write the model. A the ITSM platform change model or standard change template captures the steps, the pre-checks, the test, the back-out plan, and the validation that proves success. Good models include automated validation (service health checks, synthetic transactions) so success is proven rather than asserted. Step 3, approve once. The change board reviews and authorizes the model itself. After that, each run is pre-authorized. The board's job shifts from approving every patch to approving the recipe and watching how it performs. Step 4, run and watch. Track every run's outcome. Report standard change volume and failure rate to the board monthly. Step 5, revoke on failure. If a standard change causes an incident, the model goes back to normal status until it's fixed. This is the safety valve that makes boards comfortable letting go. Why this is urgent now. CISA's BOD 26-04, issued June 10, 2026, replaces BOD 19-02 and BOD 22-01 with risk-based remediation using a four-factor model aligned to SSVC. The highestrisk known-exploited vulnerabilities must be remediated in as few as three days, with forensic triage, and agencies must meet the timelines by December 7, 2026. A change process where patches wait for a weekly change board can't meet that. The fix is a standard change model for routine patch deployment, with an emergency path for the KEV cases the model can't handle. The Cyber deck covers BOD 26-04's mechanics. Cloud providers too. FedRAMP adopted matching vulnerability rules for cloud providers with the same December 7 deadline, so your SaaS vendors, the ITSM platform included, are on the same clock. Leadership framing for the board: "We're not removing control. We're moving control from each change to the recipe, and adding automated proof." Music analogy: a session band with a book of charts. Nobody rehearses "Happy Birthday" before every party. The chart is approved once, everyone plays it the same way, and if someone keeps fumbling it, it goes back into rehearsal.

---

## Release and deployment: two different decisions

*02 · The Practices*

**Deployment**

**Release**

- Moving components into an environment
- Making features available to users
- A technical decision
- A business decision
- Dev → test → production
- Timed to training, comms, readiness
- Can happen without users noticing
- Can lag deployment by days
- Owned by whoever runs the platform
- Owned with the business office

**Decouple them**

**You already do this**

- Your agency NOTE
- Feature flags, dark launches and staged rings let you deploy safely, then release on purpose.
- Microsoft 365 update channels and endpoint management rings are release management by another name.

???

ITIL 4 split what v3 called "release and deployment management" into two practices, because they answer different questions. Deployment management moves new or changed hardware, software, documentation, processes or any other component into live environments, or into test and staging environments. It's a technical activity: push the build, run the scripts, confirm health. In a mature shop it's automated and boring. Release management makes new and changed services and features available for use. It's a business decision: are users trained, is the help desk ready, is the knowledge base updated, does this collide with a busy week for the business office? A release can contain many deployments, and a deployment can sit dark in production for days before it's released. Why separating them helps. If deployment and release are the same event, every deployment carries business risk and needs business coordination, so deployments get batched into big, risky weekends. If they're decoupled, deployment can happen often and quietly (lower risk per change), and release can be timed to when the business is ready. Feature flags (code that ships turned off), dark launches (deployed but hidden), and ring-based rollouts (pilot group first, then wider) are the standard techniques. You already run release management. Microsoft 365's update channels and Windows Update for Business rings in endpoint management are exactly this: Microsoft deploys continuously, and you decide which users receive which features when. the ITSM platform's twice-yearly family releases and the upgrade testing they require are the same pattern from the platform side. That's reasonable for an operations contract. Your APP work already names a test/dev environment as a priority. Who owns what. Write that boundary down; it's where finger-pointing starts after a bad release. Music analogy: recording a track is deployment; dropping the single is release. The track can sit finished on a hard drive for months while the label times the drop to the tour, the video and the radio push. Bands that release the moment they finish mixing tend to release into silence.

---

## Configuration and assets: same objects, different questions

*02 · The Practices*

**Service configuration · cmdb**

**It asset management**

- What breaks if this breaks?
- What do we own, and what does it cost?
- Configuration items and their relationships
- Hardware and software through their lifecycle
- Owner, environment, lifecycle status
- Contract, cost, warranty, license entitlement
- Drives impact analysis for changes and P1s
- Drives audits, renewals, refresh plans
- Reconciled to procurement and inventory

**Build it from services down**

- Map each service, then its CIs. Discovery alone gives a parts list, not a map.

???

Two practices that look at many of the same objects (a laptop, a server, a license) and ask different questions. Service configuration management ensures accurate and reliable information about the configuration of services and the CIs that support them is available when and where it's needed. A configuration item is any component that needs to be managed to deliver a service. The point of the CMDB is relationships: this application runs on these servers, which sit behind this load balancer, which depends on this network segment. With relationships you can do impact analysis: before a change, see what services ride on the CI; during a P1, see what changed nearby and who else is affected. IT asset management plans and manages the full lifecycle of all IT assets, to maximize value, control costs, manage risks, support decisions about purchase, reuse and retirement, and meet regulatory and contractual requirements. An asset is anything of financial value. ITAM asks: what do we own, where is it, who has it, what did it cost, is it under warranty, are we licensed for what's installed, and when does it need refreshing? They overlap and differ. A laptop is both an asset and a CI. A software license is an asset but rarely a CI. A business service is a CI but not an asset. Many shops try to make the CMDB do both jobs, and end up doing neither well. In the ITSM platform the platform supports both, with hardware and software asset management alongside the CMDB, linked to the same underlying records. ITAM support covers intake, deployment, transfer and retirement, alignment with procurement and inventory data, reconciliation and audits, and software license tracking and compliance. What good looks like. Start from services, not devices. List your agency’s business services, map the CIs each depends on, and fill in relationships for the top ten services first. Automated discovery keeps the infrastructure layer current; humans own the service layer. Every CI has an accountable owner. And measure accuracy by sampling, not by counting records: pick fifty CIs at random each quarter and check them against reality. That's achievable if two years of contract performance establish the baseline first. Federal tie-in. Section 05 covers why inventory is a security control: BOD 23-01, NIST SP 800-53 CM-8, and the MEGABYTE Act. Music analogy: the CMDB is the stage plot and input list: which mic goes to which channel, through which snake, into which board. ITAM is the gear insurance inventory: what you own, what it's worth, and what's rented. Same cables, different paperwork, and you need both before the tour.

---

## Knowledge: write it while you solve it

*02 · The Practices*

**Kcs solve loop · every ticket**

- Capture
- Structure
- Reuse
- Improve
- The user’s words
- Issue, cause, fix
- Search early, often
- Fix it on every use
- Reviewed at least quarterly
- Quarterly KB audit report
- Shift-left Tier II to Tier I

**Kcs evolve loop · periodic**

- Content health
- Process integration
- Tag articles to services and CIs
- Performance assessment
- Leadership and comms
- Reuse is review. An article checked every time it’s used stays current; one written once and filed doesn’t.

???

Knowledge management maintains and improves the effective, efficient and convenient use of information and knowledge across the organization. At the desk, it's the knowledge base. Everywhere else, it's runbooks, architecture notes, decisions, and the things only one person knows. KnowledgeCentered Service (KCS), from the Consortium for Service Innovation, is the most practical method, and it fits ITIL well. Version 6 describes two loops. The Solve loop happens inside every ticket. Capture: record the issue in the user's own words, because that's what the next user will type into search. Structure: use a simple template (issue, environment, cause, resolution) so articles are scannable. Reuse: search the knowledge base early and often, before troubleshooting from scratch. Improve: when an article is used, fix whatever's wrong or missing right then. The phrase to remember is "reuse is review." Articles that get used get corrected continuously; you don't need a separate review army. The Evolve loop happens periodically, at the program level. Content health: is the knowledge base accurate, findable and not bloated? Process integration: is knowledge built into the incident and request workflow, or a separate chore? Performance assessment: are you measuring the right things (reuse, contribution, resolution with knowledge) rather than article counts? Leadership and communication: do managers reward knowledge work? Why it matters at your agency. Knowledge is the engine of shift-left. First contact resolution rises when Tier I has good articles. Tier 0 self-service only works if the articles are written for users rather than technicians. And a Virtual Agent or AI assistant that answers from the knowledge base will confidently serve stale answers if nobody owns article accuracy. Same lesson as the CMDB, different table. A caution on the metric. "Reviewed and current" can be gamed by bulk-touching review dates. Pair it with usage: an article nobody has used in a year is either irrelevant or unfindable, and both are worth knowing. Leadership tip: knowledge is also your transitionout insurance. Articles, runbooks and scripts belong to the government. Music analogy: the band's chart book. Every time someone plays a chart and finds a wrong chord, they pencil in the fix right there. After a year of gigs the book is accurate without anyone ever scheduling a "chart review day."

---

## Service levels: promises you can prove

*02 · The Practices*

- Agreement
- Between
- at your agency

**Sla**

- Provider and customer
- Targets the IT office commits to business offices

**Ola**

- Two internal teams
- Handoffs between Ops, the application development team and the CISO’s team
- Underpinning contract
- Provider and supplier

**Xla**

- Provider and users

**Every target needs six things**

- A definition · a named data source · a measurement period · a target or AQL · exclusions · a remedy or consequence
- The watermelon effect: green on the outside, red on the inside. Every SLA met and users still unhappy means you’re measuring the wrong thing.

???

Service level management sets clear business-based targets for service performance, so delivery can be properly assessed, monitored and managed against them. Two halves: agreeing what "good" means, and proving whether you hit it. The four agreements. A service level agreement is between a service provider and a customer: the IT office and a business office, for example. An operational level agreement is between two internal teams that together deliver a service, such as Operations and the application development team on application support handoffs, or Operations and the CISO's team on security incident escalation. An experience level agreement sets targets for user outcomes and sentiment rather than technical performance; section 03 covers XLAs. The logic chain. An SLA to a business office is only as good as the OLAs and underpinning contracts behind it. If you promise the Office of the CFO 99.9 percent availability for a system, but the hosting contract guarantees 99.5 percent, you've promised something you can't deliver. Map each SLA to what underpins it. Six things every target needs. Write these down for each SLA, or it will be argued about every month. A definition: what exactly is measured, from when to when. A named data source: which the ITSM platform report or field. A target or AQL. Exclusions: scheduled maintenance, usercaused delays, time pending a third party. A remedy: what happens when it's missed, from a corrective action plan to a CPARS note. The watermelon effect. Green on the outside, red on the inside. A desk can meet every acknowledgment SLA and still leave users waiting days for a fix, because acknowledgment isn't resolution. When satisfaction drops while SLAs stay green, the SLAs are measuring IT's activity, not the user's outcome. The answer isn't more SLAs; it's better ones, paired with an experience measure. Service reviews. SLM includes regular reviews with customers, not just reports. A short quarterly conversation with each major business office ("what's working, what's annoying, what's coming") does more for the relationship than a forty-page monthly report, and catches problems the metrics miss. Make sure the narrative explains misses rather than restating numbers. Music analogy: the contract rider. The venue promises a stage of a certain size, power, and a sound engineer by soundcheck. If the rider says "adequate PA" with no specs, you'll argue about it at every venue. Specific riders make for quiet load-ins.

---

## The warranty practices: available, sized, recoverable, watched

*02 · The Practices*

**Availability**

**Capacity and performance**

- Up when needed
- Enough, at the right cost
- Headroom, license counts, cloud sizing, storage growth.

**Service continuity**

**Monitoring and event**

- Recoverable after a disaster
- Seen before users call
- Events filtered to signal; the right ones become incidents.
- A backup you haven’t restored is a hope. Test restores on a schedule, and time them.

???

Four practices that deliver warranty: the "fit for use" half of value. Users rarely praise them and always notice when they fail. Availability management ensures services deliver agreed levels of availability. Two traps. First, measure from the user's side: a server that's up while the application on it is broken isn't available to anyone. Synthetic transactions (a robot logging in and doing a task every five minutes) measure what users experience. Second, know what the number means. 99.9 percent allows about 43 minutes of downtime a month; 99.99 percent about four minutes. Availability is also about maintainability: how quickly you can restore, which is mean time to restore again. Capacity and performance management ensures services achieve agreed performance and meet current and future demand cost-effectively. In a cloud-heavy, SaaS-heavy agency, capacity is less about racking servers and more about license counts, Azure sizing and cost, storage growth in M365 and Box, and bandwidth through the SSE platform. Watch trends, not just thresholds: a mailbox store growing 4 percent a month is a planning item long before it's an alert. Service continuity management ensures availability and performance are kept at sufficient levels in a disaster. Two numbers per service: the recovery time objective (how long you can be down) and the recovery point objective (how much data you can lose). These come from the business impact analysis and should match what the backup and replication design can actually deliver. IT continuity supports the agency's broader continuity plan. Job success isn't restore success. Test restores on a schedule, time them, and compare the time to the RTO. Monitoring and event management systematically observes services and components, and records and reports selected changes of state identified as events. The craft is filtering: most events are informational, some are warnings, and a few should become incidents automatically. Too little monitoring and users find outages first. Too much and the team drowns in alerts and learns to ignore them, which is worse. AIOps tools (section 06) help with correlation and noise. How they connect. Monitoring detects; availability defines the target; capacity prevents the slow failures; continuity handles the big one. All four feed problem management with trends. Music analogy: the touring crew. Availability is the show starting on time. Capacity is the venue holding the crowd and the PA having headroom. Continuity is the backup generator and the spare amp in the truck, tested at load-in, not discovered mid-show. Monitoring is the monitor engineer watching every channel so the singer never has to wave.

---

## Information security: ITIL meets the RMF

*02 · The Practices*

**The ciso’s team owns**

**Operations runs**

**Itsm gives both**

- Policy and risk decisions
- Patching and configuration
- Change records as control evidence
- RMF, ATOs, continuous monitoring
- Access provisioning and removal
- Access requests with approvals
- Security incident response
- Logging, backups, asset inventory
- An inventory to scope the RMF
- Risk acceptance in writing
- First detection at the desk
- Incident data for trends

**Itsm records that double as nist sp 800-53 evidence**

- CM-3 change control ← change records
- CM-4 impact analysis ← change risk
- CM-8 inventory ← CMDB and assets
- AC-2 accounts ← access requests
- ITIL doesn’t replace the RMF. It runs many of the operational controls the RMF selects and assesses. One process, two audiences.

???

Information security management protects the information an organization needs to conduct its business: confidentiality, integrity and availability, plus authentication and non-repudiation. In ITIL it's a general management practice, and in Version 5 it sits in the Collaborate, Assure and Improve module. In federal IT, security is governed by FISMA, OMB policy and the NIST Risk Management Framework, and owned by the CISO. ITIL doesn't change that. What ITIL gives you is a way to run the operational side of security so that the work and the evidence come from the same records. Who owns what. The CISO's team owns security policy, risk analysis, the RMF and authorization packages, continuous monitoring strategy, security incident response leadership, and documented risk acceptance. Operations runs many of the controls: patching and secure configuration, account provisioning and removal, logging and backups, asset inventory, and the desk's first detection of suspicious activity. What ITSM records give both teams. Change records are evidence for configuration change control (CM-3) and impact analysis (CM-4). Access requests with approvals are evidence for account management (AC-2). The CMDB and asset inventory scope the RMF boundary and support CM-8. Incident data shows trends that may point to security weaknesses. If the ITSM process is clean, assessment is mostly pulling reports. If it isn't, assessment is archaeology. The handoff that matters most. When a desk incident looks like a security event (unexpected MFA prompts, a mailbox rule forwarding mail externally, a user reporting a strange login), it has to reach the security team fast, with evidence intact. That handoff should be an OLA: the trigger criteria, the routing, the time limit, and what the desk must not do (like wiping the laptop before forensics). Section 05 covers the reporting clocks; the Cyber deck covers incident response in depth. Common control inheritance. Many controls Operations runs, like patching, logging, and identity, can be documented once as common controls and inherited by every system's ATO package. The Cyber deck flagged this as the single biggest thing that would speed up your agency’s ATOs. Version 5 note: AI governance now has its own ITIL module, and AI systems bring their own security risks. Section 06 touches this; the AI and Cyber decks go deeper. Music analogy: venue security and the stage crew. Security sets the rules and decides who's on the guest list. The crew checks wristbands at the stage door and locks the gear truck. One clipboard, signed at the door, satisfies both the crew chief and the insurance auditor.

---

## Suppliers and relationships: value through others

*02 · The Practices*

**Supplier management**

**Relationship management**

- Get the value you paid for Know what the business needs next
- Regular conversations with each office
- Monthly reviews with data, not anecdotes
- Demand signals before they’re tickets
- Risk: concentration, lock-in, transition
- Expectations set early, not after misses
- Feeds past-performance records
- Trust that survives a bad month
- Your agency’S SUPPLIERS

**Your role**

- Microsoft, the ITSM platform, the SSE platform, others

???

Two practices about value created with and for other parties. Both are in Version 5's Collaborate, Assure and Improve module. Supplier management ensures the organization's suppliers and their performance are managed appropriately to support seamless delivery of quality products and services. In federal terms, it's contract administration with an operational brain. What it covers. Relationship health with the contractor's program manager. And documentation that feeds pastperformance evaluations, which is the only leverage that follows a contractor to its next bid. Good supplier reviews look at trends and causes, not just pass or fail. "P2 acknowledgment slipped to 91 percent; cause was two vacancies on the desk; corrective plan is X by date Y" is useful. "SLA missed, noted" isn't. Multiple suppliers. When a problem spans suppliers, someone has to own the end-to-end outcome. That's SIAM, in section 04. Relationship management establishes and nurtures links between the organization and its stakeholders, at strategic and tactical levels. In the IT office, that's the link to business offices: understanding what they need next, managing expectations, and building enough trust that a bad month doesn't become a crisis. It's often informal and personality-driven, which is fine, as long as it's deliberate. A short quarterly conversation with each office head about what's coming catches demand before it lands as an urgent request. How they connect. Relationship management tells you what the business needs; supplier management makes sure the suppliers can deliver it; service level management writes down the promises; continual improvement closes the gaps. Federal twist. In the private sector, supplier management is mostly commercial negotiation. In federal IT, the contracting officer owns the contract, the COR monitors performance, and the program office owns requirements. Keep the lines clean: the COR documents and recommends; only the CO changes terms. Section 05 covers the contracting side. Music analogy: supplier management is working with your backline rental company and the venue's house engineer; you didn't hire them personally, but you need them to deliver, and you keep notes. Relationship management is staying in touch with the promoters who book you, so you hear about next year's festival before the lineup is announced.

---

## Continual improvement: a model and a register

*02 · The Practices*

- 1. What is the vision?
- 2. Where are we now?
- 3. Where do we want to be?
- 4. How do we get there?
- 5. Take action
- 6. Did we get there?
- 7. Keep the momentum
- ITIL 4’s seven-step model. Version 5 refines it; the questions still hold.

**The improvement register**

**Step 2 is the anti-ratchet**

- One list of ideas with an ID, owner, baseline, target, status and value.
- Your AUTO-### automation register is one.
- Declare where you are now, in writing, before claiming any improvement.

???

Continual improvement aligns practices and services with changing business needs through ongoing improvement of products, services, practices, and anything else that supports them. It's both a practice and a component of the service value system, which is ITIL's way of saying it isn't optional and isn't a project. The ITIL 4 model has seven questions. What is the vision? Tie the improvement to an organizational goal, such as a strategic objective or an APP priority. Where are we now? Measure the current state honestly: this is the baseline. Where do we want to be? Set a target, in measurable terms. How do we get there? Plan, ideally in small iterations. Take action. Did we get there? Measure again against the baseline. How do we keep the momentum going? Embed the change, communicate the win, and pick the next item. Version 5 includes a refined continual improvement model. Until you've read it, the seven questions above are a safe mental model; the logic is the same. Step 2 is where your anti-ratchet discipline lives. You can't credibly claim improvement without a declared baseline. And the first year of a new metric should establish the baseline, not promise a number someone invented. That protects you twice: it makes the improvement real, and it stops one good year from becoming next year's floor without a matching change in resources. The improvement register. One place to record improvement ideas, whoever raises them: an ID, a description, an owner, the baseline, the target, the status, and the expected value. Your automation candidate register with persistent AUTO-### identifiers is exactly this, scoped to automation. A register makes improvement visible, prevents the same idea being raised five times, and gives you evidence for performance narratives. Who improves. Everyone. ITIL is explicit that continual improvement isn't one team's job. Your job is to make sure those recommendations land somewhere: the register, with an owner. Small beats big. Most of the value in operations comes from many small fixes: a better catalog form, a new standard change, a knowledge article for the top repeat issue. Big transformation programs have their place; they shouldn't crowd out the steady drip of small improvements. Music analogy: the band records every show and listens back on the bus. What's the sound we're going for (vision)? How did tonight sound (now)? What should the bridge feel like (target)? What do we change tomorrow (plan)? Play it (act). Listen back (check). Keep the habit when the tour gets tiring (momentum).

---

## Running it

*03 / 08 · 03 · Running It*

- How to tell whether the practices are working: metrics that matter, why averages lie, measuring experience, shifting work left, and seeing the whole value stream.
- Metrics that matter · Why averages lie · Experience and XLAs · Shift-left · Value streams

???

Section 02 was what each practice does. This section is how you know it's working, and how you avoid the measurement traps that make IT shops look good on paper while users suffer. Five slides. A short list of metrics worth reporting, each paired with a quality check. Why averages mislead for anything time-based, and what to report instead. Shift-left as the main lever on cost and speed. And value streams, using onboarding as the worked example. The thread running through all five is your anti-ratchet practice: declare the baseline before claiming improvement, let the first year of a new metric set the baseline rather than promise a number, and don't let one good year become next year's floor unless capacity changed too. Every slide in this section is easier to defend with that discipline in place. A note on Goodhart's law, which every metrics conversation eventually hits: when a measure becomes a target, it stops being a good measure. People optimize what they're scored on. The defenses are pairing (speed with quality), sampling (check the records behind the number), and talking to users (the number should match what they say). Music frame: this is the section about listening back to the recording. Your hands tell you how it felt. The tape tells you how it sounded. They don't always agree, and the tape wins.

---

## Metrics that matter, each with a partner

*03 · Running It*

- Measure
- Tells you
- Pair it with
- Time to restore (median, P90)
- Real user pain from incidents
- Reopen rate
- First contact resolution
- Desk skill and knowledge quality
- Reopens within 7 days
- Repeat incidents by cause
- Whether problem management works
- Categorization accuracy
- Fulfilment time by catalog item
- Where requests wait
- Satisfaction on that item
- Change failure rate
- Change quality
- Emergency change share
- Backlog over 30 days
- Neglected work
- Time parked “pending user”
- Self-service resolution
- Shift-left progress
- Repeat contacts after self-service
- People hit the number they’re scored on. A speed metric without a quality partner gets gamed.

???

Seven measures cover most of what an operations director needs to know about service health. Each has a partner that catches gaming. Time to restore, reported as the median and the 90th percentile, tells you how long users are actually down. Pair it with reopen rate, because the fastest way to cut restore time is to close tickets before they're fixed. First contact resolution tells you whether Tier I has the skills and knowledge to fix things at the first touch. Pair it with reopens within seven days: closing a ticket on first contact by telling the user to reboot and call back is FCR on paper only. Repeat incidents by cause, such as the same category on the same CI, is the best single test of problem management. Pair it with categorization accuracy, because inconsistent categories hide repeats. Fulfilment time by catalog item shows where requests wait. A single SLA percentage across all items hides the slow ones. Pair it with satisfaction on that item. Change failure rate, the share of changes that cause incidents or need remediation, is the quality measure for change enablement. Pair it with emergency change share: a team can protect its failure rate by pushing risky work through the emergency path. Backlog over 30 days shows work nobody is doing. Pair it with time parked in "pending user" or "pending vendor," the states that stop SLA clocks and quietly hold tickets for months. Self-service resolution counts issues resolved without a human. Pair it with repeat contacts: a user who tries the bot, fails, and calls anyway wasn't helped, they were delayed. What's not on the list. Calls answered within 30 seconds, abandonment rate, tickets closed per technician. They're easy to measure, easy to game, and weakly tied to outcomes. Report them internally if useful; don't lead with them. The gap is pairing and percentiles. Both can be added to the monthly dashboard without a contract modification. Anti-ratchet reminder. For any measure new to your reporting, the first year sets the baseline. Write it down before you set a target. Music analogy: judging a drummer only on tempo gets you a metronome that can't groove. Pair tempo with feel, and you get a musician.

---

## Why averages lie: report the median and the tail

*03 · Running It*

**The mean**

- Dragged up by a few long outages. Describes no real user.

**The median**

- The typical experience: half restore faster, half slower.

**The 90th percentile**

- The tail, where the angry users live. Improve this.

???

Restore times, fulfilment times and lead times are almost never bell-shaped. Most tickets close quickly; a few run for days. That long right tail drags the average upward until it describes nobody. The chart is an illustrative shape, not your agency data. In this shape, the median is three hours: half of incidents restore faster. The mean is nine hours, three times the median, because a handful of multi-day incidents pull it up. The 90th percentile is 22 hours: one in ten users waits almost a full day or longer. What each number is good for. The mean is useful for capacity math (total hours of work) and misleading for describing experience. The median describes the typical case and is stable month to month, which makes it good for trend lines. The 90th percentile describes the tail, and the tail is where complaints, escalations and lost mission time concentrate. Why it matters for decisions. Say you cut the median from three hours to two by improving Tier I scripts. Useful, but the users who complain to the CIO are in the tail. Now say you cut the P90 from 22 hours to 12 by fixing vendor escalation and parked tickets. The mean drops too, but more importantly, the worst experiences halve. Tail work is usually about handoffs, waiting states and vendor queues, not about technician speed. How to compute it. the ITSM platform reporting can produce percentiles directly in Performance Analytics, or you can export resolved incidents with timestamps and compute them in Excel (PERCENTILE.INC) or Power BI. Exclude nothing silently: if you remove "pending user" time, report that you did. SLA percentages are percentiles in disguise. "95 percent acknowledged within 30 minutes" is a statement about the 95th percentile of acknowledgment time. That's good practice. Extend it to restore and fulfilment. What to say in a briefing: "Half our incidents are fixed within X hours. One in ten takes longer than Y. We're working on Y." Music analogy: average loudness of a song tells you almost nothing. A ballad with one huge chorus and a punk song at full tilt can share an average. Engineers look at the typical level and the peaks, because the peaks are what clip.

---

## Experience: measure what users feel, not just what IT did

*03 · Running It*

**Sla asks**

**Xla asks**

- Did IT hit the clock?
- Did the user get the outcome?
- Acknowledged in 30 minutes. Fulfilled in 3 days.
- Change succeeded.
- Was I productive? How much time did I lose? Would I come back?

**Employee experience index**

**Time to productivity**

**Start as a baseline**

- Quarterly, from the ITSM platform surveys and ticket quality scoring
- Report experience for a year before attaching a remedy

???

An experience level agreement sets targets for outcomes and sentiment rather than technical performance. It's the direct answer to the watermelon effect: SLAs green, users unhappy. The difference in one line. An SLA asks whether IT hit the clock. An XLA asks whether the user got the outcome. Both matter. An SLA protects you from slow service; an XLA protects you from fast service that doesn't help. Version 5 leans into this. The service journey model is now taught at Foundation level, and there's a whole ITIL Experience module focused on designing user-centered, outcome-driven experiences rather than just processes. Expect contractors with current ITIL training to use this vocabulary. What experience measures look like. Sentiment right after a ticket closes, asked in one question, so response rates stay usable. Perceived lost time: how much work time the user feels they lost to the issue, which often differs wildly from ticket duration. Outcome measures such as time to productivity for new hires. And, increasingly, digital experience telemetry from endpoints: boot times, application crashes, Wi-Fi drops, measured from the device rather than the ticket. The log's rationale: current metrics measure compliance; XLAs measure perception and outcome, and align with where federal oversight is heading on customer experience. How to introduce them without a fight. First year: report, don't penalize. That builds the baseline and lets both sides learn what moves the number. Second year: set targets from the baseline, with a modest incentive or remedy. Keep the measures few: two is plenty. Cautions. Surveys suffer from low response and from only angry or delighted people answering. Sentiment can be dragged down by things outside the contractor's control, like a policy the user hates. Time to productivity depends on the HR office and the hiring office too, so it's a shared measure, which is the point, but means attribution has to be handled carefully in a contract. Music analogy: the SLA is the setlist timing, doors at 8, on stage at 9, off by 10:30. The XLA is whether the crowd left humming the songs. You can hit every cue and still play a forgettable show.

---

## Shift-left: resolve each issue at the lowest tier that can

*03 · Running It*

**Tier 3**

**Tier 2**

**Tier 1**

**Tier 0**

- Engineering and vendors
- Specialists
- Service desk
- Self-service
- Slowest, costliest
- Deskside, M365, identity
- Scripts and knowledge
- Portal, articles, Virtual Agent

**How work moves left**

**Count resolutions**

- A Tier 2 fix becomes a Tier 1 script; a Tier 1 script becomes a selfservice article or an automation
- Deflection means the issue was solved, not that the bot was opened

???

Shift-left means moving the resolution of each type of issue as close to the user as it can safely go. Each step left is cheaper and faster, and usually better for the user, who doesn't have to wait in a queue. The tiers. Tier 3 is engineering and vendor escalation: slowest and most expensive per issue. Tier 2 is specialists: deskside, M365, identity, devices. Tier 1 is the service desk with scripts and knowledge. Tier 0 is self-service: the portal, knowledge written for users, password reset, and a virtual agent. Some frameworks add a "Tier minus 1": problems prevented or fixed automatically before the user notices, through monitoring and automation. How work moves left, in practice. Watch for the issue types that Tier 2 handles repeatedly with the same steps. Turn the steps into a Tier 1 script or knowledge article, and train Tier 1 on it. When Tier 1 is handling it reliably with a script, ask whether the user could do it themselves with a good article or a guided form, or whether it can be automated outright. Where it stops. Not everything should move left. Anything involving privileged access, identity verification for MFA resets, or security judgment needs a human with the right authority. Shift-left should never mean shifting risk onto users who can't judge it. Measuring it. Track volume by tier over time for the top 20 issue types. Track Tier 0 resolution honestly: an issue counts as deflected when it's resolved, not when the user opened the bot. A user who tries selfservice, fails, and then calls has been delayed, not helped; count repeat contacts within a day of a self-service session as failures. The APP work already settled on a the ITSM platform knowledge base build-out plus a Teams-integrated Virtual Agent as Tier 0, with knowledge work starting now and the bot after the post-upgrade development hold lifts. First year, the deflection rate is a baseline, not a promise. Section 06 picks this up. Leadership note: shift-left changes the desk's work mix. As easy tickets move to Tier 0, the remaining Tier 1 work gets harder, average handle time goes up, and FCR may dip. That's a sign of success, not failure. Explain it before the numbers move. Music analogy: a band teaching the crowd the chorus. The first time, only the singer knows it. By the third chorus, the whole room sings it and the singer can focus on the verse only they can sing.

---

## Value streams: follow the work, not the org chart

*03 · Running It*

**Onboarding · one value stream, many teams · illustrative**

- HR start notice
- Account created
- Licenses assigned
- Device ready
- Access approved
- Productive
- the HR office
- Identity
- M365, apps
- Assets, deskside
- Office, data owners
- The outcome

**Lead time**

**Process time**

**Flow efficiency**

- Start notice to productive: what the new hire feels
- Minutes someone is actually working on it
- Process time ÷ lead time. Usually small; the rest is waiting.
- Map it once with everyone in the room. The biggest wait is almost always at a handoff between teams.

???

A value stream is the series of steps an organization takes to turn a specific kind of demand into value. It cuts across teams and practices. ITIL 4 made value streams central, and Version 5 keeps them; value stream mapping now appears in the Foundation topic list. Onboarding is the classic example, and the one that hurts at your agency. The steps on the slide are illustrative, not measured: an HR start notice from the HR office, an account created in identity, licenses assigned, a device imaged and assigned, access approved by the office and data owners, and finally a productive new hire. Six handoffs across at least four teams. Each team can be fast at its own step while the whole takes two weeks. Three numbers. Lead time is the elapsed time from the start notice to productive: what the new hire and their manager feel. Process time is the time someone is actually working on it; for onboarding, maybe a couple of hours in total. Flow efficiency is process time divided by lead time. In most knowledge-work value streams it's a small fraction; the rest is waiting in queues, for approvals, for information, for the next team to notice. What that means for improvement. Making each step faster helps a little. Removing waits helps a lot. The usual waits: the start notice arriving late or incomplete, access approvals sitting in an inbox, devices waiting on stock, and steps running in sequence that could run in parallel. How to map one. Get one person from each team in a room for two hours. Walk one real recent onboarding from end to end with timestamps from the ITSM platform and email. Mark each step's process time and the wait before it. Circle the longest wait. Fix that, measure again. This is the "start where you are" and "think holistically" principles in practice. Link to experience. It can only be met if the HR office, Operations, the contractor and the hiring office all play their part, which is why it's valuable and why attribution has to be designed carefully. Link to your history. Onboarding and offboarding workflow rebuilds, and the HR-table technical debt that blocks them, have been recurring threads in your APP planning. A value stream map is a strong artifact for that conversation: it shows leadership where the time goes, in one picture, without blaming any single team. Music analogy: getting a song from demo to release. Writing takes days, tracking a week, mixing a few days. But the release takes six months because it waits on the label, the artwork, the distributor, and the radio plugger. The fix isn't playing faster in the studio.

---

## ITIL among other frameworks

*04 / 08 · 04 · Frameworks*

- ITIL is one voice in a band. Where COBIT, ISO 20000, DevOps, SRE, Lean and SIAM fit, and how to use them together without turf wars.
- The framework map · DevOps and SRE · SIAM for multi-vendor shops

???

Three slides. A map of the frameworks you'll hear named in meetings and RFP responses, with what question each one answers. DevOps and SRE, which changed how modern shops think about change and reliability. The main message: these frameworks mostly answer different questions, so "ITIL versus DevOps" is usually a false choice. ITIL 4 explicitly absorbed Agile, Lean and DevOps ideas, and Version 5 adds clearer alignment with DevOps, Agile and PRINCE2, as complements rather than replacements. Where conflict is real. Old-style ITIL change management (every change to a weekly board) genuinely clashes with DevOps continuous delivery. The resolution, covered on the DevOps slide, is that the pipeline itself becomes the change authority for low-risk changes, with automated tests and checks as the control evidence. That's fully consistent with ITIL 4's change enablement and with NIST's configuration change control requirements, as long as the records exist. Federal frameworks aren't on the map in detail because they're section 05's subject, and the Cyber deck covers NIST CSF and the RMF in depth. Music frame: genres. Jazz, funk, gospel and rock share the same twelve notes and borrow from each other constantly. A good musician knows which idiom the song needs, and doesn't start an argument about whether funk is "better" than jazz.

---

## Which framework answers which question

*04 · Frameworks*

- Framework
- The question it answers
- How it relates to ITIL

**Cobit (isaca)**

- Who decides, and what must be controlled?
- Governance above; ITIL is how the work runs

**Iso/iec 20000-1**

- Can an auditor certify our service management?
- The certifiable standard; ITIL meets most of it
- NIST CSF and RMF
- Is security risk managed and accepted?
- ITIL runs many of the controls
- DevOps
- How does code flow to production quickly and safely?
- Modernizes change, release, deployment

**Sre**

- How reliable is reliable enough?
- Engineering for availability and incident
- Lean and Agile
- Where is the waste; how do we deliver in small steps?
- Built into the guiding principles

**Siam**

- Who integrates across several suppliers?
- Extends supplier and service level work

**Kcs**

- How does knowledge stay current?
- A method for knowledge management

**Tbm**

- What does each service cost?
- Feeds service financial management

**Prince2**

- How is this project run?
- Also PeopleCert’s; project practice

???

A cheat sheet for the alphabet soup in RFP responses and vendor briefings. COBIT, from ISACA, is a governance and management framework for enterprise IT. It answers "who decides, and what must be controlled?" with governance objectives and management objectives. Auditors and inspectors general like it. ITIL sits underneath: COBIT says change must be controlled; ITIL says how to run change enablement. Many organizations use COBIT for the governance layer and ITIL for operations. ISO/IEC 20000-1 is the international standard for a service management system. Unlike ITIL, an organization can be audited and certified against it. ITIL practices cover most of its requirements. A contractor claiming ISO 20000 certification has passed an external audit of its service management system; a contractor claiming to be "ITIL compliant" has claimed something no one can audit. NIST CSF and the RMF are the federal security frameworks. ITIL runs many of the operational controls they select. The Cyber deck covers both. DevOps is a set of cultural and technical practices for moving code to production quickly and safely: automation, continuous integration and delivery, shared ownership between developers and operators. It modernizes change, release and deployment. Next slide. Site Reliability Engineering, from Google, treats operations as an engineering problem: service level indicators and objectives, error budgets, blameless postmortems, and automation of toil. Next slide. Lean and Agile are about flow, waste and small iterative delivery. ITIL 4's guiding principles absorbed them; "progress iteratively with feedback" and "keep it simple and practical" are Agile and Lean in ITIL words. SIAM, service integration and management, coordinates multiple suppliers as one service. Slide after next. KCS is the practical method for knowledge management from section 02. Technology Business Management is a taxonomy and method for IT cost transparency. OMB announced government-wide adoption in 2017, with reporting required of 26 large agencies; GAO reported in 2025 that the effort had stalled and recommended OMB either end it or make it a priority. PRINCE2 is a project management method, also owned by PeopleCert. Version 5 names it as complementary. How to use this in an evaluation. When an offeror lists frameworks, ask which question each one answers in their approach. Lists without answers are decoration. Music analogy: theory, ear training, sight-reading, stagecraft, studio engineering and music business are different subjects. A professional uses all of them, and none of them is "the" music.

---

## DevOps and SRE: when the pipeline becomes the change authority

*04 · Frameworks*

**Dora’s four keys**

**Sre’s vocabulary**

**How it fits itil**

- Deployment frequency
- SLI: what you measure
- Automated tests as change evidence
- Lead time for changes
- SLO: the target for it
- Low-risk changes approved by pipeline
- Change failure rate
- Error budget: allowed unreliability
- Error budget as a release gate
- Failed deployment recovery time
- Toil: manual work to automate away
- Blameless reviews feed problems
- Your agency OPERATIONS
- Mostly configuration, not code: DevOps arrives as standard change models and automation
- Pipelines matter most here. Write down where pipeline approval ends and change board begins.
- Speed and stability rise together in high-performing teams. Smaller, more frequent changes fail less and recover faster.

???

DevOps and SRE are where the "ITIL is bureaucracy" argument usually happens. The short answer: modern ITIL agrees with both, and the conflict is with old ITIL habits, not ITIL 4 or Version 5. DORA's four keys. The DevOps Research and Assessment program, now part of Google Cloud, has measured software delivery performance for over a decade. Its four key metrics: deployment frequency (how often you ship), lead time for changes (commit to production), change failure rate (share of deployments that cause problems), and failed deployment recovery time (how fast you recover; this used to be called time to restore). Recent DORA reports have also tracked rework rate. The headline finding, year after year: high performers are faster and more stable at the same time. Speed and stability aren't a trade-off when changes are small and automated. SRE vocabulary. A service level indicator is a carefully defined measure of some aspect of service, such as the share of successful login requests. A service level objective is the target for it, such as 99.9 percent over 30 days. The error budget is the gap: if your objective is 99.9 percent, you have 0.1 percent of "allowed" unreliability to spend on risky changes. When the budget is spent, you slow down releases and focus on reliability. Toil is manual, repetitive operational work that scales with load; SRE teams cap it and automate it away. How it fits ITIL. Change enablement in ITIL 4 explicitly allows the change authority to be automated. In a CI/CD pipeline, automated tests, security scans, peer review and deployment checks are the control, and the pipeline record is the evidence. That satisfies change control requirements, including NIST CM-3, as long as the records exist and the pipeline itself is under change control. Error budgets are a clean, risk-based release gate. Blameless postmortems are problem management. Where your agency sits. Operations' infrastructure and end-user work is mostly configuration rather than code, so the DevOps lessons apply through standard change models and automation rather than full CI/CD. The Power Platform and the ITSM platform both support pipeline-style deployment between environments, which is one more argument for the test and development environment. What to ask an offeror. "Show me your change failure rate and recovery time for the last year." Teams that can answer quickly usually run well. Music analogy: a band that plays small gigs every week tightens up faster, and recovers from mistakes better, than one that rehearses for a year and plays one big show. The error budget is the number of clams the band can afford before it stops trying new material and goes back to woodshedding.

---

## SIAM: someone has to own the whole service

*04 · Frameworks*

- Customer organization
- the IT office keeps: strategy, governance, architecture, contract authority, risk acceptance
- Service integrator Owns end to end: cross-supplier incidents, one service view, integrated reporting
- Service providers

**Integrator options**

**The test**

- the IT office itself · one prime contractor · a separate integrator. At your agency’s size, the IT office plus a strong prime is typical.

???

Service integration and management, SIAM, is the discipline for delivering services through multiple suppliers as if they were one. It grew out of large outsourcing deals where an organization had a dozen suppliers and no one accountable for the end-to-end result. The SIAM Body of Knowledge is published by Scopism. The three layers. The customer organization keeps the things it must never outsource: strategy, governance, enterprise architecture, contract authority, and risk acceptance. In federal terms, inherently governmental functions and the CO's authority live here. The service integrator owns end-to-end coordination: cross-supplier incident and problem management, one view of service performance, integrated reporting, and the collaboration rules between suppliers. The service providers deliver their individual services. Who plays integrator. Three common models. The customer acts as its own integrator, which needs federal staff with the time and skill. A prime contractor takes the integrator role on top of its own delivery, which is efficient but can create conflicts when the integrator has to judge its own performance against another supplier's. Or a separate integrator is hired, which is usually only worth it at large scale. Your agency’s supplier landscape. Each has its own reporting, escalation paths and incentives. Problems at the boundaries, where an application issue looks like an infrastructure issue, or a Microsoft outage looks like a local fault, are where finger-pointing happens and restore times stretch. The tools that make SIAM work. One ITSM platform as the hub, with every supplier working tickets in the ITSM platform or integrated into it. Collaboration agreements, sometimes called OLAs between suppliers, written into each contract: response to the other supplier's escalation, shared bridges, data sharing. Integrated reporting, so the CIO sees one service view rather than two contractors' dashboards. And a rule for who runs a cross-supplier P1 bridge. Note that you can't impose obligations on one contractor through the other's contract; each contract needs its own clause. Music analogy: a festival. Every band brings its own crew, but the festival needs one stage manager who runs changeovers, one sound company, and one schedule. Without that, every band is great and the festival is chaos.

---

## The federal overlay

*05 / 08 · 05 · Federal*


???

ITIL is guidance; federal requirements are law, policy and contract. This section is about running one process that satisfies both, so the ITSM platform record that runs the work is also the evidence an assessor, an inspector general or a contracting officer needs. Six slides. A map from ITIL practices to their federal anchors. The patch value stream under BOD 26-04, end to end. Inventory as a security control, not bookkeeping. The two meanings of "major incident" and the reporting clocks that come with the federal one. Performance-based contracting under the rewritten FAR Part 37, and how ITIL vocabulary helps write outcomes. What this section doesn't repeat. The Cyber deck covers FISMA, the RMF, BOD 26-04's mechanics, incident response and FedRAMP in depth. The Data deck covers records management and data governance. Here the focus is where those requirements touch the ITSM practices you run. Currency. Federal requirements move faster than ITIL. BOD 26-04's timelines take effect December 7, 2026. The FAR overhaul is in formal rulemaking; agencies are operating under class deviations. Re-check this section every six months. Music frame: playing a union gig. The music is the music, but there are rules about breaks, overtime, recording rights and who can sit in. Good players learn the rules once and then stop thinking about them, because their paperwork is always in order.

---

## One process, two audiences: the anchor map

*05 · Federal*

- ITIL practice
- Federal anchor What it means for you
- Change enablement

**Nist sp 800-53 cm-3, cm-4; bod 26-04**

- Change records are control evidence; patch path fits 3 days
- Configuration and assets
- CM-8; BOD 23-01; MEGABYTE Act
- Inventory is a security control
- Incident management
- NIST SP 800-61 Rev. 3; OMB M-25-04
- Security-relevant incidents leave the desk fast
- Information security

**Fisma; nist rmf (sp 800-37)**

- ITIL runs controls; the RMF assesses them
- Service continuity
- Federal continuity policy; SP 800-34
- IT recovery supports the agency’s plan
- Supplier and service level
- Outcomes and measurable standards
- Service financial
- Cost per service, even where not required
- Measurement and reporting
- Agency performance plans

???

This table is the reason ITIL is worth the effort in a federal agency: most of the work it organizes is also work some federal requirement demands, and a clean process produces the evidence as a by-product. Change enablement. NIST SP 800-53 CM-3 (configuration change control) requires that changes be documented, reviewed, approved and tracked; CM-4 (impact analyses) requires analyzing changes for security and privacy impact before implementation. A the ITSM platform change record with a risk assessment, an approval and a post-implementation review satisfies both. BOD 26-04 adds a clock (next slide). Configuration and asset management. CM-8 (system component inventory) requires an accurate, current inventory within the authorization boundary. BOD 23-01 requires automated asset discovery and vulnerability enumeration on a fixed cycle. The MEGABYTE Act requires software license inventories. Two slides on. Incident management. NIST SP 800-61 Revision 3, published in April 2025, recasts incident response around the CSF 2.0 functions and treats it as part of overall risk management. OMB M-25-04, the most recent annual FISMA guidance, still defines a major incident. The desk's job is recognizing when an IT incident might be a security incident and handing it off fast with evidence intact. Information security. FISMA assigns responsibility; the NIST RMF (SP 800-37) is the process; the CISO owns it. ITIL's information security practice runs many of the operational controls the RMF selects and assesses. Service continuity. Federal continuity policy requires agencies to sustain essential functions; NIST SP 800-34 is the contingency planning guide for information systems. IT recovery objectives should trace to the agency's continuity plan and business impact analysis. Supplier and service level management. The rewritten FAR Part 37 makes performance-based acquisition the default, with measurable standards. Service financial management. OMB Circular A-11 Section 55 covers IT investment reporting; Technology Business Management applies to 26 large agencies. Measurement and reporting. Practical move: when you design a the ITSM platform form or a process step, ask "what evidence will an assessor need?" and capture it in the same step. Retrofitting evidence is expensive; capturing it at the source is free. Music analogy: the same performance serves the live audience and the recording. If the band mics everything properly from the start, there's a release-ready recording without a second session.

---

## The patch value stream under BOD 26-04

*05 · Federal*

- 1. Detect
- 2. Prioritize
- 3. Route
- 4. Deploy
- 5. Validate
- 6. Record
- Scanners, KEV catalog, vendor advisories
- Risk-based, SSVCaligned; security sets it
- Standard change, or emergency for the worst
- Rings: pilot, then everyone
- Rescan; service health checks
- Evidence lands in
- the ITSM platform
- Jun 10
- Dec 7
- BOD 26-04 issued; replaces BOD 19-02 and 22-01
- Timelines in force for agencies and FedRAMP providers

**Who does what**


???

Section 02 made the case for standard change models. This slide is the whole patch value stream, end to end, because BOD 26-04 judges the outcome (was it fixed in time?) not any single step. What BOD 26-04 does. CISA issued it on June 10, 2026, titled "Prioritizing Security Updates Based on Risk." It supersedes BOD 19-02 and BOD 22-01. Instead of fixed timelines by severity score, it assigns graduated remediation timelines using a risk model aligned to SSVC (Stakeholder-Specific Vulnerability Categorization), weighing factors such as active exploitation, whether exploitation can be automated, technical impact and exposure. The most dangerous vulnerabilities get as little as three days, with forensic triage; the lowest-risk can be deferred. Agencies must meet the timelines by December 7, 2026. FedRAMP adopted matching vulnerability detection and response rules for cloud providers by the same date. The Cyber deck has the timeline table and the triage requirements. The six steps. Detect: vulnerability scanners, CISA's Known Exploited Vulnerabilities catalog, and vendor advisories. Prioritize: the CISO's team applies the risk model; this is a security decision, not an operations one. Route: most patches flow through a pre-approved standard change; the worst cases use the emergency path. Deploy: in rings, a pilot group first, then everyone, so a bad patch hurts ten users rather than 750. Validate: rescan to prove the vulnerability is gone, and check service health. Record: every step leaves evidence in the ITSM platform, linked to the vulnerability. Where time gets lost. Not in deployment, which is mostly automated through endpoint management, WSUS-style tooling and cloud consoles. Time gets lost between steps: a scan result waiting for someone to triage it, a change waiting for a board, a deployment waiting for a window, and validation nobody does. That's the value stream lesson from section 03 applied to security. Your agency specifics. Check that the approved windows, and the change classification, allow a three-day turnaround for the highest-risk cases. Edge and network devices often need maintenance windows and vendor coordination; they're where the three-day clock is hardest. Write the emergency patch procedure now and dry-run it with the CISO's team before a real KEV forces the test. Leadership framing: "The directive measures the result. Our job is a path where the fastest route is also the documented one." Music analogy: a broken string mid-tour. You don't call a band meeting. The tech has spare strings, a procedure, and the authority to swap them between songs, and writes it in the gear log afterward.

---

## Inventory is a security control, not bookkeeping

*05 · Federal*

**Nist sp 800-53 cm-8**

**Cisa bod 23-01**

- Know every component
- Discover on a clock
- An accurate, current inventory inside the authorization boundary.
- Automated asset discovery every 7 days; vulnerability enumeration every 14.

**Megabyte act (2016)**

**Samosa act · pending**

- Know every license
- Assess software management
- Software license inventory, tracked to use and to savings.
- Passed the House (H.R. 5457) in Dec 2025; check Senate status.
- You can’t patch, protect or license what you don’t know you have. The CMDB and asset records are where all four requirements meet.

???

Every major federal security initiative of the last decade starts with an inventory. The ITIL practices that maintain it, service configuration and IT asset management, are therefore security practices in federal IT, whatever the org chart says. NIST SP 800-53 CM-8, system component inventory. Requires an inventory of system components that accurately reflects the system, is at the level of granularity needed for tracking and reporting, and is reviewed and updated on a defined frequency. Enhancements cover automated maintenance and detecting unauthorized components. Your CMDB, if accurate, is most of the evidence. CISA BOD 23-01, improving asset visibility and vulnerability detection. Issued in October 2022, it requires federal civilian agencies to perform automated asset discovery every 7 days across their IP space and to initiate vulnerability enumeration across all discovered assets, including roaming devices, every 14 days. BOD 26-04 replaced the older patching directives, not this one; confirm current status alongside BOD 26-04 in the Cyber deck. The operational point: discovery data should feed the CMDB, and any device discovery finds that the CMDB doesn't know about is either an unauthorized device or a data quality failure. Both are worth knowing. The MEGABYTE Act of 2016 requires agencies to maintain a comprehensive inventory of software licenses, track usage, and report savings. Software asset management in the ITSM platform, reconciled against procurement data, is the natural place for it. The SAMOSA Act, Strengthening Agency Management and Oversight of Software Assets, would require independent assessments of agency software license management and consolidation plans. The House passed it as H.R. 5457 in December 2025; a Senate version was introduced in 2025. As of this deck it isn't law. If it passes, ITAM becomes a reported, assessed capability with budget implications. How they fit together. One set of records, the CMDB and the asset register, linked and reconciled against discovery and procurement, answers all four. Three separate spreadsheets for security, licensing and the help desk answer none of them well. Practical test. Pick ten devices at random from a discovery scan and find each in the CMDB with the right owner and location. Pick ten installed software titles and find the license entitlement. The hit rate is your real inventory accuracy, whatever the dashboard says. Say so in the justification; it strengthens the case. Music analogy: the band's gear list for customs. If it's wrong, the gear sits at the border and there's no show, however good the band is.

---

## Two kinds of “major incident”: don’t mix them up

*05 · Federal*

**Itil major incident**

**Fisma major incident**

- Big service impact
- Significant security harm
- Defined by your own policy
- Defined by OMB (M-25-04)
- Triggers the major incident procedure
- Triggers reporting outside the agency
- Example: email down for everyone
- Example: a large breach of PII
- Clock: your SLAs and update cadence
- Clock: set by OMB and CISA
- 1 hour
- 1 hour
- 7 days
- Any incident to CISA, from identification
- A major incident to CISA and OMB, from determination
- A major incident to Congress

???

The same two words mean different things in ITIL and in FISMA, and mixing them up causes real problems: either over-reporting service outages as security events, or missing a reporting clock because "it wasn't a big outage." ITIL major incident. Defined by your own organization's policy, based on service impact. It triggers the major incident procedure from section 02: named roles, one bridge, a fixed update cadence. Example: email down for the whole agency, or the core network out. No outside reporting is required unless the cause is a security incident. FISMA major incident. FISMA directs OMB to define the term, and OMB does so in its annual guidance; M-25-04 from January 2025 is the most recent, since no FY 2026 FISMA guidance was issued. A major incident is one likely to result in demonstrable harm to national security interests, foreign relations, the economy, public confidence, civil liberties, or public health and safety. Breaches involving the personal information of 100,000 or more people are major incidents by definition. The determination is made by the agency, led by the CISO and leadership, not by the service desk. The clocks. CISA's federal incident notification guidelines ask agencies to report all incidents within one hour of identification by the agency's CSIRT, SOC or IT department. If an incident is determined to be major, agencies notify CISA and OMB within one hour of that determination and Congress within seven days. These are the CISO's clocks, but they start with what the desk notices. How they overlap. A ransomware attack that encrypts file shares is both: an ITIL major incident (massive service impact) and possibly a FISMA major incident (security harm, depending on scope). A quiet exfiltration of sensitive data may be a FISMA major incident while users notice nothing at all, so it never trips the ITIL procedure. And a full M365 outage caused by Microsoft is an ITIL major incident and not a security incident at all. What Operations must get right. A clear trigger list for when the desk routes to security: unexpected MFA prompts, suspicious mailbox rules, malware alerts, reports of phishing clicks, unusual data movement. An OLA with the CISO's team on handoff time and evidence preservation. And vocabulary discipline in communications: say "ITIL major incident" or "service major incident" in operations updates, and leave "major incident" in the FISMA sense to the CISO. Music analogy: "the show was cancelled" can mean the singer has a cold or the venue failed a fire inspection. The first is a band problem. The second involves the fire marshal, and there's paperwork with a deadline.

---

## Contracting for outcomes: ITIL is the vocabulary

*05 · Federal*

**Rewritten far part 37 · order of precedence**

**Itil gives you**

- First
- Firm-fixed-price, performance-based
- Second
- Performance-based, not firm-fixed-price
- Last
- Not performance-based
- Outcome words: restored, fulfilled, changed safely
- Measures with definitions
- Practice scope without dictating method

**Roles**

- CO: the only one who changes terms
- Describe the required outcome, not how to achieve it or the level of effort, with measurable standards where practicable
- COR: monitors and documents
- Program office: owns requirements

???

The FAR overhaul rewrote Part 37, service contracting. Agencies are operating under class deviations (DoD's took effect February 1, 2026), and the formal rule, FAR Case 2026-002, was proposed in June 2026. The direction is clear: performance-based acquisition is the default, and firm-fixedprice performance-based contracts come first. The order of precedence. Under the rewritten 37.101-1, agencies use performance-based methods to the maximum extent practicable, in this order: a firm-fixed-price performance-based contract or order; a performance-based contract or order that isn't firm-fixed-price; and only then one that isn't performance-based. Under 37.102-1, a performance-based contract must include a performance work statement. When an offeror proposes standards in response to a SOO, the agency evaluates them, identifies how performance will be assessed, and incorporates both into the contract. Where ITIL helps. ITIL gives you outcome language that contractors already understand: service restored, request fulfilled, change implemented without unplanned impact, knowledge current. It gives you measures with definitions. Be careful not to slide into describing how: "follow ITIL processes" is method; "restore P1 incidents within X hours, measured from Y to Z in the ITSM platform" is outcome. The QASP. The quality assurance surveillance plan says how the government will check performance. Record results monthly; they're the basis for past-performance evaluations. Roles. Only the contracting officer changes the contract's terms. The COR monitors, documents, and recommends. The program office owns the requirement. Keep the lines clean, especially when a contractor asks the COR to "just approve" a scope change. SOObased vehicles. Music analogy: hiring a session player. You specify the song, the key, the feel and the deadline, not which fingers to use. And you listen to the take, not to the practice session.

---

## the ITSM platform as the single system of record

*WHAT IT DOES WELL · 05 · Federal*

- Add restore and fulfilment targets
- Clear P1–P4 definitions and update cadence
- Measure problem management
- Standard, normal, emergency changes defined
- Fit patch windows to BOD 26-04
- Measured CMDB and knowledge accuracy
- “Current ITIL version,” not “ITIL v4”
- XLAs as a baseline year
- Monthly narrative with corrective actions

???

It's a solid document. What it does well. the ITSM platform is the system of record for everything, with no work without a ticket except declared major incidents, reconciled within a day. That single rule makes every metric possible. Priorities P1 to P4 are defined in plain language, with update cadences by priority and written justification for P1 and P2. Change types are defined the ITIL way, with a dedicated change manager and documented back-out plans. Shift-left from Tier II to Tier I is a written requirement. Monthly SLA and KPI dashboards come with narrative analysis and corrective actions. And training explicitly includes the ITIL framework. Each of these has a slide earlier in the deck. Restore and fulfilment targets. Today's service desk and infrastructure SLAs are acknowledgment times. Restore time is a KPI. After two years of data, set restore targets by priority, as percentiles. Measure problem management. It's described in section 2.4 but has no measures. Fit patch windows to BOD 26-04. "Patched within approved windows" only works if the windows meet the directive's timelines. Version language. Section 1.12.2 lists "ITIL v4 Framework" training. Write "the current version of ITIL." XLAs as a baseline year. Report first, then target. Cross-contractor incidents need a rule for who runs the bridge and how fast each contractor responds to the other's escalation. Put matching clauses in both contracts. Raise the CMDB bar. Start now. Percentile reporting, problem metrics, pairing measures and an experience baseline can all be added to the monthly report through the COR without a contract modification, as long as they don't change the contractor's obligations. Music analogy: the band's first album was good. For the second, you know which songs the crowd sings along to and which ones they go to the bar during. Keep the singalongs, rework the bar songs.

---

## Tools and AI

*06 / 08 · 06 · Tools And Ai*


???

Four slides. A map from ITIL practices to the ITSM platform capabilities, since that's your agency’s platform of record. Where AI helps in service management today and where it goes wrong. How to govern AI features inside ITSM, including what Version 5's new AI Governance module covers. The principle running through it: a tool doesn't implement ITIL. the ITSM platform can enforce a workflow, but it can't decide what the workflow should be, and it can't make data accurate. AI raises the stakes on that: an assistant that answers from a stale knowledge base gives wrong answers faster and more confidently than any human. Version 5 calls itself AI-native: written assuming AI is part of how work is done and governed. In practice that means three things for an operations director. Treat AI features as services and products with owners, measures and lifecycles. Treat AI agent actions as changes and requests, with the same records and controls as human ones. And govern AI use deliberately, which is what the AI Governance module and your agency's AI policy are for. The AI deck covers how models and agents work and the federal AI policy landscape. This section stays on the ITSM application. Music frame: new gear. A looper pedal or an AI mastering tool can make a good player sound great and a sloppy one sound sloppy at scale. Learn the instrument before you trust the pedal.

---

## Where each practice lives in the ITSM platform

*06 · Tools And Ai*

- ITIL practice
- the ITSM platform capability
- Incident, major incident
- Incident Management, Major Incident Management
- Problem
- Problem Management, with known error articles
- Change, release
- Change Management (models, CAB workbench), Release
- Service request, catalog
- Service Catalog, Request Management, Flow Designer
- Knowledge
- Knowledge Management
- Configuration
- CMDB, Discovery, Service Mapping
- Assets
- Hardware and Software Asset Management
- Service level
- SLA definitions, Performance Analytics
- Monitoring and event
- Event Management (ITOM)

???

the ITSM platform is your agency’s system of record for IT operations, and it was built around ITIL, so the mapping is close to one to one. Incident and major incident. Core ITSM incident management, with a major incident workbench for running bridges and communications. Link incidents to CIs and to changes; that linkage is what makes "check recent changes first" a one-click step. Problem. Problem records with root cause and fix fields, and known error articles that publish the workaround to the knowledge base. Link incidents to their problem so repeat counts are automatic. Change and release. Change requests with change models and standard change templates (section 02's lever), risk assessment, conflict detection against the change schedule, and the CAB workbench for running board meetings. Release management groups changes into releases. Service request and catalog. The service catalog, request items and fulfilment tasks, with Flow Designer for automation. Most catalog speed problems are flows that run tasks in sequence when they could run in parallel. Knowledge. Knowledge bases with templates, approval workflows, feedback, and usage tracking. KCS-style flagging and "create article from incident" support the Solve loop. Configuration. The CMDB, populated and kept current by Discovery and, for application-level relationships, Service Mapping. Assets. Hardware Asset Management and Software Asset Management, linked to CMDB records. SAM is where MEGABYTE Act reporting can come from. Service level. SLA definitions with start, pause and stop conditions, which is where the "six things every target needs" from section 02 become configuration. Performance Analytics handles trends and can compute percentiles. Monitoring and event. Event Management correlates alerts from monitoring tools into actionable events and incidents. Platform cadence. the ITSM platform ships two family releases a year, and staying within supported versions means regular upgrades. Licensing caution. Many of the newer capabilities, including Now Assist generative AI features and AI agents, depend on specific license tiers. Music analogy: the ITSM platform is the DAW. Every track has a lane, and the routing is powerful. But the DAW won't write the song, and a session full of unlabeled tracks is unusable no matter how good the software is.

---

## AI in service management: useful now, risky in specific ways

*06 · Tools And Ai*

**Works well today**

**Goes wrong when**

- Summarizing long tickets and bridges
- Knowledge is stale: confident wrong answers
- Suggesting category and assignment
- Tickets hold PII it shouldn’t see
- Drafting articles from resolved tickets
- It acts without a record or a limit
- Answering users from good knowledge
- Nobody measures its accuracy
- Correlating alerts into one event
- Licensing costs weren’t checked
- Treat an AI agent’s action like a person’s: least privilege, an approval where a human would need one, and a ticket that records what it did.

???

AI in ITSM is past the demo stage. Most major platforms, the ITSM platform included, ship generative features and agent capabilities, usually behind specific license tiers. The useful question isn't whether to use AI but where it's reliable and what controls it needs. What works well today. Summarization: condensing a long ticket history or a two-hour P1 bridge into a handoff note. This saves real time and errors are easy to spot. Classification and routing: suggesting category, assignment group and priority from the description, with a human confirming. Knowledge drafting: generating a first-draft article from a resolved ticket's notes, which a technician edits and publishes; this attacks the biggest barrier to knowledge capture, which is the writing. User-facing answers: a virtual agent answering "how do I" questions from the knowledge base, which only works if the knowledge is good. Event correlation, often called AIOps: grouping hundreds of related alerts into one event so the on-call engineer sees a cause, not a flood. Where it goes wrong. Stale knowledge: generative answers sound authoritative whatever the source quality, so a wrong article becomes a wrong answer at scale. Privacy: tickets contain names, phone numbers, and sometimes PII and sensitive details; AI features must respect the same data handling rules, and the data shouldn't leave the authorized boundary. Unrecorded action: an agent that resets passwords or grants access without a ticket breaks your audit trail and your controls. Unmeasured accuracy: if nobody checks how often the suggested category is right, you don't know whether it helps. Cost: AI features are often priced separately, and usage can grow faster than budgets. Agents raise the bar. An AI assistant that suggests is low risk; a human decides. An AI agent that acts, resetting an MFA method, provisioning access, restarting a service, needs the same controls a person would: least privilege, approval where a human would need one, identity verification for user-affecting actions, and a the ITSM platform record of every action. In ITIL terms, agent actions are changes and requests, and they go through change enablement and service request management like anything else. The AI deck covers how agents work and why reliability falls off on longer tasks. ITIL guiding principle check. "Optimize and automate": optimize first. An AI layer on a messy process makes the mess faster. ITIL 4 also warns against automation that removes the ability for people to intervene; keep a manual path and a kill switch. Federal note: every AI feature you turn on is likely an AI use case under agency policy, with inventory and governance obligations. Next slide. Music analogy: auto-tune. On a good singer it's invisible polish. On a bad take it's an obvious robot. And if you let it run with no one listening, it'll confidently "correct" the blue notes that made the performance.

---

## Governing AI in ITSM

*06 · Tools And Ai*

**For every ai feature you turn on**

**Itil ai governance (version 5)**

- Owner who answers for it
- Data it reads and where it goes
- Actions it can take, and limits
- Human review points
- Accuracy measured monthly
- Off switch and manual fallback
- Extension module; ITIL 4 or V5
- Foundation first
- 2-day course; 40 questions in 90 minutes
- AI Capability Model
- AI Governance Model and Improvement Model
- Regulation, suppliers, third-party AI

**Federal layer**

- Agency AI policy and use-case inventory apply. Official documents follow EO 14434 terms; see the AI deck.

???

Governance for AI inside ITSM doesn't need to be elaborate, but it does need to exist before features are switched on, not after the first bad answer. Six questions per AI feature. Owner: one named person who answers for the feature's behavior and value. Data: what it reads (tickets, knowledge, CMDB, user profiles), and whether any data leaves your agency’s authorized boundary, for example to a model hosted outside the ITSM platform instance. Actions: what it can do, from "suggest" to "act," and the limits on acting. Human review: where a person confirms before something happens. Accuracy: a monthly check, such as a sample of suggestions compared with what the technician chose, or a sample of virtual agent answers checked against the knowledge base. Off switch: how to turn it off quickly, and the manual process that takes over. Write those six answers into a short record per feature, store it with the ITSM platform configuration, and review it when the feature or the license changes. It's the AI version of a catalog item owner review. The federal layer. Federal agencies have AI governance obligations from OMB policy, including AI use-case inventories and risk practices for higher-impact uses. Most ITSM AI features are low-impact productivity uses, but they still count as use cases and should be inventoried. As noted in the Cyber and AI decks, EO 14434 (September 2026) directs agencies to use "Super Intelligence" and "SI" instead of "AI" in official, nonstatutory documents; this deck keeps "AI" for readability, but anything lifted into a your agency policy or plan should follow the order. The AI deck covers the policy landscape in detail. ITIL AI Governance (Version 5). PeopleCert's new extension module, the only extension in the Version 5 scheme. Prerequisite: ITIL 4 Foundation or Version 5 Foundation. Training providers list it as a two-day course with a 40-question, 90-minute closed-book exam. PeopleCert's description covers AI fundamentals and governance; benefits and risks; the ITIL AI Capability Model for responsible, scalable adoption; the ITIL AI Governance Model and AI Governance Improvement Model for assessing, establishing and maintaining governance; how regulation shapes AI governance; and how it integrates with other frameworks, suppliers and third-party AI. For someone on a Deputy CIO track who is also responsible for AI in operations, it's arguably the most directly useful module in the new scheme. How it connects to your agency roles. the application development team owns AI development; Operations owns AI in operations, such as Tier 0, ticket summarization and AIOps. Both need the same governance pattern, and the agency's AI governance body is where the inventory lives. Agreeing one record format across both lanes avoids two incompatible inventories. Music analogy: rules for using samples. Know where every sample came from, who owns the rights, how it's used in the track, and be able to pull it from the mix if the clearance falls through. Labels that skip this end up in court; labels that do it release freely.

---

## Build the knowledge base

*NOW · 06 · Tools And Ai*

**After the hold**

- Virtual Agent in Teams

**Year one**

- Baseline deflection

**Year two**

- Set targets
- Content work, not platform work; not blocked by the development hold
- Meet users where they already work
- Measure, don’t promise a percentage
- From the baseline, not a guess

**Escalation**

**Knowledge ownership**

**Licensing**

- A failed bot hands off to a ticket that keeps the user’s words and inherits the normal SLA
- Every article the bot can serve has an owner and a review date
- Confirm which Virtual Agent and Now
- Assist features your agency’s tier includes

???

Why Teams. Users live in Teams all day; almost nobody wakes up wanting to visit the service portal. Meeting them where they already are is the difference between a self-service channel that gets used and one that gets a dozen sessions a month. Why knowledge first. A virtual agent is only as good as the answers it can find. Knowledge work is content work, not platform development, so it can proceed during the post-upgrade development hold. By the time the bot can be built, it has something worth serving. Start with the top 20 request and incident types by volume, written for users, not technicians: plain words, screenshots, one task per article. Sequencing honestly. Knowledge now; Virtual Agent build after the hold lifts; the first year establishes a deflection baseline rather than promising a number. Measure deflection properly. An issue counts as deflected when it's resolved without a human, confirmed by the user or by the absence of a follow-up contact within a day or two. Bot sessions opened is not deflection. Track containment (sessions resolved in the bot), escalation rate, and repeat contacts after a bot session. The escalation rule. A bot that fails and then makes the user wait is worse than no bot. When the Virtual Agent can't resolve something, it should open a ticket automatically, carry over the conversation so the user doesn't repeat themselves, and inherit the normal response SLA. That's one line in the talking points and one design requirement in the build. Knowledge ownership. Someone owns each article the bot can serve, with a review date. Otherwise the bot will confidently serve stale answers, which is the CMDB lesson again on a different table. Licensing. Virtual Agent capabilities and Now Assist generative features depend on license tier. Year-one data makes that target defensible. Music analogy: teaching the crowd the chorus, again. The bot is the lyric screen behind the band. It helps only if the lyrics on it are right, and if the screen goes blank, the singer still has to carry the song.

---

## Certification

*07 / 08 · 07 · Certification*

- The Version 5 scheme in one picture, and the shortest path from whatever ITIL certificates you already hold.
- The Version 5 scheme · Getting there from ITIL 4

???

Two slides: the Version 5 qualification scheme, and transition paths from ITIL 4 and v3, with exam formats and renewal rules. Why it matters to you personally. Your FY25 performance plan named ITIL Strategic Leader as a stretch goal, and the Deputy CIO and CIO track rewards the strategy and governance content that Strategic Leader covers. The scheme changed in 2026, so the path to Strategic Leader changed too. Good news: it got shorter. Why it matters for the contract. Knowing the scheme lets you ask for the right certifications for the right roles (Foundation for the desk, a Practice Manager module for leads) without naming a version that will be retired. Key dates. Version 5 released February 12, 2026. PeopleCert's current plan is to sunset ITIL 4 modules on December 31, 2027, with the Foundation Bridge retiring the same day and exam voucher validity dates for ITIL 4 still to be announced. Certificates already earned stay valid, subject to the three-year renewal cycle. A caution on sources. The scheme facts below come from PeopleCert and its accredited training partners' published FAQs and course pages. Transition routes in particular have been described slightly differently by different partners as PeopleCert finalized them. Confirm on PeopleCert's own pages before you book. Music frame: grade exams. Nobody plays better because they passed Grade 8, but the syllabus makes you learn the pieces you'd otherwise skip, and the certificate opens doors at auditions.

---

## Version 5: one entry, three designations, one extension

*07 · Certification*

- ITIL Master · all three designations

**Practice manager**

**Managing professional**

**Strategic leader**

- One of: Monitor, Support and Fulfil · Plan, Implement and Control · Collaborate, Assure and Improve
- Product · Service · Experience
- For service owners and operations managers
- Strategy
- For directors on a CIO track
- ITIL Transformation · required for every designation, taken once

**Entry**

**Extension**

- ITIL Foundation (Version 5), or ITIL 4 Foundation already held
- AI Governance, open to any Foundation holder

???

Read the picture bottom up. Entry. ITIL Foundation (Version 5) is the single entry point. If you already hold ITIL 4 Foundation, you don't retake it; PeopleCert recognizes it as the prerequisite for all Version 5 advanced modules. ITIL v3 Foundation holders are advised to take the Version 5 Foundation, because the content changed substantially. ITIL Transformation. Required for every designation, and you only take it once; it counts across all of them. That's a deliberate design choice: Transformation is the "how to lead change using ITIL" content that everyone above Foundation should share. Practice Manager. Foundation plus Transformation plus one of three practice modules. You choose one; you don't need all three. Monitor, Support and Fulfil covers service desk, incident, problem, service request, and monitoring and event. Plan, Implement and Control covers change enablement, deployment, release, service configuration and IT asset management. Collaborate, Assure and Improve covers relationship, supplier, service level, continual improvement and information security. Managing Professional. Foundation plus Transformation plus three modules: Product, Service and Experience. This is the practitioner-manager track for people running services and products end to end. Strategic Leader. Foundation plus Transformation plus Strategy. Two modules beyond Foundation. This is the leadership track, and it's shorter than ITIL 4's version. Master. Awarded to those who hold all three designations. AI Governance. The only extension module in Version 5; ITIL 4's extension modules (such as business relationship management, IT asset management, cloud and sustainability) are no longer part of the scheme, their content absorbed into the broader guidance. AI Governance requires ITIL 4 or Version 5 Foundation. Exams. Foundation, the three practice modules and AI Governance are closed-book multiple choice. Product, Service, Experience, Strategy and Transformation are planned as open-book. Foundation is 40 questions in 60 minutes with a 65 percent pass mark, the same format as ITIL 4 Foundation. PeopleCert lists Foundation exam bundles from US$690; accredited training or official e-learning is required for the advanced modules but not for Foundation. Practice guides. All 34 Version 5 practice guides are available through PeopleCert Plus membership; the 15 practices in the Practice Manager modules also come with those courses. Music analogy: a conservatory. Everyone takes theory one (Foundation) and the shared ensemble course (Transformation). Then you pick a major: performance (Practice Manager), production (Managing Professional), or conducting (Strategic Leader). Do all three and they give you the fancy title.

---

## Getting to Version 5 from what you hold

*07 · Certification*

- You hold
- To reach Version 5
- ITIL 4 Foundation
- Nothing; it counts as the prerequisite
- ITIL 4 Practice Manager
- Take ITIL Transformation (V5)
- ITIL 4 Strategic Leader
- Take ITIL Transformation (V5)
- ITIL 4 Managing Professional or Master
- Managing Professional Transition (V5) course and exam
- Partway to ITIL 4 Strategic Leader
- Skip Direct, Plan and Improve; take Digital and IT Strategy, then Transformation
- ITIL v3 Foundation only
- Take Version 5 Foundation
- 3 years
- Renew by date on every certificate

**Renew by**

**Deadline**

- 20 CPD points a year for 3 years via PeopleCert Plus, another ITIL certificate, or a retake
- Finish ITIL 4 modules before Dec 31, 2027

???

PeopleCert designed the transition so existing ITIL 4 investment carries forward. ITIL 4 Foundation: nothing to do. It's a valid prerequisite for every Version 5 advanced module. There's also an optional ITIL Foundation Bridge (Version 5), a short exam covering only the Version 5 updates (20 questions in 30 minutes), for ITIL 4 certificate holders who want the new Foundation material; it's scheduled to retire with the ITIL 4 modules at the end of 2027. ITIL 4 Practice Manager: take ITIL Transformation (Version 5) to upgrade the designation. ITIL 4 Strategic Leader: take ITIL Transformation (Version 5) to upgrade. ITIL 4 Managing Professional, or ITIL 4 Master: take the Managing Professional Transition (Version 5) course and exam, which covers the new and updated content in Product, Service, Experience and Transformation. PeopleCert also offers this route to ITIL v3 Expert and Master holders. No sunset is planned for the MP Transition. Partway to ITIL 4 Strategic Leader: one training partner's guidance is to skip ITIL 4 Direct, Plan and Improve, take ITIL 4 Leader: Digital and IT Strategy, then ITIL Transformation to land on Version 5 Strategic Leader. Alternatively, go straight to the Version 5 path: Strategy plus Transformation on top of your Foundation. Compare cost and time; the Version 5 path is two modules. Your situation. Your FY25 plan set beginning ITIL Strategic Leader as the "exceeding" level and completing it as "role model." Under Version 5 that goal is now Foundation (held, if you have ITIL 4 Foundation), plus ITIL Strategy, plus ITIL Transformation. Adding AI Governance would round it out for an AI-in-operations lane. If you've already passed either ITIL 4 Strategic Leader module, check the transition route above before choosing. Renewal. Version 5 certificates, like ITIL 4's, carry a three-year renew-by date. Options: join PeopleCert Plus and log 20 CPD points a year for three consecutive years; earn another certification from the ITIL suite; or retake the same certification. A transition or new module typically renews the set. Deadline. PeopleCert's current plan retires all ITIL 4 modules on December 31, 2027. If you're midway through an ITIL 4 path, finish before then or switch to Version 5 now. Voucher validity dates for ITIL 4 exams are still to be announced, so don't buy ITIL 4 vouchers far in advance. For contractors. Both ITIL 4 and Version 5 certificates should satisfy it. Music analogy: switching from one exam board to another mid-way. Your grades carry over; you sit one bridging paper, not the whole syllabus again.

---

## Leading it

*08 / 08 · 08 · Leading It*

- Watch list

???

The last section turns the reference material into a leadership agenda. Seven slides. Roles: the difference between a practice owner, a practice manager, a service owner and a performer, and a workable split for your agency’s operations core. A 90day plan. The myths you'll hear in meetings and what's actually true. Questions that separate a strong ITSM contractor or vendor from a weak one. And the watch list of dates and decisions coming in 2026 through 2028. The through-line is the same as the other decks: start where you are, declare baselines before claiming improvement, keep the federal evidence in the same records as the work, and protect the people doing the work from metrics that punish them for the wrong things. A reminder on scope. The 90-day plan and the roadmap are proposals, not assigned requirements. They're sequenced around what's due soonest (BOD 26-04 on December 7) and what earns credibility fastest (baselines and a few visible standard changes). Music frame: bandleading. Knowing every part is necessary but not sufficient. The bandleader picks the setlist, sets the tempo, calls the changes, and decides who solos. That's this section.

---

## Roles: owner, manager, performer

*08 · Leading It*

- Role
- Accountable for A workable your agency split
- Practice owner
- The practice’s design, policy and results
- Operations Director for the operations core
- Practice manager
- Running it day to day, coaching performers
- Federal leads, such as the Service Desk Lead
- Performer
- Doing the work to standard
- Service owner
- One service end to end, across practices
- Named per major service: email, network, the ITSM platform
- Oversight
- Contract performance and evidence
- COR, with the CO for any change in terms
- Peer owners
- Their own practices
- CISO for security; the application development team for software development
- Write it down once. Undocumented decision rights between co-equal directors are where practices stall.

???

ITIL distinguishes several roles that often get blurred, and blurring them is where accountability disappears. The practice owner is accountable for the practice as a whole: its design, its policy, its integration with other practices, and its results. There should be one per practice. For the operations core (service desk, incident, problem, request, change, configuration, assets, monitoring), that's naturally the Operations Director. The practice manager runs the practice day to day: assigns work, coaches performers, watches the metrics, raises issues to the owner. The service owner is accountable for one service end to end, across every practice it touches. Email, the network, the ITSM platform itself, the end-user device service. Without service owners, cross-practice problems fall between chairs: the incident team restores, the change team approves, and nobody asks why email has had six P2s this quarter. Naming owners for the top five or six services is cheap and effective. Oversight is the COR's role: monitoring contract performance, documenting evidence, and recommending action, with the contracting officer the only one who can change terms. Peer owners own their own practices: the CISO owns information security management; the application development team owns software development and much of release for applications. The interfaces between those practices and yours are where OLAs belong. The table is a workable split, not an assigned structure. Its value is in writing it down. In an office with four coequal directors, unwritten decision rights are a known source of friction: who decides the CMDB data model, who approves a change to a shared the ITSM platform table, who owns the onboarding value stream when it spans HR technical debt that the application development team must fix. A one-page RACI agreed among the directors and signed by the CIO prevents months of polite stalemate. A RACI tip: one A per row. "Accountable" shared by two people means accountable by nobody. Music analogy: the composer owns the score (practice owner), the section leader runs rehearsals (practice manager), the players play (performers), and the producer owns the finished album across every song (service owner). When the producer and the composer disagree, someone needs to have said in advance whose call it is.

---

## A maturity roadmap sized for your agency

*08 · Leading It*

**Stage 1**

**Stage 2**

**Stage 3**

**Stage 4**

- Stabilize
- Standardize
- Measure
- Automate
- Clean categories and priorities · every contact a record · baselines declared
- Standard change models · catalog tuned · knowledge owned · monthly problem review
- Percentiles · paired metrics · experience baseline · value streams mapped
- Tier 0 · automation register delivered · AIOps · discoveryfed CMDB

**The order matters**

- WHERE your agency LIKELY IS
- Automating before standardizing makes bad outcomes faster.
- Measuring before stabilizing measures noise.
- Mostly stage 1 to 2, with stage 4 pieces in flight. Confirm with the baseline, not a guess.

???

Formal maturity models exist, including PeopleCert's own ITIL Maturity Model, and they're useful for external assessments. For running the shop, four plain stages are easier to plan against and explain to leadership. Stage 1, stabilize. Every contact becomes a record. Categories and priorities are consistent enough to report on. The basic SLAs are met most months. Baselines for the key measures are declared in writing. Without this, nothing later is trustworthy. Stage 2, standardize. Routine changes run as standard change models. The catalog's top items are clean, fast, and owned. Knowledge articles have owners and review dates, and the desk searches before troubleshooting. A monthly problem review works the top repeat causes. This stage is where most of the efficiency gains come from, and it's mostly unglamorous. Stage 3, measure. Time-based measures are reported as medians and 90th percentiles. Speed measures are paired with quality measures. An experience baseline exists. One or two value streams, onboarding first, have been mapped end to end with timestamps. Reporting explains causes rather than restating numbers. Stage 4, automate. Tier 0 self-service resolves real volume. Items from the automation register (your AUTO-### list) are delivered and measured. Event correlation reduces alert noise. The CMDB is fed by discovery and reconciled automatically. AI features are governed per section 06. The order matters. Automating before standardizing makes bad outcomes faster and harder to change; that's the "optimize and automate" principle. Measuring precisely before stabilizing measures noise. Stages overlap in practice, and that's fine, but each stage's foundation should be in place before you lean on the next. Where your agency likely is. That's a common and healthy pattern, as long as the stage 4 pieces rest on stage 2 foundations: Tier 0 on owned knowledge, automation on standardized flows. Confirm the assessment with the baseline data rather than by feel. How to use it with leadership. One slide: four stages, where we are, what moves us to the next stage this year, and what it costs. It frames investment requests as sequence rather than wish list. Music analogy: learning a new piece. First you get the notes right (stabilize). Then the fingering and the phrasing are consistent every time (standardize). Then you record yourself and listen critically (measure). Only then do you speed it up to performance tempo (automate). Skipping ahead is how you get a fast, sloppy performance.

---

## BOD 26-04 timelines in force; patch path tested

*DEC 2026 · 08 · Leading It*

**Q1 2027**

- Percentiles, pairing and problem metrics added to monthly reports
- 2027
- Baseline year: experience index, standard change share, CMDB sample accuracy

**Dec 2027**

- ITIL 4 exam modules sunset (current plan)
- 2028

**Nov 1, 2028**

**Dec 31, 2028**

**The principle**

- 2027 baseline

**Start without a mod**

- Reporting changes through the COR, as long as obligations don’t change

???

The timeline. December 2026: BOD 26-04's timelines take effect, so the patch path needs to be proven, which also produces your first standard change data. First quarter 2027: add percentile restore times, paired quality measures, and problem management metrics to the monthly report. These are reporting changes the COR can request without changing the contractor's obligations. 2027 becomes the baseline year for the new measures: an experience index from surveys, the share of changes running as standard changes, CMDB accuracy measured by random sampling, and fulfilment time by catalog item. The principle. That makes targets defensible to offerors (they can price them), to the contracting officer (they're grounded), and to leadership (you're not inventing numbers). It's the anti-ratchet discipline at contract scale. This deck adds restore targets, BOD 26-04-compatible patch language, version-neutral ITIL wording, and cross-contractor collaboration clauses. Make sure the current contract's knowledge articles, CMDB data, runbooks, scripts and automation code are maintained in government systems in usable form, so transition doesn't depend on the incumbent's goodwill. The knowledge and change model slides are as much about transition insurance as about efficiency. Each month, drop in the dashboard, the narrative, and any notable incident review. In 2028 you'll have the story already written. Music analogy: recording the second album. You don't write it in the studio. You road-test songs for a year, keep the set lists, note which ones land, and walk into the studio knowing what works.

---

## A 90-day plan for the operations core

*08 · Leading It*

**Days 1–30 · baseline**

**Days 31–60 · fix the flow**

**Days 61–90 · lock it in**

- Pull 12 months of the ITSM platform data Five standard change models approved
- Problem records for top 5 repeats
- Percentiles and reopen rate on the dashboard
- List the top 10 normal changes
- Knowledge audit: owners, review dates
- Dry-run the patch path vs BOD 26-04
- P1 comms template published
- Book the next ITIL module
- One-page brief to the CIO
- Day-90 package: declared baselines, five standard changes in use, a problem list with owners, and a one-page story for the CIO.

???

This is a proposal, not an assigned requirement. It's sequenced around what's due soonest and what earns credibility fastest, and it matches the 90day checklist on the desk card. Days 1 to 30, baseline. Pull twelve months of the ITSM platform data: incident and request volumes, restore time as median and 90th percentile, reopen rate, first contact resolution, change success, and emergency change share. List the ten most frequent normal changes and mark the repeatable ones as standard change candidates. And dry-run the emergency patch path with the CISO's team against BOD 26-04's three-day timeline, which takes effect December 7. Days 31 to 60, fix the flow. Get five standard change models approved by the change board; pick ones with long, clean histories so the first wins are safe. Open problem records for the top five repeat-incident causes, each with an owner. Audit the knowledge base: every article gets an owner and a review date, stale ones are retired, and the top 20 issue types have current articles. Publish a P1 communications template and make the priority matrix an attachment the COR controls. Days 61 to 90, lock it in. Add restore-time percentiles and reopen rate to the monthly dashboard. Choose your own next ITIL module (Strategy or Transformation on the Strategic Leader path) and book it. Brief the CIO on one page: declared baselines, what moved, what's next, and what it needs. Why this order. Baselines first because every later claim depends on them. Standard changes early because they're visible, low-risk wins that free up board time and directly support BOD 26-04 compliance. Problem records early because they start the long payoff. Reporting changes last because they're easy once the data is clean. What to avoid in the first 90 days. A tool purchase, a big reorganization of the change board, or a new SLA with a target. Each is a reasonable stage 2 or 3 move, and each goes better with the baseline in hand. Music analogy: the first three months with a new band. Learn what everyone plays now (baseline), tighten the five songs you play every night (standard changes), fix the one transition that always trips you up (problem), then start recording rehearsals so you can hear progress (reporting).

---

## Myths you’ll hear, and what’s true

*08 · Leading It*

- The myth
- What’s true
- “ITIL means bureaucracy”
- ITIL 4 and V5 say keep it simple; the heavy binders were v3 habits
- “It’s ITIL or DevOps”
- They answer different questions; the pipeline can be the change authority
- “The CAB must approve every change”
- Standard changes are pre-authorized; authority scales with risk
- “We’re an ITIL-certified organization”
- People certify in ITIL; organizations certify to ISO/IEC 20000-1
- “More SLAs, better service”
- Fewer, paired measures beat many; watch for watermelons
- “The tool will implement ITIL”
- Tools enforce a workflow; they can’t design it or fix bad data “ITIL 4 is obsolete now”
- V5 kept its core; ITIL 4 certificates stay valid

???

Seven things you'll hear in meetings, RFP responses and vendor pitches, with short, defensible replies. "ITIL means bureaucracy." It did, in a lot of v3era implementations: thick process documents, approvals for everything, and handoffs between silos. ITIL 4 explicitly pushed back with "keep it simple and practical" and "optimize and automate," and Version 5 keeps those principles. If a process step adds no value, ITIL itself says remove it. "It's ITIL or DevOps." False choice. DevOps answers how code flows to production quickly and safely; ITIL answers how services are managed end to end. ITIL 4 absorbed DevOps ideas, Version 5 names DevOps as complementary, and change enablement allows a pipeline's automated checks to be the change authority for low-risk changes. "The CAB must approve every change." Not under ITIL 4. Standard changes are pre-authorized through their model, and normal changes go to a change authority sized to the risk, which can be a peer, a manager or a board. "We're an ITIL-certified organization." Organizations can't be ITIL certified. People hold ITIL certificates. Organizations can be certified against ISO/IEC 20000-1. When an offeror claims ITIL certification as a company, ask what they mean. "More SLAs, better service." More SLAs mean more measurement overhead and more ways to be green while users are unhappy. A few well-defined measures, each paired with a quality check and an experience measure, beat a long table. "The tool will implement ITIL." the ITSM platform can enforce a workflow you design. It can't decide what the workflow should be, make people follow it, or make data accurate. Most failed ITSM tool rollouts were process problems first. "ITIL 4 is obsolete now." Version 5 kept ITIL 4's principles, value system, practices and dimensions, and ITIL 4 certificates remain valid prerequisites. The ITIL 4 exams are planned to retire at the end of 2027; the knowledge isn't. A bonus one: "ITIL is only for IT." ITIL's practices and principles work for any service: HR, facilities, finance shared services. the ITSM platform's HR service delivery module is ITIL applied to HR. That's useful context for the onboarding value stream conversation with the HR office. Music analogy: "jazz has no rules," "you need a degree to play," "real musicians don't read." Each has a grain of truth and a lot of wrong. Good players know where the grain is.

---

## Eight questions for an ITSM contractor or vendor 1 · What were your restore-time median and 90th percentile last year?

*08 · Leading It*

- 2 · What share of your changes run as standard changes?
- 3 · Show a problem you closed and the repeat incidents it removed.
- 4 · How do you keep knowledge current, and how do you measure reuse?
- 5 · How do you measure CMDB accuracy: counts or sampling?
- 6 · Who runs the bridge when an incident spans another supplier?
- 7 · What do AI features do here, and how is accuracy checked?
- 8 · What transfers to the government at transition, and in what form?
- Listen for numbers and examples. Framework names without either are decoration.

???

Use these in oral presentations, past-performance calls, technical evaluations, and vendor demos. They separate teams that run ITSM well from teams that write about it well. 1. Restore-time median and 90th percentile. A strong team knows its numbers and reports percentiles. A weak one answers with SLA compliance percentages, or with averages. 2. Share of changes run as standard. A mature shop runs most routine change volume through standard models. A low share, or a blank look, suggests a board bottleneck or poor change hygiene. 3. A problem closed and the repeats it removed. Ask for a specific example with before and after numbers. Teams that do real problem management have stories; teams that don't talk about RCA templates. 4. Keeping knowledge current. Listen for KCS-style practices: capture in the workflow, reuse as review, measured usage. Watch for "we have a knowledge team that reviews articles annually." 5. CMDB accuracy method. Counting populated records says nothing about accuracy. Sampling records against reality, or reconciling against discovery, does. 6. Cross-supplier incidents. A good answer names a role, a process and an example. "We collaborate closely with all partners" isn't an answer. 7. AI features and accuracy. What do they do, what data do they read, can they act, and how is accuracy checked? A team that can't say how it measures its AI's accuracy doesn't know. 8. Transition. What transfers to the government at the end of the contract: knowledge articles, CMDB data, runbooks, scripts, automation code, and in what form? The right answer is "everything, in your systems, already." How to score. In a technical evaluation, these map cleanly to strengths and weaknesses: specific numbers and examples are strengths; generic framework language without evidence is, at best, neutral. Under the rewritten FAR Part 37, where offerors may propose performance standards against a SOO, question 1 also tells you whether their proposed standards are realistic. Music analogy: auditioning a drummer. Don't ask whether they can play funk. Count off a tempo and listen. Then ask them to play it again at half time.

---

## Watch list: 2026 to 2028

*08 · Leading It*

**Dec 7, 2026**

**Mar 7, 2027**

**As published**

**Pending**

- BOD 26-04 timelines in force; FedRAMP providers too

**Pending**

- SAMOSA Act in the Senate

**Tba**

- ITIL 4 voucher validity dates

**Dec 31, 2027**

- ITIL 4 exam modules sunset (current plan)

**Nov–dec 2028**

- FedRAMP corrective-action grace period ends
- V5 Practice Guide definitions: update your agency policy
- FAR overhaul final rule for Part 37
- Re-check every six months: sections 01, 05 and 07 of this deck move fastest.

???

The dates and decisions to keep an eye on. December 7, 2026: BOD 26-04's remediation timelines take effect for federal civilian agencies, and FedRAMP requires cloud providers to adopt its matching vulnerability detection and response rules by the same date. Your SaaS vendors are on the same clock. March 7, 2027: according to the Cloud Security Alliance's analysis of FedRAMP's notice, the corrective-action grace period for cloud providers runs to this date, after which noncompliant authorizations face revocation. Worth asking the ITSM platform and other providers where they stand. Version 5 Practice Guide definitions: Version 5 refreshes terminology for incident, problem and change, with full guidance in the Practice Guides. When you have them, compare against your agency’s the ITSM platform configuration and policy definitions, and update where the change is meaningful. FAR overhaul final rule for Part 37: proposed in June 2026 as FAR Case 2026-002. Agencies are operating under class deviations meanwhile. SAMOSA Act: passed the House in December 2025; a Senate version was introduced in 2025. If enacted, software asset management becomes an assessed and reported capability. ITIL 4 voucher validity dates: PeopleCert says these will be announced. Don't buy ITIL 4 vouchers far in advance. December 31, 2027: PeopleCert's current plan to sunset all ITIL 4 modules, and the Foundation Bridge with them. Also worth watching, without dates: any new annual FISMA guidance from OMB, which would update the major incident definition; the ITSM platform's AI agent capabilities and licensing; and agency AI policy changes that affect ITSM features. Re-check cadence. ITIL itself moves slowly; federal policy and PeopleCert's scheme move faster. Sections 01 (what Version 5 changed), 05 (federal) and 07 (certification) are the ones to re-verify every six months. Music analogy: the tour calendar. Some dates are locked (the festival slot), some are holds (the second leg), and some depend on the label. You plan around the locked ones and keep checking the holds.

---

## Glossary: the model and the practices

*REFERENCE*

- Service: enables outcomes without the customer managing costs and risks.
- Utility, warranty: fit for purpose; fit for use.
- SVS: service value system: principles, governance, value chain, practices, improvement.
- Lifecycle (V5): Discover, Design, Acquire, Build, Transition, Operate, Deliver, Support.
- Practice: resources for a type of work; ITIL has 34.
- Value stream: the steps that turn one kind of demand into value.
- Incident: unplanned interruption or drop in quality of a service.
- Problem: a cause, or potential cause, of incidents.
- Known error: a problem analysed but not yet fixed.
- Workaround: reduces impact until the cause is fixed.
- Service request: a standard, pre-agreed ask from a user.
- Change: adding, modifying or removing anything that could affect a service.
- Change authority: who authorizes a change, sized to its risk.
- Four dimensions: people; information and technology; partners; value streams.

**Reference**


???

Extra detail on terms that cause confusion. Service versus product. ITIL 4 defines a product as a configuration of an organization's resources designed to offer value, and a service as a way of enabling value co-creation through outcomes, without the customer managing specific costs and risks. Products are the basis of services. Version 5 treats products and services as two sides of one digitally enabled solution and gives them one lifecycle. Outcome versus output. An output is a tangible or intangible deliverable of an activity, such as a delivered laptop. An outcome is a result for a stakeholder enabled by outputs, such as a new hire who can work. Value chain versus value stream versus lifecycle. ITIL 4's value chain was a set of six activities used as building blocks. A value stream is a specific path through those activities for one kind of demand. Version 5's lifecycle names eight stages; value streams still describe specific paths through them. Practice versus process. A process is a set of activities that turns inputs into outputs. A practice is broader: the people, information, partners and processes for a type of work. Incident versus problem versus known error. The incident is the event users feel. The problem is its cause. The known error is a problem whose cause is understood, usually with a workaround, but not yet removed. Change types. Standard: pre-authorized, low risk, documented procedure. Normal: assessed and authorized individually. Emergency: implemented as soon as possible, with expedited authorization. Definitions on this slide follow ITIL 4. Version 5 refreshes terminology for several practices including incident, problem and change, with full guidance in the Practice Guides; check the Version 5 wording before quoting a definition in policy or a contract. Music analogy: a glossary is the key signature at the start of the chart. Everyone reads the same sharps and flats, or the band plays in two keys at once.

---

## Glossary: measures, contracts and the federal layer

*REFERENCE*

- SLA, OLA, UC: agreements with customers, internal teams, and suppliers.
- XLA: targets for user outcomes and sentiment.
- FCR: first contact resolution.
- MTTR: mean time to restore; report median and P90 too.
- P90: 90th percentile; nine in ten are faster.
- Shift-left: move resolution to a lower tier or self-service.
- QASP, AQL: how the government checks; the acceptable threshold.
- CO, COR: changes contract terms; monitors performance.
- BOD 26-04: CISA’s risk-based patching directive, in force Dec 7, 2026.
- BOD 23-01: CISA’s asset discovery and enumeration directive.
- CM-3, CM-4, CM-8: NIST change control, impact analysis, inventory.
- KCS: Knowledge-Centered Service, Solve and Evolve loops.
- FISMA major incident: OMB-defined; CISA and OMB in 1 hour, Congress in 7 days.
- SIAM: service integration across multiple suppliers.
- ISO/IEC 20000-1: the certifiable service management standard.

**Reference**


???

Extra detail on the measurement and federal terms. SLA, OLA and underpinning contract. OLAs are the internal promises that make it achievable. Underpinning contracts are the supplier promises behind both. An SLA stronger than its underpinning contract is a promise you can't keep. XLA. Experience level agreements set targets for outcomes and sentiment. Introduce them as a reporting baseline before attaching remedies. MTTR. The acronym is used for mean time to restore, repair, recover or resolve, depending on who's speaking; define it in any contract. DORA renamed its version "failed deployment recovery time." Whichever you use, report the median and the 90th percentile alongside it, because the mean hides the tail. P90. The 90th percentile: nine in ten cases are at or below this value. SLA statements like "95 percent within 30 minutes" are percentile statements. QASP and AQL. The quality assurance surveillance plan says how the government monitors performance. The acceptable quality level is the threshold in each standard, such as 95 percent. CO and COR. Only the contracting officer can change contract terms. The contracting officer's representative monitors technical performance and documents it. FISMA major incident. Defined by OMB in annual FISMA guidance (M-25-04 is the most recent). Agencies report all incidents to CISA within an hour of identification; major incidents to CISA and OMB within an hour of determination, and to Congress within seven days. A breach involving PII of 100,000 or more people is a major incident. Not the same as an ITIL major incident. ISO/IEC 20000-1. The international standard for a service management system, certifiable by accredited auditors. Music analogy: the business side of music has its own glossary: points, splits, mechanicals, sync. You don't need to be a lawyer, but you need to know the words before you sign anything.

---

## Sources

*REFERENCE*

**Itil version and certification**

- FEDERAL AND your agency
- PeopleCert ITIL architects: “ITIL Foundation (Version 5), what’s new?” (itil.com) acquisition.gov: FAR overhaul, Part 37
- ITSM.tools: “ITIL (Version 5): What’s known”
- OMB M-25-04: FY 2025 FISMA guidance
- New Horizons: ITIL Version 5 release date and transition
- Cybersecurity Dive, Tenable, CSA: BOD 26-04 coverage
- Global Knowledge: ITIL (Version 5) certification FAQ
- CISA: Federal Incident Notification Guidelines
- GAO-25-106488: Technology Business Management
- Learning Tree: “ITIL (Version 5) has arrived”
- Washington Technology: SAMOSA Act passes House
- ProcessExam: ITIL 4 and Version 5 explained (sunset plan)
- PeopleCert: ITIL AI Governance (Version 5)

**Reference**


???

Where the facts in this deck come from. Checked as of November 23, 2026. ITIL version, scheme and dates. PeopleCert's ITIL architects Roman Jouravlev and Adam Griffith, "ITIL Foundation (Version 5), what's new?" on itil.com: the evolution framing, the eight-stage lifecycle, AI-native and complexity-native principles, the service journey model at Foundation, and refreshed practice terminology. ITSM.tools, "ITIL (Version 5): What's known about ITIL Version 5": the seven-book portfolio, scheme structure and Practice Manager module contents, and the report that the 34 practice names are unchanged. New Horizons: the February 12, 2026 release date after a January early-access phase. Global Knowledge's ITIL (Version 5) certification FAQ: designations and prerequisites, exam formats, renewal options, practice guide access, and ITIL 4 coexistence. Learning Tree, "ITIL (Version 5) has arrived": transition routes for ITIL 4 designations. ProcessExam, "Where is ITIL heading?": the planned December 31, 2027 sunset of ITIL 4 modules, Foundation exam format, and the Foundation Bridge. PeopleCert's ITIL AI Governance (Version 5) page: module content. DoD's class deviation for Part 37, effective February 1, 2026. Sheppard Mullin's summary of the June 2026 proposed rules including FAR Case 2026-002. CISA's Federal Incident Notification Guidelines: the one-hour reporting expectation. OMB M-25-04: the current major incident definition. Cybersecurity Dive, Tenable, BleepingComputer and the Cloud Security Alliance: BOD 26-04's issuance, timelines, and FedRAMP alignment. GAO-25-106488 on Technology Business Management. Washington Technology and MeriTalk on the SAMOSA Act. Your agency. Both are in the Work Related project. ITIL concepts that haven't changed (guiding principles, four dimensions, practice purposes, change types, the continual improvement model, KCS loops, DORA and SRE vocabulary) are stated from the published frameworks and are stable. Where Version 5 wording may differ from ITIL 4, the notes say so. The companion desk card, ITIL Quick Reference: Desk Card, has the clickable links.
