import React, { useState, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import {
  LogOut,
  Home,
  DollarSign,
  MessageSquare,
  Phone,
  Settings,
  Star,
  Zap,
  Save,
  Eye,
  Upload,
  Image,
  FileText
} from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import Logo from '../Logo';

const AdminDashboard: React.FC = () => {
  const { isAuthenticated, logout, contentData, updateContent, updatePricingTier, updateTestimonial, updateFeature, uploadLogo, saveAllChanges, updateCtaButton, updatePageContent } = useAdmin();
  const [activeTab, setActiveTab] = useState('hero');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [logoUploading, setLogoUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSave = async () => {
    setSaveStatus('saving');
    try {
      const success = await saveAllChanges();
      if (success) {
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2000);
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

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a valid image file (PNG, JPG, SVG, or WebP)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setLogoUploading(true);
    try {
      await uploadLogo(file);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Logo upload error:', error);
      alert('Failed to upload logo. Please try again.');
    } finally {
      setLogoUploading(false);
    }
  };

  const tabs = [
    { id: 'hero', label: 'Hero Section', icon: Home },
    { id: 'logo', label: 'Logo', icon: Image },
    { id: 'cta', label: 'CTA Buttons', icon: Zap },
    { id: 'pages', label: 'Manajemen Halaman', icon: FileText },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'contact', label: 'Contact', icon: Phone },
    { id: 'features', label: 'Features', icon: Star },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderHeroSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Hero Section</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <textarea
          value={contentData.heroTitle}
          onChange={(e) => updateContent('heroTitle', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
        <textarea
          value={contentData.heroSubtitle}
          onChange={(e) => updateContent('heroSubtitle', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
        />
      </div>



      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
        <input
          type="text"
          value={contentData.heroTagline}
          onChange={(e) => updateContent('heroTagline', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-700">
          <strong>Note:</strong> To edit button text, go to the "CTA Buttons" tab.
        </p>
      </div>
    </div>
  );

  const renderPricingSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Pricing Tiers</h3>
      
      {contentData.pricingTiers.map((tier, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
          <h4 className="font-medium text-gray-900">Paket {index + 1}</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Paket</label>
              <input
                type="text"
                value={tier.name}
                onChange={(e) => updatePricingTier(index, { name: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Harga</label>
              <input
                type="text"
                value={tier.price}
                onChange={(e) => updatePricingTier(index, { price: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Token</label>
              <input
                type="text"
                value={tier.tokens}
                onChange={(e) => updatePricingTier(index, { tokens: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Text Button</label>
              <input
                type="text"
                value={tier.ctaText}
                onChange={(e) => updatePricingTier(index, { ctaText: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
            <textarea
              value={tier.description}
              onChange={(e) => updatePricingTier(index, { description: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={2}
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderTestimonialsSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Testimonials</h3>
      
      {contentData.testimonials.map((testimonial, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
          <h4 className="font-medium text-gray-900">Testimonial {index + 1}</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
              <input
                type="text"
                value={testimonial.name}
                onChange={(e) => updateTestimonial(index, { name: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role/Jabatan</label>
              <input
                type="text"
                value={testimonial.role}
                onChange={(e) => updateTestimonial(index, { role: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Testimonial</label>
            <textarea
              value={testimonial.content}
              onChange={(e) => updateTestimonial(index, { content: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
            <input
              type="number"
              min="1"
              max="5"
              value={testimonial.rating}
              onChange={(e) => updateTestimonial(index, { rating: parseInt(e.target.value) })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderContactSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp Number</label>
        <input
          type="text"
          value={contentData.whatsappNumber}
          onChange={(e) => updateContent('whatsappNumber', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="628123456789"
        />
        <p className="text-sm text-gray-500 mt-1">Format: 628123456789 (tanpa tanda +)</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp Default Message</label>
        <textarea
          value={contentData.whatsappMessage}
          onChange={(e) => updateContent('whatsappMessage', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
        />
      </div>
    </div>
  );

  const renderLogoSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Logo Management</h3>

      {/* Current Logo Preview */}
      <div className="border border-gray-200 rounded-lg p-6">
        <h4 className="font-medium text-gray-900 mb-4">Current Logo</h4>
        <div className="flex items-center space-x-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <Logo width={120} height={36} />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-2">
              Logo Type: <span className="font-medium">{contentData.logoType === 'custom' ? 'Custom Upload' : 'Default SVG'}</span>
            </p>
            {contentData.logoType === 'custom' && (
              <button
                onClick={() => updateContent('logoType', 'default')}
                className="text-sm text-red-600 hover:text-red-700 transition-colors"
              >
                Reset to Default Logo
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Upload New Logo */}
      <div className="border border-gray-200 rounded-lg p-6">
        <h4 className="font-medium text-gray-900 mb-4">Upload New Logo</h4>

        <div className="space-y-4">
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/svg+xml,image/webp"
              onChange={handleLogoUpload}
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={logoUploading}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span>{logoUploading ? 'Uploading...' : 'Choose Logo File'}</span>
            </button>
          </div>

          <div className="text-sm text-gray-500">
            <p>Supported formats: PNG, JPG, SVG, WebP</p>
            <p>Maximum file size: 5MB</p>
            <p>Recommended size: 200x60 pixels or similar ratio</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCtaSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">CTA Buttons Management</h3>
      <p className="text-sm text-gray-600">Manage all call-to-action button texts across the website.</p>

      {/* Main CTA Buttons */}
      <div className="border border-gray-200 rounded-lg p-6 space-y-4">
        <h4 className="font-medium text-gray-900">Main CTA Buttons</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hero Section Button</label>
            <input
              type="text"
              value={contentData.ctaButtons.heroButton}
              onChange={(e) => updateCtaButton('heroButton', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Coba Demo Sekarang"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Header Button</label>
            <input
              type="text"
              value={contentData.ctaButtons.headerButton}
              onChange={(e) => updateCtaButton('headerButton', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Masuk App"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">How It Works Button</label>
            <input
              type="text"
              value={contentData.ctaButtons.howItWorksButton}
              onChange={(e) => updateCtaButton('howItWorksButton', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Mulai Setup Sekarang"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Final CTA Button</label>
            <input
              type="text"
              value={contentData.ctaButtons.finalCtaButton}
              onChange={(e) => updateCtaButton('finalCtaButton', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Mulai Otomatisasi WhatsApp Saya Sekarang!"
            />
          </div>
        </div>
      </div>

      {/* Footer Social Buttons */}
      <div className="border border-gray-200 rounded-lg p-6 space-y-4">
        <h4 className="font-medium text-gray-900">Footer Social Button Labels</h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp Button</label>
            <input
              type="text"
              value={contentData.ctaButtons.footerButtons.whatsapp}
              onChange={(e) => updateCtaButton('footerButtons.whatsapp', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Chat via WhatsApp"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Instagram Button</label>
            <input
              type="text"
              value={contentData.ctaButtons.footerButtons.instagram}
              onChange={(e) => updateCtaButton('footerButtons.instagram', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Follow Instagram"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Button</label>
            <input
              type="text"
              value={contentData.ctaButtons.footerButtons.email}
              onChange={(e) => updateCtaButton('footerButtons.email', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Send Email"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderPagesSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Manajemen Halaman Statis</h3>
      <p className="text-sm text-gray-600">
        Kelola konten halaman seperti Privacy Policy, Terms & Conditions, dan Support.
        Klik tombol di bawah untuk membuka editor halaman yang lebih lengkap.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(contentData.staticPages).map((page) => (
          <div key={page.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-3">
              <FileText className="w-6 h-6 text-blue-600 mt-1" />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-2">{page.name}</h4>
                <p className="text-sm text-gray-600 mb-3">
                  URL: <span className="font-mono bg-gray-100 px-1 rounded">{page.slug}</span>
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  Terakhir diubah: {new Date(page.lastModified).toLocaleDateString('id-ID')}
                </p>
                <a
                  href={`/admin/pages/${page.id}`}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  <FileText className="w-4 h-4" />
                  <span>Edit Halaman</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-700">
          <strong>Info:</strong> Untuk editor yang lebih lengkap dengan Rich Text Editor,
          klik tombol "Edit Halaman" pada masing-masing halaman di atas.
        </p>
      </div>
    </div>
  );

  const renderFeaturesSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Features</h3>

      {contentData.features.map((feature, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
          <h4 className="font-medium text-gray-900">Feature {index + 1}</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Icon Name</label>
              <input
                type="text"
                value={feature.icon}
                onChange={(e) => updateFeature(index, { icon: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Wallet, Rocket, Settings"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={feature.title}
                onChange={(e) => updateFeature(index, { title: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={feature.description}
              onChange={(e) => updateFeature(index, { description: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderSettingsSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Company Settings</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
        <input
          type="text"
          value={contentData.companyName}
          onChange={(e) => updateContent('companyName', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Company Tagline</label>
        <input
          type="text"
          value={contentData.companyTagline}
          onChange={(e) => updateContent('companyTagline', e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Logo width={120} height={36} />
              <div className="border-l border-gray-300 pl-4">
                <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {activeTab === 'hero' && renderHeroSection()}
              {activeTab === 'logo' && renderLogoSection()}
              {activeTab === 'cta' && renderCtaSection()}
              {activeTab === 'pages' && renderPagesSection()}
              {activeTab === 'pricing' && renderPricingSection()}
              {activeTab === 'testimonials' && renderTestimonialsSection()}
              {activeTab === 'contact' && renderContactSection()}
              {activeTab === 'features' && renderFeaturesSection()}
              {activeTab === 'settings' && renderSettingsSection()}
              
              {/* Save Button */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handleSave}
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
                    {saveStatus === 'saved' && 'Tersimpan!'}
                    {saveStatus === 'error' && 'Gagal Menyimpan'}
                    {saveStatus === 'idle' && 'Simpan Perubahan'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
