import React from 'react';

export default class ErrorComponent extends React.Component {
  render() {
    throw new Error('Errored!');
    return null;
  }
}
