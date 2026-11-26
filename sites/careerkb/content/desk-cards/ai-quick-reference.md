---
title: "AI quick reference desk card"
domain: data-ai
tags: [ai, llm, agents, rag, m-25-21, m-26-04, governance, security, prompting, evals]
summary: "The five ideas, how models and agents work, the frontier, security, federal AI policy (M-25-21, M-26-04), buying AI, cost math and what to say. Redacted from the original desk card."
status: draft
updated: 2026-11-23
handling: public
redacted: "Agency-specific names, tools, contracts, locations, people and plans removed under the approved redaction rules (2026-11-23)."
---

## The five ideas

*AI makes first drafts nearly free. It doesn’t make being wrong any cheaper. Everything below elaborates one of these five ideas.*

1. Plausible, not true. A language model predicts likely text; it doesn’t look things up. Fluent is not the same as correct.
2. Context beats model choice. The documents, instructions, and examples you supply matter more than which model you pick.
3. Workflows, not chat. The value comes from AI wired into your data and systems, with a person approving the consequential step.
4. Every capability is attack surface. Anything it reads can try to instruct it; anything it can do, an attacker can try to make it do.
5. Governance is measurement. Inventory it, tier the risk, test it, and monitor it against baselines you declared first.

## How it works

*A model is a frozen statistical text predictor. It sees only what’s in its context window and writes one token at a time.*

| Concept | What to remember |
|---|---|
| How a model is made | Pretraining (predict the next token across trillions of tokens), then post-training (assistant behavior, tone, safety), then reasoning training. At run time the weights are frozen; you supply context. |
| Token | About ¾ of an English word; 1,000 tokens ≈ 750 words. Models read, write, and bill in tokens. |
| Context window | Everything the model sees in one call. Frontier models take about 1M tokens (≈ 1,500 pages). No memory between calls; apps re-send the history every turn. |
| Generation | One token at a time, sampled from probabilities. A hallucination is a plausible continuation where the fact is missing. |
| Temperature | A randomness dial. It changes variety, not accuracy. |
| Reasoning models | Work the problem before answering. Better at multi-step analysis, code, and agents; thinking tokens bill as output. |
| Embeddings | Text turned into vectors so similar meanings land close together. They power semantic search and RAG. |
| Predictive vs. generative | Predictive outputs a score or label; generative outputs content. Same governance questions for both. |

Models as of Nov 2026: Anthropic Claude Fable 5.2, Opus 5.5, Sonnet 5.5, Haiku 5.5 · OpenAI GPT-6.2 Astra, GPT-6.x Sol, Luna · Google Gemini 4 Neon, Carbon · open-weight Mistral Large 4, Qwen4, DeepSeek, Kimi, Llama. The leader changes every few months, so design systems that can switch models rather than ones built around a single model.

## Under the hood

*A model is layers of math applied to tokens. Its capability comes from scale and training, and its behavior from post-training. None of it is programmed rule by rule.*

### What happens to your prompt

| Step | What happens |
|---|---|
| 1. Tokenize | Text becomes token IDs from a vocabulary of roughly 100,000–250,000 entries |
| 2. Embed | Each token becomes a vector of a few thousand numbers |
| 3. Layers | Dozens of layers of attention (each token weighs every earlier token) and feed-forward math (where much stored knowledge lives) |
| 4. Predict | A probability for every token in the vocabulary |
| 5. Sample | Pick one, append it, and run again for the next token |

- Parameters: the learned weights, from hundreds of billions to trillions, frozen at run time. Many frontier models and most open-weight models use mixture-of-experts, which runs only a few specialist sub-networks per token.
- Attention drives the cost: a long context multiplies the work. The KV cache stores past attention work to speed generation but uses GPU memory, which is why cached prompts get a discount.
- Knowledge is spread across the weights, not stored as records. That’s why a model can’t say where it learned a fact.
- Interpretability is partial: researchers can trace small pieces, such as a model planning a rhyme before writing the line that leads to it. Nobody can yet read a frontier model’s full reasoning.

