import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProductRowActions from "@/components/ProductRowActions";
import AddProductForm from "@/components/admin/AddProductForm";
const FALLBACK_IMAGE = "/Bag.png";

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const numberFormatter = new Intl.NumberFormat("en-PK");

export default async function ProductPage() {
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
  });

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="w-full rounded-xl border bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-600" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-gray-900">
              All Products ({products.length})
            </h2>
          </div>

          <Button render={<Link href="/product/new" />} size="sm" className="gap-1">
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add Product
          </Button>
        </div>

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
                  <TableCell colSpan={7} className="py-10 text-center text-gray-500">
                    No products found in database. Run your seed script or add a product!
                  </TableCell>
                </TableRow>
              ) : (
                products.map((item) => {
                  const imageUrl = item.images[0]?.url || FALLBACK_IMAGE;
                  const isPublished = item.stock > 0;
                  const statusLabel = isPublished ? "Published" : "Out of Stock";
                  const formattedDate = dateFormatter.format(new Date(item.createdAt));

                  return (
                    <TableRow key={item.id}>
                      <TableCell className="flex items-center gap-3 font-medium">
                        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border bg-gray-100">
                          <Image
                            src={imageUrl}
                            alt={item.name}
                            fill
                            sizes="44px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="line-clamp-1 font-medium text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            ({item.reviewCount ?? 0} reviews · {item.stock} in stock)
                          </p>
                        </div>
                      </TableCell>

                      <TableCell className="text-gray-600">
                        {item.category?.name || "Uncategorized"}
                      </TableCell>

                      <TableCell className="font-mono text-xs text-gray-500">
                        #{item.id.slice(-6).toUpperCase()}
                      </TableCell>

                      <TableCell className="font-semibold text-gray-900">
                        Rs. {numberFormatter.format(item.price)}
                      </TableCell>

                      <TableCell className="text-sm text-gray-500">
                        {formattedDate}
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`rounded-full border-0 px-3 py-1 text-xs font-medium ${
                            isPublished
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-rose-50 text-rose-500"
                          }`}
                        >
                          {statusLabel}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-right">
                        <ProductRowActions
                          productId={item.id}
                          productSlug={item.slug}
                          productName={item.name}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" className="h-8 w-8 bg-gray-900 p-0 text-white">
              1
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8" disabled>
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8" disabled>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}