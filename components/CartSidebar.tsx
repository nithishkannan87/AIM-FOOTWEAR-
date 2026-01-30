import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export const CartSidebar: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, subtotal } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="relative z-[60]">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md transform transition-transform ease-in-out duration-500 bg-white shadow-xl flex flex-col h-full">
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-6 sm:px-6 border-b border-gray-100">
            <h2 className="text-lg font-medium text-gray-900">Shopping Cart</h2>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500"
              onClick={() => setIsCartOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <ShoppingBag className="h-16 w-16 text-gray-300" />
                <p className="text-lg font-medium text-gray-900">Your cart is empty</p>
                <p className="text-sm text-gray-500 max-w-xs">
                  Looks like you haven't added any Walkaroo footwear yet.
                </p>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <ul className="-my-6 divide-y divide-gray-200">
                {cart.map((item) => (
                  <li key={`${item.id}-${item.selectedSize}`} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3 className="line-clamp-1"><a href="#">{item.name}</a></h3>
                          <p className="ml-4">₹{item.price * item.quantity}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{item.category} | Size: {item.selectedSize}</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button 
                            onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                            className="p-1 hover:bg-gray-100 text-gray-600"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-2 font-medium text-gray-900">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100 text-gray-600"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id, item.selectedSize)}
                          className="font-medium text-red-600 hover:text-red-500 flex items-center"
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6 bg-gray-50">
              <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                <p>Subtotal</p>
                <p>₹{subtotal}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500 mb-6">Shipping and taxes calculated at checkout.</p>
              <div className="space-y-3">
                 <Link
                  to="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 w-full"
                >
                  View Cart
                </Link>
                <button
                  onClick={() => alert("This is a demo. Checkout is disabled.")}
                  className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 w-full"
                >
                  Checkout (Demo)
                </button>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or{' '}
                  <button
                    type="button"
                    className="font-medium text-blue-600 hover:text-blue-500"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
