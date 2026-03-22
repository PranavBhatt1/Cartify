import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { User, MapPin, Package, Settings, Plus, Trash2, Edit3, Save, X, LogOut, ShoppingBag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePincode } from '../contexts/PincodeContext';
import type { Address } from '../types';
import { validatePhone, validatePincode } from '../utils/validation';
import { normalizePincodeInput } from '../utils/pincode';

const mockOrders = [
  { id: 'ORD-1001', date: '2024-12-20', items: 3, total: 15497, status: 'delivered' as const },
  { id: 'ORD-1002', date: '2024-12-28', items: 1, total: 24999, status: 'shipped' as const },
  { id: 'ORD-1003', date: '2025-01-05', items: 2, total: 8498, status: 'processing' as const },
];

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

export const Profile = () => {
  const { user, updateUser, logout, isAuthenticated } = useAuth();
  const { pincode, setPincode, clearPincode } = usePincode();
  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'orders'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [editPincode, setEditPincode] = useState(user?.preferredPincode || pincode || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [newAddress, setNewAddress] = useState<Omit<Address, 'id'>>({
    name: '', street: '', city: '', state: '', pincode: '', phone: '', isDefault: false,
  });

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const handleSaveProfile = () => {
    const newErrors: Record<string, string> = {};
    if (!editName.trim()) newErrors.name = 'Name is required';
    if (editPhone && validatePhone(editPhone) !== null) newErrors.phone = 'Valid 10-digit phone required';
    if (editPincode && validatePincode(editPincode) !== null) newErrors.pincode = 'Valid 6-digit pincode required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    if (editPincode) {
      setPincode(editPincode);
    } else {
      clearPincode();
    }

    updateUser({
      ...user,
      name: editName.trim(),
      phone: editPhone || undefined,
      preferredPincode: editPincode || undefined,
    });
    setIsEditing(false);
  };

  const handleAddAddress = () => {
    const newErrors: Record<string, string> = {};
    if (!newAddress.name.trim()) newErrors.addrName = 'Name required';
    if (!newAddress.street.trim()) newErrors.addrStreet = 'Street required';
    if (!newAddress.city.trim()) newErrors.addrCity = 'City required';
    if (!newAddress.state.trim()) newErrors.addrState = 'State required';
    if (validatePincode(newAddress.pincode) !== null) newErrors.addrPincode = '6-digit pincode required';
    if (validatePhone(newAddress.phone) !== null) newErrors.addrPhone = '10-digit phone required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const addr: Address = { ...newAddress, id: Date.now().toString() };
    const addresses = newAddress.isDefault
      ? [...user.addresses.map(a => ({ ...a, isDefault: false })), addr]
      : [...user.addresses, addr];
    updateUser({ ...user, addresses });
    setNewAddress({ name: '', street: '', city: '', state: '', pincode: '', phone: '', isDefault: false });
    setShowAddAddress(false);
    setErrors({});
  };

  const handleDeleteAddress = (addrId: string) => {
    updateUser({ ...user, addresses: user.addresses.filter(a => a.id !== addrId) });
  };

  const handleSetDefault = (addrId: string) => {
    updateUser({ ...user, addresses: user.addresses.map(a => ({ ...a, isDefault: a.id === addrId })) });
  };

  const tabs = [
    { key: 'profile' as const, label: 'Profile', icon: User },
    { key: 'addresses' as const, label: 'Addresses', icon: MapPin },
    { key: 'orders' as const, label: 'Orders', icon: Package },
  ];

  return (
    <div className="container-custom py-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-3">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <h3 className="font-semibold text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <nav className="space-y-1">
              {tabs.map(tab => (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.key ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <tab.icon className="h-5 w-5" /> {tab.label}
                </button>
              ))}
              <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                <LogOut className="h-5 w-5" /> Logout
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-fade-in-up">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2"><Settings className="h-5 w-5 text-primary-600" /> Personal Information</h2>
                {!isEditing ? (
                  <button onClick={() => setIsEditing(true)} className="btn-outline py-2 px-4 text-sm flex items-center gap-1"><Edit3 className="h-4 w-4" /> Edit</button>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={() => { setIsEditing(false); setEditName(user.name); setEditPhone(user.phone || ''); setEditPincode(user.preferredPincode || pincode || ''); setErrors({}); }} className="btn-secondary py-2 px-4 text-sm flex items-center gap-1"><X className="h-4 w-4" /> Cancel</button>
                    <button onClick={handleSaveProfile} className="btn-primary py-2 px-4 text-sm flex items-center gap-1"><Save className="h-4 w-4" /> Save</button>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                  {isEditing ? (
                    <div>
                      <input value={editName} onChange={e => setEditName(e.target.value)} className={`input-field ${errors.name ? 'border-red-500' : ''}`} />
                      {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
                    </div>
                  ) : (
                    <p className="text-gray-900 font-medium">{user.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                  <p className="text-gray-900 font-medium">{user.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
                  {isEditing ? (
                    <div>
                      <input value={editPhone} onChange={e => setEditPhone(e.target.value)} className={`input-field ${errors.phone ? 'border-red-500' : ''}`} placeholder="Enter phone number" maxLength={10} />
                      {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
                    </div>
                  ) : (
                    <p className="text-gray-900 font-medium">{user.phone || 'Not provided'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Member Since</label>
                  <p className="text-gray-900 font-medium">{new Date(user.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Preferred Delivery Pincode</label>
                  {isEditing ? (
                    <div>
                      <input
                        value={editPincode}
                        onChange={e => setEditPincode(normalizePincodeInput(e.target.value))}
                        className={`input-field ${errors.pincode ? 'border-red-500' : ''}`}
                        placeholder="400001"
                        maxLength={6}
                      />
                      {errors.pincode && <p className="text-sm text-red-600 mt-1">{errors.pincode}</p>}
                    </div>
                  ) : (
                    <p className="text-gray-900 font-medium">{user.preferredPincode || pincode || 'Not set'}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <div className="animate-fade-in-up">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2"><MapPin className="h-5 w-5 text-primary-600" /> Saved Addresses</h2>
                <button onClick={() => setShowAddAddress(!showAddAddress)} className="btn-primary py-2 px-4 text-sm flex items-center gap-1"><Plus className="h-4 w-4" /> Add Address</button>
              </div>

              {showAddAddress && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 animate-scale-in">
                  <h3 className="font-semibold text-gray-900 mb-4">New Address</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <input value={newAddress.name} onChange={e => setNewAddress(p => ({ ...p, name: e.target.value }))} className={`input-field ${errors.addrName ? 'border-red-500' : ''}`} placeholder="John Doe" />
                      {errors.addrName && <p className="text-sm text-red-600 mt-1">{errors.addrName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                      <input value={newAddress.phone} onChange={e => setNewAddress(p => ({ ...p, phone: e.target.value }))} className={`input-field ${errors.addrPhone ? 'border-red-500' : ''}`} placeholder="9876543210" maxLength={10} />
                      {errors.addrPhone && <p className="text-sm text-red-600 mt-1">{errors.addrPhone}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Street Address *</label>
                      <input value={newAddress.street} onChange={e => setNewAddress(p => ({ ...p, street: e.target.value }))} className={`input-field ${errors.addrStreet ? 'border-red-500' : ''}`} placeholder="123, Main Street" />
                      {errors.addrStreet && <p className="text-sm text-red-600 mt-1">{errors.addrStreet}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                      <input value={newAddress.city} onChange={e => setNewAddress(p => ({ ...p, city: e.target.value }))} className={`input-field ${errors.addrCity ? 'border-red-500' : ''}`} placeholder="Mumbai" />
                      {errors.addrCity && <p className="text-sm text-red-600 mt-1">{errors.addrCity}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                      <input value={newAddress.state} onChange={e => setNewAddress(p => ({ ...p, state: e.target.value }))} className={`input-field ${errors.addrState ? 'border-red-500' : ''}`} placeholder="Maharashtra" />
                      {errors.addrState && <p className="text-sm text-red-600 mt-1">{errors.addrState}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pincode *</label>
                      <input value={newAddress.pincode} onChange={e => setNewAddress(p => ({ ...p, pincode: e.target.value }))} className={`input-field ${errors.addrPincode ? 'border-red-500' : ''}`} placeholder="400001" maxLength={6} />
                      {errors.addrPincode && <p className="text-sm text-red-600 mt-1">{errors.addrPincode}</p>}
                    </div>
                    <div className="flex items-center">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={newAddress.isDefault} onChange={e => setNewAddress(p => ({ ...p, isDefault: e.target.checked }))} className="h-4 w-4 text-primary-600 rounded border-gray-300" />
                        <span className="text-sm text-gray-700">Set as default</span>
                      </label>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button onClick={() => { setShowAddAddress(false); setErrors({}); }} className="btn-secondary py-2 px-4 text-sm">Cancel</button>
                    <button onClick={handleAddAddress} className="btn-primary py-2 px-4 text-sm">Save Address</button>
                  </div>
                </div>
              )}

              {user.addresses.length === 0 && !showAddAddress ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                  <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">No addresses saved</h3>
                  <p className="text-gray-500 mb-4">Add a shipping address for faster checkout.</p>
                  <button onClick={() => setShowAddAddress(true)} className="btn-primary py-2 px-6 text-sm inline-flex items-center gap-1"><Plus className="h-4 w-4" /> Add Address</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user.addresses.map(addr => (
                    <div key={addr.id} className={`bg-white rounded-xl shadow-sm border p-5 relative ${addr.isDefault ? 'border-primary-300 bg-primary-50/30' : 'border-gray-100'}`}>
                      {addr.isDefault && <span className="absolute top-3 right-3 text-xs font-semibold text-primary-700 bg-primary-100 px-2 py-1 rounded-full">Default</span>}
                      <p className="font-semibold text-gray-900">{addr.name}</p>
                      <p className="text-sm text-gray-600 mt-1">{addr.street}</p>
                      <p className="text-sm text-gray-600">{addr.city}, {addr.state} - {addr.pincode}</p>
                      <p className="text-sm text-gray-600">{addr.phone}</p>
                      <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                        {!addr.isDefault && <button onClick={() => handleSetDefault(addr.id)} className="text-xs text-primary-600 hover:text-primary-700 font-medium">Set Default</button>}
                        <button onClick={() => handleDeleteAddress(addr.id)} className="text-xs text-red-500 hover:text-red-700 font-medium flex items-center gap-1"><Trash2 className="h-3 w-3" /> Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="animate-fade-in-up">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-6"><Package className="h-5 w-5 text-primary-600" /> Order History</h2>
              {mockOrders.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                  <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">No orders yet</h3>
                  <p className="text-gray-500 mb-4">You haven't placed any orders. Start shopping!</p>
                  <Link to="/products" className="btn-primary py-2 px-6 text-sm inline-block">Browse Products</Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {mockOrders.map((order, idx) => (
                    <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-fade-in-up hover:shadow-md transition-shadow" style={{ animationDelay: `${idx * 0.1}s` }}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <p className="font-semibold text-gray-900">{order.id}</p>
                          <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm text-gray-500">{order.items} {order.items === 1 ? 'item' : 'items'}</p>
                            <p className="font-bold text-gray-900">₹{order.total.toLocaleString()}</p>
                          </div>
                          <span className={`badge text-xs capitalize ${statusColors[order.status]}`}>{order.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
