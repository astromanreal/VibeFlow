
'use client';

import React, { useState, useEffect, type FormEvent, type ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { HeartPulse, Smile, Meh, Frown, Save, Trash2, Angry, ShieldAlert, BrainCircuit, Leaf, Zap } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from '@/lib/utils';
import { Slider } from "@/components/ui/slider";
import { Input } from '@/components/ui/input';

export interface MoodEntry {
  id: string;
  date: string; // ISO string format
  mood: 'happy' | 'anxious' | 'sad' | 'angry' | 'calm' | 'energized' | 'overwhelmed' | 'meh';
  energyLevel: number;
  stressLevel: number;
  motivationLevel: number;
  triggers?: string; // Could be comma-separated tags
  thoughts?: string; // For CBT-style thought records
}

type MoodValue = 'happy' | 'anxious' | 'sad' | 'angry' | 'calm' | 'energized' | 'overwhelmed' | 'meh';

const MOOD_OPTIONS: { value: MoodValue; label: string; icon: ReactNode; color: string; bg: string; border: string; }[] = [
  { value: 'happy', label: 'Happy', icon: <Smile className="w-6 h-6" />, color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500' },
  { value: 'energized', label: 'Energized', icon: <Zap className="w-6 h-6" />, color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500' },
  { value: 'calm', label: 'Calm', icon: <Leaf className="w-6 h-6" />, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500' },
  { value: 'meh', label: 'Meh', icon: <Meh className="w-6 h-6" />, color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500' },
  { value: 'sad', label: 'Sad', icon: <Frown className="w-6 h-6" />, color: 'text-gray-500', bg: 'bg-gray-500/10', border: 'border-gray-500' },
  { value: 'anxious', label: 'Anxious', icon: <ShieldAlert className="w-6 h-6" />, color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500' },
  { value: 'angry', label: 'Angry', icon: <Angry className="w-6 h-6" />, color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500' },
  { value: 'overwhelmed', label: 'Overwhelmed', icon: <BrainCircuit className="w-6 h-6" />, color: 'text-indigo-500', bg: 'bg-indigo-500/10', border: 'border-indigo-500' },
];

const energyColorScale = ['#a5f3fc', '#67e8f9', '#22d3ee', '#06b6d4', '#0891b2', '#0e7490', '#155e75', '#164e63', '#083344', '#082f49'];
const stressColorScale = ['#4ade80', '#86efac', '#a7f3d0', '#fde047', '#facc15', '#f59e0b', '#f97316', '#ef4444', '#dc2626', '#b91c1c'];
const motivationColorScale = ['#e9d5ff', '#d8b4fe', '#c084fc', '#a855f7', '#9333ea', '#7e22ce', '#6b21a8', '#581c87', '#4c1d95', '#3b0764'];

const LevelSlider = ({
  label,
  value,
  onValueChange,
  minLabel,
  maxLabel,
  colorScale,
}: {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  minLabel: string;
  maxLabel: string;
  colorScale: string[];
}) => {
  const color = colorScale[value - 1];

  return (
    <div className="space-y-2">
      <Label htmlFor={`${label}-level`} className="flex justify-between items-center font-semibold">
        <span>{label}</span>
        <span className="font-bold text-lg" style={{ color }}>{value}</span>
      </Label>
      <Slider
        id={`${label}-level`}
        min={1}
        max={10}
        step={1}
        value={[value]}
        onValueChange={(val) => onValueChange(val[0])}
        style={{ '--slider-color': color } as React.CSSProperties}
      />
      <div className="flex justify-between items-center text-xs text-muted-foreground">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
};

const LevelIndicator = ({ label, value, colorScale }: { label: string; value: number; colorScale: string[] }) => {
  const color = colorScale[value - 1];
  return (
    <div className="bg-muted/30 p-2 rounded-md">
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className="h-1.5 w-full bg-muted rounded-full">
        <div className="h-1.5 rounded-full" style={{ width: `${value * 10}%`, backgroundColor: color }}></div>
      </div>
       <div className="font-semibold text-sm mt-1" style={{ color }}>{value}<span className="text-xs text-muted-foreground">/10</span></div>
    </div>
  );
};


export default function MoodTrackerPage() {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [selectedMood, setSelectedMood] = useState<MoodValue | undefined>(undefined);
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);

  const [energyLevel, setEnergyLevel] = useState(5);
  const [stressLevel, setStressLevel] = useState(5);
  const [motivationLevel, setMotivationLevel] = useState(5);
  const [triggers, setTriggers] = useState('');
  const [thoughts, setThoughts] = useState('');

  const { toast } = useToast();
  const searchParams = useSearchParams();

  useEffect(() => {
    const moodFromQuery = searchParams.get('mood') as MoodValue | null;
    if (moodFromQuery && MOOD_OPTIONS.some(o => o.value === moodFromQuery)) {
        setSelectedMood(moodFromQuery);
    }
  }, [searchParams]);

  useEffect(() => {
    const storedEntries = localStorage.getItem('moodEntries');
    if (storedEntries) {
      try {
        const parsedEntries = JSON.parse(storedEntries);
        setEntries(parsedEntries);
      } catch (error) {
        console.error("Failed to parse mood entries from localStorage:", error);
        localStorage.removeItem('moodEntries');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('moodEntries', JSON.stringify(entries));
  }, [entries]);

  const resetForm = () => {
    setEditingEntryId(null);
    setSelectedMood(undefined);
    setEnergyLevel(5);
    setStressLevel(5);
    setMotivationLevel(5);
    setTriggers('');
    setThoughts('');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedMood) {
      toast({ title: "Mood Required", description: "Please select a mood to log your entry.", variant: "destructive" });
      return;
    }

    const newEntry: MoodEntry = {
      id: editingEntryId || crypto.randomUUID(),
      date: new Date().toISOString(),
      mood: selectedMood,
      energyLevel,
      stressLevel,
      motivationLevel,
      triggers,
      thoughts,
    };

    if (editingEntryId) {
      setEntries(entries.map(entry => entry.id === editingEntryId ? newEntry : entry));
      toast({ title: "Success", description: "Mood entry updated." });
    } else {
      setEntries([newEntry, ...entries]);
      toast({ title: "Success", description: "Mood entry saved." });
    }
    resetForm();
  };

  const handleEdit = (entry: MoodEntry) => {
    setEditingEntryId(entry.id);
    setSelectedMood(entry.mood);
    setEnergyLevel(entry.energyLevel);
    setStressLevel(entry.stressLevel);
    setMotivationLevel(entry.motivationLevel);
    setTriggers(entry.triggers ?? '');
    setThoughts(entry.thoughts ?? '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
    toast({ title: "Deleted", description: "Mood entry removed." });
    if (editingEntryId === id) {
      resetForm();
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6 text-center flex items-center justify-center gap-2">
        <HeartPulse className="w-8 h-8" />
        Mood Tracker
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 shadow-lg border-accent/30 bg-card/80 backdrop-blur-sm">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-xl text-secondary">{editingEntryId ? "Edit Mood Log" : "New Mood Log"}</CardTitle>
              <CardDescription>Log your mood, energy, and thoughts to build self-awareness.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>How are you feeling?</Label>
                <RadioGroup
                  value={selectedMood}
                  onValueChange={(value) => setSelectedMood(value as MoodValue)}
                  className="grid grid-cols-4 gap-2 mt-2"
                >
                  {MOOD_OPTIONS.map(mood => (
                    <div key={mood.value} className="flex flex-col items-center space-y-1">
                      <RadioGroupItem value={mood.value} id={`mood-${mood.value}`} className="sr-only" />
                      <Label
                        htmlFor={`mood-${mood.value}`}
                        className={cn(
                          "cursor-pointer rounded-full p-2 border-2 border-transparent transition-all",
                          "hover:scale-105",
                          selectedMood === mood.value ? `${mood.bg} ${mood.border} scale-110 shadow-lg` : 'hover:bg-muted'
                        )}
                      >
                        {mood.icon}
                      </Label>
                      <span className="text-xs text-muted-foreground">{mood.label}</span>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-6">
                <LevelSlider
                  label="Energy Level"
                  value={energyLevel}
                  onValueChange={setEnergyLevel}
                  minLabel="Drained"
                  maxLabel="Vibrant"
                  colorScale={energyColorScale}
                />
                 <LevelSlider
                  label="Stress Level"
                  value={stressLevel}
                  onValueChange={setStressLevel}
                  minLabel="Calm"
                  maxLabel="Overwhelmed"
                  colorScale={stressColorScale}
                />
                 <LevelSlider
                  label="Motivation"
                  value={motivationLevel}
                  onValueChange={setMotivationLevel}
                  minLabel="Uninspired"
                  maxLabel="Driven"
                  colorScale={motivationColorScale}
                />
              </div>

               <div>
                <Label htmlFor="triggers">What triggered this mood? (optional)</Label>
                <Input id="triggers" placeholder="e.g., work, conversation, a memory" value={triggers} onChange={(e) => setTriggers(e.target.value)} className="mt-1"/>
              </div>

              <div>
                <Label htmlFor="thoughts">What were you thinking? (optional)</Label>
                <Textarea id="thoughts" placeholder="Tell us more—what’s on your mind today?" value={thoughts} onChange={(e) => setThoughts(e.target.value)} rows={3} className="mt-1"/>
              </div>

            </CardContent>
            <CardFooter className="flex justify-between">
              {editingEntryId ? (
                <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
              ) : <div></div>}
              <Button type="submit">
                <Save className="w-4 h-4 mr-2" />
                {editingEntryId ? "Update Log" : "Save Log"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <Card className="lg:col-span-2 shadow-lg border-accent/30 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-secondary">Past Mood Logs</CardTitle>
            <CardDescription>Your emotional patterns over time.</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[700px] pr-4">
              {entries.length > 0 ? (
                <div className="space-y-6">
                  {entries.map(entry => {
                    const moodInfo = MOOD_OPTIONS.find(m => m.value === entry.mood);
                    return (
                      <div key={entry.id} className="pb-4 border-b last:border-b-0">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="font-semibold text-sm text-foreground">{format(new Date(entry.date), 'PPP p')}</p>
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                              {moodInfo && (
                                <Badge variant="outline" className={cn("flex items-center gap-1.5", moodInfo.bg, moodInfo.border, moodInfo.color.replace('text-', 'text-'))}>
                                  {React.cloneElement(moodInfo.icon as React.ReactElement, { className: 'w-4 h-4' })}
                                  <span>{moodInfo.label}</span>
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(entry)} aria-label="Edit entry"><Save className="w-4 h-4 text-blue-500" /></Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(entry.id)} aria-label="Delete entry"><Trash2 className="w-4 h-4 text-destructive" /></Button>
                          </div>
                        </div>

                        <div className="space-y-3">
                           <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                                <LevelIndicator label="Energy" value={entry.energyLevel} colorScale={energyColorScale} />
                                <LevelIndicator label="Stress" value={entry.stressLevel} colorScale={stressColorScale} />
                                <LevelIndicator label="Motivation" value={entry.motivationLevel} colorScale={motivationColorScale} />
                            </div>
                          {entry.thoughts && (
                             <div>
                               <h4 className="font-semibold text-xs text-muted-foreground mb-1">THOUGHTS</h4>
                               <p className="text-sm text-foreground/80 italic bg-muted/30 p-2 rounded-md whitespace-pre-wrap">"{entry.thoughts}"</p>
                             </div>
                          )}
                           {entry.triggers && (
                               <div>
                                 <h4 className="font-semibold text-xs text-muted-foreground mb-1">TRIGGERS</h4>
                                 <p className="text-sm text-foreground/80 bg-muted/30 p-2 rounded-md">{entry.triggers}</p>
                               </div>
                           )}
                           {!entry.thoughts && !entry.triggers && entries.length > 0 && (
                             <p className="text-sm text-muted-foreground italic pt-2">No detailed notes for this entry.</p>
                           )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <HeartPulse className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                  <p>No mood logs yet.</p>
                  <p className="text-xs mt-2">Start by filling out the form to see your history.</p>
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
