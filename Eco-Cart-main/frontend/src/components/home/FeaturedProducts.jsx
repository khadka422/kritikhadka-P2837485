import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import api from "../../api/axios.js";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch featured products from backend
  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      setError("");
      
      // You can fetch limited products, best ecoScore, or random selection
      const response = await api.get("/products", {
        params: {
          limit: 8, // Get only 8 products
          sort: "ecoScore", // Sort by best eco score
        }
      });
      
      if (response.data.success) {
        const fetchedProducts = response.data.products || response.data.data || [];
        
        // Format products with full image URLs
        const formattedProducts = fetchedProducts.slice(0, 8).map(product => ({
          id: product._id || product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          image: product.image 
            ? `http://localhost:3000${product.image}` 
            : "http://localhost:3000/uploads/products/default.jpg",
          ecoScore: product.ecoScore || 'C',
          carbonFootprint: `${product.carbonFootprint || 0}kg CO₂`,
          materials: product.materials || [],
          badges: generateBadges(product), // Generate badges based on product data
        }));
        
        setProducts(formattedProducts);
      } else {
        setError("Failed to load products");
      }
    } catch (err) {
      console.error("Error fetching featured products:", err);
      setError("Unable to load featured products");
    } finally {
      setLoading(false);
    }
  };

  // Generate badges based on product attributes
  const generateBadges = (product) => {
    const badges = [];
    
    if (product.ecoScore === 'A+' || product.ecoScore === 'A') {
      badges.push("Top Rated");
    }
    
    if (product.materials?.includes("Organic")) {
      badges.push("Organic");
    }
    
    if (product.materials?.some(m => m.toLowerCase().includes("recycled"))) {
      badges.push("Recycled");
    }
    
    if (product.category === "Clothing") {
      badges.push("Sustainable Fashion");
    }
    
    if (product.carbonFootprint < 2) {
      badges.push("Low Carbon");
    }
    
    // Return max 3 badges
    return badges.slice(0, 3);
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  // If no products yet, show a loading state
  if (loading) {
    return (
      <section className="py-20 px-30">
        <div className="px-3 py-1 mb-4 bg-green-700/20 rounded-2xl w-fit">
          Featured Products
        </div>
        <div className="flex items-center justify-between mb-7">
          <h2 className="mb-2 font-serif text-5xl font-semibold">
            Sustainable Bestsellers
          </h2>
          <Link
            to={"/shop"}
            className="flex items-center justify-center gap-3 px-6 py-2 transition-colors duration-300 border rounded-xl hover:border-green-800 hover:text-green-800"
          >
            View All Products{" "}
            <span>
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </section>
    );
  }

  if (error && products.length === 0) {
    return (
      <section className="py-20 px-30">
        <div className="px-3 py-1 mb-4 bg-green-700/20 rounded-2xl w-fit">
          Featured Products
        </div>
        <div className="flex items-center justify-between mb-7">
          <h2 className="mb-2 font-serif text-5xl font-semibold">
            Sustainable Bestsellers
          </h2>
          <Link
            to={"/shop"}
            className="flex items-center justify-center gap-3 px-6 py-2 transition-colors duration-300 border rounded-xl hover:border-green-800 hover:text-green-800"
          >
            View All Products{" "}
            <span>
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
        <div className="text-center py-10">
          <p className="text-gray-600">No featured products available yet.</p>
          <Link
            to={"/shop"}
            className="inline-block mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Browse All Products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-30">
      <div className="px-3 py-1 mb-4 bg-green-700/20 rounded-2xl w-fit">
        Featured Products
      </div>
      <div className="flex items-center justify-between mb-7">
        <h2 className="mb-2 font-serif text-5xl font-semibold">
          Sustainable Bestsellers
        </h2>
        <Link
          to={"/shop"}
          className="flex items-center justify-center gap-3 px-6 py-2 transition-colors duration-300 border rounded-xl hover:border-green-800 hover:text-green-800"
        >
          View All Products{" "}
          <span>
            <ArrowRight className="w-4 h-4" />
          </span>
        </Link>
      </div>
      
      {products.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600">No products found. Add some products from the admin dashboard!</p>
          <Link
            to={"/shop"}
            className="inline-block mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Go to Shop
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export default FeaturedProducts;