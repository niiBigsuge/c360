import Link from "next/link"
import { getHairstyles } from "@/app/actions/admin"
import { Header } from "@/components/Header"

type Hairstyle = {
  id: string
  name: string
  price: number
  description: string | null
  durationMin: number
  imageUrl?: string | null
}

export default async function ServicesPage() {
  const hairstyles = await getHairstyles() as Hairstyle[]

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1 py-16 md:py-24 px-4 container mx-auto">
        <h1 className="text-5xl font-semibold tracking-[-1.2px] mb-4 text-center">Services & Pricing</h1>
        <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-16">
          Browse our collection of premium hairstyles. Book an appointment online to visit our salon or have a stylist come to you.
        </p>

        {hairstyles.length === 0 ? (
          <p className="text-center text-muted-foreground bg-muted p-8 rounded-lg max-w-md mx-auto">
            No hairstyles have been added yet. Visit the Admin Dashboard to add some!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hairstyles.map((style) => (
              <div key={style.id} className="rounded-[16px] border border-border p-5 bg-card flex flex-col shadow-sm transition-shadow hover:shadow-md">
                <div className="aspect-[4/5] bg-muted rounded-[12px] mb-6 flex items-center justify-center text-muted-foreground text-sm overflow-hidden relative">
                  {style.imageUrl ? (
                    <img src={style.imageUrl} alt={style.name} className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <span className="text-muted-foreground/50 font-medium">No Image</span>
                  )}
                </div>
                <div className="flex justify-between items-start mb-3 gap-4">
                  <h3 className="text-xl font-semibold leading-tight">{style.name}</h3>
                  <span className="font-semibold text-lg shrink-0">${style.price.toFixed(2)}</span>
                </div>
                <div className="text-sm text-muted-foreground mb-6 flex-1 space-y-2">
                  <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                    {Math.floor(style.durationMin / 60)}h {style.durationMin % 60}m
                  </div>
                  {style.description && <p className="leading-relaxed">{style.description}</p>}
                </div>
                <Link href={`/book?service=${style.id}`} className="inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none hover:bg-primary/80 bg-primary text-primary-foreground shadow-[rgba(255,255,255,0.2)_0px_0.5px_0px_0px_inset,rgba(0,0,0,0.2)_0px_0px_0px_0.5px_inset,rgba(0,0,0,0.05)_0px_1px_2px_0px] h-11 w-full mt-auto">
                  Book This Style
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
