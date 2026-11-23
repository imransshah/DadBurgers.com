---
title: "Data: the things you need to know"
domain: data-ai
tags: [data, architecture, quality, governance, cui, classification, privacy, records, ai-data, deck]
summary: "Full data deck: foundations, architecture, quality and integrity, governance, protection and CUI, privacy, records, open data and AI data. Speaker notes carry the depth. Redacted text version."
status: draft
updated: 2026-11-23
handling: public
redacted: "Agency-specific names, tools, contracts, locations, people and plans removed under the approved redaction rules (2026-11-23)."
markings: teaching-examples
---

## Data: The Things You Need to Know

*A WORKING REFERENCE · NOVEMBER 2026 · COMPANION TO THE AI DECK*

- How data works, how it’s built, kept clean, governed, protected, retained, and used for AI, in unclassified and classified environments. Written for the technician and the Deputy CIO in the same chair.

**62 slides · 9 sections · speaker notes carry the depth**


???

How to use this deck. Same structure as the AI deck: the slides are the scannable layer, one idea each; the speaker notes are the understanding layer, with the technical mechanics, the reasoning, the federal hooks, and the questions you should be ready for. Read the notes once end to end and you will be able to explain any slide without reading it. Two hats on purpose. Every section carries both the technician view (how it actually works: SQL, ACID, file formats, hashing, lineage, cross-domain guards) and the leadership view (who owns it, what the law requires, what to fund, what to ask a contractor). Where they differ, the notes say so. Structure. Currency. Policy facts were checked against primary and reputable secondary sources as of November 20, 2026. Several items are moving (the FAR CUI rule, DMBOK 3.0, PQC phases, CISA’s logging reference architecture, the DoW data strategy), so re-check sections 05 through 08 every six months. The cover art is a table of records. The teal row is the golden record a steward certifies; the two amber cells are the ones that fail a quality rule, which is where a steward’s week actually goes.

---

## Five ideas that carry most of the weight

*START HERE*

- 1. Data is a liability until it’s governed. It becomes an asset when you know what it is, where it lives, who owns it, and how good it is.
- 2. Fix it where it’s born. Quality is decided at the point of entry. Every downstream cleanup costs more and never ends.
- 3. If you can’t trace it, you can’t defend it. Lineage is what makes a number survive an OIG audit or a Hill question.
- 4. Classification drives everything. Protection, retention, sharing, and whether AI may touch it all follow from what the data is.
- 5. Governance is decision rights. Who decides, who answers for it, and how it’s measured. Not binders, not committees.

**Start here**


???

If you absorb one slide, make it this one. Everything else elaborates one of these five. 1. Liability until governed. Unmanaged data costs money (storage, licenses, eDiscovery), creates breach exposure, and violates records and privacy law quietly. The “data is an asset” slogan is only true once four questions have answers: what is it, where is it, who owns it, how good is it. That’s also exactly what the Evidence Act’s comprehensive data inventory forces an agency to answer. 2. Fix at the source. The classic heuristic is the 1-10-100 rule: it costs about one unit to prevent a bad record at entry, ten to find and correct it later, and a hundred if it reaches a decision or a customer. The exact ratio is folklore; the shape is real. A required field, a pick-list instead of free text, and a validation rule in the ITSM platform form beat every quarterly cleanup project. 3. Trace it or lose the argument. When the CFO, OIG, or a congressional staffer asks “where did this number come from,” the answer has to be a chain: source system, transformation, report, with dates. If you can’t walk it back, the number is an opinion. 4. Classification drives everything. Whether something is public, internal, CUI, PII, or classified decides its encryption, who can see it, how long you keep it, whether it can be shared with another agency, and whether it can go into an AI tool. Get the label wrong and every downstream control is wrong too. 5. Decision rights. Governance fails when it becomes a monthly meeting with no authority. It works when it answers specific questions: who defines “active employee,” who approves access to deal data, who signs off when two systems disagree, and what metric tells you it’s working. Same anti-ratchet discipline you use for KPIs: declare the baseline first. Analogy for the whole deck: a record collection. Without tags it’s a hard drive of “Track 01, Unknown Artist.” Without provenance you can’t clear a sample. Without a master you have twelve bootlegs and no idea which one is right. Data management is the label, the liner notes, and the vault.

---

## Foundations

*01 / 09 · 01 · Foundations*

- What data is, how it lives and dies, the kinds you’ll manage, and the vocabulary the rest of this deck depends on.
- Data, information, records · The lifecycle · Kinds of data · Metadata · The DAMA framework

???

This section is the shared vocabulary. Data people, records people, security people, and lawyers use the same words differently, and most governance arguments are really vocabulary arguments. If you can say precisely whether something is data, information, or a record, which stage of the lifecycle it’s in, and what kind of data it is, you can usually tell which policy applies and who owns the decision.

---

## Data, information, records: three words, three regimes

*01 · Foundations*

**Data**

**Information**

**Record**

- Recorded facts
- Data with meaning
- Evidence of business
- A row, a field, a log line. The Evidence Act defines it as recorded information in any form or medium.
- Data put in context for a purpose: a dashboard, a report, an answer.
- Made or received in agency business and kept as evidence of decisions and activity.
- Rules: Circular A-130; Information Quality
- Act once disseminated
- Rules: Federal Records Act; disposal only by schedule

**Structured**

**Semi-structured**

**Unstructured**

- Tables with fixed fields: Oracle
- EBS, the ITSM platform
- Self-describing: JSON, XML, logs, APIs
- Documents, email, chat, images, audio
- Rules: data management policy, M-2505 inventory
- One spreadsheet can be all three at once, and each hat brings different rules and a different owner.

???

Data. The OPEN Government Data Act (Title II of the Evidence Act) defines data as recorded information regardless of form or the media it’s recorded on, and a data asset as a collection of data elements or data sets that may be grouped together. OMB M-25-05 narrows what counts for the inventory: a data asset must be structured or semi-structured and logically grouped. So a SharePoint folder of memos is content, not an inventory data asset; the ITSM platform incident table is. Information. Data in context, organized for a purpose. Circular A-130 governs information as a strategic resource across its life. Once an agency disseminates information to the public, the Information Quality Act applies: it must meet standards of quality, objectivity, utility, and integrity, and the public can request a correction. Record. The Federal Records Act (44 U.S.C. 3301) defines a record as recorded information, in any form, made or received by an agency in connection with public business and preserved, or appropriate for preservation, as evidence of the agency’s functions, decisions, and activities, or for its informational value. The key consequence: a record can only be destroyed under a NARA-approved schedule. “Delete it, it’s ours” doesn’t apply. Example, one object, three hats. The the ITSM platform incident table is data (an inventory asset). The monthly SLA dashboard built from it is information (and if it’s published externally, the IQA applies). Structure spectrum. Structured data lives in fixed schemas and is easy to query, validate, and govern. Semi-structured data carries its structure with it (JSON from an API, log events) and is flexible but drifts. Unstructured content is most of what an agency produces and most of what AI reads: memos, email, Teams chat, PDFs, recordings. It’s the hardest to classify and the easiest to overshare, which is why the AI section returns to it. Analogy: a multitrack session is the data, the finished mix is the information, and the master in the label’s vault with its paperwork is the record. You can remix the session all day; you can’t quietly erase the master.

---

## The lifecycle, with the federal hook at each stage

*01 · Foundations*

**1 · plan**

**2 · collect**

**3 · store**

- Decide before you build
- Take only what you need
- Protect and inventory
- Categorize (FIPS
- 199), privacy threshold analysis, data management plan
- Paperwork
- Reduction Act for 10+ public respondents;
- Privacy Act notice
- FISMA controls, CUI safeguarding, encryption, M-2505 inventory

**4 · use and**

**Share**

**5 · retain**

**6 · dispose**

- Keep as scheduled
- Within the stated purpose
- NARA schedule or GRS, legal holds, Capstone for email
- Destroy on time, provably
- SORN routine uses, sharing agreements, IQA, open by default
- Schedule authority, NIST SP 800-88r2 sanitization, certificate
- Most failures happen at the two ends: collecting what you shouldn’t, and keeping what you were required to destroy.

???

Walk it left to right; each stage has a federal requirement attached. Plan. Before a system or dataset exists: categorize the information types and the system under FIPS 199 using NIST SP 800-60 (low, moderate, high for confidentiality, integrity, availability). Run a privacy threshold analysis to decide whether a privacy impact assessment and a system of records notice are needed. Decide the records schedule up front. Planning is cheap; retrofitting is not. Collect. The Paperwork Reduction Act requires OMB approval and a control number before an agency asks identical questions of ten or more members of the public, including through web forms. (Federal employees answering in their official capacity don’t count.) The Privacy Act requires a notice at collection telling people the authority, purpose, routine uses, and whether it’s mandatory. Data minimization is the best privacy control there is: what you never collect can’t leak. Store. Security controls from NIST SP 800-53 at the system’s baseline, CUI safeguarding where it applies, encryption at rest, and an entry in the agency’s comprehensive data inventory under M-25-05. Use and share. Personal data can only be used and disclosed within the purposes and routine uses published in the system of records notice, or under another Privacy Act exception. Sharing between agencies or with partners runs through agreements (covered in section 05). Information disseminated publicly must meet the agency’s information quality guidelines. And under the OPEN Government Data Act, data that can be public should be open by default. Retain. Every record needs a disposition authority: an agency-specific NARA schedule or a General Records Schedule item. Litigation holds suspend destruction. Email is usually managed under the Capstone approach (GRS 6.1). Dispose. Destruction must be authorized by the schedule, done on time, and done properly: NIST SP 800-88 Rev. 2 (final September 2025) shifts the emphasis from per-device recipes to running an enterprise sanitization program, with clear, purge, and destroy as the methods and cryptographic erase favored for modern media. Keep certificates of destruction; your ITAM program is part of this. The band is the leadership point. Over-collection creates privacy and breach exposure; over-retention creates breach, eDiscovery, and FOIA exposure. Keeping everything forever feels safe and is the opposite. Analogy: a tour. Plan the setlist, load in only what you’ll play, keep the gear secured, play the show, archive the recordings, and actually throw out the broken cables instead of hauling them to every city.

---

## Kinds of data, and how each one fails

*01 · Foundations*

- Kind
- What it is
- Your agency example
- Typical failure
- Master
- Core entities many systems share
- Counterparties, employees, vendors
- Duplicates and conflicts
- Reference
- Controlled code lists
- ISO country and currency codes, NAICS
- Local copies drift
- Transactional
- Events and business activity
- Disbursements, tickets, purchase orders
- Missing or late records
- Configuration
- What IT runs and owns
- CMDB CIs, assets, licenses
- Stale; nobody updates it
- Metadata Data about data Schemas, labels, retention codes
- Absent, so nothing is findable
- Derived
- Aggregates, models, indexes
- Power BI models, KPI tables, embeddings
- Silently outdated
- Content
- Documents, email, chat
- Deal memos, Box files, Teams
- Overshared, over-retained
- Telemetry
- Machine events and logs
- the SIEM, the SSE platform, the identity provider logs
- Too costly to keep, then gone

???

A practical taxonomy, because each kind needs a different control and a different owner. Master data: the nouns of the business that many systems use. Failure mode: the same entity exists five times with five spellings, and nobody knows which is right. Master data management (section 04) exists for this. Reference data: small, slow-changing code lists that give meaning to other data: ISO 3166 country codes, ISO 4217 currency codes, NAICS, sector and instrument types, ticket categories, cost centers. Failure mode: each system keeps its own copy, one gets updated when a country code changes or a category is added, the others don’t, and reports stop reconciling. For a development finance agency working in more than a hundred countries, the country list is critical reference data. Transactional data: the verbs: approvals, disbursements, payments, tickets, purchase orders, access requests. High volume, time-stamped. Failure mode: gaps (a failed integration drops a day of records) and timing mismatches (one system posts at close of business, another in real time). Configuration and asset data: your world. CMDB configuration items and relationships, hardware and software assets, licenses, certificates. Failure mode: it’s accurate the day of the audit and decays from there, because updating it isn’t part of anyone’s workflow. Discovery tools and process hooks (change and request fulfillment updating CIs) are the fix. Metadata: covered next slide. Failure mode: it was never captured, so data can’t be found, trusted, or governed. Derived data: anything computed from something else: aggregates, dashboards’ semantic models, machine learning features, and embeddings in a vector index. Failure mode: the source changed and the derivative didn’t, so a dashboard or an AI assistant confidently shows last quarter’s truth. Derived data inherits the sensitivity of its source; an embedding of a CUI document is CUI. Content: unstructured documents and messages. Failure modes: overshared (“Everyone” links) and over-retained. Telemetry: logs and events. Failure mode: expensive to keep at full volume, so it gets cut, and then it isn’t there for the investigation. OMB M-26-14 (May 2026) rescinded M-21-31’s blanket retention tiers and replaced them with a risk-based logging maturity model, which makes deciding what to keep a governance decision rather than a default. Analogy: master data is the band roster, reference data is the key signatures, transactional data is every show you played, configuration is the gear list, metadata is the liner notes, derived data is the greatest-hits compilation, content is the fan mail, and telemetry is the soundboard log.

---

## Metadata: what makes data findable, trusted, and governable

*01 · Foundations*

**Business**

**Technical**

**Operational**

- What it means
- How it’s built
- How it’s behaving
- Definition and glossary term
- Schema, data types, keys
- Freshness and row counts
- Owner and steward
- Location and format
- Job runs and failures
- Sensitivity and CUI category
- Lineage: source to report
- Quality scores
- Critical data element flag
- Interfaces and APIs
- Who accessed it

**Business glossary**

**Data dictionary**

**Data catalog**

- Agreed meaning of a term: what counts as an
- “active employee”
- One system’s fields: EMP_STATUS, char(1), A

**/i/l**

- Searchable inventory of assets with all of the above, plus whom to ask

???

Metadata is data about data. Without it, data exists but can’t be found, understood, trusted, or controlled. Three families: Business metadata answers “what does this mean and who answers for it?”: the definition, the glossary term it maps to, the owner and steward, the sensitivity label or CUI category, whether it’s a critical data element (a field that feeds a regulatory report, a KPI, or a payment), and its records schedule. Technical metadata answers “how is this built?”: table and column names, data types, keys and constraints, where it lives, file format, the interfaces that move it, and lineage from source to report. Operational metadata answers “how is it behaving right now?”: when it last refreshed, how many rows arrived, whether the pipeline failed, its current quality scores, and the access log. The three artifacts people confuse: Business glossary: the agreed meaning of business terms, owned by the business. One entry per concept: “Active employee: a person with a current appointment in the HR system of record, including those on approved leave, excluding detailees from other agencies.” It settles arguments. Data dictionary: field-level documentation for one system. EMP_STATUS, char(1), allowed values A (active), I (inactive), L (leave), populated by the HR feed nightly. It’s technical and system-specific. Data catalog: the searchable inventory across systems, linking glossary terms to dictionary fields, with lineage, owners, quality scores, and classifications. the compliance and DLP suite’s Unified Catalog, Collibra, Alation, and Databricks Unity Catalog are examples. The M-25-05 comprehensive data inventory is effectively a public-facing catalog: each entry described with DCAT-US v3.0 metadata (title, description, publisher, contact, access level, and so on). Records management has its own metadata vocabulary (descriptive, structural, administrative, preservation) and NARA expects minimum metadata on permanent electronic records transferred to it. Same idea, different audience. Why leaders should care: every governance capability depends on metadata. You can’t enforce a DLP rule on data that isn’t labeled, apply a retention schedule to records you can’t identify, answer a data call without an inventory, or let AI ground on content whose sensitivity is unknown. Analogy: ID3 tags. The same MP3 with tags shows artist, album, year, genre, and album art; without them it’s “Track 01, Unknown Artist,” and your playlist rules, search, and recommendations all stop working. The audio didn’t change. Its usefulness did.

---

## The DAMA wheel: eleven knowledge areas, governance at the hub

*01 · Foundations*

- Architecture · 02
- Modeling and design · 02
- Storage and operations · 02, 03
- Integration and interoperability · 02
- Warehousing and BI · 02
- Data quality · 03
- Reference and master data · 04
- Metadata · 01, 04
- Data security · 05
- Documents and content · 06

**The hub**

- Data governance
- Strategy, policy, decision rights, and stewardship. It directs the other ten.
- This deck: section 04

**Dmbok**

**Dcam · cdmc**

**Iso**

**Federal**

- 2nd ed. 2017, revised 2024; 3.0 due 2027
- EDM Council maturity and cloud controls
- 8000 data quality; 38505 governance of data Federal Data Strategy: 10 principles, 40 practices

???

DAMA International’s Data Management Body of Knowledge (DMBOK) is the closest thing the profession has to a common syllabus, and it’s what the Certified Data Management Professional (CDMP) exam tests. The second edition (2017) organizes data management into eleven knowledge areas drawn as a wheel, with data governance at the hub because it directs the rest. The ten around the rim, in one line each: Architecture: the blueprint of data assets and flows across the enterprise. Modeling and design: conceptual, logical, and physical models of the data. Storage and operations: running databases: backup, performance, availability. Integration and interoperability: moving and combining data between systems. Warehousing and business intelligence: analytical stores and reporting. Data quality: defining, measuring, and improving fitness for use. Reference and master data: managing shared code lists and core entities. Metadata: capturing and managing data about data. Data security: protecting confidentiality, integrity, and availability, and privacy. Documents and content: managing unstructured information and records. The numbers on the slide point to where this deck covers each area. Status. DAMA published a revised second edition in 2024 and launched DMBOK 3.0 in 2025 as a community project, with publication expected in 2027. The update focuses on AI governance, cloud-native platforms, and distributed patterns like data mesh. Until then, DMBOK 2 remains the reference. Other frameworks you’ll hear: DCAM (Data Management Capability Assessment Model) from the EDM Council: a maturity model widely used in financial services; useful for scoring yourself. CDMC (Cloud Data Management Capabilities): the EDM Council’s 14 key controls for sensitive data in cloud, such as cataloging, classification, entitlements, encryption, retention, and lineage being automated. ISO 8000: data quality and master data exchange. ISO/IEC 38505: governance of data, written for boards and executives. Federal Data Strategy (OMB M-19-18, 2019): a 10year vision with 10 principles and 40 practices across three themes: ethical governance, conscious design, and a learning culture. Its annual action plans tapered off after the early years, but OMB’s M-25-05 open data guidance explicitly builds on its principles, and the CDO Council keeps the practices alive. Leadership use: you don’t need to implement all eleven areas at once. Use the wheel as a checklist to find gaps. For a small agency, quality, master and reference data, metadata, and security usually pay back first. Analogy: the DAMA wheel is the instrument sections of an orchestra. Governance is the conductor; it doesn’t play a note, but without it every section plays in its own tempo.

---

## Architecture and engineering

*02 / 09 · 02 · Architecture*

- How data is actually stored, shaped, and moved: the technician’s layer, and the decisions it puts on your desk.
- Relational and SQL · Modeling for analytics · Warehouse, lake, lakehouse · NoSQL and CAP · Pipelines ·
- Mesh, fabric, contracts · The your agency stack

???

This is the hands-on section. It covers what a database engineer, data engineer, or architect would expect a technical leader to understand: why relational databases behave the way they do, how analytical data is modeled differently from operational data, what a lakehouse actually is, when NoSQL makes sense, how pipelines move data, and what the current architectural buzzwords mean in practice.

---

## Relational databases: tables, keys, SQL, and ACID

*02 · Architecture*

- SELECT c.region, COUNT(*) AS projects, SUM(p.commitment_usd) AS total_usd
- FROM project p
- JOIN country c ON c.iso3 = p.country_iso3
- WHERE p.status = 'ACTIVE'
- GROUP BY c.region
- ORDER BY total_usd DESC;
- -- illustrative schema, not your agency’s
- ACID transactions
- Atomic: all or nothing. Consistent: rules always hold.
- Isolated: concurrent work doesn’t collide. Durable: committed means saved.
- Normalization

