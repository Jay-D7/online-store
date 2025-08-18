import { memo } from 'react';

import type { Product } from '../types/Product';
import { ProductCard } from './ProductCard';
import { ProductPlaceholder } from './ProductPlaceholder';

type ProductGridProps = {
  products: Product[];
  showProducts: boolean;
  title: string;
  loading?: boolean;
  placeholderCount?: number;
  animationDelay?: number;
  emptyMessage?: string;
};

export const ProductGrid = memo(
  ({
    products,
    showProducts,
    title,
    loading = false,
    placeholderCount = 5,
    animationDelay = 0,
    emptyMessage,
  }: ProductGridProps) => (
    <div className="mb-12">
      <h2 className="mb-6 text-left text-2xl font-semibold">{title}</h2>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {loading ? (
          Array.from({ length: placeholderCount }, (_, i) => (
            <ProductPlaceholder key={i} />
          ))
        ) : products.length > 0 ? (
          products.map((product, index) => (
            <div
              key={product.id}
              className={`transform transition-all duration-500 ease-out ${
                showProducts
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: `${(index + animationDelay) * 50}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))
        ) : emptyMessage ? (
          <div className="col-span-full py-10 text-center text-gray-500">
            {emptyMessage}
          </div>
        ) : (
          Array.from({ length: placeholderCount }, (_, i) => (
            <ProductPlaceholder key={i} />
          ))
        )}
      </div>
    </div>
  )
);

ProductGrid.displayName = 'ProductGrid';
