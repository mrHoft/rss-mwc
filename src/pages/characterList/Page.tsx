import React, { useEffect, useContext } from 'react';
import { requestCharacters } from '~/api/request';
import SearchResults from '~/components/results/Results';
import type { TCharacter } from '~/api/types';
import Loader from '~/components/loader/Loader';
import { Context } from '~/entities/context';
import Pagination from '~/components/pagination/Pagination';

import styles from '../page.module.css';

const pageSize = 6;

interface CharactersListState {
  data: TCharacter[];
  total: number;
  loading?: boolean;
  error?: string;
  throwError?: boolean;
}
const initialState: CharactersListState = {
  total: 0,
  data: [],
};

export default function CharactersList() {
  const [state, setState] = React.useState<CharactersListState>(initialState);
  const [page, setPage] = React.useState(0);
  const { query } = useContext(Context);

  const requestData = () => {
    setState((prev) => ({ ...prev, loading: true }));
    requestCharacters({ query, page: page + 1, pageSize })
      .then(({ data, meta, error }) => {
        if (error) {
          setState((prev) => ({ ...prev, error: `${error.status}: ${error.message}` }));
        } else {
          setState({ data: data ?? [], total: meta?.pagination.total ?? 0, error: undefined });
        }
      })
      .finally(() => {
        setState((prev) => ({ ...prev, loading: false }));
      });
  };

  useEffect(() => {
    setState((prev) => ({ ...prev, query }));
    setPage(0);
    requestData();
  }, [query]);

  useEffect(requestData, [page]);

  if (state.throwError) throw new Error('Errored!');

  return (
    <section className={styles.page__section} aria-label="results">
      {state.error && <p>{state.error}</p>}
      <SearchResults results={state.data} loading={state.loading} />
      <Pagination page={page} pageSize={pageSize} total={state.total} onChange={setPage} />
      {state.loading && <Loader />}
    </section>
  );
}
