import { expect, test, vi } from 'vitest';
import { render, act } from '@testing-library/react';
import PageHome from './Home';
import type { TCharacter, TResponse } from '~/api/types';
import stateManager from '~/entities/state';

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
stateManager.characters = [character];
const state = { to: 'none' };

const response: TResponse<TCharacter[]> = {
  data: [character],
  meta: {
    pagination: {
      page: 1,
      pageSize: 10,
      pageCount: 1,
      total: 1,
    },
  },
};

vi.mock('react-router', () => ({
  useNavigate: () => (to: string) => {
    state.to = to;
  },
  Outlet: () => <div>Outlet</div>,
  useParams: () => ({ id: 1 }),
  useSearchParams: () => [{ get: () => '' }],
}));

vi.mock('~/api/request', () => ({
  default: { characters: () => Promise.resolve(response) },
}));

test('PageHome component', async () => {
  const { container } = render(<PageHome />);
  await act(async () => {
    const sections = container.querySelectorAll('section');
    expect(sections.length).toBe(2);
  });
});
