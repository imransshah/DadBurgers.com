// Checks the data files before every build. Hard errors fail the build;
// warnings (e.g. a reference to a document not synced yet) are printed and
// also surface on the site's Review page.
//
//   node scripts/validate-data.mjs

import { readData } from "./lib.mjs";

const TIERS = new Set(["must", "feed", "know"]);
const LENSES = new Set(["ops", "manager", "employee"]);
const RELEVANCE = new Set(["high", "medium", "low", "none"]);
const STATUS = new Set(["in-effect", "amended", "revoked", "rescinded", "superseded", "enjoined", "partially-enjoined", "expired", "unknown"]);
const ISO = /^\d{4}-\d{2}-\d{2}$/;

const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

const catalog = readData("catalog");
const analysis = readData("analysis");
const guidance = readData("guidance");
readData("inbox");
readData("meta");
readData("profile");

const ids = new Set();
for (const d of catalog.documents) {
  if (ids.has(d.id)) err(`duplicate document id ${d.id}`);
  ids.add(d.id);
  if (d.signed && !ISO.test(d.signed)) err(`${d.id}: bad signed date ${d.signed}`);
  if (d.kind === "eo" && d.id !== `eo-${d.number}`) err(`${d.id}: id doesn't match EO number ${d.number}`);
}
for (const g of guidance.items) {
  if (ids.has(g.id)) err(`duplicate id ${g.id} (guidance collides with another item)`);
  ids.add(g.id);
  if (g.date && !ISO.test(g.date)) err(`${g.id}: bad date ${g.date}`);
}

const actionIds = new Set();
function checkItem(id, a) {
  if (!RELEVANCE.has(a.relevance)) err(`${id}: bad relevance ${a.relevance}`);
  if (a.status && !STATUS.has(a.status)) err(`${id}: bad status ${a.status}`);
  for (const act of a.actions ?? []) {
    if (actionIds.has(act.id)) err(`duplicate action id ${act.id}`);
    actionIds.add(act.id);
    if (!act.id?.startsWith(`${id}:`)) err(`${act.id}: action id must start with "${id}:"`);
    if (!TIERS.has(act.tier)) err(`${act.id}: bad tier ${act.tier}`);
    if (!LENSES.has(act.lens)) err(`${act.id}: bad lens ${act.lens}`);
    if (act.due && !ISO.test(act.due)) err(`${act.id}: bad due date ${act.due}`);
    if (!act.text?.trim()) err(`${act.id}: empty text`);
  }
  const refs = [
    ...(a.related ?? []),
    ...(a.implements ?? []),
    ...Object.values(a.lineage ?? {}).flat(),
    ...(a.supersedes ?? []),
    ...(a.supersededBy ?? []),
  ];
  for (const r of refs) if (!ids.has(r)) warn(`${id} references ${r}, which isn't in the catalog or guidance yet`);
}

for (const [id, a] of Object.entries(analysis.items)) {
  if (!ids.has(id)) err(`analysis for ${id} has no catalog document`);
  checkItem(id, a);
}
for (const g of guidance.items) checkItem(g.id, g);

for (const w of warnings) console.warn(`warn: ${w}`);
for (const e of errors) console.error(`ERROR: ${e}`);
console.log(`${ids.size} items, ${actionIds.size} actions, ${warnings.length} warnings, ${errors.length} errors`);
if (errors.length) process.exit(1);
