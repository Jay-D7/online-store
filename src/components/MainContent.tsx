import { useProducts } from '../hooks/useProducts';
import { ProductCard } from './ProductCard';
import { ProductPlaceholder } from './ProductPlaceholder';

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
