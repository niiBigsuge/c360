"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { submitBooking } from "@/app/actions/book"

const mockHairstyles = [
  { id: "h1", name: "Knotless Braids", price: 150 },
  { id: "h2", name: "Silk Press", price: 90 },
  { id: "h3", name: "Faux Locs", price: 200 }
]

export function BookingForm() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  
  const [formData, setFormData] = useState({
    hairstyleId: mockHairstyles[0].id,
    locationType: "IN_SALON",
    homeAddress: "",
    date: "",
    time: "",
    name: "",
    email: "",
    notes: ""
  })

  const selectedHairstyle = mockHairstyles.find(h => h.id === formData.hairstyleId)
  const transportFee = formData.locationType === "AT_HOME" ? (selectedHairstyle?.price || 0) * 0.15 : 0
  const totalAmount = (selectedHairstyle?.price || 0) + transportFee

  const nextStep = () => {
    console.log("nextStep clicked! Current step:", step)
    setStep(s => s + 1)
  }
  const prevStep = () => setStep(s => s - 1)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleBooking = async () => {
    setLoading(true)
    const data = new FormData()
    Object.entries(formData).forEach(([key, value]) => data.append(key, value))
    
    const res = await submitBooking(data)
    setLoading(false)
    if (res.success) {
      setSuccess(true)
    } else {
      alert(res.error)
    }
  }

  if (success) {
    return (
      <Card className="max-w-xl mx-auto p-6 text-center shadow-none border-border">
        <CardHeader>
          <CardTitle className="text-3xl text-primary">Booking Confirmed!</CardTitle>
          <CardDescription className="text-lg">Thank you, {formData.name}. We've sent a confirmation email to {formData.email}.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="max-w-xl mx-auto shadow-none border-border bg-background">
      <CardHeader>
        <CardTitle>Book Appointment - Step {step} of 4</CardTitle>
        <CardDescription>Follow the steps to complete your booking.</CardDescription>
      </CardHeader>
      <CardContent>
        {step === 1 && (
          <div className="space-y-4">
            <Label>Select Hairstyle</Label>
            <RadioGroup 
              value={formData.hairstyleId} 
              onValueChange={(val) => setFormData(prev => ({ ...prev, hairstyleId: val }))}
              className="grid gap-4"
            >
              {mockHairstyles.map(h => (
                <div key={h.id} className="flex items-center space-x-2 border border-border p-4 rounded-md bg-background">
                  <RadioGroupItem value={h.id} id={h.id} />
                  <Label htmlFor={h.id} className="flex-1 cursor-pointer font-medium">{h.name}</Label>
                  <span className="font-semibold text-primary">${h.price}</span>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <Label>Service Location</Label>
            <RadioGroup 
              value={formData.locationType} 
              onValueChange={(val) => setFormData(prev => ({ ...prev, locationType: val, homeAddress: val === "IN_SALON" ? "" : prev.homeAddress }))}
            >
              <div className="flex items-center space-x-2 p-3">
                <RadioGroupItem value="IN_SALON" id="salon" />
                <Label htmlFor="salon">In-Salon (No extra fee)</Label>
              </div>
              <div className="flex items-center space-x-2 p-3">
                <RadioGroupItem value="AT_HOME" id="home" />
                <Label htmlFor="home">At Home (+15% Transport Fee)</Label>
              </div>
            </RadioGroup>
            
            {formData.locationType === "AT_HOME" && (
              <div className="mt-4">
                <Label htmlFor="homeAddress">Your Address</Label>
                <Input id="homeAddress" name="homeAddress" placeholder="Enter your full address" value={formData.homeAddress} onChange={handleChange} />
                <p className="text-sm text-muted-foreground mt-1">Note: Our admin will manually verify if your location is within our travel radius.</p>
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input type="date" id="date" name="date" value={formData.date} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="time">Time</Label>
              <Input type="time" id="time" name="time" value={formData.time} onChange={handleChange} />
              <p className="text-sm text-muted-foreground">We accept up to 3 bookings per timeslot.</p>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea id="notes" name="notes" placeholder="Any special requests?" value={formData.notes} onChange={handleChange} />
            </div>
            
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Order Summary</h4>
              <div className="flex justify-between text-sm mb-1">
                <span>{selectedHairstyle?.name}</span>
                <span>${selectedHairstyle?.price.toFixed(2)}</span>
              </div>
              {formData.locationType === "AT_HOME" && (
                <div className="flex justify-between text-sm mb-1 text-muted-foreground">
                  <span>Home Service Transport Fee (15%)</span>
                  <span>${transportFee.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-border mt-2 pt-2 flex justify-between font-bold text-lg">
                <span>Total Amount</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between p-6">
        {step > 1 && <Button type="button" variant="outline" onClick={prevStep} className="border-black/40 hover:bg-black/5">Back</Button>}
        {step === 1 && <div></div>}
        
        {step < 4 ? (
          <Button type="button" onClick={nextStep} className="shadow-[rgba(255,255,255,0.2)_0px_0.5px_0px_0px_inset,rgba(0,0,0,0.2)_0px_0px_0px_0.5px_inset,rgba(0,0,0,0.05)_0px_1px_2px_0px]">Continue</Button>
        ) : (
          <Button type="button" onClick={handleBooking} disabled={loading} className="shadow-[rgba(255,255,255,0.2)_0px_0.5px_0px_0px_inset,rgba(0,0,0,0.2)_0px_0px_0px_0.5px_inset,rgba(0,0,0,0.05)_0px_1px_2px_0px]">
            {loading ? "Processing..." : "Confirm Booking"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
