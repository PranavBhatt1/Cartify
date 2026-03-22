import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Search, Menu, X, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import { usePincode } from '../../contexts/PincodeContext';
import { categories } from '../../data/mockData';
import { normalizePincodeInput } from '../../utils/pincode';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPincodeOpen, setIsPincodeOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [pincodeInput, setPincodeInput] = useState('');
  const [pincodeError, setPincodeError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const { favorites } = useFavorites();
  const { pincode, setPincode, clearPincode } = usePincode();
  const selectedCategory = new URLSearchParams(location.search).get('category');
  const isProductsSection = location.pathname.startsWith('/products');
  const isAllProductsActive = isProductsSection && !selectedCategory;
  const isCategoryActive = (slug: string) => isProductsSection && selectedCategory === slug;

  useEffect(() => {
    setPincodeInput(pincode);
  }, [pincode]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = setPincode(pincodeInput);
    if (!result.success) {
      setPincodeError(result.error || 'Please enter a valid pincode');
      return;
    }
    setPincodeError('');
    setIsPincodeOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-primary-600 via-primary-700 to-indigo-700 shadow-lg sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="text-2xl font-bold text-white hover:text-yellow-300 transition-all duration-300 hover:scale-105">
            Cartify
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full pl-10 pr-4 py-2.5 bg-white/95 backdrop-blur-sm border-2 border-white/20 rounded-xl focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 outline-none transition-all shadow-md"
              />
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
            </div>
          </form>

          <div className="flex items-center gap-2">
            <div className="relative hidden lg:block">
              <button
                onClick={() => {
                  setPincodeError('');
                  setIsPincodeOpen(prev => !prev);
                }}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-all duration-300"
                aria-label="Set delivery pincode"
              >
                <MapPin className="h-5 w-5 text-yellow-300" />
                <span className="text-sm font-medium">{pincode ? `Deliver to ${pincode}` : 'Set Pincode'}</span>
              </button>

              {isPincodeOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-50">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Delivery Pincode</p>
                  <form onSubmit={handlePincodeSubmit} className="space-y-3">
                    <input
                      type="text"
                      value={pincodeInput}
                      onChange={(e) => {
                        setPincodeInput(normalizePincodeInput(e.target.value));
                        setPincodeError('');
                      }}
                      placeholder="Enter 6-digit pincode"
                      maxLength={6}
                      className={`w-full px-3 py-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-primary-500 ${
                        pincodeError ? 'border-red-400' : 'border-gray-300'
                      }`}
                    />
                    {pincodeError && <p className="text-xs text-red-600">{pincodeError}</p>}
                    <div className="flex items-center gap-2">
                      <button type="submit" className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
                        Save
                      </button>
                      {pincode && (
                        <button
                          type="button"
                          onClick={() => {
                            clearPincode();
                            setPincodeError('');
                          }}
                          className="text-sm text-gray-500 hover:text-gray-700"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              )}
            </div>

            <Link
              to="/favorites"
              className="relative p-2.5 hover:bg-white/20 rounded-xl transition-all duration-300 group"
              aria-label="Favorites"
            >
              <Heart className="h-6 w-6 text-white group-hover:text-yellow-300 transition-colors" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md animate-pulse-slow">
                  {favorites.length}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="relative p-2.5 hover:bg-white/20 rounded-xl transition-all duration-300 group"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-6 w-6 text-white group-hover:text-yellow-300 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md animate-pulse-slow">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative group hidden sm:block">
                <button className="flex items-center gap-2 px-3 py-2 hover:bg-white/20 rounded-xl transition-all duration-300">
                  <User className="h-6 w-6 text-white" />
                  <span className="text-sm font-medium text-white">{user.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:block bg-yellow-400 text-gray-900 px-6 py-2 rounded-xl font-bold hover:bg-yellow-300 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Login
              </Link>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2.5 hover:bg-white/20 rounded-xl transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
            </button>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1 py-3 border-t border-white/20">
          <Link
            to="/products"
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              isAllProductsActive
                ? 'bg-yellow-400 text-gray-900 shadow-md'
                : 'text-white hover:bg-white/20 hover:text-yellow-300'
            }`}
          >
            All Products
          </Link>
          {categories.slice(0, 6).map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.slug}`}
              className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                isCategoryActive(category.slug)
                  ? 'bg-yellow-400 text-gray-900 shadow-md font-medium'
                  : 'text-white/90 hover:bg-white/20 hover:text-white'
              }`}
            >
              {category.name}
            </Link>
          ))}
        </nav>

        {isMenuOpen && (
          <div className="md:hidden pt-4 border-t border-white/20 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 max-h-[78vh] overflow-y-auto">
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for products..."
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                </div>
              </form>

              <div className="mb-4 rounded-xl bg-primary-50 border border-primary-100 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary-700 mb-2">Delivery Pincode</p>
                <form onSubmit={handlePincodeSubmit} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={pincodeInput}
                    onChange={(e) => {
                      setPincodeInput(normalizePincodeInput(e.target.value));
                      setPincodeError('');
                    }}
                    placeholder="6-digit pincode"
                    maxLength={6}
                    className={`flex-1 px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500 ${
                      pincodeError ? 'border-red-400' : 'border-primary-200'
                    }`}
                  />
                  <button type="submit" className="px-3 py-2 rounded-lg text-sm font-medium bg-primary-600 text-white">
                    Save
                  </button>
                </form>
                {pincodeError && <p className="text-xs text-red-600 mt-2">{pincodeError}</p>}
                {pincode && (
                  <button
                    onClick={() => {
                      clearPincode();
                      setPincodeError('');
                    }}
                    className="text-xs text-primary-700 mt-2"
                  >
                    Clear current pincode ({pincode})
                  </button>
                )}
              </div>
              
              <div className="space-y-1">
                <Link
                  to="/products"
                  className={`block py-2.5 px-3 rounded-xl text-sm font-semibold transition-colors ${
                    isAllProductsActive
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'text-gray-800 hover:text-primary-700 hover:bg-primary-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  All Products
                </Link>
                {categories.slice(0, 6).map((category) => (
                  <Link
                    key={category.id}
                    to={`/products?category=${category.slug}`}
                    className={`block py-2.5 px-3 rounded-xl text-sm transition-colors ${
                      isCategoryActive(category.slug)
                        ? 'bg-yellow-100 text-yellow-800 font-semibold'
                        : 'text-gray-700 hover:text-primary-700 hover:bg-primary-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
                
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      className="block py-2.5 px-3 rounded-xl text-sm font-medium text-gray-700 hover:text-primary-700 hover:bg-primary-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block py-2.5 px-3 rounded-xl text-sm font-medium text-gray-700 hover:text-primary-700 hover:bg-primary-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left py-2.5 px-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="block py-2.5 px-3 rounded-xl text-sm font-semibold text-primary-700 hover:bg-primary-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
