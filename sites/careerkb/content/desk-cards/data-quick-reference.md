---
title: "Data quick reference desk card"
domain: data-ai
tags: [data, governance, cui, privacy, records, evidence-act, data-quality, stewardship, classification]
summary: "Data kinds, architecture, quality, governance roles, CUI and classification, privacy, records and the Evidence Act on one reference card. Redacted from the original desk card."
status: draft
updated: 2026-11-23
handling: public
redacted: "Agency-specific names, tools, contracts, locations, people and plans removed under the approved redaction rules (2026-11-23)."
markings: teaching-examples
---

Companion to the deck Data: The Things You Need to Know. Facts checked as of the date above; re-check the security, law, and classified sections every six months.

## The five ideas

*Data becomes an asset only when someone knows what it is, where it lives, who owns it, and how good it is. Everything below elaborates one of these.*

1. Liability until governed. Unmanaged data costs storage, eDiscovery, breach exposure, and quiet legal violations.
2. Fix it where it's born. Validation at entry beats every cleanup. Rule of thumb 1-10-100: prevent for 1, correct for 10, live with it for 100.
3. If you can't trace it, you can't defend it. Lineage is what lets a number survive OIG, OMB, or the Hill.
4. Classification drives everything. Encryption, access, retention, sharing, and AI use all follow from the label.
5. Governance is decision rights. Who decides, who answers for it, how it's measured. Declare the baseline before the target.

## Vocabulary

*The same object can be data, information, and a record at once, and each hat brings different rules.*

| Term | Meaning | Governing rules |
|---|---|---|
| Data | Recorded information in any form (Evidence Act) | M-25-05 inventory; data asset = structured or semi-structured, logically grouped |
| Information | Data in context for a purpose | Circular A-130; Information Quality Act once disseminated |
| Record | Kept as evidence of agency business (44 U.S.C. 3301) | Federal Records Act; destroy only under a NARA schedule |

### Lifecycle, with the federal hook at each stage

1. Plan: FIPS 199 categorization (SP 800-60), privacy threshold analysis, records schedule identified.
2. Collect: Paperwork Reduction Act for 10+ public respondents; Privacy Act notice at collection; minimize.
3. Store: SP 800-53 controls, CUI safeguarding, encryption, M-25-05 inventory entry.
4. Use and share: SORN purposes and routine uses, sharing agreements, IQA, open by default.
5. Retain: agency schedule or GRS item; legal holds; Capstone (GRS 6.1) for email.
6. Dispose: schedule authority, NIST SP 800-88 Rev. 2 sanitization, certificate of destruction.

### Kinds of data and how each fails

| Kind | Your agency example | Typical failure |
|---|---|---|
| Master | Counterparties, employees, vendors | Duplicates and conflicts |
| Reference | ISO 3166 countries, ISO 4217 currencies, NAICS | Local copies drift |
| Transactional | Disbursements, tickets, purchase orders | Missing or late records |
| Configuration | CMDB CIs, assets, licenses | Stale |
| Metadata | Schemas, labels, retention codes | Absent |
| Derived | Power BI models, KPI tables, embeddings | Silently outdated; inherits source sensitivity |
| Content | Memos, Box, Teams, email | Overshared, over-retained |
| Telemetry | the SIEM, the SSE platform, the identity provider logs | Too costly to keep, then gone |

Metadata in three families: business (meaning, owner, sensitivity, CDE flag) · technical (schema, keys, location, lineage) · operational (freshness, row counts, job status, quality scores, access logs).

Glossary vs dictionary vs catalog: agreed meaning of a term · one system's fields and allowed values · searchable inventory across systems with lineage, owners, labels.

DAMA-DMBOK wheel: governance at the hub; architecture, modeling, storage and operations, integration, warehousing and BI, quality, reference and master data, metadata, security, documents and content around it. DMBOK 2 (2017, revised 2024) is current; 3.0 is due 2027.

## Technician cheat sheet

