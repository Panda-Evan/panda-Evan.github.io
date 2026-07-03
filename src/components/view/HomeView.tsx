import Hero from "./Hero";
import Stats from "./Stats";
import About from "./About";
import Skills from "./Skill";
import Experience from "./Experience";
import Projects from "./Project";
import Hobbies from "./Hobbies";
import Contact from "./Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Hobbies />
      <Contact />
    </main>
  );
}
