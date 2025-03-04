import React from 'react';
import { expect, describe, it, vi } from 'vitest';
import { render, act } from '@testing-library/react';
import Search from './Search';
import Storage from '~/utils/storage';

const storage = new Storage();
interface State {
  query: Record<string, string>;
}
const state: State = { query: { search: '', page: '0' } };

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: (to: string) => {
      const page = to.match(/page=(\d*)/);
      if (page) state.query.page = page[1];
      const search = to.match(/search=(.*)/);
      if (search) state.query.search = search[1];
    },
  }),
  useSearchParams: () => ({ get: () => '', toString: () => '' }),
}));

describe('Search component', async () => {
  it('must save the entered value to the local storage', async () => {
    const { getByRole, getAllByRole } = render(<Search />);

    const input = getByRole('textbox') as HTMLInputElement;
    input.value = 'abrakadabra';

    const buttons = getAllByRole('button');
    act(() => {
      if (buttons[1]) {
        buttons[1].click();
      }
    });
    expect(state.query.search).toBe('abrakadabra');
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

    const { getByRole } = await act(async () => render(<Search />));

    const input = getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('test-string');
  });
});
