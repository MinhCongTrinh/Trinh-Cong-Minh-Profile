'use client';

import { motion } from 'framer-motion';
import { about_details } from '@/lib/data';
import * as Icons from 'lucide-react';

export function AboutSection() {
    return (
        <section id="about" className="w-full flex md:scroll-mt-32 items-center flex-col pt-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
                className="w-full text-center"
            >
                <h2 className="section-title">About</h2>
                <p className="section-subtitle">A bit about me</p>
                <div className="section-underline" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full items-stretch">
                {about_details.map((detail, idx) => {
                    const IconComponent = (Icons as any)[detail.icon] || Icons.Code;
                    
                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="fancy-card flex flex-col h-full"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-[#e6f9fc] flex items-center justify-center text-primary">
                                    <IconComponent className="w-6 h-6" />
                                </div>
                                <h3 className="text-[22px] font-semibold text-foreground tracking-tight">{detail.title}</h3>
                            </div>

                            <div className="flex-1">
                                {detail.type === 'text' && detail.content && (
                                    <p className="text-[16px] text-muted leading-relaxed font-light">
                                        {detail.content}
                                    </p>
                                )}
                                
                                {detail.type === 'list' && detail.items && (
                                    <ul className="space-y-4">
                                        {detail.items.map((item: any, i: number) => (
                                            <li key={i} className="flex flex-col relative pl-4">
                                                <div className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#00bfff]" />
                                                <span className="font-semibold text-foreground mb-1">{item.title}:</span>
                                                <span className="text-[15px] text-muted font-light leading-relaxed">{item.description}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
