
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Lock, ArrowLeft, Star, ArrowRight, BookOpen, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { therapyPathsDetailed, getPracticeIcon } from '@/services/therapy-paths';
import { cn } from '@/lib/utils';

// A simple hook to manage progress in localStorage
const usePathProgress = (pathId: string) => {
    const storageKey = `therapy-path-progress-${pathId}`;
    const [completedDays, setCompletedDays] = useState<Set<number>>(new Set());
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedProgress = localStorage.getItem(storageKey);
            if (storedProgress) {
                try {
                    setCompletedDays(new Set(JSON.parse(storedProgress)));
                } catch (e) {
                    console.error("Failed to parse progress", e);
                }
            }
            setIsLoaded(true);
        }
    }, [storageKey]);

    const toggleDayCompletion = (day: number) => {
        setCompletedDays(prev => {
            const newProgress = new Set(prev);
            if (newProgress.has(day)) {
                newProgress.delete(day);
            } else {
                newProgress.add(day);
            }
            localStorage.setItem(storageKey, JSON.stringify(Array.from(newProgress)));
            return newProgress;
        });
    };

    return { completedDays, toggleDayCompletion, isLoaded };
};

export default function TherapyPathDetailPage() {
  const params = useParams();
  const pathId = params.pathId as string;
  const path = therapyPathsDetailed[pathId];
  
  const { completedDays, toggleDayCompletion, isLoaded } = usePathProgress(pathId);
  const [activeDay, setActiveDay] = useState<number | null>(null);

  useEffect(() => {
    if(isLoaded && path) {
        let firstUncompletedDay = -1;
        for (const session of path.sessions) {
            if (!completedDays.has(session.day)) {
                firstUncompletedDay = session.day;
                break;
            }
        }
        const targetDay = firstUncompletedDay !== -1 ? firstUncompletedDay : path.sessions.length > 0 ? path.sessions.length : null;
        setActiveDay(targetDay);
        if (targetDay) {
            scrollToDay(targetDay);
        }
    }
  }, [isLoaded, path, completedDays]);

  if (!path) {
    notFound();
  }
  
  const progressPercentage = (completedDays.size / path.sessions.length) * 100;
  const isCompleted = progressPercentage === 100;
  
  const toggleActiveDay = (day: number) => {
      setActiveDay(current => (current === day ? null : day));
  };
  
  const scrollToDay = (day: number) => {
    setTimeout(() => {
        const element = document.getElementById(`day-card-${day}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 100);
  }

  const handleContinue = () => {
    let firstUncompletedDay = -1;
    for (const session of path.sessions) {
        if (!completedDays.has(session.day)) {
            firstUncompletedDay = session.day;
            break;
        }
    }
    const continueDay = firstUncompletedDay !== -1 ? firstUncompletedDay : (path.sessions.length > 0 ? path.sessions.length : 1);
    setActiveDay(continueDay);
    scrollToDay(continueDay);
  };

  return (
    <div className="container mx-auto py-8 px-4">
       <Link href="/therapy-paths" className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-6">
         <ArrowLeft className="w-4 h-4" />
         Back to All Paths
       </Link>

       <Card className="shadow-lg border-primary/20 bg-card/80 backdrop-blur-sm overflow-hidden">
         <CardHeader className="p-6 border-b">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10 self-start">
                    <path.icon className="w-8 h-8 text-primary" />
                </div>
                <div>
                    <Badge variant="secondary" className="w-fit mb-2">{path.theme}</Badge>
                    <CardTitle className="text-3xl text-primary">{path.title}</CardTitle>
                </div>
            </div>
           <CardDescription className="pt-2">{path.description}</CardDescription>
         </CardHeader>
         <CardContent className="p-6">
            <div className="space-y-2 mb-8 p-4 bg-muted/50 rounded-lg border">
                 <div className="flex justify-between items-center text-sm font-medium">
                     <span className="text-primary">Your Progress</span>
                     <span className="text-muted-foreground">{completedDays.size} / {path.sessions.length} Days Complete</span>
                 </div>
                 <Progress value={progressPercentage} className="w-full" />
            </div>

            <div className="space-y-4">
                {path.sessions.map((session, index) => {
                    const isDayCompleted = completedDays.has(session.day);
                    const isLocked = index > 0 && !completedDays.has(path.sessions[index - 1].day);
                    const isActive = activeDay === session.day;

                    return (
                        <Card 
                            key={session.day} 
                            id={`day-card-${session.day}`}
                            className={cn(
                                "overflow-hidden transition-all duration-300 ease-in-out",
                                isLocked && "bg-muted/50 opacity-60 cursor-not-allowed",
                                isDayCompleted && "bg-green-500/10 border-green-500/30",
                                isActive && !isLocked && "border-primary shadow-lg"
                            )}
                        >
                            <button
                                onClick={() => !isLocked && toggleActiveDay(session.day)}
                                disabled={isLocked}
                                className="w-full text-left p-4 flex items-center gap-4 cursor-pointer disabled:cursor-not-allowed"
                                aria-expanded={isActive}
                            >
                                <div className="shrink-0">
                                    {isLocked ? (
                                        <Lock className="w-6 h-6 text-muted-foreground" />
                                    ) : isDayCompleted ? (
                                        <CheckCircle className="w-6 h-6 text-green-500" />
                                    ) : (
                                        <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center text-xs font-bold text-primary">
                                            {session.day}
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <p className="text-lg font-semibold text-foreground">{session.title}</p>
                                    <p className="text-sm text-muted-foreground">Practice: {session.practiceType}</p>
                                </div>
                                {!isLocked && (
                                    <ChevronRight className={cn("w-5 h-5 text-muted-foreground transition-transform", isActive && "transform rotate-90")} />
                                )}
                            </button>

                            {isActive && !isLocked && (
                                <div className="p-6 pt-2 border-t space-y-6 animate-in fade-in-0 duration-300">
                                    <div>
                                        <h4 className="font-semibold text-secondary mb-2 flex items-center gap-2">
                                            {React.createElement(BookOpen, { className: "w-5 h-5" })} Lesson
                                        </h4>
                                        <p className="text-foreground/90 whitespace-pre-line leading-relaxed border-l-2 pl-4">{session.lesson}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-secondary mb-2 flex items-center gap-2">
                                            {React.createElement(getPracticeIcon(session.practiceType), { className: "w-5 h-5" })} Practice: {session.practiceType}
                                        </h4>
                                        <div className="text-foreground/90 bg-muted/30 p-4 rounded-md border border-dashed">
                                            <p className="whitespace-pre-line leading-relaxed">{session.practiceDetails}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-secondary mb-2 flex items-center gap-2">
                                            <Star className="w-5 h-5 text-accent" /> Daily Affirmation
                                        </h4>
                                        <p className="text-foreground/90 italic text-center p-3 bg-accent/10 rounded-md">"{session.affirmation}"</p>
                                    </div>
                                    <Button onClick={() => toggleDayCompletion(session.day)} variant={isDayCompleted ? "outline" : "default"} className="mt-4">
                                        {isDayCompleted ? <CheckCircle className="w-4 h-4 mr-2" /> : null}
                                        {isDayCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
                                    </Button>
                                </div>
                            )}
                        </Card>
                    );
                })}
            </div>

            <div className="mt-8 text-center">
                {isCompleted ? (
                     <div className="flex flex-col items-center gap-4 p-6 bg-green-500/10 rounded-lg">
                        <p className="text-xl font-semibold text-green-600">🎉 Congratulations on completing this path!</p>
                        <Link href="/therapy-paths" passHref>
                           <Button>Explore Other Paths</Button>
                        </Link>
                     </div>
                ) : (
                    <Button size="lg" onClick={handleContinue}>
                        Continue Path
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                )}
            </div>

         </CardContent>
       </Card>
    </div>
  );
}
