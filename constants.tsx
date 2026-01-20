
import React from 'react';
import { 
  Home, 
  Compass, 
  PlaySquare, 
  Clock, 
  ThumbsUp, 
  History, 
  Gamepad2, 
  Trophy, 
  Music2, 
  Film,
  Library
} from 'lucide-react';

export const CATEGORIES = [
  "All", "Gaming", "Music", "Live", "Mixed martial arts", "Computers", 
  "Programming", "Gadgets", "Smartphones", "React", "AI", "Cooking", 
  "Physics", "Nature", "Lo-fi", "Podcasts", "Trailers"
];

export const SIDEBAR_ITEMS = [
  { icon: <Home size={22} />, label: "Home", active: true },
  { icon: <Compass size={22} />, label: "Shorts" },
  { icon: <Library size={22} />, label: "Subscriptions" },
];

export const SIDEBAR_SECONDARY = [
  { icon: <Library size={22} />, label: "Library" },
  { icon: <History size={22} />, label: "History" },
  { icon: <PlaySquare size={22} />, label: "Your videos" },
  { icon: <Clock size={22} />, label: "Watch later" },
  { icon: <ThumbsUp size={22} />, label: "Liked videos" },
];

export const SIDEBAR_EXPLORE = [
  { icon: <Trophy size={22} />, label: "Sports" },
  { icon: <Gamepad2 size={22} />, label: "Gaming" },
  { icon: <Music2 size={22} />, label: "Music" },
  { icon: <Film size={22} />, label: "Movies" },
];

export const MOCK_VIDEOS = [
  {
    id: "v1",
    title: "How to Build a World-Class Frontend with React 18",
    thumbnail: "https://picsum.photos/seed/yt1/600/340",
    channelName: "CodeMaster Pro",
    channelAvatar: "https://picsum.photos/seed/avatar1/48/48",
    views: "1.2M views",
    postedAt: "2 days ago",
    duration: "15:20"
  },
  {
    id: "v2",
    title: "AI Revolution: Exploring Gemini 2.5 Pro Features",
    thumbnail: "https://picsum.photos/seed/yt2/600/340",
    channelName: "Tech Insider",
    channelAvatar: "https://picsum.photos/seed/avatar2/48/48",
    views: "850K views",
    postedAt: "5 hours ago",
    duration: "10:45"
  },
  {
    id: "v3",
    title: "Relaxing Lofi Beats for Coding & Studying",
    thumbnail: "https://picsum.photos/seed/yt3/600/340",
    channelName: "Lofi Girl",
    channelAvatar: "https://picsum.photos/seed/avatar3/48/48",
    views: "10M views",
    postedAt: "1 year ago",
    duration: "1:00:00"
  },
  {
    id: "v4",
    title: "Top 10 Hidden Gem Travel Destinations in 2024",
    thumbnail: "https://picsum.photos/seed/yt4/600/340",
    channelName: "Wanderlust",
    channelAvatar: "https://picsum.photos/seed/avatar4/48/48",
    views: "2.5M views",
    postedAt: "3 weeks ago",
    duration: "12:30"
  },
  {
    id: "v5",
    title: "The Future of Quantum Computing Explained",
    thumbnail: "https://picsum.photos/seed/yt5/600/340",
    channelName: "Science Today",
    channelAvatar: "https://picsum.photos/seed/avatar5/48/48",
    views: "450K views",
    postedAt: "1 day ago",
    duration: "18:15"
  },
  {
    id: "v6",
    title: "Best Street Food in Tokyo - 2024 Guide",
    thumbnail: "https://picsum.photos/seed/yt6/600/340",
    channelName: "Foodie Adventures",
    channelAvatar: "https://picsum.photos/seed/avatar6/48/48",
    views: "3.2M views",
    postedAt: "4 days ago",
    duration: "22:10"
  },
  {
    id: "v7",
    title: "Building a YouTube Clone with Tailwind CSS",
    thumbnail: "https://picsum.photos/seed/yt7/600/340",
    channelName: "Dev Tutorials",
    channelAvatar: "https://picsum.photos/seed/avatar7/48/48",
    views: "120K views",
    postedAt: "12 hours ago",
    duration: "45:30"
  },
  {
    id: "v8",
    title: "The Art of Minimalist Living - My Journey",
    thumbnail: "https://picsum.photos/seed/yt8/600/340",
    channelName: "Less is More",
    channelAvatar: "https://picsum.photos/seed/avatar8/48/48",
    views: "1.1M views",
    postedAt: "2 months ago",
    duration: "08:45"
  }
];
