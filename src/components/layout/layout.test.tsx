import React from 'react';
import { expect, describe, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import Layout from './layout';

interface State {
  query: Record<string, string>;
}
const state: State = { query: { search: '', page: '0' } };

vi.mock('next/router', () => ({
  useRouter: () => ({
    push: (to: string) => {
      const page = to.match(/page=(\d*)/);
      if (page) state.query.page = page[1];
      const search = to.match(/search=(.*)/);
      if (search) state.query.search = search[1];
    },
  }),
}));
vi.mock('next/navigation', () => ({
  useSearchParams: () => ({ get: () => '', toString: () => '' }),
}));

describe('Layout component', async () => {
  it('must render child components', async () => {
    const { getByText } = render(
      <Layout>
        <h1>test-test</h1>
      </Layout>
    );

    expect(getByText('test-test')).toBeDefined();
  });
});
