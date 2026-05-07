// components/shop/Filters.jsx
import { useState, useEffect } from 'react';
import api from '../../api/axios.js';

function Filters({ 
  selectedCategory, 
  selectedEcoScore,
  onCategoryChange, 
  onEcoScoreChange,
  categories = [] 
}) {
  const [localCategories, setLocalCategories] = useState(['All Categories']);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!categories || categories.length === 0) {
      fetchCategories();
    }
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await api.get('/products/categories/all');
      if (response.data.success) {
        setLocalCategories(['All Categories', ...response.data.categories]);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const displayCategories = categories.length > 0 ? 
    ['All Categories', ...categories] : 
    localCategories;

  // Eco score options
  const ecoScores = [
    { value: '', label: 'All Scores' },
    { value: 'A+', label: 'A+ (Best)' },
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
    { value: 'C', label: 'C' },
    { value: 'D', label: 'D' },
    { value: 'F', label: 'F (Worst)' }
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="font-semibold text-lg mb-4">Filters</h3>
      
      <div className="space-y-6">
        {/* Category Filter */}
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Category</h4>
          <div className="space-y-2">
            {loading ? (
              <div className="text-sm text-gray-500">Loading categories...</div>
            ) : (
              displayCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => onCategoryChange(cat)}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${
                    selectedCategory === cat
                      ? 'bg-green-100 text-green-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {cat}
                </button>
              ))
            )}
          </div>
        </div>
        
        {/* Eco Score Filter */}
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Eco Score</h4>
          <div className="space-y-2">
            {ecoScores.map((score) => (
              <button
                key={score.value}
                onClick={() => onEcoScoreChange(score.value)}
                className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-sm ${
                  selectedEcoScore === score.value
                    ? 'bg-green-50 text-green-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {score.value && (
                  <span className={`inline-block w-3 h-3 rounded-full ${
                    score.value === 'A+' ? 'bg-emerald-500' :
                    score.value === 'A' ? 'bg-green-500' :
                    score.value === 'B' ? 'bg-amber-500' :
                    score.value === 'C' ? 'bg-orange-500' :
                    score.value === 'D' ? 'bg-red-400' :
                    'bg-red-600'
                  }`}></span>
                )}
                <span>{score.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Clear Filters Button */}
        {(selectedCategory !== 'All Categories' || selectedEcoScore) && (
          <button
            onClick={() => {
              onCategoryChange('All Categories');
              onEcoScoreChange('');
            }}
            className="w-full text-sm text-red-600 hover:text-red-700 hover:bg-red-50 py-2 rounded-lg"
          >
            Clear All Filters
          </button>
        )}
      </div>
    </div>
  );
}

export default Filters;