import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, TrendingUp, Star, Heart, Truck, ShieldCheck, Headphones, Clock, Send, Quote } from 'lucide-react';
import { categories, featuredProducts, trendingProducts, products } from '../data/mockData';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { PincodePromptModal } from '../components/common/PincodePromptModal';
import { usePincodeGuard } from '../hooks/usePincodeGuard';
import type { Product } from '../types';

const testimonials = [
  { name: 'Anita Desai', location: 'Mumbai', rating: 5, text: 'Absolutely love shopping here! The product quality is exceptional and delivery is always on time. My go-to for electronics and fashion.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
  { name: 'Rajesh Kumar', location: 'Delhi', rating: 5, text: 'Great prices and authentic products. The customer service is top-notch. I have been shopping here for over a year now and never been disappointed.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
  { name: 'Priya Nair', location: 'Bangalore', rating: 4, text: 'Wide selection and easy returns. The website is very user-friendly and the checkout process is seamless. Highly recommend to everyone!', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
];

export const Home = () => {
  const { addToCart } = useCart();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [addedId, setAddedId] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { isPromptOpen, guardAction, handlePromptClose, handlePromptSuccess } = usePincodeGuard();
  const favoriteProducts = products.filter((product) => favorites.includes(product.id)).slice(0, 10);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.includes('@')) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="min-h-screen animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100 text-slate-900 py-24 overflow-hidden border-b border-sky-200/80">
        <div className="absolute inset-0 opacity-80">
          <div className="absolute -top-6 left-8 w-72 h-72 bg-sky-300/70 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300/60 rounded-full blur-3xl" />
          <div className="absolute top-24 right-1/3 w-64 h-64 bg-indigo-200/50 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-white/70 backdrop-blur-sm text-sky-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6 animate-fade-in-up shadow-sm border border-white/70">
                New Arrivals Are Here
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in-up stagger-1">
                Welcome to <span className="text-primary-700">Cartify</span>
              </h1>
              <p className="text-xl mb-8 text-slate-600 leading-relaxed animate-fade-in-up stagger-2">
                Explore 10,000+ products across 8 categories. From trending electronics to fashion essentials — all at unbeatable prices.
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-in-up stagger-3">
                <Link to="/products" className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-sky-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-primary-700 hover:to-sky-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                  Shop Now <ArrowRight className="h-5 w-5" />
                </Link>
                <Link to="/about" className="inline-flex items-center gap-2 border-2 border-sky-300 text-sky-900 px-8 py-4 rounded-xl font-semibold hover:bg-white/60 transition-all duration-300">
                  Learn More
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-10 animate-fade-in-up stagger-4">
                <div><p className="text-2xl sm:text-3xl font-bold text-slate-900">50K+</p><p className="text-xs sm:text-sm text-slate-500">Happy Customers</p></div>
                <div><p className="text-2xl sm:text-3xl font-bold text-slate-900">10K+</p><p className="text-xs sm:text-sm text-slate-500">Products</p></div>
                <div><p className="text-2xl sm:text-3xl font-bold text-slate-900">500+</p><p className="text-xs sm:text-sm text-slate-500">Cities</p></div>
              </div>
            </div>
            <div className="hidden lg:block">
              <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=500&fit=crop" alt="Shopping" className="rounded-2xl shadow-2xl ring-4 ring-white/70 rotate-2 hover:rotate-0 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: 'Free Shipping', desc: 'On orders over ₹999' },
              { icon: ShieldCheck, title: 'Secure Payment', desc: '100% protected' },
              { icon: Clock, title: 'Easy Returns', desc: '30-day return policy' },
              { icon: Headphones, title: '24/7 Support', desc: 'Always here to help' },
            ].map((item, idx) => (
              <div key={item.title} className="flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="p-3 bg-primary-50 rounded-xl"><item.icon className="h-6 w-6 text-primary-600" /></div>
                <div><p className="font-semibold text-gray-900 text-sm">{item.title}</p><p className="text-xs text-gray-500">{item.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Shop by Category</h2>
            <p className="text-gray-500 max-w-lg mx-auto">Browse our wide selection of products organized by category to find exactly what you need.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.slice(0, 8).map((category, idx) => (
              <Link key={category.id} to={`/products?category=${category.slug}`} className="card group overflow-hidden animate-fade-in-up" style={{ animationDelay: `${idx * 0.05}s` }}>
                <div className="aspect-square overflow-hidden">
                  <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-primary-600 transition-colors">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.productCount} products</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Deal Banner */}
      <section className="py-12 bg-gradient-to-r from-orange-500 to-pink-500 text-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">Limited Time Offer</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-3">Up to 50% Off on Electronics</h2>
              <p className="text-white/80 mt-2">Grab the best deals before they're gone. Free shipping on all orders!</p>
            </div>
            <Link to="/products?category=electronics" className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold hover:bg-orange-50 transition-colors shadow-lg whitespace-nowrap">
              Shop Deals
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <Star className="h-8 w-8 text-yellow-500 fill-yellow-500" />
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
                <p className="text-gray-500 text-sm mt-1">Hand-picked bestsellers just for you</p>
              </div>
            </div>
            <Link to="/products" className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2 hover:gap-3 transition-all">
              View All <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, idx) => (
              <div key={product.id} className="card group hover:shadow-lg transition-shadow duration-300 animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <Link to={`/products/${product.id}`} className="block">
                  <div className="aspect-square overflow-hidden rounded-t-lg relative">
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                    {product.originalPrice && (
                      <div className="absolute top-3 right-3 bg-red-500 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-md">
                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                      </div>
                    )}
                    <button onClick={(e) => { e.preventDefault(); toggleFavorite(product.id); }} className="absolute top-3 left-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:scale-110 transition-all">
                      <Heart className={`h-5 w-5 ${isFavorite(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
                    </button>
                  </div>
                </Link>
                <div className="p-4">
                  <Link to={`/products/${product.id}`}>
                    <h3 className="font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors line-clamp-2">{product.name}</h3>
                  </Link>
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />)}</div>
                    <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                    {product.originalPrice && <span className="text-sm text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>}
                  </div>
                  <button onClick={() => guardAction(() => handleAddToCart(product))} className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium transition-all duration-300 ${addedId === product.id ? 'bg-green-600 text-white' : 'btn-primary'}`}>
                    <ShoppingBag className="h-4 w-4" />
                    {addedId === product.id ? 'Added!' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-primary-600" />
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Trending Now</h2>
                <p className="text-gray-500 text-sm mt-1">What everyone is buying right now</p>
              </div>
            </div>
            <Link to="/products" className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2 hover:gap-3 transition-all">
              View All <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product, idx) => (
              <div key={product.id} className="card group hover:shadow-lg transition-shadow duration-300 animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <Link to={`/products/${product.id}`} className="block">
                  <div className="aspect-square overflow-hidden rounded-t-lg relative">
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                    {product.originalPrice && (
                      <div className="absolute top-3 right-3 bg-red-500 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-md">
                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                      </div>
                    )}
                    <button onClick={(e) => { e.preventDefault(); toggleFavorite(product.id); }} className="absolute top-3 left-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:scale-110 transition-all">
                      <Heart className={`h-5 w-5 ${isFavorite(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
                    </button>
                  </div>
                </Link>
                <div className="p-4">
                  <Link to={`/products/${product.id}`}>
                    <h3 className="font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors line-clamp-2">{product.name}</h3>
                  </Link>
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />)}</div>
                    <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                    {product.originalPrice && <span className="text-sm text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>}
                  </div>
                  <button onClick={() => guardAction(() => handleAddToCart(product))} className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium transition-all duration-300 ${addedId === product.id ? 'bg-green-600 text-white' : 'btn-primary'}`}>
                    <ShoppingBag className="h-4 w-4" />
                    {addedId === product.id ? 'Added!' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Favorites Strip */}
      {favoriteProducts.length > 0 && (
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Heart className="h-8 w-8 text-red-500 fill-red-500" />
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Your Favorites</h2>
                  <p className="text-gray-500 text-sm mt-1">Quick access to products you saved</p>
                </div>
              </div>
              <Link to="/favorites" className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2 hover:gap-3 transition-all">
                View All <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            <div className="flex gap-5 overflow-x-auto pb-3">
              {favoriteProducts.map((product, idx) => (
                <div key={product.id} className="card group flex-shrink-0 w-72 hover:shadow-lg transition-shadow duration-300 animate-fade-in-up" style={{ animationDelay: `${idx * 0.07}s` }}>
                  <Link to={`/products/${product.id}`} className="block">
                    <div className="aspect-square overflow-hidden rounded-t-lg relative">
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                      {product.originalPrice && (
                        <div className="absolute top-3 right-3 bg-red-500 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-md">
                          -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </div>
                      )}
                      <button onClick={(e) => { e.preventDefault(); toggleFavorite(product.id); }} className="absolute top-3 left-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:scale-110 transition-all">
                        <Heart className={`h-5 w-5 ${isFavorite(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
                      </button>
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link to={`/products/${product.id}`}>
                      <h3 className="font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors line-clamp-2">{product.name}</h3>
                    </Link>
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />)}</div>
                      <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                      {product.originalPrice && <span className="text-sm text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>}
                    </div>
                    <button onClick={() => guardAction(() => handleAddToCart(product))} className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium transition-all duration-300 ${addedId === product.id ? 'bg-green-600 text-white' : 'btn-primary'}`}>
                      <ShoppingBag className="h-4 w-4" />
                      {addedId === product.id ? 'Added!' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">What Our Customers Say</h2>
            <p className="text-gray-500 max-w-lg mx-auto">Trusted by over 50,000 happy customers across India</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <Quote className="h-8 w-8 text-primary-200 mb-4" />
                <p className="text-gray-600 leading-relaxed mb-6">{t.text}</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-gray-900">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.location}</p>
                  </div>
                  <div className="ml-auto flex">{[...Array(t.rating)].map((_, i) => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-3xl border border-sky-200/80 bg-gradient-to-r from-sky-100 via-blue-50 to-cyan-100 p-10 text-center">
            <div className="absolute inset-0 opacity-75">
              <div className="absolute -top-10 left-8 h-56 w-56 rounded-full bg-sky-300/60 blur-3xl" />
              <div className="absolute bottom-0 right-8 h-64 w-64 rounded-full bg-cyan-300/50 blur-3xl" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-slate-900 mb-3">Stay in the Loop</h2>
              <p className="text-slate-600 mb-8 max-w-lg mx-auto">Subscribe to Cartify's newsletter and get exclusive deals, early access to sales, and curated product recommendations.</p>
              {subscribed ? (
                <div className="animate-scale-in">
                  <div className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-semibold">
                    <ShieldCheck className="h-5 w-5" /> You're subscribed! Check your inbox for a welcome offer.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input type="email" value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} placeholder="Enter your email address" className="flex-1 px-5 py-3 rounded-xl bg-white/90 border border-sky-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400" required />
                  <button type="submit" className="bg-gradient-to-r from-primary-600 to-sky-500 text-white px-6 py-3 rounded-xl font-bold hover:from-primary-700 hover:to-sky-600 transition-all flex items-center justify-center gap-2">
                    <Send className="h-4 w-4" /> Subscribe
                  </button>
                </form>
              )}
              <p className="text-xs text-slate-500 mt-4">No spam, ever. Unsubscribe anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {isPromptOpen && (
        <PincodePromptModal
          onClose={handlePromptClose}
          onSuccess={handlePromptSuccess}
        />
      )}
    </div>
  );
};
