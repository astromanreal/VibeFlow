
'use client';

import Link from 'next/link';
import Image from 'next/image'; // Import Image component
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, BrainCircuit, Notebook, Lightbulb, Quote, HeartHandshake, Waves, Sparkles, Smile, Meh, Frown, Leaf, Zap } from "lucide-react"; // Added Sparkles, Leaf, Zap
import AffirmationCard from '@/components/affirmation-card';
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from 'react';
import type { Affirmation } from '@/services/affirmations';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from '@/lib/utils';

// Placeholder data for the daily affirmation - could be fetched or static
const dailyAffirmation: Affirmation = {
  id: "daily_001",
  category: "Presence",
  text: "I am grounded and centered in this present moment.",
};

// Static content for Daily Uplift
const dailyTip = "Smiling, even when you don't feel like it, can send signals to your brain that may help improve your mood.";
const gratitudePrompt = "Take a moment: What's one small thing you're grateful for right now?";
const inspirationalQuote = {
  text: "The best way to predict the future is to create it.",
  author: "Peter Drucker"
};

const featureLinks = [
  {
    href: "/affirmations",
    icon: Heart,
    title: "Affirmations",
    description: "Daily positive statements to uplift your spirit.",
  },
  {
    href: "/ask-vibe",
    icon: BrainCircuit, // Changed from MessageCircle for more specificity
    title: "Ask Vibe",
    description: "Seek guidance from your AI wisdom assistant.",
  },
  {
    href: "/journal",
    icon: Notebook,
    title: "Journal",
    description: "Reflect, log gratitude, and track your mood.",
  },
  {
    href: "/manifestation",
    icon: Lightbulb, // Changed from Sparkles for consistency with its page
    title: "Manifestation Hub",
    description: "Learn to consciously create your desired reality.",
  },
  {
    href: "/meditation",
    icon: Waves,
    title: "Meditation",
    description: "Find inner peace with guided sessions & exercises.",
  }
];

const visualAffirmationImage = {
  src: "https://drive.google.com/uc?export=view&id=1yh5SYwQdE4P3ZbLjVX6oawqYu9X7d9qT",
  alt: "Visual Affirmation: Cherish the beauty of this moment",
  text: "I cherish the beauty of this moment.",
  hint: "nature sunset" // Added hint for data-ai-hint
};


