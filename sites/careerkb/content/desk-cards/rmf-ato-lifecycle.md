---
title: ATO lifecycle (NIST RMF) on one page
domain: cyber
tags: [rmf, ato, fisma, nist-800-37, nist-800-53, poam, continuous-monitoring]
summary: The seven Risk Management Framework steps, what each produces, and who signs. Use it to answer "where is this system in its ATO?" in under a minute.
status: draft
updated: 2026-11-23
handling: public
sources:
  - title: NIST SP 800-37 Rev. 2, Risk Management Framework
    url: https://csrc.nist.gov/pubs/sp/800/37/r2/final
  - title: NIST SP 800-53 Rev. 5, Security and Privacy Controls
    url: https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final
  - title: FIPS 199, Standards for Security Categorization
    url: https://csrc.nist.gov/pubs/fips/199/final
related: [zero-trust-briefing]
---

> **Placeholder card.** Seeded to exercise the layout. Replace with the version from your Work Related chats.

## The seven steps

| # | Step | Key output | Owner |
|---|------|-----------|-------|
| 0 | **Prepare** | Risk strategy, common controls, roles | Agency / CISO |
| 1 | **Categorize** | FIPS 199 impact level (L / M / H) | System owner |
| 2 | **Select** | Tailored SP 800-53 baseline | System owner + ISSO |
| 3 | **Implement** | Controls in place; SSP written | System owner / IT Ops |
| 4 | **Assess** | Security Assessment Report (SAR) | Independent assessor |
| 5 | **Authorize** | ATO decision + POA&M | Authorizing Official (AO) |
| 6 | **Monitor** | ConMon, POA&M updates, re-auth triggers | ISSO / IT Ops |

## The authorization package

- **SSP**: system security plan, how each control is met
- **SAR**: what the assessor found
- **POA&M**: open weaknesses, owners, milestones, dates
- **AO decision letter**: the risk acceptance itself

## What to ask in a status meeting

1. What's the impact level, and who set it?
2. Which step are we in, and what's blocking the next one?
3. How many POA&Ms are open, and how many are past due?
4. When does the current authorization expire, or is it on ongoing authorization?

## Watch for

- Inheriting controls from a FedRAMP-authorized cloud service doesn't remove the agency ATO; it shrinks it.
- A significant change (new interconnection, new data type, major upgrade) can trigger reassessment.
