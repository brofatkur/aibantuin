import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { 
  LogOut, 
  Eye,
  Edit,
  FileText,
  Save,
  X,
  Clock
} from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import Logo from '../Logo';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const PageManagement: React.FC = () => {
  const { isAuthenticated, logout, contentData, updatePageContent, saveAllChanges } = useAdmin();
  const [editingPage, setEditingPage] = useState<string | null>(null);
  const [editorContent, setEditorContent] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleEditPage = (pageId: string) => {
    const page = contentData.staticPages[pageId];
    if (page) {
      setEditorContent(page.content);
      setEditingPage(pageId);
    }
  };

  const handleSavePage = async () => {
    if (!editingPage) return;
    
    setSaveStatus('saving');
    try {
      updatePageContent(editingPage, editorContent);
      const success = await saveAllChanges();
      
      if (success) {
        setSaveStatus('saved');
        setTimeout(() => {
          setSaveStatus('idle');
          setEditingPage(null);
        }, 2000);
      } else {
        setSaveStatus('error');
        setTimeout(() => setSaveStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Save error:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handleCancelEdit = () => {
    setEditingPage(null);
    setEditorContent('');
    setSaveStatus('idle');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ],
  };

  const quillFormats = [
    'header', 'bold', 'italic', 'underline',
    'list', 'bullet', 'link'
  ];

  // If editing a page, show the editor
  if (editingPage) {
    const currentPage = contentData.staticPages[editingPage];
    
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <Logo width={120} height={36} />
                <div className="border-l border-gray-300 pl-4">
                  <h1 className="text-xl font-semibold text-gray-900">
                    Mengubah Konten Halaman: {currentPage?.name}
                  </h1>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview Site</span>
                </a>
                
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {/* Page Info */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">Informasi Halaman</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-blue-700 font-medium">Nama Halaman:</span>
                  <span className="ml-2 text-blue-800">{currentPage?.name}</span>
                </div>
                <div>
                  <span className="text-blue-700 font-medium">URL:</span>
                  <span className="ml-2 text-blue-800">{currentPage?.slug}</span>
                </div>
              </div>
            </div>

            {/* Rich Text Editor */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Konten Halaman
              </label>
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <ReactQuill
                  theme="snow"
                  value={editorContent}
                  onChange={setEditorContent}
                  modules={quillModules}
                  formats={quillFormats}
                  style={{ minHeight: '400px' }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <button
                onClick={handleCancelEdit}
                className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Batal</span>
              </button>

              <button
                onClick={handleSavePage}
                disabled={saveStatus === 'saving'}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  saveStatus === 'saved'
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : saveStatus === 'error'
                    ? 'bg-red-100 text-red-700 border border-red-200'
                    : saveStatus === 'saving'
                    ? 'bg-blue-400 text-white cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                <Save className="w-4 h-4" />
                <span>
                  {saveStatus === 'saving' && 'Menyimpan...'}
                  {saveStatus === 'saved' && 'Konten halaman berhasil diperbarui!'}
                  {saveStatus === 'error' && 'Gagal Menyimpan'}
                  {saveStatus === 'idle' && 'Simpan Perubahan'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main page list view
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Logo width={120} height={36} />
              <div className="border-l border-gray-300 pl-4">
                <h1 className="text-xl font-semibold text-gray-900">Manajemen Halaman</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>Preview Site</span>
              </a>
              
              <button
                onClick={logout}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Page Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <FileText className="w-6 h-6 text-blue-600" />
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Daftar Halaman Statis</h2>
                <p className="text-sm text-gray-600">Kelola konten halaman seperti Privacy Policy, Terms & Conditions, dan Support</p>
              </div>
            </div>
          </div>

          {/* Pages Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama Halaman
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    URL Slug
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Terakhir Diubah
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.values(contentData.staticPages).map((page) => (
                  <tr key={page.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{page.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600 font-mono bg-gray-100 px-2 py-1 rounded">
                        {page.slug}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        {formatDate(page.lastModified)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleEditPage(page.id)}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Ubah Konten</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageManagement;
