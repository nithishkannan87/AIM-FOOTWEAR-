import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Truck, Shield, RotateCcw, AlertCircle, ShoppingCart, Heart } from 'lucide-react';
import { PRODUCTS } from '../mockData';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/ProductCard';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find((p) => p.id === id);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return <div className="p-10 text-center">Product not found</div>;
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError('Please select a size');
      return;
    }
    setError(null);
    addToCart(product, selectedSize);
  };

  const isWishlisted = isInWishlist(product.id);
  
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex text-sm text-gray-500 mb-8">
            <Link to="/" className="hover:text-gray-900">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/catalog" className="hover:text-gray-900">Catalog</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium truncate">{product.name}</span>
        </nav>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
          {/* Image Gallery */}
          <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-sm">
            <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Product Info */}
          <div className="mt-10 px-2 sm:px-0 sm:mt-16 lg:mt-0">
            <div className="mb-4">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center space-x-2">
                    <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`} />
                        ))}
                    </div>
                    <span className="text-sm text-gray-500">({product.reviewsCount} reviews)</span>
                </div>
            </div>

            <div className="mt-4">
                <p className="text-3xl tracking-tight text-gray-900 font-bold">
                    ₹{product.price} 
                    {product.originalPrice && <span className="ml-3 text-lg text-gray-400 line-through font-normal">₹{product.originalPrice}</span>}
                    {product.originalPrice && (
                        <span className="ml-3 text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </span>
                    )}
                </p>
                <p className="mt-1 text-sm text-gray-500">Inclusive of all taxes</p>
            </div>

            <div className="mt-8">
                <h3 className="text-sm font-medium text-gray-900">Description</h3>
                <div className="mt-2 prose prose-sm text-gray-500">
                    <p>{product.description}</p>
                </div>
            </div>

            <div className="mt-8">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Select Size (UK/India)</h3>
                    <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">Size Guide</a>
                </div>

                <div className="grid grid-cols-5 gap-3 mt-4">
                    {product.availableSizes.map((size) => (
                        <button
                            key={size}
                            type="button"
                            onClick={() => { setSelectedSize(size); setError(null); }}
                            className={`
                                group flex items-center justify-center rounded-md border py-3 text-sm font-medium uppercase sm:flex-1
                                ${selectedSize === size 
                                    ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-105' 
                                    : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-50'}
                                transition-all duration-200
                            `}
                        >
                            {size}
                        </button>
                    ))}
                </div>
                {error && (
                    <div className="mt-3 flex items-center text-red-600 text-sm">
                        <AlertCircle className="h-4 w-4 mr-1.5" />
                        {error}
                    </div>
                )}
            </div>

            <div className="mt-10 flex space-x-4">
                <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-orange-600 border border-transparent rounded-full py-4 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                </button>
                <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-4 rounded-full border transition flex items-center justify-center ${isWishlisted ? 'bg-red-50 border-red-200 text-red-600' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                    title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                     <Heart className={`h-6 w-6 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 border-t border-gray-200 pt-8 grid grid-cols-2 gap-x-6 gap-y-6">
                <div className="flex items-start">
                    <div className="flex-shrink-0 text-gray-400">
                        <Truck className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                        <h4 className="text-sm font-medium text-gray-900">Fast Delivery</h4>
                        <p className="mt-1 text-sm text-gray-500">Ships within 24 hours</p>
                    </div>
                </div>
                 <div className="flex items-start">
                    <div className="flex-shrink-0 text-gray-400">
                        <Shield className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                        <h4 className="text-sm font-medium text-gray-900">Warranty</h4>
                        <p className="mt-1 text-sm text-gray-500">30 days manufacturer warranty</p>
                    </div>
                </div>
                 <div className="flex items-start">
                    <div className="flex-shrink-0 text-gray-400">
                        <RotateCcw className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                        <h4 className="text-sm font-medium text-gray-900">Returns</h4>
                        <p className="mt-1 text-sm text-gray-500">7 day replacement policy</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mt-16 border-t border-gray-200 pt-16">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">You may also like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map(p => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};