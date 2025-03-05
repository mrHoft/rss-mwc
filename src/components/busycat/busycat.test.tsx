import { expect, test } from 'vitest';
import { render, act } from '@testing-library/react';
import BusyCat from './BusyCat';

test('BusyCat component', async () => {
  const { getByRole, getByText } = render(<BusyCat />);

  const img = getByRole('img');

  await act(async () => {
    img.click();
  });

  expect(getByText('Whut?')).toBeDefined();
});
