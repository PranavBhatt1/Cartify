import { Link } from 'react-router-dom';
import { FileText, AlertTriangle } from 'lucide-react';

export const Terms = () => {
  const lastUpdated = 'January 15, 2025';

  return (
    <div className="animate-fade-in">
      <section className="relative overflow-hidden border-b border-sky-200/80 bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100 py-16 text-slate-900">
        <div className="absolute inset-0 opacity-80">
          <div className="absolute -top-10 left-10 h-64 w-64 rounded-full bg-sky-300/60 blur-3xl" />
          <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-cyan-300/50 blur-3xl" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <FileText className="h-12 w-12 text-primary-700 mx-auto mb-4 animate-fade-in-up" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up">Terms & Conditions</h1>
          <p className="text-slate-600 animate-fade-in-up stagger-1">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom max-w-4xl">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-10 flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <p className="text-yellow-800">
              Please read these Terms and Conditions carefully before using Cartify. By accessing or using our website, you agree to be bound by these terms. If you do not agree with any part of these terms, you may not use our services.
            </p>
          </div>

          <div className="prose max-w-none space-y-8">
            <div className="animate-fade-in-up">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
              <p className="text-gray-600 leading-relaxed">By accessing and using Cartify (the "Website"), you accept and agree to be bound by these Terms and Conditions, our Privacy Policy, and any additional terms and conditions that may apply to specific sections of the Website. These Terms constitute a legally binding agreement between you and Cartify Technologies Pvt. Ltd. ("Company", "we", "us", or "our").</p>
            </div>

            <div className="animate-fade-in-up">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">2. Account Registration</h2>
              <div className="text-gray-600 leading-relaxed space-y-3">
                <p>To access certain features of our Website, you may be required to create an account. When creating an account, you agree to:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Provide accurate, current, and complete information during the registration process</li>
                  <li>Maintain and promptly update your account information to keep it accurate and complete</li>
                  <li>Maintain the security of your password and accept all risks of unauthorized access to your account</li>
                  <li>Notify us immediately if you discover or suspect any security breaches related to your account</li>
                  <li>Be responsible for all activities that occur under your account</li>
                </ul>
                <p>We reserve the right to suspend or terminate your account if any information provided is inaccurate, false, or incomplete, or if we suspect unauthorized or fraudulent activity.</p>
              </div>
            </div>

            <div className="animate-fade-in-up">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">3. Products and Pricing</h2>
              <div className="text-gray-600 leading-relaxed space-y-3">
                <p>We strive to provide accurate product descriptions and pricing on our Website. However:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>All product images are for illustrative purposes. Actual products may vary slightly in color, size, or appearance due to screen settings and manufacturing variations.</li>
                  <li>Prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes unless otherwise stated.</li>
                  <li>We reserve the right to modify prices at any time without prior notice. Price changes will not affect orders that have already been confirmed.</li>
                  <li>In the event of a pricing error, we reserve the right to cancel the order and refund the full amount paid.</li>
                  <li>Promotional offers and discounts are subject to availability and may be modified or discontinued at any time.</li>
                </ul>
              </div>
            </div>

            <div className="animate-fade-in-up">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Orders and Payments</h2>
              <div className="text-gray-600 leading-relaxed space-y-3">
                <p>When you place an order on Cartify:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Your order constitutes an offer to purchase the product(s) listed in your order.</li>
                  <li>We reserve the right to accept or decline your order for any reason, including product availability, errors in product or pricing information, or suspected fraudulent activity.</li>
                  <li>Payment must be made in full at the time of order placement using one of our accepted payment methods.</li>
                  <li>We use secure, PCI-DSS compliant payment processing through Stripe and other trusted payment gateways.</li>
                  <li>Your payment information is encrypted and securely transmitted. We do not store your complete credit/debit card details.</li>
                </ul>
              </div>
            </div>

            <div className="animate-fade-in-up">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Shipping and Delivery</h2>
              <div className="text-gray-600 leading-relaxed space-y-3">
                <ul className="list-disc pl-5 space-y-2">
                  <li>We offer shipping across India to most serviceable pin codes.</li>
                  <li>Standard delivery typically takes 5-7 business days. Express delivery options may be available for select locations.</li>
                  <li>Free shipping is available on orders above ₹999. A flat shipping fee of ₹99 applies to orders below this threshold.</li>
                  <li>Delivery timelines are estimates and may vary due to unforeseen circumstances such as weather conditions, logistics delays, or public holidays.</li>
                  <li>Risk of loss and title for products pass to you upon delivery to the shipping carrier.</li>
                </ul>
              </div>
            </div>

            <div className="animate-fade-in-up">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">6. Returns and Refunds</h2>
              <div className="text-gray-600 leading-relaxed space-y-3">
                <p>Please refer to our <Link to="/return-policy" className="text-primary-600 hover:text-primary-700 font-medium underline">Return Policy</Link> page for detailed information about returns, exchanges, and refunds. Key highlights include:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Most products can be returned within 30 days of delivery.</li>
                  <li>Products must be unused, undamaged, and in their original packaging.</li>
                  <li>Refunds are processed within 5-7 business days after we receive the returned item.</li>
                  <li>Certain categories of products may not be eligible for return (e.g., personal care, innerwear).</li>
                </ul>
              </div>
            </div>

            <div className="animate-fade-in-up">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">7. Intellectual Property</h2>
              <div className="text-gray-600 leading-relaxed space-y-3">
                <p>All content on this Website, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, and software, is the property of Cartify or its content suppliers and is protected by international copyright, trademark, and other intellectual property laws.</p>
                <p>You may not reproduce, distribute, modify, create derivative works of, publicly display, or exploit any content from this Website without our prior written consent.</p>
              </div>
            </div>

            <div className="animate-fade-in-up">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">8. User Conduct</h2>
              <div className="text-gray-600 leading-relaxed space-y-3">
                <p>By using our Website, you agree not to:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Use the Website for any unlawful purpose or in violation of any applicable laws</li>
                  <li>Attempt to gain unauthorized access to our systems or user accounts</li>
                  <li>Interfere with or disrupt the Website or servers connected to the Website</li>
                  <li>Submit false or misleading information, including fake reviews or fraudulent orders</li>
                  <li>Use automated systems (bots, scrapers) to access the Website without our express permission</li>
                  <li>Harass, abuse, or harm other users of the Website</li>
                </ul>
              </div>
            </div>

            <div className="animate-fade-in-up">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">9. Limitation of Liability</h2>
              <div className="text-gray-600 leading-relaxed space-y-3">
                <p>To the fullest extent permitted by law, Cartify and its affiliates, officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or goodwill, arising from your use of the Website or any products purchased through the Website.</p>
                <p>Our total liability for any claim arising from your use of the Website shall not exceed the amount paid by you for the specific product or service giving rise to the claim.</p>
              </div>
            </div>

            <div className="animate-fade-in-up">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">10. Governing Law</h2>
              <div className="text-gray-600 leading-relaxed">
                <p>These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra, India.</p>
              </div>
            </div>

            <div className="animate-fade-in-up">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">11. Changes to Terms</h2>
              <div className="text-gray-600 leading-relaxed">
                <p>We reserve the right to update or modify these Terms and Conditions at any time without prior notice. Changes will be effective immediately upon posting on this page. Your continued use of the Website after any changes constitutes your acceptance of the modified terms. We encourage you to review this page periodically for updates.</p>
              </div>
            </div>

            <div className="animate-fade-in-up">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">12. Contact Information</h2>
              <div className="text-gray-600 leading-relaxed">
                <p>If you have any questions about these Terms and Conditions, please contact us:</p>
                <div className="bg-gray-50 rounded-xl p-6 mt-4">
                  <p><strong>Cartify Technologies Pvt. Ltd.</strong></p>
                  <p>Email: legal@cartify.com</p>
                  <p>Phone: +91 1800-123-4567</p>
                  <p>Address: 123, Tech Park, Andheri East, Mumbai, Maharashtra - 400069</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="relative overflow-hidden rounded-2xl border border-sky-200/80 bg-gradient-to-r from-sky-100 via-blue-50 to-cyan-100 p-10 text-center">
              <div className="absolute inset-0 opacity-75">
                <div className="absolute -top-8 left-8 h-52 w-52 rounded-full bg-sky-300/60 blur-3xl" />
                <div className="absolute bottom-0 right-8 h-60 w-60 rounded-full bg-cyan-300/50 blur-3xl" />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Need Clarification on Our Terms?</h3>
                <p className="text-slate-600 mb-6 max-w-xl mx-auto">Our legal and support team can help you understand policies around orders, payments, and account usage.</p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Link to="/contact" className="bg-gradient-to-r from-primary-600 to-sky-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-primary-700 hover:to-sky-600 transition-all">Contact Us</Link>
                  <Link to="/return-policy" className="border-2 border-sky-300 text-sky-900 px-8 py-3 rounded-lg font-semibold hover:bg-white/70 transition-colors">View Return Policy</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
