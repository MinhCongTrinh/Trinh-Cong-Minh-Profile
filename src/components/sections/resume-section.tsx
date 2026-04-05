'use client';

import { motion } from 'framer-motion';
import { experience, education, skills, awards } from '@/lib/data';

export function ResumeSection() {
    return (
        <section id="resume" className="w-full flex flex-col md:scroll-mt-32 items-center pt-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
                className="w-full text-center"
            >
                <h2 className="section-title">Resume</h2>
                <p className="section-subtitle">My journey so far</p>
                <div className="section-underline" />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 w-full items-start">
                
                {/* EXPERIENCE COLUMN */}
                <div>
                    <h3 className="text-sm font-bold text-muted-foreground tracking-[0.15em] uppercase mb-10">Experience</h3>
                    
                    <div className="relative border-l-2 border-border/60 ml-2.5 pb-4 space-y-12">
                        {experience.map((exp, idx) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                className="relative pl-10"
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-[-6px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#00bfff] ring-4 ring-background" />
                                
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                                    <h4 className="text-[20px] font-semibold text-foreground tracking-tight">{exp.title}</h4>
                                    <span className="text-sm font-mono text-muted whitespace-nowrap">{exp.date}</span>
                                </div>
                                <div className="text-primary font-medium text-[15px] mb-4">{exp.role}</div>

                                {exp.points && (
                                    <ul className="space-y-3">
                                        {exp.points.map((point, i) => (
                                            <li key={i} className="text-[15px] text-muted font-light leading-relaxed flex items-start">
                                                <span className="mr-3 text-muted-foreground mt-1.5 w-1 h-1 bg-muted-foreground rounded-full flex-shrink-0" />
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* EDUCATION & SKILLS COLUMN */}
                <div className="space-y-12">
                    <div>
                        <h3 className="text-sm font-bold text-muted-foreground tracking-[0.15em] uppercase mb-10">Education</h3>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="fancy-card"
                        >
                            <h4 className="text-[20px] font-semibold text-foreground mb-2">{education.school}</h4>
                            <p className="text-sm text-muted font-mono mb-6">{education.date}</p>
                            
                            {education.stats && (
                                <ul className="space-y-3">
                                    {education.stats.map((stat, i) => (
                                        <li key={i} className="text-[15px] text-muted font-light leading-relaxed">
                                            {stat}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </motion.div>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-muted-foreground tracking-[0.15em] uppercase mb-10">Awards</h3>
                        <div className="flex flex-col gap-4">
                            {awards.map((award, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                                    <span className="text-[15px] text-foreground font-medium">{award}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-muted-foreground tracking-[0.15em] uppercase mb-10">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, i) => (
                                <span key={i} className="px-4 py-2 bg-white border border-border shadow-sm rounded-full text-sm font-medium text-muted">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
