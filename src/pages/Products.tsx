import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, Star, Heart, ShoppingCart, ChevronLeft, ChevronRight, Grid3X3, List } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { useDebounce } from '../hooks/useDebounce';
import { usePincodeGuard } from '../hooks/usePincodeGuard';
import { PincodePromptModal } from '../components/common/PincodePromptModal';
import { categories } from '../data/mockData';

export const Products = () => {
  const [searchParams] = useSearchParams();
  const { products, filters, updateFilters, clearFilters, setSearchQuery, paginationInfo, goToPage } = useProducts();
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [localSearch, setLocalSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [addedToCart, setAddedToCart] = useState<string | null>(null);
  const { isPromptOpen, guardAction, handlePromptClose, handlePromptSuccess } = usePincodeGuard();
  const debouncedSearch = useDebounce(localSearch, 400);

  useEffect(() => {
    const cat = searchParams.get('category');
    const search = searchParams.get('search');
    if (cat) updateFilters({ category: cat });
    if (search) { setLocalSearch(search); setSearchQuery(search); }
  }, [searchParams]);

  useEffect(() => { setSearchQuery(debouncedSearch); }, [debouncedSearch]);

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'name': return a.name.localeCompare(b.name);
      default: return 0;
    }
  });

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart(product);
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 1500);
  };

  return (
    <div className="container-custom py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {filters.category ? categories.find(c => c.slug === filters.category)?.name || 'Products' : 'All Products'}
          </h1>
          <p className="text-gray-500 mt-1">{paginationInfo.totalItems} products found</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input type="text" value={localSearch} onChange={e => setLocalSearch(e.target.value)} placeholder="Search products..." className="input-field pl-10 pr-10" />
            {localSearch && <button onClick={() => { setLocalSearch(''); setSearchQuery(''); }} className="absolute right-3 top-2.5"><X className="h-5 w-5 text-gray-400 hover:text-gray-600" /></button>}
          </div>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="input-field w-auto pr-8 hidden sm:block">
            <option value="default">Sort by</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="name">Name A-Z</option>
          </select>
          <div className="hidden sm:flex border border-gray-300 rounded-lg overflow-hidden">
            <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}><Grid3X3 className="h-5 w-5" /></button>
            <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}><List className="h-5 w-5" /></button>
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className="md:hidden btn-secondary flex items-center gap-2 py-2 px-3"><SlidersHorizontal className="h-5 w-5" /> Filters</button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <aside className={`${showFilters ? 'fixed inset-0 z-50 bg-black/50 md:static md:bg-transparent' : 'hidden'} md:block md:w-64 flex-shrink-0`}>
          <div className={`${showFilters ? 'absolute right-0 top-0 h-full w-full max-w-sm bg-white p-6 overflow-y-auto shadow-xl' : ''} md:static md:p-0 md:shadow-none md:w-full`}>
            <div className="flex items-center justify-between mb-6 md:mb-4">
              <h3 className="font-bold text-lg text-gray-900">Filters</h3>
              <div className="flex items-center gap-2">
                {(filters.category || filters.minPrice || filters.maxPrice || filters.rating) && (
                  <button onClick={clearFilters} className="text-sm text-primary-600 hover:text-primary-700 font-medium">Clear All</button>
                )}
                <button onClick={() => setShowFilters(false)} className="md:hidden p-1"><X className="h-5 w-5" /></button>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Category</h4>
                <div className="space-y-2">
                  <button onClick={() => updateFilters({ category: undefined })} className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${!filters.category ? 'bg-primary-50 text-primary-700 font-medium' : 'hover:bg-gray-100 text-gray-600'}`}>All Categories</button>
                  {categories.map(cat => (
                    <button key={cat.id} onClick={() => updateFilters({ category: cat.slug })} className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${filters.category === cat.slug ? 'bg-primary-50 text-primary-700 font-medium' : 'hover:bg-gray-100 text-gray-600'}`}>
                      {cat.name} <span className="text-gray-400">({cat.productCount})</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Price Range</h4>
                <div className="flex items-center gap-2">
                  <input type="number" placeholder="Min" value={filters.minPrice || ''} onChange={e => updateFilters({ minPrice: e.target.value ? Number(e.target.value) : undefined })} className="input-field text-sm py-2" />
                  <span className="text-gray-400">-</span>
                  <input type="number" placeholder="Max" value={filters.maxPrice || ''} onChange={e => updateFilters({ maxPrice: e.target.value ? Number(e.target.value) : undefined })} className="input-field text-sm py-2" />
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Rating</h4>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map(r => (
                    <button key={r} onClick={() => updateFilters({ rating: filters.rating === r ? undefined : r })} className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm transition-colors ${filters.rating === r ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-100 text-gray-600'}`}>
                      <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className={`h-4 w-4 ${i < r ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />)}</div>
                      <span>& Up</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={filters.inStock || false} onChange={e => updateFilters({ inStock: e.target.checked || undefined })} className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500" />
                  <span className="text-sm text-gray-700 font-medium">In Stock Only</span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {sortedProducts.length === 0 ? (
            <div className="text-center py-20 animate-fade-in">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
              <button onClick={clearFilters} className="btn-primary">Clear All Filters</button>
            </div>
          ) : (
            <>
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                {sortedProducts.map((product, idx) => (
                  <div key={product.id} className={`card group animate-fade-in-up ${viewMode === 'list' ? 'flex flex-row' : ''}`} style={{ animationDelay: `${idx * 0.05}s` }}>
                    <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                      <Link to={`/products/${product.id}`}>
                        <img src={product.images[0]} alt={product.name} className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${viewMode === 'list' ? 'h-full' : 'h-56'}`} loading="lazy" />
                      </Link>
                      {product.originalPrice && (
                        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </span>
                      )}
                      <button onClick={() => toggleFavorite(product.id)} className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all hover:scale-110">
                        <Heart className={`h-5 w-5 transition-colors ${isFavorite(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                      </button>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <Link to={`/products/${product.id}`} className="font-semibold text-gray-900 hover:text-primary-600 transition-colors line-clamp-2 mb-1">
                        {product.name}
                      </Link>
                      <p className="text-sm text-gray-500 mb-2 line-clamp-2">{product.description}</p>
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />)}</div>
                        <span className="text-sm text-gray-500">({product.reviewCount})</span>
                      </div>
                      <div className="flex items-center gap-2 mb-3 mt-auto">
                        <span className="text-xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                        {product.originalPrice && <span className="text-sm text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>}
                      </div>
                      <button onClick={() => guardAction(() => handleAddToCart(product))} disabled={!product.inStock} className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium transition-all duration-300 ${addedToCart === product.id ? 'bg-green-600 text-white' : 'btn-primary'}`}>
                        <ShoppingCart className="h-4 w-4" />
                        {addedToCart === product.id ? 'Added!' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {paginationInfo.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <button onClick={() => goToPage(paginationInfo.currentPage - 1)} disabled={paginationInfo.currentPage === 1} className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  {[...Array(paginationInfo.totalPages)].map((_, i) => (
                    <button key={i} onClick={() => goToPage(i + 1)} className={`px-4 py-2 rounded-lg font-medium transition-colors ${paginationInfo.currentPage === i + 1 ? 'bg-primary-600 text-white' : 'border border-gray-300 hover:bg-gray-50'}`}>
                      {i + 1}
                    </button>
                  ))}
                  <button onClick={() => goToPage(paginationInfo.currentPage + 1)} disabled={paginationInfo.currentPage === paginationInfo.totalPages} className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {isPromptOpen && (
        <PincodePromptModal
          onClose={handlePromptClose}
          onSuccess={handlePromptSuccess}
        />
      )}
    </div>
  );
};
