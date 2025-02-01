import { Component, ReactNode } from 'react';
import Button from '../button/Button';

interface BoundaryProps {
  children: ReactNode;
}

interface BoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends Component<BoundaryProps, BoundaryState> {
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
        <div>
          <h2>Seems like an error occured!</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>{this.state.error.toString()}</details>
          <div className="align_center" style={{ marginTop: '2rem' }}>
            <Button onClick={() => this.setState({ error: null })}>Try again</Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
