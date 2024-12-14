import { TestConfig, CodeInput, ParsedResponse } from '../types';
import { API_CONFIG } from '../config/constants';
import { parseResponse } from './responseParser';
import { validateInput } from '../utils/validation';

export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

function buildPrompt(config: TestConfig, input: CodeInput): string {
  const { className, methodName, dependencies, codeSnippet, expectedBehavior } = input;
  
  return `Generate JUnit ${config.junitVersion} and Mockito ${config.mockitoVersion} test cases.

Class Details:
- Class: ${className}${methodName ? `\n- Method: ${methodName}` : ''}
- Dependencies: ${dependencies.length ? dependencies.join(', ') : 'None'}

Code:
\`\`\`java
${codeSnippet}
\`\`\`

Expected Behavior:
${expectedBehavior}

Please provide test cases in the following format:

[TEST_CASES]
// Test cases with proper JUnit annotations and Mockito setup
// Each test case should follow this structure:
// 1. @Test annotation
// 2. Clear method name describing the scenario
// 3. Mock setup if needed
// 4. Method execution
// 5. Assertions or verifications for expected outcomes
[END_TEST_CASES]

Do not generate any explanation only provide the code 
Requirements:
1. Success scenarios with valid inputs
2. Failure scenarios with invalid inputs
3. Edge cases and boundary conditions`;
}

export async function generateTestCases(
  config: TestConfig,
  input: CodeInput
): Promise<ParsedResponse> {
  const validationError = validateInput(input);
  if (validationError) {
    throw new ApiError(validationError);
  }

  try {
    const prompt = buildPrompt(config, input);
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        model: API_CONFIG.MODEL,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      throw new ApiError(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.choices?.[0]?.message?.content) {
      throw new ApiError('Invalid API response format');
    }

    return parseResponse(data.choices[0].message.content);
  } catch (error) {
    console.error('Error generating tests:', error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Failed to generate test cases. Please try again.');
  }
}