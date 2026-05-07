import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import Navbar from '../components/home/Navbar.jsx';
import Footer from '../components/home/Footer.jsx';
import api from '../api/axios.js';
import { useCart } from '../context/CartContext.jsx'; // Add cart context

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart(); // For adding to cart

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      // FIX: Remove /api from URL since axios already has baseURL
      const response = await api.get(`/products/${id}`);
      
      if (response.data.success) {
        setProduct(response.data.product);
        setSimilarProducts(response.data.similarProducts || []);
      }
    } catch (err) {
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      alert(`Added ${product.name} to cart!`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <p className="mt-2 text-gray-600">Loading product...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-gray-600">Product not found</p>
          <Link to="/shop" className="mt-4 text-green-600 hover:text-green-700">
            ← Back to Shop
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Fix image URL
  const getImageUrl = () => {
    if (!product.image) return 'http://localhost:3000/uploads/products/default.jpg';
    if (product.image.startsWith('http')) return product.image;
    return `http://localhost:3000${product.image}`;
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back button */}
        <Link to="/shop" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Shop
        </Link>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <img
              src={getImageUrl()}
              alt={product.name}
              className="w-full h-auto rounded-lg"
              onError={(e) => {
                e.target.src = 'http://localhost:3000/uploads/products/default.jpg';
              }}
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <p className="text-gray-600 mt-2">{product.brand}</p>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
              
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  product.ecoScore === 'A+' ? 'bg-emerald-100 text-emerald-800' :
                  product.ecoScore === 'A' ? 'bg-green-100 text-green-800' :
                  product.ecoScore === 'B' ? 'bg-blue-100 text-blue-800' :
                  product.ecoScore === 'C' ? 'bg-yellow-100 text-yellow-800' :
                  product.ecoScore === 'D' ? 'bg-orange-100 text-orange-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  EcoScore: {product.ecoScore}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  product.stock > 10 ? 'bg-green-100 text-green-800' :
                  product.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {product.stock} in stock
                </span>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Category</h3>
                <p className="text-gray-700">{product.category}</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Carbon Footprint</h3>
                <p className="text-gray-700">{product.carbonFootprint} kg CO₂</p>
              </div>
            </div>

            {product.materials && product.materials.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Materials</h3>
                <p className="text-gray-700">{product.materials.join(', ')}</p>
              </div>
            )}

            <button
              onClick={handleAddToCart}
              className="w-full md:w-auto flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-medium"
              disabled={product.stock === 0}
            >
              <ShoppingBag className="w-5 h-5" />
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((prod) => (
                <div key={prod.id} className="bg-white rounded-lg shadow-sm border p-4">
                  <img
                    src={prod.image ? `http://localhost:3000${prod.image}` : 'http://localhost:3000/uploads/products/default.jpg'}
                    alt={prod.name}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-semibold text-gray-900 truncate">{prod.name}</h3>
                  <p className="text-sm text-gray-600">{prod.brand}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="font-bold text-green-700">${prod.price}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      prod.ecoScore === 'A+' || prod.ecoScore === 'A' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {prod.ecoScore}
                    </span>
                  </div>
                  <Link 
                    to={`/product/${prod.id}`}
                    className="block text-center text-green-600 hover:text-green-700 text-sm mt-3"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default ProductDetail;