import React from 'react';
import { Search } from './components/search/Search';
import { requestCharacters } from './api/request';
import { SearchResults } from './components/results/Results';
import { ErrorComponent } from './components/ErrorComponent';
import type { TCharacter } from './api/types';
import Loader from './components/loader/loader';
import Storage from './utils/storage';

const storage = new Storage();

const defaultMessage = '( search by name and description )';
const pageSize = 10;

type TState = {
  query: string;
  message?: string;
  error?: string;
  total: number;
  data: TCharacter[];
  loading?: boolean;
  throwError: boolean;
};

class App extends React.Component {
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
      .then(({ data, meta, error, status }) => {
        if (error) {
          this.setState(() => ({ error: `${status}: ${error.message}` }));
        } else {
          this.setState(() => ({ data, total: meta?.pagination.total }));
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

  render() {
    return (
      <>
        <div>
          <Search callback={this.updateState} />
          <p style={{ textAlign: 'center' }}>{this.state.message}</p>
        </div>
        <div style={{ position: 'relative', lineHeight: '1.5', height: '15lh' }}>
          <p>
            {this.state.total
              ? `Total: ${this.state.total}. Page: 1 of ${Math.ceil(this.state.total / pageSize)}.`
              : `Nothing found for "${this.state.query}".`}
          </p>
          <SearchResults results={this.state.data} />
          {this.state.loading && <Loader />}
        </div>
        <div className="align_center">
          <button
            onClick={() => {
              this.setState((prev) => ({ ...prev, throwError: true }));
            }}>
            Throw Error
          </button>
        </div>
        {this.state.throwError && <ErrorComponent />}
      </>
    );
  }
}

export default App;
