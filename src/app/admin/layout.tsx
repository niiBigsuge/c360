import Link from "next/link"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  
  // Strict check: User must be logged in and have the ADMIN role
  const role = (session?.user as { role?: string })?.role
  if (!session || role !== "ADMIN") {
    redirect("/login?callbackUrl=/admin")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/admin" className="font-heading font-semibold text-lg tracking-tight">
            TheCrown360 Admin
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link href="/admin" className="text-muted-foreground hover:text-foreground">Bookings</Link>
            <Link href="/admin/hairstyles" className="text-muted-foreground hover:text-foreground">Hairstyles</Link>
            <div className="flex items-center ml-4 border-l border-border pl-6 gap-4">
              <Link href="/" className="text-primary hover:underline">Back to Homepage</Link>
              <Link href="/api/auth/signout" className="text-muted-foreground hover:text-foreground">Sign Out</Link>
            </div>
          </nav>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