**Primary key**

**Foreign key**

**Constraint**

- Uniquely identifies a row
- Points to a row in another table

**Not null, unique, check**

- Store each fact once and reference it. Fewer contradictions; more joins. Analytics deliberately denormalizes.

???

The relational model (E. F. Codd, 1970) still runs most systems of record: Oracle EBS on Oracle Database, the ITSM platform on a relational platform behind its tables, Salesforce on a multi-tenant relational core. Data lives in tables of rows and columns; relationships are expressed by keys. Keys and constraints are integrity enforced by the database itself. A primary key uniquely identifies a row. A foreign key says this value must exist in another table (a project’s country_iso3 must exist in the country table), which is referential integrity: no orphans. NOT NULL, UNIQUE, and CHECK constraints reject bad data at the door. Every rule you push into the database is a rule nobody can forget to apply. Surrogate keys (system-generated IDs) versus natural keys (an ISO code, an SSN): use surrogates for stability, but keep natural keys unique and validated. SQL in four families: DDL defines structure (CREATE, ALTER), DML changes and reads data (INSERT, UPDATE, DELETE, SELECT), DCL grants permissions (GRANT, REVOKE), and transaction control (COMMIT, ROLLBACK). Read the example as English: from projects joined to countries, keep active ones, group by region, count and sum, sort biggest first. Joins: INNER keeps matches only; LEFT keeps every row on the left even without a match (how you find orphans: WHERE right.key IS NULL). Window functions (ROW_NUMBER, LAG, running totals) handle “latest record per employee” and period-over-period without self-joins. ACID, with a transfer example. Moving $1M between two accounts is two updates. Atomic: both happen or neither. Consistent: constraints hold before and after. Isolated: another transaction never sees the half-done state. Durable: once committed, a crash won’t lose it, because the change was written to a log first (write-ahead logging), which is also what makes point-in-time recovery possible. Isolation has levels (read committed, repeatable read, serializable) that trade strictness for throughput; anomalies like dirty reads and lost updates are what lower levels allow. Indexes are sorted lookup structures (usually B-trees) that make reads fast and writes slower. Missing indexes cause slow reports; too many slow down every insert. Normalization removes redundancy: first normal form (atomic values, no repeating groups), second (every column depends on the whole key), third (no column depends on another non-key column). The payoff is that a fact like a vendor’s address lives in one place, so it can’t contradict itself. The cost is more joins. Analytical models deliberately denormalize for read speed (next slide). Leadership hooks: ask contractors where business rules are enforced (database constraints, application code, or nowhere), and whether direct database access bypasses them. Analogy: normalization is writing the chorus once and using a repeat sign (D.S. al coda) instead of copying it out four times. Copy it four times and someone will fix a wrong note in only three.

---

## Modeling for analytics: from transactions to a star

*02 · Architecture*

**Dim_date**

- DIM_GROUP day · month · FY assignment group
- FACT_INCIDENT one row per ticket: minutes to resolve, reopened flag, SLA met

**Oltp**

**Olap**

- Job
- Run the business
- Understand it
- Shape
- Normalized
- Star or wide
- Storage
- Row-oriented
- Columnar
- Example
- the ITSM platform
- Power BI model

**History: scd type 2**

- Keep a new dimension row with effective dates when an attribute changes, so last year’s report still shows last year’s org chart.

**Dim_ci**

**Dim_person**

- CI · class · service caller · office

???

Operational systems (OLTP, online transaction processing) are built to run the business: many small reads and writes, normalized tables, strict transactions. Analytical systems (OLAP, online analytical processing) are built to understand the business: few writes, huge scans and aggregations across history. Same data, opposite design goals, which is why you don’t run heavy reporting directly against production. Row versus columnar storage. A row store keeps each record together, which is ideal for “fetch ticket INC-4821.” A columnar store keeps each column together and compresses it, which is ideal for “average resolution time by group across three years,” because it reads only the two columns it needs. Parquet files, Power BI’s VertiPaq engine, Synapse, Snowflake, and Fabric’s warehouse are columnar. The star schema (Ralph Kimball’s dimensional modeling) is the workhorse of analytics. A fact table holds measurable events at a declared grain (here: one row per incident) with numeric measures and foreign keys. Dimension tables hold the descriptive context you slice by: date, assignment group, configuration item, person. Queries become “sum facts, grouped by dimension attributes,” which is fast and easy for analysts. Declaring the grain is the most important modeling decision; mixing grains is the classic error that double-counts. Slowly changing dimensions. When an attribute changes (a person moves offices, a CI moves services), Type 1 overwrites it (history lost), Type 2 adds a new row with effective-from and effective-to dates and a current flag (history kept), Type 3 keeps a “previous value” column. Type 2 is what makes historical reports reproducible: a FY25 report rerun today should show FY25’s organization. That’s an integrity property auditors care about. Three schools you’ll hear: Kimball: dimensional, built business process by business process, conformed dimensions shared across stars. Inmon: a normalized enterprise data warehouse first, with marts derived from it. Data Vault 2.0 (Dan Linstedt): hubs (business keys), links (relationships), and satellites (time-stamped attributes). Insert-only and fully auditable; popular in regulated and government settings because nothing is ever overwritten, and you can reconstruct what was known when. Usually paired with star schemas on top for consumption. Leadership hooks: when a dashboard is proposed, ask what the grain is, how history is handled, and which dimension definitions are shared across reports, so “resolution time” means the same thing on every dashboard. Analogy: OLTP is the live board at the gig, every fader moving in real time. OLAP is the mastering suite afterward, where you listen to the whole album at once and compare tracks. The star schema is the track sheet: one row per take, with columns for date, studio, engineer, and instrument.

---

## Warehouse, lake, lakehouse: where analytical data lives

*02 · Architecture*

- Warehouse
- Lake
- Lakehouse
- Holds
- Curated, structured tables
- Anything, as files
- Files with table guarantees
- Schema On write: defined first
- On read: figured out later
- Enforced, can evolve
- Strength
- Trusted, fast SQL
- Cheap, flexible, AI-friendly
- Both, on one copy
- Risk
- Rigid, costly to change
- Becomes a swamp
- Needs real governance
- Examples
- Synapse, Snowflake

**Adls, s3**

- Fabric OneLake, Databricks

**Bronze**

**Silver**

**Gold**

**Formats**

- Raw, as landed. Immutable.
- Cleaned, deduplicated, conformed.
- Business-ready, certified, governed.
- CSV · JSON · Parquet · Delta · Iceberg

???

Warehouse. A database optimized for analytics, holding curated, structured, modeled data (often star schemas). Schema-on-write: you define the structure before loading, so bad data is rejected at the door. Strengths: trusted numbers, fast SQL, mature security. Weakness: every new source or question requires modeling work first, and it handles unstructured data poorly. Lake. Cheap object storage (Azure Data Lake Storage, Amazon S3) that holds anything as files: raw extracts, logs, documents, images. Schema-on-read: structure is applied when someone queries it. Strengths: cheap, flexible, and well suited to data science and AI. Weakness: without catalogs, ownership, and quality checks it becomes a data swamp where nobody knows what’s current or trustworthy. Lakehouse. The current mainstream pattern: data stays as open files in the lake, but an open table format adds a transaction log on top, giving database-like guarantees: ACID transactions, schema enforcement and evolution, time travel (query the table as of last Tuesday), and efficient updates and deletes. The big three formats are Delta Lake (Databricks, and the native format of Microsoft Fabric’s OneLake), Apache Iceberg (broadly adopted across vendors), and Apache Hudi. Underneath, the data files are usually Parquet: columnar, compressed, typed. Practical meaning: one copy of the data can serve SQL reports, Power BI, notebooks, and AI pipelines without exporting copies everywhere, which is good for cost and for governance, because fewer copies means fewer places to secure. Medallion architecture organizes a lakehouse in layers. Bronze: raw data exactly as it arrived, kept immutable for audit and reprocessing. Silver: cleaned, deduplicated, typed, conformed to standard codes. Gold: business-level tables and models, certified and owned, which is what dashboards and AI should read. Quality rules sit at each boundary. File formats in one line each: CSV (universal, untyped, fragile with commas and encodings), JSON (nested, verbose), Parquet (columnar, compressed, typed: the analytics default), Avro (row-based with a schema, common in streaming). Delta and Iceberg are table formats layered over Parquet. Analogy: the warehouse is the finished album on the shelf; the lake is a hard drive of every session file ever recorded; the lakehouse is a studio archive where raw takes, edited stems, and released masters live together, versioned and labeled, so you can always remaster from the original.

---

## Beyond relational: NoSQL, graph, vector, and CAP

*02 · Architecture*

**Document**

**Key-value**

**Wide-column**

- One JSON document per entity. Cosmos
- DB, MongoDB.
- Fast lookups by key: caches and sessions. Redis.
- Massive write volume across many nodes. Cassandra.

**Graph**

**Vector**

**Time-series**

- Relationships first: ownership chains, CMDB dependencies. Neo4j.
- Similarity search over embeddings for RAG.
- Azure AI Search.
- Metrics and logs over time. Log
- Analytics, ADX.

**Cap theorem**

**Default**

- When the network splits, a distributed store must choose: stay consistent or stay available. PACELC adds: otherwise, latency versus consistency.
- Start relational. Choose another model for a specific access pattern, not for fashion.

???

“NoSQL” means “not only SQL”: data models other than relational tables, usually designed to scale out across many machines. Document stores keep each entity as a self-contained JSON document (an application with nested parties, documents, and comments). Flexible schema, natural for web apps. Risk: the same fact gets embedded in many documents and drifts. Azure Cosmos DB and MongoDB are common. Key-value stores are giant dictionaries: give a key, get a value, in microseconds. Used for caching, sessions, feature flags. Wide-column stores spread enormous write volumes across clusters (telemetry, IoT). Rare in a small agency. Graph databases store nodes and relationships as first-class data, so multi-hop questions are cheap: “which business services depend on this server, transitively,” or, for a development finance institution, “who ultimately owns this sponsor, through which holding companies and jurisdictions.” Beneficial-ownership and sanctions screening are natural graph problems. The CMDB is a graph in spirit, even when it’s stored relationally. In the classified world, link analysis is a graph discipline. Vector databases and indexes store embeddings and answer “what’s most similar to this?” They power the retrieval half of retrieval-augmented generation (see the AI deck). Treat a vector index as derived data: it inherits the classification of what was embedded and must enforce the same permissions. Time-series stores are optimized for timestamped measurements: performance counters, logs, sensor readings. Azure Data Explorer and Log Analytics (which the SIEM uses) are in this family, queried with KQL. CAP, precisely. In a distributed system, a network partition (nodes can’t talk) will eventually happen. When it does, the system can either refuse some requests to stay consistent (every read sees the latest write) or keep answering and risk serving stale data (available). You can’t have both during the partition. PACELC adds the everyday trade: even with no partition, stronger consistency costs latency. That’s why some stores offer tunable consistency; Cosmos DB, for example, offers five levels from strong to eventual. ACID versus BASE. Relational systems favor ACID. Many NoSQL systems favor BASE: basically available, soft state, eventually consistent. Fine for a social feed; not fine for a disbursement ledger. The default on the slide is the leadership rule. Relational databases now handle JSON, full-text, and even vectors (PostgreSQL with pgvector). Introduce another engine only for a real access pattern, because each one adds skills, patching, backup, and security surface. Analogy: relational is sheet music, strict and precise; document stores are lead sheets, flexible but open to interpretation; a graph is the family tree of who played with whom; a vector index is “sounds like.”

---

## Pipelines: how data moves between systems

*02 · Architecture*

**Etl**

- Extract
- Transform
- Load to warehouse

**Elt**

- Extract
- Load raw to lake
- Transform in place

**Pipeline hygiene**

- Idempotent: safe to rerun
- Schema checked on arrival
- Retries plus a dead-letter queue

**Batch**

**Cdc**

**Streaming**

- Monitored for freshness and volume
- Scheduled bulk loads. Simple; data is hours old.
- Change data capture: ship only inserts, updates, deletes.
- Events published as they happen; consumers subscribe.
- Managed identities, not passwords
- Emits lineage
- Every integration is a data contract, whether or not anyone wrote it down. The joiner-mover-leaver feed is the one that matters most.

???

ETL versus ELT. Classic extract-transform-load reshapes data before it lands in the warehouse, because warehouse storage and compute used to be expensive. Modern extract-load-transform lands raw data first (bronze) and transforms it inside the lake or lakehouse with SQL, because storage is cheap and keeping the raw copy lets you reprocess when a rule changes. Tools: Azure Data Factory and Fabric pipelines move data; dbt-style SQL models transform it; orchestrators like Airflow schedule and chain jobs. Patterns. Batch loads run on a schedule; simple, but the data is as old as the last run. Change data capture (CDC) ships only what changed. Log-based CDC reads the database’s transaction log and catches deletes; timestampbased CDC (“rows modified since”) misses hard deletes, a classic source of ghosts in reports. Streaming publishes events to a broker (Kafka, Azure Event Hubs) and any number of consumers subscribe; right when minutes matter, such as security events or a termination that must disable access now. APIs (REST, OData, GraphQL) serve request-response integration; the ITSM platform IntegrationHub, Power Automate, and Azure API Management live here. Topology. Point-to-point integrations grow as roughly n² connections and become spaghetti. A hub (iPaaS or an enterprise service bus) or an event backbone gives one place to monitor, secure, and log. Hygiene, item by item. Idempotent: running a job twice yields the same result, so retries don’t double-count; use upserts keyed on business keys. Schema checks: reject or quarantine records that don’t match the expected contract. Retries with a dead-letter queue: failed messages park somewhere visible instead of vanishing. Monitoring: alert on freshness (didn’t arrive) and volume (arrived with a tenth of the usual rows). Credentials: managed identities or workload identities, not shared service-account passwords in scripts. Lineage: emit run metadata (OpenLineage is the open standard) so the catalog shows what fed what. Delivery semantics: at-most-once can lose messages, at-least-once can duplicate them (so consumers must be idempotent), exactly-once is expensive and usually approximated. Onboarding and offboarding is a pipeline: the HR system of record should drive account creation and removal in the cloud directory and the identity provider, asset assignment in the ITSM platform, and access reviews. The HR-table technical debt you’re working with the application development team is, at bottom, a data contract problem: unclear source of truth, inconsistent fields, and no agreed timing. Analogy: ETL is mixing live to a two-track master, so every decision is baked in. ELT is recording every mic to multitrack and mixing later, so you can always remix. CDC is punching in only the bars that changed instead of re-recording the whole song.

---

## Mesh, fabric, products, contracts: today’s vocabulary

*02 · Architecture*

**Data mesh**

**Data fabric**

- An org design, not a product
- A metadata-driven layer
- Domains own their data as products, on a self-serve platform, under federated governance.
- Automated discovery, integration, and policy across scattered sources. Usually sold as a platform.

**Data product**

**Data contract**

- A dataset built to be used
- Producer-consumer agreement
- Named owner, documentation, quality targets, refresh schedule, and access terms.
- Schema, meaning, quality, and change notice, checked automatically in the pipeline.

**Semantic layer**

- One definition of each metric, used by every report and every
- AI tool.
- For a small agency: one central platform, named domain stewards, and contracts on the few feeds that matter.

???

These terms show up in every vendor pitch. Here’s what each actually means. Data mesh (Zhamak Dehghani, 2019) is an organizational model for large enterprises where a central data team became a bottleneck. Four principles: domain-oriented ownership (the people who produce the data own it end to end), data as a product (built for consumers, not exhaust), a self-serve data platform (central tooling so domains don’t each reinvent pipelines), and federated computational governance (common standards, enforced automatically, decided jointly). It’s a way of distributing accountability, not a technology you buy. Data fabric is an architecture concept, popularized by Gartner, for a metadata-driven layer that connects data where it lives: active metadata, knowledge graphs, and automation to discover, integrate, and apply policy across sources. In practice it’s usually a vendor platform (Microsoft positions Fabric this way; others include Informatica, IBM, Denodo). Mesh is about who owns; fabric is about how it connects. They can coexist. Data product: a dataset (or API, or model) packaged for consumers. It has a named owner, documentation, a declared grain, quality targets, a refresh schedule, a version, and access terms. “The certified headcount table, refreshed nightly by 6 a.m., owned by the HR office, stewarded by you” is a data product. The test: could someone outside the producing team use it correctly without a meeting? Data contract: the formal agreement between a data producer and its consumers: schema and types, semantics (what each field means), quality expectations, freshness, and how much notice is given before breaking changes. The modern twist is enforcement: the contract is code, checked in the pipeline, so a breaking change fails a test instead of silently breaking ten dashboards. This is the same discipline as an interface control document, applied to data. Semantic layer (or metrics layer): one governed definition of each business metric (“mean time to resolve,” “active employees,” “committed exposure”) that every BI tool and AI assistant uses. It ends dueling dashboards, and it matters more with AI, because an assistant answering “how many active employees do we have?” needs the certified definition, not its guess. Small-agency guidance. Full mesh assumes domain teams with their own engineers, which your agency doesn’t have and doesn’t need. What scales down well: a single shared platform, named domain stewards (you for IT and HR), a handful of certified data products, and contracts on the critical feeds: HR to identity, finance to reporting, Insight to portfolio reporting. Analogy: a mesh is a band where each member writes and owns their own parts but everyone agrees on key and tempo. A data contract is the chart handed to the session player before the session: key, tempo, form, and “tell us before you change the bridge.”

---

## How this maps onto your agency’s stack

*02 · Architecture*

**Systems of record**

- Oracle EBS, Insight (Salesforce), the ITSM platform, HR system
- Business owners; you for IT and HR

**Identity**

- the cloud directory and the identity provider: who exists and what they may see
- HR is the source of truth; IT executes

**Content**

- SharePoint, OneDrive, Teams, Exchange, Box
- Records officer plus content owners

**Integration**

- IntegrationHub, Power Automate, APIM, Box workflows
- IT Operations and the application development team

**Analytics**

- data officer

**Configuration**

- the ITSM platform CMDB and asset records
- IT Operations (you)

**Governance**

- the compliance and DLP suite: catalog, labels, DLP, DSPM for AI
- CDAO, CISO, privacy, records, stewards

**Security data**

- the SIEM, EDR, the SSE platform, the identity provider logs
- CISO and SOC

???

The right-hand column is the leadership point: every layer has a different owner, and data governance is mostly about making those handoffs explicit. Systems of record. Rule: each critical data element has exactly one authoritative source; every other copy is a replica and says so. Identity. the cloud directory and the identity provider decide who exists and what they can reach, which makes them the enforcement point for nearly every data access control. Identity data is master data, and HR should be its source of truth. When HR and identity disagree, someone has access who shouldn’t, or someone can’t work. Content. Where most of your agency’s unstructured information lives. It’s also what Copilot and other AI tools read, so permissions and sensitivity labels here are AI controls. Integration. The pipes: the ITSM platform IntegrationHub, Power Automate flows, Azure API Management, and the Box workflows behind the maritime reinsurance app. Every flow carries data, so every flow needs an owner, a service identity, logging, and a note in the catalog. Analytics. Power BI today. Analytics belongs to the Office of the data officer. Configuration. The CMDB and asset records are your data products. They feed incident routing, change risk, vulnerability management, license compliance, and the logging maturity work under M-26-14, which depends on complete asset visibility. Governance tooling. the compliance and DLP suite covers the unified catalog, sensitivity labels, DLP, insider risk, eDiscovery, retention, and data security posture management for AI (which shows what Copilot and other AI apps touch). Licensing and GCC feature parity vary; check before you promise a capability. Security data. Logs and telemetry are data too, governed by the CISO, with retention now set by a risk-based logging plan rather than M21-31’s fixed tiers. Use this slide in conversations with the CDAO: it shows where IT Operations is data producer, data custodian, and data steward, and where it isn’t. Analogy: a touring production. The songwriters own the songs (systems of record), the tour manager decides who gets backstage passes (identity), the crew moves gear between venues (integration), the front-of-house engineer shapes what the audience hears (analytics), and the production manager keeps the gear list (CMDB).

