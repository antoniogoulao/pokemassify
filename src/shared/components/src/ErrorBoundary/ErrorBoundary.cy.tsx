import { ErrorBoundary } from './ErrorBoundary';

const runtimeErrorText = 'Runtime error!';

const MockComponent = () => {
  throw new Error(runtimeErrorText);
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', () => false);
  });

  it('renders default fallback', () => {
    cy.mount(
      <ErrorBoundary>
        <MockComponent />
      </ErrorBoundary>,
    );

    cy.findByText('Something went wrong.').should('exist');
  });

  it('renders custom fallback when provided', () => {
    const customErrorMessage = 'Snap! Something went wrong.';
    const CustomErrorFallback = () => <span>{customErrorMessage}</span>;

    cy.mount(
      <ErrorBoundary fallback={<CustomErrorFallback />}>
        <MockComponent />
      </ErrorBoundary>,
    );

    cy.findByText(customErrorMessage).should('exist');
  });

  it('custom onError callback is triggered when provided', () => {
    const handleErrorStub = cy.stub().as('handleErrorStub');

    cy.mount(
      <ErrorBoundary onError={handleErrorStub}>
        <MockComponent />
      </ErrorBoundary>,
    );

    cy.get('@handleErrorStub').should(
      'be.calledWithMatch',
      new Error(runtimeErrorText),
      ({ componentStack }: { componentStack: unknown }) => {
        return typeof componentStack === 'string';
      },
    );
  });

  it('when custom renderFallback prop is provided it should be called and errorMessage should be passed to it', () => {
    const renderFallbackStub = cy.stub().as('renderFallbackStub');

    cy.mount(
      <ErrorBoundary renderFallback={renderFallbackStub}>
        <MockComponent />
      </ErrorBoundary>,
    );

    cy.get('@renderFallbackStub').should('be.calledWith', runtimeErrorText);
  });
});
