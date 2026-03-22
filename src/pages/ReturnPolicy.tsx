import { Link } from 'react-router-dom';
import { RotateCcw, Package, Clock, CheckCircle, XCircle, AlertTriangle, HelpCircle, ArrowRight } from 'lucide-react';

const steps = [
  { icon: Package, title: 'Initiate Return', description: 'Log into your account, go to Orders, and select the item you want to return. Choose a reason for the return.' },
  { icon: Clock, title: 'Schedule Pickup', description: 'Choose a convenient date and time for our courier partner to pick up the item from your address.' },
  { icon: RotateCcw, title: 'Item Inspection', description: 'Once we receive the item, our quality team will inspect it within 2-3 business days.' },
  { icon: CheckCircle, title: 'Refund Processed', description: 'After successful inspection, your refund will be processed within 5-7 business days to your original payment method.' },
];

const eligible = [
  'Products received in damaged or defective condition',
  'Wrong product delivered (different from what was ordered)',
  'Product significantly different from the description on the website',
  'Products with missing parts or accessories',
  'Products that stopped working within the warranty period',
  'Clothing items that do not fit (within 15 days of delivery)',
];

const notEligible = [
  'Products that have been used, washed, or altered after delivery',
  'Personal care products (skincare, cosmetics) once opened',
  'Innerwear, swimwear, and lingerie for hygiene reasons',
  'Products with removed or damaged tags and labels',
  'Customized or personalized products',
  'Digital products and downloadable content',
  'Products returned after the 30-day return window',
  'Products damaged due to misuse or negligence by the customer',
];

export const ReturnPolicy = () => {
  return (
    <div className="animate-fade-in">
      <section className="relative overflow-hidden border-b border-sky-200/80 bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100 py-16 text-slate-900">
        <div className="absolute inset-0 opacity-80">
          <div className="absolute -top-10 left-10 h-64 w-64 rounded-full bg-sky-300/60 blur-3xl" />
          <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-cyan-300/50 blur-3xl" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <RotateCcw className="h-12 w-12 text-primary-700 mx-auto mb-4 animate-fade-in-up" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up">Return Policy</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto animate-fade-in-up stagger-1">
            We want you to be completely satisfied with your purchase. If something isn't right, we're here to help.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="container-custom max-w-4xl">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 mb-12 animate-fade-in-up">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Return Promise</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-4xl font-bold text-green-600">30</p>
                <p className="text-gray-600 font-medium">Days Return Window</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-green-600">Free</p>
                <p className="text-gray-600 font-medium">Return Shipping</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-green-600">5-7</p>
                <p className="text-gray-600 font-medium">Days Refund Processing</p>
              </div>
            </div>
          </div>

          {/* How to Return */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">How to Return a Product</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, idx) => (
                <div key={step.title} className="text-center bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="text-sm text-primary-600 font-semibold mb-2">Step {idx + 1}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Eligible & Not Eligible */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-xl shadow-sm border border-green-200 p-6 animate-fade-in-up">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <h3 className="text-xl font-bold text-gray-900">Eligible for Return</h3>
              </div>
              <ul className="space-y-3">
                {eligible.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6 animate-fade-in-up stagger-1">
              <div className="flex items-center gap-3 mb-4">
                <XCircle className="h-6 w-6 text-red-600" />
                <h3 className="text-xl font-bold text-gray-900">Not Eligible for Return</h3>
              </div>
              <ul className="space-y-3">
                {notEligible.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <XCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Refund Details */}
          <div className="mb-16 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Refund Information</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px]">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Payment Method</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Refund Timeline</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Refund Mode</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr><td className="px-6 py-4 text-sm text-gray-600">Credit / Debit Card</td><td className="px-6 py-4 text-sm text-gray-600">5-7 business days</td><td className="px-6 py-4 text-sm text-gray-600">Original card</td></tr>
                    <tr className="bg-gray-50"><td className="px-6 py-4 text-sm text-gray-600">UPI / Net Banking</td><td className="px-6 py-4 text-sm text-gray-600">3-5 business days</td><td className="px-6 py-4 text-sm text-gray-600">Original bank account</td></tr>
                    <tr><td className="px-6 py-4 text-sm text-gray-600">Wallet</td><td className="px-6 py-4 text-sm text-gray-600">1-2 business days</td><td className="px-6 py-4 text-sm text-gray-600">Cartify Wallet</td></tr>
                    <tr className="bg-gray-50"><td className="px-6 py-4 text-sm text-gray-600">Cash on Delivery</td><td className="px-6 py-4 text-sm text-gray-600">7-10 business days</td><td className="px-6 py-4 text-sm text-gray-600">Bank transfer (NEFT)</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Exchange Policy */}
          <div className="mb-16 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Exchange Policy</h2>
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-start gap-3">
                <HelpCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-gray-700 space-y-3">
                  <p>We offer free exchanges for clothing and footwear items within 15 days of delivery. You can exchange for a different size or color of the same product, subject to availability.</p>
                  <p>To request an exchange, follow the same return process and select "Exchange" as the reason. If the desired size/color is not available, a full refund will be processed instead.</p>
                  <p>Exchange items will be shipped within 2-3 business days after we receive your original item. Standard delivery timelines apply for the replacement.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Damaged / Defective */}
          <div className="mb-16 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Damaged or Defective Products</h2>
            <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-orange-600 flex-shrink-0 mt-0.5" />
                <div className="text-gray-700 space-y-3">
                  <p>If you receive a damaged or defective product, please report it within 48 hours of delivery for the fastest resolution. Here's what to do:</p>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Take clear photos of the damaged product and packaging</li>
                    <li>Log into your account and go to Orders to initiate the return</li>
                    <li>Upload the photos as evidence when prompted</li>
                    <li>We will arrange a priority pickup within 24 hours</li>
                    <li>Full refund or replacement will be processed immediately upon pickup confirmation</li>
                  </ol>
                  <p>For damaged items reported within 48 hours, we offer express refund processing within 2-3 business days.</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="relative overflow-hidden text-center rounded-2xl border border-sky-200/80 bg-gradient-to-r from-sky-100 via-blue-50 to-cyan-100 p-10 animate-fade-in-up">
            <div className="absolute inset-0 opacity-75">
              <div className="absolute -top-8 left-8 h-56 w-56 rounded-full bg-sky-300/60 blur-3xl" />
              <div className="absolute bottom-0 right-8 h-64 w-64 rounded-full bg-cyan-300/50 blur-3xl" />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Need Help with a Return?</h3>
              <p className="text-slate-600 mb-6 max-w-lg mx-auto">Our customer support team is available Monday to Saturday to assist you with any return or refund queries.</p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link to="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-sky-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-primary-700 hover:to-sky-600 transition-all">Contact Support <ArrowRight className="h-5 w-5" /></Link>
                <a href="tel:18001234567" className="border-2 border-sky-300 text-sky-900 px-8 py-3 rounded-lg font-semibold hover:bg-white/70 transition-colors">Call 1800-123-4567</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