*Four SQL patterns cover most data-quality and reporting checks. Table and column names are illustrative.*

-- 1. Orphans: assets assigned to people not active in HR SELECT a.asset_tag, a.assigned_to FROM asset a LEFT JOIN hr_person p ON p.id = a.assigned_to AND p.status = 'A' WHERE a.assigned_to IS NOT NULL AND p.id IS NULL;

-- 2. Duplicates: same normalized name more than once SELECT UPPER(TRIM(legal_name)) AS nm, COUNT(*) AS n FROM counterparty GROUP BY UPPER(TRIM(legal_name)) HAVING COUNT(*) > 1;

-- 3. Latest record per key (window function)

SELECT * FROM (

SELECT e.*, ROW_NUMBER() OVER (PARTITION BY emp_id ORDER BY effective_dt

DESC) AS rn

FROM emp_history e) x

WHERE rn = 1;

-- 4. Validity: codes not in the reference list SELECT p.project_id, p.country_iso3 FROM project p WHERE p.country_iso3 NOT IN (SELECT iso3 FROM ref_country);

| Concept | What to remember |
|---|---|
| Keys and constraints | Primary key = unique row; foreign key = must exist elsewhere (no orphans); NOT NULL, UNIQUE, CHECK reject bad data at the door |
| ACID | Atomic (all or nothing), Consistent (rules hold), Isolated (no half-done reads), Durable (committed = survives a crash, via write-ahead log) |
| Isolation levels | Read committed, repeatable read, serializable: stricter = fewer anomalies, less throughput |
| Normalization | 1NF atomic values; 2NF depend on the whole key; 3NF no column depends on another non-key column. Store each fact once |
| Indexes | B-trees speed reads, slow writes |
| OLTP vs OLAP | Run the business (row store, normalized) vs analyze it (columnar, star). Don't report off production |
| Star schema | Fact table at a declared grain + dimension tables to slice by. Wrong grain = double counting |
| SCD Type 2 | New dimension row with effective dates when an attribute changes; keeps history reproducible |
| Warehouse / lake / lakehouse | Curated tables, schema on write / any files, schema on read / open files plus a table format with ACID and time travel |
| Formats | CSV (fragile), JSON (nested), Parquet (columnar default), Avro (row, streaming); table formats Delta, Iceberg, Hudi |
| Medallion | Bronze raw and immutable, silver cleaned and conformed, gold certified. Dashboards and AI read gold |
| Store type Use for | Examples |
| Document One JSON per entity | Cosmos DB, MongoDB |
| Key-value Caches, sessions | Redis |
| Graph Relationships: ownership chains, CMDB dependencies | Neo4j |
| Vector Similarity search for RAG; derived data | Azure AI Search, pgvector |
| Store type Use for | Examples |
| Time- Metrics, logs (KQL) series | Log Analytics, ADX |

CAP: during a network partition a distributed store keeps consistency or availability, not both. PACELC: otherwise, latency vs consistency. Default to relational; pick another engine for a specific access pattern.

Pipelines: ETL transforms before load; ELT lands raw and transforms in place (keeps the raw copy). Batch is hours old; CDC ships only changes (log-based catches deletes, timestamp-based misses them); streaming publishes events to subscribers.

Pipeline hygiene: idempotent (safe to rerun) · schema checked on arrival · retries plus a dead-letter queue · freshness and volume alerts · managed identities, not passwords · emits lineage (OpenLineage).

Modern vocabulary: data mesh = domain ownership, data as product, self-serve platform, federated governance · data fabric = metadata-driven integration layer · data product = owned, documented, SLA'd dataset · data contract = enforced schema, meaning, quality, and change notice · semantic layer = one definition per metric for every tool and AI.

## Quality and integrity

*Quality means fit for the decision the data supports; measure critical data elements against a declared baseline.*

