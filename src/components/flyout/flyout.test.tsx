import React from 'react';
import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import Flyout from './Flyout';

test('Flyout component', async () => {
  const { getByText } = render(<Flyout selected={1} unselect={() => undefined} download={() => undefined} />);

  expect(getByText('1 items are selected')).toBeDefined();
});
