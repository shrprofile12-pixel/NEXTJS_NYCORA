import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { Marquee } from "../components/NavbarComponents/Marquee";
import FilterProducts, { ProductItem } from "@/components/FilterProducts";
import { prisma } from "@/lib/prisma";
import Categories from "@/components/Categories";
import AddProductForm, { CategoryOption } from "@/components/admin/AddProductForm";

export default async function Home() {
  let formattedProducts: ProductItem[] = [];
  let categories: CategoryOption[] = [];

  try {
    const [products, fetchedCategories] = await Promise.all([
      prisma.product.findMany({
        where: { isPublished: true },
        include: {
          category: true,
          images: {
            orderBy: { position: "asc" },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.category.findMany({
        orderBy: { name: "asc" },
        select: {
          id: true,
          name: true,
        },
      }),
    ]);

    categories = fetchedCategories;

    formattedProducts = products.map((item) => {
      const firstImage = item.images?.[0]?.url;

      return {
        id: item.id,
        name: item.name,
        slug: item.slug,
        price: `PKR ${Number(item.price).toLocaleString()}`,
        comparePrice: item.comparePrice
          ? `PKR ${Number(item.comparePrice).toLocaleString()}`
          : undefined,
        isFeatured: item.isFeatured,
        category: item.category?.slug || "winter",
        image: firstImage || "/Bag.png",
      };
    });
  } catch (error) {
    console.error("PRISMA ERROR IN HOME PAGE:", error);
  }

  return (
    <>
      <Marquee />
      <Navbar />
      <Hero />

      <FilterProducts products={formattedProducts} />
      <Categories />
      {/* <AddProductForm categories={categories} /> */}
    </>
  );
}