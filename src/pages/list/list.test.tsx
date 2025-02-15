import { expect, describe, it, vi } from 'vitest';
import { render, act } from '@testing-library/react';
import CharactersList from './List';
import type { TCharacter, TResponse } from '~/api/types';

const character: TCharacter = {
  id: 1,
  documentId: 'd001',
  name: 'John',
  occupation: 'occupation',
  gender: { title: 'gender' },
  species: { title: 'species' },
  desc: 'description',
  cover: {
    id: 1,
    url: 'url',
    ext: 'ext',
    hash: 'hash',
    width: 1,
    height: 1,
    mime: 'mime',
    createdAt: 'date',
    size: 1,
    formats: {
      thumbnail: {
        id: 1,
        url: 'url',
        ext: 'ext',
        hash: 'hash',
        width: 1,
        height: 1,
        mime: 'mime',
        createdAt: 'date',
        size: 1,
      },
    },
  },
  createdAt: 'date',
  updatedAt: 'date',
};
const results: TCharacter[] = Array.from({ length: 6 }, (_, i) => ({
  ...character,
  id: i + 1,
  documentId: `d00${i + 1}`,
}));

const response: TResponse<TCharacter[]> = {
  data: results,
  meta: {
    pagination: {
      page: 1,
      pageSize: 6,
      pageCount: 2,
      total: 12,
    },
  },
};

interface State {
  to: string;
  query: Record<string, string>;
}
const state: State = { to: 'none', query: { search: '', page: '0' } };

vi.mock('react-router', () => ({
  useNavigate: () => (to: string) => {
    state.to = to;
  },
  useSearchParams: () => [{ get: () => '' }, (value: Record<string, string>) => (state.query = value)],
}));

const dispatch = () => ({ unwrap: () => Promise.resolve(response) });

vi.mock('react-redux', () => ({
  useSelector: () => ({ available: [character], selected: [] }),
  useDispatch: () => dispatch,
}));

describe('CharactersList component', async () => {
  it('component must render the specified number of cards', async () => {
    const result = await act(async () => render(<CharactersList />));
    await act(async () => {
      const cards = result.container.querySelectorAll('a');
      expect(cards.length).toBe(6 + 1);
    });
  });

  it('component must update URL query parameter when page changes', async () => {
    const result = await act(async () => render(<CharactersList />));
    await act(async () => {
      const buttons = result.getAllByRole('button');
      buttons[buttons.length - 1].click();
      expect(state.query.page).toBe('2');
    });
  });
});
