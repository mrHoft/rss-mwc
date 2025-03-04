import React from 'react';
import { expect, test, vi } from 'vitest';
import { render } from '@testing-library/react';
import NothingFound from './Nothing';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: () => undefined,
  }),
}));
vi.mock('next/navigation', () => ({
  useSearchParams: () => ({ get: () => 'test', toString: () => '' }),
}));

test('NothingFound component', async () => {
  const { getByText } = render(<NothingFound />);

  expect(getByText('Nothing found for "test".')).toBeDefined();
});
