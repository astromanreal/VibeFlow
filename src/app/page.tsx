
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, BrainCircuit, Notebook, Lightbulb, Quote, HeartHandshake, Waves, Sparkles, Smile, Meh, Frown, Leaf, Zap, HeartPulse, Route, Wind, Moon, Users, Activity, Sun } from "lucide-react";
import AffirmationCard from '@/components/affirmation-card';
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from 'react';
import type { Affirmation } from '@/services/affirmations';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';


const dailyAffirmation: Affirmation = {
  id: "daily_001",
  category: "Presence",
  text: "I am grounded and centered in this present moment.",
};

const featureLinks = [
  { href: "/affirmations", icon: Heart, title: "Affirmations", description: "Reshape thought patterns with powerful statements." },
  { href: "/therapy-paths", icon: Route, title: "Therapy Paths", description: "Follow structured, evidence-based healing programs." },
  { href: "/journal", icon: Notebook, title: "Journal", description: "A safe space to reflect, release, and find clarity." },
  { href: "/mood-tracker", icon: HeartPulse, title: "Mood Tracker", description: "Track your emotional state to build self-awareness." },
  { href: "/meditation", icon: Waves, title: "Meditation", description: "Guided peace for sleep, stress, and inner calm." },
  { href: "/manifestation", icon: Lightbulb, title: "Intention Setting", description: "Align your actions with your personal growth goals." },
  { href: "/meditation#breathing-exercises", icon: Wind, title: "Breathwork", description: "Instant physiological tools to regulate your nervous system." },
  { href: "/meditation#sound-baths", icon: Moon, title: "Sleep Sanctuary", description: "Sleep stories and soundscapes for deep, restorative rest." },
  { href: "/support-circles", icon: Users, title: "Community Circles", description: "Connect anonymously with others on similar healing journeys." },
  { href: "/cbt-thought-record", icon: BrainCircuit, title: "Thought Reframing", description: "Challenge negative thought patterns with CBT techniques." },
  { href: "#", icon: Activity, title: "Somatic Release", description: "Release stored tension and trauma through body movement." },
  { href: "/journal", icon: Sun, title: "Gratitude Garden", description: "Cultivate joy by logging three small wins every day." },
];

const visualAffirmationImage = {
  src: "https://drive.google.com/uc?export=view&id=1yh5SYwQdE4P3ZbLjVX6oawqYu9X7d9qT",
  alt: "Calm sunset over a lake with the text 'I cherish the beauty of this moment' overlayed. A visual affirmation for presence.",
  text: "I cherish the beauty of this moment.",
  hint: "nature sunset"
};

const positiveAdjectives = [
  "Radiant", "Joyful", "Peaceful", "Hopeful", "Bright", "Serene", "Sparkling",
  "Grateful", "Creative", "Loving", "Kind", "Brave", "Strong", "Wise", "Calm",
  "Happy", "Blessed", "Golden", "Vibrant", "Shining", "Luminous", "Positive"
];

const generatePositiveUserName = () => {
  const adjective = positiveAdjectives[Math.floor(Math.random() * positiveAdjectives.length)];
  return `${adjective} Soul`;
};

