
'use client';

import { useState, useEffect } from 'react';
import type { Affirmation } from '@/services/affirmations';
import AffirmationCard from '@/components/affirmation-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription as DialogDesc,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Image as ImageIcon, Heart, Star, Smile, Wind, Edit } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = [
  "Self-love", "Abundance", "Health", "Confidence", "Peace",
  "Relationships", "Purpose", "Healing", "Growth", "Presence",
  "Creativity", "Forgiveness", "Courage", "Spirituality"
];

interface GalleryAffirmation extends Affirmation {
  imageUrl: string;
  altText: string;
}

const driveImageLinks = [
  "https://drive.google.com/file/d/11rv--B3a7c2f3OdjBp-xtO6m_g-hPNlQ/view?usp=sharing",
  "https://drive.google.com/file/d/12xU4TOc8cDxCmtVyIji0hNNk3XgcDP-M/view?usp=sharing",
  "https://drive.google.com/file/d/14N-QOy5KOsWt62k91mob1p64f3zvJ1Qn/view?usp=sharing",
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
  const category = categories[index % categories.length];
  const text = galleryAffirmationTexts[index % galleryAffirmationTexts.length];
  return {
    id: `gal_img_${index + 1}`,
    category: category,
    text: text,
    imageUrl: `https://drive.google.com/uc?export=view&id=${fileId}`,
    altText: `Visual affirmation for ${category.toLowerCase()}: ${text}`,
  };
});


