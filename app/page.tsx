import Link from "next/link";
import { TrendingUp, ArrowRight } from "lucide-react";
import PlaceCard from "@/components/PlaceCard";
import SearchBar from "@/components/SearchBar"; // Import the new component

async function getPlaces() {
  try {
    const res = await fetch("http://localhost:3000/api/places", { cache: "no-store" });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    return [];
  }
}

export default async function HomePage() {
  const places = await getPlaces();

  return (
    <main className="bg-slate-50 min-h-screen">

      {/* Immersive Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">

        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop"
            alt="India Background"
            className="w-full h-full object-cover animate-fade-in"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-black/20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 w-full max-w-5xl mx-auto mt-10">

          <div className="animate-in slide-in-from-bottom-4 fade-in duration-700">
            <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 border border-white/20 text-blue-100 text-sm font-semibold mb-6 backdrop-blur-md">
              ✨ Discover the Undiscovered
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight drop-shadow-sm">
              Explore Incredible <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-white to-green-300">India</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
              From the misty mountains of the North to the backwaters of the South. Book your perfect getaway today.
            </p>
          </div>

          {/* THE REAL SEARCH BAR */}
          <div className="animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-100">
            <SearchBar />
          </div>

        </div>
      </section>

      {/* Featured Destinations */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              Popular Destinations
            </h2>
            <p className="text-slate-500 mt-2 text-lg">Curated packages for the wanderlust in you.</p>
          </div>
          <Link href="/packages" className="hidden md:flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-100">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {places.map((place: any) => (
            <PlaceCard key={place._id} place={place} />
          ))}
        </div>
      </section>
    </main>
  );
}