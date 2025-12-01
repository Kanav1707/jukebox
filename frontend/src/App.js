import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Disc, Sparkles, Zap, Radio, ExternalLink, X } from 'lucide-react';

function App() {
  const [songName, setSongName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [sentiment, setSentiment] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRecommendations([]);
    setSentiment('');
    setSelectedTrack(null);

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000';
      const response = await fetch(`${apiUrl}/recommend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ song_name: songName, artist_name: artistName }),
      });

      const data = await response.json();
      setSentiment(data.sentiment);
      setRecommendations(data.recommendations);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  const openStreamingLinks = (track) => {
    setSelectedTrack(track);
  };

  const closeStreamingLinks = () => {
    setSelectedTrack(null);
  };

  return (
    <div className="min-h-screen bg-retro-bg text-retro-charcoal flex flex-col items-center p-4 sm:p-8 overflow-hidden relative font-mono selection:bg-retro-orange selection:text-white">
      {/* Vintage Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-retro-orange opacity-10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-retro-teal opacity-10 rounded-full blur-[100px]"></div>
        <div className="absolute top-10 right-10 w-24 h-24 border-4 border-retro-charcoal/10 rounded-full border-dashed animate-spin-slow"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 border-4 border-retro-charcoal/10 rounded-full border-dotted animate-spin-slow" style={{ animationDirection: 'reverse' }}></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 w-full max-w-6xl flex flex-col items-center"
      >
        <header className="flex flex-col items-center mb-12 relative">
          <div className="border-4 border-retro-charcoal p-6 bg-paper-white shadow-retro rotate-[-2deg] mb-6">
            <div className="border-2 border-retro-charcoal p-2">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-retro-orange text-white border-2 border-retro-charcoal rounded-full">
                  <Radio className="w-8 h-8" />
                </div>
                <h1 className="text-5xl md:text-7xl font-display text-retro-charcoal tracking-tighter">
                  JUKEBOX
                </h1>
              </div>
            </div>
          </div>
          <p className="text-retro-teal font-bold tracking-widest uppercase text-sm border-b-2 border-retro-teal pb-1">Analog Soul • Digital Heart</p>
        </header>

        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-paper-white border-4 border-retro-charcoal p-8 shadow-retro relative overflow-hidden group flex flex-col gap-6 rotate-[1deg]"
        >
          <div className="absolute top-2 left-2 w-4 h-4 rounded-full bg-retro-charcoal/20"></div>
          <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-retro-charcoal/20"></div>
          <div className="absolute bottom-2 left-2 w-4 h-4 rounded-full bg-retro-charcoal/20"></div>
          <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-retro-charcoal/20"></div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-retro-charcoal/70">Track Title</label>
              <div className="flex items-center border-b-4 border-retro-charcoal bg-retro-bg/50 px-4 py-3 focus-within:bg-white transition-colors">
                <Disc className="text-retro-orange mr-3" size={20} />
                <input
                  type="text"
                  placeholder="Enter song..."
                  value={songName}
                  onChange={(e) => setSongName(e.target.value)}
                  className="w-full bg-transparent border-none focus:outline-none text-lg font-bold placeholder-retro-charcoal/40 text-retro-charcoal"
                />
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-retro-charcoal/70">Artist</label>
              <div className="flex items-center border-b-4 border-retro-charcoal bg-retro-bg/50 px-4 py-3 focus-within:bg-white transition-colors">
                <Sparkles className="text-retro-teal mr-3" size={20} />
                <input
                  type="text"
                  placeholder="Enter artist..."
                  value={artistName}
                  onChange={(e) => setArtistName(e.target.value)}
                  className="w-full bg-transparent border-none focus:outline-none text-lg font-bold placeholder-retro-charcoal/40 text-retro-charcoal"
                />
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "4px 4px 0px 0px rgba(38, 70, 83, 1)" }}
            whileTap={{ scale: 0.98, boxShadow: "0px 0px 0px 0px rgba(38, 70, 83, 1)", translate: "4px 4px" }}
            type="submit"
            disabled={loading}
            className="w-full bg-retro-charcoal text-paper-white font-bold text-xl py-4 border-2 border-retro-charcoal shadow-retro transition-all duration-200 flex items-center justify-center uppercase tracking-widest hover:bg-retro-teal disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-x-1 disabled:translate-y-1"
          >
            {loading ? (
              <div className="w-6 h-6 border-4 border-paper-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Zap size={24} className="mr-2 fill-current" />
                <span>Spin It</span>
              </>
            )}
          </motion.button>
        </motion.form>

        <AnimatePresence>
          {sentiment && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mt-20 w-full"
            >
              <div className="flex flex-col items-center justify-center mb-16">
                <motion.div
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: -2 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="px-8 py-4 bg-retro-yellow border-4 border-retro-charcoal shadow-retro flex items-center space-x-3 transform -rotate-2"
                >
                  <span className="text-retro-charcoal uppercase text-xs tracking-wider font-bold">Vibe Check:</span>
                  <span className="text-2xl font-display text-retro-charcoal">
                    {sentiment}
                  </span>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 px-4">
                {recommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
                    whileHover={{ y: -10, rotate: index % 2 === 0 ? 2 : -2, scale: 1.02 }}
                    onClick={() => openStreamingLinks(rec)}
                    className="group bg-paper-white p-3 pb-8 border-4 border-retro-charcoal shadow-retro cursor-pointer transition-all duration-300 relative"
                    style={{ transform: `rotate(${index % 2 === 0 ? '1deg' : '-1deg'})` }}
                  >
                    {/* Tape Effect */}
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-retro-bg/80 border-l-2 border-r-2 border-white/50 rotate-1 shadow-sm z-20"></div>

                    <div className="relative aspect-square mb-4 border-2 border-retro-charcoal overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                      <img
                        src={rec.album_cover}
                        alt={`${rec.track_name} cover`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-retro-orange/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 bg-paper-white border-4 border-retro-charcoal rounded-full flex items-center justify-center shadow-retro-hover">
                          <Play fill="#264653" size={24} className="text-retro-charcoal ml-1" />
                        </div>
                      </div>
                    </div>

                    <div className="text-center px-2">
                      <h3 className="text-lg font-bold text-retro-charcoal mb-1 leading-tight font-display truncate">
                        {rec.track_name}
                      </h3>
                      <p className="text-sm text-retro-teal font-bold uppercase tracking-wider truncate">
                        {rec.artist_name}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Streaming Links Modal - Ticket Style */}
        <AnimatePresence>
          {selectedTrack && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-retro-charcoal/80 backdrop-blur-sm"
              onClick={closeStreamingLinks}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20, rotate: -5 }}
                animate={{ scale: 1, y: 0, rotate: 0 }}
                exit={{ scale: 0.9, y: 20, rotate: 5 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-paper-white border-4 border-retro-charcoal p-0 max-w-md w-full relative shadow-[16px_16px_0px_0px_rgba(231,111,81,1)]"
              >
                {/* Ticket Perforation */}
                <div className="absolute -left-2 top-1/2 w-4 h-8 bg-retro-charcoal rounded-r-full transform -translate-y-1/2"></div>
                <div className="absolute -right-2 top-1/2 w-4 h-8 bg-retro-charcoal rounded-l-full transform -translate-y-1/2"></div>

                <div className="p-8 border-b-4 border-dashed border-retro-charcoal/20">
                  <button
                    onClick={closeStreamingLinks}
                    className="absolute top-4 right-4 text-retro-charcoal hover:text-retro-orange transition-colors"
                  >
                    <X size={28} strokeWidth={3} />
                  </button>

                  <div className="flex gap-4 items-center mb-6">
                    <img
                      src={selectedTrack.album_cover}
                      alt={selectedTrack.track_name}
                      className="w-24 h-24 border-2 border-retro-charcoal shadow-retro-hover object-cover grayscale"
                    />
                    <div className="overflow-hidden">
                      <h3 className="text-2xl font-display text-retro-charcoal leading-none mb-2">{selectedTrack.track_name}</h3>
                      <p className="text-retro-teal font-bold uppercase tracking-wider text-sm">{selectedTrack.artist_name}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <a
                      href={selectedTrack.spotify_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between w-full p-4 bg-retro-bg border-2 border-retro-charcoal hover:bg-[#1DB954] hover:text-white hover:border-[#1DB954] transition-all group shadow-retro-hover hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
                    >
                      <span className="font-bold uppercase tracking-wider group-hover:text-white transition-colors">Spotify</span>
                      <ExternalLink size={20} className="group-hover:text-white" />
                    </a>

                    <a
                      href={`https://music.apple.com/us/search?term=${encodeURIComponent(selectedTrack.track_name + ' ' + selectedTrack.artist_name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between w-full p-4 bg-retro-bg border-2 border-retro-charcoal hover:bg-[#FA243C] hover:text-white hover:border-[#FA243C] transition-all group shadow-retro-hover hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
                    >
                      <span className="font-bold uppercase tracking-wider group-hover:text-white transition-colors">Apple Music</span>
                      <ExternalLink size={20} className="group-hover:text-white" />
                    </a>

                    <a
                      href={`https://music.amazon.com/search/${encodeURIComponent(selectedTrack.track_name + ' ' + selectedTrack.artist_name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between w-full p-4 bg-retro-bg border-2 border-retro-charcoal hover:bg-[#00A8E1] hover:text-white hover:border-[#00A8E1] transition-all group shadow-retro-hover hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
                    >
                      <span className="font-bold uppercase tracking-wider group-hover:text-white transition-colors">Amazon Music</span>
                      <ExternalLink size={20} className="group-hover:text-white" />
                    </a>
                  </div>
                </div>
                <div className="bg-retro-charcoal text-paper-white text-center py-2 text-xs font-bold uppercase tracking-[0.2em]">
                  Admit One • Listen Anywhere
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default App;