| Dimension | Question | Measure |
|---|---|---|
| Accuracy | Matches reality? | % of a verified sample |
| Completeness | Anything missing? | % required fields filled |
| Consistency | Do systems agree? | Count of mismatches (HR vs enabled accounts) |
| Timeliness | Current enough? | Hours from event to update |
| Validity | Follows format and domain rules? | % passing rules |
| Uniqueness | One record per thing? | Duplicate rate |

Quality as an operation: 1 profile → 2 write testable rules → 3 monitor on every load and publish scores → 4 triage with owner and due date → 5 fix at the source → 6 prevent at entry (required fields, pick-lists, validation). Observability pillars: freshness, volume, schema, distribution, lineage.

the ITSM platform CMDB Health: completeness (required and recommended fields) · correctness (duplicates, orphans, stale CIs) · compliance (audit rules). Use as objective COR measures with a declared baseline.

### Four meanings of integrity, and who asks

| Meaning | Proof | Who asks |
|---|---|---|
| Security: not altered without authorization (FIPS 199 I) | Access control, hashes, signatures, protected logs | CISO, assessors |
| Database: only valid states (entity, referential, domain) | Keys, constraints, ACID | DBAs, architects |
| Information quality: disseminated info protected (IQA) | Guidelines, correction process (your agency routes to the CDO) | CDO, OIG, public |
| Records and evidence: authentic, reliable, complete, usable | Chain of custody; ALCOA+ checklist | Records officer, counsel |

Integrity mechanisms: SHA-256 hash (sameness; MD5 and SHA-1 broken) · digital signature (sameness plus who) · audit trail shipped where admins can't edit it · versioning and time travel · immutable WORM storage and object lock · provenance (lineage, C2PA). Crypto must be FIPS 140-3 validated; FIPS 140-2 certificates moved to the historical list on September 21, 2026.

Resilience: RPO = data you can lose; RTO = time to restore (both set by the data owner, tested by IT, SP 800-34). Backups follow 3-2-1-1-0: 3 copies, 2 media, 1 offsite, 1 immutable or offline, 0 restore-test errors. SaaS providers keep the service up; restoring your deleted or corrupted data is on you. Backups don't undo exfiltration. Keep backup credentials outside any single admin's or agent's blast radius. NIST SP 1800-25, -26, -11 cover identify/protect, detect/respond, recover.

## Governance and stewardship

*Governance decides (policy, standards, decision rights, definitions of record, risk acceptance, disputes); management executes. Your agency fits a hub-and-spoke model: a central CDO and governance body, with named stewards in each domain.*

| Role | Who, typically | Accountable for |
|---|---|---|
| Chief Data Officer | Your agency data officer (statutory, 44 U.S.C. 3520) | Strategy, inventory, open data, governance body |
| Governance body | Senior leaders, chaired by the CDO (M-19-23) | Priorities, policy, disputes |
| Data owner | Senior executive for the domain | Access decisions, quality targets, risk acceptance |
| Data steward | Named expert: you, for IT and HR | Definitions, rules, issues, day-to- day approvals |
| Data custodian | IT staff, contractors | Storage, backup, controls, operations |
| Data consumer | Everyone | Use within purpose and handling rules |

Adjacent officials with a standing touchpoint: SAOP (privacy), SAORM (records), CISO (security), CAIO (AI use), CIO (IT resources). IT holds the data; the business owns it.

### The steward's six verbs

- Define: glossary terms and critical data elements (active employee, separation date, primary user, CI owner).
- Measure: automated rules, baselined and trended (HR vs identity, weekly). Resolve: triage issues to root cause, usually a process, not a person.
- Approve: access and new uses within the owner's policy, including AI uses. Change: definitions and code lists under change control; check lineage first. Connect: privacy (SORN, PIA), records (schedule), security (impact level), CDAO (inventory).

Document stack: charter (authority, membership, decision process) → policy (short, stable) → standards (testable) → procedures (step by step).

