import React from 'react';
import { expect, test, vi } from 'vitest';
import { render } from '@testing-library/react';
import Header from './Header';

const state = { to: 'none' };

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: (to: string) => {
      state.to = to;
    },
  }),
}));
vi.mock('next/navigation', () => ({
  useSearchParams: () => ({ get: () => '', toString: () => '' }),
}));

test('Header component', async () => {
  const { getByText } = render(<Header />);

  expect(getByText('Characters')).toBeDefined();
});