---

## Quality and integrity

*03 / 09 · 03 · Quality And Integrity*

- Whether the data is right, whether it has been changed, and whether you can get it back.
- Quality dimensions · Quality as an operation · Four meanings of integrity · Integrity mechanisms ·
- Backup and resilience

???

Three questions anchor this section. Is the data fit for the decision it supports (quality)? Can you prove it hasn’t been altered, accidentally or deliberately (integrity)? And if it’s destroyed or encrypted by ransomware, can you get a trustworthy copy back in time (resilience)? Quality is mostly a business problem with technical tools; integrity and resilience are mostly technical problems with business consequences. You’re responsible for all three in different ways: as steward for IT and HR data, and as the operations director who runs backup.

---

## Six quality dimensions, measured on your agency data Dimension

*03 · Quality And Integrity*

- Question
- Example
- Measure
- Accuracy
- Does it match reality?
- Laptop assigned to the person who has it
- % of a sample verified
- Completeness
- Is anything missing?
- Every CI has an owner and support group
- % required fields filled
- Consistency
- Do systems agree?
- HR active staff versus enabled accounts
- Count of mismatches
- Timeliness
- Is it current enough?
- A separation reaches IT the same day
- Hours from event to update
- Validity
- Does it follow the rules?
- Country codes are valid ISO 3166
- % passing format rules
- Uniqueness
- One record per thing?
- One counterparty, not five spellings
- Duplicate rate
- Quality means fit for use. Measure the critical data elements against the decision they support, and declare the baseline before setting a target.

???

DAMA and most practitioners use some version of these six dimensions. You don’t need all of them for every dataset; pick the ones that matter for the decision. Accuracy: does the value match the real world? Hardest to measure, because you need ground truth: a physical inventory, a callback, a document check. Usually measured by sampling (verify 100 asset assignments in person and report the match rate with its margin of error). Completeness: are required values present? Easy to automate: percentage of records with required fields populated. Define “required” per use: a CI without a support group can’t route incidents, so that field is required; a CI without a purchase date may not be. Consistency: do two sources that should agree actually agree? The classic is HR versus identity: people active in HR versus enabled accounts in the cloud directory and the identity provider. Every mismatch is either an orphaned account (security risk) or a person who can’t work (service failure). This one reconciliation is probably the highest-value data quality check IT Operations can run. Timeliness: is the data current enough for its use? Measured as lag from real-world event to system update. A separation entered in HR three days late means three days of access after departure. Validity: does the value conform to format, type, range, and allowed-value rules? Country codes in ISO 3166, dates that are dates, email addresses that parse. Validity is not accuracy: a valid country code can still be the wrong country. Uniqueness: is each real-world thing recorded once? Duplicates in master data inflate counts, split history, and break matching. Measured as the duplicate rate after fuzzy matching (“Acme Holdings Ltd” versus “ACME HOLDINGS LIMITED”). Some frameworks add integrity (relationships hold, no orphans), conformity, and precision. Data scientists add one more for AI: representativeness. Fitness for use is the governing idea. The same dataset can be good enough for a trend chart and not good enough for a payment. Quality targets belong to the critical data elements that drive important decisions, not to every column. Measurement discipline, the same anti-ratchet rule you use for KPIs: measure the baseline before announcing a target, report the trend, and don’t let one good month become next year’s floor. Publish the scores; visibility alone improves quality, because the owners of bad data finally see it. Analogy: accuracy is playing the right notes; completeness is not dropping a verse; consistency is the band agreeing on the arrangement; timeliness is being on the beat; validity is staying in key; uniqueness is not having two drummers who both think they’re the drummer.

---

## Running quality as an operation, not a project

*03 · Quality And Integrity*

**1 · profile**

- Measure what’s there: nulls, ranges, duplicates

**2 · rules**

- Write testable rules for critical elements

**3 · monitor**

- Run them on every load; publish scores

**4 · triage**

- Log issues with an owner and a due date

**5 · fix at source**

- Correct the record and the process that broke it

**6 · prevent**

- Required fields, pick-lists, validation at entry
- -- assets assigned to people not active in HR
- SELECT a.asset_tag, a.assigned_to FROM asset a LEFT JOIN hr_person p
- ON p.id = a.assigned_to AND p.status = 'A'
- WHERE a.assigned_to IS NOT NULL
- AND p.id IS NULL;

**Cmdb health**

- Completeness, correctness (duplicates, orphans, stale CIs), and compliance with audit rules.

???

Data quality programs fail when they’re run as one-time cleanups. The data degrades again within months because the process that created the bad records is unchanged. Treat it as an operation, like incident management. 1. Profile. Before writing rules, look at the data: null rates, distinct values, ranges, outliers, duplicate candidates, pattern frequencies. Profiling often reveals the real problems in an hour (a “country” field with 400 distinct values, an install date in 1900). 2. Rules. Write testable rules for critical data elements: not null, unique, in an allowed list, matches a pattern, references a valid parent, within a range, consistent with another system. Each rule has an owner and a threshold. 3. Monitor. Run the rules automatically every time data loads, and publish scores on a dashboard by domain and owner. Modern data observability tools add five pillars on top: freshness (did it arrive on time), volume (did the expected amount arrive), schema (did the structure change), distribution (did values shift unexpectedly), and lineage (what’s downstream if this breaks). 4. Triage. Failures become issues in a queue with an owner, severity, and due date. Running data issues through the ITSM platform like any other ticket is a perfectly good start. 5. Fix at the source. Correct the record in the system of record (not in the report), and find the process failure that produced it. 6. Prevent. Push the rule upstream into the entry point: required fields, reference lists instead of free text, format validation, duplicate checks at creation, automation instead of rekeying. The query on the slide is a working example of a consistency rule. It joins every assigned asset to the HR person table and returns assets whose assignee isn’t an active employee: departed staff still holding laptops, or assignments to people who never existed. Run it weekly, trend the count, and each row is a recovery action for ITAM. The same pattern (LEFT JOIN, filter where the match IS NULL) finds orphaned accounts, licenses, and CIs. CMDB Health. the ITSM platform’s built-in CMDB Health dashboard scores three things: completeness (required and recommended fields populated), correctness (duplicates, orphan CIs with no relationships, and stale CIs not updated within a set period), and compliance (CIs that pass audit rules you define). Leadership: fund prevention over cleanup, publish scores by owner, and make data issues part of operational reviews. Quality that nobody sees doesn’t improve. Analogy: a sound check every night, not a remix after the tour. Fix the buzzing cable, not the recording of the buzz.

---

## “Integrity” means four different things

*03 · Quality And Integrity*

**1 · security**

**2 · database**

- Not altered without authorization
- Only valid states exist
- The I in CIA. Rated in FIPS 199; protected by access control, hashing, logging.
- Entity, referential, and domain integrity, enforced by keys, constraints, and transactions.
- Asks: CISO, assessors
- Asks: DBAs, architects, stewards

**3 · information quality**

**4 · records and evidence**

- Disseminated information is protected
- Authentic, reliable, complete
- The IQA standard: quality, objectivity, utility, integrity. The public can request correction.
- Provable chain of custody and context, so a record holds up in an audit or in court.
- Asks: CDO, OIG, the public
- Asks: records officer, counsel, IG
- When someone says integrity, ask which one. Each has a different control, owner, and proof.

???

A lot of confusion in data conversations comes from one word carrying four meanings. 1. Security integrity. The I in the confidentiality-integrityavailability triad: information is protected from improper modification or destruction, including ensuring non-repudiation and authenticity. FIPS 199 asks you to rate the impact of a loss of integrity as low, moderate, or high for each information type. Controls: least privilege, change control, cryptographic hashing and signatures, file integrity monitoring, logging. The CISO and assessors use the word this way. 2. Database integrity. The database only ever holds valid states. Entity integrity: every row has a unique, non-null primary key. Referential integrity: every foreign key points to an existing row (no orphaned assets, no tickets for deleted users). Domain integrity: values are within allowed types and ranges. Enforced by constraints and ACID transactions. Architects and DBAs mean this. 3. Information quality integrity. The Information Quality Act (Section 515 of the FY2001 appropriations act) and OMB’s 2002 guidelines require agencies to ensure the quality, objectivity, utility, and integrity of information they disseminate. Interesting twist: OMB defines integrity in that context as security, meaning protection of the information from unauthorized access or revision. OMB M-19-15 (2019) updated implementation expectations, including for influential information and transparency about methods. Your agency publishes its own information quality guidelines, and correction requests go to the Chief Data Officer. If a published your agency dataset is wrong, this is the process that will be invoked. 4. Records and evidentiary integrity. Records management standards (ISO 15489, reflected in NARA’s regulations) describe four characteristics of a trustworthy record: authenticity (it is what it claims to be), reliability (its contents can be trusted), integrity (complete and unaltered), and usability (it can be found and read). For evidence, add chain of custody. A useful crossindustry checklist is ALCOA+, from FDA-regulated industries: attributable, legible, contemporaneous, original, accurate, plus complete, consistent, enduring, and available. It travels well to any record that might be audited: an acquisition evaluation file, an access approval, a deal decision. Why leaders care: “the integrity of the data” in an OIG finding, a privacy complaint, a contractor dispute, and a court filing are four different allegations. Answering with the wrong evidence wastes time. Answering with the right one (audit logs, constraint design, IQA process, chain of custody) closes the issue. Analogy: a recording can be tampered with (security), out of sync between tracks (database), misreported on the album credits (information quality), or impossible to prove as the original master (records). Four different problems, four different fixes.

---

## The mechanisms that prove data hasn’t changed

*03 · Quality And Integrity*

- Mechanism
- What it proves
- Where you see it
- Hash (SHA-256)
- Content is bit-for-bit identical
- Fixity checks, evidence, downloads, SBOMs
- Digital signature
- Identical, and who signed it
- Code signing, signed exports, PIV signing
- Constraints, transactions
- Only valid states were written
- Keys, CHECK rules, ACID commits
- Audit trail
- Who changed what, and when
- the ITSM platform audit, the compliance and DLP suite audit, DB logs
- Versioning
- Earlier states can be recovered
- SharePoint versions, lakehouse time travel
- Immutability
- Can’t be altered or deleted for a period
- Object lock, immutable backups, holds
- Provenance
- Where it came from and how it was edited
- Lineage graphs, C2PA content credentials
- Crypto must be FIPS-validated: FIPS 140-2 certificates moved to NIST’s historical list on September 21, 2026. Specify FIPS 140-3.

???

The technical toolkit, from the math up. Cryptographic hashes. A hash function (SHA-256 is the standard choice) turns any input into a fixed-length fingerprint. Change one bit of the input and the hash changes completely, and it’s computationally infeasible to craft a different input with the same hash. Store the hash when data is created or received; recompute it later; if they match, the content is unchanged. Archives call this a fixity check. It proves sameness, not origin: anyone can compute a hash. MD5 and SHA-1 are broken for security purposes and shouldn’t be used to prove integrity against an adversary. Message authentication codes and digital signatures add origin. An HMAC uses a shared secret key: only someone with the key could have produced the tag. A digital signature uses a private key and is verified with the public key, so it proves who signed and that nothing changed since, with non-repudiation. PIV cards sign email and documents this way; code signing proves software came from its publisher. Postquantum signature algorithms (ML-DSA, SLH-DSA) are part of the PQC migration in section 05. Database mechanisms (constraints and transactions) were covered in section 02: they stop invalid data from being written at all. Audit trails record who changed what, when, from where, and the old and new values. the ITSM platform keeps field-level audit history on audited tables; the compliance and DLP suite Audit covers Microsoft 365 activity; databases have native auditing. Audit logs only count if they are themselves protected: shipped to a separate store (the SIEM) the admins being audited can’t edit. Versioning keeps prior states: SharePoint version history, object storage versioning, and Delta or Iceberg time travel. It turns accidental overwrites into a restore instead of a loss. Immutability, often called WORM (write once, read many): storage that refuses modification or deletion until a retention date, even by administrators. Object lock in Azure Blob immutable storage or S3, immutable backup vaults, retention locks, and litigation holds. This is your strongest defense against ransomware and malicious insiders deleting evidence. Provenance records origin and transformations: lineage graphs for datasets (section 04), and C2PA content credentials for images, audio, and video, which embed signed edit histories; increasingly relevant as AI-generated media spreads. FIPS validation. Federal systems must use cryptographic modules validated under the Cryptographic Module Validation Program. FIPS 140-3 replaced 140-2, and NIST moved all remaining FIPS 140-2 certificates to the historical list on September 21, 2026, so new purchases should cite FIPS 140-3 validation. Write it into contract language. Analogy: the FLAC audio format stores an MD5 fingerprint of the original audio inside the file. Decode it years later, recompute the fingerprint, and you know the music is bit-for-bit what was recorded. That’s a fixity check, built into the format.

---

## Resilience: the copy you can actually restore

*03 · Quality And Integrity*

- Last good backup
- Incident

**Rpo · data you can lose**

- Service restored

**Rto · time to restore**

- 3-2-1-1-0

**Saas is shared**

**Ransomware**

- 3 copies, 2 media, 1 offsite, 1 immutable or offline, 0 errors in restore tests.
- Microsoft, the ITSM platform, and Salesforce keep the service up. Getting your deleted or corrupted data back is on you.
- Backups restore encrypted data; they don’t un-steal exfiltrated data. Encryption and DLP cover that.
- A backup you haven’t restored is a hope, not a control. Test restores on a schedule and record the results.

???

Resilience is the availability and integrity of data under stress: hardware failure, a bad change, a malicious insider, ransomware, or an AI agent that deletes the wrong thing. RPO and RTO. Recovery point objective is how much data you can afford to lose, measured as time between the last good copy and the incident; a nightly backup means an RPO of up to 24 hours. Recovery time objective is how long the business can wait for service to return. Both are business decisions, set by the data owner with IT, recorded in the business impact analysis and contingency plan (NIST SP 800-34), and tested. IT shouldn’t be guessing them. 3-2-1-1-0. The classic 3-2-1 rule (three copies, two different media, one offsite) has grown two digits for the ransomware era: one copy immutable or offline so an attacker with admin credentials can’t delete or encrypt it, and zero errors in verified restore tests. CISA’s #StopRansomware guidance says the same thing in plainer words: maintain offline, encrypted backups and test them. SaaS shared responsibility. Cloud providers are responsible for the platform staying up; they generally aren’t responsible for restoring data you or an attacker deleted or corrupted beyond their native retention windows. Microsoft 365 retention policies are compliance tools, not backups. That’s why your agency uses third-party backup (backup tooling, backup tooling, Quest) for Microsoft 365 and other platforms. Check that each critical SaaS system (the ITSM platform, Salesforce, Box) has a defined, tested restore path, including restoring a single record, not just the whole instance. Ransomware is now usually double extortion: data is stolen before it’s encrypted. Backups solve the encryption half. The theft half is solved by encryption at rest with keys the attacker can’t reach, least privilege, DLP, egress monitoring, and not keeping data you don’t need. Agents and automation are a new failure mode. The AI deck’s April 2026 example, a coding agent deleting a production database and its backups through one API call, is a backup architecture lesson: backups must sit outside the blast radius of any single credential, human or machine. NIST’s data integrity practice guides cover this end to end: SP 1800-25 (identifying and protecting assets against ransomware and destructive events), SP 1800-26 (detecting and responding), and SP 1800-11 (recovering). Leadership: ask for the last successful restore test of each high-value system, how long it took against the RTO, and whether backup credentials are separate from production admin credentials. Analogy: in 2008 a fire on the Universal Studios backlot destroyed a vault of original master recordings, a loss reported publicly in detail only years later. Many had no copies anywhere else. That’s an RPO of forever: the one-of-one master with no offsite copy.

---

## Governance and stewardship

*04 / 09 · 04 · Governance*

- Who decides, who answers for it, who does the work, and how you know it’s working.
- Governance versus management · Roles · What a steward does · Master and reference data · Lineage and catalogs · Maturity and metrics

???

This section is about people and decisions more than technology. Data governance is the exercise of authority and control over data: deciding the rules, assigning accountability, and resolving conflicts. It’s also the section closest to your new designation as data steward for IT and HR data. The slides move from structure (governance versus management, operating models, roles) to practice (what a steward actually does each week, master data, lineage) to measurement (maturity and metrics), and section 09 turns it into a 90-day plan.

---

## Governance decides; management executes

*04 · Governance*

**Governance**

**Management**

- Sets direction and oversees
- Does the work
- Policy and standards · decision rights · priorities · definitions of record · risk acceptance · dispute resolution
- Architecture · pipelines · quality operations · security operations · storage and backup · catalog upkeep

**Operating models**

- Centralized
- One team decides and does. Consistent; becomes a bottleneck.

**Document stack**

- Charter
- Hub and spoke
- Central CDO and board; stewards in each domain. Fits your agency.
- Policy
- Standards
- Decentralized
- Each office governs itself. Fast; definitions diverge.
- Procedures

???

DAMA’s distinction is the useful one: governance is the exercise of authority, control, and shared decision-making over data; management is planning and executing the activities that achieve the outcomes governance sets. Governance writes the rules and settles disputes; management builds, runs, and fixes. If the same people do both, write down which hat they’re wearing for each decision. What governance decides, concretely: policies (what must happen), standards (how to do it consistently: naming, codes, quality thresholds, classification labels), decision rights (who may define a term, approve access, accept a quality exception, approve a new data source for AI), priorities (which data domains and critical data elements get attention first), the definitions of record (what “active employee” and “committed exposure” mean), risk acceptance for data, and dispute resolution when two offices disagree. Operating models: Centralized: one team owns decisions and execution. Consistent, but it can’t know every domain and becomes a queue. Hub and spoke (federated): a central function (the CDAO and a governance board) sets enterprise standards and arbitrates; designated stewards in each domain apply them and own local definitions and quality. This is the model that fits a 900-person agency with a small central data office, and the one the Evidence Act implies: a Chief Data Officer, a data governance body, and named people in each office. Decentralized: each office governs itself. Fast and locally relevant; definitions diverge until no enterprise report reconciles. Evidence Act baseline. Every agency must have a Chief Data Officer, and OMB M-19-23 directed agencies to set up a data governance body chaired by the CDO with senior representation, to drive the data strategy, inventory, and priorities. (The Evaluation Officer, Statistical Official, and learning agenda requirements in Title I apply to CFO Act agencies, which your agency is not.) The document stack. A charter establishes the body’s authority, membership, and decision process. Policies state requirements in a few pages. Standards make them specific and testable. Procedures say step by step how. Keep policy short and stable; put change-prone detail in standards and procedures so you don’t need executive signature for every update. The decisionrights point connects to your existing concern about the four co-equal the IT office directors: undocumented decision rights are a governance risk in data exactly as in IT consolidation. A one-page RACI for data decisions prevents months of circular meetings. Analogy: governance is the band agreeing on the setlist, the key of each song, and who calls the changes. Management is the playing, the tuning, and the load-in. Bands break up over the first, not the second.

---

## Roles: owner, steward, custodian, and the officials around them

*04 · Governance*