Master data management styles: registry (index across sources) · consolidation (golden copy for reporting) · coexistence (golden record syncs back) · centralized (create only in the hub). Golden record = match → merge by survivorship rules → humans settle the uncertain middle; never auto-merge low-confidence matches. Carry standard IDs: SAM.gov UEI (replaced DUNS in April 2022) for U.S. vendors, LEI (ISO 17442) for legal entities worldwide. HR is the master for people.

Lineage: business lineage (systems and steps, for owners and auditors) and technical lineage (column to column, for impact analysis). Captured by scanners, OpenLineage events, and manual entries marked as manual. Scope to critical data elements first.

Catalog jobs: find · understand · trust (quality, lineage, certification) · govern (labels, owners, access).

Maturity: 1 initial (heroics) → 2 repeatable → 3 defined (policy, glossary, CDEs, stewards) → 4 managed (measured quality, live catalog) → 5 optimized (automated controls). In the 2025 federal CDO survey, 57% of CDOs reported five or fewer staff.

Metrics worth reporting: % CDEs with owner and definition · CDE quality scores vs baseline · median days to resolve a data issue · % inventory with classification and metadata · access recertifications on time · HR-to-identity mismatches, trended.

## Security and privacy

*Label at creation, by default, and let encryption, DLP, sharing, and AI controls key off the label.*

Classification ladder: Public → Internal → CUI Basic → CUI Specified → Classified (separate systems, see the classified primer).

- FIPS 199: rate each information type low, moderate, or high for confidentiality, integrity, availability (SP 800-60); the system takes the high-water mark.
- CUI: EO 13556 and 32 CFR 2002; categories in the CUI Registry. Moderate confidentiality is the floor. Banner "CUI"; Specified categories carry an SP-prefix; limited dissemination controls (NOFORN, FEDCON, NOCON, REL TO) narrow the audience. FOUO and SBU are retired.
- Derived data inherits: an extract, dashboard, or embedding of CUI is CUI.
| Control | What it does | Tooling |
|---|---|---|
| In transit | TLS; TLS 1.3 support required by Jan 2, 2030 | the SSE platform, Azure, SaaS |
| At rest | AES-256 in FIPS 140-3 validated modules | M365, Azure, SaaS |
| Keys | Customer-managed keys in an HSM; split duties; key loss = data loss | Azure Key Vault, Managed HSM |
| Mask, tokenize | Real values never in test or training environments | Static and dynamic masking, token vault |
| DLP, CASB | Detect and stop sensitive data leaving, including into unapproved AI | the compliance and DLP suite DLP, the SSE platform, EDR for Cloud Apps |
| Access by attribute | User, device, label, and context decide | the cloud directory conditional access, labels |
| DSPM | Find sensitive data and its exposure | the compliance and DLP suite DSPM, including for AI |

Zero trust data pillar (CISA ZTMM): inventory, categorization, availability, access, encryption. The CDO and CISO councils' Federal Zero Trust Data Security Guide (Oct 2024) is organized as define, secure, manage.

### Post-quantum dates

| Date | Item |
|---|---|
| Aug 2024 | FIPS 203 ML-KEM, FIPS 204 ML-DSA, FIPS 205 SLH- DSA final |
| Jun 22, 2026 | EO 14412 sets hard federal PQC deadlines |
| Jun 24, 2026 | OMB M-26-15: five phases 2026 to 2035; replaces M-23-02 |
| ~Oct 22, 2026 | Agency PQC migration plans due to OMB and ONCD |
| Jan 1, 2027 | CNSA 2.0 acquisition gate for national security systems |
| 2030–2031 | High-value assets and high-impact systems migrated (per EO summaries) |
| 2035 | Full migration target |

First deliverable: a cryptographic inventory, prioritized by data shelf life. Harvest now, decrypt later makes long-lived secrets exposed today.

