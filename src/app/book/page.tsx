import { BookingForm } from "@/components/BookingForm"

export default function BookPage() {
  return (
    <div className="min-h-screen bg-background py-24 px-4">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-semibold tracking-tight mb-4">Book Your Appointment</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Choose your style, select a date, and let us know if you want the salon experience or home service.
          </p>
        </div>
        <BookingForm />
      </div>
    </div>
  )
}
