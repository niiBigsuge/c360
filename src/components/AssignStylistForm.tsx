"use client"

import { useState } from "react"
import { assignStylist } from "@/app/actions/admin"
import { toast } from "sonner"

export function AssignStylistForm({ 
  bookingId, 
  stylists, 
  currentStylistId 
}: { 
  bookingId: string, 
  stylists: { id: string, name: string | null }[],
  currentStylistId: string | null 
}) {
  const [loading, setLoading] = useState(false)

  const handleAssign = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stylistId = e.target.value
    if (!stylistId) return

    setLoading(true)
    const res = await assignStylist(bookingId, stylistId)
    setLoading(false)

    if (res.success) {
      toast.success("Stylist assigned successfully.")
    } else {
      toast.error(res.error || "Failed to assign stylist.")
    }
  }

  return (
    <select 
      className="text-sm border rounded p-1 w-full mt-2" 
      defaultValue={currentStylistId || ""}
      onChange={handleAssign}
      disabled={loading}
    >
      <option value="" disabled>Assign Stylist...</option>
      {stylists.map(stylist => (
        <option key={stylist.id} value={stylist.id}>
          {stylist.name || "Unknown Stylist"}
        </option>
      ))}
    </select>
  )
}
