
'use client';

import React, { useState, useEffect } from 'react'; // Import React
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Smile, Meh, Frown, Heart, Notebook, Award, Tag, Edit3, Leaf, Zap } from 'lucide-react'; // Added Tag, Edit3, Leaf, Zap
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import type { JournalEntry } from '../journal/page';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { format } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';

const MOOD_OPTIONS_PROFILE = [ // Renamed to avoid conflict if JournalPage MOOD_OPTIONS changes
  { value: 'happy', label: 'Happy', icon: <Smile className="w-4 h-4 text-green-500" />, color: 'text-green-500' },
  { value: 'neutral', label: 'Neutral', icon: <Meh className="w-4 h-4 text-yellow-500" />, color: 'text-yellow-500' },
  { value: 'sad', label: 'Sad', icon: <Frown className="w-4 h-4 text-red-500" />, color: 'text-red-500' },
  { value: 'calm', label: 'Calm', icon: <Leaf className="w-4 h-4 text-blue-500" />, color: 'text-blue-500' },
  { value: 'energized', label: 'Energized', icon: <Zap className="w-4 h-4 text-orange-500" />, color: 'text-orange-500' },
];

const positiveAdjectives = [
  "Radiant", "Joyful", "Peaceful", "Hopeful", "Bright", "Serene", "Sparkling",
  "Grateful", "Creative", "Loving", "Kind", "Brave", "Strong", "Wise", "Calm",
  "Happy", "Blessed", "Golden", "Vibrant", "Shining", "Luminous", "Positive"
];

const generatePositiveUserName = () => {
  const adjective = positiveAdjectives[Math.floor(Math.random() * positiveAdjectives.length)];
  return `${adjective} Soul`;
};

