import '@testing-library/jest-dom';
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Runs cleanup after each test to prevent tests from interfering with each other
afterEach(() => {
  cleanup();
});