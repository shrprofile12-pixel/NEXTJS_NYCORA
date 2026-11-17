// src/actions/admin.ts
"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createBanner(formData: FormData) {
  const heading = formData.get("heading") as string
  const description = formData.get("description") as string
  const imageUrl = formData.get("imageUrl") as string
  const buttonText = formData.get("buttonText") as string
  const buttonLink = formData.get("buttonLink") as string
  const order = parseInt(formData.get("order") as string) || 0

  try {
    await prisma.banner.create({
      data: {
        heading,
        description,
        imageUrl,
        buttonText,
        buttonLink,
        order,
        isActive: true,
      },
    })

    revalidatePath("/")
    revalidatePath("/admin/banners")
    return { success: true, message: "Banner created successfully!" }
  } catch (error) {
    console.error("Error creating banner:", error)
    return { success: false, message: "Failed to create banner." }
  }
}

// 💡 Yeh naya function add kar dein delete ke liye
export async function deleteBanner(id: string) {
  try {
    await prisma.banner.delete({
      where: { id },
    })

    revalidatePath("/")
    revalidatePath("/admin/banners")
    return { success: true, message: "Banner deleted successfully!" }
  } catch (error) {
    console.error("Error deleting banner:", error)
    return { success: false, message: "Failed to delete banner." }
  }
}