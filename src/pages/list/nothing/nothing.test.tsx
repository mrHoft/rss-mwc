import { expect, test, vi } from 'vitest';
import { render } from '@testing-library/react';
import NothingFound from './Nothing';

vi.mock('react-router', () => ({
  useSearchParams: () => [{ get: () => 'test' }, () => undefined],
}));

test('NothingFound component', async () => {
  const { getByText } = render(<NothingFound />);

  expect(getByText('Nothing found for "test".')).toBeDefined();
});
