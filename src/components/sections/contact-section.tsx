'use client';

import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { contact_link } from '@/lib/data';

export function ContactSection() {
    return (
        <section id="contact" className="w-full flex flex-col md:scroll-mt-32 items-center pt-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
                className="w-full text-center"
            >
                <h2 className="section-title">Let's Talk</h2>
                <p className="section-subtitle">Collaborations, questions, or just want to chat about robots</p>
                <div className="section-underline" />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="fancy-card w-full max-w-[600px] border border-border bg-white"
            >
                <div className="flex flex-col gap-6">
                    <div>
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full h-14 px-5 rounded-2xl border border-border bg-transparent focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full h-14 px-5 rounded-2xl border border-border bg-transparent focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                        />
                    </div>
                    <div>
                        <textarea
                            placeholder="Message"
                            rows={5}
                            className="w-full p-5 rounded-2xl border border-border bg-transparent focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none resize-none"
                        />
                    </div>
                    <a
                        href={contact_link || "mailto:"}
                        className="w-full h-[56px] mt-2 bg-[#1c1f24] text-white rounded-2xl font-bold tracking-wide flex items-center justify-center gap-2 hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md"
                    >
                        Email Me
                        <Mail className="w-4 h-4 ml-1" />
                    </a>
                </div>
            </motion.div>
        </section>
    );
}