const demoAffirmationsFullList: Affirmation[] = [
  // Self-love
  { id: 'sl_001', category: 'Self-love', text: 'I deeply and completely love and accept myself.' },
  { id: 'sl_002', category: 'Self-love', text: 'My self-worth is high and ever-increasing.' },
  { id: 'sl_003', category: 'Self-love', text: 'I am enough just as I am.' },
  { id: 'sl_004', category: 'Self-love', text: 'I treat myself with kindness and respect.' },
  // Abundance
  { id: 'ab_001', category: 'Abundance', text: 'I attract wealth and abundance effortlessly.' },
  { id: 'ab_002', category: 'Abundance', text: 'I am open to receiving limitless abundance.' },
  { id: 'ab_003', category: 'Abundance', text: 'My life is filled with prosperity.' },
  { id: 'ab_004', category: 'Abundance', text: 'I am worthy of financial success.' },
  // Health
  { id: 'h_001', category: 'Health', text: 'Every cell in my body is healthy and vibrant.' },
  { id: 'h_002', category: 'Health', text: 'I am grateful for my strong and healthy body.' },
  { id: 'h_003', category: 'Health', text: 'I choose foods that nourish and heal me.' },
  { id: 'h_004', category: 'Health', text: 'I am full of vitality and energy.' },
  // Confidence
  { id: 'c_001', category: 'Confidence', text: 'I believe in myself and my abilities.' },
  { id: 'c_002', category: 'Confidence', text: 'I face challenges with courage and strength.' },
  { id: 'c_003', category: 'Confidence', text: 'I radiate confidence and positivity.' },
  { id: 'c_004', category: 'Confidence', text: 'My voice matters, and I speak with clarity.' },
  // Peace
  { id: 'p_001', category: 'Peace', text: 'I am calm, centered, and grounded.' },
  { id: 'p_002', category: 'Peace', text: 'Peace begins with me.' },
  { id: 'p_003', category: 'Peace', text: 'I let go of all that no longer serves me.' },
  { id: 'p_004', category: 'Peace', text: 'My mind is at peace with the past.' },
  // Relationships
  { id: 'r_001', category: 'Relationships', text: 'I attract loving and supportive relationships.' },
  { id: 'r_002', category: 'Relationships', text: 'I give and receive love freely.' },
  { id: 'r_003', category: 'Relationships', text: 'My relationships are built on trust and respect.' },
  { id: 'r_004', category: 'Relationships', text: 'I communicate clearly and honestly with others.' },
  // Purpose
  { id: 'pu_001', category: 'Purpose', text: 'I am aligned with my true purpose.' },
  { id: 'pu_002', category: 'Purpose', text: 'My life has deep meaning and direction.' },
  { id: 'pu_003', category: 'Purpose', text: 'I follow my passion and live my truth.' },
  { id: 'pu_004', category: 'Purpose', text: 'Each day brings me closer to fulfilling my purpose.' },
  // Healing
  { id: 'he_001', category: 'Healing', text: 'I allow myself to heal deeply and fully.' },
  { id: 'he_002', category: 'Healing', text: 'I am healing more and more every day.' },
  { id: 'he_003', category: 'Healing', text: 'I forgive myself and others.' },
  { id: 'he_004', category: 'Healing', text: 'My heart is open to healing and love.' },
  // Growth
  { id: 'g_001', category: 'Growth', text: 'I grow through every experience.' },
  { id: 'g_002', category: 'Growth', text: 'Challenges help me evolve and improve.' },
  { id: 'g_003', category: 'Growth', text: 'I embrace change and welcome transformation.' },
  { id: 'g_004', category: 'Growth', text: 'I am constantly learning and evolving.' },
  // Presence
  { id: 'pre_001', category: 'Presence', text: 'I live fully in the present moment.' },
  { id: 'pre_002', category: 'Presence', text: 'This moment is enough.' },
  { id: 'pre_003', category: 'Presence', text: 'I find joy in the here and now.' },
  { id: 'pre_004', category: 'Presence', text: 'I release worries about the future.' },
  // Creativity
  { id: 'cr_001', category: 'Creativity', text: 'I am a creative being, and my ideas flow effortlessly.' },
  { id: 'cr_002', category: 'Creativity', text: 'I trust my intuition and express my unique self.' },
  { id: 'cr_003', category: 'Creativity', text: 'Creative energy flows through me with ease and grace.' },
  { id: 'cr_004', category: 'Creativity', text: 'I honor my imagination and use it to inspire the world.' },
  // Forgiveness
  { id: 'fo_001', category: 'Forgiveness', text: 'I forgive myself and release the burden of guilt.' },
  { id: 'fo_002', category: 'Forgiveness', text: 'I let go of anger and choose compassion.' },
  { id: 'fo_003', category: 'Forgiveness', text: 'Forgiveness sets me free from the past.' },
  { id: 'fo_004', category: 'Forgiveness', text: 'I forgive others and give myself peace.' },
  // Courage
  { id: 'co_001', category: 'Courage', text: 'I am brave and face every challenge with strength.' },
  { id: 'co_002', category: 'Courage', text: 'I have the courage to follow my dreams.' },
  { id: 'co_003', category: 'Courage', text: 'Fear does not control me—I act with confidence.' },
  { id: 'co_004', category: 'Courage', text: 'With every breath, I grow bolder and stronger.' },
  // Spirituality
  { id: 'sp_001', category: 'Spirituality', text: 'I am connected to the divine within and around me.' },
  { id: 'sp_002', category: 'Spirituality', text: 'My soul is calm, centered, and filled with light.' },
  { id: 'sp_003', category: 'Spirituality', text: 'I trust the universe and my path unfolds perfectly.' },
  { id: 'sp_004', category: 'Spirituality', text: 'I nurture my spirit with love, peace, and gratitude.' },
];

const featuredAffirmation: Affirmation = {
  id: "daily_001",
  category: "Presence",
  text: "I am grounded and centered in this present moment.",
};

