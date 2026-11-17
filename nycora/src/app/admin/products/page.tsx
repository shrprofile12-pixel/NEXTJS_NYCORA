// src/app/admin/products/page.tsx
import { deleteProduct } from "@/lib/adminserverAction/product";
import { ProductForm } from "@/components/admin/ProductForm";
import { Button } from "@/components/ui/button";
import { Trash2, Package } from "lucide-react";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export default async function AdminProductsPage() {
  // 1. Database se products aur categories fetch karein
  const products = await prisma.product.findMany({
    include: {
      category: true, // Category ka naam show karne ke liye
      images: true,   // Images relation ke liye
    },
    orderBy: { createdAt: "desc" },
  });

  const categories = await prisma.category.findMany({
    select: { id: true, name: true },
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Products Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Add new clothing items, set pricing, categories, and inventory.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Product Form with Categories */}
        <div className="lg:col-span-1">
          <ProductForm categories={categories} />
        </div>

        {/* Right Side: Products List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Package className="h-5 w-5" /> All Products ({products.length})
          </h2>

          {products.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-2xl border text-gray-500">
              No products found. Add your first product using the form.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {products.map((product) => {
                // Main image find karein ya pehli image uthayein
                const mainImage = product.images.find(img => img.isMain)?.url || product.images[0]?.url || "";

                return (
                  <div
                    key={product.id}
                    className="bg-white p-4 rounded-2xl border shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4"
                  >
                    <div className="relative w-full sm:w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      {mainImage && (
                        <Image
                          src={mainImage}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>

                    <div className="flex-1 text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <span className="text-xs bg-gray-100 px-2.5 py-1 rounded-full font-semibold">
                          {product.category?.name || "Uncategorized"}
                        </span>
                        <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded-full">
                          Stock: {product.stock}
                        </span>
                        {product.isFeatured && (
                          <span className="text-xs text-purple-600 font-semibold bg-purple-50 px-2 py-0.5 rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-lg mt-1">{product.name}</h3>
                      <p className="text-sm font-semibold text-gray-900">
                        PKR {Number(product.price).toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                        {product.description}
                      </p>
                    </div>

                    {/* Delete Action */}
                    <form action={deleteProduct.bind(null, product.id)}>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200 cursor-pointer"
                        type="submit"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}