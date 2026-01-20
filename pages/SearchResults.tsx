
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { searchVideosAI } from '../services/geminiService';
import { Video as VideoType } from '../types';
import { MoreVertical, Filter } from 'lucide-react';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<VideoType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      const data = await searchVideosAI(query);
      setResults(data);
      setIsLoading(false);
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  return (
    <div className="max-w-[1100px] mx-auto px-4 py-4">
      <div className="flex items-center justify-between mb-4 border-b border-[#303030] pb-2">
        <button className="flex items-center gap-2 hover:bg-[#272727] px-3 py-1.5 rounded-full text-white font-medium">
          <Filter size={20} />
          <span>Filters</span>
        </button>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col sm:flex-row gap-4 animate-pulse">
              <div className="w-full sm:w-[360px] aspect-video bg-[#272727] rounded-xl" />
              <div className="flex-1 space-y-4 py-1">
                <div className="h-5 bg-[#272727] rounded w-3/4" />
                <div className="h-3 bg-[#272727] rounded w-1/4" />
                <div className="h-4 w-8 rounded-full bg-[#272727]" />
                <div className="h-3 bg-[#272727] rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : results.length > 0 ? (
        <div className="flex flex-col gap-8">
          {results.map((video) => (
            <div 
              key={video.id} 
              onClick={() => navigate(`/video/${video.id}`)}
              className="flex flex-col sm:flex-row gap-4 cursor-pointer group"
            >
              <div className="relative flex-none w-full sm:w-[360px] aspect-video rounded-xl overflow-hidden bg-zinc-800">
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-[12px] px-1.5 rounded font-medium">
                  {video.duration}
                </span>
              </div>
              <div className="flex flex-col gap-2 py-1 overflow-hidden">
                <div className="flex justify-between gap-2">
                  <h3 className="text-lg font-bold text-white leading-tight line-clamp-2">
                    {video.title}
                  </h3>
                  <button className="text-gray-400 hover:text-white">
                    <MoreVertical size={20} />
                  </button>
                </div>
                <p className="text-xs text-gray-400">{video.views} • {video.postedAt}</p>
                <div className="flex items-center gap-2 my-2 hover:text-white transition-colors">
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-zinc-700">
                    <img src={video.channelAvatar} alt={video.channelName} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xs text-gray-400 hover:text-white">{video.channelName}</span>
                </div>
                <p className="text-xs text-gray-400 line-clamp-2">
                  {video.description}
                </p>
                <div className="mt-2 inline-block bg-[#272727] text-[10px] text-white px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                  New
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-400">No results found for "{query}". Try searching for "React tips" or "Gemini AI".</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
