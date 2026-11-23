import Image from "next/image"
import { prisma } from "@/lib/prisma" // Apne prisma client instance ka sahi path check kar lein (e.g., @/lib/db ya @/prisma)
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import Link from "next/link"

export default async function ProductPage() {
  // 1. Database se products, unki category aur pehli image fetch karein
  const products = await prisma.product.findMany({
    include: {
      category: true,
      images: {
        orderBy: { position: "asc" },
        take: 1,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="w-full bg-white rounded-xl p-6 border shadow-sm">
        {/* Table Header Title & Add Button */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            <h2 className="font-semibold text-lg text-gray-900">
              All Products ({products.length})
            </h2>
          </div>

          <Button asChild size="sm" className="gap-1">
            <Link href="/product/new">
              <Plus className="h-4 w-4" /> Add Product
            </Link>
          </Button>
        </div>

        {/* Shadcn Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50">
                <TableHead className="w-[300px]">Product name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                    No products found in database. Run your seed script or add a product!
                  </TableCell>
                </TableRow>
              ) : (
                products.map((item) => {
                  // Image fallback agar database mein image na ho
                  const imageUrl = item.images[0]?.url || "/Bag.png"

                  // Status logic based on stock
                  const status =
                    item.stock > 0
                      ? "Published"
                      : "Out of Stock"

                  // Date formatting (e.g., 18 Nov 2026)
                  const formattedDate = new Date(item.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })

                  return (
                    <TableRow key={item.id}>
                      {/* Product Name, Image & Review/Stock Count */}
                      <TableCell className="flex items-center gap-3 font-medium">
                        <div className="w-11 h-11 relative rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border">
                          <Image
                            src={imageUrl}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-gray-900 font-medium line-clamp-1">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            ({item.reviewCount ?? 0} reviews · {item.stock} in stock)
                          </p>
                        </div>
                      </TableCell>

                      {/* Category Name */}
                      <TableCell className="text-gray-600">
                        {item.category?.name || "Uncategorized"}
                      </TableCell>

                      {/* Shortened ID (e.g., #CM3X...) */}
                      <TableCell className="text-gray-500 font-mono text-xs">
                        #{item.id.slice(-6).toUpperCase()}
                      </TableCell>

                      {/* Price in PKR */}
                      <TableCell className="font-semibold text-gray-900">
                        Rs. {item.price.toLocaleString()}
                      </TableCell>

                      {/* Created At */}
                      <TableCell className="text-gray-500 text-sm">
                        {formattedDate}
                      </TableCell>

                      {/* Status Badge */}
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`px-3 py-1 rounded-full text-xs font-medium border-0 ${
                            status === "Published"
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-rose-50 text-rose-500"
                          }`}
                        >
                          {status}
                        </Badge>
                      </TableCell>

                      {/* Action 3-Dots Dropdown */}
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="h-8 w-8 p-0 rounded-full bg-gray-50 hover:bg-gray-100"
                            >
                              <MoreHorizontal className="h-4 w-4 text-gray-500" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/product/${item.slug}`}>View Details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/product/edit/${item.id}`}>Edit Product</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-gray-900 text-white">
              1
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8" disabled>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8" disabled>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}