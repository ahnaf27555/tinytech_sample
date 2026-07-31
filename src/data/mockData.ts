import { Product, Category, DeskSetup, SwitchSound, Brand } from '../types';

export const MOCK_CATEGORIES: Category[] = [
  {
    id: 'keyboards',
    name: 'Mechanical Keyboards',
    iconName: 'Keyboard',
    count: 14,
    description: 'Custom gasket-mount keyboards engineered for buttery smooth typing & deep sound signatures.'
  },
  {
    id: 'keycaps',
    name: 'Artisan Keycaps',
    iconName: 'Sparkles',
    count: 32,
    description: 'Hand-sculpted, hand-painted resin keycaps and themed PBT keycap sets.'
  },
  {
    id: 'audio',
    name: 'Audio & Headphones',
    iconName: 'Headphones',
    count: 18,
    description: 'Studio-grade open-back headphones, coiled cables, and desktop USB condenser mics.'
  },
  {
    id: 'mice',
    name: 'Ergo Mice & Trackpads',
    iconName: 'Mouse',
    count: 11,
    description: 'Lightweight honeycomb wireless mice and precision desktop trackballs.'
  },
  {
    id: 'accessories',
    name: 'Desk Mats & Gadgets',
    iconName: 'Gamepad2',
    count: 24,
    description: 'Custom doodle felt desk mats, aviator coiled cables, keycap pullers, and cable biters.'
  }
];

