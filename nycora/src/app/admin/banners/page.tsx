// src/app/admin/banners/page.tsx
import { deleteBanner } from "@/lib/adminserverAction/admin";
import { BannerForm } from "@/components/admin/BannerForm";
import { Button } from "@/components/ui/button";
import { Trash2, Layers } from "lucide-react";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export default async function AdminBannersPage() {
  const banners = await prisma.banner.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Hero Banners</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your homepage hero carousel banners and slides.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Client Form Component */}
        <div className="lg:col-span-1">
          <BannerForm />
        </div>

        {/* Right Side: Server List & Delete Action */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Layers className="h-5 w-5" /> Active Banners ({banners.length})
          </h2>

          {banners.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-2xl border text-gray-500">
              No banners found. Create your first banner using the form.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {banners.map((banner) => (
                <div
                  key={banner.id}
                  className="bg-white p-4 rounded-2xl border shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  <div className="relative w-full sm:w-36 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={banner.imageUrl}
                      alt={banner.heading}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <span className="text-xs bg-gray-100 px-2.5 py-1 rounded-full font-semibold">
                      Order: {banner.order}
                    </span>
                    <h3 className="font-bold text-lg mt-1">{banner.heading}</h3>
                    <p className="text-sm text-gray-500 line-clamp-1">
                      {banner.description}
                    </p>
                    <span className="text-xs text-blue-600 font-medium">
                      {banner.buttonLink || "No link"}
                    </span>
                  </div>

                  <form action={deleteBanner.bind(null, banner.id)}>
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
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}