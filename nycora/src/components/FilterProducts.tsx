'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export interface ProductItem {
  id: string;
  name: string;
  slug: string;
  price: string;
  comparePrice?: string;
  isFeatured: boolean;
  category: string;
  image: string;
}

const categories = [
  { label: 'WINTER', slug: 'winter' },
  { label: 'UNSTITCHED', slug: 'unstitched' },
  { label: 'READY TO WEAR', slug: 'ready-to-wear' },
  { label: 'SWEATERS', slug: 'sweaters' },
  { label: 'MENSWEAR', slug: 'menswear' },
  { label: 'FRAGRANCE', slug: 'fragrance' },
  { label: 'BEAUTY', slug: 'beauty' },
];

interface FilterProductsProps {
  products?: ProductItem[];
  defaultCategory?: string;
}

const FilterProducts = ({
  products = [],
  defaultCategory = 'winter',
}: FilterProductsProps) => {
  const [activeCategory, setActiveCategory] = useState(defaultCategory);

  const filteredProducts = useMemo(
    () => products.filter((item) => item.category === activeCategory),
    [products, activeCategory]
  );

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-8 px-4 py-12 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-normal tracking-[0.2em] text-neutral-900 uppercase md:text-3xl">
        WHAT&apos;S NEW
      </h2>

      <nav aria-label="What's new categories" className="w-full">
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:gap-x-10">
          {categories.map((category) => {
            const isActive = activeCategory === category.slug;

            return (
              <li key={category.slug}>
                <button
                  type="button"
                  onClick={() => setActiveCategory(category.slug)}
                  aria-pressed={isActive}
                  className={`cursor-pointer pb-1.5 text-xs tracking-[0.16em] uppercase transition-all duration-200 sm:text-sm ${
                    isActive
                      ? 'border-b border-neutral-900 font-medium text-neutral-900'
                      : 'border-b border-transparent font-normal text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  {category.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="w-full px-2 sm:px-10">
        {filteredProducts.length > 0 ? (
          <Carousel
            key={activeCategory}
            opts={{
              align: 'start',
              loop: filteredProducts.length > 3,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {filteredProducts.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="basis-full pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <Link
                    href={`/products/${product.slug}`}
                    className="group flex flex-col gap-3"
                  >
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                      {product.isFeatured && (
                        <span className="absolute top-3 left-3 bg-white/90 px-2.5 py-1 text-[10px] font-medium tracking-[0.15em] text-neutral-900 uppercase backdrop-blur-xs">
                          FEATURED
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1 text-left">
                      <h3 className="line-clamp-1 text-xs tracking-[0.06em] text-neutral-800 uppercase transition-colors group-hover:text-black sm:text-sm">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs font-medium tracking-wider">
                        <span className="text-neutral-800">{product.price}</span>
                        {product.comparePrice && (
                          <span className="text-neutral-400 line-through">
                            {product.comparePrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="hidden border-neutral-200 bg-white/90 text-neutral-800 hover:bg-neutral-900 hover:text-white sm:flex" />
            <CarouselNext className="hidden border-neutral-200 bg-white/90 text-neutral-800 hover:bg-neutral-900 hover:text-white sm:flex" />
          </Carousel>
        ) : (
          <div className="flex h-64 items-center justify-center border border-dashed border-neutral-200 text-xs tracking-[0.15em] text-neutral-400 uppercase">
            No products available in this category yet.
          </div>
        )}
      </div>
    </section>
  );
};

export default FilterProducts;