export default function Home() {
  const { toast } = useToast();
  const [userName, setUserName] = useState<string | null>(null);
  const [isNewUser, setIsNewUser] = useState<boolean | null>(null);
  const [isDailyFavorite, setIsDailyFavorite] = useState(false);

  useEffect(() => {
    // This effect runs only on the client side
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    setIsNewUser(!hasVisited);
    if (!hasVisited) {
      localStorage.setItem('hasVisitedBefore', 'true');
    }

    let resolvedUserName = localStorage.getItem('userName');
    if (!resolvedUserName) {
      resolvedUserName = generatePositiveUserName();
      localStorage.setItem('userName', resolvedUserName);
    }
    setUserName(resolvedUserName);
    
    const storedFavorites = localStorage.getItem('favoriteAffirmations');
    if (storedFavorites) {
      try {
        const favoritesSet = new Set<string>(JSON.parse(storedFavorites));
        setIsDailyFavorite(favoritesSet.has(dailyAffirmation.id));
      } catch (error) {
        console.error("Error parsing favorite affirmations:", error);
      }
    }
  }, []);

  const handleToggleDailyFavorite = (id: string) => {
    const newIsFavorite = !isDailyFavorite;
    setIsDailyFavorite(newIsFavorite);

    const storedFavorites = localStorage.getItem('favoriteAffirmations');
    let favoritesSet: Set<string>;
    try {
        favoritesSet = storedFavorites ? new Set<string>(JSON.parse(storedFavorites)) : new Set<string>();
    } catch (error) {
        favoritesSet = new Set<string>();
    }

    let message = "";
    if (newIsFavorite) {
      favoritesSet.add(id);
      message = "Added daily affirmation to favorites";
    } else {
      favoritesSet.delete(id);
      message = "Removed daily affirmation from favorites";
    }
    localStorage.setItem('favoriteAffirmations', JSON.stringify(Array.from(favoritesSet)));

    toast({
      title: newIsFavorite ? "Favorited" : "Unfavorited",
      description: message,
    });
  };

  const moodOptions = [
    { value: 'happy', label: 'Happy', icon: Smile, className: 'text-green-500', hover: 'hover:bg-green-500/10', active: 'border-green-500 bg-green-500/20' },
    { value: 'meh', label: 'Neutral', icon: Meh, className: 'text-yellow-500', hover: 'hover:bg-yellow-500/10', active: 'border-yellow-500 bg-yellow-500/20' },
    { value: 'sad', label: 'Sad', icon: Frown, className: 'text-red-500', hover: 'hover:bg-red-500/10', active: 'border-red-500 bg-red-500/20' },
    { value: 'calm', label: 'Calm', icon: Leaf, className: 'text-blue-500', hover: 'hover:bg-blue-500/10', active: 'border-blue-500 bg-blue-500/20' },
    { value: 'energized', label: 'Energized', icon: Zap, className: 'text-orange-500', hover: 'hover:bg-orange-500/10', active: 'border-orange-500 bg-orange-500/20' },
  ];

  return (
    <div className="flex flex-col items-center justify-start min-h-full space-y-10 md:space-y-12 py-8">
      {/* Section 1: Welcome */}
      <header className="text-center space-y-2">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
          {userName === null ? (
            <Skeleton className="h-12 w-80" />
          ) : (
            `Welcome, ${userName}.`
          )}
        </h1>
        <p className="text-lg md:text-xl text-foreground/80">
          {isNewUser === null ? (
            <Skeleton className="h-6 w-96 mt-2" />
          ) : isNewUser ? (
            "Your safe space for healing begins now. Take a deep breath."
          ) : (
            "Your journey to healing continues here. Take what you need today."
          )}
        </p>
      </header>

      {/* Hero Section */}
      <section className="w-full max-w-5xl px-4 text-center">
        <div className="bg-card/60 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-primary mb-3">Your Guided Journey to Inner Peace</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-8">
            VibeFlow is a comprehensive self-therapy toolkit designed to support your mental and emotional well-being.
            Discover evidence-based tools to build resilience, gain clarity, and foster intentional growth.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {featureLinks.slice(0, 6).map((feature) => (
              <Link href={feature.href} key={feature.title} className="group flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-primary/5 transition-colors">
                <div className="p-3 rounded-full bg-primary/10 group-hover:bg-accent/10 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
                </div>
                <span className="text-sm font-medium text-center text-foreground group-hover:text-primary">{feature.title}</span>
              </Link>
            ))}
          </div>
          <Button asChild size="lg" className="mt-10">
              <Link href="/explore">Explore All Features</Link>
          </Button>
        </div>
      </section>

      {/* Section 2: Affirmation of the Day */}
      <section className="w-full max-w-lg px-4">
        <Card className="shadow-lg border-accent/50 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-primary flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-accent" />
              Affirmation of the Day
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AffirmationCard
              affirmation={dailyAffirmation}
              isFavorite={isDailyFavorite}
              onToggleFavorite={handleToggleDailyFavorite}
              className="border-0 p-0 bg-transparent"
            />
          </CardContent>
        </Card>
      </section>

      {/* Section 3: Visual Inspiration */}
      <section className="w-full max-w-xl px-4">
        <Card className="shadow-lg border-primary/30 bg-card/80 backdrop-blur-sm overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl text-primary flex items-center gap-2">
               Visual Presence Prompt
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative w-full aspect-[4/3] group">
              <Image
                src={visualAffirmationImage.src}
                alt={visualAffirmationImage.alt}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={visualAffirmationImage.hint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10 p-4 flex flex-col justify-end">
                <p className="text-white text-lg font-semibold drop-shadow-md">
                  {visualAffirmationImage.text}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Section 4: Daily Emotional Check-in */}
      <section className="w-full max-w-lg text-center px-4">
          <Card className="shadow-md bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-secondary">How Are You Feeling Today?</CardTitle>
              <CardDescription>Tap an emotion to log it in your Mood Tracker.</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="flex justify-center space-x-1 sm:space-x-2 flex-wrap gap-y-2">
                 {moodOptions.map(mood => (
                    <Link key={mood.value} href={`/mood-tracker?mood=${mood.value}`} passHref>
                        <div className="flex flex-col items-center space-y-1">
                            <Label
                                htmlFor={`mood-${mood.value}`}
                                className={cn(
                                    "cursor-pointer rounded-full p-2 sm:p-3 border-2 border-transparent transition-all hover:scale-105",
                                    mood.hover
                                )}
                                aria-label={`${mood.label} mood`}
                            >
                                <mood.icon className={cn("w-7 h-7 sm:w-8 sm:h-8", mood.className)} />
                            </Label>
                            <span className="text-xs text-muted-foreground">{mood.label}</span>
                        </div>
                    </Link>
                 ))}
               </div>
            </CardContent>
          </Card>
      </section>

      {/* Section 8: Explore Your Toolkit */}
      <section className="w-full max-w-5xl px-4 pt-6">
        <h2 className="text-3xl font-bold text-center text-primary mb-8">Explore Your Toolkit</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureLinks.map((link) => (
            <Link href={link.href} key={link.title} passHref className="block h-full">
              <Card className="group bg-card/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl border border-border/20 hover:border-primary/40 transition-all duration-300 ease-in-out transform hover:-translate-y-1.5 hover:scale-[1.03] h-full flex flex-col text-center items-center p-5 hover:rotate-[0.25deg]">
                <div className="mb-3 p-3 rounded-full bg-primary/10 group-hover:bg-accent/10 transition-colors duration-300 ease-in-out transform group-hover:scale-105">
                  <link.icon className="w-8 h-8 text-primary group-hover:text-accent transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-1.5 group-hover:text-accent">{link.title}</h3>
                <p className="text-xs text-muted-foreground flex-grow">{link.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
