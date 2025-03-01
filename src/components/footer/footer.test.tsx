import React from 'react';
import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import Footer from './Footer';

test('Footer component', async () => {
  const { getAllByRole } = render(<Footer />);

  const imgs = getAllByRole('img').map((el) => el.getAttribute('alt'));
  expect(imgs).toEqual(['avatar', 'rss']);
});
