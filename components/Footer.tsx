import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="text-white text-2xl font-serif font-bold tracking-wider">AIM <span className="text-sm font-sans font-medium tracking-widest block">FOOTWEAR</span></h3>
            <p className="text-sm leading-relaxed">
              Step into comfort with AIM Footwear. We bring durable, stylish, and high-quality sneakers and slippers right to your doorstep.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-white transition"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-white transition"><Instagram className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#/catalog?category=Men" className="hover:text-white transition">Men's Collection</a></li>
              <li><a href="#/catalog?category=Women" className="hover:text-white transition">Women's Collection</a></li>
              <li><a href="#/catalog?category=Kids" className="hover:text-white transition">Kids' Collection</a></li>
              <li><a href="#/catalog" className="hover:text-white transition">New Arrivals</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Track Order</a></li>
              <li><a href="#" className="hover:text-white transition">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-white transition">Size Guide</a></li>
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>123 Market Street, Footwear Plaza, Mumbai, India</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>support@aimfootwear.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} AIM FOOTWEAR. All rights reserved. This is a demo MVP.</p>
        </div>
      </div>
    </footer>
  );
};