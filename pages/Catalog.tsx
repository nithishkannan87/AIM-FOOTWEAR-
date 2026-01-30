import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, ChevronDown, Check, X, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '../mockData';
import { ProductCard } from '../components/ProductCard';
import { Category, ProductType, SortOption } from '../types';

export const Catalog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  // Filter States
  const categoryParam = searchParams.get('category');
  const typeParam = searchParams.get('type');
  const searchParam = searchParams.get('search');
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>(categoryParam ? [categoryParam] : []);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(typeParam ? [typeParam] : []);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('recommended');

  // Sync params to state only on mount if present
  useEffect(() => {
    if (categoryParam && !selectedCategories.includes(categoryParam)) {
        setSelectedCategories([categoryParam]);
    }
     if (typeParam && !selectedTypes.includes(typeParam)) {
        setSelectedTypes([typeParam]);
    }
  }, [categoryParam, typeParam]);

  // Derive all unique sizes from products
  const allSizes = useMemo(() => {
      const sizes = new Set<number>();
      PRODUCTS.forEach(p => p.availableSizes.forEach(s => sizes.add(s)));
      return Array.from(sizes).sort((a, b) => a - b);
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchCat = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchType = selectedTypes.length === 0 || selectedTypes.includes(product.type);
      const matchPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchSize = selectedSizes.length === 0 || product.availableSizes.some(s => selectedSizes.includes(s));
      
      const matchSearch = !searchParam || 
        product.name.toLowerCase().includes(searchParam.toLowerCase()) || 
        product.description.toLowerCase().includes(searchParam.toLowerCase()) ||
        product.category.toLowerCase().includes(searchParam.toLowerCase());

      return matchCat && matchType && matchPrice && matchSearch && matchSize;
    }).sort((a, b) => {
      if (sortBy === 'priceLowHigh') return a.price - b.price;
      if (sortBy === 'priceHighLow') return b.price - a.price;
      return 0; // recommended uses default order
    });
  }, [selectedCategories, selectedTypes, priceRange, selectedSizes, sortBy, searchParam]);

  const toggleFilter = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setList(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const toggleSizeFilter = (size: number) => {
    setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedTypes([]);
    setSelectedSizes([]);
    setPriceRange([0, 3000]);
    setSearchParams({});
  };

  const pageTitle = searchParam 
    ? `Results for "${searchParam}"` 
    : categoryParam 
        ? `${categoryParam}'s Footwear` 
        : 'All Products';

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Breadcrumb */}
        <div className="flex items-center text-xs text-gray-500 mb-6">
            <Link to="/" className="hover:text-blue-900">Home</Link>
            <ChevronRight className="h-3 w-3 mx-1" />
            <span className="font-medium text-gray-900 truncate">{pageTitle}</span>
        </div>

        <div className="flex items-end justify-between border-b border-gray-200 pb-4 mb-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-tight">{pageTitle}</h1>
                <p className="text-sm text-gray-500 mt-1">{filteredProducts.length} Products</p>
            </div>
            
            <div className="flex items-center gap-4">
                {/* Mobile Filter Toggle */}
                <button 
                    className="lg:hidden flex items-center text-sm font-medium text-gray-700 border border-gray-300 px-3 py-2 rounded"
                    onClick={() => setIsMobileFiltersOpen(true)}
                >
                    <Filter className="h-4 w-4 mr-2" />
                    Refine
                </button>

                {/* Sort Dropdown */}
                <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-2 hidden sm:inline">Sort by:</span>
                    <select 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                        className="text-sm font-medium text-gray-900 border-none focus:ring-0 cursor-pointer bg-transparent py-0 pl-0 pr-8"
                    >
                        <option value="recommended">Recommended</option>
                        <option value="priceLowHigh">Price: Low to High</option>
                        <option value="priceHighLow">Price: High to Low</option>
                    </select>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-x-8">
            {/* Desktop Filters Sidebar */}
            <aside className="hidden lg:block space-y-8 pr-4">
                 {/* Applied Filters */}
                 {(selectedCategories.length > 0 || selectedTypes.length > 0 || selectedSizes.length > 0) && (
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                             <h3 className="text-xs font-bold text-gray-900 uppercase">Applied Filters</h3>
                             <button onClick={clearFilters} className="text-xs text-red-600 hover:underline">Clear All</button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {[...selectedCategories, ...selectedTypes, ...selectedSizes.map(s => `Size ${s}`)].map((f, i) => (
                                <span key={i} className="inline-flex items-center px-2 py-1 bg-gray-100 text-xs text-gray-800 rounded">
                                    {f}
                                    <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => {
                                        // Simple removal logic not strictly implemented for this visual MVP part to keep code concise
                                        if(typeof f === 'string' && selectedCategories.includes(f)) toggleFilter(selectedCategories, setSelectedCategories, f);
                                        // etc.
                                    }}/>
                                </span>
                            ))}
                        </div>
                    </div>
                 )}

                {/* Category Filter */}
                <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-sm font-bold text-gray-900 uppercase mb-4">Category</h3>
                    <div className="space-y-2">
                        {Object.values(Category).map((cat) => (
                            <div key={cat} className="flex items-center">
                                <input
                                    id={`filter-cat-${cat}`}
                                    type="checkbox"
                                    checked={selectedCategories.includes(cat)}
                                    onChange={() => toggleFilter(selectedCategories, setSelectedCategories, cat)}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-900 focus:ring-blue-900"
                                />
                                <label htmlFor={`filter-cat-${cat}`} className="ml-3 text-sm text-gray-600 hover:text-blue-900 cursor-pointer">{cat}</label>
                            </div>
                        ))}
                    </div>
                </div>

                 {/* Type Filter */}
                 <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-sm font-bold text-gray-900 uppercase mb-4">Product Type</h3>
                    <div className="space-y-2">
                        {Object.values(ProductType).map((type) => (
                            <div key={type} className="flex items-center">
                                <input
                                    id={`filter-type-${type}`}
                                    type="checkbox"
                                    checked={selectedTypes.includes(type)}
                                    onChange={() => toggleFilter(selectedTypes, setSelectedTypes, type)}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-900 focus:ring-blue-900"
                                />
                                <label htmlFor={`filter-type-${type}`} className="ml-3 text-sm text-gray-600 hover:text-blue-900 cursor-pointer">{type}</label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Size Filter */}
                 <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-sm font-bold text-gray-900 uppercase mb-4">Size (UK/India)</h3>
                    <div className="grid grid-cols-4 gap-2">
                        {allSizes.map((size) => (
                            <button
                                key={size}
                                onClick={() => toggleSizeFilter(size)}
                                className={`text-xs py-2 border rounded text-center transition-colors ${selectedSizes.includes(size) ? 'bg-blue-900 text-white border-blue-900' : 'text-gray-600 border-gray-200 hover:border-gray-400'}`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Price Filter */}
                <div className="border-t border-gray-200 pt-6">
                     <h3 className="text-sm font-bold text-gray-900 uppercase mb-4">Price</h3>
                     <div className="px-1">
                        <input 
                            type="range" 
                            min="0" 
                            max="3000" 
                            step="100"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-900"
                        />
                        <div className="flex justify-between mt-3 text-xs font-medium text-gray-900">
                            <span>₹0</span>
                            <span>Max: ₹{priceRange[1]}</span>
                        </div>
                     </div>
                </div>
            </aside>
            
            {/* Mobile Filter Drawer */}
            {isMobileFiltersOpen && (
                <div className="fixed inset-0 z-50 flex lg:hidden">
                    <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileFiltersOpen(false)} />
                    <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-xl flex flex-col">
                         <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900 uppercase">Refine Matches</h2>
                            <button onClick={() => setIsMobileFiltersOpen(false)}><X className="h-6 w-6 text-gray-500" /></button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-6">
                             {/* Mobile filters same logic */}
                             <div>
                                <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase">Category</h3>
                                {Object.values(Category).map(cat => (
                                    <div key={cat} className="flex items-center mb-2">
                                        <input type="checkbox" checked={selectedCategories.includes(cat)} onChange={() => toggleFilter(selectedCategories, setSelectedCategories, cat)} className="h-5 w-5 rounded border-gray-300 text-blue-900"/>
                                        <label className="ml-3 text-sm text-gray-700">{cat}</label>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t pt-4">
                                <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase">Type</h3>
                                {Object.values(ProductType).map(type => (
                                    <div key={type} className="flex items-center mb-2">
                                        <input type="checkbox" checked={selectedTypes.includes(type)} onChange={() => toggleFilter(selectedTypes, setSelectedTypes, type)} className="h-5 w-5 rounded border-gray-300 text-blue-900"/>
                                        <label className="ml-3 text-sm text-gray-700">{type}</label>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t pt-4">
                                <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase">Price Max: ₹{priceRange[1]}</h3>
                                <input type="range" min="0" max="3000" step="100" value={priceRange[1]} onChange={(e) => setPriceRange([0, parseInt(e.target.value)])} className="w-full accent-blue-900"/>
                            </div>
                        </div>
                        <div className="p-4 border-t border-gray-100">
                            <button onClick={() => { clearFilters(); setIsMobileFiltersOpen(false); }} className="w-full bg-gray-100 text-gray-800 py-3 rounded-none font-bold text-sm uppercase mb-2">Clear All</button>
                            <button onClick={() => setIsMobileFiltersOpen(false)} className="w-full bg-blue-900 text-white py-3 rounded-none font-bold text-sm uppercase">View {filteredProducts.length} Items</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Product Grid */}
            <main>
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-32 bg-gray-50 rounded-lg">
                        <p className="text-gray-500 text-lg mb-4">No products found matching your selection.</p>
                        <button onClick={clearFilters} className="text-blue-900 font-bold hover:underline">Clear all filters</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </main>
        </div>
      </div>
    </div>
  );
};