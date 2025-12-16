import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-4 m-4 border border-red-500 rounded bg-red-900/20 text-red-200">
                    <h2 className="font-bold">Component Error</h2>
                    <p className="text-sm">{this.state.error?.message || "Unknown error"}</p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
