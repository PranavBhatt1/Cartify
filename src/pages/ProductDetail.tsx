import { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Minus, Plus, ChevronRight, Truck, Shield, RotateCcw, Play, Share2, Check, X, Maximize2, MapPin } from 'lucide-react';
import { products } from '../data/mockData';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { usePincode } from '../contexts/PincodeContext';
import { usePincodeGuard } from '../hooks/usePincodeGuard';
import { PincodePromptModal } from '../components/common/PincodePromptModal';
import { getDeliveryEstimate, isPincodeServiceable, normalizePincodeInput } from '../utils/pincode';

const mockReviews = [
  { id: '1', user: 'Rahul S.', rating: 5, date: '2024-12-15', comment: 'Excellent product! Exceeded my expectations. The quality is top-notch and delivery was fast.' },
  { id: '2', user: 'Priya M.', rating: 4, date: '2024-12-10', comment: 'Very good quality for the price. Would definitely recommend to others.' },
  { id: '3', user: 'Amit K.', rating: 5, date: '2024-11-28', comment: 'Best purchase I have made this year. Absolutely love it!' },
  { id: '4', user: 'Sneha R.', rating: 4, date: '2024-11-20', comment: 'Good product. Packaging was neat and arrived on time.' },
];

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { pincode, setPincode } = usePincode();
  const { isPromptOpen, guardAction, handlePromptClose, handlePromptSuccess } = usePincodeGuard();
  const [selectedMedia, setSelectedMedia] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const [addedToCart, setAddedToCart] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [pincodeInput, setPincodeInput] = useState(pincode);
  const [pincodeError, setPincodeError] = useState('');

  useEffect(() => {
    setPincodeInput(pincode);
  }, [pincode]);

  const product = useMemo(() => products.find(p => p.id === id), [id]);
  const relatedProducts = useMemo(() => products.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4), [product]);

  if (!product) {
    return (
      <div className="container-custom py-20 text-center animate-fade-in">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
        <p className="text-gray-500 mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products" className="btn-primary inline-block">Browse Products</Link>
      </div>
    );
  }

  type MediaItem = { type: 'image'; url: string; index: number } | { type: 'video'; url: string; index: number };
  
  const mediaItems: MediaItem[] = [...product.images.map((img, idx) => ({ type: 'image' as const, url: img, index: idx }))];
  if (product.video) {
    mediaItems.push({ type: 'video' as const, url: product.video, index: product.images.length });
  }

  const currentMedia = mediaItems[selectedMedia];
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
  const isCurrentPincodeServiceable = isPincodeServiceable(pincode);
  const deliveryEstimate = getDeliveryEstimate(pincode);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const result = setPincode(pincodeInput);
    if (!result.success) {
      setPincodeError(result.error || 'Please enter a valid pincode');
      return;
    }
    setPincodeError('');
  };

  return (
    <div className="container-custom py-8 animate-fade-in">
      {/* Fullscreen Media Modal */}
      {showFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fade-in">
          <button onClick={() => setShowFullscreen(false)} className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10">
            <X className="h-6 w-6" />
          </button>
          <div className="w-full h-full max-w-6xl max-h-[90vh] flex flex-col">
            <div className="flex-1 flex items-center justify-center mb-4">
              {currentMedia.type === 'video' ? (
                <iframe src={currentMedia.url.replace('embed/', 'embed/') + '?autoplay=1'} className="w-full h-full rounded-lg" allowFullScreen allow="autoplay" title="Product Video" />
              ) : (
                <img src={currentMedia.url} alt={product.name} className="max-w-full max-h-full object-contain rounded-lg" />
              )}
            </div>
            <div className="flex gap-2 justify-center overflow-x-auto pb-2">
              {mediaItems.map((item, idx) => (
                <button key={idx} onClick={() => setSelectedMedia(idx)} className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${selectedMedia === idx ? 'border-primary-500 scale-105' : 'border-white/20 hover:border-white/40'}`}>
                  {item.type === 'video' ? (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <Play className="h-6 w-6 text-white" />
                    </div>
                  ) : (
                    <img src={item.url} alt="" className="w-full h-full object-cover" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-primary-600">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link to="/products" className="hover:text-primary-600">Products</Link>
        <ChevronRight className="h-4 w-4" />
        <Link to={`/products?category=${product.category}`} className="hover:text-primary-600 capitalize">{product.category.replace('-', ' ')}</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-gray-900 font-medium truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        {/* Image Gallery */}
        <div className="animate-fade-in-up">
          <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg mb-4 aspect-square group">
            {currentMedia.type === 'video' ? (
              <iframe src={currentMedia.url} className="w-full h-full" allowFullScreen title="Product Video" />
            ) : (
              <img src={currentMedia.url} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            )}
            {discount > 0 && <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">{discount}% OFF</span>}
            <button onClick={() => toggleFavorite(product.id)} className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all hover:scale-110">
              <Heart className={`h-6 w-6 ${isFavorite(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
            </button>
            <button onClick={() => setShowFullscreen(true)} className="absolute bottom-4 right-4 p-3 bg-black/50 backdrop-blur-sm rounded-full text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-black/70">
              <Maximize2 className="h-5 w-5" />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {mediaItems.map((item, idx) => (
              <button key={idx} onClick={() => setSelectedMedia(idx)} className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${selectedMedia === idx ? 'border-primary-600 shadow-md scale-105' : 'border-gray-200 hover:border-gray-400'}`}>
                {item.type === 'video' ? (
                  <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                    <Play className="h-6 w-6 text-white" />
                  </div>
                ) : (
                  <img src={item.url} alt="" className="w-full h-full object-cover" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="animate-slide-in-right">
          <div className="flex items-center gap-2 mb-2">
            {product.tags.map(tag => (
              <span key={tag} className="badge bg-primary-50 text-primary-700 capitalize text-xs">{tag.replace('-', ' ')}</span>
            ))}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />)}
              <span className="font-semibold text-gray-700 ml-1">{product.rating}</span>
            </div>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600">{product.reviewCount.toLocaleString()} reviews</span>
            <button className="ml-auto p-2 hover:bg-gray-100 rounded-full transition-colors"><Share2 className="h-5 w-5 text-gray-600" /></button>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-4xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                <span className="text-lg font-semibold text-green-600">Save ₹{(product.originalPrice - product.price).toLocaleString()}</span>
              </>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${product.inStock ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            <span className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
            {product.inStock ? `In Stock (${product.stockCount} available)` : 'Out of Stock'}
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-5 w-5 text-primary-600" />
              <p className="font-semibold text-gray-900">Check Delivery</p>
            </div>
            <form onSubmit={handlePincodeCheck} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={pincodeInput}
                onChange={(e) => {
                  setPincodeInput(normalizePincodeInput(e.target.value));
                  setPincodeError('');
                }}
                placeholder="Enter 6-digit pincode"
                maxLength={6}
                className={`flex-1 px-4 py-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-primary-500 ${
                  pincodeError ? 'border-red-400' : 'border-gray-300'
                }`}
              />
              <button type="submit" className="bg-primary-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                Check
              </button>
            </form>
            {pincodeError && <p className="text-sm text-red-600 mt-2">{pincodeError}</p>}
            {pincode && !pincodeError && (
              <div className={`mt-3 text-sm rounded-lg px-3 py-2 ${isCurrentPincodeServiceable ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {isCurrentPincodeServiceable && deliveryEstimate ? (
                  <span>
                    Delivery to <strong>{pincode}</strong> by <strong>{deliveryEstimate.eta}</strong> ({deliveryEstimate.duration}).
                  </span>
                ) : (
                  <span>
                    Sorry, we do not currently deliver to <strong>{pincode}</strong>. Try a nearby pincode.
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Quantity & Add to Cart */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-gray-100 transition-colors"><Minus className="h-5 w-5" /></button>
              <span className="px-6 py-3 font-semibold text-lg min-w-[60px] text-center">{quantity}</span>
              <button onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))} className="p-3 hover:bg-gray-100 transition-colors"><Plus className="h-5 w-5" /></button>
            </div>
            <button onClick={() => guardAction(handleAddToCart)} disabled={!product.inStock} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-lg transition-all duration-300 ${addedToCart ? 'bg-green-600 text-white' : 'btn-primary'}`}>
              {addedToCart ? <><Check className="h-5 w-5" /> Added to Cart!</> : <><ShoppingCart className="h-5 w-5" /> Add to Cart</>}
            </button>
          </div>
          <button onClick={() => guardAction(handleBuyNow)} disabled={!product.inStock} className="w-full py-3 rounded-lg font-semibold text-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors disabled:opacity-50 mb-8">
            Buy Now
          </button>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <Truck className="h-6 w-6 text-primary-600 mx-auto mb-2" />
              <p className="text-xs font-medium text-gray-700">Free Delivery</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <Shield className="h-6 w-6 text-primary-600 mx-auto mb-2" />
              <p className="text-xs font-medium text-gray-700">1 Year Warranty</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <RotateCcw className="h-6 w-6 text-primary-600 mx-auto mb-2" />
              <p className="text-xs font-medium text-gray-700">Easy Returns</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <div className="flex gap-8">
          {(['description', 'specs', 'reviews'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-4 font-semibold capitalize transition-colors relative ${activeTab === tab ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700'}`}>
              {tab === 'specs' ? 'Specifications' : tab} {tab === 'reviews' && `(${mockReviews.length})`}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-16 animate-fade-in">
        {activeTab === 'description' && (
          <div className="prose max-w-none">
            <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>
            <p className="text-gray-600 leading-relaxed mt-4">This product is crafted with premium materials ensuring durability and long-lasting performance. Ideal for daily use, it combines style with functionality. Our rigorous quality control process guarantees that every unit meets the highest standards before reaching your doorstep.</p>
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Key Highlights</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500 flex-shrink-0" /> Premium quality materials for durability</li>
              <li className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500 flex-shrink-0" /> Designed for everyday use and comfort</li>
              <li className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500 flex-shrink-0" /> Industry-leading warranty and support</li>
              <li className="flex items-center gap-2"><Check className="h-5 w-5 text-green-500 flex-shrink-0" /> Eco-friendly packaging and shipping</li>
            </ul>
          </div>
        )}
        {activeTab === 'specs' && product.specifications && (
          <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
            {Object.entries(product.specifications).map(([key, value], idx) => (
              <div key={key} className={`flex ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                <div className="w-1/3 px-6 py-4 font-semibold text-gray-700 border-r border-gray-200">{key}</div>
                <div className="flex-1 px-6 py-4 text-gray-600">{value}</div>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex items-center gap-6 p-6 bg-primary-50 rounded-xl">
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-900">{product.rating}</div>
                <div className="flex mt-1">{[...Array(5)].map((_, i) => <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />)}</div>
                <p className="text-sm text-gray-500 mt-1">{product.reviewCount} reviews</p>
              </div>
              <div className="flex-1 space-y-2">
                {[5, 4, 3, 2, 1].map(star => {
                  const count = mockReviews.filter(r => r.rating === star).length;
                  const percent = (count / mockReviews.length) * 100;
                  return (
                    <div key={star} className="flex items-center gap-2">
                      <span className="text-sm w-3">{star}</span><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-yellow-400 rounded-full transition-all" style={{ width: `${percent}%` }} /></div>
                      <span className="text-sm text-gray-500 w-8">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            {mockReviews.map(review => (
              <div key={review.id} className="p-6 bg-white rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center font-bold text-primary-700">{review.user.charAt(0)}</div>
                    <div>
                      <p className="font-semibold text-gray-900">{review.user}</p>
                      <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                  </div>
                  <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />)}</div>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map(rp => (
              <Link key={rp.id} to={`/products/${rp.id}`} className="card group animate-fade-in-up">
                <div className="overflow-hidden"><img src={rp.images[0]} alt={rp.name} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" /></div>
                <div className="p-3">
                  <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 mb-1">{rp.name}</h3>
                  <div className="flex items-center gap-1 mb-1"><Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /><span className="text-xs text-gray-500">{rp.rating}</span></div>
                  <p className="font-bold text-gray-900">₹{rp.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {isPromptOpen && (
        <PincodePromptModal
          onClose={handlePromptClose}
          onSuccess={handlePromptSuccess}
        />
      )}
    </div>
  );
};
