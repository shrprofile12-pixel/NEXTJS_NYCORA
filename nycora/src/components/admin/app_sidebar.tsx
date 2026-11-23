// src/components/admin/app_sidebar.tsx
"use client"
import {
  DropdownMenu,
  
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import * as React from "react"
import Link from "next/link"
import { 
  LayoutDashboard, 
  Layers, 
  Image as ImageIcon, 
  Package, 
  Users, 
  User2
} from "lucide-react"

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { FaChevronDown } from "react-icons/fa6"
import { DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"

// Menu items
const items = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Category",
    url: "/admin/categories",
    icon: Layers,
  },
  {
    title: "Banners",
    url: "/admin/banners",
    icon: ImageIcon,
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: Package,
  },
  {
    title: "Customers",
    url: "/admin/customers",
    icon: Users,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-4">
        <h1 className="font-bold text-xl tracking-wider text-black">NYCORA</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {/* asChild hata kar Link ko direct use kiya gaya hai */}
                  <SidebarMenuButton asChild={false} className="w-full">
                    <Link href={item.url} className="flex items-center gap-3 font-medium w-full">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>


     {/* Footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              {/* Note: If your shadcn uses Radix instead of Base UI, replace `render={<SidebarMenuButton />}` with `asChild` and keep `<SidebarMenuButton>` inside */}
              <DropdownMenuTrigger render={<SidebarMenuButton />}>
                <User2 />
                <span>Username</span>
                <FaChevronDown className="ml-auto" />
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}