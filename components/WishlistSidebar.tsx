import React from 'react';
import { X, Trash2, ShoppingCart, Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../mockData';
import { Link } from 'react-router-dom';

export const WishlistSidebar: React.FC = () => {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!isWishlistOpen) return null;

  // Filter products based on IDs in the wishlist
  const wishlistProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <div className="relative z-[60]">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={() => setIsWishlistOpen(false)}
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md transform transition-transform ease-in-out duration-500 bg-white shadow-xl flex flex-col h-full">
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-6 sm:px-6 border-b border-gray-100">
            <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <Heart className="h-5 w-5 fill-red-500 text-red-500" />
              Your Wishlist
            </h2>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500"
              onClick={() => setIsWishlistOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            {wishlistProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <Heart className="h-16 w-16 text-gray-300" />
                <p className="text-lg font-medium text-gray-900">Your wishlist is empty</p>
                <p className="text-sm text-gray-500 max-w-xs">
                  Save items you love to buy them later.
                </p>
                <button 
                  onClick={() => setIsWishlistOpen(false)}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              <ul className="-my-6 divide-y divide-gray-200">
                {wishlistProducts.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <Link to={`/product/${product.id}`} onClick={() => setIsWishlistOpen(false)}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </Link>
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3 className="line-clamp-2">
                            <Link to={`/product/${product.id}`} onClick={() => setIsWishlistOpen(false)}>
                                {product.name}
                            </Link>
                          </h3>
                          <p className="ml-4 whitespace-nowrap">₹{product.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                      </div>
                      
                      <div className="flex flex-1 items-end justify-between text-sm mt-4">
                        <button
                          onClick={() => {
                            addToCart(product, product.availableSizes[0]);
                            removeFromWishlist(product.id);
                          }}
                          className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                        >
                            <ShoppingCart className="h-4 w-4" />
                            Move to Cart
                        </button>

                        <button
                          type="button"
                          onClick={() => removeFromWishlist(product.id)}
                          className="font-medium text-gray-400 hover:text-red-500 flex items-center"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};