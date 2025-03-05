import { expect, test, vi } from 'vitest';
import { render, act } from '@testing-library/react';
import PageError from './Error';

const state = { to: 'none' };

vi.mock('react-router', () => ({
  useNavigate: () => (to: string) => {
    state.to = to;
  },
  useSearchParams: () => [{ get: () => 'test', toString: () => '' }],
}));

test('PageError component', async () => {
  const { container, getByRole } = render(<PageError message="No such page" status={404} />);
  const header = container.querySelector('h2');
  const button = getByRole('button');

  expect(header?.innerHTML).includes('No such page');

  act(() => {
    button.click();
  });
  expect(state.to).toBe('/');
});
