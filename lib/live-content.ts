import 'server-only';

import { adminDb } from '@/lib/firebase-admin';
import type { CourseRecord, PaymentRecord, PortfolioRecord, ProjectRecord, PublicCourse, PublicProject, PublicService, ServiceRecord } from '@/lib/types';

type FirestoreRecord = {
  id: string;
  createdAt?: unknown;
  updatedAt?: unknown;
  [key: string]: unknown;
};

type TimedRecord = {
  id: string;
  createdAt?: unknown;
  updatedAt?: unknown;
};

export type DashboardData = {
  metrics: Array<{ label: string; value: string; delta: string }>;
  activities: Array<{ time: string; title: string; detail: string }>;
  revenueSeries: number[];
};

function asString(value: unknown, fallback = '') {
  return typeof value === 'string' && value.trim().length > 0 ? value : fallback;
}

function asNumber(value: unknown, fallback = 0) {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function asStringArray(value: unknown) {
  return Array.isArray(value) ? value.map((item) => String(item).trim()).filter(Boolean) : [];
}

function toMillis(value: unknown) {
  if (!value) return 0;
  if (value instanceof Date) return value.getTime();
  if (typeof value === 'string') return Date.parse(value) || 0;
  if (typeof value === 'object' && 'toMillis' in value && typeof value.toMillis === 'function') {
    return value.toMillis();
  }
  return 0;
}

function formatActivityTime(value: unknown) {
  const millis = toMillis(value);
  if (!millis) return 'Recently';

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  }).format(new Date(millis));
}

function parseMoney(value: unknown) {
  if (typeof value === 'number') return value;
  if (typeof value !== 'string') return 0;

  const parsed = Number(value.replace(/[^0-9.-]+/g, ''));
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatMoney(value: number) {
  return new Intl.NumberFormat('en', {
    currency: 'USD',
    maximumFractionDigits: 0,
    style: 'currency'
  }).format(value);
}

async function getCollection<T extends { id: string }>(name: string) {
  const snapshot = await adminDb().collection(name).get();
  return snapshot.docs.map((entry) => ({ id: entry.id, ...(entry.data() as Omit<T, 'id'>) }));
}

async function getPublicCollection<T extends { id: string }>(name: string) {
  try {
    return await getCollection<T>(name);
  } catch (error) {
    console.error(`Unable to load public Firestore collection "${name}".`, error);
    return [];
  }
}

function sortByUpdatedAt<T extends TimedRecord>(items: T[]) {
  return [...items].sort((a, b) => toMillis(b.updatedAt ?? b.createdAt) - toMillis(a.updatedAt ?? a.createdAt));
}

export async function getLiveServices(): Promise<PublicService[]> {
  const services = await getPublicCollection<ServiceRecord>('services');

  return sortByUpdatedAt(services)
    .filter((service) => service.active !== false)
    .map((service) => ({
      slug: asString(service.slug, service.id),
      title: asString(service.title, 'Untitled Service'),
      description: asString(service.description),
      features: asStringArray(service.features),
      ctaLabel: asString(service.ctaLabel, 'Get Started'),
      icon: asString(service.icon, 'Code2')
    }));
}

export async function getLivePortfolioProjects(): Promise<PublicProject[]> {
  const projects = await getPublicCollection<PortfolioRecord>('portfolio');

  return sortByUpdatedAt(projects).map((project) => ({
    slug: asString(project.slug, project.id),
    title: asString(project.title, 'Untitled Project'),
    category: asString(project.category, 'Project'),
    summary: asString(project.description),
    outcome: asString(project.outcome),
    tags: asStringArray(project.tags),
    clientName: asString(project.clientName, 'MIDR Client')
  }));
}

export async function getLiveCourses(): Promise<PublicCourse[]> {
  const courses = await getPublicCollection<CourseRecord & { level?: string; highlights?: string[] }>('courses');

  return sortByUpdatedAt(courses)
    .filter((course) => course.active !== false)
    .map((course) => ({
      slug: asString(course.slug, course.id),
      title: asString(course.title, 'Untitled Course'),
      description: asString(course.description),
      duration: asString(course.duration),
      level: asString(course.level, asString(course.category, 'Course')),
      price: asString(course.price, 'Contact for Pricing'),
      lessons: asNumber(course.lessons),
      highlights: asStringArray(course.highlights).length > 0 ? asStringArray(course.highlights) : asStringArray(course.features)
    }));
}

export async function getDashboardData(): Promise<DashboardData> {
  const [clients, projects, payments, courses, inquiries] = await Promise.all([
    getCollection<FirestoreRecord>('clients'),
    getCollection<ProjectRecord>('projects'),
    getCollection<PaymentRecord>('payments'),
    getCollection<FirestoreRecord>('courses'),
    getCollection<FirestoreRecord>('inquiries')
  ]);

  const activeProjects = projects.filter((project) => project.status === 'ongoing').length;
  const paidRevenue = payments
    .filter((payment) => payment.status === 'paid')
    .reduce((total, payment) => total + parseMoney(payment.amount), 0);
  const newMessages = inquiries.filter((inquiry) => inquiry.status === 'new').length;

  const latestActivities = [
    ...sortByUpdatedAt(inquiries).slice(0, 3).map((inquiry) => ({
      time: formatActivityTime(inquiry.createdAt ?? inquiry.updatedAt),
      title: 'New inquiry',
      detail: `${asString(inquiry.name, 'A visitor')} sent a message from ${asString(inquiry.source, 'the website')}.`
    })),
    ...sortByUpdatedAt(projects).slice(0, 3).map((project) => ({
      time: formatActivityTime(project.updatedAt ?? project.createdAt),
      title: 'Project update',
      detail: `${asString(project.title, 'A project')} is marked ${asString(project.status, 'updated')}.`
    }))
  ].slice(0, 5);

  return {
    metrics: [
      { label: 'Total Clients', value: String(clients.length), delta: 'Live' },
      { label: 'Active Projects', value: String(activeProjects), delta: `${projects.length} total` },
      { label: 'Revenue', value: formatMoney(paidRevenue), delta: 'Paid only' },
      { label: 'Courses', value: String(courses.length), delta: `${newMessages} new messages` }
    ],
    activities: latestActivities,
    revenueSeries: payments.map((payment) => parseMoney(payment.amount)).filter((amount) => amount > 0)
  };
}
