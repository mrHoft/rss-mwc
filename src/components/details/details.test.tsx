import React from 'react';
import { expect, describe, it, vi } from 'vitest';
import { render, act } from '@testing-library/react';
import PageDetails from './Details';
import type { TCharacter, TResponse } from '~/api/types';
import { charactersState } from '~/entities/state';

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

const state = { to: 'none' };

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: (to: string) => {
      state.to = to;
    },
  }),
  useSearchParams: () => ({ get: () => '', toString: () => '' }),
}));

const response: TResponse<TCharacter> = {
  data: character,
};

vi.mock('~/api/request', () => ({
  default: { character: () => Promise.resolve(response) },
}));

describe('PageDetails component', async () => {
  charactersState.add([character]);

  it('component correctly displays the detailed card data', async () => {
    const { getByText } = await act(async () => render(<PageDetails id={character.documentId} />));
    await act(async () => {
      expect(getByText('John')).toBeDefined();
    });
  });

  it('clicking the close button hides the component', async () => {
    const { container, getByTestId } = await act(async () => render(<PageDetails />));
    await act(async () => {
      getByTestId('close').click();
      expect(state.to).toBe('/');
      expect(container.children.length).toBe(1);
    });
  });
});
