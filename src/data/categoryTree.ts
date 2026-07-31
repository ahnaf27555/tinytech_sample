import { 
  Keyboard, 
  Layers, 
  Headphones, 
  Mouse, 
  Sliders
} from 'lucide-react';

export interface ChildSubcategory {
  id: string;
  name: string;
  description: string;
  filterTag?: string;
}

export interface ParentCategory {
  id: string;
  name: string;
  icon: any;
  description: string;
  subcategories: ChildSubcategory[];
  featuredHighlight?: {
    title: string;
    description: string;
    tag: string;
    filterQuery: string;
  };
}

export const CATEGORY_TREE: ParentCategory[] = [
  {
    id: 'keyboards',
    name: 'Keyboards',
    icon: Keyboard,
    description: 'Custom gasket mount, wireless & barebone enthusiast mechanical boards',
    subcategories: [
      { id: 'gasket-mount', name: 'Gasket Mount Custom Boards', description: 'Silky acoustic flex & isolated bounce feel', filterTag: 'Gasket Mount' },
      { id: 'wireless-keebs', name: 'Wireless & Bluetooth', description: 'Tri-mode 2.4Ghz & multi-device Bluetooth', filterTag: 'Wireless' },
      { id: 'barebones', name: 'Barebone Kits & PCBs', description: 'Hot-swappable DIY foundation kits', filterTag: 'Barebones' },
      { id: 'compact-layout', name: '75% & 65% Compact Layouts', description: 'Space-saving desk aesthetics with arrow keys', filterTag: '75%' },
      { id: 'sound-studio', name: 'Acoustic Sound Studio', description: 'Test switch thock, clack, and silent sound profiles', filterTag: 'Sound Studio' }
    ],
    featuredHighlight: {
      title: 'Doodle-75 Pro Edition',
      description: 'Gasket mount CNC aluminum with brass weight & OLED screen.',
      tag: '⭐ Bestseller',
      filterQuery: 'Doodle-75'
    }
  },
  {
    id: 'keycaps',
    name: 'Artisan Keycaps',
    icon: Layers,
    description: 'Double-shot PBT keycap sets and handcrafted resin artisan novelties',
    subcategories: [
      { id: 'pbt-sets', name: 'Double-shot PBT Sets', description: 'Thick 1.5mm texture resistant to shine and wear', filterTag: 'PBT' },
      { id: 'resin-artisans', name: 'Handcrafted Resin Artisans', description: 'Hand-cast micro sculpture ESC keycaps', filterTag: 'Artisan' },
      { id: 'novelties', name: 'Anime & Novelty Keycaps', description: 'Playful ESC key designs and custom profiles', filterTag: 'Novelties' },
      { id: 'cherry-profile', name: 'Cherry & MOA Profiles', description: 'Ergonomic sculptured key heights', filterTag: 'Cherry' }
    ],
    featuredHighlight: {
      title: 'TinyDoodle PBT Keycap Set',
      description: 'Dye-sublimated custom doodle legends on warm cream PBT.',
      tag: '🔥 New Drop',
      filterQuery: 'TinyDoodle'
    }
  },
  {
    id: 'audio',
    name: 'Audio Gear',
    icon: Headphones,
    description: 'Studio audiophile headphones, desk microphones, and custom cables',
    subcategories: [
      { id: 'headphones', name: 'Studio & Open-Back Headphones', description: 'Expansive soundstage for music & gaming focus', filterTag: 'Headphones' },
      { id: 'microphones', name: 'Desk Mics & Boom Arms', description: 'Broadcast-quality USB and XLR voice capture', filterTag: 'Microphone' },
      { id: 'dac-amps', name: 'Desktop DACs & Amplifiers', description: 'Clean hi-res power drive for audiophile gear', filterTag: 'DAC' },
      { id: 'audio-cables', name: 'Braided Audio Interconnects', description: 'Custom gold-plated braided cables', filterTag: 'Audio Cable' }
    ],
    featuredHighlight: {
      title: 'AcousticDoodle Open-Back',
      description: 'Planar magnetic drivers with velour ear cushions.',
      tag: '🎧 Staff Pick',
      filterQuery: 'AcousticDoodle'
    }
  },
  {
    id: 'mice',
    name: 'Mice & Trackpads',
    icon: Mouse,
    description: 'Ultra-light wireless mice, ergonomic trackpads, and glass skates',
    subcategories: [
      { id: 'wireless-mice', name: 'Ultra-Light Wireless Mice', description: 'Sub-50g magnesium & carbon fiber shells', filterTag: 'Wireless' },
      { id: 'trackpads', name: 'Ergonomic Trackpads & Dial Knobs', description: 'Smooth multi-touch surface for creative apps', filterTag: 'Trackpad' },
      { id: 'mouse-skates', name: 'Glass Skates & Grip Tapes', description: 'Zero-friction glass feet for effortless glide', filterTag: 'Skates' }
    ],
    featuredHighlight: {
      title: 'TinyGlide Ultralight 4K',
      description: '49g carbon fiber body with 4000Hz polling rate.',
      tag: '⚡ 4K Polling',
      filterQuery: 'TinyGlide'
    }
  },
  {
    id: 'accessories',
    name: 'Desk Mats & Accessories',
    icon: Sliders,
    description: 'Stitched felt desk pads, coiled aviator cables, and lube kits',
    subcategories: [
      { id: 'desk-mats', name: 'Waterproof Stitched Desk Mats', description: 'Micro-weave cloth surfaces with anti-fray edges', filterTag: 'Desk Mat' },
      { id: 'aviator-cables', name: 'Coiled Aviator Cables', description: 'Hand-coiled PET sleeve with GX16 metal connectors', filterTag: 'Cable' },
      { id: 'wrist-rests', name: 'Wooden & Resin Wrist Rests', description: 'Ergonomic palm support for long coding/typing', filterTag: 'Wrist Rest' },
      { id: 'lube-kits', name: 'Switch Openers & Lube Stations', description: 'Krytox 205g0, lube brushes & switch pullers', filterTag: 'Lube Kit' }
    ],
    featuredHighlight: {
      title: 'Coiled Aviator Gold Cable',
      description: 'Double-sleeved Techflex coiled cable with brass aviator ring.',
      tag: '✨ Custom Crafted',
      filterQuery: 'Coiled Aviator'
    }
  }
];
