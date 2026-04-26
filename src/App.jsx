import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Gamepad2, LayoutGrid, X, Maximize2, Sparkles, Clock, Star, TrendingUp, Home, Info, HelpCircle } from 'lucide-react';
import gamesData from './games.json';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeGame, setActiveGame] = useState(null);

  const categories = useMemo(() => {
    return ['All', ...new Set(gamesData.map(g => g.category))];
  }, []);

  const filteredGames = useMemo(() => {
    return gamesData.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans overflow-x-hidden">
      {/* Top Navigation */}
      <nav className="h-16 border-b border-zinc-800 flex items-center justify-between px-6 bg-zinc-900/50 sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-lg select-none">N</div>
          <span className="text-xl font-bold tracking-tight uppercase hidden sm:inline">Nexus<span className="text-indigo-500">Games</span></span>
        </div>
        
        <div className="flex-1 max-w-md mx-6 md:mx-12">
          <div className="relative group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-zinc-500 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder="Search 500+ unblocked games..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-800 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 text-zinc-300 placeholder:text-zinc-500 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button className="hidden md:block px-4 py-1.5 rounded-md bg-zinc-800 text-[10px] font-bold tracking-widest hover:bg-zinc-700 transition-colors uppercase">Categories</button>
          <button className="px-4 py-1.5 rounded-md bg-indigo-600 text-[10px] font-bold tracking-widest hover:bg-indigo-500 transition-colors uppercase">Discord</button>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Rail */}
        <aside className="w-16 md:w-20 border-r border-zinc-800 flex flex-col items-center py-8 gap-8 bg-zinc-950 flex-shrink-0">
          <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-xl cursor-not-allowed">
            <Home className="w-6 h-6" />
          </div>
          <div className="p-3 text-zinc-500 hover:text-zinc-300 cursor-pointer transition-colors">
            <Star className="w-6 h-6" />
          </div>
          <div className="p-3 text-zinc-500 hover:text-zinc-300 cursor-pointer transition-colors">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div className="p-3 text-zinc-500 hover:text-zinc-300 cursor-pointer transition-colors">
             <HelpCircle className="w-6 h-6" />
          </div>
        </aside>

        {/* Main Bento Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto h-[calc(100vh-4rem)] custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Featured Section (Bento Style) */}
            {selectedCategory === 'All' && !searchQuery && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Large Featured Card */}
                <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 min-h-[300px]">
                  <img 
                    src={gamesData[0].thumbnail} 
                    alt="Featured" 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/40 via-transparent to-black/90 z-10"></div>
                  <div className="absolute bottom-0 left-0 p-6 md:p-8 z-20 w-full">
                    <span className="px-2 py-1 bg-indigo-500 text-[10px] font-bold rounded uppercase tracking-wider mb-3 inline-block">Trending Now</span>
                    <h2 className="text-3xl md:text-5xl font-black uppercase mb-2 tracking-tighter leading-none">{gamesData[0].title}</h2>
                    <p className="text-zinc-400 text-sm max-w-xs mb-6 line-clamp-2 md:line-clamp-none">{gamesData[0].description}</p>
                    <button 
                      onClick={() => setActiveGame(gamesData[0])}
                      className="px-8 py-3 bg-white text-black font-bold rounded-xl text-sm hover:bg-zinc-200 transition-colors uppercase tracking-tight shadow-xl shadow-white/10"
                    >
                      Play Now
                    </button>
                  </div>
                </div>

                {/* Side Grid 1 */}
                <div className="md:col-span-1 border border-zinc-800 bg-zinc-900 p-6 rounded-3xl flex flex-col justify-between hover:bg-zinc-800/80 transition-colors cursor-pointer group">
                  <div>
                    <h3 className="text-lg font-bold uppercase tracking-tight">Recent Games</h3>
                    <p className="text-xs text-zinc-500 mt-1 uppercase tracking-widest font-medium">Continue Playing</p>
                  </div>
                  <div className="flex justify-end mt-4">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xl group-hover:bg-indigo-500 group-hover:border-indigo-400 transition-all duration-300">↗</div>
                  </div>
                </div>

                {/* Side Grid 2 (Premium Accent) */}
                <div className="md:col-span-1 border border-zinc-800 bg-indigo-600 p-6 rounded-3xl flex flex-col justify-between text-white shadow-xl shadow-indigo-600/20 group cursor-pointer">
                  <div>
                    <h3 className="text-lg font-bold italic uppercase tracking-tighter">Premium</h3>
                    <p className="text-xs text-indigo-100 mt-1 font-medium">No Ads Forever</p>
                  </div>
                  <div className="text-xs font-black underline underline-offset-4 cursor-pointer uppercase tracking-widest group-hover:text-zinc-200 transition-colors">Learn More</div>
                </div>

                {/* Center Stat 1 */}
                <div className="md:col-span-1 border border-zinc-800 bg-zinc-900 rounded-3xl p-6 flex flex-col items-center justify-center text-center">
                  <div className="text-4xl font-black text-indigo-500 tracking-tighter leading-none">{gamesData.length}</div>
                  <div className="text-[10px] uppercase text-zinc-500 font-bold mt-2 tracking-widest leading-tight">Games Online</div>
                </div>

                {/* Center Grid Categories */}
                <div className="md:col-span-1 border border-zinc-800 bg-zinc-950 p-3 rounded-3xl grid grid-cols-2 gap-2">
                  {categories.slice(1, 5).map(cat => (
                    <div 
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className="bg-zinc-900 rounded-xl flex items-center justify-center text-[9px] font-bold uppercase hover:bg-indigo-600 transition-all cursor-pointer p-2 text-zinc-400 hover:text-white"
                    >
                      {cat}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Games Grid Section */}
            <div>
              <div className="flex items-center justify-between mb-6 px-2">
                <div className="flex items-center gap-3">
                  <LayoutGrid className="w-5 h-5 text-indigo-500" />
                  <h2 className="text-xl font-bold uppercase tracking-tight">
                    {searchQuery ? `Results for "${searchQuery}"` : selectedCategory === 'All' ? 'All Games' : `${selectedCategory} Games`}
                  </h2>
                </div>
                <div className="flex gap-2">
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-bold px-3 py-1.5 focus:ring-1 focus:ring-indigo-500 outline-none uppercase tracking-wide cursor-pointer"
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                <AnimatePresence mode="popLayout">
                  {filteredGames.map((game) => (
                    <motion.div
                      key={game.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ y: -4 }}
                      onClick={() => setActiveGame(game)}
                      className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-3 group cursor-pointer hover:border-zinc-700 transition-all"
                    >
                      <div className="w-full aspect-video bg-zinc-800 rounded-xl mb-3 overflow-hidden">
                        <img 
                          src={game.thumbnail} 
                          alt={game.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <h3 className="text-xs font-bold truncate uppercase tracking-tight group-hover:text-indigo-400 transition-colors">{game.title}</h3>
                      <p className="text-[9px] text-zinc-500 uppercase tracking-widest mt-1 font-bold">{game.category}</p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {filteredGames.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-zinc-600">
                  <Gamepad2 className="w-12 h-12 mb-2 opacity-20" />
                  <p className="font-bold uppercase tracking-widest text-xs">No games found</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Footer Area */}
          <footer className="mt-12 pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center gap-4 text-[10px] text-zinc-600 justify-between">
            <div className="flex gap-6 uppercase font-bold tracking-widest">
              <span className="hover:text-zinc-400 cursor-pointer">Terms</span>
              <span className="hover:text-zinc-400 cursor-pointer">Privacy</span>
              <span className="hover:text-zinc-400 cursor-pointer">DMCA</span>
              <span className="hover:text-zinc-400 cursor-pointer">Support</span>
            </div>
            <div className="uppercase font-bold tracking-widest">© 2026 NEXUS HUB — HANDCRAFTED WEB EXPERIENCE</div>
          </footer>
        </main>
      </div>

      {/* Fullscreen Overlay Game Modal */}
      <AnimatePresence>
        {activeGame && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="fixed inset-0 z-[100] flex flex-col bg-zinc-950"
          >
            <div className="h-16 border-b border-zinc-800 flex items-center justify-between px-6 bg-zinc-900/80 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setActiveGame(null)}
                  className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="h-6 w-[1px] bg-zinc-800" />
                <h2 className="text-sm font-black uppercase tracking-tight">{activeGame.title}</h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden md:flex items-center gap-2 px-3 py-1 bg-zinc-800 rounded-full border border-zinc-700 text-[9px] font-bold uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> 1.2k Active
                </span>
                <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-white">
                  <Maximize2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 bg-black overflow-hidden flex items-center justify-center p-2 md:p-6">
              <div className="w-full h-full max-w-7xl max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/10 border border-zinc-800 relative group bg-zinc-900">
                 <iframe 
                   src={activeGame.url}
                   className="w-full h-full border-none"
                   title={activeGame.title}
                   allow="fullscreen; autoplay; encrypted-media"
                 />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #27272a;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #3f3f46;
        }
      `}} />
    </div>
  );
}
