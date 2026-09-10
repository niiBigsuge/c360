"use client"

import { useState } from "react"
import { signIn, getSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { registerUser } from "@/app/actions/register"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function LoginModal() {
  const router = useRouter()
  const [mode, setMode] = useState<"login" | "register">("login")
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (mode === "register") {
      const result = await registerUser(formData)
      if (result.error) {
        setError(result.error)
        setIsLoading(false)
        return
      }
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (!result?.error) {
      const session = await getSession()
      const isAdmin = (session?.user as { role?: string })?.role === "ADMIN"
      
      setOpen(false)
      // reset to login mode for next time it's opened
      setMode("login")
      
      if (isAdmin) {
        router.push("/admin")
      } else {
        router.push("/profile")
      }
      router.refresh()
    } else {
      setIsLoading(false)
      if (mode === "register") {
        setError("Account created, but failed to sign in automatically.")
      } else {
        setError("Invalid email or password")
      }
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="text-sm font-medium hover:underline outline-none">
        Log in
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 border border-border bg-background shadow-xl p-6 rounded-2xl mt-2">
        <h3 className="text-lg font-semibold tracking-tight text-center mb-5">
          {mode === "login" ? "Welcome Back" : "Create an Account"}
        </h3>
        
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          {error && (
            <div className="p-2 bg-red-50 text-red-600 rounded-md text-xs text-center">
              {error}
            </div>
          )}
          
          {mode === "register" && (
            <div className="flex flex-col gap-1.5">
              <input 
                name="name" 
                type="text" 
                placeholder="Full Name" 
                required 
                className="h-10 w-full rounded-lg border border-border bg-black/5 px-4 text-sm text-foreground outline-none transition-all focus:bg-background focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
              />
            </div>
          )}
          
          <div className="flex flex-col gap-1.5">
            <input 
              name="email" 
              type="email" 
              placeholder="Email address" 
              required 
              className="h-10 w-full rounded-lg border border-border bg-black/5 px-4 text-sm text-foreground outline-none transition-all focus:bg-background focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
            />
          </div>
          
          <div className="flex flex-col gap-1.5">
            <input 
              name="password" 
              type="password" 
              placeholder="Password" 
              required 
              minLength={mode === "register" ? 6 : undefined}
              className="h-10 w-full rounded-lg border border-border bg-black/5 px-4 text-sm text-foreground outline-none transition-all focus:bg-background focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
            />
          </div>
          
          <button 
            type="submit"
            disabled={isLoading}
            className="mt-2 h-10 w-full rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all shadow-[rgba(255,255,255,0.2)_0px_0.5px_0px_0px_inset] disabled:opacity-50"
          >
            {isLoading 
              ? (mode === "login" ? "Signing in..." : "Creating account...") 
              : (mode === "login" ? "Log in" : "Sign Up")}
          </button>
        </form>
        
        <div className="mt-5 text-center text-sm text-muted-foreground">
          {mode === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <button 
                type="button"
                onClick={() => {
                  setMode("register");
                  setError(null);
                }}
                className="text-primary font-medium hover:underline outline-none"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button 
                type="button"
                onClick={() => {
                  setMode("login");
                  setError(null);
                }}
                className="text-primary font-medium hover:underline outline-none"
              >
                Log in
              </button>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
