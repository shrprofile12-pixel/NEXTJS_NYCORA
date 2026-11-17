// src/actions/product.ts
"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// Helper function slug banane ke liye (e.g., "Silk Suit" -> "silk-suit")
function generateSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

// 1. Create Product
export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const price = parseFloat(formData.get("price") as string) || 0
  const comparePrice = formData.get("comparePrice") ? parseFloat(formData.get("comparePrice") as string) : null
  const stock = parseInt(formData.get("stock") as string) || 0
  const categoryId = formData.get("categoryId") as string
  const imageUrl = formData.get("imageUrl") as string // Agar single image hai ya ProductImage relation hai
  const isFeatured = formData.get("isFeatured") === "on"
  const isPublished = formData.get("isPublished") === "on"

  // Unique slug generate karein naam se
  let slug = generateSlug(name)
  
  // Check karein ke slug pehle se toh mojood nahi
  const existingProduct = await prisma.product.findUnique({ where: { slug } })
  if (existingProduct) {
    slug = `${slug}-${Date.now()}` // Agar pehle se hai toh sath timestamp laga dein
  }

  try {
    await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price,
        comparePrice,
        stock,
        categoryId,
        isFeatured,
        isPublished,
        // Agar aapki images table alag hai (ProductImage), toh is tarah connect kar sakte hain:
        images: imageUrl ? {
          create: {
            url: imageUrl,
            isMain: true,
          }
        } : undefined,
      },
    })

    revalidatePath("/admin/products")
    revalidatePath("/shop")
    return { success: true, message: "Product created successfully!" }
  } catch (error) {
    console.error("Error creating product:", error)
    return { success: false, message: "Failed to create product." }
  }
}

// 2. Delete Product
export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id },
    })

    revalidatePath("/admin/products")
    revalidatePath("/shop")
    return { success: true, message: "Product deleted successfully!" }
  } catch (error) {
    console.error("Error deleting product:", error)
    return { success: false, message: "Failed to delete product." }
  }
}