### Training at scale

- Compute for the largest training runs has grown 4–5× a year (Epoch AI). The first gigawatt-scale AI data centers came online in 2026. Epoch estimates the largest run it has quantified (Grok 4) at about 5×10^26 FLOP; labs don’t disclose their own figures. Scaling laws: error falls predictably as parameters, data, and compute grow together. That predictability is what drives the investment.
- There are now three ways to scale: pretraining scale; reinforcement learning on tasks with checkable outcomes, the main source of the 2025–26 gains in coding and agents; and test-time compute, meaning thinking longer.
- Distillation: big models generate training data for small ones. That’s why this year’s small model often beats last year’s flagship at a few percent of the price.

### Post-training and its failure modes

| Stage | What it does |
|---|---|
| Supervised fine-tuning | Examples of ideal responses teach the assistant format |
| RLHF and RLAIF | A reward model learns human or AI preferences; the model is optimized toward them |
| Character and constitution | Written principles shape values, honesty, and refusals |
| RL on verifiable tasks | Rewards outcomes a program can check: tests that pass, correct answers |

- Reward hacking: satisfying the grader instead of doing the task. The Mythos Preview system card reports it on 20–38% of deliberately impossible coding tasks, Anthropic’s lowest rate yet.
- Sycophancy: telling raters what they want to hear.
- Evaluation awareness: models noticing they’re being tested, which makes the results harder to trust.

Behavior is trained, not programmed. That’s why it generalizes, and why it can’t be fully specified or guaranteed.

## Using it

*Give it the source, or check its output. Brief it like a capable contractor on day one who knows nothing about your agency.*

### Prompt checklist

1. Role and audience: who it writes as, and for whom.
2. Task: one verb, one deliverable.
3. Context: the documents, the background, why it matters.
4. Constraints: length, tone, must and must-not.
5. Format: table, memo, JSON, or your template.
6. Example: one good sample beats ten adjectives.
7. Quality bar: “Flag your assumptions. Say what’s missing.”

### Verification by stakes

| Stakes | Examples | Minimum check |
|---|---|---|
| Low | Brainstorms, your own first drafts | Read it; use judgment |
| Medium | Internal email, meeting summaries, KB articles | Check names, numbers, dates, and claims against the source |
| High | Signed or sent outside the IT office: OMB, OIG, the Hill, acquisition files | Line by line; open every citation; second reviewer |
| Decision | AI output is the principal basis for a decision about people or companies | Governance: high-impact determination, testing, human review and appeal |

Hallucination tells: invented citations, plausible wrong numbers, FAR clauses that don’t exist, real names in the wrong role. Tactics: require the quote and its location; allow “not in the documents”; cross-check with search or a second model; take numbers only from systems of record.

## Building with it

*Knowledge goes in RAG or tools. Behavior goes in the prompt. Fine-tuning is the last resort.*

| Approach | Use it when | Avoid it when | Effort |
|---|---|---|---|
| Prompting | Behavior or format can be described in words | It needs facts it doesn’t have | Low |
| Long context | A small, stable document set per task | Thousands of documents, or cost per call matters | Low |
| RAG | Large or changing knowledge base; citations; per-user permissions | The question needs the whole corpus at once | Medium |
| Tools and APIs | Exact data from systems of record | The data has no API yet | Medium |
| Fine-tuning | Consistent style or format at volume; narrow classification | Adding knowledge; fast- changing facts | High |

RAG in six steps: ingest into chunks → embed and index with permissions → user asks → retrieve what this user may see → put the passages in the prompt → answer with citations. It fails on bad chunking, stale indexes, missed retrieval (a confident wrong answer), and oversharing. Fix permissions before you index.

Agent ladder (each step up adds capability and risk; most value today is on steps 2 and 3):

1. Chat: answers; you do everything.
2. Copilot: drafts in your app; you accept or reject.
3. Workflow: fixed steps; AI fills some of them.
4. Agent: AI picks the steps and tools, within limits.
5. Multi-agent: agents delegate to other agents.

