import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import Backdop from './Backdop';

test('Backdop component', async () => {
  const { container } = render(<Backdop />);

  expect(container.querySelector('div')).toBeDefined();
});
