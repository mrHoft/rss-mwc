import { expect, describe, it, vi } from 'vitest';
import { render, act } from '@testing-library/react';
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

global.URL.createObjectURL = () => 'test';
global.URL.revokeObjectURL = vi.fn();

const dispatch = () => undefined;

vi.mock('react-redux', () => ({
  useSelector: () => ({ available: [character], selected: [1, 2, 3] }),
  useDispatch: () => dispatch,
}));

describe('SearchResults component', async () => {
  it('must show expected number of cards', async () => {
    const { container } = render(<SearchResults results={results} />);
    expect(container.querySelectorAll('a').length).toBe(results.length + 1);
  });

  it('must show flyout component while there are selected cards', async () => {
    const { getByTestId } = render(<SearchResults results={results} />);
    expect(getByTestId('flyout')).toBeDefined();
  });

  it('must execute download on Download button click', async () => {
    const { container, getByTestId } = render(<SearchResults results={results} />);
    const flyout = getByTestId('flyout');
    const btns = flyout.querySelectorAll('button');
    HTMLAnchorElement.prototype.click = vi.fn();
    act(() => {
      btns[1].click();
    });
    const anchors = container.querySelectorAll('a');
    const downloadElement = anchors[anchors.length - 1];
    expect(downloadElement.href).contains('test');
    expect(HTMLAnchorElement.prototype.click).toHaveBeenCalled();
    expect(window.URL.revokeObjectURL).toHaveBeenCalled();
  });
});
