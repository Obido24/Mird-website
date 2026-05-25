import type { PublicCourse, PublicProject, PublicService } from '@/lib/types';

export const siteNav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Academy', href: '/academy' },
  { label: 'Contact', href: '/contact' }
];

export const siteSeo = {
  title: 'MIDR Technologies Ltd | App Development, Web Design & Digital Solutions in Nigeria',
  description:
    'MIDR Technologies Ltd is a Nigerian technology company offering mobile app development, web development, software solutions, branding, video editing, computer maintenance, and ICT training.'
};

export const brandStory = {
  companyName: 'MIDR Technologies Ltd',
  tagline: 'Making Imagination Dream a Reality',
  shortDescription:
    'MIDR Technologies Ltd is a Nigerian technology company helping people and organizations turn ideas into digital products.',
  longStory:
    'MIDR Technologies Ltd was created with a simple belief: imagination becomes powerful when it is supported by the right technology. We help businesses, schools, startups, and individuals move from ideas to practical digital solutions through app development, web development, software systems, branding, multimedia, training, and IT support. Our work is built around creativity, problem-solving, and long-term value. We do not just build products; we build tools that help people communicate better, work faster, manage smarter, and grow stronger.',
  mission:
    'To empower businesses, schools, and organizations with innovative digital solutions that improve productivity, communication, visibility, and growth.',
  missionParagraph:
    'We are committed to building technology that is easy to use, reliable, and aligned with the goals of each client.',
  vision:
    'To become a leading African technology company recognized for creativity, innovation, excellence, and transformational digital solutions.',
  visionParagraph:
    'Our vision is to help more people and organizations move confidently into the digital future through products and services that create measurable value.',
  values: [
    'Innovation',
    'Excellence',
    'Creativity',
    'Integrity',
    'Practical problem-solving',
    'Client success'
  ],
  brandPromise: 'We turn ideas into reliable, beautiful, and functional digital solutions.',
  audiencePositioning:
    'For businesses, schools, startups, and organizations that need modern digital tools, MIDR Technologies Ltd provides creative and technical solutions that are built for real-world impact.',
  footerBlurb:
    'MIDR Technologies Ltd is a registered Nigerian technology company building modern digital solutions for businesses, schools, organizations, and individuals. We create websites, mobile apps, software systems, branding designs, multimedia content, and technology training solutions that help ideas become real, usable, and impactful.',
  footerCta: "Ready to build something powerful? Let's turn your idea into a digital solution."
};

export const faqItems = [
  {
    question: 'What does MIDR Technologies Ltd do?',
    answer:
      'MIDR Technologies Ltd provides app development, web development, software solutions, graphic design, video editing, computer maintenance, ICT training, and technology consultancy.'
  },
  {
    question: 'Can MIDR build custom software for my business?',
    answer:
      'Yes. We can design and develop custom systems based on your business process, goals, and users.'
  },
  {
    question: 'Do you train beginners?',
    answer:
      'Yes. MIDR Academy offers beginner-friendly training in web development, app development, graphic design, and video editing.'
  },
  {
    question: 'Can I request both design and development services?',
    answer:
      'Yes. We offer both creative and technical services, so clients can get branding, design, websites, apps, and support in one place.'
  },
  {
    question: 'Do you work remotely?',
    answer: 'Yes. We can work with clients physically or remotely depending on the project needs.'
  }
];

export const homeWhyChoose = [
  'We understand business and technology',
  'We design with users in mind',
  'We build scalable and reliable systems',
  'We offer creative and technical services in one place',
  'We support clients beyond project delivery'
];

export const homeDeliverables = [
  'Professional websites',
  'Mobile applications',
  'Business automation systems',
  'School management platforms',
  'Brand identity designs',
  'Video and multimedia content',
  'ICT training and consultancy'
];

export const aboutApproachSteps = [
  "Understand the client's goal",
  'Plan the right digital solution',
  'Design a clean user experience',
  'Build with modern technology',
  'Test, improve, and deliver',
  'Provide support and future growth guidance'
];

export const publicServices: PublicService[] = [
  {
    slug: 'web-development',
    title: 'Web Development',
    description:
      'We design and develop responsive websites and web applications that are fast, professional, secure, and easy to manage.',
    features: ['Business websites', 'Company profiles', 'Landing pages', 'Web applications', 'Admin dashboards', 'Website redesign'],
    ctaLabel: 'Build My Website',
    icon: 'Code2'
  },
  {
    slug: 'app-development',
    title: 'App Development',
    description:
      'We build modern mobile applications for Android and cross-platform use, focusing on clean design, strong functionality, and smooth user experience.',
    features: [
      'Android app development',
      'Flutter app development',
      'Firebase integration',
      'User authentication',
      'Admin and user dashboards',
      'App deployment preparation'
    ],
    ctaLabel: 'Build My App',
    icon: 'Smartphone'
  },
  {
    slug: 'graphic-design',
    title: 'Graphic Design',
    description:
      'We create professional designs that give your brand a strong, clear, and memorable identity.',
    features: ['Logo design', 'Brand identity', 'Flyers and posters', 'Social media graphics', 'Business cards', 'Corporate designs'],
    ctaLabel: 'Design My Brand',
    icon: 'PenTool'
  },
  {
    slug: 'video-editing',
    title: 'Video Editing',
    description:
      'We produce clean and engaging video content for promotions, events, training, social media, and business communication.',
    features: ['Promotional videos', 'Event highlights', 'Social media videos', 'Motion graphics', 'Video branding', 'Content editing'],
    ctaLabel: 'Edit My Video',
    icon: 'Clapperboard'
  },
  {
    slug: 'computer-maintenance',
    title: 'Computer Maintenance',
    description:
      'We provide reliable computer maintenance and IT support to keep your systems working smoothly and efficiently.',
    features: [
      'Software installation',
      'System troubleshooting',
      'Computer servicing',
      'Technical support',
      'Basic networking support',
      'System optimization'
    ],
    ctaLabel: 'Request Support',
    icon: 'Wrench'
  },
  {
    slug: 'tech-training',
    title: 'Tech Training',
    description:
      "We train individuals, students, staff, and organizations in practical digital skills needed for today's technology-driven world.",
    features: [
      'Web design training',
      'App development training',
      'Graphic design training',
      'Video editing training',
      'Computer appreciation',
      'Digital skills workshops'
    ],
    ctaLabel: 'Join Training',
    icon: 'BookOpen'
  }
];

