import { memo } from 'react';

import type { Product } from '../types/Product';
import { ProductCard } from './ProductCard';
import { ProductPlaceholder } from './ProductPlaceholder';

type FeaturedProductsProps = {
  products: Product[];
  showProducts: boolean;
  loading?: boolean;
};

export const FeaturedProducts = memo(
  ({ products, showProducts, loading = false }: FeaturedProductsProps) => (
    <div className="mb-12">
      <h2 className="mb-6 text-left text-2xl font-semibold">
        Featured Products
      </h2>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {loading
          ? Array.from({ length: 5 }, (_, i) => <ProductPlaceholder key={i} />)
          : products.length > 0
            ? products.map((product, index) => (
                <div
                  key={product.id}
                  className={`transition-opacity duration-600 ease-out ${
                    showProducts ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))
            : Array.from({ length: 5 }, (_, i) => (
                <ProductPlaceholder key={i} />
              ))}
      </div>
    </div>
  )
);

FeaturedProducts.displayName = 'FeaturedProducts';
