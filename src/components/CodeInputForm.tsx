import React from 'react';
import { CodeInput } from '../types';
import { SampleDataButton } from './SampleDataButton';

interface CodeInputFormProps {
  input: CodeInput;
  onInputChange: (input: CodeInput) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export function CodeInputForm({ input, onInputChange, onSubmit, isLoading }: CodeInputFormProps) {
  const handleDependencyChange = (value: string) => {
    const dependencies = value.split('\n').filter(dep => dep.trim() !== '');
    onInputChange({ ...input, dependencies });
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">Code Details</h3>
        <SampleDataButton onSelect={onInputChange} />
      </div>

      <div>
        <label className="block text-lg font-bold mb-2">
          Class Name *
        </label>
        <input
          type="text"
          required
          className="w-full neu-input"
          value={input.className}
          onChange={(e) => onInputChange({ ...input, className: e.target.value })}
          placeholder="e.g., UserService"
        />
      </div>

      <div>
        <label className="block text-lg font-bold mb-2">
          Method Name (Optional)
        </label>
        <input
          type="text"
          className="w-full neu-input"
          value={input.methodName}
          onChange={(e) => onInputChange({ ...input, methodName: e.target.value })}
          placeholder="e.g., createUser"
        />
      </div>

      <div>
        <label className="block text-lg font-bold mb-2">
          Dependencies (Optional)
        </label>
        <textarea
          className="w-full neu-input min-h-[100px] font-mono"
          value={input.dependencies.join('\n')}
          onChange={(e) => handleDependencyChange(e.target.value)}
          placeholder="e.g., UserRepository&#10;EmailService"
        />
      </div>

      <div>
        <label className="block text-lg font-bold mb-2">
          Code Snippet *
        </label>
        <textarea
          required
          className="w-full neu-input font-mono min-h-[200px]"
          value={input.codeSnippet}
          onChange={(e) => onInputChange({ ...input, codeSnippet: e.target.value })}
          placeholder="Paste your code here..."
        />
      </div>

      <div>
        <label className="block text-lg font-bold mb-2">
          Expected Behavior *
        </label>
        <textarea
          required
          className="w-full neu-input min-h-[100px]"
          value={input.expectedBehavior}
          onChange={(e) => onInputChange({ ...input, expectedBehavior: e.target.value })}
          placeholder="Describe what the code should do..."
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full neu-button disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Generating...' : 'Generate Test Cases'}
      </button>
    </form>
  );
}