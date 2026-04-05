import { Hero } from "@/components/sections/hero";
import { ProjectsGrid } from "@/components/sections/projects-grid";
import { AboutSection } from "@/components/sections/about-section";
import { ResumeSection } from "@/components/sections/resume-section";
import { MusicSection } from "@/components/sections/music-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <main className="max-w-[1000px] mx-auto px-6 sm:px-12 md:px-16 space-y-20 md:space-y-24 flex flex-col items-center">
        <Hero />
        <AboutSection />
        <ProjectsGrid />
        <ResumeSection />
        <MusicSection />
        <ContactSection />
      </main>
    </div>
  );
}