MCP (Model Context Protocol): the open standard for connecting AI apps to tools and data, donated to the Linux Foundation’s Agentic AI Foundation on Dec 9, 2025. Every MCP server runs with someone’s credentials: inventory, scope, vet, log, and gate writes.

Evals: a test suite for AI behavior. A golden set of real tasks, scoring, thresholds set in advance, regression on every change, and a red-team set. Prompts are code: version, review, and test them.

## How agents actually work

*An agent is a model plus tools, a loop, memory, and guardrails. The model only writes text. The harness around it decides what actually runs, and with whose credentials.*

### The tool-calling loop

1. The harness sends the system prompt and the tool definitions: name, description, input schema.
2. The model replies with a structured call such as {"tool":"get_ticket","input": {"id":"INC-4821"}} . It executes nothing.
3. The harness runs the call with its own credentials and returns the result into the context.
4. The model reads the result and picks the next call, or finishes.
5. For consequential writes, the harness pauses for human approval.

This has three consequences. Control lives in the harness, so least privilege is enforced there, not in the prompt. Tool descriptions are prompt text and can steer the model. And every tool result re-enters the context, which is how indirect prompt injection arrives.

### The harness

| Component | What it does |
|---|---|
| System prompt | Role, rules, standing instructions |
| Tools | APIs, MCP servers, code execution, a browser |
| Context manager | Chooses what enters the window; compacts long sessions |
| Memory | Notes and files that persist across sessions |
| Loop control | Step limits, retries, budgets, stop conditions |
| Permissions | Allow and deny lists, sandbox, human approval gates |
| Sub-agents | Fresh contexts for subtasks; results summarized back |
| Logs and traces | Every prompt, tool call, and result |

When a contractor proposes an agent, ask for the harness design, not just the model name.

### Why long tasks fail

| Per-step success | 20 steps | 50 steps |
|---|---|---|
| 99% | 82% | 61% |
| 95% | 36% | 8% |

The figures are illustrative and assume independent steps; the best models now recover from many of their own errors. The failure modes are context rot, compounding errors, false claims of success, reckless shortcuts, and loops. In April 2026 a coding agent deleted a startup’s production database and its backups with one API call in nine seconds, despite rules against destructive commands (TechRepublic). The fixes: checks run by the harness before the agent can claim “done,” human checkpoints, compaction and sub-agents, least privilege, separate credentials for each environment, and backups the agent can’t reach. Design so the agent’s worst possible action is survivable.

### Agent types and protocols

| Type | Examples | What to know |
|---|---|---|
| Coding | Claude Code, OpenAI Codex, Cursor | Most mature; tests give tight feedback |
| Computer use | Screen-driving agents | Works in any app, but slower and brittle; vendor-reported OSWorld scores near 80% |
| Research | Deep research features | Mostly read-only; watch source quality |
| Platform | the ITSM platform, M365, Salesforce agents | Inherit the platform’s permissions and data |
| Multi-agent | An orchestrator plus sub- agents | More throughput and tokens; harder to debug |

MCP connects an agent to tools and data. A2A connects agents to other agents. Google created it; the Linux Foundation now hosts it. It has 150+ supporting organizations and is built into Azure AI Foundry, Copilot Studio, and AWS Bedrock AgentCore.

## The frontier: where we really are

*Capability is real, fast, and dual-use. The labs’ own reports describe both rapid gains and concerning behavior in testing.*

METR Time Horizon data (TH1 and TH1.1), via METR and published summaries · 6 values, Feb 2025–Apr 2026

At 80% reliability the top horizon falls to about 3 hours, and that gap is what matters for operations. METR estimates the horizon has doubled about every four months since 2023 (METR). The early points use METR’s first methodology and the later ones its 2026 update, so read the line as a trend. Public benchmarks are saturating, and METR stopped actively updating its page in September 2026.

### The cyber turn, newest first

