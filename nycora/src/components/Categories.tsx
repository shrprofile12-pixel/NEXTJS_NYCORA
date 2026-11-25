import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

const priceFormatter = new Intl.NumberFormat("en-PK");

function getValidImageUrl(url?: string | null): string | null {
  if (typeof url === "string" && url.trim() !== "") {
    return url.trim();
  }
  return null;
}

export default async function Categories() {
  // 1. Sirf wahi categories fetch karein jin mein kam-az-kam 1 product ho
  // 2. Database se sabhi products fetch karein
  const [rawCategories, allProducts] = await Promise.all([
    prisma.category.findMany({
      where: {
        products: {
          some: {},
        },
      },
      orderBy: { createdAt: "asc" },
      include: {
        products: {
          orderBy: { createdAt: "desc" },
          include: {
            images: {
              orderBy: { position: "asc" },
            },
          },
        },
      },
    }),
    prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
        images: {
          orderBy: { position: "asc" },
        },
      },
    }),
  ]);

  const categoriesWithProducts = rawCategories
    .filter((cat) => cat.products.length > 0)
    .map((cat) => {
      let pickedImage: string | null = null;

      for (const prod of cat.products) {
        const candidate = getValidImageUrl(prod.images[0]?.url);
        if (candidate) {
          pickedImage = candidate;
          break;
        }
      }

      return {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        image: pickedImage,
        productCount: cat.products.length,
      };
    });

  return (
    <div className="mx-auto w-full max-w-7xl space-y-12 px-4 py-8 sm:px-6 lg:px-8">
      {/* Categories Grid (Only categories that have products) */}
      <section aria-labelledby="categories-heading" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2
            id="categories-heading"
            className="text-base font-semibold tracking-wide text-neutral-900 uppercase"
          >
            Categories ({categoriesWithProducts.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {categoriesWithProducts.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group relative flex min-h-64 items-end overflow-hidden bg-neutral-200 p-6"
            >
              {category.image ? (
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-neutral-300"
                />
              )}

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent"
              />

              <div className="relative z-10 flex items-center gap-3 bg-white/95 px-4 py-2 text-xs font-medium tracking-[0.18em] text-neutral-900 uppercase shadow-xs">
                <span>{category.name}</span>
                <span className="text-[11px] tracking-normal text-neutral-500">
                  ({category.productCount})
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* All Products from Database */}
      {/* <section aria-labelledby="all-products-heading" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2
            id="all-products-heading"
            className="text-base font-semibold tracking-wide text-neutral-900 uppercase"
          >
            All Products ({allProducts.length})
          </h2>
        </div>

        {allProducts.length === 0 ? (
          <p className="rounded-lg border border-dashed p-8 text-center text-sm text-neutral-500">
            No products found in database.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {allProducts.map((product) => {
              const imageUrl = getValidImageUrl(product.images[0]?.url);

              return (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="group flex flex-col overflow-hidden rounded-lg border bg-white transition-shadow hover:shadow-sm"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-neutral-100">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={product.name}
                        className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-neutral-400">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-3.5">
                    <div>
                      <p className="text-[11px] tracking-wider text-neutral-500 uppercase">
                        {product.category?.name || "Uncategorized"}
                      </p>
                      <h3 className="mt-0.5 line-clamp-1 text-sm font-medium text-neutral-900">
                        {product.name}
                      </h3>
                    </div>

                    <p className="mt-2 text-sm font-semibold text-neutral-900">
                      Rs. {priceFormatter.format(product.price)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section> */}
    </div>
  );
}