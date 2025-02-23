import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(products)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://glore-bd-backend-node-mongo.vercel.app/api/product');
        setProducts(response.data?.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.length > 0 && products?.map((product) => (
          <Link 
            to={`/product/${product?._id}`} 
            key={product?._id}
            className="group"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
              <div className="aspect-w-1 aspect-h-1 w-full">
                <img
                  src={product?.images && product?.images[0]?.optimizeUrl}
                  alt={product?.name}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {product?.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {product?.description?.substring(0, 100)}...
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-indigo-600 font-bold">
                    ${product?.price}
                  </span>
                  <span className="text-sm text-gray-500">
                    {product?.category?.name}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;