
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, HeartHandshake, Quote, Sparkles } from "lucide-react";

const insights = [
    {
        title: "The 5-Minute Rule",
        content: "If a task takes less than five minutes to complete, do it immediately. This practice, popularized by David Allen, prevents small tasks from piling up and creating mental clutter.",
        category: "Productivity & Focus"
    },
    {
        title: "The Power of a 'Nature Pill'",
        content: "Studies show that spending just 20 minutes in a natural setting can significantly lower stress hormones. You don't need a long hike; a park or even a tree-lined street will do.",
        category: "Stress Reduction"
    },
    {
        title: "Labeling Emotions",
        content: "Simply naming your emotion (e.g., saying 'This is anxiety' or 'I'm feeling disappointment') can reduce its intensity. This technique, known as 'affect labeling,' engages the prefrontal cortex, which helps regulate emotional responses.",
        category: "Emotional Regulation"
    },
    {
        title: "Smiling Signals the Brain",
        content: "The physical act of smiling, even if it's forced, can send signals to your brain that may help improve your mood. It's a simple form of 'facial feedback' that can create a positive loop.",
        category: "Mood & Well-being"
    },
    {
        title: "The 20-Second Hug",
        content: "Research shows that a 20-second hug can release oxytocin, the 'bonding hormone,' which lowers heart rate and cortisol levels, effectively reducing stress and improving feelings of connection.",
        category: "Stress & Connection"
    },
    {
        title: "The Zeigarnik Effect",
        content: "Our brains tend to remember unfinished tasks better than completed ones, causing mental clutter. Simply making a concrete plan to finish a task can quiet this effect and free up mental space.",
        category: "Productivity & Focus"
    },
];

const gratitudePrompts = [
    "What is one small thing you're grateful for right now, in this very moment?",
    "Think of a person who has helped you recently. What specific quality about them are you thankful for?",
    "What is a simple pleasure you experienced today (e.g., a warm cup of coffee, a song you love)?",
    "What is something about your body you are grateful for today? (e.g., your lungs for breathing, your legs for walking)",
    "What is a challenge you've overcome that you can now be grateful for what it taught you?",
    "What is something in nature you found beautiful today?",
    "Acknowledge a modern convenience you're thankful for (e.g., running water, the internet).",
];

const reflectionQuotes = [
    { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
    { text: "Your calm is your power.", author: "Unknown" },
    { text: "The journey of a thousand miles begins with a single step.", author: "Lao Tzu" },
    { text: "What you think, you become. What you feel, you attract. What you imagine, you create.", author: "Buddha" },
    { text: "Between stimulus and response there is a space. In that space is our power to choose our response. In our response lies our growth and our freedom.", author: "Viktor E. Frankl" },
    { text: "The past has no power over the present moment.", author: "Eckhart Tolle" },
    { text: "Almost everything will work again if you unplug it for a few minutes, including you.", author: "Anne Lamott" },
];


export default function MindfulMomentsPage() {

    return (
        <div className="container mx-auto py-8 px-4 space-y-12">
            <header className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2 flex items-center justify-center gap-2">
                    <BrainCircuit className="w-8 h-8 text-accent" />
                    Mindful Moments
                </h1>
                <p className="text-lg text-muted-foreground">
                    A collection of insights, prompts, and reflections for your daily practice.
                </p>
            </header>

            <section>
                 <h2 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-3">
                    <Sparkles className="w-6 h-6" />
                    Science-Backed Insights
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {insights.map((item, index) => (
                        <Card key={`insight-${index}`} className="shadow-md bg-card/80 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-lg text-primary">{item.title}</CardTitle>
                                <CardDescription>{item.category}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-foreground/90">{item.content}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
            
            <section>
                <h2 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-3">
                    <HeartHandshake className="w-6 h-6" />
                    Gratitude Prompts
                </h2>
                 <div className="space-y-4">
                    {gratitudePrompts.map((prompt, index) => (
                         <div key={`prompt-${index}`} className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-muted/50">
                            <HeartHandshake className="w-5 h-5 text-pink-500 mt-1 shrink-0" />
                            <p className="text-foreground/90">{prompt}</p>
                        </div>
                    ))}
                </div>
            </section>

             <section>
                <h2 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-3">
                    <Quote className="w-6 h-6 transform scale-x-[-1]" />
                    Daily Reflection Thoughts
                </h2>
                 <div className="space-y-4">
                     {reflectionQuotes.map((quote, index) => (
                        <div key={`quote-${index}`} className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-muted/50">
                           <Quote className="w-6 h-6 text-secondary mt-1 shrink-0 transform scale-x-[-1]" />
                           <blockquote className="text-foreground/90 italic">
                                "{quote.text}"
                                <footer className="text-sm text-muted-foreground mt-2 not-italic">— {quote.author}</footer>
                           </blockquote>
                         </div>
                     ))}
                </div>
            </section>

        </div>
    );
}
