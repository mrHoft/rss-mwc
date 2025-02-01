import React from 'react';
import Search from '~/components/search/Search';
import { requestCharacters } from '~/api/request';
import SearchResults from '~/components/results/Results';
import ErrorComponent from '~/components/error/ErrorComponent';
import type { TCharacter } from '~/api/types';
import Loader from '~/components/loader/loader';
import Storage from '~/utils/storage';
import Button from '~/components/button/Button';

import styles from '../page.module.css';

const storage = new Storage();

const defaultMessage = '( search by name and description )';
const pageSize = 6;

type TState = {
  query: string;
  message?: string;
  error?: string;
  total: number;
  data: TCharacter[];
  loading?: boolean;
  throwError: boolean;
};

export default class CharactersList extends React.Component {
  state: TState = {
    query: '',
    message: defaultMessage,
    total: 0,
    data: [],
    throwError: false,
  };

  constructor(props = {}) {
    super(props);
  }

  private requestData = (query?: string) => {
    const message = query ? `Searching for "${query}"...` : 'Requesting data...';
    this.setState((prev) => ({ ...prev, loading: true, message }));
    requestCharacters({ query, pageSize })
      .then(({ data, meta, error }) => {
        if (error) {
          this.setState(() => ({ error: `${error.status}: ${error.message}` }));
        } else {
          this.setState(() => ({ data, total: meta?.pagination.total, error: undefined }));
        }
      })
      .finally(() => {
        this.setState((prev) => ({ ...prev, loading: false, message: defaultMessage }));
      });
  };

  componentDidMount(): void {
    const lastSearch = storage.get<string>('lastSearch');
    this.setState((prev) => ({ ...prev, query: lastSearch ?? '' }));
    this.requestData(lastSearch);
  }

  private updateState = (query: string) => {
    this.setState((prev) => ({ ...prev, query }));
    this.requestData(query);
  };

  private handleThrowError = () => {
    this.setState((prev) => ({ ...prev, throwError: true }));
  };

  render() {
    const results = this.state.total
      ? `Total: ${this.state.total}. Page: 1 of ${Math.ceil(this.state.total / pageSize)}.`
      : `Nothing found for "${this.state.query}".`;

    return (
      <>
        <section className={styles.page__section} aria-label="search">
          <Search callback={this.updateState} />
        </section>
        <section className={`${styles.page__section} frame`} aria-label="info">
          <div style={{ textAlign: 'center' }}>{this.state.message}</div>
          <div style={{ textAlign: 'center' }}>{this.state.error ?? results}</div>
        </section>
        <section className={styles.page__section} aria-label="results">
          <SearchResults results={this.state.data} />
          {this.state.loading && <Loader />}
        </section>
        <div className={styles.page__btns}>
          <Button onClick={this.handleThrowError}>Throw Error</Button>
        </div>
        {this.state.throwError && <ErrorComponent />}
      </>
    );
  }
}
