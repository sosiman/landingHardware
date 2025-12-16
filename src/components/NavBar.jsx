import { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, LogOut, User, Star, ArrowUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

const NavBar = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, signOut, favorites } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-40 bg-black/30 backdrop-blur-md border-b border-white/10"
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-2xl"
              >
                🤖
              </motion.div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                IA Tools
              </h1>
            </div>

            {/* UP FAST Button - Center */}
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg shadow-lg hover:shadow-cyan-500/50 transition-all duration-200"
            >
              <ArrowUp size={16} className="animate-bounce" />
              <span className="text-sm font-bold">UP FAST</span>
            </motion.button>

            {/* User Section */}
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  {/* Favoritos Count */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500/10 rounded-lg border border-yellow-500/20"
                  >
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-sm text-yellow-400 font-medium">
                      {favorites.length}
                    </span>
                  </motion.div>

                  {/* User Info */}
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="User"
                        className="w-6 h-6 rounded-full"
                      />
                    ) : (
                      <User size={16} className="text-gray-400" />
                    )}
                    <span className="text-sm text-gray-300 max-w-[150px] truncate">
                      {user.displayName || user.email}
                    </span>
                  </div>

                  {/* Logout Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSignOut}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg border border-red-500/20 transition-all duration-200"
                  >
                    <LogOut size={16} />
                    <span className="text-sm font-medium">Salir</span>
                  </motion.button>
                </>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all duration-200"
                >
                  <LogIn size={16} />
                  <span className="text-sm font-medium">Iniciar Sesión</span>
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default NavBar;
