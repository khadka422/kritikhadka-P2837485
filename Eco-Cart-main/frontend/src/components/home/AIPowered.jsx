import { ArrowRight, Check, MessageCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

function AIPowered() {
  const lists = [
    "Explains eco-impact scores in simple terms",
    "Recommends greener product alternatives",
    "Answers sustainability questions 24/7",
    "Helps you meet your environmental goals",
  ];

  const chatMessages = [
    {
      type: "user",
      message: "What makes this t-shirt sustainable?",
    },
    {
      type: "ai",
      message:
        "Great question! This t-shirt is made from 100% organic cotton, which uses 91% less water than conventional cotton. The dyes are plant-based and non-toxic. The brand follows fair trade practices, ensuring workers receive fair wages. Its eco-score is A+ due to low carbon footprint of just 2.1kg CO₂.",
    },
    {
      type: "user",
      message: "Can you suggest a more affordable alternative?",
    },
    {
      type: "ai",
      message:
        "I found 3 similar options with A or A+ eco-scores under £25! The 'EcoBasics Tee' at £19.99 has similar sustainability credentials and comes in 8 colors. Would you like me to show you a comparison?",
    },
  ];

  return (
    <section className="flex gap-12 px-20 py-20 bg-orange-50/50">
      <div>
        <div className="px-3 py-1 mb-4 bg-green-700/20 rounded-2xl w-fit">
          AI-Powered
        </div>
        <h2 className="mb-4 font-serif text-5xl font-semibold ">
          Meet EcoAI,
          <br />
          Your Sustainability Guide
        </h2>
        <p className="mb-4 text-lg text-gray-500">
          Have questions about products? Need help finding greener alternatives?
          Our AI <br /> assistant understands sustainability inside and out. Ask
          anything, get informed
          <br />
          answers instantly.
        </p>
        <ul className="mb-6">
          {lists.map((item) => (
            <li key={item} className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-800/80">
                <Check className="w-4 h-4 text-white" />
              </div>{" "}
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <Link className="flex items-center gap-3 px-5 py-2 text-white bg-green-800/80 rounded-xl w-fit">
          <p>Try EcoAI Now</p>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="w-[50%] rounded-xl border border-green-800/10 shadow-xl">
        <div className="flex items-center justify-between px-6 py-4 text-white bg-green-800/80 rounded-t-xl">
          <div className="flex items-center justify-center gap-3 ">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-400/50">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="leading-5">
              <div className="font-serif font-semibold">EcoAI Assistant</div>
              <div className="text-sm text-green-100/50">
                Always here to help
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-1 animate-pulse">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div>Online</div>
          </div>
        </div>
        <div className="w-full px-6 py-6">
          {chatMessages.map((item) => (
            <div
              className={`flex mb-6 ${item.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`py-2 max-w-[85%] px-4 text-sm  ${item.type === "user" ? "bg-green-800/80 text-white" : "bg-green-700/20 text-black"} rounded-xl`}
              >
                {item.type === "ai" && (
                  <div className="flex items-center gap-1 mb-1 text-xs ">
                    {" "}
                    <Sparkles className="w-3 h-3 text-orange-500" />
                    <span className="text-black/60">EcoAI</span>
                  </div>
                )}
                {item.message}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AIPowered;
