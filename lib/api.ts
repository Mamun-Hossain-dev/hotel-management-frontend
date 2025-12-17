const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

export interface Room {
  _id: string
  roomNumber: string
  type: "single" | "double" | "suite" | "deluxe"
  price: number
  status: "available" | "occupied" | "maintenance"
  description?: string
  createdAt: string
  updatedAt: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  count?: number
  message?: string
  error?: string
}

export interface CreateRoomData {
  roomNumber: string
  type: string
  price: number
  status: string
  description?: string
}

export interface UpdateRoomData extends CreateRoomData {
  _id: string
}

// Get all rooms with optional filters
export async function getRooms(params?: {
  search?: string
  type?: string
  status?: string
}): Promise<ApiResponse<Room[]>> {
  const queryParams = new URLSearchParams()

  if (params?.search) queryParams.append("search", params.search)
  if (params?.type && params.type !== "all") queryParams.append("type", params.type)
  if (params?.status && params.status !== "all") queryParams.append("status", params.status)

  const url = `${API_BASE_URL}/rooms${queryParams.toString() ? `?${queryParams.toString()}` : ""}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Failed to fetch rooms")
  }

  return response.json()
}

// Get single room
export async function getRoom(id: string): Promise<ApiResponse<Room>> {
  const response = await fetch(`${API_BASE_URL}/rooms/${id}`)

  if (!response.ok) {
    throw new Error("Failed to fetch room")
  }

  return response.json()
}

// Create room
export async function createRoom(data: CreateRoomData): Promise<ApiResponse<Room>> {
  const response = await fetch(`${API_BASE_URL}/rooms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || "Failed to create room")
  }

  return result
}

// Update room
export async function updateRoom(data: UpdateRoomData): Promise<ApiResponse<Room>> {
  const response = await fetch(`${API_BASE_URL}/rooms/${data._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || "Failed to update room")
  }

  return result
}

// Delete room
export async function deleteRoom(id: string): Promise<ApiResponse<null>> {
  const response = await fetch(`${API_BASE_URL}/rooms/${id}`, {
    method: "DELETE",
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || "Failed to delete room")
  }

  return result
}