export const MOCK_BRANDS: Brand[] = [
  // Keyboards Brands
  { id: 'b-tinytech', name: 'Tinytech Studio', category: 'keyboards', logoIcon: '⌨️', tagline: 'Gasket-Mount & Acoustic Engineering', productCount: 6 },
  { id: 'b-wuque', name: 'Wuque Studio', category: 'keyboards', logoIcon: '🔮', tagline: 'Premium CNC Machined Keebs', productCount: 4 },
  { id: 'b-akko', name: 'Akko Crafts', category: 'keyboards', logoIcon: '🌸', tagline: 'Colorful Themed Keyboards', productCount: 5 },
  { id: 'b-keychron', name: 'Keychron Artisans', category: 'keyboards', logoIcon: '⚡', tagline: 'Wireless Productivity & Gaming', productCount: 4 },

  // Keycaps Brands
  { id: 'b-doodlecraft', name: 'DoodleCraft Resin', category: 'keycaps', logoIcon: '🎨', tagline: 'Hand-Sculpted Character Keycaps', productCount: 12 },
  { id: 'b-gmk', name: 'GMK Custom', category: 'keycaps', logoIcon: '💎', tagline: 'Doubleshot Premium PBT Sets', productCount: 8 },
  { id: 'b-drop', name: 'Drop x Mito', category: 'keycaps', logoIcon: '💧', tagline: 'Cyberpunk & Novelty Profiles', productCount: 6 },

  // Audio Brands
  { id: 'b-coiled', name: 'Coiled Audio Lab', category: 'audio', logoIcon: '🎧', tagline: 'Planar Magnetic & Lofi Soundstage', productCount: 7 },
  { id: 'b-audio-technica', name: 'Audio-Technica Studio', category: 'audio', logoIcon: '📻', tagline: 'Professional Studio Monitors', productCount: 5 },
  { id: 'b-fiio', name: 'FiiO Sound Lab', category: 'audio', logoIcon: '🔊', tagline: 'High-Res DACs & Headphones', productCount: 4 },

  // Mice Brands
  { id: 'b-tinyergo', name: 'Tinytech Ergo', category: 'mice', logoIcon: '🐭', tagline: 'Honeycomb Ultra-Lightweight Mice', productCount: 5 },
  { id: 'b-pulsar', name: 'Pulsar Superglide', category: 'mice', logoIcon: '🌀', tagline: 'Glass Skates & High Precision', productCount: 4 },
  { id: 'b-lamzu', name: 'Lamzu Maya', category: 'mice', logoIcon: '⚡', tagline: 'Symmetrical Competitive Wireless', productCount: 3 },

  // Accessories Brands
  { id: 'b-doodlemats', name: 'DoodleMats Co.', category: 'accessories', logoIcon: '🖼️', tagline: 'Stitching-Edge Desk Pads', productCount: 9 },
  { id: 'b-cablelab', name: 'Custom Cable Lab', category: 'accessories', logoIcon: '➰', tagline: 'Aviator Coiled Sleeved Cables', productCount: 8 },
  { id: 'b-lubestation', name: 'Switch Lube Station', category: 'accessories', logoIcon: '🪛', tagline: 'Modding Tools & Switch Openers', productCount: 6 }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'TinyDoodle Artisan "Escape Cat" Keycap',
    category: 'keycaps',
    brand: 'DoodleCraft Resin',
    price: 34.99,
    originalPrice: 42.00,
    rating: 4.9,
    reviewsCount: 128,
    badge: 'Artisan',
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80',
    doodleIcon: '🐱',
    description: 'Hand-painted resin artisan keycap featuring a sleepy cat tucked into a tiny cardboard box. Fits standard MX switches.',
    story: 'Sculpted in small batches by artisan maker Maya in Oregon. Each keycap takes 3 hours of meticulous hand-brushing.',
    specs: {
      'Profile': 'OEM R4 / ESC Key',
      'Material': 'UV-cured Resin & Hand Acrylic',
      'Compatibility': 'Cherry MX, Gateron, Kailh, Outemu',
      'Stem': 'Standard + Cross'
    },
    tags: ['Artisan', 'Handmade', 'Resin', 'Cat', 'R4'],
    soundProfile: 'Tactile',
    colorVariants: [
      { name: 'Chalk White', hex: '#FAF8F5' },
      { name: 'Midnight Charcoal', hex: '#2A2825' },
      { name: 'Honey Yellow', hex: '#E2B857' }
    ],
    inStock: true
  },
  {
    id: 'p2',
    name: 'Tinytech Sketch-65% Gasket Keyboard Kit',
    category: 'keyboards',
    brand: 'Tinytech Studio',
    price: 149.00,
    originalPrice: 179.00,
    rating: 5.0,
    reviewsCount: 94,
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    doodleIcon: '⌨️',
    description: 'Tri-mode wireless (2.4Ghz/Bluetooth 5.1/USB-C) hot-swappable 65% keyboard with silicone gasket mount and doodle brass badge.',
    story: 'Engineered for ultimate marbly acoustic thock. Pre-lubed stabs and sound dampening foam layers included out of the box.',
    specs: {
      'Layout': '65% (68 Keys + Volume Knob)',
      'Mount Type': 'Poron Gasket Mount',
      'Connectivity': 'Bluetooth 5.1 / 2.4G / Type-C',
      'Plate': 'FR4 Flex-cut Plate',
      'Battery': '4000 mAh (Up to 200 hrs)'
    },
    tags: ['Hot-swap', 'Wireless', 'Gasket', '65%', 'RGB'],
    soundProfile: 'Linear',
    colorVariants: [
      { name: 'Doodle Milk White', hex: '#F4EFE6' },
      { name: 'Matte Obsidian', hex: '#1E1D1B' },
      { name: 'Sage Green', hex: '#A8BBA2' }
    ],
    inStock: true
  },
  {
    id: 'p3',
    name: 'Coiled Studio Audiophile Headphones (Doodle Edition)',
    category: 'audio',
    brand: 'Coiled Audio Lab',
    price: 189.99,
    originalPrice: 219.00,
    rating: 4.8,
    reviewsCount: 76,
    badge: 'Staff Pick',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    doodleIcon: '🎧',
    description: 'Open-back planar magnetic headphones with hand-stitched memory foam ear pads and coiled vintage audio cable.',
    story: 'Ultra-crisp soundstage tailored for listening to chill lofi beats, music production, or immersion in story games.',
    specs: {
      'Driver': '45mm Planar Magnetic',
      'Frequency Response': '15Hz - 28,000Hz',
      'Impedance': '32 Ohms (Easy to drive)',
      'Cable': 'Detachable 3.5mm Coiled Aviator'
    },
    tags: ['Planar', 'Open-back', 'High-Res', 'Coiled Cable'],
    colorVariants: [
      { name: 'Vintage Cream', hex: '#EFE8DA' },
      { name: 'Stealth Black', hex: '#181715' }
    ],
    inStock: true
  },
  {
    id: 'p4',
    name: 'TinyDoodle XXL Stitch-Edge Desk Mat (Grid & Doodles)',
    category: 'accessories',
    brand: 'DoodleMats Co.',
    price: 29.50,
    rating: 4.9,
    reviewsCount: 210,
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b909?auto=format&fit=crop&w=800&q=80',
    doodleIcon: '🖼️',
    description: 'Heavy duty 4mm water-resistant desk pad with anti-fray stitched edges featuring custom black & white tech doodle illustrations.',
    specs: {
      'Dimensions': '900mm x 400mm x 4mm',
      'Material': 'Micro-woven Cloth & Natural Rubber Base',
      'Waterproof': 'Spill-resistant Nano Coating',
      'Edges': 'Precision High-Density Stitching'
    },
    tags: ['Desk Mat', 'Doodle Pattern', '90x40cm', 'Waterproof'],
    inStock: true
  },
  {
    id: 'p5',
    name: 'Tinytech Honeycomb Ergo Wireless Mouse',
    category: 'mice',
    brand: 'Tinytech Ergo',
    price: 58.00,
    originalPrice: 69.00,
    rating: 4.7,
    reviewsCount: 62,
    badge: 'New Arrival',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
    doodleIcon: '🐭',
    description: 'Ultra-lightweight 59g ergonomic wireless gaming mouse with optical switches and custom doodle PTFE skates.',
    specs: {
      'Weight': '59 grams',
      'Sensor': 'PAW3395 (26,000 DPI)',
      'Battery Life': '80 Hours per charge',
      'Polling Rate': '1000Hz / 4000Hz Dongle Compatible'
    },
    tags: ['Ultra-light', 'Wireless', '26K DPI', 'PTFE Skates'],
    colorVariants: [
      { name: 'Milk White', hex: '#F7F5F0' },
      { name: 'Chalk Black', hex: '#232220' }
    ],
    inStock: true
  },
  {
    id: 'p6',
    name: 'Artisan Retro Gameboy Keycap (Cast Bronze & Resin)',
    category: 'keycaps',
    brand: 'DoodleCraft Resin',
    price: 38.00,
    rating: 5.0,
    reviewsCount: 45,
    badge: 'Limited Edition',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    doodleIcon: '🎮',
    description: 'Nostalgic 90s handheld game console keycap with translucent resin screen that lets your keyboard backlight glow through!',
    specs: {
      'Profile': 'SA R1 Height',
      'Backlight Compatible': 'Yes (Glow-through Screen)',
      'Material': 'Resin & Metallic Powder Finish'
    },
    tags: ['Gameboy', 'Retro', 'Resin', 'RGB Glow'],
    inStock: true
  },
  {
    id: 'p7',
    name: 'Handcrafted Aviator Coiled Keyboard Cable (Doodle-Flex)',
    category: 'accessories',
    brand: 'Custom Cable Lab',
    price: 36.00,
    rating: 4.9,
    reviewsCount: 88,
    badge: 'Staff Pick',
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80',
    doodleIcon: '➰',
    description: 'Double-sleeved Paracord + Techflex coiled cable with GX16 heavy-duty 5-pin aviator connector. Keeps your desk setup sleek.',
    specs: {
      'Length': '6 inch Coil + 1.2m Straight Cable',
      'Connector': 'GX16 Chrome Aviator to USB-A / Type-C',
      'Sleeving': 'PET Techflex + Paracord 550'
    },
    tags: ['Coiled Cable', 'Aviator', 'Type-C', 'Custom Desk'],
    colorVariants: [
      { name: 'Monochrome Black & White', hex: '#1C1A17' },
      { name: 'Honey Butter', hex: '#E8CA65' },
      { name: 'Pastel Blue', hex: '#8BAAD0' }
    ],
    inStock: true
  },
  {
    id: 'p8',
    name: 'Tinytech "Creamy Peach" Linear Switches (35 Pack)',
    category: 'keyboards',
    brand: 'Tinytech Studio',
    price: 24.50,
    rating: 4.8,
    reviewsCount: 152,
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80',
    doodleIcon: '🍑',
    description: 'Factory pre-lubed 5-pin linear switches with POM stem and nylon housing. Delivers that coveted deep marbly acoustic "thock".',
    specs: {
      'Type': 'Linear 5-Pin',
      'Actuation Force': '45g',
      'Bottom Out': '53g',
      'Factory Lube': 'Krytox 205g0'
    },
    tags: ['Switches', 'Linear', 'Pre-lubed', 'Thocky'],
    soundProfile: 'Linear',
    inStock: true
  },
  {
    id: 'p9',
    name: 'Wuque Studio Zoom75 Anodized Aluminum Keyboard',
    category: 'keyboards',
    brand: 'Wuque Studio',
    price: 199.00,
    originalPrice: 229.00,
    rating: 4.9,
    reviewsCount: 84,
    badge: 'Limited Edition',
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80',
    doodleIcon: '🔮',
    description: 'Premium CNC milled 75% aluminum keyboard kit with programmable LCD screen and magnetic badge accent.',
    specs: {
      'Layout': '75% (81 Keys + OLED Screen)',
      'Mount Type': 'Spring Leaf Gasket',
      'Connectivity': 'Tri-mode Wireless',
      'Material': '6063 Anodized Aluminum'
    },
    tags: ['CNC Aluminum', '75%', 'LCD Screen', 'Custom'],
    soundProfile: 'Tactile',
    inStock: true
  },
  {
    id: 'p10',
    name: 'Akko Tokyo World Tour 87-Key Mechanical Keyboard',
    category: 'keyboards',
    brand: 'Akko Crafts',
    price: 119.50,
    rating: 4.7,
    reviewsCount: 112,
    badge: 'Staff Pick',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    doodleIcon: '🌸',
    description: 'Cherry blossom themed TKL keyboard with dye-sublimated PBT keycaps and pre-lubed Akko CS Jelly Pink switches.',
    specs: {
      'Layout': 'TKL 87-Key',
      'Keycaps': 'Dye-Sub PBT OEM Profile',
      'Switch': 'Akko CS Jelly Pink (45g Linear)'
    },
    tags: ['TKL', 'Sakura', 'Dye-sub PBT', 'Pink'],
    soundProfile: 'Linear',
    inStock: true
  },
  {
    id: 'p11',
    name: 'GMK CyberDoodle Doubleshot PBT Keycap Set',
    category: 'keycaps',
    brand: 'GMK Custom',
    price: 89.00,
    originalPrice: 110.00,
    rating: 4.9,
    reviewsCount: 78,
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    doodleIcon: '💎',
    description: 'Full 142-key Cherry profile doubleshot PBT keycap set featuring custom neon line-art doodles and ISO/ANSI compatibility.',
    specs: {
      'Profile': 'Cherry Profile',
      'Material': '1.5mm Thick Doubleshot PBT',
      'Keys Count': '142 Keys (Fits 60%, 65%, 75%, TKL, Full)'
    },
    tags: ['GMK', 'PBT', 'Doubleshot', 'Doodle Novelties'],
    inStock: true
  },
  {
    id: 'p12',
    name: 'Drop x Mito Artisan CyberBiter Keycap',
    category: 'keycaps',
    brand: 'Drop x Mito',
    price: 45.00,
    rating: 4.8,
    reviewsCount: 39,
    badge: 'Artisan',
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80',
    doodleIcon: '👾',
    description: 'Futuristic robot monster keycap cast in translucent neon resin. Designed in collaboration with Mito.',
    specs: {
      'Profile': 'SA R1',
      'Material': 'Multi-layer Resin',
      'Stem': 'Cherry MX'
    },
    tags: ['Drop', 'Mito', 'Cyberpunk', 'Artisan'],
    inStock: false
  },
  {
    id: 'p13',
    name: 'Audio-Technica ATH-M50x Lofi Studio Monitors',
    category: 'audio',
    brand: 'Audio-Technica Studio',
    price: 149.00,
    originalPrice: 169.00,
    rating: 4.9,
    reviewsCount: 340,
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    doodleIcon: '📻',
    description: 'Critically acclaimed closed-back studio monitoring headphones with collapsible earcups and pristine frequency balance.',
    specs: {
      'Driver': '45mm Large-Aperture',
      'Sensitivity': '99 dB',
      'Cable': 'Coiled & Straight Detachable Cables'
    },
    tags: ['Studio', 'Monitor', 'Closed-back', 'Bass'],
    inStock: true
  },
  {
    id: 'p14',
    name: 'Pulsar Superglide Wireless Gaming Mouse (White)',
    category: 'mice',
    brand: 'Pulsar Superglide',
    price: 89.00,
    rating: 4.8,
    reviewsCount: 91,
    badge: 'Staff Pick',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
    doodleIcon: '🌀',
    description: 'Ergonomic esports wireless mouse equipped with pre-installed super-smooth aluminosilicate glass mouse feet.',
    specs: {
      'Weight': '52 grams',
      'Sensor': 'PAW3395 26K DPI',
      'Feet': 'Aluminosilicate Glass Skates'
    },
    tags: ['Glass Skates', 'Pulsar', 'Ultra-light', 'Esports'],
    inStock: true
  },
  {
    id: 'p15',
    name: 'Switch Lube Station & Modding Toolkit',
    category: 'accessories',
    brand: 'Switch Lube Station',
    price: 28.00,
    rating: 4.9,
    reviewsCount: 165,
    badge: 'Staff Pick',
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80',
    doodleIcon: '🪛',
    description: 'Complete 36-switch acrylic lube station with Krytox 205g0 grease, switch opener, stem picker, and fine detail brushes.',
    specs: {
      'Station Capacity': '36 Switches + 36 Stems',
      'Includes': 'Krytox 205g0 (5g), Switch Opener, Stem Picker, Tweezers'
    },
    tags: ['Lube Station', 'Modding', 'Krytox', 'Switch Opener'],
    inStock: true
  }
];

