// app/product/[id]/page.tsx
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import EditProductForm from "@/components/admin/EditProductForm"
import { ArrowLeft, Edit, Layers, CheckCircle, AlertCircle } from "lucide-react"

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const productId = resolvedParams.id;

  // Product aur Categories dono ek saath fetch karein
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id: productId },
      include: {
        category: true,
        images: true,
        variants: true,
      },
    }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
    }),
  ]);

  if (!product) {
    notFound()
  }

  const mainImage = product.images[0]?.url || "/Bag.png"
  const isPublished = product.stock > 0 && product.isPublished

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      {/* Top Navigation & Actions */}
      <div className="flex items-center justify-between">
        <Button variant="outline" asChild className="cursor-pointer">
          <Link href="/admin/products" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Products
          </Link>
        </Button>

        {/* Scroll to Edit Form below */}
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer" asChild>
          <a href="#edit-product-section" className="flex items-center gap-2">
            <Edit className="h-4 w-4" /> Edit Product
          </a>
        </Button>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-card text-card-foreground p-8 rounded-2xl border border-border shadow-xs">
        {/* Left Side: Product Image */}
        <div className="relative aspect-square rounded-xl bg-muted overflow-hidden border border-border">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Side: Product Info */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Category & Status Badge */}
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-muted px-3 py-1 rounded-full">
                <Layers className="h-3.5 w-3.5" /> {product.category?.name || "Uncategorized"}
              </span>

              <Badge
                variant="outline"
                className={`px-3 py-1 rounded-full text-xs font-medium border-0 ${
                  isPublished
                    ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400"
                    : "bg-rose-50 text-rose-500 dark:bg-rose-950/60 dark:text-rose-400"
                }`}
              >
                {isPublished ? <CheckCircle className="h-3 w-3 inline mr-1" /> : <AlertCircle className="h-3 w-3 inline mr-1" />}
                {isPublished ? "Published" : "Out of Stock / Draft"}
              </Badge>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl font-bold text-foreground">{product.name}</h1>

            {/* Pricing */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-foreground">
                Rs. {product.price.toLocaleString()}
              </span>
              {product.comparePrice && (
                <span className="text-lg text-muted-foreground/70 line-through">
                  Rs. {product.comparePrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-foreground/80">Description</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {product.description || "No description provided for this product."}
              </p>
            </div>
          </div>

          {/* Stock, Rating & ID Meta */}
          <div className="border border-border pt-4 grid grid-cols-2 gap-4 text-sm text-muted-foreground bg-muted/50 p-4 rounded-xl">
            <div>
              <p className="text-xs text-muted-foreground">Stock Available</p>
              <p className="font-semibold text-foreground">{product.stock} units</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Rating</p>
              <p className="font-semibold text-foreground">⭐ {product.rating ?? 0} ({product.reviewCount ?? 0} reviews)</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-muted-foreground">Product ID / Slug</p>
              <p className="font-mono text-xs text-foreground/80">{product.id} ({product.slug})</p>
            </div>
          </div>
        </div>
      </div>

      {/* Attached Edit Product Form Section */}
      <div id="edit-product-section" className="pt-4 border-t border-border">
        <EditProductForm
          product={{
            ...product,
            description: product.description ?? "",
            categoryId: product.categoryId ?? "",
          }}
          categories={categories}
        />
      </div>
    </div>
  )
}