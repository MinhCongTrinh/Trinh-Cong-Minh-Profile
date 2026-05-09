import { siteConfig, about_details, projects, experience, education, skills, awards, contact_link } from '@/lib/data';
import { Cpu } from 'lucide-react';

export function Footer() {
    const hasResume = (experience && experience.length > 0) || 
                      (education && Object.keys(education).length > 0) || 
                      (awards && awards.length > 0) || 
                      (skills && skills.length > 0);

    return (
        <footer className="w-full bg-white border-t border-border mt-20">
            <div className="max-w-[1000px] mx-auto py-8 px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted">
                <div className="flex items-center gap-2 font-medium">
                    <Cpu className="w-4 h-4 text-[#00bfff]" />
                    <span>© {new Date().getFullYear()} {siteConfig.name || "Portfolio"}. All rights reserved.</span>
                </div>
                
                <div className="flex flex-wrap justify-center gap-6">
                    {about_details && about_details.length > 0 && <a href="#about" className="hover:text-foreground transition-colors">About</a>}
                    {projects && projects.length > 0 && <a href="#projects" className="hover:text-foreground transition-colors">Projects</a>}
                    {hasResume && <a href="#resume" className="hover:text-foreground transition-colors">Resume</a>}
                    {contact_link && <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>}
                </div>
            </div>
        </footer>
    );
}
