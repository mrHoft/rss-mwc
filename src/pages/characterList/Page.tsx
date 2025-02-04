import React, { useEffect, useContext } from 'react';
import { requestCharacters } from '~/api/request';
import SearchResults from '~/components/results/Results';
import type { TCharacter } from '~/api/types';
import Loader from '~/components/loader/Loader';
import Button from '~/components/button/Button';
import { Context } from '~/entities/context';

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
  const { query } = useContext(Context);

  const requestData = (query?: string) => {
    setState((prev) => ({ ...prev, loading: true }));
    requestCharacters({ query, pageSize })
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

  const handleThrowError = () => {
    setState((prev) => ({ ...prev, throwError: true }));
  };

  useEffect(() => {
    setState((prev) => ({ ...prev, query }));
    requestData(query);
  }, [query]);

  if (state.throwError) throw new Error('Errored!');

  return (
    <>
      <section className={styles.page__section} aria-label="results">
        {state.error && <p>{state.error}</p>}
        <SearchResults results={state.data} loading={state.loading} />
        {state.loading && <Loader />}
      </section>
      <div className={styles.page__btns}>
        <Button onClick={handleThrowError}>Throw Error</Button>
      </div>
    </>
  );
}
