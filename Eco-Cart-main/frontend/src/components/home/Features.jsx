import {
  Leaf,
  BarChart3,
  MessageCircle,
  Target,
  Shield,
  TrendingUp,
} from "lucide-react";
function Features() {
  const features = [
    {
      icon: Leaf,
      title: "Eco-Impact Scores",
      description:
        "Every product displays a clear sustainability score based on carbon footprint, materials, and ethical practices.",
      color: "bg-green-800",
    },
    {
      icon: MessageCircle,
      title: "AI Shopping Assistant",
      description:
        "Ask EcoAI anything about sustainability. Get personalized recommendations and greener alternatives.",
      color: "bg-green-500",
    },
    {
      icon: BarChart3,
      title: "Personal Dashboard",
      description:
        "Track your environmental impact over time. See how your choices contribute to a healthier planet.",
      color: "bg-orange-500",
    },
    {
      icon: Target,
      title: "Sustainability Goals",
      description:
        "Set and track personal sustainability goals. Earn badges and achievements for eco-conscious shopping.",
      color: "bg-blue-400",
    },
    {
      icon: Shield,
      title: "Verified Products",
      description:
        "All products are verified for authentic sustainability claims. No greenwashing, only genuine eco-products.",
      color: "bg-amber-800",
    },
    {
      icon: TrendingUp,
      title: "Impact Reports",
      description:
        "Monthly reports showing your carbon savings, trees planted equivalent, and community impact.",
      color: "bg-green-800",
    },
  ];
  return (
    <section className="flex flex-col items-center justify-center gap-6 py-20 px-30 bg-orange-50/50">
      <div className="px-3 py-1 bg-green-700/20 rounded-2xl">Features</div>
      <div className="text-center">
        <h2 className="mb-2 font-serif text-5xl font-semibold">
          Shop Smarter, Live Greener
        </h2>
        <p className="text-lg text-center text-gray-500">
          EcoCart empowers you with the tools and information you need to make
          sustainable <br /> shopping decisions.
        </p>
      </div>
      <div className="grid grid-cols-3 grid-rows-2 gap-6 ">
        {features.map((item, index) => (
          <div
            key={index}
            className="px-8 py-8 bg-white border border-gray-300 shadow-lg group rounded-2xl"
          >
            <div
              className={`p-4 mb-4 text-4xl text-white transition-all duration-300 ${item.color} w-fit group-hover:scale-110 rounded-xl`}
            >
              <item.icon />
            </div>
            <div className="mb-2 font-serif text-lg font-semibold">
              {item.title}
            </div>
            <div className="text-sm text-gray-500">{item.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
export default Features;
