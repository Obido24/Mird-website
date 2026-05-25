import {
  ClientRecord,
  CourseRecord,
  EnrollmentRecord,
  InquiryRecord,
  PaymentRecord,
  PortfolioRecord,
  ProjectRecord,
  ServiceRecord,
  UserRecord
} from '@/lib/types';

export const mockUsers: UserRecord[] = [
  {
    id: 'user_1',
    name: 'Midr Admin',
    email: 'admin@midr.example',
    role: 'admin',
    active: true
  }
];

export const mockClients: ClientRecord[] = [
  {
    id: 'client_1',
    name: 'Amina Yusuf',
    company: 'Nexora Labs',
    email: 'amina@nexora.io',
    phone: '+234 803 555 0110',
    industry: 'SaaS',
    status: 'active',
    notes: 'Priority partner for the Q2 launch.'
  },
  {
    id: 'client_2',
    name: 'David Okafor',
    company: 'Kora Systems',
    email: 'david@korasystems.com',
    phone: '+234 706 555 0102',
    industry: 'Operations',
    status: 'lead',
    notes: 'Requested dashboard refresh and project tracking.'
  }
];

export const mockServices: ServiceRecord[] = [
  {
    id: 'service_1',
    title: 'Web Development',
    slug: 'web-development',
    description: 'High-performance websites and digital products.',
    features: ['Next.js', 'SEO', 'CMS', 'Analytics'],
    ctaLabel: 'Build a Web Platform',
    icon: 'Code2',
    active: true
  },
  {
    id: 'service_2',
    title: 'Tech Training',
    slug: 'tech-training',
    description: 'Hands-on cohort-based digital training.',
    features: ['Live sessions', 'Mentorship', 'Projects'],
    ctaLabel: 'Start Training',
    icon: 'BookOpen',
    active: true
  }
];

export const mockProjects: ProjectRecord[] = [
  {
    id: 'project_1',
    title: 'MIDR Zenith Platform',
    clientId: 'client_1',
    serviceId: 'service_1',
    status: 'ongoing',
    budget: '$15,000',
    startDate: '2026-02-10',
    dueDate: '2026-05-01',
    progress: 72,
    summary: 'Premium company website with dashboard previews and lead capture.'
  },
  {
    id: 'project_2',
    title: 'Academy Intake Flow',
    clientId: 'client_2',
    serviceId: 'service_2',
    status: 'pending',
    budget: '$4,500',
    startDate: '2026-04-21',
    dueDate: '2026-06-12',
    progress: 18,
    summary: 'Course enrollment workflow and student management.'
  }
];

export const mockCourses: CourseRecord[] = [
  {
    id: 'course_1',
    title: 'Web Development',
    slug: 'web-development',
    category: 'Academy',
    description: 'A structured path from fundamentals to deployable projects.',
    duration: '8 weeks',
    price: 'From $120',
    lessons: 18,
    featured: true,
    active: true,
    features: ['HTML & CSS', 'React', 'Deployment']
  },
  {
    id: 'course_2',
    title: 'Graphics Design',
    slug: 'graphics-design',
    category: 'Academy',
    description: 'Visual communication, layout, and brand asset creation.',
    duration: '6 weeks',
    price: 'From $90',
    lessons: 14,
    featured: false,
    active: true,
    features: ['Figma', 'Brand systems', 'Marketing graphics']
  }
];

export const mockEnrollments: EnrollmentRecord[] = [
  {
    id: 'enrollment_1',
    courseId: 'course_1',
    studentName: 'Zainab Bello',
    email: 'zainab@email.com',
    paymentStatus: 'paid',
    status: 'active'
  }
];

export const mockInquiries: InquiryRecord[] = [
  {
    id: 'inq_1',
    name: 'Chinedu',
    email: 'chinedu@startuplabs.co',
    message: 'We need a premium product website for our launch next month.',
    source: 'Website contact form',
    status: 'new'
  }
];

export const mockPayments: PaymentRecord[] = [
  {
    id: 'payment_1',
    clientId: 'client_1',
    projectId: 'project_1',
    amount: '$7,500',
    currency: 'USD',
    method: 'Bank transfer',
    status: 'paid',
    reference: 'MIDR-2048',
    date: '2026-04-14'
  }
];

export const mockPortfolio: PortfolioRecord[] = [
  {
    id: 'portfolio_1',
    title: 'MIDR Zenith Platform',
    slug: 'midr-zenith',
    category: 'Enterprise Website',
    clientName: 'MIDR',
    description: 'A premium technology site with product storytelling and lead capture.',
    outcome: 'Improved clarity, premium positioning, and contact conversion.',
    tags: ['Next.js', 'Tailwind', 'Analytics'],
    featured: true
  }
];

export const seedPayload = {
  users: mockUsers,
  clients: mockClients,
  projects: mockProjects,
  services: mockServices,
  courses: mockCourses,
  enrollments: mockEnrollments,
  inquiries: mockInquiries,
  payments: mockPayments,
  portfolio: mockPortfolio
};
