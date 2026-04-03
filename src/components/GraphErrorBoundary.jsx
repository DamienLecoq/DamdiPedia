import React from 'react';

class GraphErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(e) {
    return { hasError: true, error: e };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="graph-error">
          <p>Graph error: {this.state.error?.message}</p>
          <button
            className="btn-secondary"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default GraphErrorBoundary;
