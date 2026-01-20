
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Rocket, TrendingUp, Trophy, Play, Brain, Sparkles, X, Clock, Globe, BarChart3 } from 'lucide-react';
import { generateAILearningPath } from '../services/learningService';
import { LearningPath } from '../types';
import { useNavigate } from 'react-router-dom';

const LearningDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activePath, setActivePath] = useState<LearningPath | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [goal, setGoal] = useState('');
  const [level, setLevel] = useState('Beginner');
  const [dailyTime, setDailyTime] = useState(60);
  const [duration, setDuration] = useState(7);
  const [language, setLanguage] = useState('English');
  const [prioritizeQuality, setPrioritizeQuality] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('activePath');
      if (saved) setActivePath(JSON.parse(saved));
      else setShowModal(true);
    } catch (e) {
      console.error("Failed to load active path", e);
      setShowModal(true);
    }
  }, []);

  const handleGenerate = async () => {
    if (!goal.trim()) return;
    setIsGenerating(true);
    try {
      const path = await generateAILearningPath(goal, level, dailyTime, duration, language, prioritizeQuality);
      setActivePath(path);
      localStorage.setItem('activePath', JSON.stringify(path));
      setShowModal(false);
    } catch (e) {
      console.error("AI Generation Error:", e);
      alert("Failed to curate path. Please check your connection and try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const calculateProgress = () => {
    if (!activePath) return 0;
    try {
      const completed = JSON.parse(localStorage.getItem('completedVideos') || '[]');
      const total = activePath.curriculum.reduce((acc, day) => acc + day.lessons.length, 0);
      if (total === 0) return 0;
      return Math.round((completed.length / total) * 100);
    } catch (e) {
      return 0;
    }
  };

  return (
    <div className="min-h-screen bg-black px-6 py-12 overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
          
          <div className="w-full lg:w-1/3 flex flex-col gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/[0.03] border border-white/10 rounded-[40px] p-8 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-600/10 blur-[60px] rounded-full" />
              <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-6">Learning Pulse</h2>
              <div className="flex items-center gap-6 mb-8">
                <div className="relative w-24 h-24 shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                    <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={276} strokeDashoffset={276 - (276 * calculateProgress() / 100)} className="text-indigo-500 transition-all duration-1000" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center font-black text-xl text-white">
                    {calculateProgress()}%
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">Mastery Goal</p>
                  <p className="text-xl font-black text-white leading-tight truncate">{activePath?.goal || 'Dormant'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <StatCard icon={<TrendingUp size={16} />} label="Streak" value="5 Days" />
                <StatCard icon={<Trophy size={16} />} label="Badges" value="3 Earned" />
              </div>

              <button 
                onClick={() => setShowModal(true)}
                className="w-full mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:shadow-[0_15px_30px_rgba(99,102,241,0.3)] transition-all flex items-center justify-center gap-2"
              >
                <Brain size={16} />
                {activePath ? 'Reconfigure DNA' : 'Initialize Lab'}
              </button>
            </motion.div>

            <div className="bg-white/[0.03] border border-white/10 rounded-[40px] p-8">
              <h3 className="text-xs font-black text-white/20 uppercase tracking-[0.3em] mb-6">Unlocked Relics</h3>
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                <Badge icon="🚀" label="Early Bird" />
                <Badge icon="🧠" label="Fast Learner" />
                <Badge icon="🔥" label="Unstoppable" />
              </div>
            </div>
          </div>

          <div className="flex-1 w-full min-w-0">
            <h1 className="text-4xl font-black text-white tracking-tighter mb-10 italic uppercase">Active Curriculum</h1>
            
            {activePath ? (
              <div className="space-y-12 relative">
                <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gradient-to-b from-indigo-500/50 via-purple-500/20 to-transparent" />
                
                {activePath.curriculum.map((day, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative pl-20"
                  >
                    <div className="absolute left-4 top-2 w-5 h-5 bg-indigo-500 rounded-full border-4 border-black shadow-[0_0_15px_rgba(99,102,241,0.5)] z-10" />
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em]">Day {day.day}</span>
                          <h3 className="text-2xl font-black text-white tracking-tight truncate">{day.theme}</h3>
                        </div>
                        <span className="text-[10px] font-bold text-white/20 uppercase bg-white/[0.05] px-3 py-1 rounded-lg flex items-center gap-2 shrink-0">
                          <Clock size={12} />
                          {day.lessons.reduce((a,b)=>a+b.duration, 0)} min
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {day.lessons.map((lesson) => (
                          <div 
                            key={lesson.id}
                            onClick={() => navigate(`/video/${lesson.videoId}`)}
                            className="bg-white/[0.03] border border-white/5 p-6 rounded-[32px] hover:bg-white/[0.06] hover:border-indigo-500/30 transition-all cursor-pointer group relative overflow-hidden"
                          >
                            <div className="flex justify-between items-start mb-4">
                              <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2 py-1 rounded-md">{lesson.type}</span>
                              <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-white group-hover:bg-indigo-500 group-hover:scale-110 transition-all">
                                <Play size={14} fill="currentColor" />
                              </div>
                            </div>
                            <p className="text-base font-bold text-white group-hover:text-indigo-200 transition-colors line-clamp-2 leading-tight pr-4">{lesson.title}</p>
                            <div className="flex items-center gap-3 mt-4">
                              <div className="flex items-center gap-1.5 text-[10px] text-white/30 font-black uppercase">
                                <Clock size={12} />
                                <span>{lesson.duration} min</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="h-[500px] flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[56px] bg-white/[0.01]">
                <div className="w-20 h-20 bg-white/[0.03] rounded-full flex items-center justify-center mb-8">
                  <Target size={40} className="text-white/10" />
                </div>
                <p className="text-white/30 font-black uppercase tracking-widest text-xs mb-8">System IDLE: Define Learning DNA</p>
                <button 
                  onClick={() => setShowModal(true)}
                  className="bg-indigo-600 px-12 py-5 rounded-[24px] font-black uppercase text-xs tracking-[0.2em] hover:bg-indigo-500 hover:shadow-[0_0_40px_rgba(99,102,241,0.2)] transition-all"
                >
                  Construct AI Path
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isGenerating && setShowModal(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="relative w-full max-w-2xl glass border border-white/10 rounded-[56px] p-8 sm:p-12 overflow-hidden shadow-[0_0_120px_rgba(99,102,241,0.15)] max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              {isGenerating ? (
                <div className="py-24 flex flex-col items-center text-center">
                  <div className="relative mb-12">
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                    >
                      <Brain size={80} className="text-indigo-500" />
                    </motion.div>
                    <Sparkles size={32} className="text-cyan-400 absolute -top-4 -right-4 animate-pulse" />
                  </div>
                  <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-4">Neural Configuration...</h3>
                  <p className="text-white/40 text-sm font-bold uppercase tracking-widest leading-relaxed max-w-[320px]">Scanning high-fidelity channels for peak engagement metrics.</p>
                  <div className="mt-12 w-64 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ repeat: Infinity, duration: 1.2 }} className="h-full w-1/3 bg-indigo-500 shadow-[0_0_15px_#6366f1]" />
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-12">
                    <div className="flex flex-col">
                      <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-none mb-2">Learning Wizard</h2>
                      <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em]">Aryzen Intelligence v4</span>
                    </div>
                    <button onClick={() => setShowModal(false)} className="p-3 hover:bg-white/10 rounded-2xl text-white/20 hover:text-white transition-all"><X size={24} /></button>
                  </div>
                  
                  <div className="space-y-10">
                    <div className="relative">
                      <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-4 block">Target Discipline</label>
                      <div className="relative">
                        <Target className="absolute left-6 top-1/2 -translate-y-1/2 text-white/10" size={20} />
                        <input 
                          value={goal}
                          onChange={(e) => setGoal(e.target.value)}
                          placeholder="What do you want to learn?"
                          className="w-full bg-white/[0.04] border border-white/10 rounded-[28px] pl-16 pr-6 py-5 text-white focus:outline-none focus:border-indigo-500 transition-all font-bold placeholder:text-white/10 text-lg shadow-inner"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div>
                        <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-4 block flex items-center gap-2"><Globe size={12}/> Language</label>
                        <select 
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                          className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none font-bold appearance-none cursor-pointer hover:bg-white/5"
                        >
                          <option className="bg-zinc-900">English</option>
                          <option className="bg-zinc-900">Hindi</option>
                          <option className="bg-zinc-900">Spanish</option>
                          <option className="bg-zinc-900">German</option>
                          <option className="bg-zinc-900">French</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-4 block flex items-center gap-2"><BarChart3 size={12}/> Proficiency</label>
                        <select 
                          value={level}
                          onChange={(e) => setLevel(e.target.value)}
                          className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none font-bold appearance-none cursor-pointer hover:bg-white/5"
                        >
                          <option className="bg-zinc-900">Beginner</option>
                          <option className="bg-zinc-900">Intermediate</option>
                          <option className="bg-zinc-900">Advanced</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div>
                        <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-4 block">Daily Minutes</label>
                        <input 
                          type="number"
                          value={dailyTime}
                          onChange={(e) => setDailyTime(Number(e.target.value))}
                          className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none font-bold shadow-inner"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-4 block">Days to Complete</label>
                        <input 
                          type="number"
                          value={duration}
                          onChange={(e) => setDuration(Number(e.target.value))}
                          className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none font-bold shadow-inner"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-5 rounded-3xl bg-indigo-500/5 border border-indigo-500/10">
                      <button 
                        onClick={() => setPrioritizeQuality(!prioritizeQuality)}
                        className={`w-12 h-6 rounded-full relative transition-all shrink-0 ${prioritizeQuality ? 'bg-indigo-500' : 'bg-white/10'}`}
                      >
                        <motion.div 
                          animate={{ x: prioritizeQuality ? 26 : 2 }}
                          className="w-4 h-4 bg-white rounded-full absolute top-1"
                        />
                      </button>
                      <div>
                        <p className="text-sm font-black text-white italic">Prioritize Peak Quality</p>
                        <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider">Filter by best views, ratings & comments</p>
                      </div>
                    </div>

                    <button 
                      onClick={handleGenerate}
                      disabled={!goal || isGenerating}
                      className="w-full bg-white text-black py-6 rounded-[32px] font-black uppercase tracking-[0.3em] text-sm shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:bg-indigo-500 hover:text-white transition-all disabled:opacity-20 flex items-center justify-center gap-4 active:scale-95"
                    >
                      <Rocket size={20} />
                      Synthesize Curriculum
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const StatCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="bg-white/[0.03] border border-white/5 p-5 rounded-[32px] flex flex-col gap-1 hover:bg-white/[0.05] transition-all">
    <div className="flex items-center gap-2 text-[9px] font-black text-white/20 uppercase tracking-widest">
      <span className="text-indigo-400 shrink-0">{icon}</span>
      <span className="truncate">{label}</span>
    </div>
    <span className="text-xl font-black text-white italic tracking-tight truncate">{value}</span>
  </div>
);

const Badge = ({ icon, label }: { icon: string, label: string }) => (
  <div className="flex-none flex flex-col items-center gap-3 group cursor-help">
    <div className="w-16 h-16 rounded-[28px] bg-white/[0.04] border border-white/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-all group-hover:border-indigo-500/50 shadow-lg group-hover:shadow-indigo-500/20">
      {icon}
    </div>
    <span className="text-[9px] font-black text-white/20 uppercase tracking-widest group-hover:text-white transition-colors">{label}</span>
  </div>
);

export default LearningDashboard;
