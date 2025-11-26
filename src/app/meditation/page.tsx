
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Volume2, Wind, Waves, Star, Clock, ListMusic, Heart, Info, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';
import { BreathingGuide } from '@/components/breathing-guide';

// --- Data Structures (Placeholders) ---

interface PlayableItem {
  id: string;
  title: string;
  duration: string; // Represents planned duration, not actual playback time
  category: string;
  sourceUrl?: string; // URL for more info or external playback, optional now
  thumbnailUrl?: string; // Optional for guided meditations
  description?: string; // Added description
  type?: 'audio' | 'video' | 'breathing' | 'sound'; // Adjusted types
  isFavorite?: boolean; // For sounds
}

interface GuidedMeditation extends PlayableItem {
  category: 'Sleep' | 'Focus' | 'Stress Relief' | 'Mindfulness';
  thumbnailUrl: string;
  type: 'audio' | 'video'; // Guided can be audio or video (conceptually)
  description: string;
}

interface SoundItemData extends PlayableItem {
  category: 'Relaxation' | 'Chakra Healing' | 'Deep Sleep' | 'Energy Boost';
  type: 'sound'; // Type is sound bath/beat
  description: string;
}


export interface BreathingPreset {
  id: string;
  name: string;
  inhale: number;
  hold?: number;
  exhale: number;
  description: string;
  type: 'breathing';
}

// --- Placeholder Data ---

// Example public domain/CC0 audio URLs - replace with your actual files or remove if not linking externally
const guidedMeditationsData: GuidedMeditation[] = [
  { id: 'gm1', title: 'Mindful Morning Start', duration: '10 min', category: 'Mindfulness', type: 'audio', description: 'Start your day centered and calm.', sourceUrl: '#', thumbnailUrl: 'https://picsum.photos/300/200?random=1' },
  { id: 'gm2', title: 'Deep Sleep Relaxation', duration: '20 min', category: 'Sleep', type: 'audio', description: 'Drift off into a peaceful sleep.', sourceUrl: '#', thumbnailUrl: 'https://picsum.photos/300/200?random=2' },
  { id: 'gm3', title: 'Focus Enhancement Session', duration: '15 min', category: 'Focus', type: 'video', description: 'Sharpen your concentration (Conceptual video).', sourceUrl: '#', thumbnailUrl: 'https://picsum.photos/300/200?random=3' }, // Video needs separate handling
  { id: 'gm4', title: 'Stress Relief Breathwork Intro', duration: '5 min', category: 'Stress Relief', type: 'audio', description: 'Quickly release tension.', sourceUrl: '#', thumbnailUrl: 'https://picsum.photos/300/200?random=4' },
];

export const breathingPresetsData: BreathingPreset[] = [
  { id: 'bp1', name: 'Box Breathing', inhale: 4, hold: 4, exhale: 4, type: 'breathing', description: 'Calm & balance: Inhale 4s, Hold 4s, Exhale 4s, Hold 4s' },
  { id: 'bp2', name: '4-7-8 Breathing', inhale: 4, hold: 7, exhale: 8, type: 'breathing', description: 'Relaxation aid: Inhale 4s, Hold 7s, Exhale 8s' },
  { id: 'bp3', name: 'Simple Relaxing Breath', inhale: 5, exhale: 5, type: 'breathing', description: 'Easy calming: Inhale 5s, Exhale 5s' },
];

