import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import { Award, Package, ShoppingBag, TrendingUp } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";

function Profile() {
  const [profile, setProfile] = useState();
  const user = JSON.parse(localStorage.getItem("user"));

  const getUserProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/user/${user.id}/profile`,
      );

      setProfile(response.data);
    } catch (error) {
      // axios puts server errors on error.response
      if (error.response) {
        console.error("Request failed:", error.response.data);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  useEffect(() => {
    if (user?.id) getUserProfile(user.id);
  }, []);

  console.log(profile);
  return (
    <div>
      <Navbar />
      <main className="my-7 flex flex-col gap-16 justify-center items-center px-16 ">
        <h1 className="text-3xl font-semibold font-serif">
          Welcome, {user?.firstName}
        </h1>
        <div className="flex justify-between w-full  gap-6">
          <div className="flex w-full justify-start items-center gap-6 border border-gray-500/50 px-5 py-5 rounded-xl">
            <div className="w-14 h-14 rounded-full bg-green-700/10 flex justify-center items-center">
              <Package className="w-7 h-7 text-green-800" />
            </div>
            <div>
              <div className="text-gray-500">Total Purchase</div>
              <div className="text-xl font-semibold">
                {profile?.totalItemsPurchased}
              </div>
            </div>
          </div>

          <div className="flex justify-start items-center gap-6 w-full border border-gray-500/50 p-5 rounded-xl ">
            <div className="w-14 h-14 rounded-full bg-green-700/10 flex justify-center items-center">
              <TrendingUp className="w-7 h-7 text-green-800" />
            </div>
            <div>
              <div className="text-gray-500">Total Spent</div>
              <div className="text-xl font-semibold">
                ${profile?.totalAmountSpent}
              </div>
            </div>
          </div>

          <div className="flex justify-start items-center gap-6 w-full border border-gray-500/50 p-5 rounded-xl">
            <div className="w-14 h-14 rounded-full bg-green-700/10 flex justify-center items-center">
              <Award className="w-7 h-7 text-green-800" />
            </div>
            <div>
              <div className="text-gray-500">Avg Eco Score</div>
              <div className="text-xl font-semibold">{profile?.ecoScore}</div>
            </div>
          </div>
        </div>
{/* Eco Score Feedback Banner */}
{profile?.ecoScore && (
  <div className={`w-full px-6 py-5 rounded-xl border ${
    profile.ecoScore === "A+" || profile.ecoScore === "A"
      ? "bg-green-50 border-green-300"
      : profile.ecoScore === "B"
      ? "bg-yellow-50 border-yellow-300"
      : "bg-red-50 border-red-300"
  }`}>
    <div className="flex items-center gap-4">
      <div className={`text-4xl font-bold font-serif ${
        profile.ecoScore === "A+" || profile.ecoScore === "A"
          ? "text-green-700"
          : profile.ecoScore === "B"
          ? "text-yellow-600"
          : "text-red-600"
      }`}>
        {profile.ecoScore}
      </div>
      <div>
        <div className="font-semibold text-gray-800 text-lg">
          {profile.ecoScore === "A+"
            ? "🌿 Outstanding! You're an Eco Champion!"
            : profile.ecoScore === "A"
            ? "🌱 Great job! You're making excellent eco choices."
            : profile.ecoScore === "B"
            ? "⚠️ Good effort, but there's room to improve."
            : "❌ Your purchases have a high environmental impact."}
        </div>
        <div className="text-sm text-gray-500 mt-1">
          {profile.ecoScore === "A+"
            ? "Your purchases are highly sustainable. Keep inspiring others!"
            : profile.ecoScore === "A"
            ? "You're consistently choosing eco-friendly products. Well done!"
            : profile.ecoScore === "B"
            ? "Try choosing more products with higher eco scores to improve your impact."
            : "Consider switching to greener alternatives to reduce your carbon footprint."}
        </div>
      </div>
    </div>
  </div>
)}
        <div class=" px-4 py-6 border border-gray-500/50 rounded-xl  w-full">
          {/* <!-- Header --> */}
          <div class="flex items-center gap-2 mb-6">
            <div class="w-8 h-8 flex items-center justify-center  text-green-700">
              <ShoppingBag />
            </div>
            <h2 class="text-xl font-semibold text-gray-900">
              Purchase History
            </h2>
          </div>

          {/* <!-- Item --> */}
          <div className="space-y-4">
            {profile?.products?.length < 1 ? (
              <div className="text-gray-500">No items purchased!</div>
            ) : (
              profile?.products?.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center justify-between bg-green-700/5 rounded-xl p-4"
                >
                  {/* Left */}
                  <div className="flex items-center gap-4">
                    <img
                      src={`http://localhost:3000${item.image}`}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover bg-white"
                    />

                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex flex-col items-end gap-1">
                    <span className="font-semibold text-gray-900">
                      £{item.price}
                    </span>
                    <span className="text-sm text-gray-500">
                      Spent: £{item.spent}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Profile;
