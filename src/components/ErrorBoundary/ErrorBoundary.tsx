import React from 'react';
import AppErrorFallback from '../AppErrorFallback';

interface ErrorBoundaryState {
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('에러경계(error): ' + error);
    console.error('에러경계(errorInfo): ' + errorInfo);
  }

  render() {
    const { children } = this.props;
    const { error } = this.state;

    if (error) {
      return <AppErrorFallback />;
    }

    return children;
  }
}

export default ErrorBoundary;