- Role
- Who, typically
- Accountable for Chief Data Officer
- Your agency’s data officer
- Data strategy, inventory, open data, governance body
- Governance body
- Senior leaders, chaired by the CDO
- Priorities, policy approval, disputes
- Data owner
- Senior executive for a domain
- Access decisions, quality targets, risk acceptance
- Data steward
- Named expert: you, for IT and HR
- Definitions, rules, issues, day-to-day approvals
- Data custodian
- IT staff and contractors
- Storage, backup, security controls, operations
- Data consumer
- Everyone who uses it
- Use within purpose, policy, and handling rules
- SAOP · privacy
- SAORM · records
- CISO · security
- CAIO · AI use
- CIO · IT resources
- IT holds the data; the business owns it. Confusing custodian with owner is the most common governance failure.

???

Role definitions that hold up in practice. Chief Data Officer. Statutory under the Evidence Act (44 U.S.C. 3520) for every agency: responsible for lifecycle data management, the comprehensive data inventory, the open data plan, coordinating data governance, and serving on the federal CDO Council. at your agency that function sits in the Office of the data officer. Governance body. Senior representatives from the major offices, chaired by the CDO, deciding priorities and policy and resolving disputes. It should meet with an agenda of decisions, not updates. Data owner. A senior business executive accountable for a data domain: who may access it, what quality is acceptable, what risks are accepted, and how it may be shared. Owners delegate the daily work but keep accountability. For HR data that’s an the HR office executive; for deal data, the investment offices; for IT operational data, the CIO or you. Data steward. The working expert who makes the owner’s accountability real: maintains definitions and the glossary entries for the domain, writes and monitors quality rules, triages issues, reviews access requests against policy, approves changes to definitions and reference lists, and is the first person consulted on any use of the data. Stewards are often business experts, sometimes technical, ideally both. Your designation for IT and HR data puts you here. (Some programs split business stewards, who own meaning, from technical stewards, who own structure.) Data custodian. Runs the systems: storage, backup, patching, access control implementation, monitoring. Usually IT staff and contractors. Custodians implement decisions; they don’t make them. Data consumer. Anyone using the data, responsible for using it within purpose and handling rules. The adjacent officials each own a lens on the same data: the Senior Agency Official for Privacy (personal data, PIAs, SORNs, breach response), the Senior Agency Official for Records Management (schedules, disposition, transfers to NARA), the CISO (security controls and risk), the Chief AI Officer (whether and how AI may use it), and the CIO (IT resources and FITARA authority). A healthy program gives each of them a defined touchpoint in data decisions rather than having each discover issues separately. The band on the slide is the failure to watch for. When IT is treated as the owner of data because it runs the system, IT ends up making business decisions (who should see this, what does this field mean) it has no authority to make, and the business disowns the quality problems. Write the owner’s name on every critical dataset. Analogy: the songwriter owns the song, the producer stewards how it’s recorded, the studio engineer is the custodian who keeps the tapes safe, and the listeners are consumers. When the engineer starts rewriting lyrics, something has gone wrong.

---

## What a data steward actually does

*04 · Governance*

**Define**

**Measure**

**Resolve**

- Terms and critical elements
- “Active employee,” “primary user,”
- “separation date”
- Rules and scores
- Weekly HR-to-identity reconciliation, trended
- Issues to root cause
- Duplicate people in the ITSM platform; who creates them, and why

**Approve**

**Change**

**Connect**

- Access and new uses
- Headcount to a contractor; HR data into an
- AI tool
- Definitions and code lists
- New office codes after a reorganization, under change control
- Privacy, records, security
- SORN check before a new HR data flow goes live
- Write stewardship into the position description and the work plan. Unfunded stewardship is a title, not a function.

???

The steward is where governance becomes real work. Six verbs cover it; the examples are from your two domains. Define. Own the business glossary entries and critical data elements for the domain. For the HR office: active employee, contractor versus federal, duty station, separation date, supervisor of record. For the IT office: primary user of a device, CI owner, support group, end-of-life date. A good definition names the system of record, the rule, edge cases (detailees, interns, people on leave without pay), and the owner. Getting the HR office and IT to agree on “active” fixes more access problems than any tool. Measure. Choose a few quality rules per critical element, automate them, set baselines, and publish scores. The HR-to-identity reconciliation is the flagship: active in HR versus enabled in the cloud directory and the identity provider, trended weekly. Resolve. Triage data issues, assign fixes to the right owner, and chase root cause. Duplicate person records in the ITSM platform usually trace to a process (manual creation during onboarding, a second integration, a name change) rather than careless people. Approve. Within the policy the data owner sets, review requests to access or newly use the data: a headcount extract for a contractor, HR data in a Power BI workspace, or employee data used by an AI tool (which also needs the CAIO’s process and a privacy check). The steward doesn’t decide policy; the steward applies it consistently and escalates what doesn’t fit. Change. Definitions and reference lists change under control: office codes after a reorganization, new asset categories, retired job series. Version them, announce changes before they land, and check downstream reports and integrations (lineage tells you which). Connect. Be the liaison to the privacy office (is this covered by a SORN routine use? is a PIA needed?), records (what schedule applies?), security (what’s the impact level?), and the CDAO (is it in the inventory?). Most data incidents happen because one of these conversations didn’t occur. Practical cadence: a weekly glance at scores and the issue queue; a monthly steward sync with the HR office counterparts; quarterly definition review and access recertification; and ad hoc reviews whenever a new system, integration, or AI use touches the domain. Your designation was accepted in FY26 with no activity yet, so section 09 lays out a first-90-days plan. The band is the leadership point, and it applies to you and to anyone you appoint: stewardship has to show up in the position description and the performance work plan with real time attached, or it competes with every operational fire and loses. Analogy: the steward is the band’s musical director. They don’t own the songs and they don’t run the venue, but they keep the charts current, call out who’s off, approve the guest player, and make sure everyone is playing the same arrangement.

---

## Master and reference data: one version of the important nouns

*04 · Governance*

**Mdm styles, lightest to heaviest**

**One counterparty**

- Registry
- An index that links records across sources
- Consolidation
- A golden copy for reporting; sources unchanged
- Coexistence
- Golden record syncs back to the sources
- Centralized
- Created only in the hub, pushed everywhere

**Match**

**Merge**

**Steward**

- Find likely duplicates
- Survivorship rules pick values
- Humans settle the rest
- Acme Holdings Ltd

**Acme holdings limited**

- Acme Hldgs.
- → one ID, with an LEI or UEI attached

**Reference data**

- ISO 3166 countries, ISO 4217 currencies, NAICS: managed once, versioned, distributed.

???

Master data management (MDM) is the discipline of keeping one trusted version of core entities (people, organizations, vendors, locations, assets) across the systems that each hold a copy. Implementation styles, from light to heavy: Registry: a cross-reference index that says “record 123 in Salesforce, 9876 in Oracle, and abc in the ITSM platform are the same entity.” Sources aren’t touched. Cheapest; good for analytics joins. Consolidation: build a cleaned golden copy in a hub for reporting and analytics; sources stay as they are. Coexistence: the golden record is maintained in the hub and synchronized back to sources, so they converge over time. Centralized (transaction): new entities can only be created in the hub, which publishes them out. Strongest control, highest change cost. The golden-record process. Match: find candidate duplicates with deterministic rules (same tax ID) and probabilistic or fuzzy matching (name similarity, address normalization, phonetic matching), producing a match score. Merge: survivorship rules decide which value wins per field (most trusted source for legal name, most recent for address, most complete for contact). Steward: records that score in the uncertain middle go to a human queue. Never auto-merge low-confidence matches; un-merging is painful. Identifiers are the shortcut. For US federal vendors, the SAM.gov Unique Entity ID (UEI) replaced the DUNS number in April 2022. For legal entities worldwide, the Legal Entity Identifier (LEI, ISO 17442) is a public 20-character code with ownership data. For a development finance agency doing due diligence on sponsors, borrowers, and their parents across jurisdictions, carrying standard identifiers on every counterparty record makes matching, sanctions screening, and beneficial-ownership analysis far more reliable. People are master data too. The employee record in the HR system of record should be the master for identity, with the cloud directory, the identity provider, and the ITSM platform user records as governed copies keyed to the same employee ID. Duplicate users in the ITSM platform and orphaned accounts are MDM failures. Reference data management: maintain authoritative code lists (ISO 3166-1 country codes in alpha-2, alpha-3, and numeric forms; ISO 4217 currencies; NAICS; internal office and cost center codes) in one place, version them with effective dates, and distribute them to every system. Countries do change: codes are added and retired, and a development finance portfolio spans most of the world, so stale lists show up quickly in reporting. Leadership: MDM tools are expensive and slow if started as a big platform. Start with one domain, one critical use (for example, a single counterparty ID across Insight and Oracle EBS), registry or consolidation style, and stewards for the exception queue. Analogy: the master recording versus a dozen bootlegs with different track names. MDM finds the bootlegs, decides which master is the real one, and labels every copy with the same catalog number.

---

## Lineage and catalogs: trace it, or you can’t defend it

*04 · Governance*

**Source**

**Feed**

**System**

**Model**

**Output**

- HR system
- Nightly file
- the ITSM platform users
- “Active staff”
- Leadership report

**Business lineage**

**Technical lineage**

**How it’s captured**

- Which systems and steps feed a report, in plain language. For owners and auditors.
- Column to column, through every transform. For impact analysis and debugging.
- Scanners parse SQL and pipelines;
- OpenLineage events; manual entries for the rest.

**Catalog: find**

**Understand**

**Trust**

**Govern**

- What exists
- What it means
- Quality and lineage
- Labels, owners, access

???

Lineage is the recorded path of data from origin to use: which sources, which transformations, which intermediate stores, which reports. It answers two questions every leader eventually gets asked: “where did this number come from?” (trace backward) and “if we change this field, what breaks?” (trace forward, called impact analysis). The example chain is real in shape: the HR system of record exports a nightly file; it updates the ITSM platform user records; a Power BI model defines “active staff” from those records; the model feeds a leadership report. When the report says 912 and the HR office says 905, lineage tells you which step introduced the difference: a timing gap in the feed, a filter in the model, contractors counted in the ITSM platform but not HR. Business versus technical lineage. Business lineage is the readable version for owners and auditors: systems and steps, not SQL. Technical lineage goes column to column through every join, filter, and calculation, which engineers need for debugging and impact analysis. Good catalogs show both, linked. How it’s captured. Automated scanners parse SQL, stored procedures, ETL definitions, and BI models (the compliance and DLP suite scans many Azure and Power BI sources). OpenLineage is an open standard where pipelines emit run events describing inputs and outputs, so lineage builds itself as jobs run. For systems no scanner understands (a SaaS export, a spreadsheet step, a manual upload), stewards document the hop by hand; mark manual lineage as such. Catalogs pull it together with four jobs. Find: search across systems for what exists. Understand: business definitions, owners, and documentation. Trust: quality scores, freshness, lineage, and certification badges (“this is the certified headcount dataset”). Govern: classification labels, retention, access policies, and who to ask. Examples: the compliance and DLP suite Unified Catalog, Collibra, Alation, Informatica, Databricks Unity Catalog. Under M-25-05 the agency’s comprehensive data inventory is the public slice of this, described in DCAT-US v3.0. Critical data elements are the scoping trick: you can’t trace everything, so trace the elements that feed regulatory reports, payments, KPIs, and anything going to OMB or Congress. Lineage is also an AI control. If an AI assistant answers from a dataset, lineage tells you what it was built from, whether it’s current, and whether it carries sensitive data from upstream. Analogy: sample clearance. If a track samples another record, the label has to trace it back to the original master and its owner before release; an untraceable sample is a lawsuit waiting to happen. An untraceable number in a report to Congress is the same thing.

---

## Maturity and metrics: measure outcomes, not paperwork

*04 · Governance*

**1 · initial**

- Heroics; nobody owns definitions

**2 · repeatable**

- Some owners; rules live in people’s heads

**3 · defined**

- Policy, glossary, CDEs, named stewards

**4 · managed**

- Quality measured; catalog and lineage live

**5 · optimized**

- Controls automated; problems prevented

**Metrics worth reporting**

- % of critical elements with owner and definition
- Quality scores on critical elements, against baseline
- Median days to resolve a data issue
- % of inventory with classification and metadata Access recertifications done on time
- HR-to-identity mismatches, trended
- Most federal agencies sit at 2 to 3. Over half of federal CDOs report five or fewer staff.

???

Maturity models give you a shared language for “where are we and what’s next.” DCAM, the CMMI Data Management Maturity model, Gartner’s, and the federal CDO Council’s assessments all use a similar five-step shape: 1. Initial: data work depends on individual heroics; no one owns definitions; every data call is a fire drill. 2. Repeatable: some owners and practices exist in pockets; rules are tribal knowledge. 3. Defined: a policy and charter, a business glossary, critical data elements identified, named stewards, a documented issue process. 4. Managed: quality is measured and published; a catalog and lineage are maintained; data products have service levels. 5. Optimized: controls are automated (labels applied by policy, quality rules in pipelines, access by attribute), and effort shifts from cleanup to prevention. Data is reliably ready for analytics and AI. The claim that most agencies sit at 2 to 3 is a practitioner’s generalization, not a published score; treat it as a starting hypothesis and assess your agency honestly. The staffing fact is published: in the 2025 federal CDO survey (Data Foundation and Deloitte), 57% of CDOs reported operating with five or fewer full-time staff, up from 36% in 2024. Small central teams are the norm, which is exactly why stewards in the business carry so much of the work. Metrics. Report outcomes, not activity (“we held 12 governance meetings” is not a metric). The six on the slide are measurable with tools your agency has: Coverage of critical data elements with a named owner and an approved definition. Quality scores on those elements, trended against a declared baseline. Median time to resolve a data issue, from the issue queue. Percentage of inventoried data assets with a classification label and complete metadata (which the M-25-05 inventory and DCAT-US already require). Access recertifications completed on schedule for sensitive datasets. The HR-to-identity mismatch count, trended weekly: a single number that speaks to security, service, and data quality at once. The same anti-ratchet discipline you apply to KPIs applies here: baseline first, targets relative to baseline, and no penalty for a good year resetting the floor. Data metrics are especially prone to ratcheting because early cleanup produces dramatic gains that can’t repeat. Analogy: maturity is a band’s progression from a garage jam (initial), to playing the same songs the same way (repeatable), to written charts (defined), to recorded and reviewed shows (managed), to a touring act where the crew runs the changeovers without thinking (optimized).

---

## Security and privacy

*05 / 09 · 05 · Security And Privacy*

- Classifying data, protecting it wherever it goes, preparing it for quantum, honoring the Privacy Act, and sharing it safely.
- Classification and CUI · Protection controls · Post-quantum · Privacy · Sharing and access · SaaS integration risk

???

Zero trust made data a security pillar in its own right: security that travels with the data rather than living only at the network edge. This section covers how data is categorized (FIPS 199, CUI, sensitivity labels), how it’s protected (encryption, key management, DLP, access by attribute), the postquantum migration now under hard federal deadlines, privacy law in practice, the agreements that govern sharing, and the integration risk that turned a chatbot plug-in into one of 2025’s largest data thefts. The classified-environment version of all of this is section 08.

---

## Classification: decide what it is, and the rest follows

*05 · Security And Privacy*

**Public**

**Internal**

**Cui basic**

**Cui specified**

**Classified**

- Approved for release; open by default
- Not for release; no CUI authority
- Law or policy requires safeguarding
- The authority adds specific handling
- Separate systems and rules: section 08

**Fips 199**

**Cui · eo 13556**

**Sensitivity labels**

- Rate each information type low, moderate, or high for confidentiality, integrity, availability (SP 800-60).
- 32 CFR 2002 and the CUI Registry.
- Moderate confidentiality is the floor.
- Banner: CUI, or CUI//SP-category.
- the compliance and DLP suite labels map the scheme onto files and email so encryption and DLP follow automatically.
- Label at creation, by default, and let controls key off the label. Manual labeling after the fact never catches up.

???

Three overlapping schemes; know which question each answers. FIPS 199 security categorization answers “how bad would a loss be?” For each information type (NIST SP 800-60 provides the catalog), rate the impact of a loss of confidentiality, integrity, and availability as low, moderate, or high. The system takes the high-water mark, which selects its NIST SP 800-53 baseline. Controlled Unclassified Information answers “does a law, regulation, or government-wide policy require this to be protected or limited in dissemination?” Established by Executive Order 13556 (2010), implemented in 32 CFR Part 2002, overseen by NARA’s Information Security Oversight Office, with categories listed in the CUI Registry (privacy, procurement and acquisition, financial, legal, proprietary business information, export control, and dozens more). CUI Basic gets the standard safeguards: on federal systems, no less than moderate confidentiality. CUI Specified carries extra handling requirements set by its authorizing law, and the banner names the category with an SP- prefix. Limited dissemination controls such as NOFORN, FEDCON, NOCON, and REL TO restrict audiences further. A document is marked “CUI” at the top, with a designation indicator identifying the originating agency. FOUO, SBU, and similar legacy markings are retired under the CUI program. For contractors, the FAR Council re-proposed the government-wide CUI rule on June 23, 2026 as part of the FAR overhaul: CUI provisions move to FAR Part 40, contractor systems would meet NIST SP 800-171 Revision 3, and CUI incidents would be reported within 72 hours. It isn’t final yet. On the defense side, the Department of War suspended CMMC Phase II on July 13, 2026 for a program review, but DFARS 252.204-7012 and SP 800-171 obligations remain. Sensitivity labels answer “how does the control system know?” the compliance and DLP suite labels (for example Public, Internal, CUI, CUI Specified) embed in files and email and drive encryption, watermarking, DLP rules, external sharing limits, and Copilot behavior. The label scheme should map one-to-one onto your policy categories, and be few enough that people actually pick the right one. PII is usually CUI (Privacy categories) and carries its own Privacy Act and breach rules (next slides). Derived data inherits its source’s classification: an extract, a dashboard, or an embedding of CUI is CUI. Leadership: the band is the operating principle. Default labels on new content, auto-labeling for recognizable patterns (SSNs, bank numbers, passport numbers), and mandatory labeling on save beat any awareness campaign. And remember aggregation: individually low-sensitivity records can become sensitive in bulk. Section 08 shows how classified systems treat that formally. Analogy: classification is the parental advisory and region code on a release: it decides which stores can carry it, who can buy it, and where it can ship, before anyone listens to a note.

---

## Protection that travels with the data Control

*05 · Security And Privacy*

- What it does
- Typical tooling
- In transit
- TLS everywhere; TLS 1.3 support by Jan 2, 2030
- the SSE platform, Azure, SaaS endpoints
- At rest
- AES-256 in FIPS 140-3 validated modules
- Microsoft 365, Azure, SaaS
- Key management
- Customer-managed keys in an HSM; split duties
- Azure Key Vault, Managed HSM
- In use
- Process data inside hardware enclaves
- Confidential computing
- Mask, tokenize
- Hide or substitute real values outside production
- Test data, analytics extracts

**Dlp, casb**

- Detect and stop sensitive data leaving
- the compliance and DLP suite DLP, the SSE platform, EDR for Cloud Apps
- Access by attribute
- User, device, label, and context decide access
- the cloud directory conditional access, labels

**Dspm**

- Find sensitive data and exposure across stores
- the compliance and DLP suite DSPM, including for AI
- Zero trust puts the perimeter on the data: define it, secure it, manage it. The CDO and CISO councils’ joint guide is built on those three verbs.

???

