"use client";

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Image as ImageIcon, Star, TrendingUp, Folder, X, Upload } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  position: number;
  is_active: boolean;
  created_at: string;
}

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
  created_at: string;
  updated_at: string;
}

interface DietaryTag {
  id: number;
  name: string;
}

type FormType = 'category' | 'menu-item' | null;

export default function Menus() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [dietaryTags, setDietaryTags] = useState<DietaryTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<FormType>(null);
  const [editingItem, setEditingItem] = useState<Category | MenuItem | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    position: 0,
    is_active: true,
    is_popular: false,
    is_featured: false,
    dietary_tags: [] as string[]
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [categoriesRes, menuItemsRes, dietaryRes] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/menu-items'),
        fetch('/api/dietary-tags')
      ]);

      const categoriesData = await categoriesRes.json();
      const menuItemsData = await menuItemsRes.json();
      const dietaryData = await dietaryRes.json();

      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
      setMenuItems(Array.isArray(menuItemsData) ? menuItemsData : []);
      setDietaryTags(Array.isArray(dietaryData) ? dietaryData : []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      image_url: '',
      position: 0,
      is_active: true,
      is_popular: false,
      is_featured: false,
      dietary_tags: []
    });
    setEditingItem(null);
    setShowForm(false);
    setFormType(null);
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData
      });

      const result = await response.json();
      if (response.ok) {
        setFormData({ ...formData, image_url: result.imagePath });
      } else {
        alert(result.error || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let url = '';
      let method = editingItem ? 'PUT' : 'POST';
      let payload: any = {};

      switch (formType) {
        case 'category':
          url = '/api/categories';
          payload = {
            id: (editingItem as Category)?.id,
            name: formData.name,
            position: formData.position,
            is_active: formData.is_active
          };
          break;
        
        case 'menu-item':
          url = '/api/menu-items';
          payload = {
            id: (editingItem as MenuItem)?.id,
            category_id: selectedCategory,
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            image_url: formData.image_url || null,
            is_popular: formData.is_popular,
            is_featured: formData.is_featured,
            is_active: formData.is_active,
            dietary_tags: formData.dietary_tags
          };
          break;
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        await fetchData();
        resetForm();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to save item');
      }
    } catch (error) {
      console.error('Error saving item:', error);
      alert('Failed to save item');
    }
  };

  const handleEdit = (item: Category | MenuItem, type: FormType) => {
    setEditingItem(item);
    setFormType(type);
    
    switch (type) {
      case 'category':
        const category = item as Category;
        setFormData({
          name: category.name,
          description: '',
          price: '',
          image_url: '',
          position: category.position,
          is_active: category.is_active,
          is_popular: false,
          is_featured: false,
          dietary_tags: []
        });
        break;
      
      case 'menu-item':
        const menuItem = item as MenuItem;
        setFormData({
          name: menuItem.name,
          description: menuItem.description || '',
          price: menuItem.price.toString(),
          image_url: menuItem.image_url || '',
          position: 0,
          is_active: menuItem.is_active,
          is_popular: menuItem.is_popular,
          is_featured: menuItem.is_featured,
          dietary_tags: menuItem.dietary_tags
        });
        setSelectedCategory(menuItem.category_id);
        break;
    }
    
    setShowForm(true);
  };

  const handleDelete = async (id: number, type: FormType) => {
    const typeNames = {
      category: 'category',
      'menu-item': 'menu item'
    };
    
    if (!confirm(`Are you sure you want to delete this ${typeNames[type || 'category']}?`)) return;

    try {
      let url = '';
      switch (type) {
        case 'category':
          url = `/api/categories?id=${id}`;
          break;
        case 'menu-item':
          url = `/api/menu-items?id=${id}`;
          break;
      }

      const response = await fetch(url, { method: 'DELETE' });

      if (response.ok) {
        await fetchData();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item');
    }
  };

  const openAddForm = (type: FormType, categoryId?: number) => {
    setFormType(type);
    setSelectedCategory(categoryId || null);
    setShowForm(true);
  };

  const handleDietaryTagChange = (tagName: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      dietary_tags: checked 
        ? [...prev.dietary_tags, tagName]
        : prev.dietary_tags.filter(tag => tag !== tagName)
    }));
  };

  const getFilteredMenuItems = () => {
    if (selectedCategory === null) {
      return menuItems;
    }
    return menuItems.filter(item => item.category_id === selectedCategory);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Restaurant Menu Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage menu categories and items with full CRUD operations
        </p>
      </div>

      {/* Category Cards */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Categories</h2>
          <button
            onClick={() => openAddForm('category')}
            className="flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer transition-all hover:shadow-lg ${
                selectedCategory === category.id ? 'ring-2 ring-amber-500' : ''
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="bg-amber-100 dark:bg-amber-900/20 p-2 rounded-lg">
                  <Folder className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(category, 'category');
                    }}
                    className="p-1 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-gray-700 rounded"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(category.id, 'category');
                    }}
                    className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                {category.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Position: {category.position}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {menuItems.filter(item => item.category_id === category.id).length} items
                </span>
                {!category.is_active && (
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100">
                    Inactive
                  </span>
                )}
              </div>
            </div>
          ))}

          {categories.length === 0 && (
            <div className="col-span-full text-center py-12">
              <Folder className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No categories found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Add your first category to get started
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Menu Items
            {selectedCategory && (
              <span className="ml-2 text-sm font-normal text-gray-500">
                in {categories.find(c => c.id === selectedCategory)?.name}
              </span>
            )}
          </h2>
          <div className="flex items-center space-x-2">
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Show All
              </button>
            )}
            <button
              onClick={() => openAddForm('menu-item', selectedCategory || undefined)}
              disabled={!selectedCategory}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Menu Item
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {getFilteredMenuItems().map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Item Image */}
              <div className="h-48 bg-gray-100 dark:bg-gray-700 relative">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                
                {/* Status Badges */}
                <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                  {item.is_featured === true && (
                    <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-amber-500 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </span>
                  )}
                  {item.is_popular === true && (
                    <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-blue-500 text-white">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Popular
                    </span>
                  )}
                  {item.is_active === false && (
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-500 text-white">
                      Inactive
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-2 right-2 flex items-center space-x-1">
                  <button
                    onClick={() => handleEdit(item, 'menu-item')}
                    className="p-1 bg-white/90 hover:bg-white text-gray-700 rounded"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, 'menu-item')}
                    className="p-1 bg-white/90 hover:bg-white text-red-600 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Item Details */}
              <div className="p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                  {item.description || 'No description'}
                </p>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-lg text-gray-900 dark:text-white">
                    ${typeof item.price === 'string' ? parseFloat(item.price).toFixed(2) : item.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {item.category_name}
                  </span>
                </div>

                {/* Dietary Tags */}
                {item.dietary_tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
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
              </div>
            </div>
          ))}

          {getFilteredMenuItems().length === 0 && (
            <div className="col-span-full text-center py-12">
              <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {selectedCategory ? 'No menu items in this category' : 'No menu items found'}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {selectedCategory 
                  ? 'Add your first menu item to this category'
                  : 'Select a category or add menu items to get started'
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                {editingItem ? `Edit ${formType}` : `Add New ${formType}`}
              </h3>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {formType === 'category' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Category Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 dark:bg-gray-700"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Position
                    </label>
                    <input
                      type="number"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 dark:bg-gray-700"
                    />
                  </div>
                </>
              )}

              {formType === 'menu-item' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Item Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 dark:bg-gray-700"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 dark:bg-gray-700"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Price ($) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 dark:bg-gray-700"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Image
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file);
                        }}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer text-sm"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {uploading ? 'Uploading...' : 'Choose Image'}
                      </label>
                      {formData.image_url && (
                        <span className="text-sm text-green-600">Image uploaded</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Dietary Tags
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {dietaryTags.map((tag) => (
                        <label key={tag.id} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.dietary_tags.includes(tag.name)}
                            onChange={(e) => handleDietaryTagChange(tag.name, e.target.checked)}
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{tag.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.is_popular}
                        onChange={(e) => setFormData({ ...formData, is_popular: e.target.checked })}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Popular</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.is_featured}
                        onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Featured</span>
                    </label>
                  </div>
                </>
              )}

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="mr-2"
                />
                <label className="text-sm text-gray-700 dark:text-gray-300">Active</label>
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                  disabled={uploading}
                >
                  {editingItem ? 'Update' : 'Create'} {formType}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}