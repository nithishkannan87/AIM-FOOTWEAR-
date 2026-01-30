import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;
  
  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="group relative bg-white flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-50 rounded-lg">
        <Link to={`/product/${product.id}`}>
            <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
            <span className="bg-blue-900 text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide rounded-sm">
                New
            </span>
            )}
             {discount > 0 && (
                <span className="md:hidden bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide rounded-sm">
                    {discount}% OFF
                </span>
            )}
        </div>

        {/* Wishlist Button */}
        <button 
          className={`absolute top-2 right-2 p-1.5 rounded-full transition-colors ${isWishlisted ? 'bg-white text-red-500 shadow-sm' : 'bg-white/80 text-gray-500 hover:text-red-500 hover:bg-white'}`}
          onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
          }}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Add Overlay (Desktop) */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex justify-center bg-gradient-to-t from-black/20 to-transparent">
             <button 
                onClick={(e) => {
                    e.preventDefault();
                    addToCart(product, product.availableSizes[0]);
                }}
                className="w-full bg-white text-gray-900 font-bold py-2 rounded shadow-lg hover:bg-gray-100 text-sm uppercase tracking-wide"
             >
                Add to Cart
             </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-3 flex flex-col flex-1">
        <div className="text-xs text-gray-500 mb-1">Walkaroo</div>
        <Link to={`/product/${product.id}`} className="block">
            <h3 className="text-sm text-gray-800 font-medium leading-tight group-hover:text-blue-700 transition-colors line-clamp-2 min-h-[2.5em]">
            {product.name}
            </h3>
        </Link>
        
        <div className="mt-2 flex items-center flex-wrap gap-2">
            <span className="text-base font-bold text-gray-900">₹{product.price}</span>
            {product.originalPrice && (
                <>
                <span className="text-xs text-gray-500 line-through">₹{product.originalPrice}</span>
                <span className="text-xs font-bold text-orange-600 hidden md:inline-block">({discount}% OFF)</span>
                </>
            )}
        </div>
      </div>
    </div>
  );
};