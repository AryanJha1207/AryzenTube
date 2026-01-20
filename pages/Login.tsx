
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Mail } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    // Simulate Google OAuth
    setTimeout(() => {
      const mockUser = {
        id: 'u1',
        name: 'Aryzen Admin',
        email: 'admin@aryzen.io',
        avatar: 'https://picsum.photos/seed/admin/96/96',
        isPremium: true
      };
      localStorage.setItem('user', JSON.stringify(mockUser));
      setIsLoading(false);
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass border border-white/10 rounded-[48px] p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] relative z-10"
      >
        <div className="flex flex-col items-center text-center mb-12">
          <div className="bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-3xl p-4 shadow-2xl shadow-indigo-500/20 mb-8">
            <Sparkles size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-black text-white italic tracking-tighter mb-2">ARYZEN PRO</h1>
          <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-[10px]">Quantum Stream Interface</p>
        </div>

        <div className="space-y-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full h-16 bg-white text-black rounded-[24px] flex items-center justify-center gap-4 font-black uppercase tracking-widest text-xs relative overflow-hidden group shadow-xl"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            ) : (
              <>
                <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" className="w-6 h-6" />
                <span>Continue with Google</span>
              </>
            )}
          </motion.button>

          <button className="w-full h-16 bg-white/[0.05] border border-white/10 text-white/40 rounded-[24px] flex items-center justify-center gap-4 font-black uppercase tracking-widest text-xs hover:bg-white/[0.08] hover:text-white transition-all">
            <Mail size={18} />
            <span>Identity via Email</span>
          </button>
        </div>

        <div className="mt-12 flex flex-col items-center gap-6">
          <div className="flex items-center gap-3 text-white/20">
            <ShieldCheck size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Encrypted Authentication</span>
          </div>
          <p className="text-[10px] text-white/10 leading-relaxed text-center font-bold">
            By accessing the lab, you consent to our <br/> 
            <span className="text-indigo-400/50">Neural Privacy Protocol</span> & <span className="text-indigo-400/50">Service Algorithms</span>.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
