import { useState } from 'react';
import { TestConfig, CodeInput, ParsedResponse } from '../types';
import { generateTestCases } from '../services/api';

export function useTestGenerator() {
  const [state, setState] = useState<{
    testCases: ParsedResponse['testCases'];
    loading: boolean;
    error: string | null;
  }>({
    testCases: [],
    loading: false,
    error: null,
  });

  const generateTests = async (config: TestConfig, input: CodeInput) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await generateTestCases(config, input);
      setState({ 
        testCases: response.testCases,
        loading: false, 
        error: null 
      });
    } catch (error) {
      setState({
        testCases: [],
        loading: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      });
    }
  };

  return {
    ...state,
    generateTests,
    clearError: () => setState(prev => ({ ...prev, error: null })),
  };
}