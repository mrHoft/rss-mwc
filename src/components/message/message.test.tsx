import React from 'react';
import { expect, test } from 'vitest';
import { render, act } from '@testing-library/react';
import Message from './message';

test('Message component', async () => {
  const { getByText } = render(<Message />);

  act(() => {
    Message.show('test message');
  });

  expect(getByText('test message')).toBeDefined();
});
