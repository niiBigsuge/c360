"use server"

import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!name || !email || !password) {
    return { error: "Missing required fields" }
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      if (!existingUser.password) {
        // User exists as guest, let's convert them to an authenticated account
        const hashedPassword = await bcrypt.hash(password, 10)
        await prisma.user.update({
          where: { email },
          data: {
            name,
            password: hashedPassword,
          }
        })
        return { success: true }
      }
      return { error: "An account with this email already exists" }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "CUSTOMER"
      }
    })

    return { success: true }
  } catch (error: unknown) {
    console.error("Registration Error:", error)
    return { error: error instanceof Error ? error.message : "Failed to register account" }
  }
}
