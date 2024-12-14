export function formatTestCode(code: string): string {
  return code.trim().replace(/^\s+/gm, '');
}

export function formatExplanation(explanation: string): string {
  return explanation
    .trim()
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .join('\n');
}