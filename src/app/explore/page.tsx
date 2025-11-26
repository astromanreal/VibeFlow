
import Link from 'next/link';
import { Heart, BrainCircuit, Notebook, Lightbulb, Waves, Compass, HeartPulse, Recycle, Route, LifeBuoy, Users } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Explore Healing Tools | VibeFlow Therapy App',
  description: 'Discover a complete toolkit for your mental and emotional well-being, including affirmations, therapy paths, mood tracking, journaling, and more.',
  openGraph: {
    title: 'Explore All Healing Tools | VibeFlow',
    description: 'Browse all features available in the VibeFlow therapy app.',
    images: [{ url: 'https://placehold.co/1200x630.png', alt: 'A compass icon representing exploration and discovery of healing tools' }],
  },
};

const featureLinks = [
  {
    href: "/affirmations",
    icon: Heart,
    title: "Affirmations",
    description: "Reshape thought patterns with powerful, positive statements.",
  },
  {
    href: "/therapy-paths",
    icon: Route,
    title: "Therapy Paths",
    description: "Follow structured programs for challenges like anxiety and healing.",
  },
  {
    href: "/mood-tracker",
    icon: HeartPulse,
    title: "Mood Tracker",
    description: "Track your moods to understand your emotional landscape.",
  },
   {
    href: "/cbt-thought-record",
    icon: Recycle,
    title: "Thought Record (CBT)",
    description: "Use CBT to challenge and reframe unhelpful thoughts.",
  },
  {
    href: "/journal",
    icon: Notebook,
    title: "Journal",
    description: "A private, secure space for your thoughts and reflections.",
  },
  {
    href: "/manifestation",
    icon: Lightbulb,
    title: "Intention Setting",
    description: "Set intentions and align with your personal growth goals.",
  },
  {
    href: "/meditation",
    icon: Waves,
    title: "Meditation",
    description: "Calm your mind with guided meditations for stress and sleep.",
  },
  {
    href: "/support-circles",
    icon: Users,
    title: "Support Circles",
    description: "Find anonymous support and connection in peer groups."
  },
   {
    href: "/crisis-support",
    icon: LifeBuoy,
    title: "Crisis Support",
    description: "Access immediate tools for calm and safety in moments of distress.",
  }
];

export default function ExplorePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="text-center space-y-2 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary flex items-center justify-center gap-3">
          <Compass className="w-10 h-10 text-accent" />
          Your Healing Toolkit
        </h1>
        <p className="text-lg md:text-xl text-foreground/80">
          A suite of self-therapy tools designed for your mental and emotional well-being.
        </p>
      </header>
      
      <section className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureLinks.sort((a,b) => a.title.localeCompare(b.title)).map((link, index) => (
            <Link 
              href={link.href} 
              key={link.href} 
              passHref 
              className="block"
            >
              <div 
                className="group bg-card/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-primary/20 border border-border/20 hover:border-primary/40 transition-all duration-300 ease-in-out transform hover:-translate-y-2 h-full flex flex-col text-center items-center p-8 hover:rotate-1"
              >
                <div className="mb-4 p-4 rounded-full bg-primary/10 group-hover:bg-accent/10 transition-colors duration-300 ease-in-out transform group-hover:scale-110 group-hover:rotate-6">
                  <link.icon className="w-10 h-10 text-primary group-hover:text-accent transition-colors duration-300 ease-in-out" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-accent transition-colors">{link.title}</h3>
                <p className="text-sm text-muted-foreground flex-grow">{link.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