| Date | Event | What happened |
|---|---|---|
| Sep 2026 | Astra rated Critical | OpenAI said its Astra model can find and exploit unknown flaws in hardened systems without step-by-step guidance; released with gated access (OpenAI) |
| Jul 2026 | Hugging Face breach | OpenAI models in a cyber evaluation, with safeguards off, used a zero-day to reach the internet and breached Hugging Face’s production systems (OpenAI) |
| Jun 12–30, 2026 | Export controls | Commerce required a license for foreign- national access to Claude Fable 5 and Mythos 5, citing a safeguard jailbreak; lifted June 30 (Mayer Brown) |
| Apr 2026 | Mythos Preview withheld | Project Glasswing partners found 10,000+ high- or critical-severity vulnerabilities in a month (Anthropic) |
| Nov 2025 | Agent-run espionage | A group Anthropic attributes to Chinese state sponsorship used Claude Code for 80–90% of a campaign against about 30 targets (Anthropic) |

### What labs find in their own models

- Reward hacking: declining with each generation, not gone.
- Reckless actions: in testing, early Mythos Preview versions escaped a sandbox and covered their tracks; this wasn’t seen in the final model. Anthropic rates the model’s alignment risk “very low, but higher than for previous models” (alignment risk update).
- Evaluation awareness: rising, which makes clean test results harder to trust. Scheming: 2026 studies find minimal instances in realistic settings so far (ICML 2026 study).

### How it’s managed

| Mechanism | Example |
|---|---|
| Frontier safety frameworks | Anthropic RSP v3.0; OpenAI Preparedness (High, Critical); Google Frontier Safety Framework |
| Gated access | Project Glasswing; OpenAI Trusted Access for Cyber |
| Safeguards | Astra refuses 91.5% of cyber jailbreak tests, vs 59% for GPT-5.6 Sol |
| Government testing | CAISI agreements; EO 14409 voluntary pre-release access |
| Export controls | Claude Fable 5 and Mythos 5, June 12–30, 2026 |

The International AI Safety Report 2026 finds that hallucinations are rarer, but that current risk-management techniques remain fallible.

### The honest assessment

- What’s real: agents finish multi-hour expert tasks half the time; vulnerability discovery is now expert-level and machine-speed; agents are in production on every major platform.
- What’s uncertain: how far benchmark gains carry into messy real work; whether safeguards keep pace; how quickly attackers get equivalent tools.

## Security

*Treat the AI as an untrusted component that its inputs can steer. Prompt injection can be mitigated but not solved.*

| Threat | What it looks like |
|---|---|
| Prompt injection | Instructions hidden in a document, email, web page, or ticket the AI reads |
| Data leakage | Sensitive data in unapproved tools; retrieval showing users what they shouldn’t see |
| Excessive agency | An agent with more permissions than its task, acting on someone else’s instructions |
| Unsafe output handling | Output run or rendered unchecked: code, queries, links, images that phone home |
| Supply chain | Models, plugins, MCP servers, open weights of unknown provenance |
| Runaway cost | Agent loops and token-burn abuse |

The lethal trifecta (Simon Willison): private data + untrusted content + a way to send data out. An agent with all three can be steered into exfiltration. Remove one leg.

| Control | In practice |
|---|---|
| Least privilege, least agency | Scoped, task-specific permissions; read-only by default |
| Agent identity | Its own non-human identity in the cloud directory; never a borrowed user token |
| Human approval gates | A person approves send, delete, pay, submit, reconfigure |
| AI gateway | Authentication, policy, filtering, rate and cost caps, logs to the SIEM |
| Content as data | Retrieved documents, email, and web pages can’t issue instructions |
| Egress control | Limit where AI-driven requests can send data |
| Red team and monitor | Adversarial tests before launch; alerts on unusual tool use and spend |
| Content filters | Useful, not sufficient: a seatbelt, not a guardrail |

Standards map: NIST AI RMF 1.0 for governance language (under revision) · NIST AI 600-1 for generative AI risks · NIST IR 8596 Cyber AI Profile (draft) · COSAiS SP 800-53 overlays for ATO controls (in development) · CAISI AI Agent Standards Initiative (Feb 2026) · OWASP Top 10 for LLM and Agentic Applications for testing · Five Eyes “Careful Adoption of Agentic AI Services” (May 1, 2026).