Privacy Act toolkit: SORN (purposes, routine uses) · PTA then PIA (E-Gov Act 208) · notice at collection (552a(e)(3)) · computer matching agreements · breach response under M-17-12, led by the SAOP. PII = distinguishes or traces identity alone or when linked or linkable. ZIP + birth date + sex likely singled out 87% of Americans (Sweeney, 2000). De-identify by suppression, generalization, aggregation, k-anonymity, differential privacy (SP 800-226), synthetic data (check for memorized records); SP 800-188 covers government datasets.

Sharing instruments: ISA and MOU for system connections (SP 800-47 Rev. 1) · data use agreement for datasets · computer matching agreement for benefit eligibility · contract clauses for vendors. Every request gets four written answers: what data, what purpose, what authority, how long. EO 14243 (Mar 2025) directs full, prompt access to unclassified data for designated officials to the extent consistent with law; involve GC and the SAOP and log access. OMB M-26-14 (May 2026) rescinded M-21-31 and made logging risk-based.

SaaS integration controls (Salesloft Drift, Aug 2025: stolen OAuth tokens, data exported from 700+ Salesforce tenants, no platform flaw): inventory connected apps and OAuth grants · least-privilege scopes, short token lifetimes · IP and user restrictions on integration accounts · no secrets in tickets, cases, or notes · alerts on bulk export and API spikes · vendor breach notice and flow-down in contracts.

## Law, records, and contracts

*Most data questions touch three or four of these authorities at once.*

| Authority | Governs | Lead official |
|---|---|---|
| Evidence Act; M-19-23; M-25-05 | CDO, inventory, open data, governance body | Chief Data Officer |
| Authority Governs |  | Lead official |
| Federal Records Act; 36 CFR Ch. Keeping and disposing of records XII; GRS |  | SAORM, records officer |
| Privacy Act; E-Gov Act 208; A- Personal data, PIAs, breaches 130, A-108, M-17-12 |  | SAOP |
| FISMA; Circular A-130 Security of information and systems |  | CIO, CISO |
| Paperwork Reduction Act Collections from 10+ members of the public |  | CIO |
| Information Quality Act; M-19-15 Quality of disseminated information |  | CDO |
| FOIA Public access to records; (b)(1) classified, (b)(4) commercial, (b)(6) privacy |  | FOIA officer |
| EO 13556; 32 CFR 2002 CUI |  | CUI program |
| M-25-21, M-25-22; NARA AI AI use of agency data guidance |  | CAIO, SAORM |

Evidence Act and open data dates: Jan 2019 act signed · Jul 2019 M-19-23 (CDO, governance body; learning agendas for CFO Act agencies only) · Jan 15, 2025 M-25-05 (open by default, comprehensive inventory including non-public assets with reasons, open data plans in the IRM strategic plan; replaced M-13-13) · May 2026 DCAT-US v3.0 published · Aug 2026 CDO Council 78-page implementation guide · Sep 30, 2026 public inventories due on Data.gov. Your agency’s data office runs Title II and published a 2025 Open Data Plan.

### Records rules that bite IT

- Every record needs an agency schedule or GRS item; unscheduled records are kept until scheduled.
- Capstone (GRS 6.1) retains email by role; revisions were in draft in 2026. Electronic recordkeeping (M-19-21, M-23-07); NARA ended most analog transfers after June 30, 2024.
- Records on a non-official messaging account go to an official account within 20 days (44 U.S.C. 2911).
- NARA, Aug 21, 2026: using AI doesn't by itself create a record; reliance, conducting business, circulation, or filing can. Fold FRA requirements into AI policy. Legal holds suspend disposal; unauthorized destruction is reported to NARA (36 CFR 1230). Decommissioning needs a records sign-off.

### Contract data checklist

- Government owns its data and derivatives (reports, indexes, embeddings, configurations); FAR 52.227-14 for deliverables No training, reuse, sale, or other-customer use without written consent (M-25-22; GSAR 552.239-7001 final Sep 28, 2026 for GSA LLM work)
- U.S. location, named subprocessors, authorization level, AI features inside the boundary Log and audit access on request; incident report clock (proposed FAR CUI rule: 72 hours)

