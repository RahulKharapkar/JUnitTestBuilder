import { CodeInput } from '../types';

export function validateInput(input: CodeInput): string | null {
  if (!input.className.trim()) {
    return 'Class name is required';
  }
  if (!input.codeSnippet.trim()) {
    return 'Code snippet is required';
  }
  if (!input.expectedBehavior.trim()) {
    return 'Expected behavior is required';
  }
  return null;
}