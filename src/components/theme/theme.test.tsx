import React from 'react';
import { expect, describe, it, vi } from 'vitest';
import { render, act } from '@testing-library/react';
import ThemeSwitcher from './Theme';
import Storage from '~/utils/storage.ts';

const storage = new Storage();

interface State {
  query: Record<string, string>;
}
const state: State = { query: { search: '' } };
type TTheme = 'light' | 'dark' | undefined;

vi.mock('react-router', () => ({
  useSearchParams: () => [{ get: () => '' }, (value: Record<string, string>) => (state.query = value)],
}));

describe('ThemeSwitcher component', async () => {
  it('must switch theme and save the value to the local storage', async () => {
    const initialTheme = storage.get<TTheme>('theme');
    const { getByRole } = render(<ThemeSwitcher />);

    const checkbox = getByRole('checkbox') as HTMLInputElement;
    act(() => checkbox.click());
    const newTheme = storage.get<TTheme>('theme');

    expect(newTheme).not.toBe(initialTheme);
  });
});
