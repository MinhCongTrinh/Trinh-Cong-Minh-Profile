'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { siteConfig } from '@/lib/data';

export function Hero() {
    return (
        <section className="w-full relative py-12 md:py-20 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex-1 flex flex-col items-start w-full"
            >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-white dark:bg-card text-xs font-semibold text-muted tracking-wider mb-8 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-[#00bfff]" />
                    {siteConfig.location.toUpperCase()} — {siteConfig.company.toUpperCase()}
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-foreground tracking-tight mb-6">
                    Hi, I'm {siteConfig.name}.<br />
                    <span className="primary-gradient-text">I design & build things.</span>
                </h1>

                <p className="text-[17px] md:text-lg text-muted font-light leading-relaxed max-w-[480px] mb-10">
                    {siteConfig.bio}
                </p>

                <a 
                    href="#projects"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#1c1f24] text-white font-medium hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-black/5"
                >
                    See Selected Works
                    <ArrowRight size={18} />
                </a>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full md:w-[45%] aspect-[4/3] md:aspect-square lg:aspect-[4/3] relative rounded-[32px] overflow-hidden shadow-2xl border-[4px] border-white"
            >
                <img 
                    src={siteConfig.avatar || "/placeholder.svg?height=800&width=800"} 
                    alt={siteConfig.name}
                    className="w-full h-full object-cover object-center bg-accent"
                />
            </motion.div>
        </section>
    );
}
