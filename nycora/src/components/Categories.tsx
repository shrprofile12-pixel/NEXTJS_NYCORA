import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

const Categories = async () => {
  const rawCategories = await prisma.category.findMany({
    orderBy: { createdAt: 'asc' },
    include: {
      products: {
        where: { isPublished: true },
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          images: {
            orderBy: { position: 'asc' },
          },
        },
      },
    },
  });

  const categories = rawCategories.map((cat) => {
    let pickedImage: string | null = null;

    // Category ke products mein se pehli valid image dhoondna
    for (const prod of cat.products || []) {
      const firstImage = prod.images?.[0]?.url;
      if (typeof firstImage === 'string' && firstImage.trim() !== '') {
        pickedImage = firstImage;
        break;
      }
    }

    return {
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      image: pickedImage || '/Bag.png', // Fallback image taake card kabhi blank na dikhe
    };
  });

  return (
    <section className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:px-8">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/products?category=${category.slug}`}
          className="group relative flex min-h-64 items-end overflow-hidden bg-neutral-200 p-6"
        >
          <img
            src={category.image}
            alt={category.name}
            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          />

          {/* Subtle dark gradient taake white badge aur text har image par clear dikhe */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

          <div className="relative z-10 bg-white/95 px-4 py-2 text-xs font-medium tracking-[0.18em] text-neutral-900 uppercase shadow-xs">
            {category.name}
          </div>
        </Link>
      ))}
    </section>
  );
};

export default Categories;