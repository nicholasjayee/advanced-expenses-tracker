import React, { Suspense } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { RootLayout } from './layouts/RootLayout';
import { Loader } from './components/ui/Loader';
import NotFound from './pages/NotFound';
import { AccountProvider } from './context/AccountContext';
import { ExpenseProvider } from './context/ExpenseContext';
import { LiabilityProvider } from './context/LiabilityContext';
import { IncomeProvider } from './context/IncomeContext';
import { InvestmentProvider } from './context/InvestmentContext';
import { NotificationProvider } from './context/NotificationContext';
import { SettingsProvider } from './context/SettingsContext';

// Lazy load pages to simulate Next.js code splitting
const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard'));
const Accounts = React.lazy(() => import('./pages/Accounts/Accounts'));
const Expenses = React.lazy(() => import('./pages/Expenses/Expenses'));
const Income = React.lazy(() => import('./pages/Income/Income'));
const Investments = React.lazy(() => import('./pages/Investments/Investments'));
const Electricity = React.lazy(() => import('./pages/Electricity/Electricity'));
const Liabilities = React.lazy(() => import('./pages/Liabilities/Liabilities'));
const Settings = React.lazy(() => import('./pages/Settings/Settings'));
const History = React.lazy(() => import('./pages/History/History'));

interface ErrorBoundaryProps {
  children?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// Error Boundary Component (Simulating error.tsx)
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen w-full items-center justify-center bg-background text-text">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-danger mb-2">Something went wrong!</h2>
            <button 
              className="text-sm underline text-muted hover:text-text"
              onClick={() => window.location.reload()}
            >
              Try reloading
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const App: React.FC = () => {
  return (
    <HashRouter>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <SettingsProvider>
          <NotificationProvider>
            <AccountProvider>
              <LiabilityProvider>
                <IncomeProvider>
                  <InvestmentProvider>
                    <ExpenseProvider>
                      <ErrorBoundary>
                        <Routes>
                          <Route path="/" element={<RootLayout />}>
                            <Route index element={
                              <Suspense fallback={<Loader />}>
                                <Dashboard />
                              </Suspense>
                            } />
                            <Route path="accounts" element={
                              <Suspense fallback={<Loader />}>
                                <Accounts />
                              </Suspense>
                            } />
                            <Route path="expenses" element={
                              <Suspense fallback={<Loader />}>
                                <Expenses />
                              </Suspense>
                            } />
                            <Route path="income" element={
                              <Suspense fallback={<Loader />}>
                                <Income />
                              </Suspense>
                            } />
                            <Route path="investments" element={
                              <Suspense fallback={<Loader />}>
                                <Investments />
                              </Suspense>
                            } />
                            <Route path="electricity" element={
                              <Suspense fallback={<Loader />}>
                                <Electricity />
                              </Suspense>
                            } />
                            <Route path="liabilities" element={
                              <Suspense fallback={<Loader />}>
                                <Liabilities />
                              </Suspense>
                            } />
                            <Route path="settings" element={
                              <Suspense fallback={<Loader />}>
                                <Settings />
                              </Suspense>
                            } />
                            <Route path="history" element={
                              <Suspense fallback={<Loader />}>
                                <History />
                              </Suspense>
                            } />
                            <Route path="*" element={<NotFound />} />
                          </Route>
                        </Routes>
                      </ErrorBoundary>
                    </ExpenseProvider>
                  </InvestmentProvider>
                </IncomeProvider>
              </LiabilityProvider>
            </AccountProvider>
          </NotificationProvider>
        </SettingsProvider>
      </ThemeProvider>
    </HashRouter>
  );
};

export default App;