import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import Button from './Button';

test('Button component', async () => {
  const state = { clicks: 0 };
  const onClick = () => {
    state.clicks++;
  };
  const { getByRole } = render(<Button onClick={onClick}>Test</Button>);
  const button = getByRole('button');

  expect(button).toBeDefined();

  button.click();
  expect(state.clicks).toBe(1);
});
