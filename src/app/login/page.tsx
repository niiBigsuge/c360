import { LoginForm } from "@/components/LoginForm"
import { Suspense } from "react"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background py-24 px-4 flex flex-col items-center justify-center">
      <div className="max-w-md w-full">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">
            Sign in to manage your appointments and book faster.
          </p>
        </div>
        <div className="bg-card rounded-[12px] border border-border p-6 shadow-sm">
          <Suspense fallback={<div className="h-40 flex items-center justify-center text-sm text-muted-foreground">Loading...</div>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
