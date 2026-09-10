import { getBookings, updateBookingStatus, getStylists } from "@/app/actions/admin"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

import { AssignStylistForm } from "@/components/AssignStylistForm"

// Define a type for the booking with relations to avoid implicit any
type BookingWithRelations = {
  id: string
  date: Date
  locationType: string
  homeAddress: string | null
  transportFee: number
  status: string
  stylistId: string | null
  hairstyle: { name: string; price: number } | null
  user: { name: string | null; email: string | null }
}

export default async function AdminBookingsPage() {
  const bookings = await getBookings() as unknown as BookingWithRelations[]
  const stylists = await getStylists()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">Bookings</h2>
        <p className="text-muted-foreground">Manage your incoming salon and home service appointments.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
          <CardDescription>A list of all bookings in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          {bookings.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">No bookings found.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Stylist</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => {
                  const total = (booking.hairstyle?.price || 0) + booking.transportFee
                  return (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">
                        {new Date(booking.date).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                      </TableCell>
                      <TableCell>
                        {booking.user.name}<br/>
                        <span className="text-xs text-muted-foreground">{booking.user.email}</span>
                      </TableCell>
                      <TableCell>{booking.hairstyle?.name || 'Unknown'}</TableCell>
                      <TableCell>
                        {booking.locationType === "AT_HOME" ? (
                          <span className="text-primary font-medium">Home Service<br/>
                          <span className="text-xs text-muted-foreground font-normal">{booking.homeAddress}</span>
                          </span>
                        ) : "In-Salon"}
                      </TableCell>
                      <TableCell>${total.toFixed(2)}</TableCell>
                      <TableCell>
                        <AssignStylistForm 
                          bookingId={booking.id} 
                          stylists={stylists} 
                          currentStylistId={booking.stylistId} 
                        />
                      </TableCell>
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
                        <form action={async () => {
                          "use server"
                          await updateBookingStatus(booking.id, "CONFIRMED")
                        }}>
                          <Button type="submit" variant="outline" size="sm" disabled={booking.status !== "PENDING"}>
                            Confirm
                          </Button>
                        </form>
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
  )
}
