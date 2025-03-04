import React from 'react';
import { expect, describe, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import CardCharacter from './Card';
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

const state = { to: 'none' };

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: (to: string) => {
      state.to = to;
    },
  }),
  useSearchParams: () => ({ get: () => '', toString: () => '' }),
}));

describe('CardCharacter component', async () => {
  it('card small', async () => {
    const { container, getByText } = render(<CardCharacter character={character} small />);

    expect(getByText('name')).toBeDefined();
    expect(getByText('occupation')).toBeDefined();
    expect(getByText('gender')).toBeDefined();
    expect(getByText('species')).toBeDefined();
    container.querySelector('a')?.click();
    expect(state.to).includes('/details/d001');
  });

  it('card details', async () => {
    state.to = 'none';
    const { container, getByText } = render(<CardCharacter character={character} />);

    expect(getByText('name')).toBeDefined();
    expect(getByText('occupation')).toBeDefined();
    expect(getByText('gender')).toBeDefined();
    expect(getByText('species')).toBeDefined();
    expect(getByText('description')).toBeDefined();
    container.querySelector('a')?.click();
    expect(state.to).toBe('none');
  });
});