Proposed FAR CUI rule (June 23, 2026): moves to FAR Part 40; 52.240-6 notice and 52.240-7 clause; NIST SP 800-171 Rev. 3 for contractor systems; 72-hour CUI incident reporting. Not final. DoW suspended CMMC Phase II on July 13, 2026; DFARS 252.204-7012 still applies.

Name the data deliverables now: CMDB with relationships, knowledge base, runbooks, ticket and change history, monitoring configurations, asset records, with quality thresholds against a declared baseline.

## Data for AI

*AI quality and AI risk are mostly data quality and data risk; test data against six questions before an assistant reads it.*

1. Inventoried: known to exist, owned, sensitivity labeled.
2. Permissioned: oversharing fixed first; AI surfaces every "Everyone" link.
3. Current: superseded versions archived; citations show source dates.
4. Defined: certified metric definitions, so the AI counts what you count.
5. Traceable: lineage and citations so answers can be checked.
6. Measured: quality scored on what AI actually reads, including retrieval accuracy.

Embeddings, summaries, prompts, and chat logs inherit the classification of what went in, and may be records.

Securing AI data (NSA, CISA, FBI and partners, May 22, 2025). Three risks: data supply chain, poisoned data (including RAG poisoning through a planted document), and data drift. Ten practices: reliable sources and provenance · integrity checks in storage and transit · digital signatures on trusted revisions · trusted infrastructure · classification and access control · encryption · secure storage · privacy-preserving techniques · secure deletion · ongoing risk assessment.

ISOO Notice 2026-01 (Mar 30, 2026): no CUI or classified information in AI systems that are internet-connected, externally connected, or not accredited for it; agencies update CUI and classified policies to cover AI.

## Classified primer

*The same disciplines apply on the high side, with absolute walls, richer tagging, and slower change. All content here is from public sources.*

| Level | Damage if disclosed | Networks | Cloud | Risk framework |
|---|---|---|---|---|
| Confidential | Damage | SIPRNet | DoD IL6 | CNSSI 1253 |
| Secret | Serious damage | SIPRNet | DoD IL6; providers' Secret regions | CNSSI 1253 |
| Top Secret (and SCI) | Exceptionally grave damage | JWICS, IC networks | Top Secret regions under C2E and JWCC | ICD 503, CNSSI 1253 |

For comparison, unclassified and CUI run on agency networks or NIPRNet, FedRAMP Moderate or High, or DoD IL2, IL4, IL5, under NIST RMF and SP 800-53.

How information becomes classified (EO 13526, 32 CFR 2001, ISOO oversight)

- Original classification: only designated OCAs; one of eight section 1.4 categories; must describe the damage; sets a declassification date (default 10 years, up to 25). OCAs train annually.
- Derivative classification: almost all classified material; markings carried forward from sources or a security classification guide (SCG). Training every two years. Access needs all three: eligibility (clearance) + need to know + signed SF 312. Prohibited: classifying to conceal violations, inefficiency, or error, or to avoid embarrassment. Nothing stays classified indefinitely.
- Compilation (section 1.7(e)): unclassified items can be classified together if the combination reveals more. Acute with AI analytics.

Markings as metadata: banner line top and bottom; portion marks on every paragraph ((U), (C), (S), (TS) plus controls); classification authority block (Classified By or Derived From, Declassify On). Control systems: SCI compartments, special access programs. Dissemination controls: NOFORN, ORCON, REL TO, PROPIN. IC encoding specs (ISM, ARH, NTK) and the Trusted Data Format bind tags to data for attribute-based access.

Cross-domain solutions (DoDI 8540.01): access (several domains, one desktop), transfer (through a guard), multilevel (labels within one system). Low to high is easier (data diodes; malware is the risk). High to low is a release decision: content inspection, sanitization and CDR, often human review; keyword search alone is insufficient. Products must come from NSA NCDSMO's Baseline List under Raise the Bar.

