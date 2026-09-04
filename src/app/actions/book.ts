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
    // For MVP, if hairstyle doesn't exist, we mock it. Ideally it exists in DB.
    let hairstyle = await prisma.hairstyle.findUnique({ where: { id: hairstyleId } })
    if (!hairstyle) {
      // Mock data insertion for testing purposes since we haven't seeded DB
      hairstyle = await prisma.hairstyle.create({
        data: {
          id: hairstyleId,
          name: "Mock Hairstyle",
          description: "A beautiful style",
          price: 150.0,
          durationMin: 180,
        }
      })
    }

    // 3. Calculate Transport Fee
    const transportFee = locationType === "AT_HOME" ? hairstyle.price * 0.15 : 0

    // 4. Create Booking
    // Combine date and time (simplistic parsing for MVP)
    const bookingDate = new Date(`${dateStr}T${timeStr}:00Z`)

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

  } catch (error: any) {
    console.error("Booking Error:", error)
    return { error: error.message || "Failed to submit booking" }
  }
}
