'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Hotel, Sparkles, Building2, Star } from 'lucide-react'

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <main className="relative container mx-auto flex flex-col items-center justify-center gap-8 px-4 py-20 text-center min-h-screen">
        {/* Logo/Icon */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"></div>
          <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-2xl shadow-blue-500/50 transform group-hover:scale-110 transition-transform duration-300">
            <Hotel className="h-12 w-12 text-white" />
          </div>
        </div>

        {/* Main Heading */}
        <div className="space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            <span>Premium Hotel Management System</span>
          </div>

          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              LuxeStay
            </span>
            <br />
            <span className="text-slate-900">Hotel Room Management</span>
          </h1>

          <p className="max-w-[700px] mx-auto text-lg text-slate-600 leading-relaxed md:text-xl">
            Efficiently manage your hotel rooms with our modern and intuitive
            management system. Track availability, pricing, and room details all
            in one place.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mt-8">
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200/50">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">
              Room Management
            </h3>
            <p className="text-sm text-slate-600">
              Easy CRUD operations for all your rooms
            </p>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200/50">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Star className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">
              Real-time Updates
            </h3>
            <p className="text-sm text-slate-600">
              Instant synchronization across devices
            </p>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200/50">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">
              Modern Interface
            </h3>
            <p className="text-sm text-slate-600">
              Beautiful and intuitive design
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 text-lg px-8 py-6 rounded-xl"
          >
            <Link href="/rooms">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 rounded-xl border-2 hover:bg-slate-50"
          >
            <Link href="/rooms">View Rooms</Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-12 max-w-2xl w-full">
          <div className="text-center">
            <p className="text-3xl font-bold text-slate-900">500+</p>
            <p className="text-sm text-slate-600">Rooms Managed</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-slate-900">98%</p>
            <p className="text-sm text-slate-600">Uptime</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-slate-900">24/7</p>
            <p className="text-sm text-slate-600">Support</p>
          </div>
        </div>
      </main>
    </div>
  )
}
