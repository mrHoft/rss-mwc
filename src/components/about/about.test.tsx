import { expect, test, vi } from 'vitest';
import { render } from '@testing-library/react';
import PageAbout from './About';

vi.mock('react-router', () => ({
  useNavigate: () => undefined,
}));

test('PageAbout component', async () => {
  const { getByText } = render(<PageAbout />);

  expect(getByText('About:')).toBeDefined();
});
