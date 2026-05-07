import { ArrowRight, Leaf, Recycle, TreePine } from "lucide-react";
import { Link } from "react-router-dom";

function Hero() {
  const stats = [
    { value: "10+", label: "Eco Products" },
    { value: "10+", label: "Happy Customers" },
    { value: "10T", label: "CO₂ Saved" },
  ];
  return (
    <section className="h-[91vh] px-24  bg-linear-to-b from-white to-green-800/20 flex justify-between items-center">
      <div className="flex flex-col gap-6 ">
        <div className="flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-2xl bg-green-900/15 w-fit">
          <Leaf className="w-4 h-4" />
          <span>Smart Sustainable Shopping</span>
        </div>
        <h1 className="text-6xl font-semibold font-serif font-stretch-50% ">
          Shop with{" "}
          <span className="text-transparent bg-linear-to-r from-green-800 to-green-600 bg-clip-text">
            Purpose
          </span>
          ,<br />
          Live with{" "}
          <span className="text-transparent bg-linear-to-r from-green-800 to-green-600 bg-clip-text">
            Impact
          </span>
        </h1>
        <p className="text-lg text-gray-500 ">
          Discover products that are good for you and the planet. Every item
          <br />
          shows its eco-impact score, helping you make informed, sustainable
          <br />
          choices.
        </p>
        <div className="flex gap-4">
          <Link
            to={"/shop"}
            className="flex items-center justify-center gap-2 px-8 py-2 text-sm text-white bg-green-800 rounded-xl w-fit"
          >
            Start Shopping
            <ArrowRight className="w-4 h-4 " />
          </Link>
          <Link to={"/about"} className="px-6 py-2 border rounded-xl">
            How It Works
          </Link>
        </div>
        <div className="flex mt-3 gap-7">
          {stats.map((item) => (
            <div key={item.label} className="text-center">
              <div className="font-serif text-3xl font-semibold">
                {item.value}
              </div>
              <div className="text-sm text-gray-600">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative flex items-center justify-center rounded-full bg-green-800/20 w-96 h-96">
        <div className="flex items-center justify-center rounded-full w-80 h-80 bg-green-800/50">
          <div className="flex items-center justify-center w-64 h-64 rounded-full bg-green-800/50">
            <Leaf className="w-20 h-20 text-white" />
          </div>
        </div>
        <div
          className="absolute right-0 flex items-center justify-center w-32 h-32 rounded-full -top-6 bg-green-800/10 animate-bounce"
          style={{ animationDuration: "2s" }}
        >
          <div className="px-3 py-2 bg-white rounded-md shadow-2xl ">
            <Recycle className="w-10 h-10 text-green-700" />
          </div>
        </div>
        <div
          className="absolute bottom-0 px-3 py-2 duration-75 rounded-md shadow-2xl left-2 animate-bounce bg-white/50 "
          style={{ animationDuration: "2s" }}
        >
          <TreePine className="w-10 h-10 text-green-700 " />
        </div>
      </div>
    </section>
  );
}

export default Hero;
