# Capybara Club presenter guide

Aim for 12 minutes, leaving a little room for questions. Keep the browser and editor side by side. Use the same dependency installation for every branch.

## Before the talk

1. Install Node.js 22.12+ and run `npm install` while online. Commit the resulting lockfile before preparing a shared checkout; keep that same lockfile on all demo checkpoints if you update them.
2. Run `npm run build`. Install the browser with `npx playwright install chromium`, then run `npm run test:ui` on `main`.
3. Confirm `git status --short` is clean. Switch to `demo/00-start`, then run `npm run dev`.
4. Open the printed localhost URL, choose a readable browser zoom, and open the three files in `src/components/demo/`.
5. Rehearse once with Wi-Fi disabled. The only outbound links are optional source and documentation references in the footer.

All component files and dependencies are already installed on the starting branch. There is no CLI download during the talk.

## 0:00–2:00 — What are we looking at?

Use the introduction at the top of the page.

- shadcn/ui distributes component source into your project. Point to `src/components/ui/button.tsx`; its appearance and API are yours to change.
- Accessible primitives supply behavior. Our Dialog and Tabs use Radix; you still need meaningful labels, readable contrast, and application-level checks.
- Tailwind provides local styling. Shared CSS variables in `src/index.css` provide the charcoal and amber theme.

Installation context, for explanation only:

```bash
# Typical setup in a new, configured Vite + Tailwind project:
npx shadcn@latest init
npx shadcn@latest add button card input table progress badge dialog tabs
```

Do not run those commands over this prepared repository during the talk. This repository includes manually adapted components and a working `components.json`; the CLI may generate newer source and offer to overwrite those files. Reference: [Vite installation](https://ui.shadcn.com/docs/installation/vite).

## 2:00–3:00 — Meet the starting dashboard

Scroll through the four fact cards, sightings table, and habitat overview. Search for “Brazil”, then clear the search. Point out that Card, Input, Table, and Progress are already local components. The observations are fictional; the natural-history facts have a source link.

The live additions will replace plain trait text, add a fact dialog, and expand a single habitat note into three tabbed topics.

## 3:00–5:00 — Badge: own the appearance

Replace `src/components/demo/traits.tsx` with:

```tsx
import { Badge } from "@/components/ui/badge"
import { traits } from "@/lib/data"

export function Traits() {
  return (
    <div className="flex flex-wrap gap-2" aria-label="Capybara traits">
      {traits.map((trait) => (
        <Badge
          key={trait}
          data-demo-trait
          variant="outline"
          className="rounded-full border-primary/25 bg-primary/5 px-3 py-1 font-normal text-primary"
        >
          {trait}
        </Badge>
      ))}
    </div>
  )
}
```

First show `variant="outline"` without `className`, then add the customization. Explain that the component supplies defaults and `cn()` merges the caller’s Tailwind classes. Change `rounded-full` to `rounded-md` and back to make ownership visible.

Checkpoint: `demo/01-badge`.

## 5:00–8:00 — Dialog: compose the interaction

Replace `src/components/demo/fact-of-day.tsx` with:

```tsx
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { dailyFact } from "@/lib/data"

export function FactOfDay() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Sparkles aria-hidden="true" />
          Fact of the day
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl border-primary/20 p-8">
        <DialogHeader className="gap-4 text-left">
          <p className="text-xs uppercase tracking-widest text-primary">
            A moment of capybara wisdom
          </p>
          <DialogTitle className="pr-5 text-2xl leading-tight">{dailyFact.title}</DialogTitle>
          <DialogDescription className="text-base leading-8">{dailyFact.body}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button className="rounded-full px-6">Stay curious</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
```

Explain `asChild`: the trigger uses the existing Button rather than wrapping a button inside another button. Open it, use Tab, and close it with Escape. Focus returns to the trigger. The title and description give the dialog an accessible name and description.

Show the wider `max-w-xl`, softer border, and button radius. The behavior lives in the primitive; composition and styling live in the project. The “Fact of the day” is deliberately fixed so the presentation is repeatable.

Checkpoint: `demo/02-dialog`.

## 8:00–11:00 — Tabs: expose more content

Replace `src/components/demo/fact-explorer.tsx` with:

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fieldNotes } from "@/lib/data"

export function FactExplorer() {
  return (
    <Tabs defaultValue="habitat">
      <TabsList
        aria-label="Capybara field notes"
        className="h-auto gap-4 rounded-none border-b bg-transparent p-0"
      >
        {fieldNotes.map((note) => (
          <TabsTrigger
            key={note.id}
            value={note.id}
            className="rounded-none border-b-2 border-transparent px-1 pb-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none"
          >
            {note.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {fieldNotes.map((note) => (
        <TabsContent key={note.id} value={note.id} className="min-h-52 space-y-4 pt-6">
          <note.icon className="size-6 text-primary" aria-hidden="true" />
          <p className="text-xs font-medium uppercase tracking-widest text-primary">
            {note.eyebrow}
          </p>
          <h4 className="text-xl font-medium tracking-tight">{note.title}</h4>
          <p className="max-w-xl text-sm leading-7 text-muted-foreground">{note.body}</p>
        </TabsContent>
      ))}
    </Tabs>
  )
}
```

`value` links each trigger to its panel. `defaultValue` sets initial state without application state plumbing. Show Diet and Social, then use left/right arrows while a tab is focused. The amber underline comes from `data-[state=active]` utilities; no custom event handler is needed.

Checkpoint: `demo/03-tabs`. `main` has the same finished source.

## 11:00–12:00 — Wrap up

Return to the three points at the top: own the source, compose the pieces, find your style. You added labels, a keyboard-friendly modal, and tabbed content using local components. Show the documentation link for further exploration.

## Recover during the talk

If live edits are unfinished, save them before switching to a checkpoint:

```bash
git stash push -m "saved live demo edits" -- src/components/demo
git switch demo/01-badge
# Or: git switch demo/02-dialog
# Or: git switch demo/03-tabs
```

The stash command preserves edits to the three demo files. If there were no edits, it reports that there is nothing to save. Leave unrelated files alone. Vite reloads the changed code; there is no dependency reinstall.

For a rehearsal, create a disposable branch so checkpoint names remain fixed:

```bash
git switch -c rehearsal demo/00-start
```

After the talk, use `git switch main` to return to the finished version. Keep saved edits in the stash until you decide whether to reuse them. All Git work is local; configure and push a remote yourself when ready.
