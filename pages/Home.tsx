import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { PRODUCTS } from '../mockData';
import { ProductCard } from '../components/ProductCard';

export const Home: React.FC = () => {
  const featuredProducts = PRODUCTS.filter(p => p.isNew || p.rating > 4.5).slice(0, 4);

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Banner */}
      <div className="relative bg-gray-50 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=2000&auto=format&fit=crop"
            alt="Footwear Collection"
            className="w-full h-full object-cover"
          />
          {/* Subtle white gradient for text readability if needed, or remove completely */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-gray-900">
              Step into Comfort with <span className="text-orange-600">Walkaroo</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8 font-medium">
              Discover the latest collection of durable, stylish sneakers and slippers for the whole family.
            </p>
            <div className="flex space-x-4">
              <Link to="/catalog" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition">
                Shop Now
              </Link>
              <Link to="/catalog?category=Men" className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition shadow-sm">
                Men's Collection
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start space-x-4">
            <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Authentic Products</h3>
              <p className="text-sm text-gray-500 mt-1">100% Genuine Walkaroo footwear directly from the manufacturer.</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start space-x-4">
            <div className="bg-orange-100 p-3 rounded-lg text-orange-600">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Fast Delivery</h3>
              <p className="text-sm text-gray-500 mt-1">Reliable shipping across India within 3-5 business days.</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start space-x-4">
            <div className="bg-green-100 p-3 rounded-lg text-green-600">
              <RotateCcw className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Easy Returns</h3>
              <p className="text-sm text-gray-500 mt-1">Hassle-free 7-day return policy for sizing issues.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { name: "Men's", img: 'https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16?auto=format&fit=crop&q=80&w=600', link: '/catalog?category=Men' },
            { name: "Women's", img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=600', link: '/catalog?category=Women' },
            { name: "Kids'", img: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=600', link: '/catalog?category=Kids' },
          ].map((cat) => (
            <Link key={cat.name} to={cat.link} className="group relative rounded-xl overflow-hidden aspect-[4/3] shadow-md">
              <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div className="w-full flex justify-between items-center">
                  <span className="text-2xl font-bold text-white">{cat.name}</span>
                  <span className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white group-hover:bg-white group-hover:text-black transition">
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
          <Link to="/catalog" className="text-blue-600 font-medium hover:text-blue-800 flex items-center">
            View All <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-orange-500 rounded-2xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between">
          <div className="relative z-10 max-w-lg text-center md:text-left text-white">
            <h2 className="text-3xl font-bold mb-4">Summer Sale is Live!</h2>
            <p className="text-orange-100 mb-6 text-lg">Get up to 40% off on Walkaroo slippers and sandals. Limited time offer.</p>
            <Link to="/catalog?type=Slippers" className="inline-block bg-white text-orange-600 font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition shadow-lg">
              Shop Slippers
            </Link>
          </div>
          <div className="relative z-10 mt-8 md:mt-0">
            {/* Decorative circle or icon could go here */}
            <div className="w-64 h-64 bg-white/10 rounded-full blur-3xl absolute -top-10 -right-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};