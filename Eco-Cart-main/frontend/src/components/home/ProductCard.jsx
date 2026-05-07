import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import { ShoppingBag } from 'lucide-react';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    alert(`Added ${product.name} to cart!`);
  };

  // Ensure image URL is correct
  const getImageUrl = () => {
    if (!product.image) return 'http://localhost:3000/uploads/products/default.jpg';
    
    // If image doesn't start with http, add localhost
    if (!product.image.startsWith('http')) {
      return `http://localhost:3000${product.image}`;
    }
    
    return product.image;
  };

  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative">
          <img 
            src={getImageUrl()} 
            alt={product.name}
            className="w-full h-48 object-cover"
            onError={(e) => {
              console.error('❌ Image failed to load:', product.image);
              e.target.src = 'http://localhost:3000/uploads/products/default.jpg';
            }}
          />
          <div className="absolute top-2 right-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              product.ecoScore === 'A+' || product.ecoScore === 'A' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {product.ecoScore || 'C'}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
            <span className="font-bold text-green-700">${product.price}</span>
          </div>
          
          <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
          
          {product.materials && product.materials.length > 0 && (
            <div className="mb-3">
              <p className="text-xs text-gray-500 truncate">
                {product.materials.slice(0, 2).join(', ')}
              </p>
            </div>
          )}
          
          <button 
            onClick={handleAddToCart}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;