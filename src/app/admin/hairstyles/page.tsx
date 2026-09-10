import { getHairstyles, createHairstyle, deleteHairstyle } from "@/app/actions/admin"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type Hairstyle = {
  id: string
  name: string
  price: number
  description: string | null
  durationMin: number
  imageUrl?: string | null
}

export default async function AdminHairstylesPage() {
  const hairstyles = await getHairstyles() as Hairstyle[]

  // Wrapper for form action to satisfy TS React 18 types
  const handleCreate = async (formData: FormData) => {
    "use server"
    await createHairstyle(formData)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">Hairstyles</h2>
        <p className="text-muted-foreground">Manage the services available for booking.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Add New Hairstyle</CardTitle>
              <CardDescription>Create a new service offering.</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={handleCreate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" required placeholder="e.g. Knotless Braids" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input id="price" name="price" type="number" step="0.01" required placeholder="150.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="durationMin">Duration (Minutes)</Label>
                  <Input id="durationMin" name="durationMin" type="number" required placeholder="120" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea id="description" name="description" placeholder="Short description..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Image (Optional)</Label>
                  <Input id="image" name="image" type="file" accept="image/*" />
                </div>
                <Button type="submit" className="w-full">Save Hairstyle</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Available Hairstyles</CardTitle>
            </CardHeader>
            <CardContent>
              {hairstyles.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">No hairstyles found.</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {hairstyles.map((style) => (
                      <TableRow key={style.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-3">
                            {style.imageUrl && (
                              <img src={style.imageUrl} alt={style.name} className="w-12 h-12 rounded object-cover" />
                            )}
                            <div>
                              {style.name}
                              {style.description && <p className="text-xs text-muted-foreground">{style.description}</p>}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{style.durationMin} mins</TableCell>
                        <TableCell>${style.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          <form action={async () => {
                            "use server"
                            await deleteHairstyle(style.id)
                          }}>
                            <Button type="submit" variant="destructive" size="sm">Delete</Button>
                          </form>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
