import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://glore-bd-backend-node-mongo.vercel.app/api/product/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product details');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">{error}</div>
    );
  }

  if (!product) {
    return (
      <div className="text-center text-gray-600 p-4">Product not found</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="text-indigo-600 hover:text-indigo-800 mb-4 inline-block">
        ← Back to Products
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg shadow-lg object-cover"
          />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <div className="text-2xl font-semibold text-indigo-600">
            ${product.price}
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">Category</h2>
            <p className="text-gray-600">{product.category}</p>
          </div>
          
          {product.specs && (
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">Specifications</h2>
              <ul className="list-disc list-inside text-gray-600">
                {Object.entries(product.specs).map(([key, value]) => (
                  <li key={key}>
                    <span className="font-medium">{key}:</span> {value}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <button className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;