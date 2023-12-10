import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';

import type { BoxProps } from '@mui/material';
import { Stack, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { FmdBad } from '@mui/icons-material';
import { isTest } from '../../../../helpers';

interface Props {
  children: ReactNode;
  fallback?: JSX.Element;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  renderFallback?: (errorMessage: string | null) => JSX.Element;
  resetKeys?: unknown[];
}

interface State {
  hasError: boolean;
  errorMessage: string | null;
}

export const DefaultErrorFallback = ({ ref, ...props }: BoxProps) => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="center" flexGrow={1} {...props}>
      <FmdBad color="error" />
      <Typography>
        <FormattedMessage id="error.exception" defaultMessage="Something went wrong." />
      </Typography>
    </Stack>
  );
};

const initialState = {
  hasError: false,
  errorMessage: null,
};

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  static defaultProps: Partial<Props> = {
    fallback: <DefaultErrorFallback />,
  };

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: error.message !== null,
      errorMessage: error.message,
    };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.onError?.(error, errorInfo);

    if (isTest) return;
  }

  override componentDidUpdate(prevProps: Props, prevState: State) {
    const { hasError } = this.state;
    const { resetKeys } = this.props;

    if (resetKeys && hasError && prevState.hasError) {
      this.setState(initialState);
    }
  }

  override render() {
    if (this.state.hasError) {
      console.log('has error', this.props.fallback);
      return this.props.renderFallback ? this.props.renderFallback(this.state.errorMessage) : this.props.fallback;
    }
    return this.props.children;
  }
}
