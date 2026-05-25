import {
  BookOpen,
  Boxes,
  BriefcaseBusiness,
  ChartColumn,
  Code2,
  Clapperboard,
  Cpu,
  FolderKanban,
  GraduationCap,
  LayoutGrid,
  MessageSquare,
  PenTool,
  Smartphone,
  SquareCode,
  Triangle,
  Video,
  Wrench
} from 'lucide-react';

const iconMap = {
  BookOpen,
  Boxes,
  BriefcaseBusiness,
  ChartColumn,
  Code2,
  Clapperboard,
  Cpu,
  FolderKanban,
  GraduationCap,
  LayoutGrid,
  MessageSquare,
  PenTool,
  Smartphone,
  SquareCode,
  Triangle,
  Video,
  Wrench
};

export type IconName = keyof typeof iconMap;

export function getIcon(name: string | undefined) {
  return iconMap[name as IconName] ?? SquareCode;
}
