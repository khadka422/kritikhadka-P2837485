import { ArrowRight, Leaf, Mail } from "lucide-react";

function CTA() {
  return (
    <section className="flex items-center justify-center w-full py-20 border-t border-t-green-800/20 bg-orange-50/50">
      <div className="flex flex-col items-center justify-center gap-8 w-[35%]">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-800/80">
          <Leaf className="w-10 h-10 text-white" />
        </div>
        <h2 className="font-serif text-5xl font-semibold text-center ">
          <div>Ready to Shop,</div>
          <div className="text-transparent bg-linear-to-r from-green-800 to-green-600 bg-clip-text">
            Sustainably?
          </div>
        </h2>
        <p className="text-lg text-center text-gray-500">
          Join thousands of conscious shoppers making a difference. Get
          exclusive eco-tips, new product alerts, and sustainability insights
          straight to your inbox.
        </p>
        <div className="flex items-center justify-center gap-5">
          <div className="relative">
            <Mail className="absolute w-5 h-5 text-gray-500 top-3 left-4" />
            <input
              type="email"
              placeholder="Enter your email"
              className="px-12 py-2 border border-gray-500/50 rounded-xl placeholder:text-gray-500"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-2 text-white bg-green-800/80 rounded-xl">
            <div>Get Started</div> <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <p>
          Join 50,000+ eco-conscious shoppers. No span, unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}

export default CTA;
