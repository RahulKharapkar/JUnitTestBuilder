import { TestCase } from '../../types';
import { formatTestCode } from '../../utils/formatters/codeFormatter';
import { formatTestName } from '../../utils/formatters/nameFormatter';

export function parseTestCases(content: string): TestCase[] {
  const cases = content
    .split(/(?=@Test|public\s+void\s+test)/)
    .filter(section => section.trim());

  return cases.map(section => {
    const methodMatch = section.match(/@Test.*?\s*(public\s+void\s+test\w+)/s);
    const scenario = methodMatch 
      ? formatTestName(methodMatch[1])
      : 'Test Case';
    
    return {
      scenario,
      code: formatTestCode(section)
    };
  });
}