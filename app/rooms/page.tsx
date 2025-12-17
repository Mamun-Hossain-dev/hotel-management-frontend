'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RoomForm } from '@/components/room-form'
import { RoomTable } from '@/components/room-table'
import { getRooms } from '@/lib/api'
import {
  Plus,
  Search,
  Loader2,
  Hotel,
  Bed,
  Users,
  DollarSign,
  Sparkles,
} from 'lucide-react'
import Link from 'next/link'

export default function RoomsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const { data, isLoading, error } = useQuery({
    queryKey: ['rooms', search, typeFilter, statusFilter],
    queryFn: () =>
      getRooms({
        search,
        type: typeFilter,
        status: statusFilter,
      }),
  })

  const rooms = data?.data || []

  // Calculate stats
  const stats = {
    total: rooms.length,
    available: rooms.filter(r => r.status === 'available').length,
    occupied: rooms.filter(r => r.status === 'occupied').length,
    revenue: rooms.reduce((sum, r) => sum + r.price, 0),
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-slate-200/50 shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur-lg opacity-40"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
                <Hotel className="h-5 w-5 text-white" />
              </div>
            </div>
            <div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                LuxeStay Hotels
              </span>
              <p className="text-xs text-slate-500 hidden sm:block">
                Premium Management
              </p>
            </div>
          </Link>
          <Button
            onClick={() => setIsFormOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Room
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-2">
            Room Management
          </h1>
          <p className="text-slate-600">
            Manage all your hotel rooms in one place
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/50">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-500/10 rounded-xl">
                  <Bed className="h-6 w-6 text-blue-600" />
                </div>
                <Sparkles className="h-4 w-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-sm font-medium text-slate-600 mb-1">
                Total Rooms
              </p>
              <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
            </div>
          </div>

          <div className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/50">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-emerald-500/10 rounded-xl">
                  <Hotel className="h-6 w-6 text-emerald-600" />
                </div>
                <Sparkles className="h-4 w-4 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-sm font-medium text-slate-600 mb-1">
                Available
              </p>
              <p className="text-3xl font-bold text-slate-900">
                {stats.available}
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/50">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-rose-500/10 to-pink-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-rose-500/10 rounded-xl">
                  <Users className="h-6 w-6 text-rose-600" />
                </div>
                <Sparkles className="h-4 w-4 text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-sm font-medium text-slate-600 mb-1">
                Occupied
              </p>
              <p className="text-3xl font-bold text-slate-900">
                {stats.occupied}
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <Sparkles className="h-4 w-4 text-white/70" />
              </div>
              <p className="text-sm font-medium text-blue-100 mb-1">
                Total Value
              </p>
              <p className="text-3xl font-bold text-white">${stats.revenue}</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/50 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                placeholder="Search by room number or description..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-11 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-[180px] h-12 border-slate-200 rounded-xl">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="double">Double</SelectItem>
                <SelectItem value="suite">Suite</SelectItem>
                <SelectItem value="deluxe">Deluxe</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px] h-12 border-slate-200 rounded-xl">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Content Area */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20 bg-white rounded-2xl shadow-sm border border-slate-200/50">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-slate-600">Loading rooms...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl shadow-sm border border-slate-200/50">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-4">
              <Hotel className="h-8 w-8 text-rose-600" />
            </div>
            <p className="text-lg font-semibold text-slate-900 mb-2">
              Failed to load rooms
            </p>
            <p className="text-sm text-slate-600">
              Make sure the backend server is running
            </p>
          </div>
        ) : (
          <RoomTable rooms={rooms} />
        )}
      </main>

      <RoomForm room={null} open={isFormOpen} onOpenChange={setIsFormOpen} />
    </div>
  )
}
