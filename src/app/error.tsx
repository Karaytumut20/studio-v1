'use client';

import { useEffect } from 'react';
import Button from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-white text-black px-page-padding text-center">
      <h2 className="text-4xl font-bold uppercase mb-4 tracking-tighter">Something went wrong</h2>
      <p className="text-lg opacity-60 mb-10 max-w-md">
        An unexpected error occurred. Our team has been notified.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-8 py-4 bg-black text-white rounded-full uppercase text-sm hover:opacity-80 transition-opacity"
        >
          Try Again
        </button>
        <Button href="/">Return Home</Button>
      </div>
    </div>
  );
}