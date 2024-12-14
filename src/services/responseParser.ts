import { TestCase, ParsedResponse } from '../types';
import { parseTestCases } from './parsers/testCaseParser';
import { formatTestCode } from '../utils/formatters/codeFormatter';

export function parseResponse(content: string): ParsedResponse {
  try {
    const testCasesMatch = content.match(/\[TEST_CASES\]([\s\S]*?)\[END_TEST_CASES\]/);
    
    if (!testCasesMatch) {
      return { 
        testCases: [{
          scenario: 'Generated Test Case',
          code: formatTestCode(content)
        }]
      };
    }

    return { 
      testCases: parseTestCases(testCasesMatch[1])
    };
  } catch (error) {
    console.error('Error parsing response:', error);
    return {
      testCases: [{
        scenario: 'Generated Test Case',
        code: formatTestCode(content)
      }]
    };
  }
}