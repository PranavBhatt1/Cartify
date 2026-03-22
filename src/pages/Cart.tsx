import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag, Truck, Shield } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount } = useCart();
  const shipping = cartTotal > 999 ? 0 : 99;
  const tax = Math.round(cartTotal * 0.18);
  const grandTotal = cartTotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="container-custom py-20 text-center animate-fade-in">
        <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't added anything to your cart yet. Explore our products and find something you love!</p>
        <Link to="/products" className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-3">
          Start Shopping <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="container-custom py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-500 mt-1">{cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart</p>
        </div>
        <button onClick={clearCart} className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1 transition-colors">
          <Trash2 className="h-4 w-4" /> Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item, idx) => (
            <div key={item.product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 flex gap-4 sm:gap-6 animate-fade-in-up hover:shadow-md transition-shadow" style={{ animationDelay: `${idx * 0.1}s` }}>
              <Link to={`/products/${item.product.id}`} className="flex-shrink-0">
                <img src={item.product.images[0]} alt={item.product.name} className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg" />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <Link to={`/products/${item.product.id}`} className="font-semibold text-gray-900 hover:text-primary-600 transition-colors line-clamp-2">{item.product.name}</Link>
                    <p className="text-sm text-gray-500 mt-1 capitalize">{item.product.category.replace('-', ' ')}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.product.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" aria-label="Remove item">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex items-end justify-between mt-4">
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-2 hover:bg-gray-100 transition-colors"><Minus className="h-4 w-4" /></button>
                    <span className="px-4 py-2 font-medium text-center min-w-[48px]">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, Math.min(item.product.stockCount, item.quantity + 1))} className="p-2 hover:bg-gray-100 transition-colors"><Plus className="h-4 w-4" /></button>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-900">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                    {item.quantity > 1 && <p className="text-sm text-gray-500">₹{item.product.price.toLocaleString()} each</p>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600"><span>Subtotal ({cartCount} items)</span><span className="font-medium">₹{cartTotal.toLocaleString()}</span></div>
              <div className="flex justify-between text-gray-600">
                <span className="flex items-center gap-1"><Truck className="h-4 w-4" /> Shipping</span>
                <span className={`font-medium ${shipping === 0 ? 'text-green-600' : ''}`}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between text-gray-600"><span>Tax (18% GST)</span><span className="font-medium">₹{tax.toLocaleString()}</span></div>
              <div className="border-t border-gray-200 pt-4 flex justify-between">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-lg font-bold text-gray-900">₹{grandTotal.toLocaleString()}</span>
              </div>
            </div>
            {shipping > 0 && (
              <p className="text-sm text-green-600 bg-green-50 rounded-lg p-3 mb-4 flex items-center gap-2">
                <Tag className="h-4 w-4" /> Add ₹{(999 - cartTotal).toLocaleString()} more for FREE shipping!
              </p>
            )}
            <Link to="/checkout" className="w-full btn-primary flex items-center justify-center gap-2 py-3.5 text-lg mb-3">
              Proceed to Checkout <ArrowRight className="h-5 w-5" />
            </Link>
            <Link to="/products" className="w-full btn-secondary flex items-center justify-center gap-2 py-3">
              Continue Shopping
            </Link>
            <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
              <Shield className="h-4 w-4 text-green-600" />
              <span>Secure checkout with SSL encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
