import { Link } from 'react-router-dom';
import { Users, Target, Award, Globe, Heart, Zap, ShieldCheck, TrendingUp } from 'lucide-react';

const stats = [
  { label: 'Happy Customers', value: '50,000+', icon: Users },
  { label: 'Products Listed', value: '10,000+', icon: ShieldCheck },
  { label: 'Cities Served', value: '500+', icon: Globe },
  { label: 'Years of Trust', value: '5+', icon: Award },
];

const values = [
  { title: 'Customer First', description: 'Every decision we make starts with the question: "How does this benefit our customers?" We are committed to providing the best shopping experience.', icon: Heart },
  { title: 'Quality Assured', description: 'We partner with trusted brands and manufacturers to ensure every product meets our rigorous quality standards before it reaches you.', icon: ShieldCheck },
  { title: 'Innovation Driven', description: 'We continuously invest in technology to make your shopping experience faster, smoother, and more enjoyable with cutting-edge features.', icon: Zap },
  { title: 'Sustainable Growth', description: 'We believe in responsible business practices. From eco-friendly packaging to carbon-neutral delivery, sustainability is at our core.', icon: TrendingUp },
];

const team = [
  { name: 'Arjun Patel', role: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop' },
  { name: 'Priya Sharma', role: 'CTO', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop' },
  { name: 'Rahul Verma', role: 'Head of Operations', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop' },
  { name: 'Neha Gupta', role: 'Head of Design', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop' },
];

export const About = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-sky-200/80 bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100 py-20 text-slate-900">
        <div className="absolute inset-0 opacity-80">
          <div className="absolute -top-8 left-10 h-64 w-64 rounded-full bg-sky-300/60 blur-3xl" />
          <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-cyan-300/50 blur-3xl" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up">About Cartify</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto animate-fade-in-up stagger-1">
            We're on a mission to make quality products accessible to everyone. Founded in 2019, Cartify has grown from a small startup to one of India's most trusted e-commerce platforms.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={stat.label} className="text-center animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <stat.icon className="h-10 w-10 text-primary-600 mx-auto mb-3" />
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Cartify started with a simple idea: what if we could bring the best products from around the world to every doorstep in India? In 2019, our founder Arjun Patel set out to create an e-commerce platform that prioritized quality, affordability, and customer satisfaction above all else.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                What began as a small team of 5 working out of a garage in Mumbai has now grown into a thriving company with over 200 employees serving customers across 500+ cities. Our journey has been fueled by the trust of our customers and the dedication of our incredible team.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, Cartify offers over 10,000 products across 8 categories, from electronics and fashion to home essentials and beauty products. We partner with 1,000+ trusted brands to ensure that every product on our platform meets the highest standards of quality.
              </p>
            </div>
            <div className="animate-slide-in-right">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600" alt="Our team collaborating" className="rounded-2xl shadow-xl w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl p-8 animate-fade-in-up">
              <Target className="h-10 w-10 text-primary-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To democratize access to quality products by leveraging technology to create a seamless, trustworthy, and affordable shopping experience for every Indian consumer. We strive to bridge the gap between world-class products and local accessibility.
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-8 animate-fade-in-up stagger-1">
              <Globe className="h-10 w-10 text-orange-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To become India's most loved and trusted e-commerce platform by 2030, serving 100 million customers with an unmatched selection of products, lightning-fast delivery, and exceptional customer service that sets the industry standard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <div key={value.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <value.icon className="h-8 w-8 text-primary-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Meet Our Leadership</h2>
          <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">Our diverse team of passionate individuals brings together expertise from technology, retail, logistics, and design to build the future of e-commerce.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <div key={member.name} className="text-center animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg" />
                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-3xl border border-sky-200/80 bg-gradient-to-r from-sky-100 via-blue-50 to-cyan-100 p-10 text-center">
            <div className="absolute inset-0 opacity-75">
              <div className="absolute -top-8 left-10 h-56 w-56 rounded-full bg-sky-300/60 blur-3xl" />
              <div className="absolute bottom-0 right-10 h-64 w-64 rounded-full bg-cyan-300/50 blur-3xl" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to Start Shopping?</h2>
              <p className="text-slate-600 mb-8 max-w-lg mx-auto">Join over 50,000 happy customers who trust Cartify for their everyday shopping needs.</p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link to="/products" className="bg-gradient-to-r from-primary-600 to-sky-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-primary-700 hover:to-sky-600 transition-all">Browse Products</Link>
                <Link to="/signup" className="border-2 border-sky-300 text-sky-900 px-8 py-3 rounded-lg font-semibold hover:bg-white/70 transition-colors">Create Account</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
