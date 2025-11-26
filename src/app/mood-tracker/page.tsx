
import { Suspense } from 'react';
import MoodTrackerContent from '@/app/mood-tracker/mood-tracker-content';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { HeartPulse } from 'lucide-react';

function MoodTrackerFallback() {
    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6 text-center flex items-center justify-center gap-2">
                <HeartPulse className="w-8 h-8" />
                Mood Tracker
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1 shadow-lg">
                    <CardHeader>
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-4 w-48 mt-2" />
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-20 w-full" />
                    </CardContent>
                </Card>
                <Card className="lg:col-span-2 shadow-lg">
                    <CardHeader>
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-4 w-48 mt-2" />
                    </CardHeader>
                    <CardContent>
                        <div className="h-[600px] flex items-center justify-center">
                            <p className="text-muted-foreground">Loading entries...</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default function MoodTrackerPage() {
    return (
        <Suspense fallback={<MoodTrackerFallback />}>
            <MoodTrackerContent />
        </Suspense>
    );
}
