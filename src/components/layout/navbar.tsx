'use client';

import Link from 'next/link';
import { Github, Youtube, Music, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/lib/data';
import { ThemeToggle } from './theme-toggle';

const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Resume', href: '#resume' },
    { name: 'Music', href: '#music' },
    { name: 'Contact', href: '#contact' },
];

export function Navbar() {
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
                        <div className="w-3.5 h-3.5 rounded-full bg-[#00bfff]" />
                        <Link href="/" className="font-bold text-xl text-foreground tracking-tight hover:opacity-80 transition-opacity">
                            {siteConfig.name}
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
                        <a href="#music" className="hover:text-foreground transition-colors"><Music size={18} /></a>
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
