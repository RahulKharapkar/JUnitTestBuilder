export function formatTestCode(code: string): string {
  return code
    .trim()
    .replace(/^\s+/gm, '    ')
    .replace(/```java|```/g, '');
}