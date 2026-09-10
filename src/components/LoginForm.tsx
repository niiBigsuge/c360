"use client"

import { useState } from "react"
import { signIn, getSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid email or password")
      setIsLoading(false)
    } else {
      const session = await getSession()
      const isAdmin = (session?.user as { role?: string })?.role === "ADMIN"
      
      if (isAdmin) {
        router.push("/admin")
      } else {
        router.push(callbackUrl || "/profile")
      }
      router.refresh()
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm">
          {error}
        </div>
      )}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium" htmlFor="email">Email</label>
        <input 
          id="email"
          name="email" 
          type="email" 
          required 
          className="h-10 rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium" htmlFor="password">Password</label>
        <input 
          id="password"
          name="password" 
          type="password" 
          required 
          className="h-10 rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        />
      </div>
      <button 
        type="submit"
        disabled={isLoading}
        className="mt-2 h-10 inline-flex items-center justify-center rounded-md bg-[#1c1c1c] text-[#fcfbf8] text-sm font-medium transition-colors hover:bg-[#1c1c1c]/90 disabled:opacity-50 shadow-[rgba(255,255,255,0.2)_0px_0.5px_0px_0px_inset,rgba(0,0,0,0.2)_0px_0px_0px_0.5px_inset,rgba(0,0,0,0.05)_0px_1px_2px_0px]"
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </button>
      <div className="text-center mt-4 text-sm text-muted-foreground">
        Don&apos;t have an account? <Link href="/register" className="text-foreground hover:underline">Sign up</Link>
      </div>
    </form>
  )
}
