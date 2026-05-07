import { useState, useEffect } from "react";
import { Leaf, ShoppingCart, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { totalItems } = useCart();

  const navLinks = [
    { id: 1, name: "Shop", href: "/shop" },
    { id: 2, name: "About", href: "/about" },
    { id: 3, name: "Impact", href: "/impact" },
    { id: 4, name: "Blog", href: "/blog" },
  ];

  // Function to check auth status
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (storedUser && token) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Error parsing user:", error);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    checkAuth();

    const handleLoginEvent = () => {
      checkAuth();
    };

    window.addEventListener("user-logged-in", handleLoginEvent);

    return () => {
      window.removeEventListener("user-logged-in", handleLoginEvent);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-40 flex justify-between items-center px-16 py-3 border-b bg-white/70 backdrop-blur-sm border-b-green-800/20">
      {/* Logo - LEFT SIDE */}
      <Link to="/" className="flex items-center gap-2">
        <div className="flex items-center justify-center w-10 h-10 bg-green-700 rounded-full">
          <Leaf className="text-white w-6 h-6" />
        </div>
        <span className="font-serif text-xl font-semibold text-gray-900">
          EcoCart
        </span>
      </Link>

      {/* Navigation Links - CENTER */}
      <div className="flex items-center justify-center gap-8">
        {navLinks.map((item) => (
          <Link
            to={item.href}
            key={item.id}
            className="text-gray-700 hover:text-green-800 transition-colors"
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Right Side Actions - RIGHT SIDE */}
      <div className="flex items-center gap-6">
        {/* Cart with count */}
        <Link
          to="/cart"
          className="relative p-2 hover:bg-green-50 rounded-md transition-colors"
        >
          <ShoppingCart className="w-5 h-5 text-gray-700" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>

        {user ? (
          // Logged In State
          <div className="flex items-center gap-3">
            {/* User Profile */}
            <div className="relative group">
              <div className="flex items-center gap-2 p-2-50 rounded-md transition-colors">
                <Link
                  to={"/profile"}
                  className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full"
                >
                  <User className="w-4 h-4 text-green-700" />
                </Link>
                <span className="flex items-center gap-2 text-sm font-medium">
                  {user.firstName || user.email?.split("@")[0]}
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </span>
              </div>
            </div>
          </div>
        ) : (
          // Not Logged In State
          <>
            <Link
              to="/login"
              className="px-4 py-2 text-green-700 hover:text-green-800 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 text-white bg-green-700 rounded-md hover:bg-green-800 transition-colors"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
