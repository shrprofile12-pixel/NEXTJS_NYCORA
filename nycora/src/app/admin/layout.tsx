// src/app/admin/layout.tsx
import { redirect } from "next/navigation";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";

import {AppSidebar} from "@/components/admin/app_sidebar";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userEmail = "shrprofile12@gmail.com";
  const isLoggedIn = true;
  const allowedAdminEmail = "shrprofile12@gmail.com";

  if (!isLoggedIn || userEmail !== allowedAdminEmail) {
    // redirect("/signin")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Uploadthing SSR Plugin */}
      <NextSSRPlugin
        routerConfig={extractRouterConfig(ourFileRouter)}
      />

      {/* Admin Top Header */}
      <div className="bg-black text-white px-6 py-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">NYCORA Admin Panel</h2>
        <span className="text-sm text-gray-300">Logged in as Admin</span>
      </div>

      {/* Sidebar & Dashboard Content */}
      <SidebarProvider>
        <div className="flex w-full min-h-[calc(100vh-65px)]">
          <AppSidebar />
          <main className="flex-1 p-6">
            <SidebarTrigger className="mb-4" />
            {children}
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}