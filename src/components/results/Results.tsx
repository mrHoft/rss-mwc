import React from 'react';
import { TCharacter } from '../../api/types';

interface ResultsProps {
  results: TCharacter[];
}

export class SearchResults extends React.Component<ResultsProps, ResultsProps> {
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
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>gender</th>
            <th>species</th>
            <th>occupation</th>
          </tr>
        </thead>
        <tbody>
          {this.state.results.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.gender.title}</td>
              <td>{item.species.title}</td>
              <td>{item.occupation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
