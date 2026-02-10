import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-text mb-2">Page Not Found</h2>
      <p className="text-muted mb-8 max-w-md">The financial record you are looking for seems to have been misplaced or audited out of existence.</p>
      <Link to="/" className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition-colors">
        Return to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;