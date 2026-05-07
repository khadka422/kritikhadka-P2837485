import { Search, Leaf, ShoppingBag, TrendingUp } from "lucide-react";
function HowItWorks() {
  const steps = [
    {
      id: "01",
      title: "Browse Products",
      description:
        "Explore our curated collection of sustainable products across all categories.",
      logo: Search,
    },
    {
      id: "02",
      title: "Check Eco-Impact",
      description:
        "Every product shows its carbon footprint, materials, and sustainability score.",
      logo: Leaf,
    },
    {
      id: "03",
      title: "Shop Consciously",
      description:
        "Make informed purchases knowing exactly how your choice impacts the planet.",
      logo: ShoppingBag,
    },
    {
      id: "04",
      title: "Track Your Impact",
      description:
        "Watch your personal sustainability dashboard grow with every eco-friendly purchase.",
      logo: TrendingUp,
    },
  ];
  return (
    <section className="flex flex-col items-center justify-center gap-6 py-20 px-30 bg-orange-50/50">
      <div className="px-3 py-1 bg-green-700/20 rounded-2xl">How It Works</div>
      <div className="text-center">
        <h2 className="mb-2 font-serif text-5xl font-semibold">
          Shopping Made Sustainable
        </h2>
        <p className="text-lg text-center text-gray-500">
          Four simple steps to transform your shopping habits and reduce your
          environmental <br /> footprint.
        </p>
      </div>
      <div className="flex gap-20 ">
        {steps.map((item, ind) => (
          <div
            key={item.index}
            className="flex flex-col items-center justify-center gap-4 px-8 py-8 text-center"
          >
            <div className="relative font-serif text-5xl font-bold text-green-700/30">
              {item.id}
              {ind <= 2 && (
                <div className="absolute bottom-4 left-20 w-56 h-0.5 bg-green-700/30"></div>
              )}
            </div>
            <div className="p-4 bg-linear-to-r from-green-700 to-green-700/70 rounded-xl">
              <item.logo className="w-10 h-10 text-white " />
            </div>
            <div className="font-serif text-lg font-semibold ">
              {item.title}
            </div>
            <div className="text-sm text-gray-500">{item.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
export default HowItWorks;
