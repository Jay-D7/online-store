import { useEffect, useMemo, useState } from 'react';

import type { APIProduct, APIResponse, Product } from '../types/Product';
import { useSearch } from './useSearch';

export const useProducts = () => {
  const { search } = useSearch();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [showProducts, setShowProducts] = useState(false);
  const [loading, setLoading] = useState(false);
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
        // if (!search) {
        //   await new Promise((resolve) => setTimeout(resolve, 1500)); // 1.5 second delay for initial load
        // }

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
          // Fetch iPhones and watches for Featured Products
          const [phonesResponse, watchesResponse, allProductsResponse] =
            await Promise.all([
              fetch('https://dummyjson.com/products/search?q=iphone&limit=15'),
              fetch('https://dummyjson.com/products/search?q=watch&limit=15'),
              fetch('https://dummyjson.com/products?limit=20'),
            ]);

          if (
            !phonesResponse.ok ||
            !watchesResponse.ok ||
            !allProductsResponse.ok
          ) {
            throw new Error('Failed to fetch products');
          }

          const [phonesData, watchesData, allProductsData] = await Promise.all([
            phonesResponse.json(),
            watchesResponse.json(),
            allProductsResponse.json(),
          ]);

          // Combine iPhones and watches for Featured Products
          const iphones = phonesData.products.map(convertAPIProduct);
          const watches = watchesData.products.map(convertAPIProduct);
          const featuredItems = [...iphones, ...watches].slice(0, 15); // Limit to 15 total

          // Use other products for New Arrivals (excluding phones and watches)
          const allProducts = allProductsData.products.map(convertAPIProduct);
          const newArrivalsItems: Product[] = allProducts.filter(
            (product: Product) =>
              !product.name.toLowerCase().includes('iphone') &&
              !product.name.toLowerCase().includes('watch')
          );

          setFeaturedProducts(featuredItems);
          setNewArrivals(newArrivalsItems.slice(0, 15));
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

  return {
    filteredFeatured,
    filteredNewArrivals,
    loading,
    error,
    showProducts,
    search,
  };
};
