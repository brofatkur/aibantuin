import React, { createContext, useContext, useState, useEffect } from 'react';

interface ContentData {
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroButtonText: string;
  heroTagline: string;

  // Pricing
  pricingTiers: {
    name: string;
    price: string;
    tokens: string;
    description: string;
    ctaText: string;
  }[];

  // Testimonials
  testimonials: {
    name: string;
    role: string;
    content: string;
    rating: number;
  }[];

  // Contact
  whatsappNumber: string;
  whatsappMessage: string;

  // Company Info
  companyName: string;
  companyTagline: string;

  // Features
  features: {
    icon: string;
    title: string;
    description: string;
  }[];

  // Logo
  logoUrl: string;
  logoType: 'default' | 'custom';

  // CTA Buttons
  ctaButtons: {
    heroButton: string;
    howItWorksButton: string;
    finalCtaButton: string;
    headerButton: string;
    footerButtons: {
      whatsapp: string;
      instagram: string;
      email: string;
    };
  };

  // Static Pages
  staticPages: {
    [key: string]: {
      id: string;
      name: string;
      slug: string;
      content: string;
      lastModified: string;
    };
  };
}

interface AdminContextType {
  isAuthenticated: boolean;
  contentData: ContentData;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  updateContent: (section: keyof ContentData, data: any) => void;
  updatePricingTier: (index: number, data: any) => void;
  updateTestimonial: (index: number, data: any) => void;
  updateFeature: (index: number, data: any) => void;
  uploadLogo: (file: File) => Promise<string>;
  saveAllChanges: () => Promise<boolean>;
  updateCtaButton: (buttonKey: string, text: string) => void;
  updatePageContent: (pageId: string, content: string) => void;
  getPageBySlug: (slug: string) => any;
}

