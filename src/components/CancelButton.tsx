"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cancelBooking } from "@/app/actions/book"

import { toast } from "sonner"

export function CancelButton({ bookingId }: { bookingId: string }) {
  const [loading, setLoading] = useState(false)

  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel this booking?")) return
    
    setLoading(true)
    const res = await cancelBooking(bookingId)
    setLoading(false)
    
    if (res.success) {
      toast.success("Booking cancelled successfully.")
    } else {
      toast.error(res.error || "Failed to cancel booking.")
    }
  }

  return (
    <Button 
      variant="destructive" 
      size="sm" 
      onClick={handleCancel} 
      disabled={loading}
    >
      {loading ? "Cancelling..." : "Cancel"}
    </Button>
  )
}
