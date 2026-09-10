import Link from "next/link"
import { auth } from "@/auth"
import { LoginModal } from "@/components/LoginModal"

export async function Header() {
  const session = await auth()

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-xl tracking-tight shrink-0">TheCrown360</Link>
        <nav className="hidden lg:flex flex-1 justify-center gap-8 text-sm">
          <Link href="/services" className="text-foreground hover:text-primary font-medium transition-colors">Services & Pricing</Link>
          <Link href="/#team" className="text-foreground hover:text-primary font-medium transition-colors">Our Team / Stylists</Link>
          <Link href="/#about" className="text-foreground hover:text-primary font-medium transition-colors">About Us</Link>
          <Link href="/#contact" className="text-foreground hover:text-primary font-medium transition-colors">Contact & Location</Link>
          <Link href="/#gallery" className="text-foreground hover:text-primary font-medium transition-colors">Gallery / Portfolio</Link>
        </nav>
        <div className="flex items-center gap-4 shrink-0">
          {session ? (
            <>
              <Link href="/profile" className="text-sm font-medium hover:underline">Profile</Link>
              {(session.user as { role?: string })?.role === "ADMIN" && (
                <Link href="/admin" className="text-sm font-medium hover:underline">Admin</Link>
              )}
              <Link href="/api/auth/signout" className="text-sm font-medium hover:underline">Sign Out</Link>
            </>
          ) : (
            <>
              <LoginModal />
            </>
          )}
        </div>
      </div>
    </header>
  )
}
