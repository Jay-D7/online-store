import { memo } from 'react';

type ErrorStateProps = {
  error: string;
};

export const ErrorState = memo(({ error }: ErrorStateProps) => (
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
));

ErrorState.displayName = 'ErrorState';