The technical controls, with the detail you’ll be asked about. Encryption in transit. TLS protects data moving between systems. TLS 1.2 is the floor; TLS 1.3 removes legacy ciphers and speeds the handshake. Executive Order 14306 carried forward a requirement for agencies to support TLS 1.3 or a successor by January 2, 2030, and OMB’s post-quantum memo asks agencies to plan for it. Inside your network, the SSE platform’s inspection terminates and re-establishes TLS, which is itself a data-handling decision to document. Encryption at rest. AES-256 is standard. Federal systems must use cryptographic modules validated under FIPS 140-3. Microsoft 365, Azure, and major SaaS encrypt at rest by default; the real questions are who holds the keys and who can use them. Key management. Platform-managed keys are simplest. Customer-managed keys (in Azure Key Vault or Managed HSM) let the agency rotate and revoke, and prove separation between the people who administer data and the people who control keys. Microsoft 365 Customer Key and Double Key Encryption go further for the most sensitive content, at a real cost in usability and features. Key loss is data loss; key management needs its own backup and break-glass process. Encryption in use. Confidential computing runs workloads inside hardware-isolated enclaves so even the cloud operator can’t read memory. Niche today; growing for sensitive analytics and AI. Masking and tokenization. Static masking replaces real values in copies (test and training environments should never hold production PII). Dynamic masking hides fields at query time based on the user. Tokenization swaps a value for a meaningless token, with the mapping held in a separate vault; format-preserving encryption keeps the shape so applications don’t break. DLP and CASB. Data loss prevention inspects email, endpoints, and cloud apps for sensitive patterns and labels, then warns, blocks, or encrypts. Cloud access security brokers (EDR for Cloud Apps, the SSE platform) see SaaS use and enforce session controls. These are the controls that also catch sensitive data being pasted into unapproved AI tools. Access by attribute. Role-based access gets coarse fast. Attributebased access decides by user attributes (office, clearance, citizenship), resource attributes (label, CUI category), and context (device compliance, location, risk). the cloud directory conditional access with sensitivity labels is a practical form of it. Data security posture management (DSPM) continuously discovers where sensitive data actually lives, who can reach it, and where it’s overexposed. the compliance and DLP suite’s DSPM for AI specifically shows sensitive data flowing into Copilot and other AI apps. Zero trust framing. OMB M-22-09 made data a zero trust pillar; CISA’s Zero Trust Maturity Model lists its functions as inventory management, categorization, availability, access, and encryption. The Federal Zero Trust Data Security Guide from the CDO and CISO councils (October 2024) is organized as define the data, secure the data, manage the data, which is the whole of this deck in three verbs. Analogy: encryption is the flight case, key management is who carries the keys to the flight cases, DLP is the security guard checking what leaves the loading dock, and attribute-based access is the laminate that says which areas of the venue each person can enter tonight.

---

## Post-quantum: a data problem with a deadline

*05 · Security And Privacy*

**Jun 22, 2026**

- EO 14412 sets hard federal PQC deadlines

**Jun 24, 2026**

- OMB M-26-15: five phases, 2026 to 2035

**~oct 22, 2026**

- Agency migration plans due to OMB and ONCD

**Jan 1, 2027**

- CNSA 2.0 acquisition gate for national security systems

**The new standards · aug 2024**

- 2030–2031
- High-value assets and high-impact systems migrated
- ML-KEM (FIPS 203) key exchange · ML-DSA (FIPS 204) and SLH-DSA (FIPS 205) signatures
- 2035
- Full migration target across government

**Harvest now, decrypt later**

- Adversaries copy encrypted traffic today and wait for a quantum computer to break the public-key cryptography that protects it.

**The question that matters**


???

Why this is a data topic. Today’s public-key cryptography (RSA and elliptic-curve) secures key exchange in TLS, VPNs, and signatures. A large enough quantum computer running Shor’s algorithm would break it. Nobody knows when that machine arrives, but adversaries don’t have to wait: they can record encrypted traffic now and decrypt it later. So the real question is data shelf life: anything that must stay confidential longer than the time to a cryptographically relevant quantum computer is exposed today. Personnel records, deal terms, and national security information qualify. Symmetric encryption like AES-256 is considered quantum-resistant at current key sizes; the problem is the public-key exchange that delivers those keys. The standards. NIST finalized three post-quantum standards in August 2024: ML-KEM (FIPS 203, from CRYSTALS-Kyber) for key establishment, ML-DSA (FIPS 204, from CRYSTALS-Dilithium) and SLH-DSA (FIPS 205, from SPHINCS+) for digital signatures. NIST also selected HQC in 2025 as a backup key-establishment algorithm based on different math. Early deployments use hybrid key exchange (classical plus ML-KEM together) so a flaw in either doesn’t break the session; major browsers and cloud providers already negotiate hybrid TLS. The policy, as of November 2026. Executive Order 14412, Securing the Nation Against Advanced Cryptographic Attacks (June 22, 2026), turned years of “prepare” into deadlines; summaries describe hard 2030–2031 deadlines for federal high-value assets and high-impact systems. OMB M-26-15 (June 24, 2026) replaced M-23-02 as the civilian playbook: a five-phase timeline from 2026 through 2035, a designated PQC migration lead in each agency, and migration plans due to OMB and the Office of the National Cyber Director 120 days after issue (about October 22, 2026), including TLS 1.3 migration. Phase one is strategy and inventory of highvalue assets and high-impact systems. National security systems run on a separate track under NSA’s CNSA 2.0 suite, with a January 1, 2027 gate for new acquisitions to support it; that track is in section 08’s world. What it means at your agency. The first deliverable is a cryptographic inventory: which systems use which algorithms, keys, and certificates, protecting which data. That’s a data inventory and CMDB problem as much as a security one, and it lands squarely on IT Operations. Then prioritize by data shelf life and exposure (internet-facing, long-lived secrets), and push vendors: most of the migration arrives through product updates from Microsoft, the SSE platform, the identity provider, the ITSM platform, and others, so put PQC readiness in contracts and renewals, including the IT tools purchasing vehicle you’re standing up. Confirm your agency’s plan status with the CISO; the October deadline has passed. Analogy: someone bootlegging a concert onto a tape they can’t play yet, waiting for the player to be invented. The time to stop the taping is now, not when the player ships.

---

## Privacy: the Privacy Act and its toolkit, in practice

*05 · Security And Privacy*

**Sorn**

- Public notice of a system of records, its purposes, and routine uses

**Pta, pia**

- Threshold analysis, then a full impact assessment (EGov Act 208)

**Notice**

- Privacy Act statement at the point of collection

**Matching**

- Computer matching agreements for automated comparisons

**Breach**

- Report and assess under OMB M-17-12; SAOP leads
- 87% of Americans were likely unique on ZIP code, birth date, and sex alone (Sweeney, 2000)

**De-identification**

- Suppress, generalize, aggregate; k-anonymity; differential privacy (NIST SP 800-226); synthetic data.

???

The Privacy Act of 1974 governs “systems of records”: groups of records about individuals retrieved by name or another personal identifier. Its practical toolkit: SORN. Before operating a system of records, the agency publishes a system of records notice in the Federal Register describing the categories of individuals and records, the purposes, the routine uses (disclosures outside the agency compatible with the purpose of collection), retention, and safeguards. Using or disclosing data outside the SORN’s purposes and routine uses (or another statutory exception) is a violation. Government-wide SORNs (like OPM/GOVT-1 for general personnel records) also cover many HR records. PTA and PIA. A privacy threshold analysis is the short screening form. If a system collects or maintains information in identifiable form, Section 208 of the E-Government Act requires a privacy impact assessment before developing or procuring it, and publication where practicable. OMB Circular A-130 Appendix II and Circular A-108 set the details. Notice at collection. Under 5 U.S.C. 552a(e)(3), forms that collect information from individuals must tell them the authority, purpose, routine uses, and consequences of not providing it. Computer matching. Automated comparisons of Privacy Act records across agencies to establish or verify eligibility for federal benefits require computer matching agreements and Data Integrity Board review. Breach. OMB M-17-12 defines a breach of PII and requires agencies to report, assess the risk of harm, and decide on notification and mitigation. The Senior Agency Official for Privacy leads; IT Operations supplies the facts (what systems, which records, what logs show). PII definition. OMB defines PII as information that can be used to distinguish or trace an individual’s identity, alone or combined with other information that is linked or linkable to that individual. “Linkable” is the important word: data that seems anonymous can become PII when combined. Which is the point of the 87%. Latanya Sweeney’s 2000 study, using 1990 census data, found that about 87% of the U.S. population likely had a unique combination of five-digit ZIP code, gender, and date of birth. Removing names doesn’t de-identify a dataset. De-identification methods: suppression (remove fields), generalization (age band instead of birth date, three-digit ZIP), aggregation with minimum cell sizes, k-anonymity (each record indistinguishable from at least k-1 others), and differential privacy, which adds calibrated statistical noise with a mathematical guarantee; the Census Bureau used it for the 2020 census. NIST SP 800-188 covers de-identifying government datasets; SP 800-226 (2025) covers evaluating differential privacy guarantees. Synthetic data can help for testing but must be checked for memorized real records. Analogy: you can name that tune in three notes. A bass line, a tempo, and a key are each anonymous; together, they’re one song.

---

## Sharing and access: agreements, purpose, and proof Instrument

*05 · Security And Privacy*

- Use it for Anchor ISA or MOU
- System-to-system exchanges and their security
- NIST SP 800-47 Rev. 1
- Data use agreement
- Purpose, permitted uses, retention, re-disclosure
- Owner and SAOP approval
- Matching agreement
- Automated benefit-eligibility comparisons
- Privacy Act; Data Integrity Board
- Contract clauses
- Vendors and contractors who touch the data FAR and agency clauses

**Eo 14243 · march 2025**

**Prove it · omb m-26-14**

- Directs full, prompt access to unclassified data for designated officials, as far as law allows. The Privacy Act still applies.
- Logging is now risk-based (M-21-31 rescinded, May 2026). Make sure access to sensitive data is logged where investigators can use it.
- Every sharing request gets four written answers: what data, what purpose, what authority, how long.

???

Data leaves an agency’s systems constantly: to other agencies, partners, contractors, and the public. The instruments differ by relationship. Interconnection security agreements and memoranda of understanding. NIST SP 800-47 Rev. 1 (2021) reframed these as managing the security of information exchanges: the MOU or MOA covers the business relationship and responsibilities; the ISA covers the technical security of the connection (data flows, encryption, incident notification, points of contact). Every system-to-system connection to another agency or partner should have one, referenced in the system security plan. Data use or data sharing agreements. For datasets rather than connections: who receives what, for what purpose, permitted and prohibited uses, retention and destruction, re-disclosure limits, security requirements, and breach notification. Approved by the data owner, with privacy review when personal data is involved. Computer matching agreements. Required under the Privacy Act for automated comparisons of federal records for benefit eligibility or recoupment, approved by the Data Integrity Boards of the agencies involved. Your agency rarely triggers this, but you should know the term. Contract clauses. For vendors and contractors who host, process, or access agency data: government data ownership, permitted uses (no training models on it without consent), location, security baseline, incident reporting, subcontractor flow-down, and return and destruction at exit. Section 06 covers this in depth. Executive Order 14243 (March 20, 2025), Stopping Waste, Fraud, and Abuse by Eliminating Information Silos, directs agency heads to ensure officials designated by the President or agency heads have full and prompt access to unclassified agency records, data, software, and IT systems for identifying waste, fraud, and abuse, to the maximum extent consistent with law, and to rescind or modify guidance that unnecessarily blocks sharing. Supporters frame it as removing duplicative barriers to detecting improper payments; critics have raised privacy and security concerns, and data access in this period has been litigated. For a steward, the practical rule doesn’t change: confirm the requester’s designation and authority in writing, involve General Counsel and the SAOP, apply the Privacy Act and SORN routine uses, provision least-privilege access, and log it. Proof. OMB M-26-14 (May 22, 2026) rescinded M-21-31’s fixed logging tiers and replaced them with an outcome-based maturity model tied to CISA’s logging reference architecture. Retention is now a risk decision, so make sure access to sensitive datasets is in scope for collection and retention. The band is the habit. Four written answers (what, why, under what authority, how long) settle most sharing debates and produce the record you’ll need if anyone asks later. Analogy: lending your master tapes. You write down who’s borrowing them, for which remix, under what license, and when they come back. Handing them over on a handshake is how masters disappear.

---

## SaaS integrations: the side door into your data CASE · SALESLOFT DRIFT, AUGUST 2025

*05 · Security And Privacy*

**Controls**

**Step 1**

- Attackers steal OAuth tokens from a chatbot vendor’s Salesforce integration
- Inventory every connected app and OAuth grant

**Aug 8–18**

- They query and export data from Salesforce tenants at hundreds of organizations
- Restrict integrations by IP and user

**Step 3**

- They mine records for secrets: cloud keys, Snowflake tokens, passwords

**Aug 20**

- Least-privilege scopes; short token lifetimes
- No secrets in tickets, cases, or notes
- Alert on bulk exports and API spikes
- Vendor breach notice in every contract
- Tokens revoked; no Salesforce vulnerability was involved
- Insight runs on Salesforce. the ITSM platform, Box, and Microsoft 365 all carry connected apps with standing access to your data.

???

The most instructive data breach pattern of 2025 had nothing to do with breaking encryption or exploiting the platform. What happened. Google’s Threat Intelligence Group reported that a threat actor it tracks as UNC6395 obtained OAuth and refresh tokens belonging to Salesloft’s Drift chatbot integration (Salesloft later traced the intrusion to an earlier compromise of its GitHub and AWS environments). Between August 8 and at least August 18, 2025, the actor used those tokens to authenticate to customers’ Salesforce instances as the trusted integration, query objects like cases and accounts, and export the results. Public reporting put the number of affected organizations at more than 700. The actor then searched the stolen data for credentials people had pasted into support cases and notes: AWS access keys, Snowflake tokens, VPN passwords, to pivot further. They deleted query jobs to cover tracks, but the underlying logs remained, which is how customers scoped their exposure. Salesloft and Salesforce revoked the tokens on August 20 and pulled the app. Why it matters. No Salesforce vulnerability was exploited and no user was phished. A connected app with broad, long-lived access was the door. Each has connected apps, OAuth grants, API users, and integration accounts, often added years ago for a pilot and never reviewed. Controls, in order of value: Inventory connected apps and OAuth grants in each platform, with an owner and business justification; remove what nobody claims. Least-privilege scopes: an integration that only needs to write chat transcripts shouldn’t be able to read every object. Short token lifetimes and refresh token rotation. Restrict integration users by IP range and profile where the platform allows. Secrets hygiene: scan tickets, cases, Teams, and SharePoint for credentials; train staff never to paste keys or passwords into records; rotate anything found. Detection: alert on bulk exports, unusual API volume, new connected apps, and queries from unexpected IPs. Salesforce Event Monitoring and Shield, the ITSM platform logs, and EDR for Cloud Apps can feed the SIEM. Contracts: third-party vendor incident notification, token handling, and the right to audit, flowed down to integration partners. This is also an AI story: Drift was an AI chat agent, and every AI agent you connect to a system of record holds the same kind of token. The AI deck’s point about agents and least privilege applies directly. Analogy: you locked the venue, checked every ticket, and left a side door propped open for the catering company that stopped working with you two years ago.

---

## Law, records, and acquisition

*06 / 09 · 06 · Law And Records*

- The statutes and memos behind every data decision, how records law constrains deletion, and how to write data into contracts.
- The statute map · The Evidence Act and open data · Records management · Data in contracts

???

Federal data management is unusually law-heavy. Half a dozen statutes, two executive orders, NARA regulations, and a stack of OMB memos govern what you can collect, how you must describe and publish it, how long you must keep it, and what vendors may do with it.

---

## The statute map: what governs which decision

*06 · Law And Records*

- Authority
- Governs
- Lead official
- Evidence Act; M-19-23; M-25-05
- CDO, inventory, open data, governance
- Chief Data Officer
- Federal Records Act; 36 CFR; GRS
- Keeping and disposing of records

**Saorm**

- Privacy Act; E-Gov Act 208
- Personal data and PIAs

**Saop**

- FISMA; Circular A-130
- Security of information and systems

**Cio, ciso**

- Paperwork Reduction Act
- Collecting information from the public

**Cio**

- Information Quality Act
- Quality of disseminated information

**Cdo**

**Foia**

- Public access to agency records
- FOIA officer

**Eo 13556; 32 cfr 2002**

- Controlled unclassified information
- CUI program
- M-25-21; NARA AI guidance
- AI use of agency data CAIO, SAORM

???

One table to keep handy. Most data questions touch three or four of these at once, which is why the officials in the right column need a standing way to coordinate. Evidence Act (Foundations for Evidence-Based Policymaking Act of 2018). Title I covers learning agendas, evaluation, and statistical officials (CFO Act agencies). Title II, the OPEN Government Data Act, requires a Chief Data Officer in every agency, a comprehensive data inventory, open-by-default publication, open data plans, and the federal CDO Council. Title III is the Confidential Information Protection and Statistical Efficiency Act (CIPSEA) for statistical agencies. Implemented by M-19-23 (Phase 1) and M-25-05 (Phase 2, next slide). Federal Records Act (44 U.S.C. chapters 21, 29, 31, 33) and NARA regulations at 36 CFR Chapter XII, Subchapter B: what a record is, scheduling, disposition, electronic records, unauthorized destruction. The Senior Agency Official for Records Management is accountable; the agency records officer runs the program. Privacy Act of 1974 and Section 208 of the E-Government Act of 2002, with OMB Circulars A-130 (Appendices I and II) and A-108, and M-17-12 for breaches. The Senior Agency Official for Privacy leads. FISMA 2014 and Circular A-130: agency information security programs, NIST standards, authorization to operate. CIO and CISO. Paperwork Reduction Act (44 U.S.C. chapter 35): OMB approval for collections of information from ten or more members of the public, plus the broader information resources management framework. The CIO holds PRA responsibilities by statute. Information Quality Act (Section 515, FY2001 appropriations) and OMB guidelines, updated by M-19-15: quality, objectivity, utility, and integrity of disseminated information, with a correction process. Your agency assigns this to the CDO. FOIA (5 U.S.C. 552): the public’s right to request agency records, including data in databases. Nine exemptions; (b)(1) covers classified information, (b)(4) trade secrets and confidential commercial information (relevant to deal data), (b)(6) personal privacy. CUI: Executive Order 13556 and 32 CFR Part 2002, with the proposed FAR rule for contractors. AI: OMB M-25-21 (use) and M25-22 (acquisition), covered in the AI deck, plus NARA’s August 21, 2026 guidance on applying the Federal Records Act to AI materials and ISOO’s March 2026 notice on CUI and classified information in AI tools. Also worth knowing: the Federal Data Strategy (M-19-18) as the policy vision; the Geospatial Data Act for geospatial assets; and Executive Order 14243 on inter-agency data access (previous section). Analogy: this is the rights-andclearances sheet for an album: songwriting, master ownership, sample clearances, performance rights, and licensing each have a different rights holder, and all of them must be cleared before release.

---

## The Evidence Act and open data: what’s required now

*06 · Law And Records*

**Jan 2019**

- Evidence Act signed; CDO required in every agency

**Jul 2019**

- M-19-23, Phase 1: CDO, data governance body, learning agendas
- Public data assets released machine-readable, in open formats, unless law or policy restricts them.

**Jan 15, 2025**

- M-25-05, Phase 2: open by default, comprehensive inventory, open data plans
- at your agency

**May 2026**

- DCAT-US v3.0 metadata standard published

**Sep 30, 2026**

- Public inventories due on Data.gov, including non-public assets with reasons

**Open by default**

- The data office runs Title II and published a 2025 Open Data Plan. Your IT and HR assets belong in that inventory.

???

