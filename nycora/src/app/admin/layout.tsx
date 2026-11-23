// src/app/admin/layout.tsx
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";

import { AppSidebar } from "@/components/admin/app_sidebar";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Nav from "@/components/admin/Nav";
import { ThemeProvider } from "@/components/theme-provider";

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
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen bg-gray-50 dark:bg-background">
        {/* Uploadthing SSR Plugin */}
        <NextSSRPlugin
          routerConfig={extractRouterConfig(ourFileRouter)}
        />

        <div className="w-full px-8">
          {/* Admin Top Header */}
          <Nav />
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
    </ThemeProvider>
  );
}