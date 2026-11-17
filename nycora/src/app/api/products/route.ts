import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 1. GET: Saare products fetch karne ke liye
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        images: true,
        variants: true,
      },
    })

    return NextResponse.json({ success: true, data: products }, { status: 200 })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json(
      { success: false, message: "Failed to fetch products" },
      { status: 500 }
    )
  }
}

// 2. POST: Naya product database mein add karne ke liye
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, slug, description, price, categoryId, stock, isFeatured, images } = body

    // Naya product create karein
    const newProduct = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price,
        categoryId,
        stock: stock || 0,
        isFeatured: isFeatured || false,
        images: {
          create: images?.map((img: { url: string; alt?: string }) => ({
            url: img.url,
            alt: img.alt,
          })) || [],
        },
      },
      include: {
        images: true,
        category: true,
      },
    })

    return NextResponse.json({ success: true, data: newProduct }, { status: 201 })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json(
      { success: false, message: "Failed to add product" },
      { status: 500 }
    )
  }
}

// 3. DELETE: Kisi product ko ID ke zariye database se remove karne ke liye
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Product ID is required" },
        { status: 400 }
      )
    }

    // Database se product delete karein
    await prisma.product.delete({
      where: { id },
    })

    return NextResponse.json(
      { success: true, message: "Product deleted successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json(
      { success: false, message: "Failed to delete product" },
      { status: 500 }
    )
  }
}