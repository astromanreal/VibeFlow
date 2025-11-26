'use client';

import type { Affirmation } from '@/services/affirmations';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface AffirmationCardProps {
  affirmation: Affirmation;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  className?: string;
}

export default function AffirmationCard({
  affirmation,
  isFavorite,
  onToggleFavorite,
  className,
}: AffirmationCardProps) {

  return (
    <div className={cn("flex items-start space-x-4 p-4 rounded-lg", className)}>
      <div className="flex-1 space-y-2">
        <p className="text-lg font-medium text-foreground">{affirmation.text}</p>
        <Badge variant="outline" className="text-sm">{affirmation.category}</Badge>
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onToggleFavorite(affirmation.id)}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className="text-muted-foreground hover:text-accent"
        >
          <Heart className={cn("w-5 h-5", isFavorite ? "fill-accent text-accent" : "")} />
        </Button>
      </div>
    </div>
  );
}
