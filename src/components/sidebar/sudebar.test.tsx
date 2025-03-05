import { expect, test, vi } from 'vitest';
import { render, act } from '@testing-library/react';
import Sidebar from './Sidebar';

const state = { to: 'none' };

vi.mock('react-router', () => ({
  useNavigate: () => (to: string) => {
    state.to = to;
  },
}));

test('Sidebar component', async () => {
  const { container } = render(<Sidebar />);

  expect(container.querySelector('nav')).toBeDefined();

  act(() => {
    container.querySelector('a')?.click();
    expect(state.to).toBe('/');
  });
});
