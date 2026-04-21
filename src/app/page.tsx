import Sidebar from "@/components/Sidebar";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Research from "@/components/sections/Research";
import Academics from "@/components/sections/Academics";
import Contact from "@/components/sections/Contact";
import InkDivider from "@/components/InkDivider";

export default function Home() {
  return (
    <div className="flex w-full min-h-screen">
      {/* Sidebar spacer */}
      <div className="hidden lg:block w-20 shrink-0">
        <Sidebar />
      </div>
      
      {/* Main Content Area */}
      <main className="flex-1 w-full min-h-screen bg-transparent relative overflow-hidden">
        <Hero />
        <InkDivider />
        <Projects />
        <InkDivider />
        <Research />
        <InkDivider />
        <Academics />
        <InkDivider />
        <Contact />
      </main>
    </div>
  );
}
