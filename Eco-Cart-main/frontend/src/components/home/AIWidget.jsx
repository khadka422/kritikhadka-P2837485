import { MessageCircle, Send, Sparkles, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

function AIWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  // Start with initial demo messages
  const [chatMessages, setChatMessages] = useState([
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
  ]);

  const chatEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, loading]);

  // Send user prompt
  const sendPrompt = async () => {
    if (!prompt.trim()) return;

    // Add user's message
    const userMessage = { type: "user", message: prompt };
    setChatMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setLoading(true);

    // Add a temporary "AI typing" message
    const typingMessage = { type: "ai", message: "" };
    setChatMessages((prev) => [...prev, typingMessage]);

    try {
      const res = await fetch("http://localhost:3000/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      const aiMessage = {
        type: "ai",
        message: data.result || "Sorry, I could not generate a response.",
      };

      // Replace the typing message with actual AI response
      setChatMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = aiMessage;
        return updated;
      });
    } catch (err) {
      // Replace typing bubble with error message
      setChatMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          type: "ai",
          message: "Request failed: " + err.message,
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed z-50 bottom-6 right-6">
      {!isOpen ? (
        <button
          className="relative flex items-center justify-center w-16 h-16 text-white transition rounded-full shadow-lg cursor-pointer bg-green-800/80 hover:scale-105"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="w-8 h-8" />
          <div className="absolute right-0 flex items-center justify-center w-5 h-5 bg-orange-500 rounded-full animate-pulse -top-2">
            <Sparkles className="w-3 h-3 " />
          </div>
        </button>
      ) : (
        <div className="bg-white border h-[72vh] shadow-xl w-96 rounded-xl border-green-800/10 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 text-white bg-green-800/80 rounded-t-xl">
            <div className="flex items-center justify-center gap-3 ">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-400/50">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="leading-5">
                <div className="font-serif font-semibold">EcoAI Assistant</div>
                <div className="flex items-center gap-1 ">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="text-xs">Online</div>
                </div>
              </div>
            </div>

            <X
              className="w-5 h-5 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>

          {/* Chat Messages */}
          <div className="w-full h-[50vh] px-6 py-6 overflow-y-scroll border-b border-b-green-800/20 flex-1 flex-col">
            {chatMessages.map((item, index) => (
              <div
                key={index}
                className={`flex mb-6 ${
                  item.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`py-2 max-w-[85%] px-4 text-sm ${
                    item.type === "user"
                      ? "bg-green-800/80 text-white"
                      : "bg-green-700/20 text-black"
                  } rounded-xl flex items-center gap-2`}
                >
                  {item.type === "ai" && (
                    <>
                      <Sparkles className="w-3 h-3 text-orange-500" />
                      {loading && item.message === "" ? (
                        <span className="text-black/60 animate-pulse">
                          EcoAI is typing...
                        </span>
                      ) : (
                        <span>{item.message}</span>
                      )}
                    </>
                  )}
                  {item.type === "user" && <span>{item.message}</span>}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="flex items-center justify-center gap-3 px-6 py-4">
            <input
              placeholder="Ask about sustainability..."
              className="flex-1 px-4 py-2 bg-green-700/10 rounded-2xl placeholder:text-sm focus:outline-1 focus:outline-green-700/20"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && !e.shiftKey && sendPrompt()
              }
              disabled={loading}
            />
            <button
              className="flex items-center justify-center p-3 text-white rounded-full bg-green-800/80"
              onClick={sendPrompt}
              disabled={loading}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AIWidget;