Authorization: FedRAMP covers the service, not your use case. Building on cloud AI services is a boundary change: involve the ISSO and SCA, update the SSP, decide prompt and output retention, and run model or prompt updates through change management.

## Federal policy timeline

*Since 2025 the policy has pushed faster AI adoption while keeping a minimum level of governance for high-impact uses.*

| Date | Action | What it does |
|---|---|---|
| Oct 2026 | OneGov 2.0 | Consumption pricing: OpenAI from Oct 1, Anthropic from Oct 27 |
| Jun 25, 2026 | FedRAMP Consolidated Rules | 20x becomes the standard authorization path |
| Jun 2, 2026 | EO 14409 | AI-enabled cyber defense; voluntary pre-release access to frontier models |
| Mar 31, 2026 | OMB M-26-10 | CIO review authority over IT buys; pricing shared across agencies |
| Dec 11, 2025 | OMB M-26-04 | Unbiased AI Principles written into LLM purchases |
| Aug 2025 | FedRAMP AI prioritization; OneGov AI deals | Fast track for conversational AI; offers at $1 or less |
| Jul 23, 2025 | AI Action Plan + EO 14319 | 90+ actions in three pillars; Unbiased AI Principles for LLMs |
| Apr 3, 2025 | OMB M-25-21 and M-25-22 | Use and acquisition rules; replaced M- 24-10 and M-24-18 |
| Jan 23, 2025 | EO 14179 | Pro-adoption direction; ordered OMB to rewrite its AI guidance |

## M-25-21 and high-impact AI

*Your agency isn’t a CFO Act agency, so no AI strategy or governance board is mandated. Every other requirement below applies.*

| Requirement | When | Applies to |
|---|---|---|
| Chief AI Officer (GS-14+ outside CFO Act agencies) | 60 days (Jun 2025) | All agencies |
| AI compliance plan | 180 days, then every 2 years through 2036 | All agencies |
| IT, data, cyber, privacy policies; generative AI policy | 270 days | All (GenAI policy is a “should”) |
| Minimum practices documented for high-impact AI | 365 days (Apr 3, 2026) | Any agency using it |
| AI use case inventory, with a public version | Annually | All (DoD and IC differ) |
| Requirement When | Applies to |  |
| Share custom AI code and models; Ongoing open source where practicable | All agencies |  |
| AI strategy; AI Governance Board 180 / 90 days | CFO Act agencies only |  |

The high-impact test: AI output is a principal basis for a decision or action with a legal, material, binding, or significant effect on civil rights, liberties, or privacy; access to education, housing, insurance, credit, employment, or programs; critical government services; health and safety; critical infrastructure or public safety; or strategic assets, including sensitive information. Federal employment decisions are presumed high-impact.

The seven minimum practices:

1. Pre-deployment testing and risk mitigation
2. Impact assessment, independent review, signed risk acceptance
3. Ongoing monitoring of performance, security, and impacts
4. Training and periodic assessment of operators
5. Human oversight, intervention, and accountability
6. Timely human review and appeal for affected people
7. Feedback channels for users and the public

Pilots and waivers: limited, CAIO-certified pilots can be exempt. Waivers are written, system-specific, certified annually, and reported to OMB within 30 days. High-impact AI that can’t comply stops.

## Buying AI

*AI purchases are IT purchases. Check the data-use clause first and the exit plan second.*

M-25-22: acquiring AI (solicitations after Oct 1, 2025, plus option exercises)

- IP rights and government data use spelled out No training on non-public government data without consent Privacy protections; vendors disclose AI use Lock-in protections: data and model portability, knowledge transfer Minimum practices flow down for high-impact AI
- Performance-based requirements and testing; maximize American AI

### M-26-04: buying LLMs (Dec 11, 2025; implements EO 14319)

