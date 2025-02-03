import React from 'react';

import styles from './button.module.css';

type TButtonProps = { children: string | JSX.Element; onClick?: () => void };

export default class Button extends React.Component<TButtonProps> {
  render() {
    return (
      <button type="button" className={styles.button} onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}
