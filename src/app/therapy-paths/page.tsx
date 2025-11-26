
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Route, ChevronRight, CheckCircle, Hourglass } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { therapyPathsList, therapyPathsDetailed, type TherapyPathInfo } from '@/services/therapy-paths';

interface PathWithProgress extends TherapyPathInfo {
    progress: number;
    completedDays: number;
    totalDays: number;
}

export default function TherapyPathsPage() {
    const [inProgressPaths, setInProgressPaths] = useState<PathWithProgress[]>([]);
    const [completedPaths, setCompletedPaths] = useState<PathWithProgress[]>([]);
    const [groupedNotStartedPaths, setGroupedNotStartedPaths] = useState<Record<string, PathWithProgress[]>>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadedPaths = therapyPathsList.map(pathInfo => {
            const storageKey = `therapy-path-progress-${pathInfo.id}`;
            const storedProgress = localStorage.getItem(storageKey);
            const detailedPath = therapyPathsDetailed[pathInfo.id];
            const totalDays = detailedPath.sessions.length;

            let completedDays = 0;
            if (storedProgress) {
                try {
                    const parsedData = JSON.parse(storedProgress);
                    if (Array.isArray(parsedData)) {
                        completedDays = new Set(parsedData).size;
                    }
                } catch (e) {
                    console.error('Failed to parse progress for path:', pathInfo.id, e);
                    completedDays = 0;
                }
            }

            const progress = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;
            return { ...pathInfo, progress, completedDays, totalDays };
        });

        const inProgress = loadedPaths.filter(p => p.progress > 0 && p.progress < 100);
        const completed = loadedPaths.filter(p => p.progress === 100);
        const notStarted = loadedPaths.filter(p => p.progress === 0);

        const grouped = notStarted.reduce((acc, path) => {
            const theme = path.theme || 'General';
            if (!acc[theme]) acc[theme] = [];
            acc[theme].push(path);
            return acc;
        }, {} as Record<string, PathWithProgress[]>);

        setInProgressPaths(inProgress);
        setCompletedPaths(completed);
        setGroupedNotStartedPaths(grouped);
        setIsLoading(false);
    }, []);

    const themeOrder = [
        'Anxiety', 'Emotional Regulation', 'Self-Esteem & Identity',
        'Healing & Recovery', 'Mental Skills & Focus',
        'Mindfulness', 'Lifestyle & Balance', 'Spiritual & Inner Growth'
    ];

    const sortedGroupedPaths = Object.entries(groupedNotStartedPaths).sort(([a], [b]) => {
        const indexA = themeOrder.indexOf(a);
        const indexB = themeOrder.indexOf(b);
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
    });

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="text-center space-y-2 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary flex items-center justify-center gap-3">
          <Route className="w-10 h-10 text-accent" />
          Therapy Paths
        </h1>
        <p className="text-lg md:text-xl text-foreground/80">
          Structured, self-guided programs for emotional and mental wellness.
        </p>
      </header>
      
      <div className="w-full max-w-5xl mx-auto space-y-16">
        
        {/* Dashboard Section */}
        <section>
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Your Journey Dashboard</CardTitle>
              <CardDescription>Pick up where you left off or celebrate your completed paths.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* In Progress */}
              <div>
                <h3 className="text-xl font-semibold text-secondary mb-4 flex items-center gap-2">
                  <Hourglass className="w-5 h-5" />
                  In Progress
                </h3>
                {isLoading ? <p>Loading...</p> : inProgressPaths.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {inProgressPaths.map(path => (
                      <DashboardPathCard key={path.id} path={path} />
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm p-4 text-center bg-muted/50 rounded-lg">Start a path from the "Explore" section below to see it here.</p>
                )}
              </div>

              {/* Completed */}
              <div>
                <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Completed
                </h3>
                 {isLoading ? <p>Loading...</p> : completedPaths.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {completedPaths.map(path => (
                      <DashboardPathCard key={path.id} path={path} isCompleted />
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm p-4 text-center bg-muted/50 rounded-lg">Your completed paths will appear here. Keep going!</p>
                )}
              </div>
            </CardContent>
          </Card>
        </section>


        {/* Explore New Paths Section */}
        <div>
            <h2 className="text-3xl font-bold text-center text-primary mb-8">Explore New Paths</h2>
            <div className="space-y-12">
                {sortedGroupedPaths.map(([theme, paths]) => (
                    <section key={theme}>
                        <h3 className="text-2xl font-bold text-secondary mb-6">{theme}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {paths.map((path) => (
                            <Card key={path.id} className={cn(
                                "bg-card/80 backdrop-blur-sm shadow-lg border-b-4 flex flex-col transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1",
                                path.color.replace('border-', 'border-b-')
                            )}>
                            <CardHeader>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-3 rounded-full bg-primary/10">
                                        <path.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <Badge variant="outline" className="border-accent/30 bg-accent/10 text-accent-foreground">{path.duration}</Badge>
                                </div>
                                <CardTitle className="text-xl text-primary">{path.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-sm text-foreground/80 mb-4">{path.description}</p>
                            </CardContent>
                            <CardFooter>
                                <Link href={`/therapy-paths/${path.id}`} passHref className="w-full">
                                    <Button variant="default" className="w-full">
                                        Start Path
                                        <ChevronRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                            </CardFooter>
                            </Card>
                        ))}
                        </div>
                    </section>
                ))}
                {sortedGroupedPaths.length === 0 && !isLoading && (
                    <p className="text-center text-muted-foreground py-8">🎉 You've started all available paths! Visit your dashboard to continue.</p>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}


function DashboardPathCard({ path, isCompleted = false }: { path: PathWithProgress; isCompleted?: boolean }) {
  return (
    <Link href={`/therapy-paths/${path.id}`} passHref>
      <div className={cn(
          "group block p-4 rounded-lg border bg-background hover:bg-muted/50 transition-all h-full",
          isCompleted ? "border-green-500/40" : "border-border"
      )}>
        <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-primary/10 rounded-full">
                <path.icon className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-semibold text-primary group-hover:text-secondary">{path.title}</h4>
        </div>
        <p className="text-xs text-muted-foreground mb-3">{path.description}</p>
        <div>
            <div className="flex justify-between items-center text-xs text-muted-foreground mb-1">
                <span>Progress</span>
                <span>{path.completedDays}/{path.totalDays} Days</span>
            </div>
            <Progress value={path.progress} className="h-2" indicatorClassName={isCompleted ? "bg-green-500" : ""} />
        </div>
      </div>
    </Link>
  );
}
