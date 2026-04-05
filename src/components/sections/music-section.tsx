'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { siteConfig, music } from '@/lib/data';
import { Play, Pause, Music as MusicIcon, ArrowUpRight } from 'lucide-react';

export function MusicSection() {
    // If no music config exists or no track is set, don't render the section at all
    if (!music || !music.featuredTrack || !music.featuredTrack.src) {
        return null;
    }

    const { featuredTrack, musicTracks } = music;
    const allTracks = [featuredTrack, ...(musicTracks || [])];

    const [isPlaying, setIsPlaying] = useState(false);
    const [activeTrack, setActiveTrack] = useState(allTracks[0]);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(e => console.log("Audio play blocked", e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, activeTrack]);

    const handlePlayPause = (track: any) => {
        if (activeTrack.id === track.id) {
            setIsPlaying(!isPlaying);
        } else {
            setActiveTrack(track);
            setIsPlaying(true);
        }
    };

    const handleEnded = () => {
        setIsPlaying(false);
    };

    return (
        <section id="music" className="w-full flex flex-col md:scroll-mt-32 items-center pt-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
                className="w-full bg-[#1c1f24] rounded-[32px] md:rounded-[48px] p-8 py-16 md:p-16 lg:p-20 relative overflow-hidden shadow-2xl"
            >
                {/* Soft glow effect in background */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
                    
                    {/* LEFT: Featured Info */}
                    <div className="flex flex-col items-start justify-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white/70 tracking-wider mb-8">
                            <MusicIcon size={14} />
                            My Music
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold leading-[1.1] text-white tracking-tight mb-6">
                            {activeTrack.title}
                        </h2>

                        <p className="text-[17px] md:text-lg text-white/60 font-light leading-relaxed max-w-[480px] mb-10">
                            {activeTrack.description}
                        </p>

                        <button 
                            onClick={() => handlePlayPause(activeTrack)}
                            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-black font-bold tracking-wide hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
                        >
                            {isPlaying && activeTrack.id === activeTrack.id ? (
                                <>
                                    <Pause size={18} className="fill-current" />
                                    PAUSE
                                </>
                            ) : (
                                <>
                                    <Play size={18} className="fill-current ml-1" />
                                    LISTEN
                                </>
                            )}
                        </button>
                    </div>

                    {/* RIGHT: Track List */}
                    <div className="flex flex-col gap-4 justify-center">
                        {allTracks.map((track) => {
                            const isCurrent = activeTrack.id === track.id;
                            
                            return (
                                <div 
                                    key={track.id}
                                    onClick={() => handlePlayPause(track)}
                                    className={`group flex items-center justify-between p-5 rounded-2xl border transition-all cursor-pointer ${
                                        isCurrent 
                                            ? 'bg-white/10 border-white/20 shadow-lg' 
                                            : 'bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/10'
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-2 h-2 rounded-full ${isCurrent ? 'bg-primary' : 'bg-transparent'}`} />
                                        <div>
                                            <h4 className="text-white font-semibold text-[16px] mb-1">{track.title}</h4>
                                            <p className="text-white/50 text-[13px] font-light">{track.badge || 'Track'}</p>
                                        </div>
                                    </div>

                                    <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                                        isCurrent && isPlaying 
                                            ? 'border-white text-white bg-white/20' 
                                            : 'border-white/20 text-white/50 group-hover:text-white group-hover:border-white/40'
                                    }`}>
                                        {isCurrent && isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 ml-0.5" />}
                                    </div>
                                </div>
                            );
                        })}

                        {siteConfig.youtube && (
                            <a 
                                href={siteConfig.youtube} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="group flex items-center justify-between p-5 mt-2 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 transition-all cursor-pointer"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-2 h-2 rounded-full bg-white/30" />
                                    <div>
                                        <h4 className="text-white font-semibold text-[16px] mb-1">See Discography</h4>
                                        <p className="text-white/50 text-[13px] font-light">View all tracks on YouTube</p>
                                    </div>
                                </div>
                                <div className="text-white/50 group-hover:text-white transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1">
                                    <ArrowUpRight className="w-5 h-5" />
                                </div>
                            </a>
                        )}
                    </div>

                </div>

                <audio
                    ref={audioRef}
                    src={activeTrack.src}
                    onEnded={handleEnded}
                    preload="none"
                />
            </motion.div>
        </section>
    );
}