export default function Home() {
  const { toast } = useToast();
  const [isDailyFavorite, setIsDailyFavorite] = useState(false);
  const [currentMood, setCurrentMood] = useState<string | undefined>(undefined);

  // Load initial favorite state for daily affirmation
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteAffirmations');
    if (storedFavorites) {
      try {
        const favoritesSet = new Set<string>(JSON.parse(storedFavorites));
        setIsDailyFavorite(favoritesSet.has(dailyAffirmation.id));
      } catch (error) {
        console.error("Error parsing favorite affirmations:", error);
        localStorage.removeItem('favoriteAffirmations'); // Clear corrupted data
      }
    }
     // Load initial mood state (optional, if persisting)
    const storedMood = localStorage.getItem('currentMood');
    if (storedMood) {
      setCurrentMood(storedMood);
    }
  }, []);


  const handleToggleDailyFavorite = (id: string) => {
     const newIsFavorite = !isDailyFavorite;
     setIsDailyFavorite(newIsFavorite);

     // Update localStorage
     const storedFavorites = localStorage.getItem('favoriteAffirmations');
     let favoritesSet: Set<string>;
     try {
         favoritesSet = storedFavorites ? new Set<string>(JSON.parse(storedFavorites)) : new Set<string>();
     } catch (error) {
         console.error("Error parsing favorite affirmations:", error);
         favoritesSet = new Set<string>(); // Initialize fresh set on error
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

  const handleMoodChange = (mood: string) => {
    setCurrentMood(mood);
    // Persist mood
    localStorage.setItem('currentMood', mood);
    toast({
      title: "Mood Logged",
      description: `Feeling ${mood} today.`,
    });
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-full space-y-10 md:space-y-12 py-8">
      <header className="text-center space-y-2">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
          VibeFlow
        </h1>
        <p className="text-lg md:text-xl text-foreground/80">
          Welcome to your center of peace, power, and presence.
        </p>
      </header>

      {/* Daily Affirmation Section */}
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
              className="border-0 p-0 bg-transparent" // Ensure background is transparent
            />
          </CardContent>
        </Card>
      </section>

      {/* Visual Inspiration Image Section */}
      <section className="w-full max-w-xl px-4"> {/* Increased max-width for visual impact */}
        <Card className="shadow-lg border-primary/30 bg-card/80 backdrop-blur-sm overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl text-primary flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" /> {/* Consistent icon */}
              Visual Inspiration
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative w-full aspect-[4/3] group"> {/* Adjusted aspect ratio for a slightly wider image */}
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

      {/* Vibe Check Section */}
      <section className="w-full max-w-lg text-center px-4">
          <Card className="shadow-md bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-secondary">Vibe Check</CardTitle>
              <CardDescription>How are you feeling right now?</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={currentMood}
                onValueChange={handleMoodChange}
                className="flex justify-center space-x-1 sm:space-x-2 flex-wrap gap-y-2" // Adjusted for wrapping
                aria-label="Select your current mood"
              >
                {/* Happy */}
                <div className="flex flex-col items-center space-y-1">
                  <RadioGroupItem value="happy" id="mood-happy" className="sr-only" />
                  <Label
                    htmlFor="mood-happy"
                    className={cn(
                      "cursor-pointer rounded-full p-2 sm:p-3 border-2 border-transparent transition-all",
                      "hover:bg-green-500/10",
                      currentMood === 'happy' ? 'border-green-500 bg-green-500/20 scale-110 shadow-lg' : 'hover:scale-105'
                    )}
                    aria-label="Happy mood"
                  >
                    <Smile className="w-7 h-7 sm:w-8 sm:h-8 text-green-500" />
                  </Label>
                  <span className="text-xs text-muted-foreground">Happy</span>
                </div>
                {/* Neutral */}
                 <div className="flex flex-col items-center space-y-1">
                  <RadioGroupItem value="neutral" id="mood-neutral" className="sr-only" />
                  <Label
                     htmlFor="mood-neutral"
                     className={cn(
                        "cursor-pointer rounded-full p-2 sm:p-3 border-2 border-transparent transition-all",
                        "hover:bg-yellow-500/10",
                        currentMood === 'neutral' ? 'border-yellow-500 bg-yellow-500/20 scale-110 shadow-lg' : 'hover:scale-105'
                      )}
                     aria-label="Neutral mood"
                  >
                    <Meh className="w-7 h-7 sm:w-8 sm:h-8 text-yellow-500" />
                  </Label>
                  <span className="text-xs text-muted-foreground">Neutral</span>
                </div>
                {/* Sad */}
                <div className="flex flex-col items-center space-y-1">
                  <RadioGroupItem value="sad" id="mood-sad" className="sr-only" />
                  <Label
                     htmlFor="mood-sad"
                     className={cn(
                       "cursor-pointer rounded-full p-2 sm:p-3 border-2 border-transparent transition-all",
                       "hover:bg-red-500/10",
                       currentMood === 'sad' ? 'border-red-500 bg-red-500/20 scale-110 shadow-lg' : 'hover:scale-105'
                     )}
                     aria-label="Sad mood"
                  >
                    <Frown className="w-7 h-7 sm:w-8 sm:h-8 text-red-500" />
                  </Label>
                   <span className="text-xs text-muted-foreground">Sad</span>
                </div>
                {/* Calm */}
                <div className="flex flex-col items-center space-y-1">
                  <RadioGroupItem value="calm" id="mood-calm" className="sr-only" />
                  <Label
                     htmlFor="mood-calm"
                     className={cn(
                       "cursor-pointer rounded-full p-2 sm:p-3 border-2 border-transparent transition-all",
                       "hover:bg-blue-500/10",
                       currentMood === 'calm' ? 'border-blue-500 bg-blue-500/20 scale-110 shadow-lg' : 'hover:scale-105'
                     )}
                     aria-label="Calm mood"
                  >
                    <Leaf className="w-7 h-7 sm:w-8 sm:h-8 text-blue-500" />
                  </Label>
                   <span className="text-xs text-muted-foreground">Calm</span>
                </div>
                {/* Energized */}
                <div className="flex flex-col items-center space-y-1">
                  <RadioGroupItem value="energized" id="mood-energized" className="sr-only" />
                  <Label
                     htmlFor="mood-energized"
                     className={cn(
                       "cursor-pointer rounded-full p-2 sm:p-3 border-2 border-transparent transition-all",
                       "hover:bg-orange-500/10",
                       currentMood === 'energized' ? 'border-orange-500 bg-orange-500/20 scale-110 shadow-lg' : 'hover:scale-105'
                     )}
                     aria-label="Energized mood"
                  >
                    <Zap className="w-7 h-7 sm:w-8 sm:h-8 text-orange-500" />
                  </Label>
                   <span className="text-xs text-muted-foreground">Energized</span>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
      </section>

       {/* Daily Uplift Section */}
        <section className="w-full max-w-lg px-4">
            <Card className="shadow-md border-secondary/30 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-xl text-secondary flex items-center gap-2">
                         <Lightbulb className="w-5 h-5 text-accent" />
                        Daily Uplift
                    </CardTitle>
                    <CardDescription>Boost your mood with science & gratitude.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg border border-muted/50 hover:shadow-sm transition-shadow">
                        <BrainCircuit className="w-6 h-6 text-primary mt-1 shrink-0" />
                        <div>
                            <h4 className="font-semibold text-sm text-primary mb-1">Science-Backed Tip</h4>
                            <p className="text-sm text-foreground/90">{dailyTip}</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg border border-muted/50 hover:shadow-sm transition-shadow">
                        <HeartHandshake className="w-6 h-6 text-pink-500 mt-1 shrink-0" />
                        <div>
                            <h4 className="font-semibold text-sm text-pink-500 mb-1">Gratitude Moment</h4>
                            <p className="text-sm text-foreground/90">{gratitudePrompt}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg border border-muted/50 hover:shadow-sm transition-shadow">
                         <Quote className="w-6 h-6 text-secondary mt-1 shrink-0 transform scale-x-[-1]" />
                         <div>
                             <h4 className="font-semibold text-sm text-secondary mb-1">Food for Thought</h4>
                             <blockquote className="text-sm text-foreground/90 italic">
                                 "{inspirationalQuote.text}"
                                  <footer className="text-xs text-muted-foreground mt-1 not-italic">— {inspirationalQuote.author}</footer>
                             </blockquote>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </section>

      {/* Explore VibeFlow Section */}
      <section className="w-full max-w-5xl px-4 pt-6"> {/* Added pt-6 for more spacing */}
        <h2 className="text-3xl font-bold text-center text-primary mb-8">Explore VibeFlow</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureLinks.map((link) => (
            <Link href={link.href} key={link.href} passHref className="block h-full">
              <div className="group bg-card/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl border border-border/20 hover:border-primary/40 transition-all duration-300 ease-in-out transform hover:-translate-y-1.5 hover:scale-[1.03] h-full flex flex-col text-center items-center p-5 hover:rotate-[0.25deg]">
                <div className="mb-3 p-3 rounded-full bg-primary/10 group-hover:bg-accent/10 transition-colors duration-300 ease-in-out transform group-hover:scale-105">
                  <link.icon className="w-8 h-8 text-primary group-hover:text-accent transition-colors duration-300 ease-in-out" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-1.5 group-hover:text-accent-foreground transition-colors">{link.title}</h3>
                <p className="text-xs text-muted-foreground flex-grow">{link.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

