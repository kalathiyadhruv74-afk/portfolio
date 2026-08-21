import pantrypalImg from '../assets/pantrypal.jpg';
import bookmycutImg from '../assets/bookmycut.jpg';
import churnlensImg from '../assets/churnlens.png';

export const projectsData = [
  {
    id: '01',
    number: '01',
    title: 'PantryPal',
    category: 'SMART PANTRY MANAGEMENT',
    description: 'PantryPal is a smart pantry management application designed to help users manage food inventory, track ingredients, reduce food waste and discover recipes based on ingredients already available.',
    tech: ['React', 'JavaScript', 'Tailwind CSS', 'REST APIs', 'Node.js'],
    liveUrl: 'https://pantrypal-frontend-six.vercel.app/dashboard',
    ctaText: 'VIEW PROJECT ↗',
    image: pantrypalImg,
    layout: 'left-image', // Image left, content right
    highlights: [
      'Real-time food expiry tracking & push alerts',
      'Ingredient-based recipe discovery engine',
      'Smart automated shopping list creation',
      'Intuitive pantry inventory dashboard'
    ]
  },
  {
    id: '02',
    number: '02',
    title: 'BookMyCut',
    category: 'SALON APPOINTMENT PLATFORM',
    description: 'BookMyCut is a modern salon appointment booking platform designed to make browsing services and managing salon appointments simple and convenient.',
    tech: ['React', 'Node.js', 'Express', 'Tailwind CSS', 'MySQL'],
    liveUrl: 'https://book-my-cut.vercel.app/',
    ctaText: 'VIEW PROJECT ↗',
    image: bookmycutImg,
    layout: 'right-image', // Content left, image right
    highlights: [
      'Interactive time slot calendar & appointment scheduling',
      'Service catalog with detailed pricing & duration',
      'Stylist choice & availability management',
      'Responsive customer booking confirmation workflow'
    ]
  },
  {
    id: '03',
    number: '03',
    title: 'ChurnLens',
    category: 'RETENTION INTELLIGENCE & ML ANALYTICS',
    description: 'ChurnLens is an end-to-end customer churn prediction and retention intelligence platform that transforms raw telemetry into explainable 0–100 risk scoring, isolates onboarding cliff dropoffs, and triggers automated retention countermeasures.',
    tech: ['Python', 'Machine Learning', 'SQL', 'Data Analytics', 'JavaScript', 'Tailwind CSS'],
    liveUrl: 'https://churn-lens.vercel.app/',
    ctaText: 'VIEW PROJECT ↗',
    image: churnlensImg,
    layout: 'left-image', // Image left, content right
    highlights: [
      'Explainable 0–100 customer churn risk scoring engine',
      'Interactive ROI & ARR revenue recovery calculator',
      '90-Day onboarding cliff & root cause failure analysis',
      'Automated retention playbooks & smart dunning workflows'
    ]
  }
];


