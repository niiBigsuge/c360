import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { PrismaClient } from "@prisma/client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CancelButton } from "@/components/CancelButton"
import { LogOut, Home, CalendarPlus } from "lucide-react"

const prisma = new PrismaClient()

export default async function ProfilePage() {
  const session = await auth()

  if (!session || !session.user?.email) {
    redirect("/login?callbackUrl=/profile")
  }

  // Fetch the user and their bookings
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      bookings: {
        include: {
          hairstyle: true
        },
        orderBy: {
          date: "desc"
        }
      }
    }
  })

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl min-h-screen">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your account and view past bookings.</p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost"><Home className="w-4 h-4 mr-2"/> Back to Homepage</Button>
          </Link>
          <Link href="/api/auth/signout">
            <Button variant="outline"><LogOut className="w-4 h-4 mr-2"/> Sign Out</Button>
          </Link>
          <Link href="/book">
            <Button><CalendarPlus className="w-4 h-4 mr-2"/> Book Appointment</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Name</label>
                <p className="font-medium">{user.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Account Type</label>
                <p className="font-medium">{user.role}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bookings History */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Bookings</CardTitle>
              <CardDescription>Your upcoming and past appointments.</CardDescription>
            </CardHeader>
            <CardContent>
              {user.bookings.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-border rounded-lg bg-black/5">
                  <p className="text-muted-foreground mb-4">You haven&apos;t booked any appointments yet.</p>
                  <Link href="/book">
                    <Button variant="outline">Book Now</Button>
                  </Link>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {user.bookings.map((booking) => {
                      const total = (booking.hairstyle?.price || 0) + booking.transportFee
                      return (
                        <TableRow key={booking.id}>
                          <TableCell className="font-medium whitespace-nowrap">
                            {new Date(booking.date).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                            <br />
                            <span className="text-xs text-muted-foreground">
                              {new Date(booking.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </TableCell>
                          <TableCell>{booking.hairstyle?.name}</TableCell>
                          <TableCell>
                            {booking.locationType === "AT_HOME" ? "Home Service" : "In-Salon"}
                          </TableCell>
                          <TableCell>${total.toFixed(2)}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              booking.status === "PENDING" ? "bg-yellow-100 text-yellow-800" :
                              booking.status === "CONFIRMED" ? "bg-green-100 text-green-800" :
                              booking.status === "COMPLETED" ? "bg-gray-100 text-gray-800" :
                              "bg-red-100 text-red-800"
                            }`}>
                              {booking.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            {booking.status === "PENDING" && (Date.now() - new Date(booking.createdAt).getTime() <= 15 * 60 * 1000) && (
                              <CancelButton bookingId={booking.id} />
                            )}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
