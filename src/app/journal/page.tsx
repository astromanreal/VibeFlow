
'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { Notebook, Save, Trash2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';

export interface JournalEntry {
  id: string;
  date: string; // ISO string format
  text: string; // Main entry text
  topic: string;
}

const TOPICS = ["Reflection", "Gratitude", "Wisdom", "Goals", "Ideas", "General"];

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [entryInput, setEntryInput] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string>(TOPICS[0]);
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    const storedEntries = localStorage.getItem('journalEntries');
    if (storedEntries) {
      try {
        const parsedEntries = JSON.parse(storedEntries) as JournalEntry[];
        // Basic validation
        const validEntries = parsedEntries.filter(e => e.id && e.date && e.text && e.topic);
        setEntries(validEntries);
      } catch (error) {
        console.error("Failed to parse journal entries from localStorage:", error);
        localStorage.removeItem('journalEntries');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries));
  }, [entries]);

  const resetForm = () => {
    setEditingEntryId(null);
    setEntryInput('');
    setSelectedTopic(TOPICS[0]);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!entryInput.trim()) {
      toast({ title: "Empty Entry", description: "Please write something to save.", variant: "destructive" });
      return;
    }

    const newEntry: JournalEntry = {
      id: editingEntryId || crypto.randomUUID(),
      date: new Date().toISOString(),
      text: entryInput,
      topic: selectedTopic,
    };

    if (editingEntryId) {
      setEntries(entries.map(entry => entry.id === editingEntryId ? newEntry : entry));
      toast({ title: "Success", description: "Journal entry updated." });
    } else {
      setEntries([newEntry, ...entries]);
      toast({ title: "Success", description: "Journal entry saved." });
    }
    resetForm();
  };

  const handleEdit = (entry: JournalEntry) => {
    setEditingEntryId(entry.id);
    setEntryInput(entry.text);
    setSelectedTopic(entry.topic);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
    toast({ title: "Deleted", description: "Journal entry removed." });
    if (editingEntryId === id) {
      resetForm();
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6 text-center flex items-center justify-center gap-2">
        <Notebook className="w-8 h-8" />
        My Therapeutic Journal
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 shadow-lg border-accent/30 bg-card/80 backdrop-blur-sm">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-xl text-secondary">{editingEntryId ? "Edit Entry" : "New Entry"}</CardTitle>
              <CardDescription>A space for your thoughts and reflections.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="topic">Topic</Label>
                <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                    <SelectTrigger id="topic" className="w-full mt-1">
                        <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent>
                        {TOPICS.map(topic => (
                            <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="entry">Today's Thoughts</Label>
                <Textarea id="entry" placeholder="Write about your day, what you're grateful for, or anything on your mind..." value={entryInput} onChange={(e) => setEntryInput(e.target.value)} rows={12} className="mt-1" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {editingEntryId ? (
                <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
              ) : <div></div>}
              <Button type="submit">
                <Save className="w-4 h-4 mr-2" />
                {editingEntryId ? "Update Entry" : "Save Entry"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <Card className="lg:col-span-2 shadow-lg border-accent/30 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-secondary">Past Entries</CardTitle>
            <CardDescription>Your reflections over time.</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] pr-4">
              {entries.length > 0 ? (
                <div className="space-y-6">
                  {entries.map(entry => (
                      <div key={entry.id} className="pb-4 border-b last:border-b-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold text-sm text-foreground">{format(new Date(entry.date), 'PPP p')}</p>
                            <div className="mt-1">
                              <Badge variant="secondary">{entry.topic}</Badge>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(entry)} aria-label="Edit entry"><Save className="w-4 h-4 text-blue-500" /></Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(entry.id)} aria-label="Delete entry"><Trash2 className="w-4 h-4 text-destructive" /></Button>
                          </div>
                        </div>

                        <div className="space-y-3">
                           <p className="text-sm text-foreground whitespace-pre-wrap">{entry.text}</p>
                        </div>
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
