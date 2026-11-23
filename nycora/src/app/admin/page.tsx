// src/app/admin/page.tsx
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers, Package, ShoppingBag, Users, PlusCircle, ArrowUpRight } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Top Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-card text-card-foreground p-6 rounded-2xl border shadow-xs">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Welcome back, Admin 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Here is what&apos;s happening with your store NYCORA today.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-2 bg-background text-foreground border border-input px-4 py-2 rounded-xl text-sm font-medium hover:bg-accent hover:text-accent-foreground transition shadow-xs"
          >
            <PlusCircle className="h-4 w-4" />
            Add Product
          </Link>
          <Link
            href="/admin/banners"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary/90 transition shadow-xs"
          >
            <PlusCircle className="h-4 w-4" />
            Add Banner
          </Link>
        </div>
      </div>

      {/* Quick Statistics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card text-card-foreground p-5 rounded-2xl border shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Total Products
            </p>
            <h4 className="text-2xl font-bold text-foreground mt-1">12</h4>
          </div>
          <div className="p-3 bg-muted rounded-xl text-foreground border">
            <Package className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-card text-card-foreground p-5 rounded-2xl border shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Active Banners
            </p>
            <h4 className="text-2xl font-bold text-foreground mt-1">3</h4>
          </div>
          <div className="p-3 bg-muted rounded-xl text-foreground border">
            <Layers className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-card text-card-foreground p-5 rounded-2xl border shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Total Orders
            </p>
            <h4 className="text-2xl font-bold text-foreground mt-1">0</h4>
          </div>
          <div className="p-3 bg-muted rounded-xl text-foreground border">
            <ShoppingBag className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-card text-card-foreground p-5 rounded-2xl border shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Customers
            </p>
            <h4 className="text-2xl font-bold text-foreground mt-1">1</h4>
          </div>
          <div className="p-3 bg-muted rounded-xl text-foreground border">
            <Users className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Main Management Navigation Cards Grid */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Banners Management Card */}
          <Link href="/admin/banners" className="group block">
            <Card className="h-full hover:shadow-xl dark:hover:shadow-primary/5 transition-all duration-300 cursor-pointer border hover:border-primary rounded-2xl bg-card overflow-hidden relative">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="p-2.5 bg-muted text-foreground rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Layers className="h-6 w-6" />
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </CardHeader>
              <CardContent className="space-y-1 pb-6">
                <CardTitle className="text-lg font-bold text-foreground">
                  Manage Banners
                </CardTitle>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Add or edit homepage hero carousel banners, promotional slides, and high-res images.
                </p>
              </CardContent>
            </Card>
          </Link>

          {/* Products Management Card */}
          <Link href="/admin/products" className="group block">
            <Card className="h-full hover:shadow-xl dark:hover:shadow-primary/5 transition-all duration-300 cursor-pointer border hover:border-primary rounded-2xl bg-card overflow-hidden relative">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="p-2.5 bg-muted text-foreground rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Package className="h-6 w-6" />
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </CardHeader>
              <CardContent className="space-y-1 pb-6">
                <CardTitle className="text-lg font-bold text-foreground">
                  Manage Products
                </CardTitle>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Add new clothing items, set pricing, categories, descriptions, and track inventory stock.
                </p>
              </CardContent>
            </Card>
          </Link>

          {/* Orders Card (Future use) */}
          <Card className="h-full border rounded-2xl bg-card opacity-75 flex flex-col justify-between">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="p-2.5 bg-muted rounded-xl">
                <ShoppingBag className="h-6 w-6 text-muted-foreground" />
              </div>
              <span className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-full font-medium">
                Coming Soon
              </span>
            </CardHeader>
            <CardContent className="space-y-1 pb-6">
              <CardTitle className="text-lg font-bold text-foreground">
                Store Orders
              </CardTitle>
              <p className="text-sm text-muted-foreground leading-relaxed">
                View real-time customer purchases, tracking details, and fulfillment order statuses.
              </p>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}