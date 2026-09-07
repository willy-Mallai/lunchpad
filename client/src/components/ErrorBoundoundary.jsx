import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // Runs when a child component crashes — sets hasError to true
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // Optional: log the error details
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-[#BD6C73] font-bold text-sm">
            Something went wrong.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="mt-3 px-4 py-2 text-xs font-bold bg-[#3F5B8D] text-white rounded-xl hover:bg-[#4E6EAA] transition-all cursor-pointer"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
