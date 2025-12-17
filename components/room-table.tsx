'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2, Hotel } from 'lucide-react'
import { RoomForm } from './room-form'
import { DeleteRoomDialog } from './delete-room-dialog'
import type { Room } from '@/lib/api'

interface RoomTableProps {
  rooms: Room[]
}

export function RoomTable({ rooms }: RoomTableProps) {
  const [editRoom, setEditRoom] = useState<Room | null>(null)
  const [deleteRoom, setDeleteRoom] = useState<Room | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const handleEdit = (room: Room) => {
    setEditRoom(room)
    setIsFormOpen(true)
  }

  const handleDelete = (room: Room) => {
    setDeleteRoom(room)
    setIsDeleteOpen(true)
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setEditRoom(null)
  }

  const handleDeleteClose = () => {
    setIsDeleteOpen(false)
    setDeleteRoom(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20'
      case 'occupied':
        return 'bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 border-rose-500/20'
      case 'maintenance':
        return 'bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-amber-500/20'
      default:
        return 'bg-slate-500/10 text-slate-600 hover:bg-slate-500/20 border-slate-500/20'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'suite':
        return '👑'
      case 'deluxe':
        return '✨'
      case 'double':
        return '🛏️'
      default:
        return '🛏️'
    }
  }

  const formatType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1)
  }

  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  if (rooms.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/50 p-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="p-6 bg-slate-100 rounded-full">
            <Hotel className="h-12 w-12 text-slate-400" />
          </div>
          <div>
            <p className="text-xl font-semibold text-slate-600 mb-1">
              No rooms found
            </p>
            <p className="text-sm text-slate-400">
              Try adjusting your search or filters
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Card View for Mobile/Tablet, Table for Desktop */}
      <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
        {rooms.map(room => (
          <div
            key={room._id}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/50 overflow-hidden"
          >
            <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 p-6">
              <div className="absolute top-4 right-4">
                <Badge
                  variant="secondary"
                  className={`${getStatusColor(
                    room.status,
                  )} border capitalize font-medium`}
                >
                  {formatStatus(room.status)}
                </Badge>
              </div>
              <div className="text-5xl mb-2">{getTypeIcon(room.type)}</div>
              <h3 className="text-2xl font-bold text-white mb-1">
                Room {room.roomNumber}
              </h3>
              <p className="text-blue-100 capitalize text-sm">
                {formatType(room.type)} Room
              </p>
            </div>

            <div className="p-6">
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-bold text-slate-900">
                  ${room.price.toFixed(2)}
                </span>
                <span className="text-slate-500 text-sm">/night</span>
              </div>

              <p className="text-slate-600 text-sm mb-6 line-clamp-2 min-h-[40px]">
                {room.description || 'No description available'}
              </p>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 rounded-xl"
                  onClick={() => handleEdit(room)}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300 rounded-xl"
                  onClick={() => handleDelete(room)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table View for Desktop */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-slate-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200/50">
                <th className="text-left py-4 px-6 font-semibold text-slate-700 text-sm">
                  Room
                </th>
                <th className="text-left py-4 px-6 font-semibold text-slate-700 text-sm">
                  Type
                </th>
                <th className="text-left py-4 px-6 font-semibold text-slate-700 text-sm">
                  Price
                </th>
                <th className="text-left py-4 px-6 font-semibold text-slate-700 text-sm">
                  Status
                </th>
                <th className="text-left py-4 px-6 font-semibold text-slate-700 text-sm">
                  Description
                </th>
                <th className="text-right py-4 px-6 font-semibold text-slate-700 text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {rooms.map(room => (
                <tr
                  key={room._id}
                  className="group border-b border-slate-200/50 hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                        {getTypeIcon(room.type)}
                      </div>
                      <span className="font-semibold text-slate-900">
                        {room.roomNumber}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-sm font-medium capitalize">
                      {formatType(room.type)}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-semibold text-slate-900">
                    ${room.price.toFixed(2)}
                  </td>
                  <td className="py-4 px-6">
                    <Badge
                      variant="secondary"
                      className={`${getStatusColor(
                        room.status,
                      )} border capitalize font-medium`}
                    >
                      {formatStatus(room.status)}
                    </Badge>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-slate-600 text-sm line-clamp-2 max-w-[300px]">
                      {room.description || '-'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(room)}
                        className="hover:bg-blue-50 hover:text-blue-600 rounded-lg h-9 w-9"
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit room</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(room)}
                        className="hover:bg-rose-50 hover:text-rose-600 rounded-lg h-9 w-9"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete room</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <RoomForm
        room={editRoom}
        open={isFormOpen}
        onOpenChange={handleFormClose}
      />
      <DeleteRoomDialog
        room={deleteRoom}
        open={isDeleteOpen}
        onOpenChange={handleDeleteClose}
      />
    </>
  )
}
