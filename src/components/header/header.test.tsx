import { expect, test, vi } from 'vitest';
import { render } from '@testing-library/react';
import Header from './Header';
const state = { to: 'none' };

vi.mock('react-router', () => ({
  useNavigate: () => (to: string) => {
    state.to = to;
  },
  useSearchParams: () => [{ get: () => '' }],
}));

test('Header component', async () => {
  const { getByText } = render(<Header />);

  expect(getByText('Characters')).toBeDefined();
});
