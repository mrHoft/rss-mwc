import { expect, test, vi } from 'vitest';
import { render, act } from '@testing-library/react';
import NothingFound from './Nothing';

const state = { to: 'none' };

vi.mock('react-router', () => ({
  useNavigate: () => (to: string) => {
    state.to = to;
  },
  useSearchParams: () => [{ get: () => 'test', toString: () => '' }],
}));

test('NothingFound component', async () => {
  const { getByText, getByRole } = render(<NothingFound />);

  expect(getByText('Nothing found for "test".')).toBeDefined();

  await act(async () => {
    getByRole('button').click();
    expect(state.to).toBe('/');
  });
});
