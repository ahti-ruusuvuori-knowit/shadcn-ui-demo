import { fieldNotes } from "@/lib/data"

// Live demo 3: make all three field notes available with Tabs.
export function FactExplorer() {
  const note = fieldNotes[0]
  return (
    <div className="min-h-52 space-y-4 pt-2">
      <note.icon className="size-6 text-primary" aria-hidden="true" />
      <p className="text-xs font-medium uppercase tracking-widest text-primary">{note.eyebrow}</p>
      <h4 className="text-xl font-medium tracking-tight">{note.title}</h4>
      <p className="max-w-xl text-sm leading-7 text-muted-foreground">{note.body}</p>
    </div>
  )
}