- Truth-seeking and ideological neutrality required in every new LLM solicitation Vendor documentation: acceptable use policy, model or system card A way for users to report violating outputs Agency policies updated by Mar 11, 2026; existing contracts modified where practicable, by the next option Sunsets two years after issuance

M-26-10 (Mar 31, 2026): CIOs review IT acquisitions; pricing and utilization data are shared across agencies.

| Channel | What it is now |
|---|---|
| OneGov 2.0 | Consumption pricing. OpenAI: 27 months from Oct 1, 2026, 50% off token usage. Anthropic: from Oct 27, 2026, 40% off Claude Enterprise, Claude for Government, and the API |
| OneGov 1.0 | The $1-or-less offers from Aug 2025; ended Sep– Oct 2026 |
| USAi (GSA) | Multi-model government platform; now a platform fee plus pass-through usage |
| FedRAMP | AI fast track since Aug 2025; 20x is the standard path since Jun 25, 2026 |

## Cost math

*The same task can cost 40× more on a flagship model than on a small one, so send each task to the cheapest model that passes its eval. Output tokens cost about 5× input; thinking tokens bill as output.*

\text{cost per call} = \frac{\text{input tokens} \times \text{input price} + \text{output tokens} \times \text{output price}}{1{,}000{,}000}

Worked example: summarize a 20-page document (about 10,000 tokens in, 1,000 out), 800 users × 20 calls a day = 16,000 calls, list prices per million tokens as of Nov 2026.

| Model class | Price in / out per M | Per call | Per day | Per year (250 days) |
|---|---|---|---|---|
| Flagship (Claude Opus 5.5) | $4 / $20 | $0.06 | $960 | $240,000 |
| Small (Claude Haiku 5.5) | $0.10 / $0.50 | $0.0015 | $24 | $6,000 |

Levers: route by task · cache repeated context · batch non-urgent jobs · retrieve passages instead of attaching binders · start new threads · cap spend per app with alerts at 50, 80, and 100% · report cost per completed task, not total spend.

Twelve questions for any vendor or contractor A strong vendor answers these with evidence; a weak one answers with adjectives.

| #          Area | Question |
|---|---|
| 1          Architecture | Which models and versions? Can we switch providers without a rebuild? |
| 2          Architecture | How are prompts and system instructions versioned and tested? |
| 3          Architecture | What happens when the model is deprecated? |
| 4          Architecture | Can we export our data, indexes, configurations, and logs? |
| 5          Data and security | Where is data processed and stored, for how long, and is it used for training? |
| 6          Data and security | What FedRAMP level, and what’s inside the boundary? |
| 7          Data and security | How are permissions enforced at retrieval time? |
| 8          Data and security | What can the agent do, with whose credentials, and what needs approval? |
| 9          Quality and cost | Show me the eval set, the scores, and how you measure groundedness. |
| 10 Quality and cost | How do you handle prompt injection, and what risk remains? |
| 11 Quality and cost | What’s the pricing unit, and how do we cap spend? |
| 12 Quality and cost | Model card, acceptable use policy, and output reporting (M-26-04)? |

## What to say

*Match the framing to the room, then end with something measurable.*

| Audience | The line |
|---|---|
| Executives | “A very fast, very well-read junior analyst. It drafts and sorts at scale; it doesn’t know when it’s wrong. We point it at the right work, connect the right data, and keep a person accountable.” |
| Skeptics | “We start with low-risk work we can measure, test it like any system, and shut off what doesn’t earn its keep.” |
| Enthusiasts | “Everything we turn on is something we secure, pay for, and support. Show me the baseline and the eval.” |
| Finance | “It’s a utility now. We meter it, cap it, and report cost per outcome.” |
| Staff | “It takes over tasks, not judgment. You sign it, you own it.” |
| Myth | Rebuttal |
| “It’s just autocomplete.” | Next-token prediction at a scale that yields real reasoning. A pianist “just presses keys.” |
| “It’s 95% accurate.” | On what test set, scored how? Ask for the eval. |
| “We need our own model.” | Almost never. You need your data, permissions, and evals. |
| Myth | Rebuttal |
| “It’s FedRAMP authorized, so any use is fine.” | Authorization covers the service, not your use case. |
| “AI will replace the Service Desk.” | It absorbs tasks. Staffing follows measured deflection, not demos. |
| “It learns from our chats.” | Government terms generally bar it; M-25-22 requires that. Verify the contract. |
| “Agents will run themselves.” | They need identity, limits, approvals, and monitoring: more operations, not less. |

