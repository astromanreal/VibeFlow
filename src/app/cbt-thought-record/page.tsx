
'use client';

import { useState, useEffect, type FormEvent, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { Recycle, Save, Trash2, BrainCircuit, Sparkles, AlertCircle, Check, LoaderCircle, Lightbulb, BookOpen, ShieldAlert } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { suggestBalancedThought } from '@/ai/flows/suggest-balanced-thought';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { JournalEntry } from '../journal/page';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';

export interface ThoughtRecordEntry {
  id: string;
  date: string; // ISO string
  trigger: string;
  automaticThought: string;
  emotion: string;
  behavior: string;
  cognitiveDistortions: string[]; // array of distortion ids
  balancedThought: string;
}

const COGNITIVE_DISTORTIONS = [
  { id: 'all-or-nothing', name: 'All-or-Nothing Thinking', description: 'Viewing things in absolute, black-and-white categories.' },
  { id: 'overgeneralization', name: 'Overgeneralization', description: 'Seeing a single negative event as a never-ending pattern of defeat.' },
  { id: 'mental-filter', name: 'Mental Filter', description: 'Dwelling on a single negative detail, filtering out all the positive ones.' },
  { id: 'disqualifying-positive', name: 'Disqualifying the Positive', description: 'Rejecting positive experiences by insisting they "don\'t count."' },
  { id: 'mind-reading', name: 'Mind Reading', description: 'Assuming you know what people are thinking without evidence.' },
  { id: 'fortune-telling', name: 'Fortune-Telling', description: 'Predicting that things will turn out badly.' },
  { id: 'magnification-minimization', name: 'Magnification & Minimization', description: 'Exaggerating the importance of negative events and shrinking the positive ones.' },
  { id: 'emotional-reasoning', name: 'Emotional Reasoning', description: 'Assuming that your negative emotions reflect the way things really are.' },
  { id: 'should-statements', name: 'Should Statements', description: 'Criticizing yourself or others with "shoulds," "shouldn\'ts," "musts."' },
  { id: 'labeling', name: 'Labeling', description: 'Assigning a global, negative trait to yourself or others based on a single event.' },
  { id: 'personalization', name: 'Personalization', description: 'Blaming yourself for something you weren\'t entirely responsible for, or taking things personally.' },
];


export default function ThoughtRecordPage() {
  const [entries, setEntries] = useState<ThoughtRecordEntry[]>([]);
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);

  // Form state
  const [trigger, setTrigger] = useState('');
  const [automaticThought, setAutomaticThought] = useState('');
  const [emotion, setEmotion] = useState('');
  const [behavior, setBehavior] = useState('');
  const [selectedDistortions, setSelectedDistortions] = useState<string[]>([]);
  const [balancedThought, setBalancedThought] = useState('');
  const [isSuggesting, setIsSuggesting] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    const storedEntries = localStorage.getItem('thoughtRecords');
    if (storedEntries) {
      try {
        const parsedEntries = JSON.parse(storedEntries);
        setEntries(parsedEntries);
      } catch (error) {
        console.error("Failed to parse thought records from localStorage:", error);
        localStorage.removeItem('thoughtRecords');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('thoughtRecords', JSON.stringify(entries));
  }, [entries]);

  const resetForm = () => {
    setEditingEntryId(null);
    setTrigger('');
    setAutomaticThought('');
    setEmotion('');
    setBehavior('');
    setSelectedDistortions([]);
    setBalancedThought('');
  };

  const handleDistortionChange = (distortionId: string, checked: boolean) => {
    setSelectedDistortions(prev =>
      checked ? [...prev, distortionId] : prev.filter(id => id !== distortionId)
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!trigger.trim() || !automaticThought.trim()) {
      toast({ title: "Incomplete Entry", description: "Please fill out the Trigger and Automatic Thought fields.", variant: "destructive" });
      return;
    }

    const newEntry: ThoughtRecordEntry = {
      id: editingEntryId || crypto.randomUUID(),
      date: new Date().toISOString(),
      trigger,
      automaticThought,
      emotion,
      behavior,
      cognitiveDistortions: selectedDistortions,
      balancedThought,
    };

    if (editingEntryId) {
      setEntries(entries.map(entry => entry.id === editingEntryId ? newEntry : entry));
      toast({ title: "Success", description: "Thought Record updated." });
    } else {
      setEntries([newEntry, ...entries]);
      toast({ title: "Success", description: "Thought Record saved." });
    }
    resetForm();
  };

  const handleEdit = (entry: ThoughtRecordEntry) => {
    setEditingEntryId(entry.id);
    setTrigger(entry.trigger);
    setAutomaticThought(entry.automaticThought);
    setEmotion(entry.emotion);
    setBehavior(entry.behavior);
    setSelectedDistortions(entry.cognitiveDistortions);
    setBalancedThought(entry.balancedThought);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
    toast({ title: "Deleted", description: "Thought Record removed." });
    if (editingEntryId === id) {
      resetForm();
    }
  };

  const handleSuggestBalancedThought = async () => {
    if (!automaticThought.trim()) {
      toast({ title: "Missing Thought", description: "Please enter an automatic thought first.", variant: "destructive" });
      return;
    }
    setIsSuggesting(true);
    try {
      const distortionNames = selectedDistortions.map(id => COGNITIVE_DISTORTIONS.find(d => d.id === id)?.name || id);
      const result = await suggestBalancedThought({
        automaticThought,
        trigger,
        cognitiveDistortions: distortionNames,
      });
      setBalancedThought(result.suggestion);
       toast({ title: "Suggestion Ready", description: "Vibe has offered a balanced thought." });
    } catch (error) {
      console.error("Error suggesting balanced thought:", error);
      toast({ title: "AI Error", description: "Could not get a suggestion at this time.", variant: "destructive" });
    } finally {
      setIsSuggesting(false);
    }
  };
  
  const handleSaveToJournal = (entry: ThoughtRecordEntry) => {
    const journalText = `
Thought Record Reflection:
--------------------------
Date: ${format(new Date(entry.date), 'PPP')}

Trigger:
${entry.trigger}

Automatic Thought:
"${entry.automaticThought}"

Emotions Felt:
${entry.emotion || 'Not specified'}

Resulting Behavior:
${entry.behavior || 'Not specified'}

Identified Distortions:
${entry.cognitiveDistortions.map(id => COGNITIVE_DISTORTIONS.find(d => d.id === id)?.name).join(', ') || 'None identified'}

My Balanced Thought:
"${entry.balancedThought || 'Not specified'}"
    `.trim();

    const newJournalEntry: JournalEntry = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      text: journalText,
      topic: 'Thought Record',
    };

    try {
      const storedEntries = localStorage.getItem('journalEntries') || '[]';
      const journalEntries: JournalEntry[] = JSON.parse(storedEntries);
      localStorage.setItem('journalEntries', JSON.stringify([newJournalEntry, ...journalEntries]));
      toast({
        title: 'Saved to Journal',
        description: 'A summary of this record has been added to your journal.',
      });
    } catch (error) {
      console.error('Failed to save to journal:', error);
      toast({
        title: 'Error',
        description: 'Could not save this entry to your journal.',
        variant: 'destructive',
      });
    }
  };


  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6 text-center flex items-center justify-center gap-2">
        <Recycle className="w-8 h-8" />
        CBT Thought Record
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 shadow-lg border-accent/30 bg-card/80 backdrop-blur-sm h-fit">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-xl text-secondary">{editingEntryId ? "Edit Record" : "New Record"}</CardTitle>
              <CardDescription>A powerful tool to challenge and reframe your thoughts. You can save completed records to your <Link href="/journal" className="text-primary underline">Journal</Link>.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <Alert className="border-accent bg-accent/10">
                  <ShieldAlert className="h-4 w-4 text-accent-foreground" />
                  <AlertTitle className="text-accent-foreground">For Self-Help Only</AlertTitle>
                  <AlertDescription className="text-accent-foreground/80">
                      This is an educational tool, not a substitute for professional therapy.
                  </AlertDescription>
              </Alert>
              
              <StepCard number={1} title="The Trigger">
                <Label htmlFor="trigger">What happened? Describe the situation.</Label>
                <Textarea id="trigger" placeholder="e.g., My boss gave me critical feedback." value={trigger} onChange={(e) => setTrigger(e.target.value)} rows={2} className="mt-1" />
              </StepCard>

              <StepCard number={2} title="Automatic Thought">
                 <Label htmlFor="automatic-thought">What was the first thought that went through your mind?</Label>
                <Textarea id="automatic-thought" placeholder="e.g., 'I'm a failure and can't do anything right.'" value={automaticThought} onChange={(e) => setAutomaticThought(e.target.value)} rows={3} className="mt-1" />
              </StepCard>

              <StepCard number={3} title="Emotions & Behavior">
                 <Label htmlFor="emotion">How did that thought make you feel?</Label>
                <Textarea id="emotion" placeholder="e.g., Ashamed, anxious, sad." value={emotion} onChange={(e) => setEmotion(e.target.value)} rows={2} className="mt-1" />
                 <Label htmlFor="behavior" className="mt-4 block">What did you do?</Label>
                <Textarea id="behavior" placeholder="e.g., Avoided eye contact for the rest of the day." value={behavior} onChange={(e) => setBehavior(e.target.value)} rows={2} className="mt-1" />
              </StepCard>

              <StepCard number={4} title="Cognitive Distortions">
                <Label>Did any of these thinking patterns apply?</Label>
                 <Accordion type="single" collapsible className="w-full mt-1">
                  <AccordionItem value="distortions">
                    <AccordionTrigger className="text-sm text-muted-foreground hover:no-underline">View distortion list</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                      {COGNITIVE_DISTORTIONS.map(d => (
                        <div key={d.id} className="flex items-start gap-3">
                          <Checkbox
                            id={`dist-${d.id}`}
                            checked={selectedDistortions.includes(d.id)}
                            onCheckedChange={(checked) => handleDistortionChange(d.id, !!checked)}
                          />
                          <div className="grid gap-1.5 leading-none">
                            <label htmlFor={`dist-${d.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{d.name}</label>
                            <p className="text-xs text-muted-foreground">{d.description}</p>
                          </div>
                        </div>
                      ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </StepCard>

              <StepCard number={5} title="The Balanced Thought">
                 <Label htmlFor="balanced-thought">What is a more realistic or compassionate way to see this?</Label>
                <Textarea id="balanced-thought" placeholder="e.g., 'The feedback was about one task, not my entire worth. It's an opportunity to learn.'" value={balancedThought} onChange={(e) => setBalancedThought(e.target.value)} rows={4} className="mt-1" />
                 <Button type="button" variant="outline" size="sm" onClick={handleSuggestBalancedThought} disabled={isSuggesting} className="mt-2">
                    {isSuggesting ? <LoaderCircle className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2 text-accent" />}
                    Ask Vibe for a suggestion
                </Button>
              </StepCard>

            </CardContent>
            <CardFooter className="flex justify-between">
              {editingEntryId ? (
                <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
              ) : <div></div>}
              <Button type="submit">
                <Save className="w-4 h-4 mr-2" />
                {editingEntryId ? "Update Record" : "Save Record"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <Card className="lg:col-span-2 shadow-lg border-accent/30 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-secondary">Past Records</CardTitle>
            <CardDescription>Your journey of thought restructuring.</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[700px] pr-4">
              {entries.length > 0 ? (
                <div className="space-y-6">
                  {entries.map(entry => {
                    const distortions = entry.cognitiveDistortions.map(id => COGNITIVE_DISTORTIONS.find(d => d.id === id)).filter(Boolean);
                    return (
                      <div key={entry.id} className="pb-4 border-b last:border-b-0">
                        <div className="flex justify-between items-start mb-3">
                            <p className="font-semibold text-sm text-foreground">{format(new Date(entry.date), 'PPP p')}</p>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" onClick={() => handleSaveToJournal(entry)} aria-label="Save to Journal"><BookOpen className="w-4 h-4 text-green-500" /></Button>
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(entry)} aria-label="Edit entry"><Save className="w-4 h-4 text-blue-500" /></Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(entry.id)} aria-label="Delete entry"><Trash2 className="w-4 h-4 text-destructive" /></Button>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <ThoughtRecordField title="Situation (Trigger)" content={entry.trigger} />
                          <ThoughtRecordField title="Automatic Thought" content={`"${entry.automaticThought}"`} isQuote />
                           {distortions.length > 0 && (
                            <div>
                               <h4 className="font-semibold text-xs text-muted-foreground mb-1 uppercase tracking-wider">Identified Distortions</h4>
                               <div className="flex flex-wrap gap-2">
                                  {distortions.map(d => d && <Badge key={d.id} variant="secondary">{d.name}</Badge>)}
                               </div>
                            </div>
                           )}
                           <ThoughtRecordField title="Balanced Thought" content={entry.balancedThought ? `"${entry.balancedThought}"` : "Not yet specified."} isQuote isPositive />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                 <div className="text-center text-muted-foreground py-8">
                    <BrainCircuit className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                    <p>No thought records yet.</p>
                    <p className="text-xs mt-2">Start by filling out the form to challenge a negative thought.</p>
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


const StepCard = ({ number, title, children }: { number: number, title: string, children: ReactNode }) => (
    <div>
        <h3 className="flex items-center gap-2 mb-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary text-secondary-foreground font-bold text-sm">{number}</span>
            <span className="font-semibold text-secondary">{title}</span>
        </h3>
        <div className="pl-8 border-l-2 border-secondary/20 pb-2">
            <div className="p-3 rounded-md bg-background/50 space-y-2">
                {children}
            </div>
        </div>
    </div>
);

const ThoughtRecordField = ({ title, content, isQuote = false, isPositive = false }: { title: string, content: string, isQuote?: boolean, isPositive?: boolean }) => (
   <div>
      <h4 className="font-semibold text-xs text-muted-foreground mb-1 uppercase tracking-wider">{title}</h4>
      <p className={cn(
        "text-sm text-foreground/90 bg-muted/30 p-2 rounded-md whitespace-pre-wrap",
        isQuote && "italic",
        isPositive && "border-l-4 border-green-500 bg-green-500/10"
      )}>
        {content}
      </p>
   </div>
);
