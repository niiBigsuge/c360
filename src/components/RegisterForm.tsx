"use client"

import { useState } from "react"
import { registerUser } from "@/app/actions/register"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function RegisterForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const result = await registerUser(formData)

    if (result.error) {
      setError(result.error)
      setIsLoading(false)
    } else {
      // Auto sign-in after successful registration
      const signInResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })
      if (signInResult?.error) {
        setError("Account created, but failed to sign in automatically.")
        setIsLoading(false)
      } else {
        router.push("/profile")
        router.refresh()
      }
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
        <label className="text-sm font-medium" htmlFor="name">Full Name</label>
        <input 
          id="name"
          name="name" 
          type="text" 
          required 
          className="h-10 rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        />
      </div>
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
          minLength={6}
          className="h-10 rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        />
      </div>
      <button 
        type="submit"
        disabled={isLoading}
        className="mt-2 h-10 inline-flex items-center justify-center rounded-md bg-[#1c1c1c] text-[#fcfbf8] text-sm font-medium transition-colors hover:bg-[#1c1c1c]/90 disabled:opacity-50 shadow-[rgba(255,255,255,0.2)_0px_0.5px_0px_0px_inset,rgba(0,0,0,0.2)_0px_0px_0px_0.5px_inset,rgba(0,0,0,0.05)_0px_1px_2px_0px]"
      >
        {isLoading ? "Creating account..." : "Sign Up"}
      </button>
      <div className="text-center mt-4 text-sm text-muted-foreground">
        Already have an account? <Link href="/login" className="text-foreground hover:underline">Sign in</Link>
      </div>
    </form>
  )
}
