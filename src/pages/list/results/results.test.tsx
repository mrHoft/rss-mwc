import { expect, describe, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import SearchResults from './Results';
import type { TCharacter } from '~/api/types';

const character: TCharacter = {
  id: 1,
  documentId: 'd001',
  name: 'name',
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

const results: TCharacter[] = Array.from({ length: 3 }, (_, i) => ({ ...character, id: i + 1 }));
const state = { to: 'none' };

vi.mock('react-router', () => ({
  useNavigate: () => (to: string) => {
    state.to = to;
  },
  useSearchParams: () => [{ get: () => 'abrakadabra' }],
}));

const dispatch = () => undefined;

vi.mock('react-redux', () => ({
  useSelector: () => ({ available: [character], selected: [] }),
  useDispatch: () => dispatch,
}));

describe('SearchResults component', async () => {
  it('results: 3', async () => {
    const { container } = render(<SearchResults results={results} />);

    expect(container.querySelectorAll('a').length).toBe(3 + 1);
  });
});
