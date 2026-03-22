import { Link } from 'react-router-dom';
import { Shield, Eye, Lock, Database, Bell, Users, Globe, Mail } from 'lucide-react';

export const Privacy = () => {
  const lastUpdated = 'January 15, 2025';

  return (
    <div className="animate-fade-in">
      <section className="relative overflow-hidden border-b border-sky-200/80 bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100 py-16 text-slate-900">
        <div className="absolute inset-0 opacity-80">
          <div className="absolute -top-10 left-10 h-64 w-64 rounded-full bg-sky-300/60 blur-3xl" />
          <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-cyan-300/50 blur-3xl" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <Shield className="h-12 w-12 text-primary-700 mx-auto mb-4 animate-fade-in-up" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up">Privacy Policy</h1>
          <p className="text-slate-600 animate-fade-in-up stagger-1">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom max-w-4xl">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-10">
            <p className="text-blue-800">
              At Cartify, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase. Please read this policy carefully.
            </p>
          </div>

          <div className="space-y-10">
            <div className="animate-fade-in-up">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary-50 rounded-lg"><Database className="h-5 w-5 text-primary-600" /></div>
                <h2 className="text-2xl font-bold text-gray-900">1. Information We Collect</h2>
              </div>
              <div className="pl-12 space-y-3 text-gray-600 leading-relaxed">
                <p><strong>Personal Information:</strong> When you register an account, place an order, or contact us, we may collect your name, email address, phone number, shipping address, and payment information.</p>
                <p><strong>Automatically Collected Information:</strong> We automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, access times, and pages viewed.</p>
                <p><strong>Cookies and Tracking:</strong> We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookies through your browser settings.</p>
                <p><strong>Device Information:</strong> We may collect information about the device you use to access our services, including device type, operating system, unique device identifiers, and mobile network information.</p>
              </div>
            </div>

            <div className="animate-fade-in-up">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-50 rounded-lg"><Eye className="h-5 w-5 text-green-600" /></div>
                <h2 className="text-2xl font-bold text-gray-900">2. How We Use Your Information</h2>
              </div>
              <div className="pl-12 space-y-3 text-gray-600 leading-relaxed">
                <p>We use the information we collect for the following purposes:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>To process and fulfill your orders, including shipping and payment processing</li>
                  <li>To create and manage your account on our platform</li>
                  <li>To communicate with you about your orders, account, and customer service inquiries</li>
                  <li>To send you promotional emails, newsletters, and special offers (with your consent)</li>
                  <li>To improve our website, products, and services based on your feedback and usage patterns</li>
                  <li>To detect, prevent, and address fraud, security breaches, and technical issues</li>
                  <li>To comply with legal obligations and enforce our terms of service</li>
                </ul>
              </div>
            </div>

            <div className="animate-fade-in-up">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-50 rounded-lg"><Users className="h-5 w-5 text-orange-600" /></div>
                <h2 className="text-2xl font-bold text-gray-900">3. Information Sharing</h2>
              </div>
              <div className="pl-12 space-y-3 text-gray-600 leading-relaxed">
                <p>We do not sell, trade, or rent your personal information to third parties. However, we may share your information in the following circumstances:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Service Providers:</strong> We share information with trusted third-party service providers who assist us in operating our website, processing payments, and delivering products.</li>
                  <li><strong>Legal Requirements:</strong> We may disclose your information if required by law, regulation, legal process, or governmental request.</li>
                  <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.</li>
                  <li><strong>With Your Consent:</strong> We may share your information with third parties when you have given us explicit consent to do so.</li>
                </ul>
              </div>
            </div>

            <div className="animate-fade-in-up">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-50 rounded-lg"><Lock className="h-5 w-5 text-purple-600" /></div>
                <h2 className="text-2xl font-bold text-gray-900">4. Data Security</h2>
              </div>
              <div className="pl-12 space-y-3 text-gray-600 leading-relaxed">
                <p>We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. These measures include:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>SSL/TLS encryption for all data transmitted between your browser and our servers</li>
                  <li>Secure payment processing through PCI-DSS compliant payment gateways</li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Access controls and authentication measures for our internal systems</li>
                  <li>Employee training on data protection and privacy best practices</li>
                </ul>
                <p>While we strive to protect your information, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security of your data.</p>
              </div>
            </div>

            <div className="animate-fade-in-up">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-yellow-50 rounded-lg"><Bell className="h-5 w-5 text-yellow-600" /></div>
                <h2 className="text-2xl font-bold text-gray-900">5. Your Rights & Choices</h2>
              </div>
              <div className="pl-12 space-y-3 text-gray-600 leading-relaxed">
                <p>You have the following rights regarding your personal information:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Access:</strong> You can request a copy of the personal information we hold about you.</li>
                  <li><strong>Correction:</strong> You can update or correct inaccurate information in your account settings.</li>
                  <li><strong>Deletion:</strong> You can request deletion of your account and personal data, subject to legal retention requirements.</li>
                  <li><strong>Opt-Out:</strong> You can unsubscribe from promotional emails at any time by clicking the unsubscribe link in our emails.</li>
                  <li><strong>Cookie Control:</strong> You can manage cookie preferences through your browser settings.</li>
                </ul>
              </div>
            </div>

            <div className="animate-fade-in-up">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-50 rounded-lg"><Globe className="h-5 w-5 text-red-600" /></div>
                <h2 className="text-2xl font-bold text-gray-900">6. Third-Party Links</h2>
              </div>
              <div className="pl-12 text-gray-600 leading-relaxed">
                <p>Our website may contain links to third-party websites, plugins, and applications. Clicking on those links may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy practices. We encourage you to read the privacy policy of every website you visit.</p>
              </div>
            </div>

            <div className="animate-fade-in-up">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-teal-50 rounded-lg"><Mail className="h-5 w-5 text-teal-600" /></div>
                <h2 className="text-2xl font-bold text-gray-900">7. Contact Us</h2>
              </div>
              <div className="pl-12 text-gray-600 leading-relaxed">
                <p>If you have any questions or concerns about this Privacy Policy, please contact us:</p>
                <div className="bg-gray-50 rounded-xl p-6 mt-4">
                  <p><strong>Cartify Technologies Pvt. Ltd.</strong></p>
                  <p>Data Protection Officer</p>
                  <p>Email: privacy@cartify.com</p>
                  <p>Phone: +91 1800-123-4567</p>
                  <p>Address: 123, Tech Park, Andheri East, Mumbai - 400069</p>
                </div>
              </div>
            </div>

            <div className="animate-fade-in-up">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Changes to This Policy</h2>
              <div className="pl-0 text-gray-600 leading-relaxed">
                <p>We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. Your continued use of our services after any changes constitutes your acceptance of the updated policy.</p>
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
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Questions About Your Data?</h3>
                <p className="text-slate-600 mb-6 max-w-xl mx-auto">Reach out to our privacy team for account data requests, policy clarifications, or security-related concerns.</p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Link to="/contact" className="bg-gradient-to-r from-primary-600 to-sky-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-primary-700 hover:to-sky-600 transition-all">Contact Our Privacy Team</Link>
                  <Link to="/terms" className="border-2 border-sky-300 text-sky-900 px-8 py-3 rounded-lg font-semibold hover:bg-white/70 transition-colors">Read Terms & Conditions</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
