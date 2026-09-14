import { Component } from "react";

export default class RouteErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" className="route-error" style={{ padding: "8rem 2rem", textAlign: "center" }}>
          <h1>This page couldn’t load</h1>
          <p>Please reload the page to try again.</p>
          <button type="button" className="btn" onClick={() => window.location.reload()}>Reload page</button>
        </div>
      );
    }
    return this.props.children;
  }
}