const defaultContentData: ContentData = {
  heroTitle: "AI Bantuin: Asisten WhatsApp Anda yang Balas Chat Pelanggan 24/7",
  heroSubtitle: "Tingkatkan penjualan dan kepuasan pelanggan dengan balasan otomatis yang cerdas, detail, dan konsisten. Didukung AI Gemini dari Google.",
  heroButtonText: "Coba Demo Sekarang",
  heroTagline: "Cepat Balas, Hemat Biaya, Tanpa Ribet.",
  
  pricingTiers: [
    {
      name: 'SOLOPRENEUR',
      price: 'Rp 99.000',
      tokens: '200.000 Token',
      description: 'Owner bisnis solo atau yang baru memulai.',
      ctaText: 'Pilih Paket Solo'
    },
    {
      name: 'BISNIS PRO',
      price: 'Rp 249.000',
      tokens: '600.000 Token',
      description: 'Bisnis online dan offline yang sedang berkembang.',
      ctaText: 'Pilih Paket Bisnis'
    },
    {
      name: 'SCALE-UP',
      price: 'Rp 399.000',
      tokens: '1 Juta Token',
      description: 'Tim atau bisnis dengan volume chat tinggi.',
      ctaText: 'Pilih Paket Scale-Up'
    }
  ],
  
  testimonials: [
    {
      name: "Sarah Wijaya",
      role: "Owner Toko Online Fashion",
      content: "AI Bantuin benar-benar mengubah cara saya melayani pelanggan. Sekarang chat bisa dibalas 24/7 tanpa saya harus begadang!",
      rating: 5
    },
    {
      name: "Budi Santoso",
      role: "Pemilik Warung Makan",
      content: "Pesanan jadi lebih teratur, pelanggan puas karena cepat direspon. Omzet naik 40% sejak pakai AI Bantuin.",
      rating: 5
    },
    {
      name: "Maya Chen",
      role: "Freelancer Digital Marketing",
      content: "Klien saya impressed dengan response time yang cepat. AI Bantuin membantu saya terlihat lebih profesional.",
      rating: 5
    }
  ],
  
  whatsappNumber: "6281234567890",
  whatsappMessage: "Halo! Saya tertarik dengan AI Bantuin. Bisa minta info lebih lanjut?",
  
  companyName: "AI Bantuin",
  companyTagline: "Cepat Balas, Hemat Biaya, Tanpa Ribet.",
  
  features: [
    {
      icon: 'Wallet',
      title: 'Harga Terjangkau',
      description: 'Mulai dari Rp 99 ribu/bulan. Hemat biaya gaji CS hingga jutaan rupiah.'
    },
    {
      icon: 'Rocket',
      title: 'Setting Cepat & Mudah',
      description: 'Tanpa coding, tanpa ribet. Cukup scan QR, chatbot langsung aktif di nomor WA Anda.'
    },
    {
      icon: 'Settings',
      title: 'Fleksibel & Terkontrol',
      description: 'Anda punya kendali penuh. Pilih siapa yang dijawab oleh AI (semua chat, grup tertentu, atau nomor personal saja).'
    },
    {
      icon: 'Clock',
      title: 'Jawaban Otomatis 24/7',
      description: 'Layani pelanggan bahkan saat Anda tidur. Jawaban konsisten, detail, dan tidak pernah lelah.'
    }
  ],

  logoUrl: '',
  logoType: 'default',

  ctaButtons: {
    heroButton: 'Coba Demo Sekarang',
    howItWorksButton: 'Mulai Setup Sekarang',
    finalCtaButton: 'Mulai Otomatisasi WhatsApp Saya Sekarang!',
    headerButton: 'Masuk App',
    footerButtons: {
      whatsapp: 'Chat via WhatsApp',
      instagram: 'Follow Instagram',
      email: 'Send Email'
    }
  },

  staticPages: {
    'privacy-policy': {
      id: 'privacy-policy',
      name: 'Privacy Policy',
      slug: '/privacy-policy',
      content: `<h1>Kebijakan Privasi (Privacy Policy)</h1>
<p><strong>Tanggal Efektif:</strong> 8 Agustus 2025</p>
<p>Selamat datang di AI Bantuin ("kami"). Kami berkomitmen untuk melindungi privasi data Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, melindungi, dan membagikan informasi Anda saat Anda menggunakan layanan chatbot WhatsApp kami ("Layanan").</p>

<h2>1. Informasi yang Kami Kumpulkan</h2>
<ul>
<li><strong>Informasi Akun:</strong> Nama, alamat email, dan nomor telepon yang Anda gunakan saat mendaftar.</li>
<li><strong>Nomor WhatsApp:</strong> Nomor telepon WhatsApp yang Anda hubungkan ke Layanan kami.</li>
<li><strong>Data Percakapan:</strong> Konten percakapan antara pengguna akhir Anda dan chatbot AI kami.</li>
<li><strong>Data Pelatihan AI:</strong> Dokumen, FAQ, atau informasi lain yang Anda unggah untuk melatih AI.</li>
<li><strong>Data Teknis:</strong> Informasi penggunaan, alamat IP, dan data log saat Anda berinteraksi dengan dashboard admin kami.</li>
</ul>

<h2>2. Bagaimana Kami Menggunakan Informasi Anda</h2>
<ul>
<li>Untuk menyediakan, mengoperasikan, dan memelihara Layanan kami.</li>
<li>Untuk memproses pembayaran dan mengelola langganan Anda.</li>
<li>Untuk meningkatkan dan mempersonalisasi Layanan, termasuk melatih model AI kami.</li>
<li>Untuk memberikan dukungan pelanggan dan menjawab pertanyaan Anda.</li>
</ul>

<h2>3. Keamanan Data</h2>
<p>Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang wajar untuk melindungi informasi Anda dari akses, pengungkapan, perubahan, atau penghancuran yang tidak sah.</p>

<h2>4. Hubungi Kami</h2>
<p>Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami di support@aibantuin.com.</p>`,
      lastModified: new Date().toISOString()
    },
    'terms-conditions': {
      id: 'terms-conditions',
      name: 'Terms & Conditions',
      slug: '/terms-conditions',
      content: `<h1>Syarat & Ketentuan (Terms & Conditions)</h1>
<p><strong>Tanggal Efektif:</strong> 8 Agustus 2025</p>
<p>Harap baca Syarat & Ketentuan ("Syarat") ini dengan saksama sebelum menggunakan layanan AI Bantuin ("Layanan").</p>

<h2>1. Penerimaan Syarat</h2>
<p>Dengan mengakses atau menggunakan Layanan, Anda setuju untuk terikat oleh Syarat ini.</p>

<h2>2. Deskripsi Layanan</h2>
<p>AI Bantuin menyediakan platform chatbot AI untuk WhatsApp yang membantu pengguna mengotomatiskan balasan untuk tujuan bisnis dan pribadi.</p>

<h2>3. Akun Pengguna</h2>
<p>Anda bertanggung jawab untuk menjaga kerahasiaan akun dan kata sandi Anda.</p>

<h2>4. Penggunaan yang Dilarang</h2>
<ul>
<li>Mengirim spam atau pesan yang tidak diminta dalam volume besar.</li>
<li>Terlibat dalam aktivitas ilegal, penipuan, atau berbahaya.</li>
<li>Mencoba merekayasa balik (reverse-engineer) atau membongkar bagian mana pun dari Layanan kami.</li>
</ul>

<h2>5. Pembayaran dan Langganan</h2>
<p>Layanan ditagih berdasarkan langganan bulanan. Pembayaran jatuh tempo pada awal setiap periode langganan.</p>

<h2>6. Hubungi Kami</h2>
<p>Jika Anda memiliki pertanyaan tentang Syarat ini, silakan hubungi kami di support@aibantuin.com.</p>`,
      lastModified: new Date().toISOString()
    },
    'support': {
      id: 'support',
      name: 'Support',
      slug: '/support',
      content: `<h1>Pusat Dukungan Pelanggan</h1>
<p>Selamat Datang di Pusat Dukungan AI Bantuin!</p>
<p>Kami siap membantu Anda memaksimalkan penggunaan platform kami. Jika Anda mengalami kendala atau memiliki pertanyaan, jangan ragu untuk menghubungi kami melalui saluran di bawah ini.</p>

<h2>Cara Menghubungi Kami:</h2>

<h3>Chat WhatsApp (Respons Cepat):</h3>
<p><a href="https://wa.me/6285731704175" target="_blank">Klik di sini untuk memulai chat dengan tim support kami</a></p>
<p><strong>Jam Layanan Aktif:</strong> Senin - Jumat, 09:00 - 17:00 WITA.</p>

<h3>Email (Untuk Pertanyaan Teknis):</h3>
<p>Kirimkan email ke: <a href="mailto:support@aibantuin.com">support@aibantuin.com</a></p>
<p>Kami berusaha menjawab semua email dalam waktu 1x24 jam kerja.</p>

<h2>Pertanyaan yang Sering Diajukan (FAQ):</h2>

<h3>T: Bagaimana cara menyambungkan ulang WhatsApp saya jika terputus?</h3>
<p><strong>J:</strong> Buka dashboard admin Anda, masuk ke menu "Perangkat", hapus perangkat lama, lalu klik "Hubungkan Perangkat Baru" dan pindai ulang kode QR menggunakan aplikasi WhatsApp Anda.</p>

<h3>T: Apa yang harus dilakukan jika AI tidak menjawab sesuai keinginan?</h3>
<p><strong>J:</strong> Coba perbaiki atau sederhanakan instruksi yang Anda berikan pada AI di dashboard. Pastikan data yang Anda unggah (jika ada) jelas dan relevan.</p>

<h3>T: Bagaimana cara kerja penghitungan token?</h3>
<p><strong>J:</strong> Token adalah unit yang digunakan untuk mengukur panjang teks. Sekitar 1000 token setara dengan 750 kata, baik itu dari pertanyaan pengguna maupun jawaban AI.</p>`,
      lastModified: new Date().toISOString()
    }
  }
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [contentData, setContentData] = useState<ContentData>(defaultContentData);
  const [updateTrigger, setUpdateTrigger] = useState(0);

  // Load content from localStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem('adminContentData');
    if (savedContent) {
      setContentData(JSON.parse(savedContent));
    }
    
    const savedAuth = localStorage.getItem('adminAuthenticated');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Save content to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('adminContentData', JSON.stringify(contentData));
  }, [contentData]);

  const login = (username: string, password: string): boolean => {
    // Simple authentication - in production, this should be more secure
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuthenticated', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuthenticated');
  };

  const updateContent = (section: keyof ContentData, data: any) => {
    setContentData(prev => {
      const newData = {
        ...prev,
        [section]: data
      };
      // Force re-render by updating trigger
      setUpdateTrigger(t => t + 1);
      return newData;
    });
  };

  const updatePricingTier = (index: number, data: any) => {
    setContentData(prev => {
      const newData = {
        ...prev,
        pricingTiers: prev.pricingTiers.map((tier, i) =>
          i === index ? { ...tier, ...data } : tier
        )
      };
      setUpdateTrigger(t => t + 1);
      return newData;
    });
  };

  const updateTestimonial = (index: number, data: any) => {
    setContentData(prev => {
      const newData = {
        ...prev,
        testimonials: prev.testimonials.map((testimonial, i) =>
          i === index ? { ...testimonial, ...data } : testimonial
        )
      };
      setUpdateTrigger(t => t + 1);
      return newData;
    });
  };

  const updateFeature = (index: number, data: any) => {
    setContentData(prev => {
      const newData = {
        ...prev,
        features: prev.features.map((feature, i) =>
          i === index ? { ...feature, ...data } : feature
        )
      };
      setUpdateTrigger(t => t + 1);
      return newData;
    });
  };

  const uploadLogo = async (file: File): Promise<string> => {
    try {
      // Create a data URL for the uploaded file
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onload = (e) => {
          const dataUrl = e.target?.result as string;
          setContentData(prev => {
            const newData = {
              ...prev,
              logoUrl: dataUrl,
              logoType: 'custom' as const
            };
            setUpdateTrigger(t => t + 1);
            return newData;
          });
          resolve(dataUrl);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    } catch (error) {
      console.error('Error uploading logo:', error);
      throw error;
    }
  };

  const saveAllChanges = async (): Promise<boolean> => {
    try {
      // Force save to localStorage
      localStorage.setItem('adminContentData', JSON.stringify(contentData));

      // Trigger a custom event to notify components of the update
      window.dispatchEvent(new CustomEvent('adminContentUpdated', {
        detail: contentData
      }));

      return true;
    } catch (error) {
      console.error('Error saving changes:', error);
      return false;
    }
  };

  const updateCtaButton = (buttonKey: string, text: string) => {
    setContentData(prev => {
      const keys = buttonKey.split('.');
      let newData = { ...prev };

      if (keys.length === 1) {
        // Simple key like 'heroButton'
        newData = {
          ...prev,
          ctaButtons: {
            ...prev.ctaButtons,
            [keys[0]]: text
          }
        };
      } else if (keys.length === 2) {
        // Nested key like 'footerButtons.whatsapp'
        newData = {
          ...prev,
          ctaButtons: {
            ...prev.ctaButtons,
            [keys[0]]: {
              ...prev.ctaButtons[keys[0] as keyof typeof prev.ctaButtons],
              [keys[1]]: text
            }
          }
        };
      }

      setUpdateTrigger(t => t + 1);
      return newData;
    });
  };

  const updatePageContent = (pageId: string, content: string) => {
    setContentData(prev => {
      const newData = {
        ...prev,
        staticPages: {
          ...prev.staticPages,
          [pageId]: {
            ...prev.staticPages[pageId],
            content,
            lastModified: new Date().toISOString()
          }
        }
      };
      setUpdateTrigger(t => t + 1);
      return newData;
    });
  };

  const getPageBySlug = (slug: string) => {
    return Object.values(contentData.staticPages).find(page => page.slug === slug);
  };

  return (
    <AdminContext.Provider value={{
      isAuthenticated,
      contentData,
      login,
      logout,
      updateContent,
      updatePricingTier,
      updateTestimonial,
      updateFeature,
      uploadLogo,
      saveAllChanges,
      updateCtaButton,
      updatePageContent,
      getPageBySlug
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export default AdminContext;
