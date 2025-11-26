'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { Notebook, Smile, Meh, Frown, Save, Trash2, Tag } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge'; // Import Badge

// Exporting JournalEntry type
export interface JournalEntry {
  id: string;
  date: string; // ISO string format
  gratitude: string; // Renaming for clarity, though it can hold any text
  mood?: 'happy' | 'neutral' | 'sad';
  topic?: string; // Added topic field
}

const MOOD_OPTIONS = [
  { value: 'happy', label: 'Happy', icon: <Smile className="w-4 h-4 text-green-500" /> },
  { value: 'neutral', label: 'Neutral', icon: <Meh className="w-4 h-4 text-yellow-500" /> },
  { value: 'sad', label: 'Sad', icon: <Frown className="w-4 h-4 text-red-500" /> },
];

const TOPICS = ["Gratitude", "Wisdom", "Science", "Manifestation", "Reflection", "General"];

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [entryInput, setEntryInput] = useState(''); // Renamed from gratitudeInput
  const [selectedMood, setSelectedMood] = useState<'happy' | 'neutral' | 'sad' | undefined>(undefined);
  const [selectedTopic, setSelectedTopic] = useState<string | undefined>(TOPICS[0]); // Default topic
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  const { toast } = useToast();

  // Load entries from localStorage on mount
  useEffect(() => {
    const storedEntries = localStorage.getItem('journalEntries');
    if (storedEntries) {
      try {
         const parsedEntries = JSON.parse(storedEntries);
         // Ensure mood and topic are valid or undefined
         const validEntries = parsedEntries.map((entry: any) => ({
            ...entry,
            gratitude: entry.gratitude ?? entry.text ?? '', // Handle potential legacy field name 'text'
            mood: ['happy', 'neutral', 'sad'].includes(entry.mood) ? entry.mood : undefined,
            topic: typeof entry.topic === 'string' && TOPICS.includes(entry.topic) ? entry.topic : TOPICS[5], // Default to General if missing or invalid
         }));
        setEntries(validEntries);
      } catch (error) {
        console.error("Failed to parse journal entries from localStorage:", error);
        localStorage.removeItem('journalEntries'); // Clear corrupted data
      }
    }
  }, []);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries));
  }, [entries]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!entryInput.trim() && !selectedMood && !selectedTopic) {
       toast({ title: "Empty Entry", description: "Please write something, select a mood, or select a topic.", variant: "destructive" });
       return;
    };

    const newEntry: JournalEntry = {
      id: editingEntryId || crypto.randomUUID(),
      date: new Date().toISOString(),
      gratitude: entryInput, // Use entryInput here
      mood: selectedMood,
      topic: selectedTopic || TOPICS[5], // Ensure topic is set, default to General
    };

     if (editingEntryId) {
      // Update existing entry
      setEntries(entries.map(entry => entry.id === editingEntryId ? newEntry : entry));
      toast({ title: "Success", description: "Journal entry updated." });
      setEditingEntryId(null); // Exit editing mode
    } else {
      // Add new entry
      setEntries([newEntry, ...entries]); // Add to the beginning
       toast({ title: "Success", description: "Journal entry saved." });
    }

    // Reset form
    setEntryInput('');
    setSelectedMood(undefined);
    setSelectedTopic(TOPICS[0]); // Reset topic to default
  };

   const handleEdit = (entry: JournalEntry) => {
      setEditingEntryId(entry.id);
      setEntryInput(entry.gratitude); // Use entryInput here
      setSelectedMood(entry.mood);
      setSelectedTopic(entry.topic || TOPICS[5]); // Set topic or default
    };

   const handleDelete = (id: string) => {
      setEntries(entries.filter(entry => entry.id !== id));
      toast({ title: "Deleted", description: "Journal entry removed." });
       if (editingEntryId === id) { // If deleting the entry being edited, reset form
          handleCancelEdit(); // Use cancel function to reset all fields
       }
    };

    const handleCancelEdit = () => {
       setEditingEntryId(null);
       setEntryInput(''); // Use entryInput here
       setSelectedMood(undefined);
       setSelectedTopic(TOPICS[0]); // Reset topic to default
    };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6 text-center flex items-center justify-center gap-2">
        <Notebook className="w-8 h-8" />
        Daily Journal & Mood Tracker
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Entry Form Card */}
        <Card className="md:col-span-1 shadow-lg border-accent/30 bg-card/80 backdrop-blur-sm">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-xl text-secondary">{editingEntryId ? "Edit Entry" : "New Entry"}</CardTitle>
              <CardDescription>Record your thoughts, gratitude, and track your mood.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div>
                 <Label htmlFor="topic">Topic</Label>
                 <Select value={selectedTopic || TOPICS[5]} onValueChange={(value) => setSelectedTopic(value === 'clear-topic' ? undefined : (value || TOPICS[5]))}>
                   <SelectTrigger id="topic" className="w-full mt-1">
                     <SelectValue placeholder="Select a topic" />
                   </SelectTrigger>
                   <SelectContent>
                     {TOPICS.map(topic => (
                       <SelectItem key={topic} value={topic}>
                         <div className="flex items-center gap-2">
                           <Tag className="w-4 h-4 text-muted-foreground" />
                           <span>{topic}</span>
                         </div>
                       </SelectItem>
                     ))}
                   </SelectContent>
                 </Select>
               </div>
              <div>
                <Label htmlFor="entry">Your thoughts for today?</Label> {/* Changed label */}
                <Textarea
                  id="entry" // Changed id
                  placeholder={`Write about ${selectedTopic?.toLowerCase() || 'anything'}...`} // Dynamic placeholder
                  value={entryInput} // Use entryInput here
                  onChange={(e) => setEntryInput(e.target.value)} // Use setEntryInput here
                  rows={5}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="mood">How are you feeling?</Label>
                 <Select value={selectedMood || "clear-mood"} onValueChange={(value) => setSelectedMood(value === 'clear-mood' ? undefined : (value as 'happy' | 'neutral' | 'sad' || undefined))}>
                  <SelectTrigger id="mood" className="w-full mt-1">
                    <SelectValue placeholder="Select your mood (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                     {/* Add an item to clear the mood selection */}
                     <SelectItem value="clear-mood">
                        <div className="flex items-center gap-2 text-muted-foreground">
                           <span>-- No Mood --</span>
                        </div>
                     </SelectItem>
                    {MOOD_OPTIONS.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          {option.icon}
                          <span>{option.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {editingEntryId && (
                 <Button type="button" variant="outline" onClick={handleCancelEdit}>Cancel</Button>
              )}
               {!editingEntryId && <div></div> /* Placeholder to keep button aligned right */}
              <Button type="submit" >
                <Save className="w-4 h-4 mr-2" />
                {editingEntryId ? "Update Entry" : "Save Entry"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* Entries List Card */}
        <Card className="md:col-span-2 shadow-lg border-accent/30 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-secondary">Past Entries</CardTitle>
             <CardDescription>Your reflections over time.</CardDescription>
          </CardHeader>
          <CardContent>
             <ScrollArea className="h-[400px] pr-4">
              {entries.length > 0 ? (
                <div className="space-y-6">
                  {entries.map(entry => (
                    <div key={entry.id} className="pb-4 border-b last:border-b-0">
                        <div className="flex justify-between items-start mb-2">
                             <div>
                                <p className="font-semibold text-sm text-foreground">
                                {format(new Date(entry.date), 'PPP p')} {/* Format: Sep 10, 2024 3:30 PM */}
                                </p>
                                <div className="flex items-center gap-2 mt-1 flex-wrap">
                                    {entry.topic && (
                                        <Badge variant={entry.topic === 'Manifestation' ? 'outline' : 'secondary'}>
                                          {entry.topic}
                                        </Badge>
                                    )}
                                    {entry.mood && (
                                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                        {MOOD_OPTIONS.find(m => m.value === entry.mood)?.icon}
                                        <span>{MOOD_OPTIONS.find(m => m.value === entry.mood)?.label}</span>
                                    </div>
                                    )}
                                </div>
                             </div>
                             <div className="flex gap-2">
                                 <Button variant="ghost" size="icon" onClick={() => handleEdit(entry)} aria-label="Edit entry">
                                    {/* Using descriptive icon (Pencil or similar would be better if available) */}
                                     <Save className="w-4 h-4 text-blue-500" />
                                 </Button>
                                 <Button variant="ghost" size="icon" onClick={() => handleDelete(entry.id)} aria-label="Delete entry">
                                     <Trash2 className="w-4 h-4 text-destructive" />
                                 </Button>
                            </div>
                        </div>

                        {entry.gratitude ? ( // Check if gratitude/entry text exists
                             <p className="text-sm text-foreground whitespace-pre-wrap">{entry.gratitude}</p>
                        ) : (
                             <p className="text-sm text-muted-foreground italic">No text recorded for this entry.</p>
                        )}
                     </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">No journal entries yet. Start by adding one!</p>
              )}
             </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