The Evidence Act was signed in January 2019. Implementation has come in phases of OMB guidance. Phase 1, M-19-23 (July 2019), covered personnel and planning: designate a Chief Data Officer (and, for CFO Act agencies, an Evaluation Officer and Statistical Official), establish a data governance body, and for CFO Act agencies produce learning agendas and annual evaluation plans. Phase 2, M-25-05 (January 15, 2025), took six years to arrive and remains in effect. It rescinded and replaced the 2013 Open Data Policy (M-13-13). Its core requirements: Open by default: data assets that can be public should be, in machine-readable, open formats with open licenses, unless restricted by law, privacy, security, confidentiality, or other valid reasons. Comprehensive data inventory: every data asset the agency holds, public or not, described with standard metadata. A data asset must be structured or semi-structured and logically grouped. Non-public assets are listed too, with the reason they’re not released, which is new for many agencies. Federal Data Catalog: public inventories feed Data.gov. Open data plans, maintained as part of the agency’s information resources management strategic plan, covering collection mechanisms, usage, public engagement, and priorities. Data governance: describe how priority data assets are identified and how the public can request data. The metadata standard. DCAT-US v3.0 describes each asset (title, description, publisher, contact, access level, license, temporal and spatial coverage, distribution formats, and more). It was expected in mid-2025 and published in May 2026, compressing agencies’ preparation time. The CDO Council followed with a 78-page implementation guide in August 2026 that ties the inventory to zero trust by asking agencies to justify the sensitivity of each dataset, and recommends building inventories in stages. The deadline. Public comprehensive inventories were due September 30, 2026. The CDO Council chair acknowledged publicly that not every agency would finish a complete inventory by then. Expect follow-up reporting and iteration in 2027. The CDO Council itself was re-chartered (charter updated September 2025), and its website moved from cdo.gov to councils.gov/cdoc in March 2026. at your agency. As steward for IT and HR data, your contribution is to make sure your domains’ assets are in the inventory with correct metadata and access levels: CMDB and asset data, service desk data, identity data, and HR datasets (almost all non-public, which still must be listed with a reason). Analogy: the inventory is the label’s complete catalog, including unreleased vault tracks, each with credits and the reason it’s still in the vault. Open by default means you release what you can, rather than everything sitting in the vault because nobody filled out the paperwork.

---

## Records: the schedule decides, not the system owner

*06 · Law And Records*

**Schedules**

**Capstone email**

**Electronic only**

- Agency schedule or GRS item for every record. Unscheduled means keep until scheduled.
- GRS 6.1: retention by role; senior officials’ email is permanent. Revisions in draft in 2026.
- M-19-21 and M-23-07: manage records electronically; NARA ended most paper transfers after June 2024.

**Messaging apps**

**Ai materials**

**Holds, destruction**

- Records on a non-official app must reach an official account within 20 days (44

**U.s.c. 2911).**

- NARA, Aug 2026: AI use alone doesn’t create a record; reliance, circulation, or filing can.
- Legal holds suspend disposal.
- Unauthorized destruction must be reported to NARA.
- Map every dataset to a schedule. Unscheduled records can’t be destroyed; scheduled ones shouldn’t outlive their date.

???

Records management is where IT habits most often collide with law. Systems are built to keep or purge data on technical schedules; the law says the records schedule decides. Schedules. Every federal record must be covered by a disposition authority: an agency-specific schedule approved by the Archivist, or a General Records Schedule (GRS) item that applies government-wide (GRS 3.1 and 3.2 cover many IT and information security records; GRS 2.x covers HR; GRS 5.2 covers transitory and intermediary records). Records with no schedule are unscheduled and must be kept until a schedule is approved. Building a new system without asking the records officer which schedule applies is how agencies end up keeping everything forever, or deleting things they had to keep. Capstone. GRS 6.1 manages email by the role of the account holder rather than by message: designated senior officials’ email is permanent and eventually transfers to NARA; other accounts are temporary with set retention. NARA circulated draft revisions to GRS 6.1 in 2026, extending it more explicitly to other electronic messages. Watch for the final version, because it will affect Teams and chat retention settings. Electronic records. OMB/NARA M-19-21 and M-23-07 moved government to fully electronic recordkeeping; after June 30, 2024, NARA stopped accepting most analog transfers. Permanent records must be managed electronically with required metadata. Messaging apps. Under 44 U.S.C. 2911, an officer or employee who creates or sends a record on a non-official electronic messaging account must copy or forward a complete copy to an official account within 20 days. NARA reissued reminders about third-party messaging apps in 2025. Auto-delete features don’t override the law. AI materials. NARA’s August 21, 2026 guidance to records officers says using an AI tool doesn’t by itself create a federal record. Whether prompts and outputs are records depends on use: whether the agency relied on them for a decision, used them to conduct business, circulated them, or incorporated them into an agency system. Preliminary research that goes nowhere likely isn’t a record, and an AI system’s audit trail isn’t automatically a record unless the agency captures and uses it. Agencies are told to fold Federal Records Act requirements into their AI policies. Some commentators argue the guidance is too narrow; expect it to evolve. Holds and destruction. Litigation holds, FOIA requests, and audits suspend disposition for the affected records. Unlawful or accidental destruction (including through system migrations or decommissioning) must be reported to NARA under 36 CFR Part 1230. The records office should sign off on each. Analogy: the label decides which master tapes go to the archive forever and which outtakes can be erased. The studio engineer doesn’t get to wipe a tape because the shelf is full.

---

## Data in contracts: own it, see it, get it back

*06 · Law And Records*

**Own it**

**See it**

**Get it back**

- Government owns its data and derivatives
- U.S. data location; authorization level
- Log and audit access on request
- Export anytime, open documented formats
- Rights in deliverables (FAR 52.227-14)
- Incident reporting with a clock
- Configuration and metadata included
- No training or reuse without consent
- Flow-down to subcontractors and integrators
- GSAR 552.239-7001 for LLM work at GSA
- Certified destruction after return

**Cui clauses, proposed**

- FAR 52.240-6 and -7: NIST SP 800-171 Rev. 3 and 72-hour incident reporting.

???

The contract is the only data governance control you have over a vendor. If it isn’t written down, assume you don’t have it. Own it. State that all government data, and anything derived from it (reports, models, indexes, embeddings, configurations built for the agency), belongs to the government. FAR 52.227-14 (Rights in Data, General) governs rights in data first produced or delivered under civilian contracts; the DFARS has its own clauses for DoW. Prohibit using agency data to train or improve models or to serve other customers without written consent; OMB M-25-22 requires agencies to address this for AI acquisitions. GSA finalized GSAR 552.239-7001, Basic Safeguarding of Data within Large Language Model AI Systems, on September 28, 2026 for GSA contracts where government data is processed by an LLM: it restricts vendor uses of government data (including selling or licensing it) and defines roles across the AI supply chain. Even when it doesn’t apply to a your agency buy, its terms are a good template. See it. Data location (U.S., and which cloud boundary), the authorization level (FedRAMP Moderate or High), access to logs and audit records on request, notice of material changes (new subprocessors, new AI features enabled by default), incident and breach reporting within a defined number of hours, cooperation with investigations, and flow-down of all of it to subcontractors and integration partners. The Salesloft Drift case is why integrators belong in that list. Get it back. The right to export complete data at any time and at exit, in open, documented formats, at no extra charge, including configuration and metadata (workflow definitions, CMDB relationships, catalog entries, sensitivity labels), not just raw tables. Certified destruction of all copies after return, citing NIST SP 800-88 Rev. 2, including backups, with a certificate. Name the data deliverables explicitly now: the CMDB with relationships, the knowledge base, runbooks and standard operating procedures, ticket and change history, monitoring configurations, and asset records. The same applies to the SOO-based IT tools vehicle: license and configuration data must be portable when the vendor changes. CUI. The FAR Council’s June 2026 re-proposed CUI rule would add FAR 52.240-6 (notice of CUI requirements) and 52.240-7 (CUI clause) with a standard form identifying the CUI involved, NIST SP 800-171 Rev. 3 for contractor systems, and 72-hour CUI incident reporting. Not final; track it for future solicitations. Analogy: Taylor Swift re-recorded six albums because she didn’t own her masters. If your contract doesn’t say you own the data and can take it with you, budget for re-recording.

---

## Data for AI

*07 / 09 · 07 · Data For Ai*

- The AI deck from the data side: what makes data ready for AI, and how to protect the data AI runs on.
- AI-ready data · Securing data for AI

???

The AI deck said context beats model choice. This short section is the corollary: AI quality and AI risk are mostly data quality and data risk. An assistant grounded on overshared, stale, or poisoned content will be overshared, stale, or poisoned. Two slides: what AI-ready data means in practice, and the NSA, CISA, and FBI guidance on securing data across the AI lifecycle.

---

## AI-ready data: six tests before an assistant reads it

*07 · Data For Ai*

**1 · inventoried**

**2 · permissioned**

**3 · current**

- You know it exists, who owns it, and how sensitive it is.
- Oversharing fixed first. AI will surface every “Everyone” link.
- Superseded versions archived. Stale sources give confident stale answers.

**4 · defined**

**5 · traceable**

**6 · measured**

- Certified metric definitions, so the AI counts what you count.
- Lineage and source dates, so every answer can be checked.
- Quality scored on what AI actually reads, not just tables.

**Derived data inherits sensitivity**

**Unstructured is the frontier**

- Embeddings, summaries, prompts, and chat logs carry the classification of what went in.
- AI mostly reads documents. Content governance is now
- AI governance.

???

“AI-ready data” is a slogan until it’s turned into tests. These six are practical and checkable. 1. Inventoried. You can’t govern what you don’t know about. The CDO Council chair made the point bluntly during the 2026 inventory push: AI readiness is close to impossible if you don’t know what data you have and what it can be used for. The M-25-05 inventory is therefore also the AI readiness inventory. 2. Permissioned. Retrieval-augmented assistants (Copilot, a the ITSM platform assistant, a custom RAG app) respect existing permissions, which means they faithfully surface everything a user technically has access to. Old “Everyone” links, broad Teams membership, and inherited SharePoint permissions become instant oversharing. Run a permissions and sensitivity review (the compliance and DLP suite’s DSPM for AI and SharePoint access reports help) before turning an assistant loose on a repository. 3. Current. RAG answers from whatever it retrieves. If the 2019 telework policy and the 2026 one are both indexed, the assistant may quote the wrong one with full confidence. Archive superseded documents, mark authoritative versions, and show source dates in citations. 4. Defined. When a leader asks an assistant “how many active employees do we have,” the answer should come from the certified definition and the certified dataset, not the model’s inference from whatever table it found. A semantic layer and certified data products are how you get there. 5. Traceable. Every answer should be checkable: lineage on datasets and citations to source documents. This is what makes verification fast (AI deck, section 02). 6. Measured. Traditional quality rules cover tables; extend measurement to what AI actually consumes: coverage, duplication, and freshness of the indexed corpus, and retrieval accuracy on a test set. Derived data inherits sensitivity. An embedding of a CUI document is CUI; a summary of a personnel file is PII; a chat log containing pasted deal terms is as sensitive as the deal terms. Vector indexes, prompt logs, and AI outputs must sit inside the boundary, be in the inventory, and follow the source’s retention and access rules. Records rules may also apply (NARA’s August 2026 guidance). Unstructured is the frontier. Decades of data governance focused on tables. Generative AI reads documents, email, chat, and transcripts, which is exactly the content with the weakest labeling, ownership, and retention discipline. Sensitivity labels, records schedules, and permission hygiene for content are now AI controls. Analogy: before you hand a DJ your crate, take out the unreleased tracks, the scratched records, and the ones you don’t have the rights to play. The DJ will play whatever’s in the crate, beautifully.

---

## Securing the data AI runs on

*07 · Data For Ai*

**Three risks · nsa, cisa, fbi · may 2025**

**Ten practices**

- Data supply chain
- Third-party or scraped data you can’t vouch for Use reliable sources; track provenance
- Verify integrity in storage and transit
- Sign trusted revisions digitally
- Run on trusted infrastructure
- Poisoned data Deliberately altered training data or RAG content
- Classify data; control access
- Encrypt it
- Store it securely
- Use privacy-preserving techniques
- Data drift
- Delete it securely
- Reality changes; the data and the model don’t
- Reassess risk continuously
- ISOO, March 2026: no CUI or classified data in AI systems that are internet-connected or unaccredited.

???

The anchor document is the joint Cybersecurity Information Sheet “AI Data Security: Best Practices for Securing Data Used to Train and Operate AI Systems,” released May 22, 2025 by NSA’s AI Security Center, CISA, the FBI, and partners in Australia, New Zealand, and the UK. It’s written for DoD, national security system owners, the defense industrial base, and federal agencies, so it carries straight into classified environments. Three risk areas it examines in depth: Data supply chain: AI depends on large external datasets (web crawls, licensed data, open datasets, vendor-provided content). You inherit their errors, biases, and tampering. The CSI describes attacks such as buying expired domains that a dataset still references, so the content at that URL changes after the dataset was curated. Poisoned data: deliberate modification of training data or retrieval content to change behavior: inserting false facts, backdoor triggers, or instructions. For an agency, the realistic version is RAG poisoning: a document planted in an indexed SharePoint site or mailbox that the assistant retrieves and follows (the indirect prompt injection from the AI deck, seen as a data integrity problem). Data drift: the world changes and the data distribution shifts, degrading accuracy over time without anyone tampering. Monitoring and periodic re-evaluation are the controls. The ten practices, in plain terms: get data from trusted sources and record provenance; verify integrity with checksums and hashes in storage and transport; digitally sign approved versions so tampering is detectable; run on trusted, zero trust infrastructure; classify data and apply access controls; encrypt at rest and in transit; store securely with FIPS-validated cryptography; use privacy-preserving techniques (de-identification, differential privacy, federated learning) where appropriate; delete securely (NIST SP 800-88) when data is retired; and reassess risk on an ongoing basis. Nearly every one is a data management practice from earlier in this deck, applied to AI. ISOO Notice 2026-01 (March 30, 2026), Responsible Use of Classified National Security Information and CUI with AI, is the policy line: agency personnel may not input classified information or CUI into AI systems that are internet-enabled or externally connected, or that aren’t accredited for that information. Agencies are told to assess each AI system with the CIO, CISO, and security staff and to update their classified and CUI policies to address AI. It doesn’t yet address marking AI outputs or aggregation risk directly; section 08 covers why those matter. Analogy: if someone can slip a fake track into the master reels, every pressing from then on carries it. Protect the reels, sign off each mix, and keep the session logs.

---

## Classified environments

*08 / 09 · 08 · Classified*

- The same disciplines with harder walls: how classification, markings, networks, cross-domain transfer, and data strategy work on the high side.
- The classification system · Markings and data tagging · Networks and clouds · Cross-domain · Spills, destruction, declassification · IC and DoW data strategy · What transfers

???

This section explains how data management works when the data is classified national security information: who can classify and how, how markings act as machine-readable metadata, which networks and clouds exist at each level, how data crosses between levels, what happens when it spills, and how the intelligence community and the Department of War govern data. Everything here is unclassified and drawn from public sources; specific system details at each agency are themselves often controlled. The last slide maps what transfers from your current role and what you’d need to learn.

---

## The classification system: Executive Order 13526

*08 · Classified*

**Top secret**

- Exceptionally grave damage

**Original classification**

**Secret**

- Serious damage
- A designated authority decides new information is classified, cites a category, and can describe the damage. Sets a declassification date.

**Confidential**

- Damage

**Derivative classification**

**Access needs all three**

- Almost all classified material: carrying markings forward from sources or a security classification guide.
- Eligibility (clearance) + need to know + signed nondisclosure agreement (SF 312)

**Declassification**

**Limits**

- Default 10 years, up to 25; automatic review at 25, 50, 75 years; mandatory review on request.
- Never to hide errors or avoid embarrassment. Nothing stays classified forever.

???

Classified national security information is governed by Executive Order 13526 (December 2009) and its implementing directive at 32 CFR Part 2001, overseen by NARA’s Information Security Oversight Office (ISOO). Classification is a separate regime from CUI; the two never mix on the same marking line. Three levels, defined by expected damage to national security from unauthorized disclosure: Confidential (damage), Secret (serious damage), Top Secret (exceptionally grave damage). The original classifier must be able to identify or describe the damage. Original classification. Only officials delegated original classification authority (OCA) by the President or agency heads may classify information in the first instance. Information must fall in one of eight categories in section 1.4: military plans, weapons systems, or operations; foreign government information; intelligence activities, sources, methods, or cryptology; foreign relations or activities, including confidential sources; scientific, technological, or economic matters relating to national security; programs for safeguarding nuclear materials or facilities; vulnerabilities or capabilities of systems, installations, infrastructure, or protection services relating to national security; and weapons of mass destruction. The OCA sets a declassification date or event; if none can be determined, the default is 10 years, extendable to 25. OCAs get annual training. Derivative classification. The overwhelming majority of classified documents are derivatively classified: a person incorporates, paraphrases, or restates already-classified information and carries the markings forward, using source documents or a security classification guide (SCG), which is the OCA’s written rulebook for a program (“the platform’s range is Secret; its name is unclassified”). Derivative classifiers need training every two years. For a data person, an SCG is a classification policy expressed as rules, which is exactly what you’d want to encode for automated tagging. Access requires all three: a favorable eligibility determination (the clearance), a need to know the specific information, and a signed SF 312 nondisclosure agreement. Clearance alone gives no right to any particular data, which is the classified world’s strict version of least privilege. Limits. Section 1.7 prohibits classifying to conceal violations of law, inefficiency, or administrative error; to prevent embarrassment; to restrain competition; or to delay release of information that doesn’t require protection. Section 1.7(e) also allows classification by compilation, covered on the next slide. And the order states that no information may remain classified indefinitely. Declassification. Records of permanent historical value are automatically declassified at 25 years unless an agency exempts them under narrow criteria, with further review at 50 and 75 years; ISOO updates the list of agencies eligible to receive referrals (Notice 2026-04, August 2026). Anyone can request mandatory declassification review of specific information, and appeals go to the Interagency Security Classification Appeals Panel, whose procedures ISOO reformed in August 2026. FOIA exemption (b)(1) covers properly classified information. Analogy: original classification is writing the song and registering the copyright; derivative classification is every cover version, which must carry the original credits exactly.

---

## Markings: the metadata of classified data SECRET//NOFORN (U) This paragraph is unclassified. (S//NF) This paragraph is Secret, not releasable to foreign nationals.

*08 · Classified*

- Classified By: [name, position]
- Derived From: [guide or source, date]
- Declassify On: [date or event]

**Secret//noforn**

- Illustrative format only.

**Control systems**

- SCI compartments and special access programs restrict access beyond the level.

**Dissemination controls**

- NOFORN, ORCON, REL TO: who may receive it, regardless of clearance.

**Machine-readable**

- IC data encoding specs (ISM, ARH, NTK) and the Trusted Data Format bind markings to data for attribute-based access.

**Compilation**

- Unclassified items can be classified together if the combination reveals more.

???

