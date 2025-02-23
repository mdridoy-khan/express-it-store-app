import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateStore from './components/CreateStore';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Link to="/" className="text-lg md:text-2xl font-bold text-indigo-600">
                Express IT BD Store
              </Link>
              <div className="space-x-4">
                <Link
                  to="/"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Products
                </Link>
                <Link
                  to="/create-store"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Create Store
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<ProductGrid />} />
            <Route path="/create-store" element={<CreateStore />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </main>

        <footer className="bg-white shadow-md mt-12">
          <div className="container mx-auto px-4 py-6">
            <p className="text-center text-gray-600">
              © 2024 Express IT BD Store. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;