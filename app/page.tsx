import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Page() {
  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-6 text-sm leading-loose">
        <div>
          <h1 className="text-2xl font-bold">Welcome!</h1>
          <p className="mt-2">
            Project ready with Better Auth + Convex integration.
          </p>
          <p className="mt-1">You may now add components and start building.</p>
        </div>

        <div className="flex flex-col gap-3">
          <Link href="/sign-in">
            <Button className="w-full">Sign In</Button>
          </Link>
          <Link href="/sign-up">
            <Button variant="outline" className="w-full">
              Sign Up
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost" className="w-full">
              Dashboard
            </Button>
          </Link>
        </div>

        <div className="font-mono text-xs text-muted-foreground">
          (Press <kbd>d</kbd> to toggle dark mode)
        </div>
      </div>
    </div>
  )
}
