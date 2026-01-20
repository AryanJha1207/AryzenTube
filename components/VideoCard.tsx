
import React from 'react';
import { Video } from '../types';
import { useNavigate } from 'react-router-dom';
import { MoreVertical, CheckCircle2 } from 'lucide-react';

interface VideoCardProps {
  video: Video;
  layout?: 'grid' | 'list';
}

const VideoCard: React.FC<VideoCardProps> = ({ video, layout = 'grid' }) => {
  const navigate = useNavigate();

  if (layout === 'list') {
    return (
      <div 
        onClick={() => navigate(`/video/${video.id}`)}
        className="flex gap-4 cursor-pointer group p-2 rounded-2xl hover:bg-white/5 transition-all"
      >
        <div className="relative flex-none w-44 sm:w-52 aspect-video rounded-xl overflow-hidden bg-zinc-900 border border-white/5">
          <img 
            src={video.thumbnail} 
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <span className="absolute bottom-2 right-2 glass text-white text-[11px] px-2 py-0.5 rounded-lg font-bold">
            {video.duration}
          </span>
        </div>
        <div className="flex flex-col gap-1 py-1 overflow-hidden">
          <h3 className="text-sm font-bold text-white leading-snug line-clamp-2 group-hover:text-indigo-400 transition-colors">
            {video.title}
          </h3>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-xs text-white/50 font-medium group-hover:text-white/80">{video.channelName}</span>
            <CheckCircle2 size={10} className="text-indigo-400" />
          </div>
          <p className="text-[11px] text-white/40 font-medium">
            {video.views} • {video.postedAt}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={() => navigate(`/video/${video.id}`)}
      className="flex flex-col gap-4 cursor-pointer group"
    >
      <div className="relative aspect-video rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 group-hover:border-indigo-500/50 transition-all duration-500 group-hover:shadow-[0_20px_40px_-15px_rgba(99,102,241,0.3)]">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span className="absolute bottom-3 right-3 glass text-white text-xs px-2.5 py-1 rounded-xl font-black tracking-tight border border-white/10 shadow-xl">
          {video.duration}
        </span>
      </div>
      <div className="flex gap-4 px-1">
        <div className="flex-none">
          <div className="w-11 h-11 rounded-2xl overflow-hidden border-2 border-white/5 shadow-lg bg-zinc-800">
            <img src={video.channelAvatar} alt={video.channelName} className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-1 overflow-hidden">
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-base font-bold text-white leading-tight line-clamp-2 group-hover:text-indigo-300 transition-colors">
              {video.title}
            </h3>
            <button className="text-white/40 hover:text-white hover:bg-white/10 rounded-xl p-1.5 transition-all opacity-0 group-hover:opacity-100">
              <MoreVertical size={18} />
            </button>
          </div>
          <div className="flex flex-col text-[13px] font-medium text-white/40">
            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
              <span>{video.channelName}</span>
              <CheckCircle2 size={12} className="text-indigo-500" />
            </div>
            <p className="mt-0.5">{video.views} • {video.postedAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