Markings are metadata, and the classified world has the most rigorous metadata discipline in government. Anatomy. Every classified document carries a banner line at top and bottom showing the highest classification and controls in it. Each portion (paragraph, title, bullet, table cell) carries a portion mark in parentheses: (U), (C), (S), (TS), plus control abbreviations. A classification authority block identifies who classified it (or what it was derived from) and when or under what condition it declassifies. Format and abbreviations are governed by 32 CFR 2001, the ISOO marking booklet, and in the intelligence community the CAPCO-maintained Intelligence Community Markings System Register and Manual. Portion marking is what lets a derivative classifier lift one unclassified paragraph without guessing. Control systems. Sensitive Compartmented Information (SCI) is intelligence information in formal control systems with separate access approvals and indoctrination, handled only in SCIFs. Special Access Programs (SAPs) impose access controls beyond normal classification, with access lists. Both are layered on top of a classification level. Dissemination controls narrow the audience regardless of clearance: NOFORN (no foreign nationals), ORCON (originator controls further dissemination), REL TO (releasable to listed countries, such as REL TO USA, FVEY), PROPIN (proprietary information), among others. Foreign government information carries its own markings. For a data system, these are access attributes: citizenship, nationality, organization, program accesses. Machine-readable markings. The intelligence community publishes XML data encoding specifications so markings are structured data rather than text: the Information Security Marking (ISM) specification for classification and controls, Access Rights and Handling (ARH), and Need-to-Know (NTK), plus an Enterprise Data Header. The IC Trusted Data Format (TDF) wraps data and its markings together and cryptographically binds them, so the tags can’t be stripped or altered without detection. This is how attribute-based access control works at scale on the high side: the policy engine compares user attributes (clearance, accesses, citizenship, mission) with the data’s tags, object by object. It’s the most mature real-world version of the data-centric zero trust idea in section 05. Compilation. Section 1.7(e) of EO 13526 allows information that is individually unclassified, or classified at a lower level, to be classified when the compilation reveals an additional association or relationship that meets classification standards. This is the formal version of the aggregation risk from the privacy slide, and it’s acute with AI: a model or analytic that joins many unclassified sources can produce a classified insight. Analysts and data engineers in classified programs are trained to watch for it; AI policies are still catching up. Analogy: portion marks are pertrack parental advisory and region locks on an album. NOFORN is a domestic-only release. Compilation is when a set of harmless outtakes, sequenced together, tells a story the label never meant to release.

---

## Networks, clouds, and risk frameworks by level

*08 · Classified*

- Level
- Networks
- Cloud
- Risk framework
- Unclassified, CUI
- Agency networks, NIPRNet
- FedRAMP Moderate or High; DoD IL2, IL4, IL5

**Nist rmf, sp 800-53**

- Secret
- SIPRNet
- DoD IL6; Secret regions from major providers
- CNSSI 1253 for national security systems
- Top Secret, SCI
- JWICS, IC networks
- Top Secret regions under C2E and JWCC
- ICD 503 and CNSSI 1253

**Physical**

**Separation**

**Crypto**

- SCIFs built to ICD 705; TEMPEST emanation controls; no personal devices.
- Air gaps and physically separate networks; removable media tightly controlled.
- NSA-approved Type 1 and CNSA 2.0 suites; new acquisitions must support
- CNSA 2.0 from 2027.
- Each level is its own world. Nothing crosses without a cross-domain solution.

???

The broad map, at the level of public information. Networks. NIPRNet is DoD’s unclassified IP network; civilian agencies run their own. SIPRNet carries information up to Secret across DoD and partners. JWICS (Joint Worldwide Intelligence Communications System) carries Top Secret and SCI for the intelligence community and DoD. Agencies also run their own classified enclaves. Each is physically separate, with its own identities, endpoints, email, collaboration tools, and data stores. A person working across levels typically has separate accounts and often separate machines (or an access-type cross-domain solution, next slide). Cloud. DoD’s Cloud Computing Security Requirements Guide defines impact levels: IL2 (public and non-critical), IL4 (CUI), IL5 (higher-sensitivity CUI and mission-critical unclassified, on dedicated infrastructure), and IL6 (classified up to Secret). The major providers (AWS, Microsoft, Google, Oracle) operate air-gapped Secret and Top Secret regions, bought through the intelligence community’s Commercial Cloud Enterprise (C2E) contract and DoD’s Joint Warfighting Cloud Capability (JWCC). Services available on the high side lag commercial regions by months to years; Microsoft Fabric reaching GCC High in 2026 is a reminder that even unclassified government clouds trail commercial. Risk frameworks. National security systems follow CNSS policy rather than FIPS 199 alone. CNSSI 1253 adapts NIST SP 800-53 for NSS: categorization with separate impact values for confidentiality, integrity, and availability, plus overlays (for classified information, cross-domain solutions, privacy, and others). The intelligence community applies ICD 503, its risk management directive for the IC information environment (updated from the 2015 version). Authorizing officials, assessors, and system security plans all exist as in civilian RMF, with stricter baselines and more reciprocity paperwork. Physical and technical controls. SCIFs are built and accredited to ICD 705 and its technical specifications. TEMPEST addresses compromising electromagnetic emanations. Personal electronics are generally prohibited inside. Removable media use is restricted and logged, because sneakernet is both a necessity and a top spill vector. Cryptography. Classified data in transit uses NSA-approved cryptography: Type 1 equipment and the Commercial National Security Algorithm Suite. CNSA 2.0 is NSA’s post-quantum suite for national security systems, with new acquisitions expected to support it from January 1, 2027 and full transition targeted by 2035, separate from OMB M-26-15’s civilian track. The band is the operating reality. Every level duplicates the stack. Patching, backup, identity, and data management happen separately on each, and data that exists at more than one level exists as separate copies that drift. That duplication is the main reason data governance on the high side is harder and slower. Analogy: three studios in three buildings with no doors between them. Each has its own console, its own tape library, and its own engineers, and a song recorded in one has to be carried to the next through a checkpoint.

---

## Cross-domain solutions: moving data between levels

*08 · Classified*

**Low side**

- Unclassified

**Guard**

**High side**

- Inspect, filter, sanitize, verify labels, log every transfer
- Secret or above

**Access**

**Transfer**

**Multilevel**

- One user, one desktop, several domains, nothing moving between them.
- Move files or messages between domains through a guard.
- Store and process several levels, separated by labels.

**Low to high**

**High to low**

**Ncdsmo**

- Easier. Often a one-way data diode. The threat is malware riding in.
- Hard. A release decision: content inspection, sanitization, often human review.
- NSA’s office tests products to Raise the Bar; only baseline-listed products deploy.

???

A cross-domain solution (CDS) is a controlled interface that provides the ability to access or transfer information between security domains, for example between unclassified and Secret networks. It’s the single most consequential data control on the high side: it decides what crosses. Three types, per DoD Instruction 8540.01. Access solutions let a user see and work in several domains from one device without moving data between them (thin-client and virtualization approaches). Transfer solutions move files, messages, or streams between domains through a guard. Multilevel solutions store and process data at multiple levels within one system, keeping separation through labels and trusted operating systems. Transfer is what most people mean. Direction matters. Low to high (bringing unclassified data, patches, open-source intelligence, or commercial feeds up to a classified network) is comparatively easy. It often uses a data diode: hardware that physically allows bits to flow in one direction only. The risk is malicious content riding in, so guards scan, validate formats, and strip active content. High to low (releasing information down to unclassified, to coalition partners, or to the public) is hard, because it’s a release decision and a mistake is an unauthorized disclosure. Guards check classification labels against what may pass, validate file structure, apply content filters, and use content disarm and reconstruction (rebuilding files from knowngood components so hidden content can’t survive). “Dirty word” keyword searches are known to be insufficient on their own; human reliable reviewers are still part of many high-to-low flows. Hidden content is the classic failure: metadata, tracked changes, embedded objects, image layers, and redactions that only hide text visually. NCDSMO and Raise the Bar. NSA’s National Cross Domain Strategy and Management Office is the government focal point for cross-domain capability. Its Raise the Bar strategy sets design, development, and assessment requirements for CDS security. Products undergo months of Lab-Based Security Assessment, including penetration testing, before appearing on the NCDSMO Baseline List; deployments for classified information are expected to come from that list, and older products move to a sunset list and must be replaced. Authorization uses the CNSSI 1253 cross-domain solution overlay. Why data people care: a CDS works only as well as the data’s labels and formats. Well-structured, consistently marked data (the machine-readable markings on the previous slide) can move automatically and safely. Unlabeled office documents need slow human review. Data governance on the low side directly determines how fast information can be shared up, down, and across. Analogy: a one-way valve and a customs checkpoint. Gear can go into the studio fairly freely after a bag check. Anything leaving the studio gets opened, inspected, and signed off, because an unreleased track walking out the door can’t be called back.

---

## Spills, destruction, and declassification

*08 · Classified*

**Spillage**

**Destruction**

**Declassification**

- Classified data on the wrong system
- Destroy, don’t reuse
- Release on schedule
- NSA/CSS Policy Manual 9-12
- Automatic review at 25 years
- Mandatory review on request
- Report to security at once
- NSA evaluated products: shredders, degaussers, disintegrators
- Trace every copy: mail, backups, sync
- NIST 800-88 alone isn’t enough
- ISOO oversight; ISCAP appeals
- Sanitize under security direction
- Witnessed, recorded, accounted for Stop: don’t forward, delete, or print
- FOIA exemption (b)(1)

**Insider threat**

**Continuous vetting**

- EO 13587 programs; user activity monitoring on classified networks.
- Trusted Workforce 2.0 replaced periodic reinvestigations with ongoing checks.

???

The end of the classified data lifecycle, and the incidents that interrupt it. Spillage. A spill is classified information on a system not accredited for it: a Secret paragraph pasted into an unclassified email, a classified file copied to the wrong share, a briefing synced to a personal device. NIST SP 80053 control IR-9 (information spillage response) and agency security procedures govern the response. The first rules are counterintuitive for IT people: don’t forward it to security (that spreads it), don’t delete it yourself (that destroys evidence and leaves copies elsewhere), don’t print it. Report immediately. Then security and IT trace every copy: recipients’ mailboxes, journaling, backups, sync clients, mobile devices, search indexes, and now AI indexes and chat logs. That tracing is a data lineage problem, and organizations with good inventories and logs contain spills in hours instead of weeks. Sanitization may mean wiping or destroying devices and purging backup sets, under the security office’s direction. Destruction. Classified media and equipment are destroyed according to NSA/CSS Policy Manual 9-12 (the storage device sanitization and destruction manual), using equipment on NSA’s evaluated products lists: high-security crosscut shredders, degaussers, disintegrators, and optical media destroyers. NIST SP 800-88 governs unclassified sanitization and is not sufficient on its own for classified. Classified storage typically leaves the facility only as destroyed residue; reuse at a lower level is rare and tightly controlled. Destruction is witnessed and recorded so accountability holds. Declassification. Under EO 13526, records of permanent historical value are reviewed automatically at 25 years, with narrower exemptions at 50 and 75 years. Mandatory declassification review lets anyone request review of specific information; denials can be appealed to the Interagency Security Classification Appeals Panel, whose procedures ISOO reformed in August 2026. FOIA requests reach classified records too, with exemption (b)(1) protecting properly classified information. NARA’s National Declassification Center coordinates referrals among agencies with equities, and ISOO oversees the whole system and reports annually to the President. Insider threat. Executive Order 13587 (2011) requires agencies with classified networks to run insider threat programs, with minimum standards set by the National Insider Threat Task Force, including user activity monitoring on classified systems. In data terms: logging and behavioral analytics on access to classified data, with an analytic hub that can correlate HR, security, and IT signals. Continuous vetting. Trusted Workforce 2.0 replaced the old periodic reinvestigation cycle with continuous vetting: automated record checks and agency-reported information on an ongoing basis. Cleared employees have reporting obligations (foreign travel and contacts, financial issues) that are themselves data flows. Analogy: a spill is a leaked master: you don’t forward the link to the label to report it, you call, and they find every copy. Destruction is pressing-plant scrap under supervision.

---

## How the IC and the Department of War govern data INTELLIGENCE COMMUNITY

*08 · Classified*

- IC Data Strategy 2023–2025: end-to-end data management, interoperability at speed, partnerships, a data-fluent workforce
- ICD 504 (June 2024): IC data management; plan before you collect; automate

**Department of war**

- DoD Data Strategy (2020): data that is visible, accessible, understandable, linked, trustworthy, interoperable, secure (VAULTIS)
- ICD 505 (Jan 2025): AI governance
- Data Decrees (2021): data is an enterprise resource; catalog it; open interfaces
- Commercially available information framework (ICPM 504-01)
- AI Strategy (Jan 2026): CDAO directed to enforce the decrees
- Data-centric zero trust strategy rolled out in 2026
- 2026 DoW data strategy pending; Air Force and Navy strategies issued
- Same principles as the Federal Data Strategy, with harder walls, richer tagging, and stronger mandates to share inside them.

???

Both communities have formal data governance with more authority behind it than most civilian agencies. Intelligence community. The IC Chief Data Officer in ODNI sets direction for the 18 elements. The IC Data Strategy 2023–2025 named four focus areas: end-to-end data management; data interoperability and analytics at speed and scale; partnerships with the private sector and academia; and a data-fluent workforce. It called for automating data preparation and labeling so ingesting a dataset takes minutes instead of days. A successor strategy hadn’t been published as of this deck; academic groups have analyzed the open governance gaps. ICD 504, IC Data Management (June 7, 2024), makes it policy: the IC CDO oversees data management, each element has a CDO, data management planning happens before collecting or acquiring data, and data management activities are automated, including enabling data security and protection requirements. ICD 505 (January 17, 2025) governs AI, cross-referencing ICD 504. ICPM 504-01 sets a framework for commercially available information (data purchased from brokers and vendors), a growing privacy concern. In March 2026, ODNI described rolling out a new IC zero trust strategy shifting to a data-centric security model that protects information regardless of location or network. The IC Data Management Lexicon defines over 100 terms, a useful reference in its own right. Department of War. The 2020 DoD Data Strategy introduced the VAULTIS goals: make data visible, accessible, understandable, linked, trustworthy, interoperable, and secure. In May 2021 the Deputy Secretary issued five “data decrees”: maximize data sharing and treat data as an enterprise resource; publish data assets in a federated catalog with common interface specifications; use automated, machine-readable, open-standard interfaces; store data in a platform-agnostic way; and implement best practices for authentication, access management, encryption, and monitoring. The 2023 Data, Analytics, and AI Adoption Strategy followed. On January 9, 2026, the Secretary of War’s AI strategy memo directed the Chief Digital and AI Officer to enforce the data decrees, and coverage of that memo describes authority for the CDAO to direct release of department data to cleared users with a valid need, with updated data catalogs due within 30 days. A separate memo restructured the Advana analytics platform. A 2026 DoW data strategy was described as pending in the Air Force’s April 2026 data strategy, and the Navy issued its own strategy in June 2026. What to take from it. VAULTIS and the Federal Data Strategy say the same things; the difference is enforcement and environment. On the high side, data sharing is mandated inside the walls while the walls themselves are absolute, and tagging is richer because access decisions depend on it. Its data obligations come from this side of the house. Analogy: two big labels with their own catalog systems, both following the same industry metadata standards, now under orders to make their back catalogs available to every artist on the

---

## If you move agencies: what transfers, what’s new

*08 · Classified*

**Transfers directly**

**New to learn**

**Start now**

- Governance, stewardship, decision rights
- Classification management and SCGs
- CNSSI 1253 and ICD 503
- Free CDSE courses: derivative classification, marking, CUI
- Quality operations, MDM, lineage
- Cross-domain solutions
- Read EO 13526 and 32 CFR 2001
- RMF thinking and authorization
- SCIF operations and TEMPEST
- Skim CNSSI 1253 overlays
- CUI and Privacy Act handling
- Machine-readable markings, ABAC
- Records discipline
- Data clauses in contracts
- Clearance processes; cyber workforce qualification
- Zero trust data pillar; AI data security
- Slower change, longer lead times
- CISSP, already in progress

???

A realistic map for a GS-15 operations leader considering a move into a classified-heavy agency over a long career. What transfers directly. Almost everything in sections 01 through 07. Governance and stewardship work the same way; the IC and DoW have chief data officers, stewards, catalogs, and quality programs. Risk management framework thinking transfers, with different baselines. CUI and Privacy Act handling are identical across government. Records law applies to classified records too, with declassification layered on. Contract data provisions matter even more, because cleared contractors handle most classified IT. Zero trust data security and AI data security are, if anything, more mature on the high side. What’s new. Classification management: how OCAs and security classification guides work, derivative classification, and marking, including how to build systems that apply markings correctly. CNSSI 1253 and ICD 503 rather than FedRAMP baselines alone, with overlays and different reciprocity rules. Crossdomain solutions, which shape every data flow. SCIF operations, TEMPEST, and physical security as daily constraints. Machine-readable markings and attribute-based access as the norm rather than the aspiration. Personnel security: Top Secret eligibility requires a Tier 5 investigation, and many IC positions require a polygraph; continuous vetting follows. DoD’s cyber workforce qualification program (the DoD 8140 framework, which replaced the old 8570 certification lists) applies to cyber and IT roles in DoW. And the pace: change control, accreditation, and procurement are slower, and services arrive on classified clouds later. Start now. The Defense Counterintelligence and Security Agency’s Center for Development of Security Excellence (CDSE) offers free online courses on derivative classification, marking classified information, CUI, and information security; they’re what cleared staff take. Read EO 13526 and 32 CFR 2001 once end to end. Skim CNSSI 1253 and its overlays to see how NSS baselines differ from 800-53 moderate. Learning its requirements, authorizations, and data handling expectations is hands-on DoW exposure without changing jobs. Your CISSP study maps directly onto much of this (security architecture, asset security, security operations). A positioning note: leaders who can speak both unclassified data governance and classified data handling are scarce, and the AI push in both the IC and DoW runs straight through data readiness. Deputy CIO and CIO roles in those communities increasingly expect it. Analogy: a session player moving from studio work to touring with a big act. Same instrument, same skills; new rules about the setlist, the crew, and where you’re allowed to go backstage.

---

## Leading it

*09 / 09 · 09 · Leading It*

- Turning all of this into action: your stewardship plan, the words for each audience, the myths to rebut, and the questions to ask.
- Your first 90 days as steward · Explaining data · Myths · Twelve vendor questions · What’s next

???

The last section is the practical one. It starts with a concrete 90-day plan for your designation as data steward for IT and HR data, which was accepted in FY26 and hasn’t started yet; it’s scoped to be achievable alongside an operations director’s day job. Then the communication tools: oneliners by audience, the myths you’ll hear, and the questions to put to every vendor and contractor. It closes with what’s coming in 2027 so you can anticipate rather than react.

---

## Your first 90 days as steward for IT and HR data DAYS 1–30 · FIND

*09 · Leading It*

- Meet the CDAO, records, privacy, CISO, and your HR office counterpart
- List IT and HR data assets
- Check each against the inventory, SORNs, and schedules
- Pick 15 to 20 critical data elements

**Days 31–60 · define**

**Days 61–90 · operate**

- Glossary entries for those elements
- Monthly scorecard against baseline
- Baseline three rules: HR versus identity; assets with inactive users; CIs with no owner
- Draft the HR-to-IT data contract with
- the HR office and the application development team
- Data issue queue in the ITSM platform
- Checklist for access requests and AI uses
- Stewardship written into PDs and PWPs
- Day-90 deliverables: a one-page stewardship charter, a scored baseline, and one feed with a written contract.

???

A plan sized for a director who has a day job. It produces visible results in 90 days without new tools or staff. Days 1–30: find. Meet the people whose lenses overlap yours: the data officer (to align with the enterprise program and the inventory), the records office (schedules), the privacy office (SORNs and PIAs), the CISO (categorization and access), and your HR office counterpart (the business owner side of HR data). Then list the data assets in your two domains. the IT office: CMDB and relationships, hardware and software assets, licenses, service desk tickets and knowledge, identity and access data (the cloud directory, the identity provider), endpoint management (endpoint management), and operational logs. the HR office: personnel and position data, onboarding and offboarding records, organization structure, supervisor hierarchy, and HR service requests in the ITSM platform HRSD. For each, record the system of record, owner, sensitivity, whether it’s in the M-25-05 inventory, which SORN covers it, and which records schedule applies. Choose 15 to 20 critical data elements: the fields that drive access, money, or reporting. Days 31–60: define and baseline. Write glossary entries for those elements with the HR office, settling the definitions that cause the most trouble (active employee, contractor versus federal, separation date, supervisor of record, primary device user, CI owner). Baseline three rules you can run with SQL or the ITSM platform reports: people active in HR versus enabled accounts in the cloud directory and the identity provider; assets assigned to people not active in HR (the query from section 03); and CIs without an owner or support group. Record the starting numbers before announcing any target: anti-ratchet. Create a simple data issue category in the ITSM platform so problems get an owner and a due date. Days 61–90: operate. Publish a one-page monthly scorecard. Draft a written data contract for the HR-to-IT feed (which fields, which system is authoritative, timing, error handling, who to call), worked with the HR office and the application development team alongside the HR-table technical debt; that one document fixes more joiner-mover-leaver problems than any tool. Write a short checklist for reviewing access requests and new uses of your domains’ data, including AI uses, with the privacy and CAIO touchpoints built in. And put stewardship into position descriptions and performance work plans, yours and any delegates’, with time attached. The day-90 package is something you can show the CIO and the CDAO: a charter page (scope, decision rights, contacts), a baseline with a trend line starting, and one feed under contract. Analogy: the first rehearsals with a new band. Learn who plays what, agree on the charts for the songs you’ll actually play, record a run-through to hear where you are, and fix the one thing that keeps falling apart.

