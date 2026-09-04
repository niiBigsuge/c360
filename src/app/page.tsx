import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-semibold text-xl tracking-tight">TheCrown360</div>
          <nav className="hidden md:flex gap-6">
            <a href="#hairstyles" className="text-foreground hover:text-primary underline-offset-4 hover:underline">Hairstyles</a>
            <a href="#services" className="text-foreground hover:text-primary underline-offset-4 hover:underline">Services</a>
            <a href="#how-it-works" className="text-foreground hover:text-primary underline-offset-4 hover:underline">How It Works</a>
          </nav>
          <Button variant="default" className="shadow-[rgba(255,255,255,0.2)_0px_0.5px_0px_0px_inset,rgba(0,0,0,0.2)_0px_0px_0px_0.5px_inset,rgba(0,0,0,0.05)_0px_1px_2px_0px]">
            Book Appointment
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center py-24 px-4 md:py-32">
        <h1 className="text-5xl md:text-[60px] font-semibold leading-[1.1] tracking-[-1.5px] max-w-3xl mb-6">
          Your Perfect Hair, Wherever You Want It.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-[1.38]">
          Book your favorite hairstyle online and choose whether to visit our salon or have a professional stylist come directly to you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="shadow-[rgba(255,255,255,0.2)_0px_0.5px_0px_0px_inset,rgba(0,0,0,0.2)_0px_0px_0px_0.5px_inset,rgba(0,0,0,0.05)_0px_1px_2px_0px] text-base px-8 py-6 h-auto">
            Book an Appointment
          </Button>
          <Button size="lg" variant="outline" className="text-base px-8 py-6 h-auto border-black/40 hover:bg-black/5">
            Explore Hairstyles
          </Button>
        </div>
      </section>

      {/* Trending Looks Section Placeholder */}
      <section id="hairstyles" className="py-24 px-4 container mx-auto">
        <h2 className="text-[48px] font-semibold tracking-[-1.2px] mb-12 text-center">Trending Looks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-[12px] border border-border p-4 bg-card">
              <div className="aspect-[4/5] bg-black/5 rounded-[12px] mb-4"></div>
              <h3 className="text-xl mb-2 font-medium">Knotless Braids</h3>
              <p className="text-muted-foreground mb-4">Duration: 3-5 hours</p>
              <Button className="w-full shadow-[rgba(255,255,255,0.2)_0px_0.5px_0px_0px_inset,rgba(0,0,0,0.2)_0px_0px_0px_0.5px_inset,rgba(0,0,0,0.05)_0px_1px_2px_0px]">
                Book This Style
              </Button>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
