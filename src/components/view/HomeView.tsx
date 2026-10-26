import Hero from "./Hero";
import Ticker from "./Ticker";
import Projects from "./Project";
import Experience from "./Experience";
import About from "./About";
import Contact from "./Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Ticker />
      <Projects />
      <Experience />
      <About />
      <Contact />
    </main>
  );
}
