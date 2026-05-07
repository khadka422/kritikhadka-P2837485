import AIPowered from "../components/home/AIPowered";
import AIWidget from "../components/home/AIWidget";
import CTA from "../components/home/CTA";
import FeaturedProducts from "../components/home/FeaturedProducts";
import Features from "../components/home/Features";
import Footer from "../components/home/Footer";
import Hero from "../components/home/Hero";
import HowItWorks from "../components/home/HowItWorks";
import Navbar from "../components/home/Navbar";

function Index() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <FeaturedProducts />
        <HowItWorks />
        <AIPowered />
        <CTA />
      </main>
      <Footer />
      <AIWidget />
    </div>
  );
}

export default Index;
