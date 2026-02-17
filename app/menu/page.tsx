"use client";

import { useState, useEffect } from 'react';
import { Search, Filter, ShoppingCart, Plus, Minus, X, Star, TrendingUp, ChevronDown } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface MenuItem {
  id: number;
  category_id: number;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  is_popular: boolean;
  is_featured: boolean;
  is_active: boolean;
  dietary_tags: string[];
  category_name: string;
}

interface Category {
  id: number;
  name: string;
  position: number;
  is_active: boolean;
}

interface CartItem extends MenuItem {
  quantity: number;
}

export default function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedDietaryTags, setSelectedDietaryTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart, getTotalItems, showToast } = useCart();

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item);
    showToast(`Added ${item.name} to your cart!`);
  };

  useEffect(() => {
    fetchMenuData();
  }, []);

  const fetchMenuData = async () => {
    try {
      const [menuRes, categoriesRes] = await Promise.all([
        fetch('/api/menu-items'),
        fetch('/api/categories')
      ]);

      const menuData = await menuRes.json();
      const categoriesData = await categoriesRes.json();

      setMenuItems(Array.isArray(menuData) ? menuData : []);
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
    } catch (error) {
      console.error('Error fetching menu data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAllDietaryTags = () => {
    const tags = new Set<string>();
    menuItems.forEach(item => {
      item.dietary_tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  };

  const filteredMenuItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || item.category_id === selectedCategory;
    const matchesDietary = selectedDietaryTags.length === 0 || 
                          selectedDietaryTags.some(tag => item.dietary_tags.includes(tag));
    
    return matchesSearch && matchesCategory && matchesDietary && item.is_active;
  });

  const groupedMenuItems = categories.reduce((acc, category) => {
    const categoryItems = filteredMenuItems.filter(item => item.category_id === category.id);
    if (categoryItems.length > 0) {
      acc[category.name] = categoryItems;
    }
    return acc;
  }, {} as Record<string, MenuItem[]>);

  const toggleDietaryTag = (tag: string) => {
    setSelectedDietaryTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Menu</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Explore our delicious offerings crafted with the finest ingredients
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar with Filter Button */}
          <div className="flex gap-4 items-center max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                showFilters || selectedCategory || selectedDietaryTags.length > 0
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {(selectedCategory || selectedDietaryTags.length > 0) && (
                <span className="ml-2 bg-white/20 px-2 py-1 rounded-full text-xs">
                  {[selectedCategory ? 1 : 0, selectedDietaryTags.length].reduce((a, b) => a + b, 0)}
                </span>
              )}
              <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Expandable Filter Panel */}
          {showFilters && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === null
                        ? 'bg-amber-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-amber-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dietary Tags Filter */}
              {getAllDietaryTags().length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Dietary Preferences</h3>
                  <div className="flex flex-wrap gap-2">
                    {getAllDietaryTags().map(tag => (
                      <button
                        key={tag}
                        onClick={() => toggleDietaryTag(tag)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          selectedDietaryTags.includes(tag)
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Clear Filters */}
              {(selectedCategory || selectedDietaryTags.length > 0) && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setSelectedDietaryTags([]);
                    }}
                    className="text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Menu Items by Category */}
        {Object.keys(groupedMenuItems).length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              No menu items found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedMenuItems).map(([categoryName, items]) => (
              <div key={categoryName}>
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
                  <span className="bg-amber-100 dark:bg-amber-900/30 px-4 py-2 rounded-lg">
                    {categoryName}
                  </span>
                  <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">
                    ({items.length} items)
                  </span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {items.map(item => (
                    <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow flex flex-col h-full">
                      {/* Item Image */}
                      <div className="h-48 bg-gray-100 dark:bg-gray-700 relative flex-shrink-0">
                        {item.image_url ? (
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                            <div className="text-gray-400 text-center">
                              <div className="text-4xl mb-2">🍽️</div>
                              <p className="text-sm">No Image</p>
                            </div>
                          </div>
                        )}
                        
                        {/* Status Badges */}
                        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                          {item.is_featured && (
                            <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-amber-500 text-white">
                              <Star className="w-3 h-3 mr-1" />
                              Featured
                            </span>
                          )}
                          {item.is_popular && (
                            <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-blue-500 text-white">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Popular
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Item Details */}
                      <div className="p-4 flex flex-col flex-1">
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2 flex-grow">
                          {item.description || 'No description available'}
                        </p>
                        
                        {/* Dietary Tags */}
                        {item.dietary_tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {item.dietary_tags.map((tag, index) => (
                              <span
                                key={index}
                                className="inline-flex px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Price and Add to Cart */}
                        <div className="flex items-center justify-between mt-auto">
                          <span className="font-bold text-xl text-gray-900 dark:text-white">
                            ${item.price.toFixed(2)}
                          </span>
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="flex items-center px-3 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm"
                          >
                            <ShoppingCart className="w-4 h-4 mr-1" />
                            Order
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}