import React, { useState } from 'react';
import { TestCase } from '../types';
import { CopyIcon, CheckIcon, AlertTriangleIcon } from 'lucide-react';

interface TestOutputProps {
  testCases: TestCase[];
}

export function TestOutput({ testCases }: TestOutputProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (code: string, index: number) => {
    await navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (testCases.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-xl font-bold">
          Generated test cases will appear here
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      

      {/* Test Cases */}
      {testCases.map((testCase, index) => (
        <div key={index} className="bg-gray-50 dark:bg-gray-900 rounded-lg neu-border overflow-hidden">
          <div className="border-b-4 border-black dark:border-white bg-violet-500 px-4 py-3">
            <h3 className="text-lg font-bold text-white">
              {testCase.scenario}
            </h3>
          </div>
          <div className="relative">
            <pre className="p-4 overflow-x-auto bg-gray-50 dark:bg-gray-900">
              <code className="text-sm font-mono">
                {testCase.code}
              </code>
            </pre>
            <button
              onClick={() => handleCopy(testCase.code, index)}
              className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-lg neu-border hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200"
              title="Copy code"
            >
              {copiedIndex === index ? (
                <CheckIcon className="h-4 w-4 text-green-500" />
              ) : (
                <CopyIcon className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      ))}
      {/* AI Disclaimer */}
      <div className="bg-amber-50 dark:bg-amber-900/20 neu-border p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertTriangleIcon className="h-6 w-6 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-amber-800 dark:text-amber-400">AI-Generated Code Disclaimer</h3>
            <p className="text-amber-700 dark:text-amber-300 mt-1">
              The test cases above are AI-powered suggestions. Please review, validate, and modify the generated code according to your specific requirements before using in production.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}