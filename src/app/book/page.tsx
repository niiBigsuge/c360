import { BookingForm } from "@/components/BookingForm"
import { getHairstyles } from "@/app/actions/admin"
import { auth } from "@/auth"
import Link from "next/link"

export default async function BookPage() {
  const hairstyles = await getHairstyles()
  const session = await auth()

  return (
    <div className="min-h-screen bg-background py-24 px-4">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-semibold tracking-tight mb-4">Book Your Appointment</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Choose your style, select a date, and let us know if you want the salon experience or home service.
          </p>
        </div>
        
        {!session && (
          <div className="max-w-xl mx-auto mb-8 bg-[#eceae4]/30 border border-[#eceae4] rounded-lg p-4 text-sm text-center">
            Already a customer? <Link href="/login?callbackUrl=/book" className="font-semibold hover:underline text-[#1c1c1c]">Sign in</Link> to book faster, or continue as a guest below.
          </div>
        )}

        <BookingForm hairstyles={hairstyles} user={session?.user} />
      </div>
    </div>
  )
}