export const publicProjects: PublicProject[] = [
  {
    slug: 'midr-zenith',
    title: 'MIDR Zenith Platform',
    category: 'Business Technology Platform',
    summary:
      'A modern digital platform concept designed to help businesses manage services, users, operations, and digital workflows from one central system.',
    outcome: 'Improved structure for business automation, service management, and digital growth.',
    tags: ['Software', 'Dashboard', 'Automation', 'Web App'],
    clientName: 'MIDR Technologies Ltd'
  },
  {
    slug: 'academy-labs',
    title: 'Academy Labs',
    category: 'Education Technology',
    summary:
      'An educational technology concept created to support digital learning, student engagement, training programs, and school-based innovation.',
    outcome: 'A stronger foundation for online learning, course delivery, and academic digital transformation.',
    tags: ['EdTech', 'Training', 'Learning', 'Academy'],
    clientName: 'MIDR Academy'
  },
  {
    slug: 'creative-suite',
    title: 'Creative Suite',
    category: 'Branding & Multimedia',
    summary:
      'A creative service collection focused on branding, graphics, video editing, and digital content production for businesses and personal brands.',
    outcome: 'Improved brand visibility, professional presentation, and digital communication.',
    tags: ['Design', 'Branding', 'Video', 'Multimedia'],
    clientName: 'Creative Brands & Businesses'
  }
];

export const publicCourses: PublicCourse[] = [
  {
    slug: 'web-development',
    title: 'Web Development',
    description: 'Learn how to design and build modern websites using practical tools, structure, layouts, and real project examples.',
    duration: '8 weeks',
    level: 'Beginner to Intermediate',
    price: 'Contact for Pricing',
    lessons: 16,
    highlights: ['HTML, CSS, and website structure', 'Responsive design', 'Website publishing basics', 'Portfolio project']
  },
  {
    slug: 'app-development',
    title: 'App Development',
    description: 'Learn the foundation of mobile app development, interface design, app logic, and deployment preparation.',
    duration: '10 weeks',
    level: 'Beginner to Intermediate',
    price: 'Contact for Pricing',
    lessons: 20,
    highlights: ['App planning', 'UI design', 'Flutter basics', 'Firebase introduction']
  },
  {
    slug: 'graphics-design',
    title: 'Graphics Design',
    description: 'Learn how to create professional designs for brands, social media, business promotions, and digital campaigns.',
    duration: '6 weeks',
    level: 'Beginner',
    price: 'Contact for Pricing',
    lessons: 12,
    highlights: ['Design principles', 'Logo and flyer design', 'Brand identity', 'Social media graphics']
  },
  {
    slug: 'video-editing',
    title: 'Video Editing',
    description: 'Learn how to edit videos for social media, business promotions, events, and professional presentations.',
    duration: '6 weeks',
    level: 'Beginner',
    price: 'Contact for Pricing',
    lessons: 12,
    highlights: ['Video cutting and arrangement', 'Transitions and effects', 'Audio improvement', 'Exporting for platforms']
  }
];

export const testimonials = [
  {
    quote:
      'MIDR understands how to turn an idea into a clear digital solution. Their approach is creative, professional, and practical.',
    author: 'Business Client',
    title: 'Startup Founder'
  },
  {
    quote:
      'The team delivered a clean and user-friendly design that made our brand look more professional and modern.',
    author: 'Creative Client',
    title: 'Brand Owner'
  },
  {
    quote:
      "MIDR's training style is simple, practical, and easy to understand. The sessions helped us gain real digital skills.",
    author: 'Training Participant',
    title: 'ICT Learner'
  }
];

export const whyChoose = homeWhyChoose;

export const companyStats = [
  { label: 'Projects Delivered', value: '120+' },
  { label: 'Client Satisfaction', value: '94%' },
  { label: 'Training Sessions', value: '36+' },
  { label: 'Support Response', value: 'Fast' }
];

export const dashboardMetrics = [
  { label: 'Client accounts', value: '1,284', delta: '+12%' },
  { label: 'Projects in motion', value: '42', delta: '12 live' },
  { label: 'Revenue', value: '$1.2M', delta: '+24.5%' },
  { label: 'Academy enrollments', value: '450+', delta: 'Verified' }
];

export const adminQuickLinks = [
  { label: 'Overview', href: '/admin' },
  { label: 'Clients', href: '/admin/clients' },
  { label: 'Projects', href: '/admin/projects' },
  { label: 'Services', href: '/admin/services' },
  { label: 'Courses', href: '/admin/courses' },
  { label: 'Payments', href: '/admin/payments' },
  { label: 'Messages', href: '/admin/inquiries' },
  { label: 'Settings', href: '/admin/settings' }
];
