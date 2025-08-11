export const ProductPlaceholder = () => (
  <div className="flex cursor-pointer flex-col items-center rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
    <div className="mb-3 h-20 w-20 animate-pulse rounded-lg bg-pink-200"></div>
    <div className="mb-1 h-4 w-16 animate-pulse rounded bg-pink-200"></div>
    <div className="h-5 w-12 animate-pulse rounded bg-pink-200"></div>
  </div>
);

// First version of the ProductPlaceholder component
// export const ProductPlaceholder = () => (
//   <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow-sm">
//     <div className="mb-3 h-20 w-20 animate-pulse rounded-lg bg-pink-200"></div>
//     <div className="mb-1 h-4 w-16 animate-pulse rounded bg-pink-200"></div>
//     <div className="h-4 w-12 animate-pulse rounded bg-pink-200"></div>
//     <p className="mt-2 text-center text-sm text-gray-500">
//       Product placeholder
//     </p>
//   </div>
// );
