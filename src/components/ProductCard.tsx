import type { Product } from '../types/Product';

export const ProductCard = ({ product }: { product: Product }) => (
  <div className="flex h-48 cursor-pointer flex-col items-center rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
    <img
      src={product.image}
      alt={product.name}
      className="mb-3 h-20 w-20 flex-shrink-0 rounded-lg object-cover"
    />
    <h3 className="mb-1 line-clamp-2 flex-1 text-center text-sm leading-tight font-medium text-gray-800">
      {product.name}
    </h3>
    <p className="mt-auto text-lg font-semibold text-pink-600">
      ${product.price}
    </p>
  </div>
);
