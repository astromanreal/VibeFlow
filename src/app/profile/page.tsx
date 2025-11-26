
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Heart, Notebook, Award, BarChart, Route, Star, Quote } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { format, subDays } from 'date-fns';
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

import type { JournalEntry } from '../journal/page';
import type { MoodEntry } from '../mood-tracker/page';
import { therapyPathsList, therapyPathsDetailed } from '@/services/therapy-paths';
import type { TherapyPathInfo } from '@/services/therapy-paths';

const positiveAdjectives = [
  "Radiant", "Joyful", "Peaceful", "Hopeful", "Bright", "Serene", "Sparkling",
  "Grateful", "Creative", "Loving", "Kind", "Brave", "Strong", "Wise", "Calm",
  "Happy", "Blessed", "Golden", "Vibrant", "Shining", "Luminous", "Positive"
];

const dailyQuotes = [
    { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
    { text: "Your calm is your power.", author: "Unknown" },
    { text: "The journey of a thousand miles begins with a single step.", author: "Lao Tzu" },
    { text: "You are deserving of your own peace.", author: "Unknown" },
    { text: "What you think, you become. What you feel, you attract. What you imagine, you create.", author: "Buddha" },
];

const generatePositiveUserName = () => {
  const adjective = positiveAdjectives[Math.floor(Math.random() * positiveAdjectives.length)];
  return `${adjective} Soul`;
};

interface PathProgress extends TherapyPathInfo {
    progress: number;
    completedDays: number;
    totalDays: number;
}

const getColorClassFromPathColor = (colorString: string): string => {
  if (!colorString) return 'bg-primary';
  // Example: "border-purple-500/30 hover:shadow-purple-400/20"
  // We want to extract "purple-500" and create "bg-purple-500"
  const colorPart = colorString.split(' ')[0];
  if (!colorPart) return 'bg-primary';

  const colorNameAndOpacity = colorPart.replace('border-', '');
  const colorName = colorNameAndOpacity.split('/')[0];

  if (colorName) {
    return `bg-${colorName}`;
  }
  
  return 'bg-primary';
};

export default function ProfilePage() {
  const [userName, setUserName] = useState('VibeFlow User');
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [journalCount, setJournalCount] = useState(0);
  const [moodCount, setMoodCount] = useState(0);
  const [moodChartData, setMoodChartData] = useState<any[]>([]);
  const [pathProgress, setPathProgress] = useState<PathProgress[]>([]);
  const [quote, setQuote] = useState({ text: '', author: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // User Name
    let resolvedUserName = localStorage.getItem('userName');
    if (!resolvedUserName) {
      resolvedUserName = generatePositiveUserName();
      localStorage.setItem('userName', resolvedUserName);
    }
    setUserName(resolvedUserName);

    // Quote of the Day
    const today = new Date().getDate();
    setQuote(dailyQuotes[today % dailyQuotes.length]);

    // Favorites
    const storedFavorites = localStorage.getItem('favoriteAffirmations');
    if (storedFavorites) {
      setFavoriteCount(JSON.parse(storedFavorites).length);
    }

    // Journal Entries
    const storedJournalEntries = localStorage.getItem('journalEntries');
    if (storedJournalEntries) {
      setJournalCount(JSON.parse(storedJournalEntries).length);
    }

    // Mood Entries & Chart Data
    const storedMoodEntries = localStorage.getItem('moodEntries');
    if (storedMoodEntries) {
      const parsedMoods = JSON.parse(storedMoodEntries) as MoodEntry[];
      setMoodCount(parsedMoods.length);

      // Process data for chart (last 7 days)
      const moodByDay: { [key: string]: { [mood: string]: number } } = {};
      const today = new Date();

      for (let i = 6; i >= 0; i--) {
        const date = subDays(today, i);
        const dayKey = format(date, 'eee');
        moodByDay[dayKey] = {};
      }

      parsedMoods.forEach(entry => {
        const entryDate = new Date(entry.date);
        if (entryDate > subDays(today, 7)) {
          const dayKey = format(entryDate, 'eee');
          moodByDay[dayKey][entry.mood] = (moodByDay[dayKey][entry.mood] || 0) + 1;
        }
      });
      
      const chartData = Object.keys(moodByDay).map(day => ({
        name: day,
        ...moodByDay[day]
      }));
      setMoodChartData(chartData);
    }

    // Therapy Path Progress
    const pathProgressData = therapyPathsList.map(pathInfo => {
        const storageKey = `therapy-path-progress-${pathInfo.id}`;
        const storedProgress = localStorage.getItem(storageKey);
        const detailedPath = therapyPathsDetailed[pathInfo.id];
        const totalDays = detailedPath.sessions.length;

        let completedDays = 0;
        if (storedProgress) {
            completedDays = new Set(JSON.parse(storedProgress)).size;
        }

        const progress = totalDays > 0 ? (completedDays / totalDays) * 100 : 0;
        return { ...pathInfo, progress, completedDays, totalDays };
    }).filter(p => p.completedDays > 0); // Only show paths that have been started
    setPathProgress(pathProgressData);

    setLoading(false);
  }, []);

  const vibeLevel = Math.min(5, Math.floor((favoriteCount + journalCount + moodCount) / 3));

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 flex justify-center">
        <Card className="w-full max-w-4xl animate-pulse">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="bg-muted rounded-full"></AvatarFallback>
            </Avatar>
            <div className="space-y-2 flex-1">
              <div className="h-6 bg-muted rounded w-1/3"></div>
              <div className="h-4 bg-muted rounded w-1/4"></div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
             <div className="h-48 bg-muted rounded-lg"></div>
             <div className="h-48 bg-muted rounded-lg"></div>
             <div className="h-64 bg-muted rounded-lg lg:col-span-2"></div>
             <div className="h-64 bg-muted rounded-lg lg:col-span-2"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="flex flex-col sm:flex-row items-center gap-4 pb-6 mb-6 border-b">
        <Avatar className="w-24 h-24 border-4 border-primary shadow-lg">
          <AvatarImage src={`https://picsum.photos/seed/${userName.replace(/\s/g, '')}/100/100`} alt={`Profile avatar for ${userName}`} data-ai-hint="profile avatar" />
          <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground text-4xl">
            {userName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="text-center sm:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">{userName}</h1>
          <p className="text-lg text-muted-foreground">Your personal growth dashboard.</p>
          <Badge variant="secondary" className="mt-2 bg-accent/20 text-accent-foreground border-accent/50">
            <Award className="w-4 h-4 mr-1.5 text-accent" />
            Vibe Level: {vibeLevel}
          </Badge>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-md bg-card/80 backdrop-blur-sm">
                 <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Quote className="w-5 h-5 text-secondary" /> Quote of the Day</CardTitle>
                </CardHeader>
                <CardContent>
                     <blockquote className="text-foreground/90 italic border-l-4 border-secondary pl-4">
                        "{quote.text}"
                        <footer className="text-sm text-muted-foreground mt-2 not-italic">— {quote.author}</footer>
                    </blockquote>
                </CardContent>
            </Card>

            <Card className="shadow-md bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Star className="w-5 h-5 text-secondary" /> Activity At-a-Glance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <Heart className="w-6 h-6 text-accent" />
                            <span className="font-medium">Favorited Affirmations</span>
                        </div>
                        <span className="font-bold text-lg text-primary">{favoriteCount}</span>
                    </div>
                     <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <Notebook className="w-6 h-6 text-accent" />
                            <span className="font-medium">Journal Entries</span>
                        </div>
                        <span className="font-bold text-lg text-primary">{journalCount}</span>
                    </div>
                     <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                        <div className="flex items-center gap-3">
                           <BarChart className="w-6 h-6 text-accent" />
                            <span className="font-medium">Moods Logged</span>
                        </div>
                        <span className="font-bold text-lg text-primary">{moodCount}</span>
                    </div>
                </CardContent>
            </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
             <Card className="shadow-md bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BarChart className="w-5 h-5 text-secondary" /> Mood Trends (Last 7 Days)</CardTitle>
                </CardHeader>
                <CardContent>
                    {moodChartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={250}>
                            <RechartsBarChart data={moodChartData}>
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--background))',
                                        border: '1px solid hsl(var(--border))',
                                        borderRadius: 'var(--radius)',
                                    }}
                                />
                                <Bar dataKey="happy" fill="var(--color-happy, #22c55e)" stackId="a" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="calm" fill="var(--color-calm, #3b82f6)" stackId="a" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="energized" fill="var(--color-energized, #f97316)" stackId="a" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="meh" fill="var(--color-meh, #eab308)" stackId="a" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="sad" fill="var(--color-sad, #6b7280)" stackId="a" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="anxious" fill="var(--color-anxious, #8b5cf6)" stackId="a" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="angry" fill="var(--color-angry, #ef4444)" stackId="a" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="overwhelmed" fill="var(--color-overwhelmed, #4f46e5)" stackId="a" radius={[4, 4, 0, 0]} />
                            </RechartsBarChart>
                        </ResponsiveContainer>
                    ) : (
                        <p className="text-center text-muted-foreground py-8">Log your mood to see trends here.</p>
                    )}
                </CardContent>
            </Card>

            <Card className="shadow-md bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Route className="w-5 h-5 text-secondary" /> Therapy Path Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {pathProgress.length > 0 ? (
                        pathProgress.map(path => {
                            const indicatorColorClass = getColorClassFromPathColor(path.color);
                            return (
                                <div key={path.id} className="flex items-center gap-4">
                                    <div className="p-2 bg-primary/10 rounded-full">
                                        <path.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex justify-between items-baseline">
                                            <p className="font-semibold text-foreground">{path.title}</p>
                                            <p className="text-xs text-muted-foreground">{path.completedDays}/{path.totalDays} Days</p>
                                        </div>
                                        <Progress value={path.progress} indicatorClassName={indicatorColorClass} />
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                         <p className="text-center text-muted-foreground py-8">Start a therapy path to track your progress.</p>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