export default function AffirmationsPage() {
  const [affirmations, setAffirmations] = useState<Affirmation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

  const [isFeaturedFavorite, setIsFeaturedFavorite] = useState(false);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteAffirmations');
    if (storedFavorites) {
      try {
        const parsedFavorites = new Set<string>(JSON.parse(storedFavorites));
        setFavorites(parsedFavorites);
        setIsFeaturedFavorite(parsedFavorites.has(featuredAffirmation.id));
      } catch (error) {
        console.error("Error parsing favorites from localStorage:", error);
        localStorage.removeItem('favoriteAffirmations');
      }
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    // Simulate loading for better UX, can be removed if instantaneous update is preferred
    setTimeout(() => {
      const filteredAffirmations = demoAffirmationsFullList.filter(
        aff => aff.category === selectedCategory
      );
      setAffirmations(filteredAffirmations);
      setLoading(false);
    }, 300);
  }, [selectedCategory]);


  const handleToggleFavorite = (id: string, isFeatured: boolean = false) => {
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
    if (isFeatured) {
        setIsFeaturedFavorite(newFavorites.has(id));
    }
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

  const allAffirmations = [...demoAffirmationsFullList, ...galleryAffirmationsData];

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <header className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">Affirmations</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore positive statements to reshape thoughts, shift energy, and strengthen your healing journey.
        </p>
        <Button onClick={openGallery} variant="outline" className="mt-4 group">
            <ImageIcon className="w-5 h-5 mr-2 group-hover:text-accent transition-colors" />
            View Affirmation Gallery
        </Button>
      </header>

      <section>
        <Card className="shadow-lg border-accent/30 bg-card/80 backdrop-blur-sm">
           <CardHeader>
             <CardTitle className="text-xl text-primary flex items-center gap-2">
                <Star className="w-5 h-5 text-accent" />
                Featured Affirmation
             </CardTitle>
           </CardHeader>
           <CardContent>
             <AffirmationCard
                affirmation={featuredAffirmation}
                isFavorite={isFeaturedFavorite}
                onToggleFavorite={(id) => handleToggleFavorite(id, true)}
                className="border-0 p-0 bg-transparent"
             />
           </CardContent>
         </Card>
      </section>

      <Tabs defaultValue="categories" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-2 md:grid-cols-3">
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="favorites" disabled={favorites.size === 0}>
            Favorites {favorites.size > 0 && `(${favorites.size})`}
          </TabsTrigger>
          <TabsTrigger value="practices" className="col-span-2 md:col-span-1">Practices</TabsTrigger>
        </TabsList>

        <TabsContent value="categories">
            <Tabs defaultValue={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
                <div className="grid md:grid-cols-4 gap-6">
                    <div className="md:col-span-1">
                        <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-col md:w-full md:h-full md:items-stretch gap-1 h-auto">
                            {categories.map(category => (
                                <TabsTrigger 
                                    key={category} 
                                    value={category} 
                                    className="md:justify-start data-[state=active]:border-primary data-[state=active]:border-b-2 md:data-[state=active]:border-b-0 md:data-[state=active]:border-l-2"
                                >
                                    {category}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    <div className="md:col-span-3">
                        <Card className="shadow-lg border-accent/30 bg-card/80 backdrop-blur-sm min-h-[400px]">
                           <CardHeader>
                             <CardTitle className="text-2xl text-center text-secondary">{selectedCategory} Affirmations</CardTitle>
                           </CardHeader>
                           <CardContent>
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
                            </CardContent>
                         </Card>
                    </div>
                </div>
            </Tabs>
        </TabsContent>

        <TabsContent value="favorites">
          <Card className="shadow-lg border-accent/30 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-secondary">Your Favorite Affirmations</CardTitle>
            </CardHeader>
            <CardContent>
               {favorites.size > 0 ? (
                <div className="space-y-4">
                  {Array.from(favorites)
                    .map(favId => allAffirmations.find(aff => aff.id === favId))
                    .filter((aff): aff is Affirmation => !!aff)
                    .map(affirmation => (
                    <AffirmationCard
                      key={`fav-${affirmation.id}`}
                      affirmation={affirmation}
                      isFavorite={true}
                      onToggleFavorite={handleToggleFavorite}
                      className="border rounded-lg bg-muted/30"
                    />
                  ))}
                </div>
               ) : (
                <p className="text-center text-muted-foreground py-8">You haven't added any affirmations to your favorites yet.</p>
               )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practices">
            <Card className="shadow-lg border-accent/30 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-2xl text-center text-secondary">Affirmation Practices</CardTitle>
                    <CardDescription className="text-center">Guided ways to deepen your affirmation practice.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="mirror">
                            <AccordionTrigger>
                                <div className="flex items-center gap-2">
                                    <Smile className="w-5 h-5 text-primary" />
                                    <span>Mirror Affirmation Practice</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                Stand or sit in front of a mirror. Make eye contact with yourself. Choose one affirmation that resonates with you today and speak it aloud 3-5 times with conviction and kindness. Notice how it feels in your body.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="breathing">
                            <AccordionTrigger>
                                <div className="flex items-center gap-2">
                                    <Wind className="w-5 h-5 text-primary" />
                                    <span>Breathing Affirmation</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                Find a comfortable, quiet space. Close your eyes and begin to focus on your breath. Pair an affirmation with your inhales and exhales. For example: Inhale, thinking "I am safe." Exhale, thinking "I am whole." Repeat for 2-5 minutes.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="writing">
                            <AccordionTrigger>
                                <div className="flex items-center gap-2">
                                    <Edit className="w-5 h-5 text-primary" />
                                    <span>Writing Prompt</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                Open your journal. Write down 3-5 affirmations that you want to embody. For each one, spend a few minutes writing about what it would feel like if this were already true. How would you act? What would change? This helps bridge the gap between concept and reality.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
      
      <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
        <DialogContent className="w-[95vw] max-w-2xl p-0 bg-card/90 backdrop-blur-md shadow-2xl rounded-xl">
          <DialogHeader className="p-4 sm:p-6 border-b">
            <DialogTitle className="text-center text-primary text-xl sm:text-2xl">Affirmation Gallery</DialogTitle>
            <DialogDesc className="text-center text-muted-foreground text-sm sm:text-base">
                Visual affirmations to inspire you.
            </DialogDesc>
          </DialogHeader>
          {galleryAffirmationsData.length > 0 ? (
            <div className="p-4 sm:p-6 space-y-4">
              <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] rounded-lg overflow-hidden shadow-lg border border-accent/30 group">
                <Image
                  key={galleryAffirmationsData[currentGalleryIndex].imageUrl}
                  src={galleryAffirmationsData[currentGalleryIndex].imageUrl}
                  alt={galleryAffirmationsData[currentGalleryIndex].altText}
                  layout="fill"
                  objectFit="cover"
                  className="transition-all duration-500 ease-in-out group-hover:scale-105"
                  data-ai-hint={`${galleryAffirmationsData[currentGalleryIndex].category.toLowerCase()} inspiration`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                {/* Prev Button */}
                <Button
                    onClick={prevGalleryItem}
                    variant="ghost"
                    size="icon"
                    aria-label="Previous Affirmation"
                    className="absolute z-10 left-2 sm:left-4 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black/30 text-white/80 hover:bg-black/50 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
                >
                    <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
                </Button>
                
                {/* Next Button */}
                <Button
                    onClick={nextGalleryItem}
                    variant="ghost"
                    size="icon"
                    aria-label="Next Affirmation"
                    className="absolute z-10 right-2 sm:right-4 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black/30 text-white/80 hover:bg-black/50 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
                >
                    <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
                </Button>

                <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none">
                    {/* Top Right: Favorite Button */}
                    <div className="self-end z-10 pointer-events-auto">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleFavorite(galleryAffirmationsData[currentGalleryIndex].id)}
                        aria-label={favorites.has(galleryAffirmationsData[currentGalleryIndex].id) ? "Remove from favorites" : "Add to favorites"}
                        className="text-white/80 hover:text-accent bg-black/40 hover:bg-black/60 rounded-full transition-colors"
                      >
                        <Heart className={cn("w-5 h-5", favorites.has(galleryAffirmationsData[currentGalleryIndex].id) ? "fill-accent text-accent" : "text-white/80")} />
                      </Button>
                    </div>

                    {/* Bottom Left: Text */}
                    <div className="text-white">
                      <p className="text-lg sm:text-xl font-semibold drop-shadow-md">
                        {galleryAffirmationsData[currentGalleryIndex].text}
                      </p>
                      <p className="text-sm text-white/80 drop-shadow-sm">
                        {galleryAffirmationsData[currentGalleryIndex].category}
                      </p>
                    </div>
                </div>
              </div>
              
              {/* Counter */}
              <div className="flex justify-center items-center pt-2">
                <span className="text-sm text-muted-foreground tabular-nums">
                  {currentGalleryIndex + 1} / {galleryAffirmationsData.length}
                </span>
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
