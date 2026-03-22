import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, Star, ArrowRight } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';
import { useCart } from '../contexts/CartContext';
import { usePincodeGuard } from '../hooks/usePincodeGuard';
import { PincodePromptModal } from '../components/common/PincodePromptModal';
import { products } from '../data/mockData';

export const Favorites = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState<string | null>(null);
  const { isPromptOpen, guardAction, handlePromptClose, handlePromptSuccess } = usePincodeGuard();

  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart(product);
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 1500);
  };

  if (favoriteProducts.length === 0) {
    return (
      <div className="container-custom py-20 text-center animate-fade-in">
        <Heart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-gray-800 mb-3">No Favorites Yet</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">Start adding products you love to your favorites list. They'll show up here so you can easily find them later!</p>
        <Link to="/products" className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-3">
          Explore Products <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="container-custom py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Favorites</h1>
          <p className="text-gray-500 mt-1">{favoriteProducts.length} {favoriteProducts.length === 1 ? 'item' : 'items'} saved</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {favoriteProducts.map((product, idx) => (
          <div key={product.id} className="card group animate-fade-in-up" style={{ animationDelay: `${idx * 0.05}s` }}>
            <div className="relative overflow-hidden">
              <Link to={`/products/${product.id}`}>
                <img src={product.images[0]} alt={product.name} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              </Link>
              {product.originalPrice && (
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
              )}
              <button onClick={() => removeFromFavorites(product.id)} className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-red-50 transition-all hover:scale-110" aria-label="Remove from favorites">
                <Trash2 className="h-5 w-5 text-red-500" />
              </button>
            </div>
            <div className="p-4">
              <Link to={`/products/${product.id}`} className="font-semibold text-gray-900 hover:text-primary-600 transition-colors line-clamp-2 mb-1">{product.name}</Link>
              <div className="flex items-center gap-1 mb-2">
                <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />)}</div>
                <span className="text-sm text-gray-500">({product.reviewCount})</span>
              </div>
              <div className="flex items-center gap-2 mb-3">
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

      {isPromptOpen && (
        <PincodePromptModal
          onClose={handlePromptClose}
          onSuccess={handlePromptSuccess}
        />
      )}
    </div>
  );
};
