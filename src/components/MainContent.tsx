import { useEffect, useMemo, useState } from 'react';

import { useSearch } from '../hooks/useSearch';
import type { Product } from '../types/Product';
import type { APIResponse } from '../types/Product';
import type { APIProduct } from '../types/Product';
import { ProductCard } from './ProductCard';
import { ProductPlaceholder } from './ProductPlaceholder';

export const MainContent = () => {
  const { search } = useSearch();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  // const loading = true; // Change this to test and comment out the loading state above
  const [error, setError] = useState<string | null>(null);

  // Convert API product to our Product type
  const convertAPIProduct = (apiProduct: APIProduct): Product => ({
    id: apiProduct.id,
    name: apiProduct.title,
    image: apiProduct.thumbnail,
    price: apiProduct.price,
  });

  const filteredFeatured = useMemo(() => {
    if (!search) return featuredProducts;
    return featuredProducts.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [featuredProducts, search]);

  const filteredNewArrivals = useMemo(() => {
    if (!search) return newArrivals;
    return newArrivals.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [newArrivals, search]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setShowProducts(false); // Hide products during loading
        setError(null);
        // Simulate a delay for loading state
        if (!search) {
          await new Promise((resolve) => setTimeout(resolve, 1500)); // 1.5 second delay for initial load
        }

        if (search) {
          // Search products when there's a search query
          const response = await fetch(
            `https://dummyjson.com/products/search?q=${search}`
          );
          if (!response.ok) throw new Error('Search failed');

          const data: APIResponse = await response.json();
          const searchResults = data.products.map(convertAPIProduct);

          setFeaturedProducts(searchResults);
          setNewArrivals([]);
        } else {
          // Fetch all products and split them
          const response = await fetch(
            'https://dummyjson.com/products?limit=20'
          );
          if (!response.ok) throw new Error('Failed to fetch products');

          const data: APIResponse = await response.json();
          const allProducts = data.products.map(convertAPIProduct);

          // Split products: first 10 as featured, rest as new arrivals
          setFeaturedProducts(allProducts.slice(0, 10));
          setNewArrivals(allProducts.slice(10));
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
        setTimeout(() => setShowProducts(true), 100);
      }
    };

    fetchProducts();
  }, [search]);

  if (loading) {
    return (
      <main className="flex-1 px-4 py-6 text-gray-700 md:px-16 lg:px-36">
        <div className="mb-12">
          <h2 className="mb-4 text-left text-2xl font-semibold">
            Featured Products
          </h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 5 }, (_, i) => (
              <ProductPlaceholder key={i} />
            ))}
          </div>
        </div>
        <div className="mb-10">
          <h2 className="mb-4 text-left text-2xl font-semibold">
            New Arrivals
          </h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 5 }, (_, i) => (
              <ProductPlaceholder key={i} />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 px-4 py-6 text-gray-700 md:px-8">
        <div className="py-20 text-center">
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded bg-pink-600 px-4 py-2 text-white hover:bg-pink-700"
          >
            Retry
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 px-4 py-6 text-gray-700 md:px-16 lg:px-36">
      {/* {search && (
        <div className="mb-6">
          <p className="text-gray-600">
            Search results for:{' '}
            <span className="font-semibold">"{search}"</span>
          </p>
        </div>
      )} */}

      {/* Featured Products */}
      {!search && (
        <div className="mb-12">
          <h2 className="mb-6 text-left text-2xl font-semibold">
            Featured Products
          </h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filteredFeatured.length > 0
              ? filteredFeatured.map((product) => (
                  <div
                    key={product.id}
                    className={`transition-opacity duration-2000 ease-out ${
                      showProducts ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <ProductCard product={product} />
                  </div>
                ))
              : Array.from({ length: 5 }, (_, i) => (
                  <ProductPlaceholder key={i} />
                ))}
          </div>
        </div>
      )}

      {/* Search Results or New Arrivals */}
      <div className="mb-12">
        <h2 className="mb-6 text-left text-2xl font-semibold">
          {search ? 'Search Results' : 'New Arrivals'}
        </h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {search ? (
            filteredFeatured.length > 0 ? (
              filteredFeatured.map((product, index) => (
                <div
                  key={product.id}
                  className={`transform transition-all duration-500 ease-out ${
                    showProducts
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-4 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <div className="col-span-full py-10 text-center text-gray-500">
                No products found for "{search}"
              </div>
            )
          ) : filteredNewArrivals.length > 0 ? (
            filteredNewArrivals.map((product, index) => (
              <div
                key={product.id}
                className={`transform transition-all duration-500 ease-out ${
                  showProducts
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: `${(index + 10) * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            Array.from({ length: 5 }, (_, i) => <ProductPlaceholder key={i} />)
          )}
        </div>
      </div>
    </main>
  );
};
