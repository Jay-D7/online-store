import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';

export const App = () => {
  const [search, setSearch] = useState('');
  // const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center justify-between border-b px-8 py-4">
        <div className="flex items-center gap-2 text-lg font-bold">
          <span>🛍️</span> ShopOnline
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for products"
          className="w-64 rounded-lg border bg-pink-50 px-4 py-2 text-gray-700 focus:outline-none"
        />
      </header>
      <main className="px-8 py-6 text-gray-700">
        {/* Product sections will go here */}
        <h2 className="mb-4 text-lg font-semibold">Featured Products</h2>
        {/* <ProductGrid products={featuredProducts} /> */}
        <h2 className="mt-10 mb-4 text-lg font-semibold">New Arrivals</h2>
        {/* <ProductGrid products={newArrivals} /> */}
      </main>

      {/* Vite + React */}
      {/* <div className="flex items-center justify-center rounded-2xl bg-sky-900">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}

      {/* <h1>Vite + React</h1>
      <div className="custom-card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </div>
  );
};
