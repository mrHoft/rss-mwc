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

const state = { to: 'none' };
vi.mock('react-router', () => ({
  useNavigate: () => (to: string) => {
    state.to = to;
  },
  Outlet: () => <div>Outlet</div>,
  useParams: () => ({ id: 1 }),
  useSearchParams: () => [{ get: () => '' }],
  useContext: () => ({ query: '' }),
}));

vi.mock('~/api/request', () => ({
  default: { characters: () => Promise.resolve(response) },
}));

describe('CharactersList component', async () => {
  it('component must render the specified number of cards', async () => {
    const result = await act(async () => render(<CharactersList />));
    await act(async () => {
      const cards = result.container.querySelectorAll('a');
      expect(cards.length).toBe(6);
    });
  });

  it('component must update URL query parameter when page changes', async () => {
    const result = await act(async () => render(<CharactersList />));
    await act(async () => {
      const buttons = result.getAllByRole('button');
      buttons[buttons.length - 1].click();
      expect(state.to).toBe('/?page=2');
    });
  });
});
