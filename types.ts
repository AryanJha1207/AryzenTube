
export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channelName: string;
  channelAvatar: string;
  views: string;
  postedAt: string;
  duration: string;
  description?: string;
  videoUrl?: string;
  subscriberCount?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isPremium: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  videoId: string;
  duration: number; // in minutes
  type: string; // "theory" | "practical"
  completed?: boolean;
}

export interface LearningDay {
  day: number;
  theme: string;
  lessons: Lesson[];
}

export interface LearningPath {
  id: string;
  goal: string;
  level: string;
  totalDays: number;
  dailyMinutes: number;
  curriculum: LearningDay[];
  createdAt: string;
}

export enum SidebarState {
  Full = 'full',
  Mini = 'mini',
  Hidden = 'hidden'
}
