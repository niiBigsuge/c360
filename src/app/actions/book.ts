"use server"

import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"

const prisma = new PrismaClient()

export async function submitBooking(formData: FormData) {
  // Extract fields
  const hairstyleId = formData.get("hairstyleId") as string
  const locationType = formData.get("locationType") as "IN_SALON" | "AT_HOME"
  const homeAddress = formData.get("homeAddress") as string
  const dateStr = formData.get("date") as string
  const timeStr = formData.get("time") as string
  const notes = formData.get("notes") as string
  
  const customerName = formData.get("name") as string
  const customerEmail = formData.get("email") as string

  if (!hairstyleId || !locationType || !dateStr || !timeStr || !customerName || !customerEmail) {
    return { error: "Missing required fields" }
  }

  try {
    // 1. Get or Create User (Customer)
    let user = await prisma.user.findUnique({ where: { email: customerEmail } })
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: customerEmail,
          name: customerName,
          role: "CUSTOMER"
        }
      })
    }

    // 2. Fetch Hairstyle for pricing logic
    const hairstyle = await prisma.hairstyle.findUnique({ where: { id: hairstyleId } })
    if (!hairstyle) {
      return { error: "Invalid hairstyle selected" }
    }

    // 3. Calculate Transport Fee
    const transportFee = locationType === "AT_HOME" ? hairstyle.price * 0.15 : 0

    // 4. Validate Date, Time & Capacity
    const bookingDate = new Date(`${dateStr}T${timeStr}:00Z`)
    const hour = parseInt(timeStr.split(":")[0], 10)

    // Enforce Operating Hours (9 AM to 5 PM)
    if (hour < 9 || hour >= 17) {
      return { error: "Please select a time within our operating hours (9:00 AM - 5:00 PM)." }
    }

    // Ensure booking is not in the past
    if (bookingDate < new Date()) {
      return { error: "Cannot book an appointment in the past." }
    }

    // Capacity Check: Max 3 active bookings per time slot
    const existingBookings = await prisma.booking.count({
      where: {
        date: bookingDate,
        status: { notIn: ["CANCELLED", "NO_SHOW"] }
      }
    })

    if (existingBookings >= 3) {
      return { error: "This time slot is fully booked. Please select a different time." }
    }

    // 5. Create Booking

    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        hairstyleId: hairstyle.id,
        locationType,
        homeAddress: locationType === "AT_HOME" ? homeAddress : null,
        transportFee,
        date: bookingDate,
        notes,
        status: "PENDING"
      }
    })

    // TODO: Send Email Notification via Resend (Mocked for now)
    console.log(`[Email Mock] Booking Confirmation sent to ${customerEmail} for Booking ID ${booking.id}`)

    revalidatePath("/")
    return { success: true, bookingId: booking.id }

  } catch (error: unknown) {
    console.error("Booking Error:", error)
    return { error: error instanceof Error ? error.message : "Failed to submit booking" }
  }
}
export async function cancelBooking(id: string) {
  try {
    const booking = await prisma.booking.findUnique({ where: { id } })
    if (!booking) return { error: "Booking not found" }

    if (booking.status !== "PENDING") {
      return { error: "Only pending bookings can be cancelled" }
    }

    const fifteenMins = 15 * 60 * 1000
    if (Date.now() - booking.createdAt.getTime() > fifteenMins) {
      return { error: "Cancellations are only allowed within the first 15 minutes of booking." }
    }

    await prisma.booking.update({
      where: { id },
      data: { status: "CANCELLED" }
    })

    revalidatePath("/profile")
    revalidatePath("/admin")
    return { success: true }
  } catch (error: unknown) {
    console.error("Cancellation Error:", error)
    return { error: error instanceof Error ? error.message : "Failed to cancel booking" }
  }
}
