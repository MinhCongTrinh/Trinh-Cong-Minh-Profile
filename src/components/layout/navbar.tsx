'use client';

import Link from 'next/link';
import { Github, Youtube, Music, Menu, X, Cpu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig, music, about_details, projects, experience, education, skills, awards, contact_link } from '@/lib/data';
import { ThemeToggle } from './theme-toggle';

export function Navbar() {
    // Dynamically build navItems based on config
    const navItems: { name: string; href: string }[] = [];
    
    if (about_details && about_details.length > 0) {
        navItems.push({ name: 'About', href: '#about' });
    }
    if (projects && projects.length > 0) {
        navItems.push({ name: 'Projects', href: '#projects' });
    }
    
    const hasResume = (experience && experience.length > 0) || 
                      (education && Object.keys(education).length > 0) || 
                      (skills && skills.length > 0) || 
                      (awards && awards.length > 0);
    if (hasResume) {
        navItems.push({ name: 'Resume', href: '#resume' });
    }

    // Check if music config is valid
    const hasMusic = music && (music as any).featuredTrack && (music as any).featuredTrack.src;
    if (hasMusic) {
        navItems.push({ name: 'Music', href: '#music' });
    }
    
    if (contact_link) {
        navItems.push({ name: 'Contact', href: '#contact' });
    }
    
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-20% 0px -80% 0px' }
        );

        navItems.forEach(({ href }) => {
            const section = document.querySelector(href);
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="max-w-[1200px] mx-auto px-6 h-20">
                <div className="flex items-center justify-between h-full">
                    
                    <div className="flex items-center gap-3">
                        <Cpu className="w-6 h-6 text-[#00bfff]" />
                        <Link href="/" className="font-bold text-xl text-foreground tracking-tight hover:opacity-80 transition-opacity">
                            {siteConfig.name ? `${siteConfig.name} Portfolio` : "Portfolio"}
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`text-[15px] font-medium transition-colors ${
                                    activeSection === item.href.substring(1)
                                        ? 'text-foreground font-semibold'
                                        : 'text-muted hover:text-foreground'
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-5 text-muted">
                        {siteConfig.github && (
                            <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors"><Github size={18} /></a>
                        )}
                        {siteConfig.youtube && (
                            <a href={siteConfig.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors"><Youtube size={20} /></a>
                        )}
                        {hasMusic && (
                            <a href="#music" className="hover:text-foreground transition-colors"><Music size={18} /></a>
                        )}
                        <ThemeToggle />
                    </div>

                    <div className="md:hidden flex items-center gap-4">
                        <ThemeToggle />
                        <button onClick={() => setIsOpen(!isOpen)} className="text-foreground p-2">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-black/5 overflow-hidden"
                    >
                        <div className="px-6 py-4 space-y-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="block text-lg font-medium text-foreground"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
