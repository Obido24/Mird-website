import type { ComponentType } from 'react';
import { BookOpen, BriefcaseBusiness, CreditCard, FolderKanban, LayoutDashboard, Mail, Settings, Users } from 'lucide-react';

export type FieldType = 'text' | 'textarea' | 'number' | 'select' | 'checkbox' | 'lines';

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  options?: Array<{ label: string; value: string }>;
}

export interface ColumnConfig {
  key: string;
  label: string;
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
}

export interface ResourceConfig {
  collection: string;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  fields: FieldConfig[];
  columns: ColumnConfig[];
  createLabel: string;
}

export const adminNav = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Clients', href: '/admin/clients', icon: Users },
  { label: 'Projects', href: '/admin/projects', icon: FolderKanban },
  { label: 'Portfolio', href: '/admin/portfolio', icon: FolderKanban },
  { label: 'Services', href: '/admin/services', icon: BriefcaseBusiness },
  { label: 'Courses', href: '/admin/courses', icon: BookOpen },
  { label: 'Payments', href: '/admin/payments', icon: CreditCard },
  { label: 'Messages', href: '/admin/inquiries', icon: Mail },
  { label: 'Settings', href: '/admin/settings', icon: Settings }
];

export const resourceConfigs: Record<string, ResourceConfig> = {
  clients: {
    collection: 'clients',
    title: 'Clients Management',
    description: 'Track client relationships, companies, and contact details.',
    icon: Users,
    createLabel: 'Add Client',
    fields: [
      { name: 'name', label: 'Client Name', type: 'text', required: true },
      { name: 'company', label: 'Company', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'text', required: true },
      { name: 'phone', label: 'Phone', type: 'text', required: true },
      { name: 'industry', label: 'Industry', type: 'text', required: true },
      {
        name: 'status',
        label: 'Status',
        type: 'select',
        required: true,
        options: [
          { label: 'Lead', value: 'lead' },
          { label: 'Active', value: 'active' },
          { label: 'Past', value: 'past' }
        ]
      },
      { name: 'notes', label: 'Notes', type: 'textarea', placeholder: 'Client context or next steps' }
    ],
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'company', label: 'Company' },
      { key: 'email', label: 'Email' },
      { key: 'status', label: 'Status' }
    ]
  },
  projects: {
    collection: 'projects',
    title: 'Projects Management',
    description: 'Create and monitor projects by client and service.',
    icon: FolderKanban,
    createLabel: 'New Project',
    fields: [
      { name: 'title', label: 'Project Title', type: 'text', required: true },
      { name: 'clientId', label: 'Client ID', type: 'text', required: true },
      { name: 'serviceId', label: 'Service ID', type: 'text', required: true },
      { name: 'budget', label: 'Budget', type: 'text', required: true },
      { name: 'startDate', label: 'Start Date', type: 'text', placeholder: '2026-04-01' },
      { name: 'dueDate', label: 'Due Date', type: 'text', placeholder: '2026-06-30' },
      {
        name: 'status',
        label: 'Status',
        type: 'select',
        required: true,
        options: [
          { label: 'Pending', value: 'pending' },
          { label: 'Ongoing', value: 'ongoing' },
          { label: 'Completed', value: 'completed' }
        ]
      },
      { name: 'progress', label: 'Progress', type: 'number', placeholder: '70' },
      { name: 'summary', label: 'Summary', type: 'textarea' }
    ],
    columns: [
      { key: 'title', label: 'Title' },
      { key: 'clientId', label: 'Client' },
      { key: 'status', label: 'Status' },
      { key: 'progress', label: 'Progress' }
    ]
  },
  portfolio: {
    collection: 'portfolio',
    title: 'Portfolio Management',
    description: 'Publish and update featured case studies and project highlights.',
    icon: FolderKanban,
    createLabel: 'Add Project',
    fields: [
      { name: 'title', label: 'Project Title', type: 'text', required: true },
      { name: 'slug', label: 'Slug', type: 'text', required: true },
      { name: 'category', label: 'Category', type: 'text', required: true },
      { name: 'clientName', label: 'Client Name', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'outcome', label: 'Outcome', type: 'textarea', required: true },
      { name: 'tags', label: 'Tags', type: 'lines', helperText: 'One tag per line.' },
      { name: 'featured', label: 'Featured', type: 'checkbox' }
    ],
    columns: [
      { key: 'title', label: 'Title' },
      { key: 'category', label: 'Category' },
      { key: 'clientName', label: 'Client' },
      { key: 'featured', label: 'Featured' }
    ]
  },
  services: {
    collection: 'services',
    title: 'Services Management',
    description: 'Edit service copy, visibility, and displayed features.',
    icon: BriefcaseBusiness,
    createLabel: 'Add Service',
    fields: [
      { name: 'title', label: 'Service Title', type: 'text', required: true },
      { name: 'slug', label: 'Slug', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'features', label: 'Features', type: 'lines', helperText: 'One feature per line.' },
      { name: 'ctaLabel', label: 'CTA Label', type: 'text', required: true },
      { name: 'icon', label: 'Icon Name', type: 'text', placeholder: 'Code2' },
      { name: 'active', label: 'Active', type: 'checkbox' }
    ],
    columns: [
      { key: 'title', label: 'Title' },
      { key: 'slug', label: 'Slug' },
      { key: 'active', label: 'Active' }
    ]
  },
  courses: {
    collection: 'courses',
    title: 'Courses Management',
    description: 'Manage academy course details and enrollment experience.',
    icon: BookOpen,
    createLabel: 'Add Course',
    fields: [
      { name: 'title', label: 'Course Title', type: 'text', required: true },
      { name: 'slug', label: 'Slug', type: 'text', required: true },
      { name: 'category', label: 'Category', type: 'text', required: true },
      { name: 'level', label: 'Level', type: 'text', placeholder: 'Beginner to Intermediate' },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'duration', label: 'Duration', type: 'text', required: true },
      { name: 'price', label: 'Price', type: 'text', required: true },
      { name: 'lessons', label: 'Lessons', type: 'number', required: true },
      { name: 'features', label: 'Features', type: 'lines' },
      { name: 'highlights', label: 'Highlights', type: 'lines', helperText: 'One Academy page bullet per line.' },
      { name: 'featured', label: 'Featured', type: 'checkbox' },
      { name: 'active', label: 'Active', type: 'checkbox' }
    ],
    columns: [
      { key: 'title', label: 'Title' },
      { key: 'category', label: 'Category' },
      { key: 'price', label: 'Price' },
      { key: 'featured', label: 'Featured' }
    ]
  },
  payments: {
    collection: 'payments',
    title: 'Payments',
    description: 'Track payment records and fulfillment status.',
    icon: CreditCard,
    createLabel: 'Add Payment',
    fields: [
      { name: 'clientId', label: 'Client ID', type: 'text', required: true },
      { name: 'projectId', label: 'Project ID', type: 'text', placeholder: 'Optional' },
      { name: 'amount', label: 'Amount', type: 'text', required: true },
      { name: 'currency', label: 'Currency', type: 'text', required: true },
      { name: 'method', label: 'Payment Method', type: 'text', required: true },
      { name: 'reference', label: 'Reference', type: 'text', required: true },
      { name: 'date', label: 'Date', type: 'text', placeholder: '2026-04-18' },
      {
        name: 'status',
        label: 'Status',
        type: 'select',
        required: true,
        options: [
          { label: 'Paid', value: 'paid' },
          { label: 'Pending', value: 'pending' }
        ]
      }
    ],
    columns: [
      { key: 'clientId', label: 'Client' },
      { key: 'amount', label: 'Amount' },
      { key: 'status', label: 'Status' },
      { key: 'reference', label: 'Reference' }
    ]
  },
  inquiries: {
    collection: 'inquiries',
    title: 'Messages / Inquiries',
    description: 'Review inbound contact form messages and response status.',
    icon: Mail,
    createLabel: 'Add Inquiry',
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'text', required: true },
      { name: 'interest', label: 'Service Needed', type: 'text' },
      { name: 'message', label: 'Message', type: 'textarea', required: true },
      { name: 'source', label: 'Source', type: 'text', required: true },
      {
        name: 'status',
        label: 'Status',
        type: 'select',
        required: true,
        options: [
          { label: 'New', value: 'new' },
          { label: 'Replied', value: 'replied' },
          { label: 'Archived', value: 'archived' }
        ]
      }
    ],
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'interest', label: 'Service' },
      { key: 'status', label: 'Status' }
    ]
  },
  settings: {
    collection: 'users',
    title: 'Settings',
    description: 'Manage admin profile and system settings.',
    icon: Settings,
    createLabel: 'Add User',
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'text', required: true },
      {
        name: 'role',
        label: 'Role',
        type: 'select',
        required: true,
        options: [
          { label: 'Admin', value: 'admin' },
          { label: 'Staff', value: 'staff' },
          { label: 'Client', value: 'client' }
        ]
      },
      { name: 'avatarUrl', label: 'Avatar URL', type: 'text' },
      { name: 'active', label: 'Active', type: 'checkbox' }
    ],
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Role' },
      { key: 'active', label: 'Active' }
    ]
  }
};
