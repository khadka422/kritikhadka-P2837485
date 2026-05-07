import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";
import api from "../api/axios.js"; // Add this import
import { placeOrder } from "../services/orderServices.js";

function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const [order, setOrder] = useState();
  const [orderComplete, setOrderComplete] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");

      // console.log("current user", user);

      if (!token) {
        alert("Please login first");
        return;
      }

      const order = await placeOrder(cart, token);
      setOrder(order);

      alert("Order placed successfully!");

      // Clear cart after successful order
      clearCart();

      // Redirect to order confirmation page or profile
      navigate(`/profile`);
    } catch (error) {
      console.error(error);
      alert("Failed to place order. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      // Update stock for each product in cart
      for (const item of cart) {
        try {
          await api.put(`/products/${item.id}/stock`, {
            quantity: item.quantity,
          });
          console.log(`Updated stock for ${item.name}: -${item.quantity}`);
        } catch (err) {
          console.error(`Failed to update stock for ${item.name}:`, err);
          // Optional: handle errors for individual products
        }
      }

      // Place the order
      await handleCheckout(); // <-- calls your backend to create order and clears cart

      // Set orderComplete state to show success page
      setOrderComplete(true);
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (cart.length === 0 && !orderComplete) {
      navigate("/cart");
    }
  }, [cart.length, orderComplete, navigate]);

  if (orderComplete) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-md mx-auto px-4 py-20 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Order Successful!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your sustainable purchase! Stock has been updated.
          </p>
          <div className="space-y-3">
            <Link
              to="/shop"
              className="block bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
            >
              Continue Shopping
            </Link>
            <Link
              to="/"
              className="block border border-gray-300 py-3 rounded-lg hover:bg-gray-50"
            >
              Back to Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Checkout</h1>
        <p className="text-gray-600 mb-8">Complete your order</p>

        <div className="bg-white rounded-lg border shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-6">Order Details</h2>

          <div className="space-y-4 mb-8">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <div>
                  <span className="font-medium">{item.quantity} × </span>
                  {item.name}
                  <div className="text-sm text-gray-500">
                    Stock before purchase: {item.stock || "N/A"}
                  </div>
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}

            <div className="border-t pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Address
                </label>
                <textarea
                  rows="3"
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Street address, city, ZIP code"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Payment</h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    defaultChecked
                    className="mr-2"
                    disabled={loading}
                  />
                  Cash on Delivery
                </label>
                <p className="text-sm text-gray-500">
                  For this demo project, payment is simulated. Stock will be
                  updated after purchase.
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-medium ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {loading
                ? "Processing..."
                : `Place Order - $${totalPrice.toFixed(2)}`}
            </button>
          </form>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Note:</span> This is a college project
            demo. Stock will be automatically reduced when you place an order.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default CheckoutPage;