### Spills, destruction, declassification

- Spill: don't forward, delete, or print; report to security at once; trace every copy (mail, backups, sync, search and AI indexes); sanitize under security direction (SP 800-53 IR-9).
- Destruction: NSA/CSS Policy Manual 9-12 and NSA evaluated products (shredders, degaussers, disintegrators); SP 800-88 alone isn't enough; witnessed and recorded. Declassification: automatic review at 25 years (exemptions at 50 and 75); mandatory review on request; ISCAP appeals (procedures reformed Aug 2026); FOIA (b)(1). Insider threat programs (EO 13587) monitor classified networks; Trusted Workforce 2.0 replaced periodic reinvestigations with continuous vetting.

IC and DoW data governance: IC Data Strategy 2023–2025 · ICD 504 IC Data Management (Jun 7, 2024) · ICD 505 AI (Jan 17, 2025) · ICPM 504-01 commercially available information · data-centric IC zero trust strategy (2026). DoD Data Strategy 2020

goals VAULTIS (visible, accessible, understandable, linked, trustworthy, interoperable, secure) · 2021 Data Decrees · DoW AI Strategy (Jan 9, 2026) directs the CDAO to enforce them · a 2026 DoW data strategy pending; Air Force (Apr 2026) and Navy (Jun 2026) strategies issued. Networks use NSA-approved cryptography; CNSA 2.0 required in new NSS acquisitions from Jan 1, 2027.

| Transfers directly | New to learn | Start now |
|---|---|---|
| Governance, stewardship, decision rights | Classification management, SCGs, marking | Free CDSE courses: derivative classification, marking, CUI |
| Quality, MDM, lineage | CNSSI 1253 overlays, ICD 503 | Read EO 13526 and 32 CFR 2001 once |
| RMF thinking; CUI and Privacy Act handling | Cross-domain solutions; SCIF and TEMPEST | Skim CNSSI 1253 and its overlays |
| Records discipline; contract data clauses | Machine-readable markings, ABAC |  |
| Zero trust data; AI data security | Clearances (Tier 5 for TS, polygraph for some IC roles); DoD 8140 qualification | Finish CISSP |

## Steward's first 90 days (IT and HR data)

*Day-90 deliverables: a one-page stewardship charter, a scored baseline, and one feed under a written data contract.*

### Days 1–30: find

- Meet the CDAO, records, privacy office, CISO, and the HR office counterpart List the IT office assets: CMDB, hardware and software assets, licenses, tickets and knowledge, the cloud directory and the identity provider, endpoint management, operational logs List the HR office assets: personnel and position data, onboarding and offboarding, org structure, supervisor hierarchy, HRSD requests For each: system of record, owner, sensitivity, in the M-25-05 inventory?, SORN, records schedule
- Pick 15 to 20 critical data elements

### Days 31–60: define and baseline

- Glossary entries agreed with the HR office: active employee, contractor vs federal, separation date, supervisor of record, primary device user, CI owner Baseline rule 1: active in HR vs enabled in the cloud directory and the identity provider Baseline rule 2: assets assigned to people not active in HR Baseline rule 3: CIs without an owner or support group Data issue category in the ITSM platform with owner and due date

### Days 61–90: operate

- Monthly one-page scorecard against the baseline HR-to-IT data contract drafted with the HR office and the application development team (fields, authority, timing, error handling, contacts)
- Review checklist for access requests and new uses, including AI, with privacy and CAIO touchpoints Stewardship written into PDs and PWPs with time attached

## Questions, one-liners, rebuttals

*Twelve questions for anyone who touches our data*

1. Where is our data stored and processed, including backups and subprocessors?
2. What authorization covers it, and are the features we'll use inside the boundary?
3. Who on your side can access it, and how is that logged?
4. Do you use our data, prompts, or telemetry to train or improve anything?
5. How do we export all of it, with configuration and metadata, in what format?
6. What happens to every copy at exit, and how is destruction proved?
7. How fast do you report an incident, and with what detail?
8. Which integrations hold tokens to our data, with what scopes?
9. How do you honor our labels, retention, and legal holds?

