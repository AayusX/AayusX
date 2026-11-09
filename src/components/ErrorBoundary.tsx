import { Component, type ErrorInfo, type ReactNode } from 'react';
import i18n from '../i18n';

interface ErrorBoundaryState {
  failed: boolean;
}

/**
 * Production safety net: a rendering failure shows a readable, on-brand
 * message instead of an empty page. It deliberately avoids hooks so it works
 * outside the component tree that failed.
 */
export class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { failed: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[AayusX] render failed', error, info.componentStack);
  }

  render() {
    if (!this.state.failed) return this.props.children;

    return (
      <div className="container error-page" role="alert">
        <p className="eyebrow">AayusX</p>
        <h1>{i18n.t('common.errorTitle')}</h1>
        <p>{i18n.t('common.errorBody')}</p>
        <button type="button" className="button" onClick={() => window.location.reload()}>
          {i18n.t('common.reload')}
        </button>
      </div>
    );
  }
}