---

## Explaining data: one line per audience

*09 · Leading It*

- Audience
- What they need to hear
- Agency head
- Governed data is how we prove impact and defend every number we report.
- CFO, budget
- Bad data costs rework, unused licenses, and audit findings; prevention is cheaper than cleanup.
- OIG, auditors
- Here is the owner, the definition, the lineage, and the control evidence.
- OMB, the Hill
- We know what we hold, it’s inventoried and protected, and what can be public is.
- Staff
- Label it, store it in the right place, keep it out of unapproved tools.
- Contractors
- The data and the definitions are ours, and you’ll hand both back clean.
- AI enthusiasts
- AI is only as good as what it reads. Fix permissions and freshness first.

???

The same message tuned to what each audience cares about. Lead with value, back it with control, the same value-first framing you use for KPIs. Agency head. Their concerns are mission impact and credibility. Your agency reports development impact, portfolio exposure, and results to Congress and the public; governed data is what lets leadership stand behind those numbers. Keep it to the outcome. CFO and budget. Talk cost and risk: rework when reports don’t reconcile, licenses paid for departed staff, storage of data no one needs, and audit findings. Prevention (validation at entry, clean feeds) is cheaper than quarterly cleanups and remediation plans. OIG and auditors. They want evidence, not intentions: who owns this, how is it defined, where did it come from, what controls exist, and proof the controls ran. A catalog entry, lineage, a quality score history, and access review records answer most questions in one sitting. OMB and the Hill. Compliance plus stewardship of public trust: the inventory is complete and described to DCAT-US, sensitive data is protected, public data is published, and records are managed. Avoid technical detail unless asked. Staff. Three behaviors: apply the right sensitivity label, keep files in the governed location (not personal OneDrive or email attachments), and keep sensitive data out of tools not approved for it. Short, repeated, modeled by leaders. Contractors. Say it at kickoff, not at transition. AI enthusiasts. Redirect energy productively: the fastest way to better AI results is cleaner permissions, current authoritative content, and certified definitions. Every hour spent there improves every AI tool at once. A useful universal line when someone asks why governance matters: “Governance is how we decide once, instead of arguing every time.” Analogy: a producer talks to the label about sales, to the band about the sound, to the engineer about levels, and to the lawyer about rights. Same record, different conversation.

---

## Myths you’ll hear, and the reply

*09 · Leading It*

- Myth
- Reply
- “We’ll clean it up later.”
- Later never comes. Fix at entry; measure at every load.
- “Governance slows us down.”
- Undefined terms slow you down more. Decide once.
- “IT owns the data.”
- IT is the custodian. The business owns meaning and access.
- “It’s unclassified, so it’s harmless.”
- PII, CUI, and aggregation say otherwise.
- “It’s anonymized.”
- Three ordinary fields re-identify most people.
- “The cloud backs it up.”
- The provider keeps the service up. Restoring your data is on you.
- “More data, better AI.”
- Better data, better AI. More ungoverned data, more confident errors.
- “Delete it and it’s gone.”
- Not if it’s a record, on hold, in a backup, or synced somewhere.

???

Eight objections you will hear, with the reasoning behind each reply. “We’ll clean it up later.” Cleanup projects decay because the process that created the bad data is unchanged. Section 03: put validation at the point of entry and automated checks at every load, and publish the scores. “Governance slows us down.” Bad governance does: committees that review everything. Good governance is a small set of decisions made once (definitions, decision rights, standards) so teams stop relitigating them in every project. The time sink is arguing about what “active employee” means for the fifth time. “IT owns the data.” IT runs the systems and implements controls; the business decides what data means, who may use it, and what quality is acceptable. When IT is treated as owner, business decisions get made by default by people without the authority or context. “It’s unclassified, so it’s harmless.” Unclassified includes PII, CUI, procurement-sensitive information, and confidential commercial information in deal files. And aggregation can make harmless pieces sensitive, which the classified system formalizes as classification by compilation. “It’s anonymized.” Removing names isn’t de-identification. Sweeney’s finding that ZIP code, birth date, and sex single out most Americans is 25 years old and the risk has only grown with more linkable data. “The cloud backs it up.” SaaS and cloud providers are responsible for the platform; restoring data you or an attacker deleted or corrupted is generally the customer’s problem beyond native retention windows. Third-party backup and tested restores close the gap. “More data makes better AI.” Quality, relevance, permissions, and currency matter more than volume. Ungoverned data in an AI index produces confident, well-formatted, wrong answers and oversharing. “Delete it and it’s gone.” Deleting a federal record outside its schedule can be unlawful; a litigation hold may require keeping it; and copies persist in backups, recipients’ mailboxes, sync clients, search indexes, and AI indexes. Disposition is a process, not a keystroke. Use these lightly; the goal is to move a conversation forward, not to win it. Analogy: these are the “we’ll fix it in the mix” of data. Every engineer has heard it, and every engineer knows the mix can’t fix a bad take.

---

## Twelve questions for anyone who touches our data 01

*09 · Leading It*

- 02. 03
- 04. 05
- 06. Where is our data stored and processed, including backups and subprocessors?
- 07. How fast do you report an incident, and with what detail?
- 08. Which integrations hold tokens to our data, with what scopes?
- 09. How do you honor our labels, retention, and legal holds?
- 10. Is your crypto FIPS 140-3 validated? What is your PQC plan?
- 11. How do you measure and report quality on our deliverables?
- 12. What changes when you add AI features, and can we turn them off?
- What authorization covers it, at what level?
- Who on your side can access it, and how is that logged?
- Do you use our data or prompts to train or improve anything?
- How do we export all of it, with configuration and metadata?
- What happens to every copy at exit, and how is destruction proved?

???

Use these in market research, technical evaluations, kickoffs, and renewals. Weak answers are findings; write them into the contract or the risk register. 1. Location: data, backups, logs, and every subprocessor’s location. You’re looking for U.S. locations and a named, stable subprocessor list with change notice. 2. Authorization: FedRAMP Moderate or High (or the DoD impact level, on that side), and whether the specific features you’ll use are inside the authorized boundary. New AI features often launch outside it. 3. Vendor access: which roles at the vendor can reach your data, under what approval, whether access is logged and available to you, and whether support staff are U.S. persons where required. 4. Secondary use: any use of your data, prompts, outputs, or telemetry for training, product improvement, or other customers. The answer should be no, in the contract (M-2522; GSAR 552.239-7001 at GSA). 5. Export: complete export on demand, in open documented formats, including configuration and metadata, without professional services fees. Ask for a sample. 6. Exit: return timeline, deletion of all copies including backups within a set window, and a certificate referencing NIST SP 800-88 Rev. 2. 7. Incidents: notification within a defined number of hours (the proposed FAR CUI rule says 72 for CUI), what details are shared, and cooperation with forensics. 8. Integrations: every connected app, OAuth grant, and API user with access to your data, with scopes and token lifetimes. The Salesloft Drift lesson. 9. Labels, retention, holds: whether the product honors the compliance and DLP suite sensitivity labels, supports your retention schedules, and can preserve data under legal hold without breaking. 10. Crypto: FIPS 140-3 validated modules (140-2 certificates went historical September 2026), customer-managed key options, and a post-quantum roadmap aligned with M-26-15. 11. Quality: for contractors delivering data (CMDB, knowledge base, reports), how quality is measured, reported, and tied to the QASP. 12. AI: what changes when AI features are enabled, whether they’re on by default, where AI processing happens, and whether you can disable them per tenant or per user. Analogy: the rider and the contract before the tour. If it isn’t in the rider, don’t expect it backstage.

---

## What’s coming: 2027 and beyond

*09 · Leading It*

**Now**

- Inventory iteration. Agencies fill gaps after the Sept 30 deadline; DCAT-US 3.0 matures.

**Pending**

- Final FAR CUI rule; CMMC review outcome; a DoW data strategy; NIST Privacy Framework 1.1.

**Jan 2027**

- CNSA 2.0 acquisition gate for national security systems; civilian PQC moves to pilots.
- 2027
- CISA logging architecture drives agency logging plans under M-26-14; DMBOK 3.0 due.

**Ongoing**

- Records rules for AI and messaging evolve: GRS 6.1 revision, NARA AI guidance.

**Ongoing**

- Agents reading and writing data: identities for agents, data contracts for AI, semantic layers.
- The direction is consistent: know what you hold, label it, measure it, and make it safe for machines as well as people to use.

???

What to watch, in rough order of when it lands. Inventory iteration. The September 30, 2026 deadline for public comprehensive data inventories was a first pass for many agencies. Expect follow-up reporting, CDO Council guidance, and pressure to complete metadata and justify non-public assets. Pending rules and strategies. The FAR CUI rule (re-proposed June 2026, comments closed July) should be finalized, extending NIST SP 800-171 Rev. 3 and 72-hour incident reporting to civilian contractors. The DoW’s CMMC task force review will decide what replaces Phase II. A DoW data strategy has been described as pending. NIST said the final Privacy Framework 1.1 is coming in 2026; check status. PQC. National security systems hit the CNSA 2.0 acquisition gate on January 1, 2027. Civilian agencies move from planning into pilots and early migration under M-26-15’s phases. Expect vendor roadmaps and contract language to change quickly. Logging. CISA’s logging reference architecture drives each agency’s logging plan and maturity timeline under M-26-14, which depends on asset visibility, so the CMDB matters. DMBOK 3.0, expected in 2027, will update the profession’s reference for AI governance, cloud-native platforms, and mesh-style architectures, and the CDMP exam will follow. Records. NARA’s draft GRS 6.1 revisions and its August 2026 AI materials guidance will keep evolving, particularly for Teams, chat, and AI interactions. Records officers will need IT’s help with retention settings. Agents. As AI agents start reading and writing systems of record (the ITSM platform, Microsoft 365, Salesforce), data governance has to cover non-human actors: agent identities with least privilege, data contracts that agents must respect, certified semantic definitions so agents compute the same numbers people do, and logging of agent actions. The AI deck covers the agent side; this is the data side of the same shift. It’s the single best opportunity to write data deliverables, quality measures (CMDB Health, knowledge base currency), and exit terms into IT Operations’ biggest contract. The band is the through-line. Every one of these trends rewards the same habits: inventory, labels, quality measurement, and safe access for both people and machines. Analogy: formats change (vinyl, CD, MP3, streaming, spatial audio), but labels that kept clean masters, credits, and rights paperwork reissued their catalogs in every new format. The ones that didn’t are still hunting for tapes.

---

## Glossary: governance, policy, privacy

*REFERENCE*

- Critical data element: a field that drives access, money, or official reporting.
- Data owner: the executive accountable for a domain’s access, quality, and risk.
- Data steward: the named expert who runs definitions, rules, and issues.
- Data custodian: IT or a contractor operating the systems that hold data.
- Business glossary: agreed meanings of business terms.
- Data dictionary: one system’s fields, types, and allowed values.
- Data catalog: searchable inventory with meaning, lineage, owners, labels.
- Data asset: structured or semi-structured data, logically grouped (M25-05).

**Reference**

- DCAT-US 3.0: the federal metadata standard for inventory entries.
- Open by default: publish data unless law or policy restricts it.
- Record: information kept as evidence of agency business; disposed only by schedule.
- GRS: General Records Schedules, NARA’s government-wide retention rules.
- SORN: public notice of a Privacy Act system of records and its routine uses.
- PIA: privacy impact assessment under E-Gov Act section 208.
- CUI: unclassified information that law or policy requires to be safeguarded.
- SAOP, SAORM: senior agency officials for privacy and for records.

???

Expanded notes on the terms most likely to come up in governance meetings. Critical data elements are the scoping device for everything: quality rules, lineage, and definitions get applied to them first. Typical examples: employee status, separation date, supervisor of record, asset assignee, CI owner, counterparty identifier, commitment amount. Owner, steward, custodian: accountable, responsible day to day, and operating the system, respectively. The test question: who decides who may see this? That person or office is the owner. Glossary, dictionary, catalog: meaning (business), structure (one system), and the searchable map across everything (with lineage, owners, and labels). Data asset (M-25-05): the unit of the comprehensive inventory. Must be structured or semi-structured and logically grouped; unstructured content is managed through records and content controls instead. DCAT-US 3.0: the Data Catalog Vocabulary profile for U.S. government, used to describe each inventory entry (title, description, publisher, contact, access level, license, distributions). Published May 2026, with a CDO Council implementation guide in August 2026. Open by default: OPEN Government Data Act principle that public data assets be released machine-readable and openly licensed unless restricted. Record and GRS: the Federal Records Act definition, and NARA’s General Records Schedules covering common administrative records across government (IT, HR, finance, email under Capstone GRS 6.1). SORN and PIA: the Privacy Act’s public notice and the E-Gov Act’s risk assessment; both are prerequisites for systems handling personal information. CUI: established by EO 13556, implemented in 32 CFR Part 2002, with categories in the CUI Registry. Basic versus Specified; limited dissemination controls narrow the audience. SAOP and SAORM: the Senior Agency Official for Privacy and the Senior Agency Official for Records Management. Both should have a standing role in data governance decisions.

---

## Glossary: architecture and engineering

*REFERENCE*

- ACID: atomic, consistent, isolated, durable transactions.
- Medallion: bronze raw, silver cleaned, gold certified layers.
- Normalization: store each fact once; reference it elsewhere.
- ETL, ELT: transform before loading, or load raw then transform.
- OLTP, OLAP: systems that run the business versus analyze it.
- CDC: change data capture; ship only inserts, updates, deletes.
- Star schema: a fact table of events surrounded by dimension tables.
- Idempotent: safe to run twice with the same result.
- SCD Type 2: keep history by adding dated rows when attributes change.
- Data contract: enforced producer-consumer agreement on schema and quality.
- Lakehouse: lake files with database guarantees via a table format.
- Parquet: columnar, compressed, typed file format.
- Delta, Iceberg: open table formats adding transactions and time travel.
- Data mesh: domains own data as products under federated governance.
- CAP: during a network split, choose consistency or availability.
- Semantic layer: one governed definition of each metric for all tools.

**Reference**


???

Second sentences for the engineering terms. ACID: what makes a transaction safe; durability comes from write-ahead logging, which also enables point-in-time recovery. Normalization: first, second, and third normal forms remove repeating groups, partial dependencies, and transitive dependencies. Analytics denormalizes on purpose for speed. OLTP and OLAP: row-oriented versus columnar storage is the physical difference; don’t run heavy analytics against production OLTP. Star schema: declare the grain (one row per what?) before anything else; mixed grains double-count. SCD Type 2: effective-from and effective-to dates plus a current flag; makes historical reports reproducible. Lakehouse: the dominant pattern in 2026; Microsoft Fabric’s OneLake uses Delta; Iceberg is the most vendor-neutral format. Parquet: the default analytical file format; Avro is its rowbased, streaming-friendly cousin. Medallion: quality rules sit at each boundary; AI and dashboards should read gold. ETL and ELT: ELT keeps the raw copy so you can reprocess when rules change. CDC: log-based CDC catches deletes; timestamp-based CDC misses hard deletes. Idempotent: the property that makes retries safe; use upserts on business keys. Data contract: like an interface control document, but checked automatically in the pipeline. Data mesh: an organizational model for large enterprises; small agencies borrow its ideas (ownership, products, contracts) without the full structure. CAP: PACELC adds that, without a partition, you still trade latency against consistency. Semantic layer: increasingly important for AI

---

## Glossary: integrity, security, classified

*REFERENCE*

- Hash, fixity: a fingerprint that proves content hasn’t changed.
- OCA: official authorized to classify information originally.
- Digital signature: proves who signed and that nothing changed since.
- Derivative classification: carrying markings forward from sources or a guide.
- WORM: write once, read many; immutable until a retention date.
- RPO, RTO: data you can lose; time you can wait to restore.
- DSPM: finds sensitive data and its exposure across stores.
- ABAC: access decided by user, data, and context attributes.
- Tokenization: swap a value for a meaningless token held in a vault.
- ML-KEM: NIST’s post-quantum key establishment standard (FIPS 203).
- SCG: security classification guide; an OCA’s rulebook for a program.
- Portion marking: a classification mark on every paragraph or element.
- Compilation: harmless items classified together for what they reveal.
- Cross-domain solution: controlled access or transfer between levels.
- Data diode: hardware that lets data flow one way only.
- Spillage: classified data on a system not accredited for it.

**Reference**


???

Second sentences for the integrity, security, and classified terms. Hash and fixity: SHA-256 is the standard; MD5 and SHA-1 are broken for adversarial integrity. Fixity checks are routine in archives. Digital signature: provides non-repudiation; PIV cards sign this way. Post-quantum signature standards are ML-DSA (FIPS 204) and SLH-DSA (FIPS 205). WORM: implemented as object lock or immutable storage; the backbone of ransomware-resistant backup and legal holds. RPO and RTO: set by data owners in the business impact analysis, tested by IT. DSPM: data security posture management; the compliance and DLP suite’s DSPM for AI watches data flowing into AI apps. ABAC: the model behind classified-network access decisions and zero trust data access. Tokenization: unlike encryption, the token has no mathematical relationship to the value; the mapping lives in a separate vault. ML-KEM: derived from CRYSTALS-Kyber; deployed today in hybrid TLS key exchange. OCA and derivative classification: original authorities are few and trained annually; derivative classifiers are many and trained every two years. SCG: the classification policy for a program, expressed as rules; the natural source for automated tagging. Portion marking: what makes reuse and declassification of individual parts possible. Compilation: EO 13526 section 1.7(e). The formal name for aggregation risk, acute with AI analytics. Cross-domain solution: access, transfer, or multilevel; deployed from NSA NCDSMO’s baseline list under Raise the Bar. Data diode: common for low-to-high transfer; the hardware physically has no return path.

---

## Sources and where to go deeper

*REFERENCE · CURRENT AS OF NOV 20, 2026*

**Policy and law**

**Standards and practice**

**Classified and defense**

- OMB M-25-05 open data Data inventory deadline

**Eo 13526**

- EO 14243 information silos
- Zero Trust Data Security Guide
- ISOO Notice 2026-01 AI
- OMB M-26-14 logging
- NIST SP 800-88 Rev. 2
- ICD 504 IC data management
- OMB M-26-15 post-quantum
- AI Data Security CSI
- IC Data Strategy
- NARA AC 11.2026 AI records

**Dama-dmbok 3.0**

**Nsa ncdsmo**

- FAR CUI proposed rule
- Salesloft Drift advisory
- DoW AI strategy summary
- GSAR 552.239-7001 final
- Your agency Open Data Plan 2025
- CMMC status

**Reference**


???

Primary sources first: OMB memoranda, executive orders, NARA and ISOO issuances, NIST publications, and agency documents. Law-firm alerts and trade press are used where a rule is still proposed or a primary text wasn’t practical to cite. Policy moves fast in sections 05 through 08; re-check every six months.
