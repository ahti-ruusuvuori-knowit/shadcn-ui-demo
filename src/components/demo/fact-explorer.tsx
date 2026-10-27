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
