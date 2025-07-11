// src/App.jsx - Updated Main App Component with Router
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Portfolio from './components/Portfolio';
import './index.css';

// Lazy-loaded components
const EnhancedContactForm = lazy(() => import('./components/contact/EnhancedContactForm'));
const Gallery = lazy(() => import('./components/gallery/GalleryComponents'));
const BlogSection = lazy(() => import('./components/blog/BlogComponents'));
const ThreeDScene = lazy(() => import('./components/3d/ThreeDComponents'));

// Simple error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Portfolio Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
          <div className="text-center p-8 max-w-md">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Erreur de chargement
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Une erreur s'est produite lors du chargement du portfolio.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Recharger la page
            </button>
            <details className="mt-4 text-left">
              <summary className="cursor-pointer text-sm text-gray-500">
                Détails de l'erreur
              </summary>
              <pre className="mt-2 text-xs text-red-500 overflow-auto max-h-32">
                {this.state.error?.toString()}
              </pre>
            </details>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading component for Suspense fallback
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

// Main App component
function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/contact" element={<EnhancedContactForm />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/blog" element={<BlogSection />} />
            <Route path="/3d" element={<ThreeDScene />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
}

export default App;