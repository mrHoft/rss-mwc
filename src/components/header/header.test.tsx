import { expect, test, vi } from 'vitest';
import { render, act } from '@testing-library/react';
import Header from './Header';
import { ContextProvider } from '~/entities/context.tsx';
const state = { to: 'none' };

vi.mock('react-router', () => ({
  useNavigate: () => (to: string) => {
    state.to = to;
  },
  useSearchParams: () => [{ get: () => '' }],
}));

test('Header component', async () => {
  const { getByText, getByRole } = render(
    <ContextProvider>
      <Header />
    </ContextProvider>
  );

  expect(getByText('Characters')).toBeDefined();

  const input = getByRole('textbox') as HTMLInputElement;
  input.value = 'abrakadabra';

  const button = getByRole('button');
  act(() => {
    button.click();
  });
  expect(state.to).toBe('/?search=abrakadabra');
});
