import React from 'react';
import { TCharacter } from '~/api/types';
import { CardCharacter } from '../card/Card';

import styles from './results.module.css';

interface ResultsProps {
  results: TCharacter[];
}

export default class SearchResults extends React.Component<ResultsProps, ResultsProps> {
  constructor(props: ResultsProps) {
    super(props);
    if (props.results) this.state = { results: props.results };
  }

  static getDerivedStateFromProps(props: ResultsProps) {
    if (props.results) return props;
    return null;
  }

  render(): React.ReactNode {
    if (!this.state.results.length) return null;

    return (
      <div className={styles.cards}>
        {this.state.results.map((item) => (
          <CardCharacter key={item.id} character={item} small />
        ))}
      </div>
    );
  }
}