10. Is your crypto FIPS 140-3 validated, and what is your PQC plan? 11. How do you measure and report quality on our data deliverables? 12. What changes when you add AI features, and can we turn them off?

| Audience | One line |
|---|---|
| Agency head | Governed data is how we prove impact and defend every number we report. |
| CFO, budget | Bad data costs rework, unused licenses, and audit findings; prevention is cheaper. |
| OIG, auditors | Here is the owner, the definition, the lineage, and the control evidence. |
| OMB, the Hill | We know what we hold, it's inventoried and protected, and what can be public is. |
| Staff | Label it, store it in the right place, keep it out of unapproved tools. |
| Contractors | The data and definitions are ours, and you'll hand both back clean. |
| AI enthusiasts | AI is only as good as what it reads; fix permissions and freshness first. |
| Myth | Reply |
| "We'll clean it up later." | Later never comes. Fix at entry; measure at every load. |
| "Governance slows us down." | Undefined terms slow you down more. Decide once. |
| "IT owns the data." | IT is the custodian; the business owns meaning and access. |
| "It's unclassified, so it's harmless." | PII, CUI, and aggregation say otherwise. |
| "It's anonymized." | Three ordinary fields re-identify most people. |
| "The cloud backs it up." | The provider keeps the service up; restoring your data is on you. |
| "More data, better AI." | Better data, better AI; more ungoverned data, more confident errors. |
| Myth | Reply |
| "Delete it and it's gone." | Not if it's a record, on hold, in a backup, or synced somewhere. |

Universal line: governance is how we decide once, instead of arguing every time.

### Glossary

| Term | Meaning |
|---|---|
| ABAC | Access decided by user, data, and context attributes |
| CDC | Change data capture: ship only inserts, updates, deletes |
| CDE | Critical data element: drives access, money, or official reporting |
| Compilation | Harmless items classified together for what they reveal (EO 13526 1.7(e)) |
| Cross-domain solution | Controlled access or transfer between security levels |
| CUI | Unclassified information law or policy requires to be safeguarded |
| Data asset | Structured or semi-structured, logically grouped data (M-25-05) |
| Data contract | Enforced producer-consumer agreement on schema, meaning, quality, change notice |
| Data diode | Hardware that lets data flow one way only |
| DCAT-US 3.0 | Federal metadata standard for inventory entries |
| Derivative classification | Carrying classification forward from sources or an SCG |
| DSPM | Finds sensitive data and its exposure across stores |
| Fixity | Hash check proving content hasn't changed |
| GRS | NARA's General Records Schedules |
| Idempotent | Safe to run twice with the same result |
| Lakehouse | Lake files plus a table format giving ACID and time travel |
| Medallion | Bronze raw, silver cleaned, gold certified |
| ML-KEM | NIST post-quantum key establishment (FIPS 203) |
| OCA | Official authorized to classify originally |
| PIA, PTA | Privacy impact assessment; privacy threshold analysis |
| RPO, RTO | Data you can lose; time you can wait to restore |
| SCD Type 2 | History kept by adding dated dimension rows |
| SCG | Security classification guide: an OCA's rulebook for a program |
| Semantic layer | One governed definition per metric for every tool and AI |
| SORN | Public notice of a Privacy Act system of records |
| Spillage | Classified data on a system not accredited for it |
| Star schema | Fact table at a declared grain plus dimension tables |
| VAULTIS | DoD data goals: visible, accessible, understandable, linked, trustworthy, interoperable, secure |
| WORM | Write once, read many: immutable until a retention date |

### Sources

- OMB M-25-05 · CRS on M-25-05 · September 30, 2026 inventory deadline · CDO Council EO 14243 · OMB M-26-14 · OMB M-26-15 NARA AC 11.2026, AI materials · NARA memos to records officers
