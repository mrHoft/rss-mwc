import React from 'react';
import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import Loader from './Loader';

test('Loader component', async () => {
  const { container } = render(<Loader />);

  expect(container.querySelector('div')).toBeDefined();
});
