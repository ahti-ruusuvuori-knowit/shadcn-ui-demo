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
