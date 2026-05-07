import { useState, useEffect } from 'react';
import { X, Upload, Calculator } from 'lucide-react';
import api from '../../api/axios.js';

// Carbon emission factors (kg CO2e per kg of material)
const MATERIAL_FACTORS = {
  cotton: 5.0,
  polyester: 9.0,
  wool: 20.0,
  nylon: 7.0,
  leather: 17.0,
  plastic: 3.5,
  glass: 1.0,
  aluminium: 8.0,
  steel: 2.0,
  wood: 0.5,
  paper: 1.1,
  rubber: 3.2,
  other: 4.0,
};

// Transport emission factors (kg CO2e per kg per km)
const TRANSPORT_FACTORS = {
  air: 0.0011,
  sea: 0.00015,
  road: 0.00025,
  rail: 0.00004,
};

const TRANSPORT_LABELS = {
  air: 'Air (~10,000 km)',
  sea: 'Sea (~15,000 km)',
  road: 'Road (~1,000 km)',
  rail: 'Rail (~2,000 km)',
};

const TRANSPORT_KM = {
  air: 10000,
  sea: 15000,
  road: 1000,
  rail: 2000,
};

function ProductForm({ product, onClose, onSave }) {
  const [productData, setProductData] = useState({
    name: '',
    brand: '',
    description: '',
    price: '',
    category: 'Clothing',
    carbonFootprint: '',
    stock: '10',
    materials: ''
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Carbon calculator state
  const [showCalculator, setShowCalculator] = useState(false);
  const [calcWeight, setCalcWeight] = useState('');
  const [calcMaterial, setCalcMaterial] = useState('cotton');
  const [calcTransport, setCalcTransport] = useState('sea');
  const [calcResult, setCalcResult] = useState(null);

  useEffect(() => {
    if (product) {
      setProductData({
        name: product.name || '',
        brand: product.brand || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        category: product.category || 'Clothing',
        carbonFootprint: product.carbonFootprint?.toString() || '',
        stock: product.stock?.toString() || '10',
        materials: product.materials?.join(', ') || ''
      });
      if (product.image) {
        setImagePreview(product.image);
      }
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('Please select an image file'); return; }
    if (file.size > 5 * 1024 * 1024) { setError('Image size should be less than 5MB'); return; }
    setImageFile(file);
    setError('');
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => { setImageFile(null); setImagePreview(''); };

  // Carbon calculator logic
  const handleCalculate = () => {
    const weightKg = parseFloat(calcWeight);
    if (!weightKg || weightKg <= 0) return;
    const materialFactor = MATERIAL_FACTORS[calcMaterial] || MATERIAL_FACTORS.other;
    const transportFactor = TRANSPORT_FACTORS[calcTransport];
    const transportKm = TRANSPORT_KM[calcTransport];
    const materialEmission = weightKg * materialFactor;
    const transportEmission = weightKg * transportFactor * transportKm;
    const total = materialEmission + transportEmission;
    setCalcResult({
      material: materialEmission.toFixed(2),
      transport: transportEmission.toFixed(2),
      total: total.toFixed(2),
    });
  };

  const applyCalculatedValue = () => {
    if (!calcResult) return;
    setProductData(prev => ({ ...prev, carbonFootprint: calcResult.total }));
    setShowCalculator(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const price = parseFloat(productData.price);
      const carbonFootprint = parseFloat(productData.carbonFootprint);
      const stock = parseInt(productData.stock);
      if (isNaN(price)) throw new Error('Price must be a valid number');
      if (isNaN(carbonFootprint)) throw new Error('Carbon footprint must be a valid number');
      if (isNaN(stock)) throw new Error('Stock must be a valid number');

      const formDataToSend = new FormData();
      formDataToSend.append('name', productData.name.trim());
      formDataToSend.append('brand', productData.brand.trim());
      formDataToSend.append('price', price.toString());
      formDataToSend.append('category', productData.category);
      formDataToSend.append('carbonFootprint', carbonFootprint.toString());
      formDataToSend.append('stock', stock.toString());
      formDataToSend.append('description', productData.description.trim());
      formDataToSend.append('materials', productData.materials.trim());
      if (imageFile) formDataToSend.append('image', imageFile);

      let response;
      if (product) {
        response = await api.put(`/admin/products/${product._id}`, formDataToSend, { headers: { 'Content-Type': 'multipart/form-data' } });
      } else {
        response = await api.post('/admin/products', formDataToSend, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      console.log('Success!', response.data);
      onSave();
      onClose();
    } catch (err) {
      console.error('Error:', err);
      let errorMessage = 'Failed to save product';
      if (err.response?.data?.message) errorMessage = err.response.data.message;
      else if (err.message) errorMessage = err.message;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b bg-white">
          <h2 className="text-xl font-bold">{product ? 'Edit Product' : 'Add New Product'}</h2>
          <button type="button" onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600" disabled={loading}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">
              <strong>Error:</strong> {error}
            </div>
          )}

          {/* Image Upload */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Product Image</label>
            <div className="flex flex-col gap-4">
              <div className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                {imagePreview ? (
                  <div className="relative w-full h-full">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <button type="button" onClick={removeImage} className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-full cursor-pointer hover:bg-gray-50">
                    <Upload className="w-12 h-12 text-gray-400 mb-2" />
                    <p className="text-gray-600">Click to upload image</p>
                    <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                )}
              </div>
              {!imagePreview && <p className="text-sm text-gray-500">If no image is selected, a default image will be used.</p>}
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Product Name *</label>
              <input type="text" name="name" value={productData.name} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required disabled={loading} />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Brand *</label>
              <input type="text" name="brand" value={productData.brand} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required disabled={loading} />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Price ($) *</label>
              <input type="number" name="price" value={productData.price} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" min="0" step="0.01" required disabled={loading} placeholder="29.99" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Stock *</label>
              <input type="number" name="stock" value={productData.stock} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" min="0" required disabled={loading} placeholder="10" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Category *</label>
              <select name="category" value={productData.category} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required disabled={loading}>
                <option value="Clothing">Clothing</option>
                <option value="Electronics">Electronics</option>
                <option value="Home">Home</option>
                <option value="Beauty">Beauty</option>
                <option value="Food">Food</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Carbon Footprint (kg) *</label>
              <input type="number" name="carbonFootprint" value={productData.carbonFootprint} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" min="0" step="0.1" required disabled={loading} placeholder="2.5" />
              <p className="mt-1 text-xs text-gray-500">Values are approximate and rounded.</p>
            </div>
          </div>

          {/* ── Carbon Footprint Calculator ── */}
          <div className="rounded-lg border border-green-200 bg-green-50 overflow-hidden">
            <button
              type="button"
              onClick={() => { setShowCalculator(v => !v); setCalcResult(null); }}
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-green-800 hover:bg-green-100 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                Carbon Footprint Calculator
              </span>
              <span className="text-green-600 text-xs font-normal">
                {showCalculator ? '▲ Hide' : '▼ Use calculator to estimate'}
              </span>
            </button>

            {showCalculator && (
              <div className="px-4 pb-4 space-y-4">
                <p className="text-xs text-green-700">
                  Enter the product weight, primary material, and shipping method to estimate its carbon footprint. You can then apply the result directly to the field above.
                </p>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  <div>
                    <label className="block mb-1 text-xs font-medium text-gray-700">Product Weight (kg)</label>
                    <input
                      type="number"
                      value={calcWeight}
                      onChange={e => setCalcWeight(e.target.value)}
                      min="0"
                      step="0.01"
                      placeholder="e.g. 0.2"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-xs font-medium text-gray-700">Primary Material</label>
                    <select
                      value={calcMaterial}
                      onChange={e => setCalcMaterial(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                      {Object.keys(MATERIAL_FACTORS).map(m => (
                        <option key={m} value={m}>{m.charAt(0).toUpperCase() + m.slice(1)}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block mb-1 text-xs font-medium text-gray-700">Transport Method</label>
                    <select
                      value={calcTransport}
                      onChange={e => setCalcTransport(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                      {Object.entries(TRANSPORT_LABELS).map(([k, v]) => (
                        <option key={k} value={k}>{v}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCalculate}
                  disabled={!calcWeight || parseFloat(calcWeight) <= 0}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Calculate
                </button>

                {calcResult && (
                  <div className="rounded-lg border border-green-300 bg-white p-4 space-y-2">
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Breakdown</p>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-green-50 rounded p-2">
                        <p className="text-xs text-gray-500">Material</p>
                        <p className="font-bold text-green-700">{calcResult.material} kg</p>
                      </div>
                      <div className="bg-blue-50 rounded p-2">
                        <p className="text-xs text-gray-500">Transport</p>
                        <p className="font-bold text-blue-700">{calcResult.transport} kg</p>
                      </div>
                      <div className="bg-gray-100 rounded p-2">
                        <p className="text-xs text-gray-500">Total CO₂e</p>
                        <p className="font-bold text-gray-800">{calcResult.total} kg</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={applyCalculatedValue}
                      className="w-full mt-2 px-4 py-2 text-sm font-medium text-green-700 border border-green-500 rounded-lg hover:bg-green-50 transition-colors"
                    >
                      ✓ Apply {calcResult.total} kg to Carbon Footprint field
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Materials */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Materials</label>
            <input
              type="text"
              name="materials"
              value={productData.materials}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Cotton, Recycled plastic, etc. (separate with commas)"
              disabled={loading}
            />
            <p className="mt-1 text-xs text-gray-500">Separate materials with commas</p>
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={productData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Product description..."
              disabled={loading}
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled={loading}>
              Cancel
            </button>
            <button type="submit" disabled={loading} className="px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2">
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : product ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
