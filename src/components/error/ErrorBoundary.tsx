import React from 'react';
import Button from '../button/Button';

import styles from './boundary.module.css';

interface BoundaryProps {
  children: React.ReactNode;
}

interface BoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends React.Component<BoundaryProps, BoundaryState> {
  constructor(props: BoundaryProps) {
    super(props);
    this.state = {
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="theme">
          <div className={styles.page__error}>
            <div className="frame">
              <img src="/images/dolls.png" alt="error" />
              <h2>Seems like an error occured!</h2>
              <details style={{ whiteSpace: 'pre-wrap' }}>{this.state.error.toString()}</details>
            </div>
            <div className="align_center" style={{ marginTop: '2rem' }}>
              <Button onClick={() => this.setState({ error: null })}>Try again</Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
