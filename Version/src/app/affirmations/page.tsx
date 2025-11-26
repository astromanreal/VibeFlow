
'use client';

import { useState, useEffect } from 'react';
import type { Affirmation } from '@/services/affirmations';
import { getAffirmationsByCategory } from '@/services/affirmations';
import AffirmationCard from '@/components/affirmation-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Image as ImageIcon, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = [
  "Self-love", "Abundance", "Health", "Confidence", "Peace",
  "Relationships", "Purpose", "Healing", "Growth", "Presence"
];

interface GalleryAffirmation extends Affirmation {
  imageUrl: string;
  altText: string;
}

const driveImageLinks = [
  "https://drive.google.com/file/d/11rv--B3a7c2f3OdjBp-xtO6m_g-hPNlQ/view?usp=sharing",
  "https://drive.google.com/file/d/12xU4TOc8cDxCmtVyIji0hNNk3XgcDP-M/view?usp=sharing",
  "https://drive.google.com/file/d/14N-QOy5KOsWt62k91mob1p64f3zvJ1Qn/view?usp=sharing",
  // "https://drive.google.com/file/d/14jvtfr3AKI7HjGv1RCSTiZQOnwAY14Ah/view?usp=sharing", // Removed fourth link
  "https://drive.google.com/file/d/16LczEqzWFrNueF6L3R-AFw6EWP2jklv4/view?usp=sharing",
  "https://drive.google.com/file/d/16Nsrf8r7GJwYD_6VJsKnYyxP2hFGA4hb/view?usp=sharing",
  "https://drive.google.com/file/d/16SsOJWHuEteSZ9ovxqq2GorCoH5E_gYE/view?usp=sharing",
  "https://drive.google.com/file/d/16TNyBBmju2HqUq14Zold7sjrRpUzYCEG/view?usp=sharing",
  "https://drive.google.com/file/d/1CTYVRTJm_HO3NkJmFAVtnKX3XUz2uGST/view?usp=sharing",
  "https://drive.google.com/file/d/1D190WSDQTl1ABfnHaewpSr49FefHFdqB/view?usp=sharing",
  "https://drive.google.com/file/d/1DP53YCRVHICjvY8qddH-DDndfgwwk5Zl/view?usp=sharing",
  "https://drive.google.com/file/d/1E8v2GazbaQc--IhKAk4UBZdJdthNSd72/view?usp=sharing",
  "https://drive.google.com/file/d/1Fb_e8y-bV4kVNNP4nR9dJp9BWLPWWMMV/view?usp=sharing",
  "https://drive.google.com/file/d/1KSe8Nen3_FTBxL-QlQdCpD0CVAmi5kJs/view?usp=sharing",
  "https://drive.google.com/file/d/1Lv1u4RqHav-TNEosuqxjLwXA82hxu-GQ/view?usp=sharing",
  "https://drive.google.com/file/d/1MbUP0eEyArH7Eecszpx2Tddlm60l2KIW/view?usp=sharing",
  "https://drive.google.com/file/d/1NP1zYdjKyj1sdaLCpfCbwxmMOl4ir5AU/view?usp=sharing",
  "https://drive.google.com/file/d/1NSasUJpfWjVTeGdhKQuZsxqgTb-bWrev/view?usp=sharing",
  "https://drive.google.com/file/d/1O0h9XoGC9_Uu7C5y4u_jrKzx7qtaomLB/view?usp=sharing",
  "https://drive.google.com/file/d/1XX5Lk1fbdBBC4c37rrkKkEPS_qGRmLBb/view?usp=sharing",
  "https://drive.google.com/file/d/1XYuj2gxsA83TnqlY0xytz55yRZvTBPNh/view?usp=sharing",
  "https://drive.google.com/file/d/1Xeqb2jeLRfleRgDki_JJ80CIsR4B-aIX/view?usp=sharing",
  "https://drive.google.com/file/d/1YSAKywJRP0MnvEQypj3ZbvOiJApWk8Ex/view?usp=sharing",
  "https://drive.google.com/file/d/1Z498xglvod3IiRtPpZMx8u7aZhhe3uoC/view?usp=sharing",
  "https://drive.google.com/file/d/1Za_L-81QWTUxlJ1VAdOhq3NaPHBBYNT_/view?usp=sharing",
  "https://drive.google.com/file/d/1ZmuPc9y3JimIgIKbq5m34KUF1FJ1CuAm/view?usp=sharing",
  "https://drive.google.com/file/d/1bcNDYXAKCQVL8_VMQjT2Wt08M09AJax9/view?usp=sharing",
  "https://drive.google.com/file/d/1bpPUaDduTiZr-kYEZGJq50CPS1P2BkSr/view?usp=sharing",
  "https://drive.google.com/file/d/1bzJc2tsLkzC225DCUFqO-GgfKBXxTs_j/view?usp=sharing",
  "https://drive.google.com/file/d/1f3zcukXjUgVN3U9q3ZWjXOqEFika_0EX/view?usp=sharing",
  "https://drive.google.com/file/d/1f7-1AzoOjMtEA8Q6CFupDdZdx_bLS3cv/view?usp=sharing",
  "https://drive.google.com/file/d/1f8z5RhzG86iTakS8B9RAJ4A-ZghTbDGP/view?usp=sharing",
  "https://drive.google.com/file/d/1ix3JS0sENOnLghR0jCFx2TOcInKfLOdf/view?usp=sharing",
  "https://drive.google.com/file/d/1yh5SYwQdE4P3ZbLjVX6oawqYu9X7d9qT/view?usp=sharing",
];

