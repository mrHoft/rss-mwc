import { expect, test, vi } from 'vitest';
import { render } from '@testing-library/react';
import PageCharacter from './Character';
import type { TCharacter } from '~/api/types';
import stateManager from '~/entities/state';

const character: TCharacter = {
  id: 1,
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

vi.mock('react-router', () => ({
  useNavigate: () => (to: string) => {
    state.to = to;
  },
  useParams: () => ({ id: 1 }),
}));

test('PageCharacter component', async () => {
  const { getByText, getByTestId } = render(<PageCharacter />);

  expect(getByText('John')).toBeDefined();

  const close = getByTestId('close');
  close.click();
  expect(state.to).toBe('/');
});