Declare the baseline before you claim the percentage.

### Glossary

| Term | Meaning |
|---|---|
| Agent | A model that plans and takes actions with tools, in a loop, toward a goal |
| AI gateway | One controlled entry point for model traffic: identity, policy, logging, cost caps |
| Context window | Everything the model can see in one call, measured in tokens |
| Embedding | Text turned into a vector so similar meanings sit close together |
| Eval | A repeatable test of AI quality against known-good answers |
| Fine-tuning | Further training on your examples to shape style or format |
| Frontier model | The most capable models available at a given time |
| Grounding | Tying answers to supplied sources so claims can be checked |
| Hallucination | Fluent, confident output that is false or unsupported |
| High-impact AI | M-25-21’s term for AI that is a principal basis for significant decisions |
| Inference | Running a trained model; what you pay for per token |
| LLM-as-judge | A model scoring outputs; must be calibrated against people |
| MCP | Model Context Protocol, the open standard connecting AI apps to tools and data |
| Model card | Vendor documentation of a model’s purpose, testing, and limits |
| Multimodal | Handles more than text: images, audio, video, documents |
| Open-weight model | A model whose weights you can download and run yourself |
| Parameters | The learned numbers inside a model; a rough proxy for size |
| Prompt injection | Malicious instructions smuggled into content the AI reads |
| RAG | Retrieval-augmented generation: fetch relevant passages, then answer from them |
| Reasoning model | A model that works through a problem before answering |
| System prompt | Standing instructions set by the builder, ahead of user input |
| Temperature | A setting for randomness in output |
| Token | The unit models read and bill in; about ¾ of a word |
| Vector database | A store built to search embeddings by similarity |

### Technical terms

| Term | Meaning |
|---|---|
| A2A | Agent2Agent, the open protocol for agents to find and delegate to each other |
| Attention | How each token weighs every earlier token to decide what matters |
| Context engineering | Deciding what the model sees at each step, including compaction of long sessions |
| Distillation | Training a small model on a big model’s outputs |
| Harness | The code around a model that runs its tools, memory, and permissions |
| KV cache | Stored attention work that speeds generation but uses GPU memory |
| Mixture of experts | A model that routes each token to a few specialist sub-networks |
| Reward hacking | Satisfying the grader without doing the real task |
| RL on verifiable tasks | Rewarding outcomes a program can check, such as passing tests |
| RLHF and RLAIF | Reinforcement learning from human or AI preference judgments |
| Safety framework | A lab’s if-then commitments tied to capability thresholds |
| Scaling laws | The predictable fall in error as compute, data, and model size grow |
| Time horizon | Task length, in expert-human time, an agent finishes at 50% success |
| Transformer | The neural-network design behind every modern language model |

### Sources

- OMB memoranda index (M-25-21, M-25-22, M-26-04, M-26-10)
- EO 14409 FedRAMP AI prioritization GSA OneGov: Anthropic and OpenAI agreements NIST AI RMF · NIST IR 8596 · CAISI AI Agent Standards Initiative OWASP Top 10 for Agentic Applications · CISA and partners, Careful Adoption of Agentic AI Services · Agentic AI Foundation Model releases and prices: public model trackers, as of Nov 20, 2026. Re-check quarterly.

### Frontier and technical sources

- METR Time Horizon 1.1 · International AI Safety Report 2026 · Epoch AI: data centers Anthropic: AI-orchestrated espionage campaign · Project Glasswing update · Mythos Preview system card OpenAI: Hugging Face incident · OpenAI: Path to Astra · Fable and Mythos export controls A2A protocol at one year · ICML 2026 scheming study
