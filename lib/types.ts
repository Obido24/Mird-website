export type ISODateString = string;

export interface BaseRecord {
  id: string;
  createdAt?: ISODateString;
  updatedAt?: ISODateString;
}

export interface UserRecord extends BaseRecord {
  name: string;
  email: string;
  role: 'admin' | 'staff' | 'client';
  avatarUrl?: string;
  active: boolean;
}

export interface ClientRecord extends BaseRecord {
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  status: 'lead' | 'active' | 'past';
  notes: string;
}

export interface ProjectRecord extends BaseRecord {
  title: string;
  clientId: string;
  serviceId: string;
  status: 'pending' | 'ongoing' | 'completed';
  budget: string;
  startDate: string;
  dueDate: string;
  progress: number;
  summary: string;
}

export interface ServiceRecord extends BaseRecord {
  title: string;
  slug: string;
  description: string;
  features: string[];
  ctaLabel: string;
  icon: string;
  active: boolean;
}

export interface CourseRecord extends BaseRecord {
  title: string;
  slug: string;
  category: string;
  description: string;
  duration: string;
  price: string;
  lessons: number;
  featured: boolean;
  active: boolean;
  features: string[];
}

export interface EnrollmentRecord extends BaseRecord {
  courseId: string;
  studentName: string;
  email: string;
  paymentStatus: 'paid' | 'pending';
  status: 'active' | 'completed' | 'cancelled';
}

export interface InquiryRecord extends BaseRecord {
  name: string;
  email: string;
  message: string;
  source: string;
  status: 'new' | 'replied' | 'archived';
}

export interface PaymentRecord extends BaseRecord {
  clientId: string;
  projectId?: string;
  amount: string;
  currency: string;
  method: string;
  status: 'paid' | 'pending';
  reference: string;
  date: string;
}

export interface PortfolioRecord extends BaseRecord {
  title: string;
  slug: string;
  category: string;
  clientName: string;
  description: string;
  outcome: string;
  tags: string[];
  featured: boolean;
  coverImage?: string;
}

export interface PublicService {
  slug: string;
  title: string;
  description: string;
  features: string[];
  ctaLabel: string;
  icon: string;
}

export interface PublicProject {
  slug: string;
  title: string;
  category: string;
  summary: string;
  outcome: string;
  tags: string[];
  clientName: string;
}

export interface PublicCourse {
  slug: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  price: string;
  lessons: number;
  highlights: string[];
}
