import { expect, describe, it, vi } from 'vitest';
import { render, act } from '@testing-library/react';
import Search from './Search';
import { ContextProvider } from '~/entities/context.tsx';
import Storage from '~/utils/storage';

const storage = new Storage();
const state = { to: 'none' };

vi.mock('react-router', () => ({
  useNavigate: () => (to: string) => {
    state.to = to;
  },
  useSearchParams: () => [{ get: () => '' }],
}));

describe('Search component', async () => {
  it('must save the entered value to the local storage', async () => {
    const { getByRole, getAllByRole } = render(
      <ContextProvider>
        <Search />
      </ContextProvider>
    );

    const input = getByRole('textbox') as HTMLInputElement;
    input.value = 'abrakadabra';

    const buttons = getAllByRole('button');
    act(() => {
      if (buttons[1]) {
        buttons[1].click();
      }
    });
    expect(state.to).toBe('/?search=abrakadabra');
    expect(storage.get<string>('lastSearch')).toBe('abrakadabra');
    act(() => {
      if (buttons[0]) {
        buttons[0].click();
      }
    });
    expect(storage.get<string>('lastSearch')).toBe('');
  });

  it('must retrieve the value from the local storage upon mounting', async () => {
    storage.set('lastSearch', 'test-string');

    const { getByRole } = await act(async () =>
      render(
        <ContextProvider>
          <Search />
        </ContextProvider>
      )
    );

    const input = getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('test-string');
  });
});
