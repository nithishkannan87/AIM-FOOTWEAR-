import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, subtotal } = useCart();
  const shipping = 50;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8">It looks like you haven't added any footwear yet.</p>
        <Link to="/catalog" className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-12">Shopping Cart</h1>
      
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
        {/* Cart Items */}
        <section className="lg:col-span-8 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {cart.map((item) => (
              <li key={`${item.id}-${item.selectedSize}`} className="p-6 flex sm:flex-row flex-col">
                <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 mb-4 sm:mb-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-0 sm:ml-6 flex-1 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-base font-medium text-gray-900">
                        <Link to={`/product/${item.id}`}>{item.name}</Link>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                      <p className="mt-1 text-sm text-gray-500">Size: {item.selectedSize}</p>
                    </div>
                    <p className="text-base font-medium text-gray-900">₹{item.price}</p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center border border-gray-300 rounded-md">
                        <button 
                            onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                            className="p-2 hover:bg-gray-100 text-gray-600"
                        >
                            <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 font-medium text-gray-900">{item.quantity}</span>
                        <button 
                            onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100 text-gray-600"
                        >
                            <Plus className="h-4 w-4" />
                        </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id, item.selectedSize)}
                      className="text-sm font-medium text-red-600 hover:text-red-500 flex items-center"
                    >
                      <Trash2 className="h-4 w-4 mr-1.5" />
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Order Summary */}
        <section className="lg:col-span-4 mt-8 lg:mt-0 bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
          
          <dl className="space-y-4">
            <div className="flex items-center justify-between">
              <dt className="text-sm text-gray-600">Subtotal</dt>
              <dd className="text-sm font-medium text-gray-900">₹{subtotal}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-sm text-gray-600">Shipping</dt>
              <dd className="text-sm font-medium text-gray-900">₹{shipping}</dd>
            </div>
             <div className="flex items-center justify-between">
              <dt className="text-sm text-gray-600">Tax Estimate</dt>
              <dd className="text-sm font-medium text-gray-900">Included</dd>
            </div>
            
            <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
              <dt className="text-base font-bold text-gray-900">Order Total</dt>
              <dd className="text-base font-bold text-gray-900">₹{total}</dd>
            </div>
          </dl>

          <div className="mt-8">
            <button
              onClick={() => alert('Demo only: Checkout is disabled.')}
              className="w-full bg-blue-600 border border-transparent rounded-full py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none transition flex items-center justify-center"
            >
              Proceed to Checkout
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <p className="mt-4 text-xs text-gray-500 text-center">
              This is a demo store. No payment will be processed.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
