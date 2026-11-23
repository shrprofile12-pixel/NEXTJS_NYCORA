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
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Hero Banners
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
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
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Layers className="h-5 w-5" /> Active Banners ({banners.length})
          </h2>

          {banners.length === 0 ? (
            <div className="bg-card text-muted-foreground p-12 text-center rounded-2xl border border-border">
              No banners found. Create your first banner using the form.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {banners.map((banner) => (
                <div
                  key={banner.id}
                  className="bg-card text-card-foreground p-4 rounded-2xl border border-border shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  <div className="relative w-full sm:w-36 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0 border border-border">
                    <Image
                      src={banner.imageUrl}
                      alt={banner.heading}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <span className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-full font-semibold">
                      Order: {banner.order}
                    </span>
                    <h3 className="font-bold text-lg text-foreground mt-1">
                      {banner.heading}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {banner.description}
                    </p>
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                      {banner.buttonLink || "No link"}
                    </span>
                  </div>

                  <form action={deleteBanner.bind(null, banner.id)}>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive cursor-pointer"
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