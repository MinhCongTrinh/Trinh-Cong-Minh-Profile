import { siteConfig } from '@/lib/data';

export function Footer() {
    return (
        <footer className="w-full bg-white border-t border-border mt-20">
            <div className="max-w-[1000px] mx-auto py-8 px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted">
                <div className="flex items-center gap-2 font-medium">
                    <div className="w-2 h-2 rounded-full bg-[#00bfff]" />
                    <span>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</span>
                </div>
                
                <div className="flex flex-wrap justify-center gap-6">
                    <a href="#about" className="hover:text-foreground transition-colors">About</a>
                    <a href="#projects" className="hover:text-foreground transition-colors">Projects</a>
                    <a href="#resume" className="hover:text-foreground transition-colors">Resume</a>
                    <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
                </div>
            </div>
        </footer>
    );
}
