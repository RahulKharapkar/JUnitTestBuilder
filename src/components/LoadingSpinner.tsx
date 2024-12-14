import React from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center h-64 space-y-6">
      <div className="relative">
        <div className="w-24 h-24 bg-violet-500 rounded-lg neu-border animate-bounce">
          <Loader2 className="h-16 w-16 text-white absolute inset-0 m-auto animate-spin" />
        </div>
      </div>
      <div className="text-2xl font-black">
        Generating Test Cases...
      </div>
      <div className="text-lg text-center max-w-sm">
        Analyzing code structure and creating comprehensive test cases
      </div>
    </div>
  );
}