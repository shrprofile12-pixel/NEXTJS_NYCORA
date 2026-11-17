// src/app/admin/page.tsx
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers, Package, ShoppingBag, Users, PlusCircle, ArrowUpRight } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Top Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-6 rounded-2xl border shadow-xs">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
            Welcome back, Admin 👋
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Here is what&apos;s happening with your store NYCORA today.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-2 bg-white text-black border border-gray-300 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition shadow-xs"
          >
            <PlusCircle className="h-4 w-4" />
            Add Product
          </Link>
          <Link
            href="/admin/banners"
            className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition shadow-xs"
          >
            <PlusCircle className="h-4 w-4" />
            Add Banner
          </Link>
        </div>
      </div>

      {/* Quick Statistics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Products</p>
            <h4 className="text-2xl font-bold text-gray-900 mt-1">12</h4>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl text-black border">
            <Package className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Active Banners</p>
            <h4 className="text-2xl font-bold text-gray-900 mt-1">3</h4>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl text-black border">
            <Layers className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Orders</p>
            <h4 className="text-2xl font-bold text-gray-900 mt-1">0</h4>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl text-black border">
            <ShoppingBag className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Customers</p>
            <h4 className="text-2xl font-bold text-gray-900 mt-1">1</h4>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl text-black border">
            <Users className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Main Management Navigation Cards Grid */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Banners Management Card */}
          <Link href="/admin/banners" className="group block">
            <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer border hover:border-black rounded-2xl bg-white overflow-hidden relative">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="p-2.5 bg-gray-100 rounded-xl group-hover:bg-black group-hover:text-white transition-colors">
                  <Layers className="h-6 w-6" />
                </div>
                <ArrowUpRight className="h-5 w-5 text-gray-400 group-hover:text-black transition-colors" />
              </CardHeader>
              <CardContent className="space-y-1 pb-6">
                <CardTitle className="text-lg font-bold group-hover:text-black">Manage Banners</CardTitle>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Add or edit homepage hero carousel banners, promotional slides, and high-res images.
                </p>
              </CardContent>
            </Card>
          </Link>

          {/* Products Management Card */}
          <Link href="/admin/products" className="group block">
            <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer border hover:border-black rounded-2xl bg-white overflow-hidden relative">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="p-2.5 bg-gray-100 rounded-xl group-hover:bg-black group-hover:text-white transition-colors">
                  <Package className="h-6 w-6" />
                </div>
                <ArrowUpRight className="h-5 w-5 text-gray-400 group-hover:text-black transition-colors" />
              </CardHeader>
              <CardContent className="space-y-1 pb-6">
                <CardTitle className="text-lg font-bold group-hover:text-black">Manage Products</CardTitle>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Add new clothing items, set pricing, categories, descriptions, and track inventory stock.
                </p>
              </CardContent>
            </Card>
          </Link>

          {/* Orders Card (Future use) */}
          <Card className="h-full border rounded-2xl bg-white opacity-80 flex flex-col justify-between">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="p-2.5 bg-gray-100 rounded-xl">
                <ShoppingBag className="h-6 w-6 text-gray-700" />
              </div>
              <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">Coming Soon</span>
            </CardHeader>
            <CardContent className="space-y-1 pb-6">
              <CardTitle className="text-lg font-bold">Store Orders</CardTitle>
              <p className="text-sm text-gray-500 leading-relaxed">
                View real-time customer purchases, tracking details, and fulfillment order statuses.
              </p>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}