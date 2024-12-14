export const API_CONFIG = {
  BASE_URL: 'https://gptwrapper.onrender.com',
  // BASE_URL: 'http://localhost:8080/api',
  MODEL: 'gpt-4o-mini',
} as const;

export const VERSION_OPTIONS = {
  JUNIT: ['4.x', '5.x', '5.9.2'] as const,
  MOCKITO: ['3.x', '4.x', '5.x'] as const,
} as const;

export const DEFAULT_CONFIG = {
  junitVersion: '5.x',
  mockitoVersion: '4.x',
} as const;