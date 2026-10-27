import { useState } from "react"
import {
  ArrowUpRight,
  BookOpen,
  Code2,
  Layers,
  LayoutDashboard,
  MapPin,
  Search,
  SlidersHorizontal,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Traits } from "@/components/demo/traits"
import { FactOfDay } from "@/components/demo/fact-of-day"
import { FactExplorer } from "@/components/demo/fact-explorer"
import { habitats, sightings, stats } from "@/lib/data"

const navigation = [
  { href: "#introduction", label: "Introduction", icon: BookOpen },
  { href: "#overview", label: "Dashboard", icon: LayoutDashboard },
]

export default function App() {
  const [query, setQuery] = useState("")
  const filteredSightings = sightings.filter((sighting) =>
    Object.values(sighting).join(" ").toLowerCase().includes(query.trim().toLowerCase()),
  )

  return (
    <div className="min-h-screen">
      <a
        href="#main"
        className="fixed left-4 top-4 z-50 -translate-y-24 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:translate-y-0"
      >
        Skip to content
      </a>
      <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col border-r bg-card/40 lg:flex">
        <a href="#introduction" className="flex h-24 items-center gap-3 px-7">
          <img src="/capybara.svg" alt="" className="size-10" />
          <span className="text-base font-semibold tracking-tight">
            Capybara Club
            <span className="mt-0.5 block text-xs font-normal tracking-normal text-muted-foreground">
              A very laid-back field guide
            </span>
          </span>
        </a>
        <nav aria-label="Main navigation" className="space-y-1 px-4">
          {navigation.map(({ href, label, icon: Icon }) => (
            <a
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-md px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Icon className="size-4" aria-hidden="true" />
              {label}
            </a>
          ))}
        </nav>
      </aside>

      <div className="lg:pl-60">
        <header className="flex min-h-20 flex-wrap items-center justify-between gap-3 border-b px-5 py-4 sm:px-9 xl:px-12">
          <a href="#introduction" className="flex items-center gap-2 text-sm font-medium lg:hidden">
            <img src="/capybara.svg" className="size-8" alt="" />
            Capybara Club
          </a>
          <p className="hidden text-sm text-muted-foreground lg:block">
            Capybara Club <span className="mx-3 text-border">/</span>
            <span className="text-foreground">Field guide</span>
          </p>
          <div className="flex items-center gap-5">
            <span className="hidden items-center gap-2 text-xs text-muted-foreground sm:inline-flex">
              <span className="size-1.5 rounded-full bg-primary" />A shadcn/ui demo
            </span>
          </div>
        </header>

        <main
          id="main"
          className="mx-auto max-w-[1440px] space-y-10 px-5 py-8 sm:px-9 sm:py-10 xl:px-12"
        >
          <section
            id="introduction"
            aria-labelledby="intro-heading"
            className="space-y-7 border-b pb-9"
          >
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
                  An introduction to shadcn/ui
                </p>
                <h1
                  id="intro-heading"
                  className="text-3xl font-semibold tracking-tight sm:text-4xl"
                >
                  Simple components, without the bloat
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                  Removes the need for heavy component libraries and gives you full control over your UI.
                </p>
              </div>
            </div>
            <p className="text-xs leading-6 text-muted-foreground">
              Start in your existing project. These examples use Vite and React; refer to the{" "}
              <a
                href="https://ui.shadcn.com/docs/installation"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-primary underline underline-offset-4"
              >
                setup guide for your framework
              </a>
              .
            </p>
            <ol className="grid gap-6 sm:grid-cols-3">
              {[
                {
                  icon: Code2,
                  title: "01 / Initialize shadcn/ui",
                  body: "Run once from your project root. Follow the prompts to set up configuration, theme tokens, and dependencies.",
                  example: "npx shadcn@latest init",
                  explanation: "Runs the latest shadcn CLI to initialize your project. It creates components.json, installs dependencies, adds the cn utility, and configures CSS variables for theming.",
                },
                {
                  icon: Layers,
                  title: "02 / Add components",
                  body: "Choose the pieces you need. The CLI adds their source files and installs the required dependencies.",
                  example: "npx shadcn@latest add button",
                },
                {
                  icon: SlidersHorizontal,
                  title: "03 / Use and customize",
                  body: "Import the component into your UI. Adjust its props, Tailwind classes, or local source to make it your own.",
                  example: 'import { Button } from "@/components/ui/button"\n\nexport function Example() {\n  return (\n    <Button variant="outline" className="rounded-full">\n      Get started\n    </Button>\n  )\n}',
                },
              ].map(({ icon: Icon, title, body, example, explanation }) => (
                <li key={title} className="min-w-0 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-md border bg-card">
                      <Icon className="size-4 text-primary" aria-hidden="true" />
                    </div>
                    <h2 className="text-xs font-semibold">{title}</h2>
                  </div>
                  <p className="text-xs leading-6 text-muted-foreground">{body}</p>
                  <pre className="whitespace-pre-wrap break-all rounded-md border bg-muted/50 p-3 text-xs leading-6">
                    <code>{example}</code>
                  </pre>
                  {explanation && (
                    <p className="text-xs leading-6 text-muted-foreground">{explanation}</p>
                  )}
                </li>
              ))}
            </ol>
          </section>

          <section id="overview" aria-labelledby="overview-heading" className="space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  The dashboard
                </p>
                <h2 id="overview-heading" className="text-2xl font-semibold tracking-tight">
                  Capybara Facts
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Big rodents. Small worries. A few things worth knowing.
                </p>
              </div>
              <div className="ml-auto flex gap-4">
                <Traits />
                <FactOfDay />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map(({ label, value, unit, detail, icon: Icon }) => (
                <Card key={label}>
                  <CardHeader className="flex-row items-center justify-between gap-3 pb-4">
                    <CardTitle className="text-xs font-medium leading-5 text-muted-foreground">
                      {label}
                    </CardTitle>
                    <Icon className="size-4 shrink-0 text-primary/80" aria-hidden="true" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-semibold tracking-tight">
                      {value}
                      <span className="ml-2 text-sm font-normal tracking-normal text-muted-foreground">
                        {unit}
                      </span>
                    </p>
                    <p className="mt-3 text-xs leading-5 text-muted-foreground">{detail}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.8fr)_minmax(280px,1fr)]">
            <section id="sightings" aria-labelledby="sightings-heading" className="min-w-0">
              <Card>
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <CardTitle id="sightings-heading">Around the watering hole</CardTitle>
                      <CardDescription className="mt-2">
                        The latest from our imaginary field notebook.
                      </CardDescription>
                    </div>
                    <MapPin className="size-4 text-muted-foreground" aria-hidden="true" />
                  </div>
                  <div className="relative mt-4">
                    <label htmlFor="sighting-search" className="sr-only">
                      Search sightings
                    </label>
                    <Search
                      className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <Input
                      id="sighting-search"
                      type="search"
                      className="pl-9"
                      placeholder="Search capybaras, places, or activities…"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                    />
                  </div>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <Table>
                    <caption className="sr-only">
                      Fictional capybara sightings, most recent first
                    </caption>
                    <TableHeader>
                      <TableRow>
                        <TableHead scope="col">Capybara</TableHead>
                        <TableHead scope="col">Currently</TableHead>
                        <TableHead scope="col" className="text-right">
                          Spotted
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSightings.map((sighting) => (
                        <TableRow key={sighting.name}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <span
                                className="flex size-8 shrink-0 items-center justify-center rounded-full border bg-muted text-[10px] font-medium text-primary"
                                aria-hidden="true"
                              >
                                {sighting.initials}
                              </span>
                              <div>
                                <span className="font-medium">{sighting.name}</span>
                                <span className="mt-1 block whitespace-nowrap text-xs text-muted-foreground">
                                  {sighting.location}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                            {sighting.activity}
                          </TableCell>
                          <TableCell className="text-right font-mono text-xs text-muted-foreground">
                            {sighting.time}
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredSightings.length === 0 && (
                        <TableRow>
                          <TableCell
                            colSpan={3}
                            className="py-12 text-center text-muted-foreground"
                          >
                            No capybaras found. Try “Brazil” or “dip”.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                  <p role="status" className="border-t px-6 py-4 text-xs text-muted-foreground">
                    {filteredSightings.length} of {sightings.length} sightings · Fictional demo data
                  </p>
                </CardContent>
              </Card>
            </section>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Home, sweet wetland.</CardTitle>
                    <WavesIcon />
                  </div>
                  <CardDescription>A good day starts near the water.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {habitats.map(({ name, value }) => (
                    <div key={name} className="space-y-2.5">
                      <div className="flex justify-between text-xs">
                        <span>{name}</span>
                        <span className="font-mono text-muted-foreground">{value}%</span>
                      </div>
                      <Progress aria-label={`${name} share of fictional sightings`} value={value} />
                    </div>
                  ))}
                  <p className="border-t pt-4 text-xs leading-5 text-muted-foreground">
                    Illustrative habitat mix.
                    <br />
                    No capybaras were asked to fill in a survey.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <section id="field-notes" aria-labelledby="notes-heading">
            <Card>
              <CardHeader>
                <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-primary">
                  Get to know the locals
                </p>
                <CardTitle id="notes-heading">Notes from the field</CardTitle>
                <CardDescription>There’s a little more to the laid-back lifestyle.</CardDescription>
              </CardHeader>
              <CardContent>
                <FactExplorer />
              </CardContent>
            </Card>
          </section>

          <footer className="flex flex-wrap items-center justify-between gap-4 border-t pt-6 text-xs text-muted-foreground">
            <p>
              Capybara Club <span className="mx-2 text-border">/</span> Built with
              shadcn/ui
            </p>
            <div className="flex gap-5">
              <a
                className="inline-flex items-center gap-1.5 hover:text-foreground"
                href="https://animals.sandiegozoo.org/animals/capybara"
                target="_blank"
                rel="noreferrer"
              >
                Fact source
                <ArrowUpRight className="size-3" aria-hidden="true" />
              </a>
              <a
                className="inline-flex items-center gap-1.5 hover:text-foreground"
                href="https://ui.shadcn.com/docs"
                target="_blank"
                rel="noreferrer"
              >
                shadcn/ui docs
                <ArrowUpRight className="size-3" aria-hidden="true" />
              </a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  )
}

function WavesIcon() {
  return (
    <span className="text-primary" aria-hidden="true">
      ≈
    </span>
  )
}
