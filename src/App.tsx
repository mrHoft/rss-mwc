import React from 'react';
import { Search } from './components/search/Search';
import { requestCharacters } from './api/request';
import { SearchResults } from './components/results/Results';
import { ErrorComponent } from './components/ErrorComponent';
import { TCharacter } from './api/types';

type TState = {
  status?: string;
  error?: string;
  total: number;
  data: TCharacter[];
  throwError: boolean;
};

class App extends React.Component {
  state: TState = {
    status: '',
    total: 0,
    data: [],
    throwError: false,
  };

  constructor(props = {}) {
    super(props);
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount(): void {
    console.log('Main page first mount');
  }

  updateState(query: string) {
    this.setState({ status: `Searching for "${query}"...` });
    requestCharacters({ query, page: 1, pageSize: 1 }).then(({ data, meta, error, status }) => {
      console.log(data);
      if (error) {
        this.setState(() => {
          return { status, error: error.message };
        });
      } else {
        this.setState(() => {
          return { data, total: meta?.pagination.total };
        });
      }
    });
  }

  render() {
    return (
      <>
        <div>
          <Search callback={this.updateState.bind(this)} />
        </div>
        <div>
          {this.state.status && <p>{this.state.status}</p>}
          {this.state.total && <p>Total: {this.state.total}</p>}
          <SearchResults results={this.state.data} />
        </div>
        <div className="align_center">
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
