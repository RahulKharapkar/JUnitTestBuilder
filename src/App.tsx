import React, { useState } from 'react';
import { CodeInput, TestConfig } from './types';
import { VersionSelector } from './components/VersionSelector';
import { CodeInputForm } from './components/CodeInputForm';
import { TestOutput } from './components/TestOutput';
import { ErrorMessage } from './components/ErrorMessage';
import { ThemeToggle } from './components/ThemeToggle';
import { LoadingSpinner } from './components/LoadingSpinner';
import { useTestGenerator } from './hooks/useTestGenerator';
import { useTheme } from './hooks/useTheme';
import { BeakerIcon } from 'lucide-react';
import { DEFAULT_CONFIG } from './config/constants';

export function App() {
  const { theme, toggleTheme } = useTheme();
  const [config, setConfig] = useState<TestConfig>(DEFAULT_CONFIG);
  const [input, setInput] = useState<CodeInput>({
    className: '',
    methodName: '',
    dependencies: [],
    codeSnippet: '',
    expectedBehavior: '',
  });

  const { testCases, loading, error, generateTests, clearError } = useTestGenerator();

  const handleSubmit = () => {
    generateTests(config, input);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-violet-500 neu-border rounded-lg rotate-3 hover:rotate-0 transition-transform duration-300">
                <BeakerIcon className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-black bg-gradient-to-r from-violet-600 to-pink-500 text-transparent bg-clip-text">
                  JUnit Test Builder
                </h1>
                <p className="text-lg mt-2 text-gray-600 dark:text-gray-300">
                  Generate comprehensive test cases using AI with ease
                </p>
              </div>
            </div>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </div>

        {error && (
          <div className="mb-6">
            <ErrorMessage message={error} onDismiss={clearError} />
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg neu-border">
              <h2 className="text-2xl font-black mb-6">
                1. Select Versions
              </h2>
              <VersionSelector config={config} onConfigChange={setConfig} />
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg neu-border">
              <h2 className="text-2xl font-black mb-6">
                2. Enter Code Details
              </h2>
              <CodeInputForm
                input={input}
                onInputChange={setInput}
                onSubmit={handleSubmit}
                isLoading={loading}
              />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg neu-border">
            <h2 className="text-2xl font-black mb-6">
              3. Generated Test Cases
            </h2>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <TestOutput testCases={testCases} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;