import React, { Suspense } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { Loader } from './components/ui/Loader';
import NotFound from './pages/NotFound';

// Lazy load pages to simulate Next.js code splitting
const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard'));
const Expenses = React.lazy(() => import('./pages/Expenses/Expenses'));
const Investments = React.lazy(() => import('./pages/Investments/Investments'));
const Electricity = React.lazy(() => import('./pages/Electricity/Electricity'));
const Liabilities = React.lazy(() => import('./pages/Liabilities/Liabilities'));

// Error Boundary Component (Simulating error.tsx)
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen w-full items-center justify-center bg-background text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-danger mb-2">Something went wrong!</h2>
            <button 
              className="text-sm underline text-muted hover:text-white"
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
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={
              <Suspense fallback={<Loader />}>
                <Dashboard />
              </Suspense>
            } />
            <Route path="expenses" element={
              <Suspense fallback={<Loader />}>
                <Expenses />
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
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </HashRouter>
  );
};

export default App;