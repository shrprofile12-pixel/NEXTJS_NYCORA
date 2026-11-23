// src/lib/adminserverAction/product.ts
"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

// Helper function slug banane ke liye
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
  const imageUrl = formData.get("imageUrl") as string
  const isFeatured = formData.get("isFeatured") === "on"
  const isPublished = formData.get("isPublished") === "on"

  let slug = generateSlug(name)
  
  const existingProduct = await prisma.product.findUnique({ where: { slug } })
  if (existingProduct) {
    slug = `${slug}-${Date.now()}`
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
        images: imageUrl ? {
          create: {
            url: imageUrl,
            position: 0,
          }
        } : undefined,
      },
    })

    revalidatePath("/product")
    revalidatePath("/shop")
    return { success: true, message: "Product created successfully!" }
  } catch (error: any) {
    console.error("Error creating product:", error)
    return { success: false, message: "Failed to create product." }
  }
}

// 2. Update Product
export async function updateProduct(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const price = parseFloat(formData.get("price") as string) || 0
    const comparePrice = formData.get("comparePrice") ? parseFloat(formData.get("comparePrice") as string) : null
    const stock = parseInt(formData.get("stock") as string) || 0
    const categoryId = formData.get("categoryId") as string
    const imageUrl = formData.get("imageUrl") as string
    const isFeatured = formData.get("isFeatured") === "on"
    const isPublished = formData.get("isPublished") === "on"

    let slug = generateSlug(name)
    
    const existingProduct = await prisma.product.findFirst({
      where: { 
        slug,
        NOT: { id } 
      }
    })
    if (existingProduct) {
      slug = `${slug}-${Date.now()}`
    }

    await prisma.product.update({
      where: { id },
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
        images: imageUrl ? {
          deleteMany: {},
          create: {
            url: imageUrl,
            position: 0,
          }
        } : undefined,
      },
    })

    revalidatePath("/product")
    revalidatePath("/shop")
    return { success: true, message: "Product updated successfully!" }
  } catch (error: any) {
    console.error("EXACT UPDATE ERROR:", error.message || error)
    return { success: false, message: `Failed to update product: ${error.message}` }
  }
}

// 3. Delete Product
export async function deleteProduct(id: string) {
  try {
    await prisma.productImage.deleteMany({ where: { productId: id } }).catch(() => {})
    await prisma.productVariant.deleteMany({ where: { productId: id } }).catch(() => {})
    
    await prisma.product.delete({
      where: { id },
    })

    revalidatePath("/product")
    revalidatePath("/shop")
  } catch (error: any) {
    console.error("Error deleting product:", error)
    return { success: false, message: `Failed to delete product: ${error.message}` }
  }

  // Delete successful hone ke baad user ko products list par redirect kar dein
  redirect("/product")
}