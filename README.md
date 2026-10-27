# Capybara Club

A dark, restrained capybara dashboard for a 10–15 minute introduction to shadcn/ui. Built with Vite, React, TypeScript, and Tailwind CSS v4. The dashboard includes an introduction, four fact cards, searchable sightings, habitat progress bars, and field notes.

## Run locally

Requires Node.js 22.12+ and npm. From this directory:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. All fonts, icons, facts, and artwork are local. After installation, the application runs without internet access; footer links are optional external references. `npm install` generates a lockfile; commit it before sharing or presenting, then use `npm ci` for repeatable installs.

```bash
npm run typecheck
npm run build
npm run preview
```

## Presentation checkpoints

All checkpoints contain the same dependencies and local UI component source. Only the three small files in `src/components/demo/` change during the live demo.

| Branch           | Dashboard state                                 | Live edit           |
| ---------------- | ----------------------------------------------- | ------------------- |
| `demo/00-start`  | Complete shell, plain trait text, habitat note  | Starting point      |
| `demo/01-badge`  | Adds styled trait badges                        | `traits.tsx`        |
| `demo/02-dialog` | Adds fact-of-the-day dialog                     | `fact-of-day.tsx`   |
| `demo/03-tabs`   | Adds habitat, diet, and social tabs             | `fact-explorer.tsx` |
| `main`           | Finished dashboard, identical to `demo/03-tabs` | Finished product    |

The branches are cumulative. See [PRESENTER.md](PRESENTER.md) for the script, exact source edits, and recovery commands. Start a rehearsal with a clean working tree:

```bash
git switch demo/00-start
npm run dev
```

Vite reloads when you edit a demo file or change checkpoints. Dependencies do not change between branches. No remote has been configured and nothing has been pushed.

## Source map

- `src/App.tsx`: page layout, navigation, stat cards, searchable sightings, habitat overview.
- `src/components/demo/`: the three live coding targets.
- `src/components/ui/`: local shadcn/ui components, adapted from the Radix-based New York style.
- `src/lib/data.ts`: bundled facts and explicitly fictional dashboard data.
- `src/index.css`: shared dark theme tokens and Tailwind setup.
- `components.json`: shadcn CLI aliases and theme configuration.

The UI source was added manually; the CLI is not a runtime dependency. Components use Radix primitives for Dialog, Tabs, Progress, and Button composition. [shadcn/ui’s introduction](https://ui.shadcn.com/docs) explains source ownership; the [Vite setup guide](https://ui.shadcn.com/docs/installation/vite) documents the integration. Upstream licensing is preserved in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

The capybara facts reference [San Diego Zoo Wildlife Alliance](https://animals.sandiegozoo.org/animals/capybara). Names, sightings, times, and habitat percentages are fictional. The small SVG mark is local artwork created for this demo.

## Browser checks

Install Chromium once while online, then run:

```bash
npx playwright install chromium
npm run test:ui
```

The check starts its own Vite server on port 4174 and verifies search and empty states, trait badges, dialog keyboard focus and closing, tab navigation, mobile sizing, absence of external resource requests, and browser errors. Screenshots go to ignored `test-results/`.

For earlier checkpoints set the expected stage:

```bash
DEMO_STAGE=0 npm run test:ui # demo/00-start
DEMO_STAGE=1 npm run test:ui # demo/01-badge
DEMO_STAGE=2 npm run test:ui # demo/02-dialog
DEMO_STAGE=3 npm run test:ui # demo/03-tabs or main
```

## Creation environment

This repository was created in an environment without npm registry DNS access. The local cache lacked the required Tailwind and Radix packages, so dependency installation, the production build, and browser checks could not be completed there. Run the commands above in a network-enabled environment before presenting. Dependencies are pinned in `package.json`; a lockfile has deliberately not been fabricated.
