# therealdadburgers.com

One repository, several sites, each served from its own subdomain by
Cloudflare.

| Site | Folder | Address | What it is |
| --- | --- | --- | --- |
| Decolonized History | [`sites/decolonized`](sites/decolonized) | `decolonized.therealdadburgers.com` | World-history explorer for kids |
| Order of Operations | [`sites/eo`](sites/eo) | `eo.therealdadburgers.com` (password) | Executive orders and implementing guidance, read for a federal IT Operations Director |

## How hosting works

Each site is a Vite build served by a Cloudflare Worker with static assets.
Each site has its own GitHub Actions workflow that builds it and runs
`wrangler deploy` from that site's folder:

- `.github/workflows/eo.yml`: nightly data sync + build + deploy for Order of Operations
- `.github/workflows/decolonized-cloudflare.yml`: build + deploy for Decolonized

(There used to be a GitHub Pages workflow for Decolonized. Pages was never
enabled on this repo, so every run failed. It's gone.)

Deploys need two repository secrets, shared by every site:

| Secret | Where it comes from |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | Cloudflare dashboard → My Profile → API Tokens → *Edit Cloudflare Workers* template, scoped to this account and the `therealdadburgers.com` zone |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare dashboard → Workers & Pages → right-hand sidebar |

Without them the workflows still build and validate; they just skip the deploy step.

## Adding another site

1. `sites/<name>/` with its own `package.json`, build, and `wrangler.json`
   (copy `sites/decolonized/wrangler.json` for a plain static site).
2. Add `"routes": [{ "pattern": "<name>.therealdadburgers.com", "custom_domain": true }]`;
   Cloudflare creates the DNS record on first deploy.
3. Copy `decolonized-cloudflare.yml`, change the paths and name.