const galleryAffirmationTexts = [
    "I am radiant and full of light.", "My life is a magnet for miracles.", "Every breath I take fills me with healing energy.", "I step into my power with grace.", "Stillness and calm are my natural state.", "Love flows to and through me effortlessly.", "I live each day aligned with my deepest purpose.",
    "I embrace my unique journey with joy.", "Abundance surrounds me in every form.", "My body is strong, healthy, and resilient.", "I am confident in my decisions and abilities.", "Peace begins with me, in my heart.", "My relationships are harmonious and fulfilling.", "I am a channel for creative energy and inspiration.",
    "I am worthy of all good things.", "I attract positive opportunities.", "I listen to my body's wisdom.", "I speak my truth with clarity and kindness.", "I find peace in the present moment.", "I connect deeply with others.", "My purpose unfolds beautifully.",
    "I release what no longer serves me.", "I grow stronger with every challenge.", "I am present and mindful in my daily life.", "My heart is open to giving and receiving love.", "I am a powerful creator of my reality.", "Health and vitality are my birthright.", "I trust my intuition and inner guidance.",
    "I cultivate an attitude of gratitude.", "My relationships are a source of joy and support.", "I am aligned with my soul's mission.", "I choose healing and wholeness.", "Every day is a new opportunity for growth.", "I cherish the beauty of this moment."
];


const galleryAffirmationsData: GalleryAffirmation[] = driveImageLinks.map((link, index) => {
  const fileId = link.split('/d/')[1].split('/')[0];
  const category = categories[index % categories.length]; // Cycle through categories
  const text = galleryAffirmationTexts[index % galleryAffirmationTexts.length]; // Cycle through texts
  return {
    id: `gal_img_${index + 1}`,
    category: category,
    text: text,
    imageUrl: `https://drive.google.com/uc?export=view&id=${fileId}`,
    altText: `Affirmation for ${category.toLowerCase()}: ${text}`,
  };
});


