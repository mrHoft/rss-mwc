import React from 'react';
import { expect, test } from 'vitest';
import { render, act } from '@testing-library/react';
import Loader from './Loader';

test('Loader component', async () => {
  const { container } = render(<Loader />);

  expect(container.children.length).toBe(0);

  await act(async () => {
    Loader.show();
  });
  expect(container.children.length).toBe(1);

  await act(async () => {
    Loader.hide();
  });
  expect(container.children.length).toBe(0);
});
