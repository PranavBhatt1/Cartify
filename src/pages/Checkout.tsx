import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Truck, Shield, CheckCircle, ChevronRight, Lock, MapPin } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { usePincode } from '../contexts/PincodeContext';
import { validateEmail, validatePhone, validatePincode } from '../utils/validation';

export const Checkout = () => {
  const { cart, cartTotal, cartCount, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { pincode, setPincode } = usePincode();
  const [step, setStep] = useState<'address' | 'payment' | 'confirmation'>('address');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId] = useState(`ORD-${Date.now()}`);

  const shipping = cartTotal > 999 ? 0 : 99;
  const tax = Math.round(cartTotal * 0.18);
  const grandTotal = cartTotal + shipping + tax;

  const [address, setAddress] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: user?.preferredPincode || pincode || '',
  });
  const [cardData, setCardData] = useState({ number: '', expiry: '', cvc: '', nameOnCard: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (cart.length === 0 && step !== 'confirmation') {
    return (
      <div className="container-custom py-20 text-center animate-fade-in">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Add some products before checking out.</p>
        <Link to="/products" className="btn-primary inline-block">Browse Products</Link>
      </div>
    );
  }

  const validateAddress = () => {
    const newErrors: Record<string, string> = {};
    if (!address.name.trim()) newErrors.name = 'Name is required';
    if (validateEmail(address.email) !== null) newErrors.email = 'Valid email required';
    if (validatePhone(address.phone) !== null) newErrors.phone = 'Valid 10-digit phone required';
    if (!address.street.trim()) newErrors.street = 'Street address required';
    if (!address.city.trim()) newErrors.city = 'City is required';
    if (!address.state.trim()) newErrors.state = 'State is required';
    if (validatePincode(address.pincode) !== null) newErrors.pincode = 'Valid 6-digit pincode required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = () => {
    const newErrors: Record<string, string> = {};
    const cleanNum = cardData.number.replace(/\s/g, '');
    if (cleanNum.length !== 16) newErrors.number = 'Enter 16-digit card number';
    if (!/^\d{2}\/\d{2}$/.test(cardData.expiry)) newErrors.expiry = 'Use MM/YY format';
    if (!/^\d{3,4}$/.test(cardData.cvc)) newErrors.cvc = 'Enter 3 or 4 digit CVC';
    if (!cardData.nameOnCard.trim()) newErrors.nameOnCard = 'Name on card required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAddress()) {
      setPincode(address.pincode);
      setStep('payment');
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePayment()) return;
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    setIsProcessing(false);
    clearCart();
    setStep('confirmation');
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s/g, '').replace(/\D/g, '').substring(0, 16);
    const parts = [];
    for (let i = 0; i < v.length; i += 4) parts.push(v.substring(i, i + 4));
    return parts.join(' ');
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\D/g, '').substring(0, 4);
    if (v.length >= 2) return v.substring(0, 2) + '/' + v.substring(2);
    return v;
  };

  // Order Confirmation
  if (step === 'confirmation') {
    return (
      <div className="container-custom py-16 text-center animate-fade-in">
        <div className="max-w-lg mx-auto">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Order Confirmed!</h1>
          <p className="text-gray-600 mb-2">Thank you for your purchase. Your order has been placed successfully.</p>
          <p className="text-sm text-gray-500 mb-8">Order ID: <span className="font-mono font-semibold text-gray-700">{orderId}</span></p>
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 text-left">
            <h3 className="font-semibold text-gray-900 mb-4">Shipping Address</h3>
            <p className="text-gray-600">{address.name}</p>
            <p className="text-gray-600">{address.street}</p>
            <p className="text-gray-600">{address.city}, {address.state} - {address.pincode}</p>
            <p className="text-gray-600">{address.phone}</p>
            <div className="border-t border-gray-200 mt-4 pt-4">
              <div className="flex justify-between text-gray-600"><span>Total Paid</span><span className="font-bold text-gray-900">₹{grandTotal.toLocaleString()}</span></div>
            </div>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 mb-8">
            <p className="text-sm text-blue-700">A confirmation email has been sent to <strong>{address.email}</strong>. You can track your order from your profile page.</p>
          </div>
          <div className="flex gap-4 justify-center">
            <Link to="/" className="btn-primary px-8 py-3">Back to Home</Link>
            <Link to="/products" className="btn-outline px-8 py-3">Continue Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8 animate-fade-in">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-10">
        {[{ key: 'address', label: 'Shipping' }, { key: 'payment', label: 'Payment' }, { key: 'confirmation', label: 'Confirmation' }].map((s, idx) => (
          <div key={s.key} className="flex items-center">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${step === s.key || (s.key === 'address' && step === 'payment') ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
              <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold border-current">{idx + 1}</span>
              <span className="hidden sm:inline">{s.label}</span>
            </div>
            {idx < 2 && <ChevronRight className="h-5 w-5 text-gray-400 mx-2" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Shipping Address Form */}
          {step === 'address' && (
            <form onSubmit={handleAddressSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-fade-in-up">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><MapPin className="h-5 w-5 text-primary-600" /> Shipping Address</h2>
              {!isAuthenticated && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-yellow-700">
                    <Link to="/login" className="font-semibold underline">Sign in</Link> to save your address for future orders.
                  </p>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input value={address.name} onChange={e => setAddress(p => ({ ...p, name: e.target.value }))} className={`input-field ${errors.name ? 'border-red-500' : ''}`} placeholder="John Doe" />
                  {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input value={address.email} onChange={e => setAddress(p => ({ ...p, email: e.target.value }))} className={`input-field ${errors.email ? 'border-red-500' : ''}`} placeholder="you@example.com" />
                  {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Street Address *</label>
                  <input value={address.street} onChange={e => setAddress(p => ({ ...p, street: e.target.value }))} className={`input-field ${errors.street ? 'border-red-500' : ''}`} placeholder="123, Main Street, Apartment 4B" />
                  {errors.street && <p className="text-sm text-red-600 mt-1">{errors.street}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <input value={address.city} onChange={e => setAddress(p => ({ ...p, city: e.target.value }))} className={`input-field ${errors.city ? 'border-red-500' : ''}`} placeholder="Mumbai" />
                  {errors.city && <p className="text-sm text-red-600 mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                  <input value={address.state} onChange={e => setAddress(p => ({ ...p, state: e.target.value }))} className={`input-field ${errors.state ? 'border-red-500' : ''}`} placeholder="Maharashtra" />
                  {errors.state && <p className="text-sm text-red-600 mt-1">{errors.state}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pincode *</label>
                  <input value={address.pincode} onChange={e => setAddress(p => ({ ...p, pincode: e.target.value }))} className={`input-field ${errors.pincode ? 'border-red-500' : ''}`} placeholder="400001" maxLength={6} />
                  {errors.pincode && <p className="text-sm text-red-600 mt-1">{errors.pincode}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input value={address.phone} onChange={e => setAddress(p => ({ ...p, phone: e.target.value }))} className={`input-field ${errors.phone ? 'border-red-500' : ''}`} placeholder="9876543210" maxLength={10} />
                  {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
                </div>
              </div>
              <button type="submit" className="mt-6 w-full btn-primary py-3.5 text-lg flex items-center justify-center gap-2">
                Continue to Payment <ChevronRight className="h-5 w-5" />
              </button>
            </form>
          )}

          {/* Payment Form */}
          {step === 'payment' && (
            <form onSubmit={handlePaymentSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-fade-in-up">
              <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2"><CreditCard className="h-5 w-5 text-primary-600" /> Payment Details</h2>
              <p className="text-sm text-gray-500 mb-6">Powered by Stripe (Test Mode)</p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-700"><strong>Test Mode:</strong> Use card <span className="font-mono">4242 4242 4242 4242</span>, any future expiry date, and any 3-digit CVC.</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card *</label>
                  <input value={cardData.nameOnCard} onChange={e => setCardData(p => ({ ...p, nameOnCard: e.target.value }))} className={`input-field ${errors.nameOnCard ? 'border-red-500' : ''}`} placeholder="JOHN DOE" />
                  {errors.nameOnCard && <p className="text-sm text-red-600 mt-1">{errors.nameOnCard}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number *</label>
                  <div className="relative">
                    <input value={cardData.number} onChange={e => setCardData(p => ({ ...p, number: formatCardNumber(e.target.value) }))} className={`input-field pl-10 ${errors.number ? 'border-red-500' : ''}`} placeholder="4242 4242 4242 4242" maxLength={19} />
                    <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                  {errors.number && <p className="text-sm text-red-600 mt-1">{errors.number}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry *</label>
                    <input value={cardData.expiry} onChange={e => setCardData(p => ({ ...p, expiry: formatExpiry(e.target.value) }))} className={`input-field ${errors.expiry ? 'border-red-500' : ''}`} placeholder="12/28" maxLength={5} />
                    {errors.expiry && <p className="text-sm text-red-600 mt-1">{errors.expiry}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVC *</label>
                    <div className="relative">
                      <input value={cardData.cvc} onChange={e => setCardData(p => ({ ...p, cvc: e.target.value.replace(/\D/g, '').substring(0, 4) }))} className={`input-field pl-10 ${errors.cvc ? 'border-red-500' : ''}`} placeholder="123" maxLength={4} />
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    </div>
                    {errors.cvc && <p className="text-sm text-red-600 mt-1">{errors.cvc}</p>}
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setStep('address')} className="btn-secondary py-3 px-6">Back</button>
                <button type="submit" disabled={isProcessing} className="flex-1 btn-primary py-3.5 text-lg flex items-center justify-center gap-2">
                  {isProcessing ? (
                    <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Processing Payment...</>
                  ) : (
                    <>Pay ₹{grandTotal.toLocaleString()} <Lock className="h-5 w-5" /></>
                  )}
                </button>
              </div>
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                <Shield className="h-4 w-4 text-green-600" /> Your payment is secure and encrypted
              </div>
            </form>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
              {cart.map(item => (
                <div key={item.product.id} className="flex gap-3">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-14 h-14 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.product.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600"><span>Subtotal ({cartCount})</span><span>₹{cartTotal.toLocaleString()}</span></div>
              <div className="flex justify-between text-gray-600"><span>Shipping</span><span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
              <div className="flex justify-between text-gray-600"><span>Tax (GST 18%)</span><span>₹{tax.toLocaleString()}</span></div>
              <div className="border-t border-gray-200 pt-3 flex justify-between text-base font-bold text-gray-900"><span>Total</span><span>₹{grandTotal.toLocaleString()}</span></div>
            </div>
            <div className="mt-4 space-y-2 text-xs text-gray-500">
              <div className="flex items-center gap-2"><Truck className="h-4 w-4 text-green-600" /> Free shipping on orders above ₹999</div>
              <div className="flex items-center gap-2"><Shield className="h-4 w-4 text-green-600" /> 30-day return policy</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
