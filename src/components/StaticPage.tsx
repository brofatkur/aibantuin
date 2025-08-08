import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import Header from './Header';
import Footer from './Footer';

const StaticPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getPageBySlug } = useAdmin();

  if (!slug) {
    return <Navigate to="/" replace />;
  }

  const page = getPageBySlug(`/${slug}`);

  if (!page) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Halaman Tidak Ditemukan</h1>
            <p className="text-lg text-gray-600 mb-8">
              Maaf, halaman yang Anda cari tidak dapat ditemukan.
            </p>
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Kembali ke Beranda
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <article className="prose prose-lg max-w-none">
          <div 
            className="static-page-content"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </article>
        
        {/* Back to Home Button */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            ← Kembali ke Beranda
          </a>
        </div>
      </main>
      
      <Footer />
      
      <style jsx>{`
        .static-page-content h1 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }
        
        .static-page-content h2 {
          font-size: 1.875rem;
          font-weight: 600;
          color: #374151;
          margin-top: 2rem;
          margin-bottom: 1rem;
          line-height: 1.3;
        }
        
        .static-page-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #374151;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }
        
        .static-page-content p {
          color: #4b5563;
          line-height: 1.7;
          margin-bottom: 1rem;
        }
        
        .static-page-content ul, .static-page-content ol {
          margin-bottom: 1rem;
          padding-left: 1.5rem;
        }
        
        .static-page-content li {
          color: #4b5563;
          line-height: 1.6;
          margin-bottom: 0.5rem;
        }
        
        .static-page-content strong {
          font-weight: 600;
          color: #374151;
        }
        
        .static-page-content a {
          color: #2563eb;
          text-decoration: underline;
        }
        
        .static-page-content a:hover {
          color: #1d4ed8;
        }
        
        .static-page-content blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: #6b7280;
        }
      `}</style>
    </div>
  );
};

export default StaticPage;
