'use client'

import type React from 'react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createRoom,
  updateRoom,
  type Room,
  type CreateRoomData,
} from '@/lib/api'
import { Loader2 } from 'lucide-react'

interface RoomFormProps {
  room?: Room | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RoomForm({ room, open, onOpenChange }: RoomFormProps) {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const isEdit = !!room

  const [formData, setFormData] = useState<CreateRoomData>({
    roomNumber: '',
    type: 'single',
    price: 0,
    status: 'available',
    description: '',
  })

  useEffect(() => {
    if (room) {
      setFormData({
        roomNumber: room.roomNumber,
        type: room.type,
        price: room.price,
        status: room.status,
        description: room.description || '',
      })
    } else {
      setFormData({
        roomNumber: '',
        type: 'single',
        price: 0,
        status: 'available',
        description: '',
      })
    }
  }, [room])

  const createMutation = useMutation({
    mutationFn: createRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
      toast({
        title: 'Success',
        description: 'Room created successfully',
      })
      onOpenChange(false)
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  const updateMutation = useMutation({
    mutationFn: updateRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] })
      toast({
        title: 'Success',
        description: 'Room updated successfully',
      })
      onOpenChange(false)
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.roomNumber || !formData.type || formData.price <= 0) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      })
      return
    }

    if (isEdit && room) {
      updateMutation.mutate({ ...formData, _id: room._id })
    } else {
      createMutation.mutate(formData)
    }
  }

  const isLoading = createMutation.isPending || updateMutation.isPending

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] p-0 gap-0 overflow-hidden rounded-2xl">
        {/* Header with Gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {isEdit ? 'Edit Room' : 'Add New Room'}
            </DialogTitle>
            <DialogDescription className="text-blue-100">
              {isEdit
                ? 'Update room details below'
                : 'Fill in the details to add a new room'}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <div className="grid gap-5">
            <div className="space-y-2">
              <Label
                htmlFor="roomNumber"
                className="text-slate-700 font-medium"
              >
                Room Number <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="roomNumber"
                value={formData.roomNumber}
                onChange={e =>
                  setFormData({ ...formData, roomNumber: e.target.value })
                }
                placeholder="e.g., 101"
                required
                className="h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type" className="text-slate-700 font-medium">
                  Room Type <span className="text-rose-500">*</span>
                </Label>
                <Select
                  value={formData.type}
                  onValueChange={value =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger
                    id="type"
                    className="h-11 border-slate-200 rounded-xl"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">🛏️ Single</SelectItem>
                    <SelectItem value="double">🛏️ Double</SelectItem>
                    <SelectItem value="suite">👑 Suite</SelectItem>
                    <SelectItem value="deluxe">✨ Deluxe</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="text-slate-700 font-medium">
                  Price (per night) <span className="text-rose-500">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                    $
                  </span>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        price: Number.parseFloat(e.target.value) || 0,
                      })
                    }
                    placeholder="0.00"
                    required
                    className="h-11 pl-7 border-slate-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="text-slate-700 font-medium">
                Status <span className="text-rose-500">*</span>
              </Label>
              <Select
                value={formData.status}
                onValueChange={value =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger
                  id="status"
                  className="h-11 border-slate-200 rounded-xl"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      Available
                    </div>
                  </SelectItem>
                  <SelectItem value="occupied">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                      Occupied
                    </div>
                  </SelectItem>
                  <SelectItem value="maintenance">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      Maintenance
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-slate-700 font-medium"
              >
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={e =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Additional room details..."
                rows={3}
                className="border-slate-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl resize-none"
              />
              <p className="text-xs text-slate-500">
                Optional: Add any special features or notes
              </p>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEdit ? 'Update Room' : 'Create Room'}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
