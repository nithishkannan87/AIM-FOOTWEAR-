import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, User, LogOut, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

export const Header: React.FC = () => {
  const { itemCount, setIsCartOpen } = useCart();
  const { wishlistCount, setIsWishlistOpen } = useWishlist();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path || location.search.includes(path.split('?')[1] || '');

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchTerm)}`);
      setIsSearchOpen(false);
      setSearchTerm('');
    }
  };

  // Hide header on login page
  if (location.pathname === '/login') return null;

  return (
    <>
      {/* Demo Site Disclaimer - PRD Requirement */}
      <div className="bg-orange-500 text-white text-xs py-2 text-center font-bold px-4 z-50 relative">
        ⚠️ DEMO SITE: This is a showcase application. No real products are sold. No payments are processed.
      </div>

      {/* Announcement Bar */}
      <div className="bg-blue-900 text-white text-xs py-2 text-center tracking-wide font-medium px-4">
        FREE SHIPPING ON ORDERS ABOVE ₹999 | EASY RETURNS
      </div>

      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Mobile Menu Button (Left) */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-900 focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
            </div>

            {/* Logo (Center on mobile, Left on Desktop) */}
            <div className="flex-shrink-0 flex items-center justify-center flex-1 md:flex-none md:justify-start">
              <Link to="/" className="flex flex-col items-center justify-center">
                {/* Sneaker Icon */}
                <div className="text-blue-900 mb-0.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                    <path d="M4 16v-5.5a2.5 2.5 0 0 1 2.5-2.5h2l2-3h3a2 2 0 0 1 2 2v2.5" />
                    <path d="M4 16h14.5a2.5 2.5 0 0 0 2.5-2.5V11" />
                    <path d="M9 16V8" />
                    <path d="M13 12H9" />
                    <path d="M14 9h-2" />
                    <path d="M2 12h2" />
                    <path d="M2 15h2" />
                  </svg>
                </div>
                {/* Text Logo */}
                <span className="text-3xl font-serif font-bold tracking-wider text-blue-900 leading-none">AIM</span>
                <span className="text-[0.7rem] font-sans font-bold tracking-[0.3em] text-blue-900 leading-none mt-1">FOOTWEAR</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            {!isSearchOpen && (
              <nav className="hidden md:flex space-x-8 items-center justify-center flex-1">
                <Link to="/" className="text-sm font-bold text-gray-700 hover:text-blue-900 uppercase tracking-wide transition-colors">Home</Link>
                <Link to="/catalog" className="text-sm font-bold text-gray-700 hover:text-blue-900 uppercase tracking-wide transition-colors">All Products</Link>
                <Link to="/catalog?category=Men" className="text-sm font-bold text-gray-700 hover:text-blue-900 uppercase tracking-wide transition-colors">Men</Link>
                <Link to="/catalog?category=Women" className="text-sm font-bold text-gray-700 hover:text-blue-900 uppercase tracking-wide transition-colors">Women</Link>
                <Link to="/catalog?category=Kids" className="text-sm font-bold text-gray-700 hover:text-blue-900 uppercase tracking-wide transition-colors">Kids</Link>
              </nav>
            )}

            {/* Right Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">

              {/* Search Toggle */}
              <div className="relative flex items-center">
                {isSearchOpen ? (
                  <form onSubmit={handleSearch} className="flex items-center absolute right-0 top-1/2 -translate-y-1/2 bg-white z-20 w-[calc(100vw-40px)] sm:w-80 shadow-lg border rounded-full overflow-hidden">
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onBlur={() => {
                        setTimeout(() => {
                          if (!searchTerm) setIsSearchOpen(false);
                        }, 150);
                      }}
                      className="block w-full pl-4 pr-10 py-2 border-none focus:ring-0 text-sm"
                      placeholder="Search for footwear..."
                    />
                    <button
                      type="button"
                      onClick={() => { setIsSearchOpen(false); setSearchTerm(''); }}
                      className="absolute right-0 p-2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </form>
                ) : (
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="text-gray-700 hover:text-blue-900 p-2"
                    title="Search"
                  >
                    <Search className="h-6 w-6" />
                  </button>
                )}
              </div>

              {/* Wishlist */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="text-gray-700 hover:text-blue-900 p-2 relative hidden sm:block"
                title="Wishlist"
              >
                <Heart className="h-6 w-6" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-0.5 inline-flex items-center justify-center h-4 w-4 text-[9px] font-bold leading-none text-white transform translate-x-0 translate-y-0 bg-red-500 rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* User Account */}
              {user ? (
                <div className={`hidden sm:flex items-center ${isSearchOpen ? 'opacity-0' : ''}`}>
                  <button
                    onClick={logout}
                    className="text-gray-700 hover:text-red-500 p-2"
                    title="Sign Out"
                  >
                    <LogOut className="h-6 w-6" />
                  </button>
                </div>
              ) : (
                <Link to="/login" className={`text-gray-700 hover:text-blue-900 hidden sm:block p-2 ${isSearchOpen ? 'opacity-0' : ''}`} title="Sign In">
                  <User className="h-6 w-6" />
                </Link>
              )}

              {/* Cart */}
              <button
                className={`group p-2 flex items-center relative ${isSearchOpen ? 'opacity-0' : ''}`}
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="flex-shrink-0 h-6 w-6 text-gray-700 group-hover:text-blue-900" />
                {itemCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center h-5 w-5 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-blue-900 rounded-full">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && !isSearchOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white absolute w-full z-40 shadow-lg">
            <div className="pt-2 pb-4 space-y-1 px-4">
              <Link to="/" className="block py-3 text-base font-bold text-gray-800 border-b border-gray-100">HOME</Link>
              <Link to="/catalog" className="block py-3 text-base font-bold text-gray-800 border-b border-gray-100">ALL PRODUCTS</Link>
              <Link to="/catalog?category=Men" className="block py-3 text-base font-bold text-gray-800 border-b border-gray-100">MEN</Link>
              <Link to="/catalog?category=Women" className="block py-3 text-base font-bold text-gray-800 border-b border-gray-100">WOMEN</Link>
              <Link to="/catalog?category=Kids" className="block py-3 text-base font-bold text-gray-800 border-b border-gray-100">KIDS</Link>

              <button
                onClick={() => { setIsMobileMenuOpen(false); setIsWishlistOpen(true); }}
                className="block w-full text-left py-3 text-base font-bold text-gray-800 border-b border-gray-100"
              >
                WISHLIST ({wishlistCount})
              </button>

              <div className="pt-4 flex items-center justify-between">
                {user ? (
                  <div className="flex items-center justify-between w-full">
                    <span className="text-base font-medium text-gray-700">Hi, {user.name}</span>
                    <button onClick={logout} className="text-sm font-medium text-red-600">Sign Out</button>
                  </div>
                ) : (
                  <Link to="/login" className="block text-base font-medium text-blue-600">
                    Sign In / Register
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};