export const MOCK_DESK_SETUPS: DeskSetup[] = [
  {
    id: 's1',
    title: 'Minimalist Artisan Workspace',
    user: '@doodle_keebs',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80',
    likes: 342,
    taggedProducts: [
      { id: 'p2', name: 'Tinytech Sketch-65% Keyboard', price: 149.00, x: 45, y: 62 },
      { id: 'p1', name: 'TinyDoodle Escape Cat Keycap', price: 34.99, x: 38, y: 54 },
      { id: 'p4', name: 'TinyDoodle XXL Desk Mat', price: 29.50, x: 50, y: 78 }
    ]
  },
  {
    id: 's2',
    title: 'Cozy Lofi Audio Corner',
    user: '@sound_and_doodles',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    image: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1200&q=80',
    likes: 519,
    taggedProducts: [
      { id: 'p3', name: 'Coiled Studio Headphones', price: 189.99, x: 68, y: 40 },
      { id: 'p7', name: 'Handcrafted Aviator Cable', price: 36.00, x: 30, y: 70 }
    ]
  }
];

export const SWITCH_SOUNDS: SwitchSound[] = [
  {
    id: 'linear',
    name: 'Creamy Peach (Linear)',
    type: 'Linear',
    profile: 'Deep marbly thock with effortless glide',
    frequency: 320,
    decay: 0.12
  },
  {
    id: 'tactile',
    name: 'Honey Bump (Tactile)',
    type: 'Tactile',
    profile: 'Satisfying tactile pop with rich acoustic bounce',
    frequency: 440,
    decay: 0.16
  },
  {
    id: 'clicky',
    name: 'Chalk Typewriter (Clicky)',
    type: 'Clicky',
    profile: 'Crisp mechanical click reminiscent of retro typewriters',
    frequency: 850,
    decay: 0.08
  },
  {
    id: 'silent',
    name: 'Whisper Velvet (Silent)',
    type: 'Silent',
    profile: 'Ultra-quiet dampened response for late night typing sessions',
    frequency: 220,
    decay: 0.05
  }
];