export default function ProfilePage() {
  const [userName, setUserName] = useState('');
  const [currentMood, setCurrentMood] = useState<string | undefined>(undefined);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [journalCount, setJournalCount] = useState(0);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    let resolvedUserName = "VibeFlow User";
    let resolvedMood: string | undefined = undefined;
    let resolvedFavoriteCount = 0;
    let resolvedJournalEntries: JournalEntry[] = [];
    let resolvedJournalCount = 0;

    try {
      const storedUserName = localStorage.getItem('userName');
      if (storedUserName) {
        resolvedUserName = storedUserName;
      } else {
        const newUserName = generatePositiveUserName();
        resolvedUserName = newUserName;
        try {
          localStorage.setItem('userName', newUserName);
        } catch (e) {
          console.error("Failed to save new user name to localStorage:", e);
        }
      }

      const storedMood = localStorage.getItem('currentMood');
      if (storedMood && MOOD_OPTIONS_PROFILE.some(moodOption => moodOption.value === storedMood)) {
        resolvedMood = storedMood;
      } else if (storedMood) {
        // Clear invalid mood from localStorage
        localStorage.removeItem('currentMood');
      }


      const storedFavorites = localStorage.getItem('favoriteAffirmations');
      if (storedFavorites) {
        try {
          const parsedFavorites = JSON.parse(storedFavorites);
          if (Array.isArray(parsedFavorites)) {
            resolvedFavoriteCount = parsedFavorites.length;
          } else {
            localStorage.removeItem('favoriteAffirmations');
          }
        } catch (e) {
          localStorage.removeItem('favoriteAffirmations');
        }
      }

      const storedEntries = localStorage.getItem('journalEntries');
      if (storedEntries) {
        try {
          const parsedEntries = JSON.parse(storedEntries);
          if (Array.isArray(parsedEntries)) {
            resolvedJournalEntries = parsedEntries.filter(
              (entry): entry is JournalEntry =>
                typeof entry === 'object' &&
                entry !== null &&
                typeof entry.id === 'string' &&
                typeof entry.date === 'string' &&
                (typeof entry.gratitude === 'string' || typeof (entry as any).text === 'string')
            ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date descending
            resolvedJournalCount = resolvedJournalEntries.length;
            if (resolvedJournalEntries.length !== parsedEntries.length) {
                try {
                    localStorage.setItem('journalEntries', JSON.stringify(resolvedJournalEntries));
                } catch (e) {
                    console.error("Failed to save filtered journal entries to localStorage:", e);
                }
            }
          } else {
            localStorage.removeItem('journalEntries');
          }
        } catch (e) {
          localStorage.removeItem('journalEntries');
        }
      }
    } catch (error) {
      console.error("Error reading from localStorage for profile data:", error);
      if (!resolvedUserName || resolvedUserName === "VibeFlow User" && !localStorage.getItem('userName')) {
        resolvedUserName = "Anonymous Soul";
      }
    }

    setUserName(resolvedUserName);
    setCurrentMood(resolvedMood);
    setFavoriteCount(resolvedFavoriteCount);
    setJournalEntries(resolvedJournalEntries);
    setJournalCount(resolvedJournalCount);

    setLoading(false);
  }, []);

  const selectedMoodInfo = MOOD_OPTIONS_PROFILE.find(m => m.value === currentMood);
  const vibeLevel = Math.min(5, Math.floor((favoriteCount + journalCount) / 3));
  const vibeScore = (favoriteCount * 2) + (journalCount * 3) + (vibeLevel * 5);

  const getMostFrequentTopic = () => {
    if (journalEntries.length === 0) return 'N/A';
    const topicCounts = journalEntries.reduce((acc, entry) => {
      if (entry.topic) {
        acc[entry.topic] = (acc[entry.topic] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    let mostFrequentTopic = 'N/A';
    let maxCount = 0;
    for (const topic in topicCounts) {
      if (topicCounts[topic] > maxCount) {
        maxCount = topicCounts[topic];
        mostFrequentTopic = topic;
      }
    }
    return mostFrequentTopic;
  };

  const mostFrequentTopic = getMostFrequentTopic();
  const recentEntries = journalEntries.slice(0, 3); // Show latest 3 entries

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 flex justify-center">
        <Card className="w-full max-w-2xl animate-pulse">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="bg-muted rounded-full"></AvatarFallback>
            </Avatar>
            <div className="space-y-2 flex-1">
              <div className="h-6 bg-muted rounded w-1/3"></div>
              <div className="h-4 bg-muted rounded w-1/4"></div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            <div className="space-y-2">
              <div className="h-5 bg-muted rounded w-1/4"></div>
              <div className="h-10 bg-muted rounded w-1/2"></div>
            </div>
            <div className="space-y-2">
              <div className="h-5 bg-muted rounded w-1/4"></div>
              <div className="flex gap-4">
                <div className="h-16 bg-muted rounded w-1/2"></div>
                <div className="h-16 bg-muted rounded w-1/2"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-5 bg-muted rounded w-1/3"></div>
              <div className="h-20 bg-muted rounded w-full"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 flex justify-center">
      <Card className="w-full max-w-2xl shadow-lg border-accent/30 bg-card/90 backdrop-blur-sm">
        <CardHeader className="flex flex-col sm:flex-row items-center gap-4 pb-4 border-b">
          <Avatar className="w-20 h-20 border-2 border-primary shadow-md">
            <AvatarImage src={`https://picsum.photos/seed/${userName.replace(/\s/g, '')}/100/100`} alt={userName || "User Avatar"} data-ai-hint="profile avatar" />
            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground text-3xl">
              {userName ? userName.charAt(0).toUpperCase() : <User />}
            </AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <CardTitle className="text-2xl md:text-3xl text-primary">{userName}</CardTitle>
            <CardDescription>Your personal sanctuary for growth and positivity.</CardDescription>
            <Badge variant="secondary" className="mt-2 bg-accent/20 text-accent-foreground border-accent/50">
              <Award className="w-4 h-4 mr-1.5 text-accent" />
              Vibe Level: {vibeLevel}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-8 pt-6">
          <section>
            <h3 className="text-lg font-semibold text-secondary mb-2">Current Vibe</h3>
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg border">
              {selectedMoodInfo ? (
                <>
                  {React.cloneElement(selectedMoodInfo.icon, { className: cn(selectedMoodInfo.icon.props.className, "w-7 h-7") })}
                  <span className={cn("text-xl font-medium", selectedMoodInfo.color)}>
                    Feeling {selectedMoodInfo.label}
                  </span>
                </>
              ) : (
                <p className="text-muted-foreground">No mood logged yet. Check in on the homepage!</p>
              )}
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-secondary mb-2">Activity Snapshot</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="bg-background/50 p-4 text-center hover:shadow-md transition-shadow">
                <Heart className="w-8 h-8 mx-auto text-accent mb-2" />
                <p className="text-2xl font-bold text-primary">{favoriteCount}</p>
                <p className="text-sm text-muted-foreground">Favorite Affirmations</p>
              </Card>
              <Card className="bg-background/50 p-4 text-center hover:shadow-md transition-shadow">
                <Notebook className="w-8 h-8 mx-auto text-accent mb-2" />
                <p className="text-2xl font-bold text-primary">{journalCount}</p>
                <p className="text-sm text-muted-foreground">Journal Entries</p>
              </Card>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">Overall Vibe Score: <span className="font-bold text-primary text-lg">{vibeScore}</span></p>
              <Progress value={(vibeScore > 0 ? (vibeScore % 100 === 0 ? 100 : vibeScore % 100) : 0)} className="w-3/4 mx-auto mt-2 h-2.5" />
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-secondary mb-2">Your Positive Focus</h3>
            <Card className="bg-background/50 p-4">
              {journalEntries.length > 0 ? (
                <div className="text-center space-y-2">
                  <p className="text-muted-foreground">Your most frequent journal topic is:</p>
                  <Badge variant="outline" className="text-lg px-3 py-1 border-primary/50 text-primary">{mostFrequentTopic}</Badge>
                  <p className="text-xs text-muted-foreground pt-2">
                    Keep exploring your thoughts and feelings! ✨
                  </p>
                </div>
              ) : (
                <p className="text-muted-foreground italic text-center py-4">
                  Start journaling to discover insights and track your inner journey. Every entry is a step towards clarity. ✨
                </p>
              )}
            </Card>
          </section>

          <section>
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-secondary flex items-center gap-2">
                    <Edit3 className="w-5 h-5" />
                    Recent Journal Entries
                </h3>
                {journalEntries.length > 3 && (
                     <Link href="/journal" passHref>
                        <Button variant="link" size="sm" className="text-primary">View All</Button>
                     </Link>
                )}
            </div>
            {recentEntries.length > 0 ? (
                <ScrollArea className={cn("rounded-lg border bg-background/30", recentEntries.length > 1 ? "h-[300px]" : "h-auto")}>
                    <div className="p-4 space-y-4">
                    {recentEntries.map(entry => (
                        <Card key={entry.id} className="bg-card/70 shadow-sm">
                            <CardHeader className="pb-2 pt-4 px-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-base text-primary">
                                            {format(new Date(entry.date), 'PPP')} {/* Format: Sep 10, 2024 */}
                                        </CardTitle>
                                        <CardDescription className="text-xs">
                                            {format(new Date(entry.date), 'p')} {/* Format: 3:30 PM */}
                                        </CardDescription>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {entry.topic && (
                                            <Badge variant="secondary" className="text-xs">
                                                <Tag className="w-3 h-3 mr-1" />
                                                {entry.topic}
                                            </Badge>
                                        )}
                                        {entry.mood && MOOD_OPTIONS_PROFILE.find(m => m.value === entry.mood) && (
                                            React.cloneElement(MOOD_OPTIONS_PROFILE.find(m => m.value === entry.mood)!.icon, { className: "w-5 h-5" })
                                        )}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="px-4 pb-4 pt-2">
                                <p className="text-sm text-foreground/90 whitespace-pre-wrap line-clamp-3">
                                    {entry.gratitude || (entry as any).text || "No text recorded."}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                    </div>
                </ScrollArea>
            ) : (
              <Card className="bg-background/50 p-6 text-center">
                <p className="text-muted-foreground italic">
                  No journal entries found yet.
                </p>
                <Link href="/journal" passHref>
                  <Button variant="outline" className="mt-4">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Write Your First Entry
                  </Button>
                </Link>
              </Card>
            )}
             {journalEntries.length > 0 && journalEntries.length <=3 && (
                 <div className="text-center mt-4">
                    <Link href="/journal" passHref>
                        <Button variant="outline" className="text-primary border-primary/50 hover:bg-primary/10">
                            <Edit3 className="w-4 h-4 mr-2" />
                            Go to Journal
                        </Button>
                    </Link>
                 </div>
             )}
          </section>

        </CardContent>
        <CardFooter className="pt-6 border-t text-center block">
             <p className="text-xs text-muted-foreground">
                Keep vibrating higher! Your journey is unique and beautiful.
             </p>
        </CardFooter>
      </Card>
    </div>
  );
}

