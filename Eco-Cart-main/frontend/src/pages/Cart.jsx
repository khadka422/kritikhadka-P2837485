import { Link } from "react-router-dom";
import { Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";

function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } =
    useCart();

  // Helper function to fix image URLs
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "http://localhost:3000/uploads/products/default.jpg";

    // If already a full URL, return as is
    if (imagePath.startsWith("http")) return imagePath;

    // If starts with /uploads, add backend URL
    if (imagePath.startsWith("/uploads")) {
      return `http://localhost:3000${imagePath}`;
    }

    // Default fallback
    return "http://localhost:3000/uploads/products/default.jpg";
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add some eco-friendly products!</p>
          <Link
            to="/shop"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            ← Back to Shop
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <Link
            to="/shop"
            className="flex items-center gap-2 text-green-600 hover:text-green-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>

        <div className="bg-white rounded-lg border shadow-sm p-4 mb-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center border-b py-4 last:border-b-0"
            >
              <img
                src={getImageUrl(item.image)}
                alt={item.name}
                className="w-20 h-20 object-cover rounded mr-4"
                onError={(e) => {
                  e.target.src =
                    "http://localhost:3000/uploads/products/default.jpg";
                }}
              />

              <div className="grow">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600 text-sm">{item.brand}</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 hover:bg-gray-100"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-3">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  ${item.price.toFixed(2)} each
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={clearCart}
              className="border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-50"
            >
              Clear Cart
            </button>

            <Link
              to="/checkout"
              className="flex-1 bg-green-600 text-white text-center py-3 rounded-lg hover:bg-green-700 font-medium"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default CartPage;
