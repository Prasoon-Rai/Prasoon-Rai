import { createFileRoute } from "@tanstack/react-router";
import { CustomCursor } from "@/components/CustomCursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import { TypeListener } from "@/components/TypeListener";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prasoon Rai — Developer & Maker" },
      {
        name: "description",
        content:
          "Portfolio of Prasoon Rai — a developer building odd, opinionated, very-much-not-boring software. Open source projects, contact, and more.",
      },
      { property: "og:title", content: "Prasoon Rai — Developer & Maker" },
      {
        property: "og:description",
        content: "Portfolio of Prasoon Rai — developer, maker, ship-it enthusiast.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <TypeListener />
      <main className="relative">
        <Hero />
        <Marquee items={["Rust", "C / C++", "Python", "Pytorch", "Raylib"]} />
        <About />
        <div className="relative overflow-hidden border-y-2 border-foreground bg-warm py-4 text-background">
          <div className="flex animate-marquee whitespace-nowrap font-mono text-xs uppercase tracking-[0.3em]">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex">
                {["Lowkey chill", "hit me up on instagram", "Hope future would be cool", "Hope ray would be successful", "yellow #FEE500 forever"].map((t, i) => (
                  <span key={i} className="mx-6">— {t}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <Projects />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
