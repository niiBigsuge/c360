"use server"

import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"

const prisma = new PrismaClient()

// --- HAIRSTYLES ---

export async function getHairstyles() {
  try {
    return await prisma.hairstyle.findMany({
      orderBy: { createdAt: "desc" }
    })
  } catch (error) {
    console.error("Failed to fetch hairstyles:", error)
    return []
  }
}

export async function createHairstyle(formData: FormData) {
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const price = parseFloat(formData.get("price") as string)
  const durationMin = parseInt(formData.get("durationMin") as string, 10)
  const imageFile = formData.get("image") as File | null

  if (!name || isNaN(price) || isNaN(durationMin)) {
    return { error: "Missing required fields or invalid format" }
  }

  try {
    let imageUrl: string | undefined = undefined

    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      
      const uploadDir = join(process.cwd(), "public/uploads")
      await mkdir(uploadDir, { recursive: true })
      
      const fileName = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, "")}`
      const filePath = join(uploadDir, fileName)
      
      await writeFile(filePath, buffer)
      imageUrl = `/uploads/${fileName}`
    }

    const hairstyle = await prisma.hairstyle.create({
      data: {
        name,
        description: description || "",
        price,
        durationMin,
        imageUrl,
      }
    })
    revalidatePath("/")
    revalidatePath("/book")
    revalidatePath("/admin/hairstyles")
    return { success: true, hairstyle }
  } catch (error: unknown) {
    console.error("Failed to create hairstyle:", error)
    return { error: error instanceof Error ? error.message : "Failed to create hairstyle" }
  }
}

export async function deleteHairstyle(id: string) {
  try {
    await prisma.hairstyle.delete({ where: { id } })
    revalidatePath("/")
    revalidatePath("/book")
    revalidatePath("/admin/hairstyles")
    return { success: true }
  } catch (error: unknown) {
    console.error("Failed to delete hairstyle:", error)
    return { error: error instanceof Error ? error.message : "Failed to update hairstyle" }
  }
}

// --- BOOKINGS ---

export async function getBookings() {
  try {
    return await prisma.booking.findMany({
      include: {
        user: true,
        hairstyle: true
      },
      orderBy: { createdAt: "desc" }
    })
  } catch (error) {
    console.error("Failed to fetch bookings:", error)
    return []
  }
}

export async function updateBookingStatus(id: string, status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED") {
  try {
    await prisma.booking.update({
      where: { id },
      data: { status }
    })
    revalidatePath("/admin")
    return { success: true }
  } catch (error: unknown) {
    console.error("Failed to update booking status:", error)
    return { error: error instanceof Error ? error.message : "Failed to update booking status" }
  }
}

export async function getStylists() {
  try {
    return await prisma.user.findMany({
      where: { role: "STYLIST" },
      select: { id: true, name: true, email: true }
    })
  } catch (error) {
    console.error("Failed to fetch stylists:", error)
    return []
  }
}

export async function assignStylist(bookingId: string, stylistId: string) {
  try {
    await prisma.booking.update({
      where: { id: bookingId },
      data: { stylistId }
    })
    revalidatePath("/admin")
    return { success: true }
  } catch (error: unknown) {
    console.error("Failed to assign stylist:", error)
    return { error: error instanceof Error ? error.message : "Failed to assign stylist" }
  }
}
