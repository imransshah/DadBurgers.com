// Deploy-time switch for the weekly digest email. Adds the send_email binding
// to wrangler.json only when EO_DIGEST_ENABLED is true, because the binding
// needs Cloudflare Email Routing turned on for therealdadburgers.com first.
// Run by .github/workflows/eo.yml; not meant to be committed back.
import { readFileSync, writeFileSync } from "node:fs";

const path = new URL("../wrangler.json", import.meta.url);
const cfg = JSON.parse(readFileSync(path, "utf8"));
cfg.send_email = [{ name: "DIGEST_EMAIL" }];
writeFileSync(path, JSON.stringify(cfg, null, 2) + "\n");
console.log("send_email binding DIGEST_EMAIL added to wrangler.json");
