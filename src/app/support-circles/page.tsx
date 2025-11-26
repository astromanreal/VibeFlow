
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Users, Heart, Zap, Brain, ChevronRight, HandHeart, UserCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

export interface SupportCircle {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  theme: string;
  color: string;
}

export const supportCirclesData: SupportCircle[] = [
  {
    id: 'anxiety-circle',
    title: 'Anxiety Circle',
    description: 'A space to share experiences and coping strategies for anxiety and stress.',
    icon: Zap,
    theme: 'Anxiety',
    color: 'border-purple-500/30 hover:shadow-purple-400/20'
  },
  {
    id: 'grief-loss-circle',
    title: 'Grief & Loss Circle',
    description: 'Find support and understanding as you navigate the journey of grief.',
    icon: HandHeart,
    theme: 'Grief',
    color: 'border-gray-500/30 hover:shadow-gray-400/20'
  },
  {
    id: 'healing-circle',
    title: 'Inner Healing Circle',
    description: 'Connect with others on a path of healing from past wounds and trauma.',
    icon: Heart,
    theme: 'Healing',
    color: 'border-pink-500/30 hover:shadow-pink-400/20'
  },
  {
    id: 'self-esteem-circle',
    title: 'Self-Esteem Builders',
    description: 'A circle dedicated to building self-worth, confidence, and self-love.',
    icon: UserCheck,
    theme: 'Confidence',
    color: 'border-blue-500/30 hover:shadow-blue-400/20'
  },
];


export default function SupportCirclesPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="text-center space-y-2 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary flex items-center justify-center gap-3">
          <Users className="w-10 h-10 text-accent" />
          Support Circles
        </h1>
        <p className="text-lg md:text-xl text-foreground/80">
          Connect, share, and find support in anonymous, themed groups.
        </p>
      </header>
      
      <section className="w-full max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {supportCirclesData.map((circle) => (
            <Card key={circle.id} className={cn(
                "bg-card/80 backdrop-blur-sm shadow-lg border hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col",
                circle.color
            )}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 rounded-full bg-primary/10">
                        <circle.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <Badge variant="secondary">{circle.theme}</Badge>
                    </div>
                </div>
                <CardTitle className="text-xl text-primary">{circle.title}</CardTitle>
                <CardDescription>{circle.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                {/* Content can be added here if needed */}
              </CardContent>
              <CardFooter>
                 <Link href={`/support-circles/${circle.id}`} passHref className="w-full">
                    <Button variant="default" className="w-full">
                        Join Circle <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        <Card className="mt-8 bg-muted/50 border-dashed">
             <CardHeader className="text-center">
                 <CardTitle className="text-lg text-muted-foreground">More circles coming soon!</CardTitle>
                 <CardDescription>We're always working on creating new safe spaces for our community.</CardDescription>
            </CardHeader>
        </Card>
      </section>
    </div>
  );
}
