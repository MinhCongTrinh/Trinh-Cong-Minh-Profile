'use client';

import { useState } from 'react';
import { projects } from '@/lib/data';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Cpu, Code, X, ExternalLink } from 'lucide-react';

type Project = {
    id: string;
    title: string;
    description: string;
    tags: string[];
    slug: string;
    image: string;
    content?: string;
    link?: string;
};

export function ProjectsGrid() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <section id="projects" className="w-full flex flex-col md:scroll-mt-32 items-center pt-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
                className="w-full text-center"
            >
                <h2 className="section-title">Selected Works</h2>
                <p className="section-subtitle">Robotics & Software</p>
                <div className="section-underline" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full items-stretch">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="fancy-card !p-0 flex flex-col group cursor-pointer overflow-hidden relative"
                        onClick={() => setSelectedProject(project as Project)}
                    >
                        <div className="w-full h-[220px] bg-accent relative overflow-hidden">
                            <img 
                                src={project.image} 
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {/* Inner overlay on hover */}
                            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        <div className="p-6 md:p-8 flex flex-col flex-1">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-10 h-10 rounded-full border border-border bg-[#f8f9fa] flex items-center justify-center text-muted">
                                    {project.tags.includes('C++') || project.tags.includes('Software') ? <Code size={18} /> : <Cpu size={18} />}
                                </div>
                                <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                                    <ArrowUpRight size={14} />
                                </div>
                            </div>
                            
                            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-[15px] text-muted font-light leading-relaxed line-clamp-3">
                                {project.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Simple Modal Overlay */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-white/60 backdrop-blur-md"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="bg-white w-full max-w-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-[32px] overflow-hidden flex flex-col relative border border-border"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer shadow-sm border border-border hover:bg-white" onClick={() => setSelectedProject(null)}>
                                <X size={20} className="text-foreground" />
                            </div>
                            
                            <div className="w-full h-[300px] bg-accent relative">
                                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                            </div>

                            <div className="p-8 md:p-10 overflow-y-auto max-h-[50vh]">
                                <h2 className="text-3xl font-bold text-foreground mb-4">{selectedProject.title}</h2>
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {selectedProject.tags.map(t => (
                                        <span key={t} className="px-3 py-1 bg-accent rounded-full text-xs font-semibold text-muted">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <div className="prose prose-slate max-w-none mb-10 text-[16px] font-light leading-relaxed text-muted">
                                    {selectedProject.content ? (
                                        selectedProject.content.split('\n\n').map((p, i) => <p key={i} className="mb-4">{p}</p>)
                                    ) : (
                                        <p>{selectedProject.description}</p>
                                    )}
                                </div>

                                <div className="flex gap-4">
                                    <a 
                                        href={selectedProject.link || '#'} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#1c1f24] text-white font-medium hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-black/5"
                                    >
                                        <ExternalLink size={18} />
                                        Launch Demo
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