const demoAffirmationsFullList: Affirmation[] = [
  { id: 'aff_001', category: 'Abundance', text: 'I attract prosperity and joy with ease.' },
  { id: 'aff_002', category: 'Abundance', text: 'I am open to receiving unlimited wealth.' },
  { id: 'sl_001', category: 'Self-love', text: 'I deeply and completely love and accept myself.' },
  { id: 'sl_002', category: 'Self-love', text: 'My self-worth is high and ever-increasing.' },
  { id: 'sl_003', category: 'Self-love', text: 'I am worthy of love, respect, and happiness.' },
  { id: 'sl_004', category: 'Self-love', text: 'I treat myself with kindness and compassion.' },
  { id: 'ab_001', category: 'Abundance', text: 'Prosperity flows to me from expected and unexpected sources.' },
  { id: 'ab_003', category: 'Abundance', text: 'I live in a universe of abundance and plenty.' }, // Note: Original ab_002 was same as aff_002, adjusted to avoid exact duplicate text for variation
  { id: 'ab_004', category: 'Abundance', text: 'I release all resistance to attracting money.' },
  { id: 'h_001', category: 'Health', text: 'My body is vibrant, healthy, and full of energy.' },
  { id: 'h_002', category: 'Health', text: 'I make choices that support my well-being.' },
  { id: 'h_003', category: 'Health', text: 'Every cell in my body vibrates with health and vitality.' },
  { id: 'h_004', category: 'Health', text: 'I am grateful for my healthy and strong body.' },
  { id: 'c_001', category: 'Confidence', text: 'I believe in my abilities and express myself authentically.' },
  { id: 'c_002', category: 'Confidence', text: 'I am confident, capable, and strong.' },
  { id: 'c_003', category: 'Confidence', text: 'I face challenges with courage and grace.' },
  { id: 'c_004', category: 'Confidence', text: 'My confidence grows stronger every day.' },
  { id: 'p_001', category: 'Peace', text: 'Inner peace flows through me in every moment.' },
  { id: 'p_002', category: 'Peace', text: 'I release worry and embrace tranquility.' },
  { id: 'p_003', category: 'Peace', text: 'My mind is calm, centered, and at ease.' },
  { id: 'p_004', category: 'Peace', text: 'I choose peace over conflict and harmony over discord.' },
  { id: 'r_001', category: 'Relationships', text: 'I attract loving and supportive relationships.' },
  { id: 'r_002', category: 'Relationships', text: 'My relationships are built on mutual respect and love.' },
  { id: 'r_003', category: 'Relationships', text: 'I communicate openly and honestly in my relationships.' },
  { id: 'r_004', category: 'Relationships', text: 'I am grateful for the love that surrounds me.' },
  { id: 'pu_001', category: 'Purpose', text: 'I am living my life purpose with passion and joy.' },
  { id: 'pu_002', category: 'Purpose', text: 'My unique talents and gifts serve the world.' },
  { id: 'pu_003', category: 'Purpose', text: 'I am guided towards my highest path.' },
  { id: 'pu_004', category: 'Purpose', text: 'I make a positive difference in the world.' },
  { id: 'he_001', category: 'Healing', text: 'I release the past and embrace healing.' },
  { id: 'he_002', category: 'Healing', text: 'My body, mind, and spirit are healing naturally.' },
  { id: 'he_003', category: 'Healing', text: 'I forgive myself and others, freeing myself to heal.' },
  { id: 'he_004', category: 'Healing', text: 'I allow healing energy to flow through me.' },
  { id: 'g_001', category: 'Growth', text: 'I am constantly evolving and growing stronger.' },
  { id: 'g_002', category: 'Growth', text: 'I embrace change as an opportunity for growth.' },
  { id: 'g_003', category: 'Growth', text: 'Every experience teaches me valuable lessons.' },
  { id: 'g_004', category: 'Growth', text: 'I am expanding my potential every day.' },
  { id: 'pre_001', category: 'Presence', text: 'I am fully present and engaged in the now.' },
  { id: 'pre_002', category: 'Presence', text: 'I anchor myself in this moment with gratitude.' },
  { id: 'pre_003', category: 'Presence', text: 'I observe my thoughts without judgment.' },
  { id: 'pre_004', category: 'Presence', text: 'The present moment is where my power lies.' },
  { id: "daily_001", category: "Presence", text: "I am grounded and centered in this present moment." },
];


