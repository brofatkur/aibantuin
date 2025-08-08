import { Feature, CustomerSegment, PricingTier, Testimonial, Step } from '../types';

export const features: Feature[] = [
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
];

export const customerSegments: CustomerSegment[] = [
  {
    id: 'online',
    title: 'Pebisnis Online',
    description: 'Fashion, Kosmetik, F&B',
    visual: '"Kak, warna biru ready? Bisa kirim hari ini?"',
    points: [
      'Jawab otomatis ketersediaan stok',
      'Detail produk dan spesifikasi',
      'Informasi ongkos kirim',
      'Proses pesanan otomatis'
    ]
  },
  {
    id: 'offline',
    title: 'Bisnis Jasa & Offline',
    description: 'Klinik, Bengkel, Toko',
    visual: '"Sis, mau booking servis untuk besok jam 2 siang bisa?"',
    points: [
      'Bantuan reservasi jadwal',
      'Bagikan daftar harga layanan',
      'Berikan alamat dan lokasi',
      'Informasi jam operasional'
    ]
  },
  {
    id: 'solo',
    title: 'Owner Bisnis Solo',
    description: 'Solopreneur',
    visual: 'Fokus pada strategi, biarkan AI jadi CS pertama Anda',
    points: [
      'Tangani pertanyaan rutin otomatis',
      'Fokus pada pengembangan bisnis',
      'Tidak perlu hiring CS tambahan',
      'Konsistensi pelayanan 24/7'
    ]
  }
];

export const pricingTiers: PricingTier[] = [
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
    popular: true,
    ctaText: 'Pilih Paket Bisnis'
  },
  {
    name: 'SCALE-UP',
    price: 'Rp 399.000',
    tokens: '1 Juta Token',
    description: 'Tim atau bisnis dengan volume chat tinggi.',
    ctaText: 'Pilih Paket Scale-Up'
  }
];

export const testimonials: Testimonial[] = [
  {
    quote: "Omset naik karena semua chat fast response, bahkan di tengah malam. Wajib punya buat owner toko online!",
    author: "Siska Amelia",
    role: "Owner Fashion Store"
  },
  {
    quote: "Sangat membantu untuk booking jadwal di klinik kami. Pasien jadi lebih mudah dapat info tanpa harus menunggu kami balas manual.",
    author: "Dr. Budi Santoso",
    role: "Pemilik Klinik Pratama"
  }
];

export const steps: Step[] = [
  {
    number: 1,
    title: 'Pilih Paket',
    description: 'Daftar dan pilih paket token sesuai kebutuhan Anda.'
  },
  {
    number: 2,
    title: 'Scan QR Code',
    description: 'Hubungkan nomor WhatsApp Anda (pribadi/bisnis) dalam hitungan detik.'
  },
  {
    number: 3,
    title: 'Mulai Otomatisasi',
    description: 'Atur instruksi dasar dan biarkan AI Bantuin mulai bekerja untuk Anda!'
  }
];