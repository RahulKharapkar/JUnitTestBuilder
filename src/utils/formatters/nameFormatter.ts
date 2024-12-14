export function formatTestName(methodName: string): string {
  return methodName
    .replace(/^public\s+void\s+test/, '')
    .replace(/([A-Z])/g, ' $1')
    .toLowerCase()
    .trim()
    .replace(/^\w/, c => c.toUpperCase());
}