import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageSquare } from 'lucide-react';
import { validateEmail } from '../utils/validation';

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (validateEmail(formData.email) !== null) newErrors.email = 'Valid email is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (formData.message.length < 10) newErrors.message = 'Message must be at least 10 characters';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="container-custom py-20 text-center animate-fade-in">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Message Sent!</h2>
          <p className="text-gray-600 mb-8">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
          <button onClick={() => { setIsSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }); }} className="btn-primary px-8 py-3">Send Another Message</button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-sky-200/80 bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100 py-16 text-slate-900">
        <div className="absolute inset-0 opacity-80">
          <div className="absolute -top-10 left-10 h-64 w-64 rounded-full bg-sky-300/60 blur-3xl" />
          <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-cyan-300/50 blur-3xl" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up">Contact Us</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto animate-fade-in-up stagger-1">
            Have a question, feedback, or need help? We'd love to hear from you. Our support team is here to assist you.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6 animate-fade-in-up">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary-50 rounded-lg"><Mail className="h-6 w-6 text-primary-600" /></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email Us</h3>
                    <p className="text-gray-600 text-sm mt-1">support@cartify.com</p>
                    <p className="text-gray-600 text-sm">business@cartify.com</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-50 rounded-lg"><Phone className="h-6 w-6 text-green-600" /></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Call Us</h3>
                    <p className="text-gray-600 text-sm mt-1">+91 1800-123-4567 (Toll Free)</p>
                    <p className="text-gray-600 text-sm">+91 22-4567-8901</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-50 rounded-lg"><MapPin className="h-6 w-6 text-orange-600" /></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Visit Us</h3>
                    <p className="text-gray-600 text-sm mt-1">Cartify Technologies Pvt. Ltd.</p>
                    <p className="text-gray-600 text-sm">123, Tech Park, Andheri East</p>
                    <p className="text-gray-600 text-sm">Mumbai, Maharashtra - 400069</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-50 rounded-lg"><Clock className="h-6 w-6 text-purple-600" /></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Working Hours</h3>
                    <p className="text-gray-600 text-sm mt-1">Mon - Fri: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600 text-sm">Sat: 10:00 AM - 4:00 PM</p>
                    <p className="text-gray-600 text-sm">Sun: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 animate-slide-in-right">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2"><MessageSquare className="h-6 w-6 text-primary-600" /> Send us a Message</h2>
                <p className="text-gray-500 mb-6">Fill out the form below and we'll get back to you as soon as possible.</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                      <input value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} className={`input-field ${errors.name ? 'border-red-500' : ''}`} placeholder="John Doe" />
                      {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                      <input value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} className={`input-field ${errors.email ? 'border-red-500' : ''}`} placeholder="you@example.com" />
                      {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                    <select value={formData.subject} onChange={e => setFormData(p => ({ ...p, subject: e.target.value }))} className={`input-field ${errors.subject ? 'border-red-500' : ''}`}>
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="order">Order Related</option>
                      <option value="return">Return / Refund</option>
                      <option value="payment">Payment Issue</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.subject && <p className="text-sm text-red-600 mt-1">{errors.subject}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                    <textarea value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} rows={6} className={`input-field resize-none ${errors.message ? 'border-red-500' : ''}`} placeholder="Tell us how we can help you..." />
                    {errors.message && <p className="text-sm text-red-600 mt-1">{errors.message}</p>}
                  </div>
                  <button type="submit" disabled={isSubmitting} className="btn-primary py-3 px-8 text-lg flex items-center gap-2">
                    {isSubmitting ? (
                      <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Sending...</>
                    ) : (
                      <><Send className="h-5 w-5" /> Send Message</>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { q: 'How can I track my order?', a: 'You can track your order by logging into your account and visiting the "Orders" section in your profile. You will also receive email updates with tracking information.' },
              { q: 'What is your return policy?', a: 'We offer a 30-day return policy on most products. Items must be unused and in their original packaging. Visit our Return Policy page for detailed information.' },
              { q: 'How long does delivery take?', a: 'Standard delivery takes 5-7 business days. Express delivery is available for select locations and typically arrives within 2-3 business days.' },
              { q: 'What payment methods do you accept?', a: 'We accept all major credit and debit cards (Visa, Mastercard, RuPay), UPI, net banking, and wallet payments. Cash on Delivery is also available for select orders.' },
              { q: 'How do I contact customer support?', a: 'You can reach us via email at support@cartify.com, call our toll-free number 1800-123-4567, or use the contact form on this page. Our support team is available Mon-Sat.' },
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fade-in-up" style={{ animationDelay: `${idx * 0.05}s` }}>
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-3xl border border-sky-200/80 bg-gradient-to-r from-sky-100 via-blue-50 to-cyan-100 p-10 text-center">
            <div className="absolute inset-0 opacity-75">
              <div className="absolute -top-10 left-8 h-56 w-56 rounded-full bg-sky-300/60 blur-3xl" />
              <div className="absolute bottom-0 right-8 h-64 w-64 rounded-full bg-cyan-300/50 blur-3xl" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-slate-900 mb-3">Need Quick Help?</h2>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                For urgent order or payment issues, our support team is available Monday to Saturday.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a href="tel:18001234567" className="bg-gradient-to-r from-primary-600 to-sky-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-primary-700 hover:to-sky-600 transition-all">
                  Call 1800-123-4567
                </a>
                <a href="mailto:support@cartify.com" className="border-2 border-sky-300 text-sky-900 px-8 py-3 rounded-lg font-semibold hover:bg-white/70 transition-colors">
                  Email Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
