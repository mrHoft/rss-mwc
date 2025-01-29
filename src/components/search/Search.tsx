import React from 'react';
import Storage from '~/utils/storage';

import styles from './search.module.css';

const storage = new Storage();

interface SearchProps {
  callback: (query: string) => void;
}

interface SearchState {
  callback: (query: string) => void;
  value: string;
}

export class Search extends React.Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = { ...props, value: '' };
  }

  componentDidMount(): void {
    const lastSearch = storage.get<string>('lastSearch');
    this.setState((prev) => ({ ...prev, value: lastSearch ?? '' }));
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState((props) => {
      return { ...props, value: event.target.value };
    });
  };

  private handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value = event.target.value.replaceAll(' ', '');
  };

  private handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.target as HTMLFormElement);
    const value = String(form.get('request'));
    storage.set('lastSearch', value);
    this.state.callback(value);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={styles.search}>
        <div className={styles.search__field_static}>
          <input
            type="text"
            name="request"
            placeholder="Search word"
            autoFocus={true}
            autoComplete="off"
            className={styles.search__input_static}
            value={this.state.value}
            onChange={this.handleChange}
            onInput={this.handleInput}
          />
          <div
            className={styles.search__clear_static}
            onClick={() =>
              this.setState((props) => {
                return { ...props, value: '' };
              })
            }></div>
        </div>
        <button type="submit" className={styles.search__button}>
          Search
        </button>
      </form>
    );
  }
}
