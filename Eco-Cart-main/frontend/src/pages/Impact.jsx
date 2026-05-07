import { Leaf, Trees, Droplets, Zap, Recycle, BarChart3 } from "lucide-react";
import Navbar from "../components/home/Navbar.jsx";
import Footer from "../components/home/Footer.jsx";


function Impact() {
  return (
    <div className="min-h-screen bg-linear-to-b from-white to-green-800/10">
      <Navbar />
      {/* Hero Section */}
      <section className="px-24 py-16">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-2xl bg-green-900/15 w-fit">
            <Leaf className="w-4 h-4" />
            <span>Making a Difference</span>
          </div>
          <h1 className="text-5xl font-semibold font-serif">
            Your{" "}
            <span className="text-transparent bg-linear-to-r from-green-800 to-green-600 bg-clip-text">
              Purchase
            </span>{" "}
            Has{" "}
            <span className="text-transparent bg-linear-to-r from-green-800 to-green-600 bg-clip-text">
              Power
            </span>
          </h1>
          <p className="text-lg text-gray-500 max-w-3xl">
            Every sustainable choice creates ripple effects. See how conscious shopping 
            translates into real environmental impact.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="px-24 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { icon: Leaf, value: "100T", label: "CO₂ Saved", color: "bg-green-800/10" },
            { icon: Trees, value: "5K+", label: "Trees Protected", color: "bg-emerald-800/10" },
            { icon: Droplets, value: "2M L", label: "Water Conserved", color: "bg-blue-800/10" },
            { icon: Recycle, value: "50T", label: "Waste Reduced", color: "bg-teal-800/10" }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-green-800/10 text-center">
              <div className={`p-3 rounded-xl ${stat.color} w-fit mx-auto mb-4`}>
                <stat.icon className="w-8 h-8 text-green-800" />
              </div>
              <div className="font-serif text-3xl font-semibold text-green-800 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold font-serif mb-8 text-center">
            How Sustainable Shopping Creates Change
          </h2>
          
          <div className="space-y-8 max-w-4xl mx-auto">
            {[
              {
                title: "Reduced Carbon Footprint",
                description: "Choosing eco-friendly products means less energy consumption, lower emissions from transportation, and support for carbon-neutral practices.",
                icon: Leaf
              },
              {
                title: "Resource Conservation",
                description: "Sustainable products use less water, require fewer raw materials, and promote circular economy principles that extend product lifecycles.",
                icon: Trees
              },
              {
                title: "Waste Reduction",
                description: "From minimal packaging to biodegradable materials, every sustainable choice helps reduce landfill waste and ocean pollution.",
                icon: Recycle
              },
              {
                title: "Market Transformation",
                description: "Every purchase signals to brands that sustainability matters, encouraging more companies to adopt eco-friendly practices.",
                icon: Zap
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-6 p-6 bg-white rounded-2xl shadow-sm border border-green-800/10">
                <div className="p-4 rounded-xl bg-green-800/10 shrink-0">
                  <item.icon className="w-8 h-8 text-green-800" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold font-serif mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-linear-to-r from-green-800 to-green-600 rounded-2xl p-8 text-center text-white">
          <div className="flex items-center justify-center gap-3 mb-6">
            <BarChart3 className="w-8 h-8" />
            <h3 className="text-2xl font-semibold font-serif">Track Your Impact</h3>
          </div>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Create an account to see your personal environmental savings, 
            track your sustainable purchases, and join our community of 
            conscious consumers.
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-800 rounded-xl font-semibold hover:bg-green-50 transition-colors">
            <span>Join the Movement</span>
            <Leaf className="w-5 h-5" />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Impact;