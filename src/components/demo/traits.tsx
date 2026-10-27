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
