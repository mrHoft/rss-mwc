import React from 'react';
import { Search } from './components/search/Search';
import { requestCharacters } from './api/request';
import { SearchResults } from './components/results/Results';
import { ErrorComponent } from './components/ErrorComponent';
import { TCharacter } from './api/types';
import Storage from './utils/storage';

const storage = new Storage();

type TState = {
  query: string;
  status?: string;
  error?: string;
  total: number;
  data: TCharacter[];
  throwError: boolean;
};

class App extends React.Component {
  state: TState = {
    query: '',
    status: '',
    total: 0,
    data: [],
    throwError: false,
  };

  constructor(props = {}) {
    super(props);
  }

  private requestData = (query?: string) => {
    requestCharacters({ query }).then(({ data, meta, error, status }) => {
      if (error) {
        this.setState(() => ({ error: `${status}:${error.message}`, status: '' }));
      } else {
        this.setState(() => ({ data, total: meta?.pagination.total, status: '' }));
      }
    });
  };

  componentDidMount(): void {
    const lastSearch = storage.get<string>('lastSearch');
    this.setState((prev) => ({ ...prev, query: lastSearch ?? '' }));
    this.requestData(lastSearch);
  }

  public updateState = (query: string) => {
    const status = query ? `Searching for "${query}"...` : 'Requesting data...';
    this.setState((prev) => ({ ...prev, status, query }));
    this.requestData(query);
  };

  render() {
    return (
      <>
        <div>
          <Search callback={this.updateState} />
          <p style={{ textAlign: 'center' }}>(search by name and description)</p>
        </div>
        <div>
          {this.state.status && <p>{this.state.status}</p>}
          <p>{this.state.total ? `Total: ${this.state.total}. Page: 1` : `Nothing found for "${this.state.query}"`}</p>
          <SearchResults results={this.state.data} />
        </div>
        <div className="align_center" style={{ marginTop: '2rem' }}>
          <button
            onClick={() => {
              this.setState((prev) => ({ ...prev, throwError: true }));
            }}>
            Throw Error
          </button>
        </div>
        {this.state.throwError ? <ErrorComponent /> : null}
      </>
    );
  }
}

export default App;
