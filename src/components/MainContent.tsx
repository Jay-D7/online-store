import { useProducts } from '../hooks/useProducts';
import { ErrorState } from './ErrorState';
import { FeaturedProducts } from './FeaturedProducts';
import { LoadingState } from './LoadingState';
import { ProductGrid } from './ProductGrid';

export const MainContent = () => {
  const {
    filteredFeatured,
    filteredNewArrivals,
    loading,
    error,
    showProducts,
    search,
  } = useProducts();

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <main className="flex-1 px-4 py-6 text-gray-700 md:px-16 lg:px-36">
      {/* Featured Products - only show when not searching */}
      {!search && (
        <FeaturedProducts
          products={filteredFeatured}
          showProducts={showProducts}
        />
      )}

      {/* Search Results or New Arrivals */}
      <ProductGrid
        products={search ? filteredFeatured : filteredNewArrivals}
        showProducts={showProducts}
        title={search ? 'Search Results' : 'New Arrivals'}
        animationDelay={search ? 0 : filteredFeatured.length}
        emptyMessage={search ? `No products found for "${search}"` : undefined}
      />
    </main>
  );
};
