import { expect, describe, it, vi } from 'vitest';
import { render, act } from '@testing-library/react';
import SearchResults from './Results';
import type { TCharacter } from '~/api/types';
import { ContextProvider } from '~/entities/context.tsx';

const character: TCharacter = {
  id: 1,
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

describe('SearchResults component', async () => {
  it('results: nothing', async () => {
    const { container, getByRole } = render(
      <ContextProvider>
        <SearchResults results={[]} />
      </ContextProvider>
    );
    const header = container.querySelector('h2');
    const button = getByRole('button');

    expect(header).toBeDefined();
    expect(header?.innerHTML).includes('Nothing found for "abrakadabra"');

    act(() => {
      button.click();
    });
    expect(state.to).toBe('/');
  });

  it('results: 3', async () => {
    const { container } = render(<SearchResults results={results} />);

    expect(container.querySelectorAll('a').length).toBe(3);
  });
});
