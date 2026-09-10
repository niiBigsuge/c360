import Link from "next/link"
import { Header } from "@/components/Header"
export default async function Home() {

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="flex flex-col items-start text-left">
          <h1 className="text-5xl md:text-[60px] lg:text-[72px] font-semibold leading-[1.1] tracking-[-1.5px] max-w-2xl mb-6">
            Your Perfect Hair, <br className="hidden md:block" /> Wherever You Are.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-[1.38]">
            Book your favorite hairstyle online and choose whether to visit our salon or have a professional stylist come directly to you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/book" className="inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none hover:bg-primary/80 bg-primary text-primary-foreground shadow-[rgba(255,255,255,0.2)_0px_0.5px_0px_0px_inset,rgba(0,0,0,0.2)_0px_0px_0px_0.5px_inset,rgba(0,0,0,0.05)_0px_1px_2px_0px] text-base px-8 py-4 h-auto w-full sm:w-auto">
              Book an Appointment
            </Link>
          </div>
        </div>

        {/* Right Visual */}
        <div className="relative aspect-square md:aspect-[4/3] lg:aspect-[4/5] rounded-r-2xl rounded-l-[150px] md:rounded-l-[250px] overflow-hidden bg-muted shadow-2xl">
           <img 
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2874&auto=format&fit=crop" 
            alt="Salon styling" 
            className="absolute inset-0 w-full h-full object-cover" 
           />
           <div className="absolute inset-0 bg-black/10"></div>
        </div>
      </section>

    </div>
  )
}
