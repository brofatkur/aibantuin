import React, { createContext, useContext } from 'react';

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
    originalPrice?: string;
    description: string;
    features: string[];
    buttonText: string;
    popular?: boolean;
  }[];
  
  // Testimonials
  testimonials: {
    name: string;
    role: string;
    content: string;
    rating: number;
    avatar: string;
  }[];
  
  // Features
  features: {
    title: string;
    description: string;
  }[];
  
  // Logo
  logoUrl: string;
  
  // CTA Buttons
  ctaButtons: {
    heroButton: string;
    howItWorksButton: string;
    finalCtaButton: string;
    headerButton: string;
  };
  
  // Contact
  whatsappNumber: string;
  whatsappMessage: string;
}

interface ContentContextType {
  contentData: ContentData;
}

const contentData: ContentData = {
  heroTitle: "AI Bantuin: Asisten WhatsApp Anda yang Balas Chat Pelanggan 24/7",
  heroSubtitle: "Tingkatkan penjualan dan kepuasan pelanggan dengan balasan otomatis yang cerdas, detail, dan konsisten. Didukung AI Gemini dari Google.",
  heroButtonText: "Coba Demo Sekarang",
  heroTagline: "Balas Cepat, Hemat & Gak Ribet",
  
  pricingTiers: [
    {
      name: 'STARTER',
      price: 'Rp 99.000',
      originalPrice: 'Rp 1.100.000',
      description: 'Cocok untuk bisnis kecil dan freelancer',
      features: [
        '200.000 token per bulan',
        '10.000 karakter maksimal',
        '500 kilobytes knowledge size',
        'Integrasi WhatsApp',
        'AI Response otomatis',
        'Support email'
      ],
      buttonText: 'Coba Sekarang',
      popular: false
    },
    {
      name: 'BISNIS PRO',
      price: 'Rp 249.000',
      originalPrice: 'Rp 2.500.000',
      description: 'Ideal untuk bisnis berkembang',
      features: [
        '600.000 token per bulan',
        '30.000 karakter maksimal',
        '5 MB knowledge size',
        'Integrasi WhatsApp',
        'AI Response otomatis',
        'Google Sheets integration',
        'Priority support'
      ],
      buttonText: 'Coba Sekarang',
      popular: true
    },
    {
      name: 'SCALE UP',
      price: 'Rp 399.000',
      originalPrice: 'Rp 4.000.000',
      description: 'Untuk bisnis besar dengan volume tinggi',
      features: [
        '1.000.000 token per bulan',
        '50.000 karakter maksimal',
        '10 MB knowledge size',
        'Unlimited WhatsApp integration',
        'Advanced AI features',
        'Custom integrations',
        'Dedicated support'
      ],
      buttonText: 'Coba Sekarang',
      popular: false
    }
  ],
  
  testimonials: [
    {
      name: 'Sarah Wijaya',
      role: 'Owner Toko Online Fashion',
      content: 'AI Bantuin mengubah cara saya melayani pelanggan. Sekarang chat WhatsApp saya dibalas 24/7 dengan jawaban yang konsisten dan profesional.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Budi Santoso',
      role: 'Founder Startup Edukasi',
      content: 'Luar biasa! Conversion rate WhatsApp saya naik 40% sejak pakai AI Bantuin. Pelanggan merasa lebih diperhatikan.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Maya Putri',
      role: 'Digital Marketing Agency',
      content: 'Klien-klien saya sangat puas dengan response time yang cepat. AI Bantuin membantu agency saya memberikan service yang lebih baik.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    }
  ],
  
  features: [
    {
      title: 'AI Response Cerdas',
      description: 'Powered by Google Gemini AI yang memberikan jawaban kontekstual dan natural seperti manusia.'
    },
    {
      title: 'Integrasi WhatsApp',
      description: 'Setup mudah dengan WhatsApp. Tidak perlu aplikasi tambahan.'
    },
    {
      title: 'Google Sheets Sync',
      description: 'Sinkronisasi otomatis dengan Google Sheets untuk data produk dan FAQ yang selalu update.'
    },
    {
      title: 'Custom Training',
      description: 'Latih AI sesuai dengan tone dan style bisnis Anda untuk hasil yang lebih personal.'
    },
    {
      title: 'Jawaban Otomatis 24/7',
      description: 'Layani pelanggan bahkan saat Anda tidur. Jawaban konsisten, detail, dan tidak pernah lelah.'
    },
    {
      title: 'Balas dalam Hitungan Detik',
      description: 'Response time super cepat 24 jam non-stop. Pelanggan tidak perlu menunggu lama.'
    }
  ],
  
  logoUrl: '/aibantuin-logo-gelap.png',
  
  ctaButtons: {
    heroButton: 'Coba Demo Sekarang',
    howItWorksButton: 'Mulai Setup Sekarang',
    finalCtaButton: 'Mulai Otomatisasi WhatsApp Saya Sekarang!',
    headerButton: 'Masuk App'
  },
  
  whatsappNumber: '6285731704175',
  whatsappMessage: 'Halo! Saya tertarik dengan AI Bantuin untuk otomatisasi WhatsApp bisnis saya. Bisa dijelaskan lebih detail?'
};

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ContentContext.Provider value={{ contentData }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

// For backward compatibility
export const useAdmin = useContent;
export const AdminProvider = ContentProvider;
