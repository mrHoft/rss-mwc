import React from 'react';
import { expect, test, vi } from 'vitest';
import { render } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';

const ErrorComponent: React.FC = () => {
  throw new Error('Errored!');
};

test('ErrorBoundary component', async () => {
  vi.spyOn(console, 'error').mockImplementation(() => null);
  const { getByText } = render(
    <ErrorBoundary>
      <ErrorComponent />
    </ErrorBoundary>
  );

  expect(getByText('Seems like an error occured!')).toBeDefined();
});