const soundBathsData: SoundItemData[] = [
  { id: 'sb1', title: 'Ocean Waves', duration: '30 min', category: 'Relaxation', type: 'sound', description: 'Gentle waves for calm.', sourceUrl: '#', isFavorite: false },
  { id: 'sb2', title: 'Root Chakra Healing Tones', duration: '15 min', category: 'Chakra Healing', type: 'sound', description: 'Grounding frequencies.', sourceUrl: '#', isFavorite: true },
  { id: 'sb3', title: 'Delta Waves for Deep Sleep', duration: '60 min', category: 'Deep Sleep', type: 'sound', description: 'Soundscape for restful sleep.', sourceUrl: '#', isFavorite: false },
  { id: 'sb4', title: 'Alpha Waves for Focus', duration: '45 min', category: 'Energy Boost', type: 'sound', description: 'Enhance concentration.', sourceUrl: '#', isFavorite: false },
  { id: 'sb5', title: 'Forest Ambience', duration: '30 min', category: 'Relaxation', type: 'sound', description: 'Nature sounds immersion.', sourceUrl: '#', isFavorite: false },
];


// --- Meditation Page Component ---

export default function MeditationPage() {
  const { toast } = useToast();
  const [selectedPresetId, setSelectedPresetId] = useState<string>(breathingPresetsData[0].id);
  const selectedPreset = breathingPresetsData.find(p => p.id === selectedPresetId) || breathingPresetsData[0];

  const [soundFavorites, setSoundFavorites] = useState<Set<string>>(() => {
     // Initialize favorites from localStorage or data
     if (typeof window !== 'undefined') {
        const storedFavorites = localStorage.getItem('soundFavorites');
        if (storedFavorites) {
          try {
            return new Set(JSON.parse(storedFavorites));
          } catch (error) {
            console.error("Error parsing sound favorites:", error);
            localStorage.removeItem('soundFavorites');
          }
        }
     }
     // Fallback to initial data if no localStorage
     const initialFavorites = new Set<string>();
     soundBathsData.forEach(sound => {
       if (sound.isFavorite) {
         initialFavorites.add(sound.id);
       }
     });
     return initialFavorites;
  });


   // --- Favorites Logic ---
   const toggleSoundFavorite = (id: string) => {
     setSoundFavorites(prev => {
       const newFavorites = new Set(prev);
       let message = "";
       if (newFavorites.has(id)) {
         newFavorites.delete(id);
         message = "Removed from favorites";
       } else {
         newFavorites.add(id);
         message = "Added to favorites";
       }
       // Save to localStorage
       if (typeof window !== 'undefined') {
           localStorage.setItem('soundFavorites', JSON.stringify(Array.from(newFavorites)));
       }
       toast({ title: "Favorites Updated", description: message });
       return newFavorites;
     });
   };

    // Format time (MM:SS) - No longer used for playback, but can represent duration concept
    const formatDuration = (durationString: string) => {
        // Assuming durationString is like "10 min"
        return durationString; // Just return the string for now
    };

    const handleMoreInfo = (item: PlayableItem) => {
        // Placeholder action for clicking the Info button
        // Could open a modal, navigate to a detail page, or link externally if sourceUrl exists
         toast({
            title: item.title,
            description: item.description || "More details about this session.",
        });
         // Example: Open external link if available
         // if (item.sourceUrl && item.sourceUrl !== '#') {
         //   window.open(item.sourceUrl, '_blank');
         // }
    }


  return (
    <div className="container mx-auto py-8 px-4 space-y-12 min-h-screen">
      {/* Background Gradient */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 dark:from-indigo-950 dark:via-purple-950 dark:to-blue-950 animate-gradient-xy"></div>
      <style jsx>{`
        @keyframes gradient-xy {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
        .animate-gradient-xy {
            background-size: 200% 200%;
            animation: gradient-xy 15s ease infinite;
        }
      `}</style>

      <header className="text-center space-y-2">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white flex items-center justify-center gap-3">
           <Waves className="w-10 h-10 text-purple-300" />
          Meditation Sanctuary
        </h1>
        <p className="text-lg md:text-xl text-purple-200/80">
          Find your inner peace and calm with our mindfulness and meditation tools.
        </p>
      </header>

       {/* --- Meditation Course Guide --- */}
      <section id="meditation-guide">
          <h2 className="text-3xl font-semibold text-purple-100 mb-6 flex items-center gap-2">
              <BookOpen className="w-7 h-7 text-purple-300" />
              Start Your Journey
          </h2>
          <Card className="bg-white/10 backdrop-blur-md border-purple-300/30 shadow-lg text-white overflow-hidden hover:shadow-purple-400/30 transition-shadow duration-300 ease-out">
              <CardHeader>
                  <CardTitle className="text-xl mb-1">New to Meditation?</CardTitle>
                  <CardDescription className="text-purple-200/80">
                      Learn the basics and begin your practice with our simple guide.
                  </CardDescription>
              </CardHeader>
              <CardContent>
                  <p className="mb-4">
                      Discover the benefits of meditation and how to easily incorporate it into your daily life. This guide covers finding a quiet space, simple postures, and focusing on your breath.
                  </p>
              </CardContent>
              <CardFooter>
                  <Link href="/meditation/how-to-start" passHref>
                      <Button
                          variant="secondary"
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
                          aria-label="Learn how to start meditating"
                      >
                          Read the 'How to Start' Guide
                          <BookOpen className="w-4 h-4 ml-2" />
                      </Button>
                  </Link>
              </CardFooter>
          </Card>
      </section>


       {/* --- Guided Meditations --- */}
      <section id="guided-meditations">
         <h2 className="text-3xl font-semibold text-purple-100 mb-6 flex items-center gap-2">
           <Info className="w-7 h-7 text-purple-300" /> {/* Changed icon */}
           Guided Sessions
         </h2>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
           {guidedMeditationsData.map(meditation => (
             <Card key={meditation.id} className="bg-white/10 backdrop-blur-md border-purple-300/30 shadow-lg overflow-hidden text-white hover:scale-[1.02] transition-transform duration-300 ease-out flex flex-col">
               <CardHeader className="p-0 relative">
                 {meditation.thumbnailUrl && (
                     <Image
                        src={meditation.thumbnailUrl}
                        alt={`Visual for ${meditation.title} guided meditation.`}
                        width={300}
                        height={150}
                        className="w-full h-36 object-cover"
                        data-ai-hint={`${meditation.category} meditation landscape calm`}
                      />
                 )}
                  {/* Optional overlay for visual cue */}
                  {/* <div className="absolute inset-0 bg-black/20"></div> */}
               </CardHeader>
               <CardContent className="p-4 flex-1"> {/* Added flex-1 */}
                 <CardTitle className="text-lg mb-1 line-clamp-1">{meditation.title}</CardTitle>
                 <CardDescription className="text-purple-200/80 text-sm mb-2 line-clamp-2">
                     {meditation.description}
                 </CardDescription>
                 <div className="flex items-center gap-2 text-xs text-purple-300/80">
                   <Badge variant="secondary" className="bg-purple-200/20 text-purple-100 border-none">{meditation.category}</Badge>
                   <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {formatDuration(meditation.duration)}</span>
                   <Badge variant="outline" className="border-purple-400/50 text-purple-300">
                       {meditation.type === 'video' ? 'Video Guide' : 'Audio Guide'}
                    </Badge>
                 </div>

               </CardContent>
                <CardFooter className="p-4 pt-0 mt-auto"> {/* Added mt-auto */}
                    <Button
                       variant="secondary"
                       className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
                       onClick={() => handleMoreInfo(meditation)}
                       aria-label={`More info about ${meditation.title}`}
                    >
                      <Info className="w-4 h-4 mr-2" />
                      Learn More / Start
                    </Button>
                 </CardFooter>
             </Card>
           ))}
         </div>
      </section>

       {/* --- Breathing Exercises --- */}
      <section id="breathing-exercises">
         <h2 className="text-3xl font-semibold text-purple-100 mb-6 flex items-center gap-2">
           <Wind className="w-7 h-7 text-purple-300" />
           Breathing Exercises
         </h2>
         <Card className="bg-white/10 backdrop-blur-md border-purple-300/30 shadow-lg text-white overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl mb-2">Choose Your Rhythm</CardTitle>
               <div className="w-full md:w-1/2 lg:w-1/3">
                  <Select value={selectedPresetId} onValueChange={setSelectedPresetId}>
                      <SelectTrigger className="bg-white/20 border-purple-300/50 text-white focus:ring-purple-400">
                          <SelectValue placeholder="Select a breathing preset" />
                      </SelectTrigger>
                      <SelectContent className="bg-purple-900/90 border-purple-300/50 text-white backdrop-blur-lg">
                          {breathingPresetsData.map(preset => (
                              <SelectItem key={preset.id} value={preset.id} className="focus:bg-purple-700/50">
                                  {preset.name} <span className="text-xs text-purple-300/80 ml-2">({preset.description.split(':')[0]})</span> {/* Show only name part */}
                              </SelectItem>
                          ))}
                      </SelectContent>
                  </Select>
               </div>
            </CardHeader>
           <CardContent className="flex flex-col items-center justify-center py-10">
              <BreathingGuide preset={selectedPreset} />
              <p className="mt-6 text-center text-purple-200/80 px-4">{selectedPreset.description}</p>
           </CardContent>
         </Card>
      </section>


       {/* --- Sound Baths & Beats --- */}
      <section id="sound-baths">
         <h2 className="text-3xl font-semibold text-purple-100 mb-6 flex items-center gap-2">
           <ListMusic className="w-7 h-7 text-purple-300" />
           Soundscapes & Frequencies
         </h2>
         <Tabs defaultValue="Relaxation" className="w-full">
           <div className="overflow-x-auto pb-2 mb-6">
                <TabsList className="flex w-max mx-auto bg-white/10 border border-purple-300/30 text-purple-200">
                  {['Relaxation', 'Chakra Healing', 'Deep Sleep', 'Energy Boost'].map(category => (
                    <TabsTrigger key={category} value={category} className="data-[state=active]:bg-purple-600/50 data-[state=active]:text-white data-[state=active]:shadow-md">
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
           </div>

           {['Relaxation', 'Chakra Healing', 'Deep Sleep', 'Energy Boost'].map(category => (
             <TabsContent key={category} value={category}>
               <div className="space-y-4">
                 {soundBathsData.filter(sound => sound.category === category).map(sound => (
                    <Card key={sound.id} className="bg-white/10 backdrop-blur-md border-purple-300/30 shadow-md text-white flex items-center justify-between p-4 hover:shadow-purple-400/20 transition-shadow duration-300 ease-out">
                         <div className="flex-1 mr-4">
                            <p className="font-semibold text-lg">{sound.title}</p>
                             <p className="text-sm text-purple-200/80 mb-1 line-clamp-1">{sound.description}</p>
                             <p className="text-xs text-purple-300/80 flex items-center gap-1"><Clock className="w-3 h-3" /> {formatDuration(sound.duration)}</p>
                         </div>
                         <div className="flex items-center gap-2">
                             {/* Replace Play button with Info button */}
                             <Button variant="ghost" size="icon" onClick={() => handleMoreInfo(sound)} aria-label={`More info about ${sound.title}`}>
                                <Info className="w-5 h-5 text-purple-300 hover:text-white" />
                             </Button>
                             <Button variant="ghost" size="icon" onClick={() => toggleSoundFavorite(sound.id)} aria-label={soundFavorites.has(sound.id) ? "Remove from favorites" : "Add to favorites"}>
                                <Heart className={cn("w-5 h-5 transition-colors duration-200", soundFavorites.has(sound.id) ? "fill-pink-400 text-pink-400" : "text-purple-200/80 hover:text-pink-400")} />
                             </Button>
                         </div>
                     </Card>
                 ))}
                  {soundBathsData.filter(sound => sound.category === category).length === 0 && (
                     <p className="text-center text-purple-200/70 py-8">No soundscapes in this category yet.</p>
                  )}
               </div>
             </TabsContent>
           ))}
         </Tabs>
      </section>

    </div>
  );
}
