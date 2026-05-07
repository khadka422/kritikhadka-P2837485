import { Leaf, Target, Users, Heart, Shield, TrendingUp } from "lucide-react";
import Navbar from "../components/home/Navbar.jsx";
import Footer from "../components/home/Footer.jsx";

function About() {
  return (
    <div className="min-h-screen bg-linear-to-b from-white to-green-800/10">
      <Navbar />
      {/* Hero Section */}
      <section className="px-24 py-16">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-2xl bg-green-900/15 w-fit">
            <Leaf className="w-4 h-4" />
            <span>Our Story & Mission</span>
          </div>
          <h1 className="text-5xl font-semibold font-serif">
            Building a{" "}
            <span className="text-transparent bg-linear-to-r from-green-800 to-green-600 bg-clip-text">
              Greener
            </span>{" "}
            Future Through{" "}
            <span className="text-transparent bg-linear-to-r from-green-800 to-green-600 bg-clip-text">
              Conscious
            </span>{" "}
            Shopping
          </h1>
          <p className="text-lg text-gray-500 max-w-3xl">
            EcoCart was born from a simple idea: what if every online purchase
            came with a clear understanding of its environmental impact? We're
            making sustainable shopping accessible, transparent, and rewarding.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-24 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-green-800/10">
                <Target className="w-8 h-8 text-green-800" />
              </div>
              <h2 className="text-3xl font-semibold font-serif">Our Mission</h2>
            </div>
            <p className="text-gray-600 text-lg">
              To empower consumers with transparent environmental data, enabling
              informed purchasing decisions that support both personal values
              and planetary health.
            </p>
            <p className="text-gray-600">
              We believe every purchase tells a story about the world we want to
              live in. By making sustainability metrics clear and accessible,
              we're helping shape a future where eco-friendly choices are the
              easiest choices.
            </p>
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-green-800/10">
                <TrendingUp className="w-8 h-8 text-green-800" />
              </div>
              <h2 className="text-3xl font-semibold font-serif">Our Vision</h2>
            </div>
            <p className="text-gray-600 text-lg">
              A world where sustainability isn't a premium feature, but a
              standard part of every shopping experience.
            </p>
            <p className="text-gray-600">
              We envision an e-commerce ecosystem where environmental impact is
              as visible as price and reviews, and where consumers can
              effortlessly support brands that align with their ecological
              values.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-24 py-12 bg-green-800/5">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold font-serif mb-6">
            Our Core Values
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            These principles guide everything we do at EcoCart
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Shield,
              title: "Transparency",
              description:
                "No greenwashing. We provide honest, data-driven environmental information for every product.",
              color: "from-green-800 to-green-600",
            },
            {
              icon: Users,
              title: "Community",
              description:
                "Building a movement of conscious consumers who drive positive change together.",
              color: "from-green-700 to-emerald-600",
            },
            {
              icon: Heart,
              title: "Impact",
              description:
                "Every feature we build aims to create measurable environmental benefit.",
              color: "from-emerald-800 to-green-700",
            },
          ].map((value, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm border border-green-800/10"
            >
              <div
                className={`p-4 rounded-xl bg-linear-to-r ${value.color} w-fit mb-6`}
              >
                <value.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold font-serif mb-4">
                {value.title}
              </h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team/Origin */}
      <section className="px-24 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-semibold font-serif mb-8">
            From{" "}
            <span className="text-transparent bg-linear-to-r from-green-800 to-green-600 bg-clip-text">
              Student Project
            </span>{" "}
            to{" "}
            <span className="text-transparent bg-linear-to-r from-green-800 to-green-600 bg-clip-text">
              Sustainable Solution
            </span>
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            EcoCart started as a university project focused on solving
            real-world environmental challenges through technology. What began
            as research into sustainable e-commerce has evolved into a platform
            dedicated to making eco-friendly shopping accessible to everyone.
          </p>
          <p className="text-gray-600">
            Today, we're proud to be building tools that help consumers make
            purchases they can feel good about—for themselves, and for the
            planet.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default About;
