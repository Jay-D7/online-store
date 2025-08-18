import { memo } from 'react';

import { ProductPlaceholder } from './ProductPlaceholder';

export const LoadingState = memo(() => (
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
      <h2 className="mb-4 text-left text-2xl font-semibold">New Arrivals</h2>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 5 }, (_, i) => (
          <ProductPlaceholder key={i} />
        ))}
      </div>
    </div>
  </main>
));

LoadingState.displayName = 'LoadingState';
