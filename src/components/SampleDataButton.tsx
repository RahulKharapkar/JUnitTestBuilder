import React from 'react';
import { CodeInput } from '../types';
import { SAMPLE_TESTS } from '../config/samples';
import { BeakerIcon } from 'lucide-react';

interface SampleDataButtonProps {
  onSelect: (input: CodeInput) => void;
}

export function SampleDataButton({ onSelect }: SampleDataButtonProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="neu-button bg-emerald-500 flex items-center gap-2"
      >
        <BeakerIcon className="h-5 w-5" />
        Try Sample
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg neu-border p-2 z-10">
          {SAMPLE_TESTS.map((sample, index) => (
            <button
              key={index}
              onClick={() => {
                onSelect(sample.data);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            >
              {sample.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}