export default function AffirmationsPage() {
  const [affirmations, setAffirmations] = useState<Affirmation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);


  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteAffirmations');
    if (storedFavorites) {
      try {
        setFavorites(new Set(JSON.parse(storedFavorites)));
      } catch (error) {
        console.error("Error parsing favorites from localStorage:", error);
        localStorage.removeItem('favoriteAffirmations');
      }
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    // The service getAffirmationsByCategory is now a mock returning [],
    // as all static text affirmations are in demoAffirmationsFullList.
    getAffirmationsByCategory(selectedCategory)
      .then(serviceFetchedData => { // serviceFetchedData will be [] from the mock service
        setTimeout(() => {
          // The main source of truth for display is demoAffirmationsFullList.
          // If serviceFetchedData were to provide additional, unique items, they'd be included here.
          const combinedData = [...serviceFetchedData, ...demoAffirmationsFullList];
          const uniqueAffirmations = Array.from(new Map(combinedData.map(item => [item.id, item])).values());
          const filteredAffirmations = uniqueAffirmations.filter(aff => aff.category === selectedCategory);
          setAffirmations(filteredAffirmations);
          setLoading(false);
        }, 500);
      })
      .catch(error => {
        console.error("Failed to fetch affirmations:", error);
        toast({
          title: "Error",
          description: "Could not load affirmations. Please try again later.",
          variant: "destructive",
        });
        // Fallback to demo list if service fails (though service is mock now)
        const filteredDemoAffirmations = demoAffirmationsFullList.filter(aff => aff.category === selectedCategory);
        setAffirmations(filteredDemoAffirmations);
        setLoading(false);
      });
  }, [selectedCategory, toast]);


  const handleToggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    let message = "";
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
      message = "Removed from favorites";
    } else {
      newFavorites.add(id);
      message = "Added to favorites";
    }
    setFavorites(newFavorites);
    localStorage.setItem('favoriteAffirmations', JSON.stringify(Array.from(newFavorites)));
    toast({
        title: "Success",
        description: message,
      });
  };

  const openGallery = () => {
    setCurrentGalleryIndex(0);
    setIsGalleryOpen(true);
  };

  const nextGalleryItem = () => {
    setCurrentGalleryIndex((prevIndex) => (prevIndex + 1) % galleryAffirmationsData.length);
  };

  const prevGalleryItem = () => {
    setCurrentGalleryIndex((prevIndex) => (prevIndex - 1 + galleryAffirmationsData.length) % galleryAffirmationsData.length);
  };


  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">Affirmations</h1>
        <p className="text-muted-foreground">Explore positive statements for various aspects of your life.</p>
        <Button onClick={openGallery} variant="outline" className="mt-4 group">
            <ImageIcon className="w-5 h-5 mr-2 group-hover:text-accent transition-colors" />
            View Affirmation Gallery
        </Button>
      </div>

      <Tabs defaultValue={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <div className="overflow-x-auto pb-2">
             <TabsList className="mb-6 flex w-max mx-auto">
            {categories.map(category => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>


        <Card className="shadow-lg border-accent/30 bg-card/80 backdrop-blur-sm">
           <CardHeader>
             <CardTitle className="text-2xl text-center text-secondary">{selectedCategory} Affirmations</CardTitle>
           </CardHeader>
           <CardContent>
              <TabsContent value={selectedCategory}>
                 {loading ? (
                    <div className="space-y-4">
                       {[...Array(3)].map((_, i) => (
                         <div key={i} className="flex items-start space-x-4 p-4 rounded-lg border">
                             <div className="flex-1 space-y-2">
                                 <Skeleton className="h-6 w-3/4" />
                                 <Skeleton className="h-4 w-1/4" />
                             </div>
                             <Skeleton className="h-10 w-10 rounded-full" />
                         </div>
                        ))}
                    </div>
                  ) : affirmations.length > 0 ? (
                    <div className="space-y-4">
                      {affirmations.map(affirmation => (
                        <AffirmationCard
                          key={affirmation.id}
                          affirmation={affirmation}
                          isFavorite={favorites.has(affirmation.id)}
                          onToggleFavorite={handleToggleFavorite}
                          className="border rounded-lg hover:bg-muted/50 transition-colors duration-200 ease-in-out"
                        />
                      ))}
                    </div>
                  ) : (
                     <p className="text-center text-muted-foreground py-8">No affirmations found for this category yet.</p>
                  )}
              </TabsContent>
            </CardContent>
         </Card>

         {favorites.size > 0 && (
          <Card className="mt-8 shadow-lg border-accent/30 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-secondary">Your Favorites</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="space-y-4">
                {Array.from(favorites)
                  .map(favId => {
                      const allAffirmationsForFavorites = [
                          ...demoAffirmationsFullList, // Text affirmations
                          ...galleryAffirmationsData, // Image affirmations from gallery
                      ];
                      return allAffirmationsForFavorites.find(aff => aff.id === favId);
                  })
                  .filter((aff): aff is Affirmation => !!aff) // Type guard to ensure aff is not undefined
                  .map(affirmation => (
                  <AffirmationCard
                    key={`fav-${affirmation.id}`}
                    affirmation={affirmation}
                    isFavorite={true} // It's in the favorites list, so true
                    onToggleFavorite={handleToggleFavorite}
                    className="border rounded-lg bg-muted/30"
                  />
                ))}
                 {/* This checks if any of the favorite IDs match IDs in our combined list */}
                 {Array.from(favorites).filter(favId => [...demoAffirmationsFullList, ...galleryAffirmationsData].some(aff => aff.id === favId)).length === 0 && (
                      <p className="text-center text-muted-foreground py-8">You haven't added any affirmations to your favorites yet.</p>
                  )}
              </div>
            </CardContent>
          </Card>
         )}
      </Tabs>

      <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
        <DialogContent className="w-[95vw] max-w-xl p-0 bg-card/90 backdrop-blur-md shadow-2xl rounded-xl">
          <DialogHeader className="p-4 sm:p-6 border-b">
            <DialogTitle className="text-center text-primary text-xl sm:text-2xl">Affirmation Gallery</DialogTitle>
            <DialogDescription className="text-center text-muted-foreground text-sm sm:text-base">
                Visual affirmations to inspire you.
            </DialogDescription>
          </DialogHeader>
          {galleryAffirmationsData.length > 0 ? (
            <div className="p-4 sm:p-6 space-y-4">
              <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-lg border border-accent/30">
                <Image
                  key={galleryAffirmationsData[currentGalleryIndex].imageUrl}
                  src={galleryAffirmationsData[currentGalleryIndex].imageUrl}
                  alt={galleryAffirmationsData[currentGalleryIndex].altText}
                  layout="fill"
                  objectFit="cover"
                  className="transition-opacity duration-500 ease-in-out"
                  data-ai-hint={`${galleryAffirmationsData[currentGalleryIndex].category.toLowerCase()} inspiration`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 p-4 flex flex-col justify-end">
                  <p className="text-white text-base sm:text-lg font-semibold drop-shadow-md">
                    {galleryAffirmationsData[currentGalleryIndex].text}
                  </p>
                   <p className="text-xs text-white/80 drop-shadow-sm">
                    {galleryAffirmationsData[currentGalleryIndex].category}
                  </p>
                </div>
                 <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleToggleFavorite(galleryAffirmationsData[currentGalleryIndex].id)}
                    aria-label={favorites.has(galleryAffirmationsData[currentGalleryIndex].id) ? "Remove from favorites" : "Add to favorites"}
                    className="absolute top-3 right-3 text-white/80 hover:text-accent bg-black/40 hover:bg-black/60 rounded-full p-2 transition-colors"
                  >
                    <Heart className={cn("w-5 h-5", favorites.has(galleryAffirmationsData[currentGalleryIndex].id) ? "fill-accent text-accent" : "text-white/80")} />
                  </Button>
              </div>
              <div className="flex justify-between items-center pt-2">
                <Button onClick={prevGalleryItem} variant="outline" size="icon" aria-label="Previous Affirmation" className="rounded-full">
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <span className="text-sm text-muted-foreground tabular-nums">
                  {currentGalleryIndex + 1} / {galleryAffirmationsData.length}
                </span>
                <Button onClick={nextGalleryItem} variant="outline" size="icon" aria-label="Next Affirmation" className="rounded-full">
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          ) : (
            <p className="p-6 text-center text-muted-foreground">Gallery is empty.</p>
          )}
          <DialogFooter className="p-4 sm:p-6 border-t">
            <DialogClose asChild>
              <Button type="button" variant="secondary" className="w-full sm:w-auto">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}

    
