import { expect, test, vi } from 'vitest';
import { render, act } from '@testing-library/react';
import Page404 from './404';

const state = { to: 'none' };

vi.mock('react-router', () => ({
  useNavigate: () => (to: string) => {
    state.to = to;
  },
}));

test('Page404 component', async () => {
  const { container, getByRole } = render(<Page404 />);
  const header = container.querySelector('h2');
  const button = getByRole('button');

  expect(header?.innerHTML).includes('No such page');

  act(() => {
    button.click();
  });
  expect(state.to).toBe('/');
});
