import { Component, ReactNode } from 'react';

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
    console.log('We did catch', error);
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <h2>Seems like an error occured!</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>{this.state.error.toString()}</details>
          <div className="align_center" style={{ marginTop: '2rem' }}>
            <button onClick={() => this.setState({ error: null })}>Try again</button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
