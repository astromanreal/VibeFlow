
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Lightbulb, Target, Brain, Heart, Edit, Image as ImageIcon, Star, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Intention & Manifestation Hub | VibeFlow',
  description: 'Learn to consciously create your reality with our Manifestation Hub. Set intentions, practice visualization, and use affirmations to attract your desires.',
  openGraph: {
    title: 'Intention & Manifestation Hub | VibeFlow',
    description: 'Tools and guides for setting intentions and manifestation.',
    images: [{ url: 'https://placehold.co/1200x630.png', alt: 'A lightbulb icon representing ideas and manifestation' }],
  },
};

const StepCard = ({ number, title, description }: { number: string; title: string; description: string; }) => (
  <Card className="bg-background/50 p-4 border-l-4 border-primary/30 hover:shadow-lg hover:border-primary transition-all duration-200 h-full">
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl shrink-0">
        {number}
      </div>
      <div>
        <h4 className="font-semibold text-primary text-lg">{title}</h4>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  </Card>
);

export default function ManifestationPage() {
  return (
    <div className="container mx-auto py-8 px-4 space-y-12">
      <header className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2 flex items-center justify-center gap-2">
          <Lightbulb className="w-8 h-8 text-accent" />
          Intention & Manifestation Hub
        </h1>
        <p className="text-lg text-muted-foreground">Your space to consciously create your reality.</p>
      </header>

      {/* What is Manifestation? */}
      <Card className="shadow-lg border-accent/30 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl text-secondary flex items-center gap-2">
            <Brain className="w-5 h-5 text-secondary" />
            Understanding Manifestation
          </CardTitle>
          <CardDescription>Bringing your desires from thought into reality.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-foreground/90">
          <p>
            Manifestation is the practice of bringing something tangible into your life through attraction and belief. It's based on the idea that your thoughts, feelings, and beliefs create your reality. By focusing intentionally on what you desire, aligning your energy, and taking inspired action, you can attract experiences, opportunities, and outcomes that match your intentions.
          </p>
          <p>
            It's not just wishful thinking; it involves clarity, belief, feeling, and action working together. Think of it as co-creating with the universe, a key practice in many self-help and therapy app toolkits.
          </p>
           <div className="flex flex-wrap gap-2 pt-2">
              <Badge variant="secondary">Law of Attraction</Badge>
              <Badge variant="secondary">Mindset</Badge>
              <Badge variant="secondary">Intention Setting</Badge>
              <Badge variant="secondary">Energy Alignment</Badge>
           </div>
        </CardContent>
      </Card>

       {/* Steps to Manifest */}
      <Card className="shadow-lg border-secondary/30 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl text-secondary flex items-center gap-2">
            <Target className="w-5 h-5 text-secondary" />
            Steps to Manifest Your Desires
          </CardTitle>
           <CardDescription>A simple framework to guide your practice.</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StepCard number="1" title="Get Clear" description="Define exactly what you want. Be specific and detailed. Write it down to make it concrete." />
              <StepCard number="2" title="Visualize & Feel" description="Imagine already having your desire. Feel the emotions of joy, gratitude, and relief as if it's real." />
              <StepCard number="3" title="Believe & Trust" description="Believe it's possible and that you deserve it. Release doubts and trust the universal process." />
              <StepCard number="4" title="Take Inspired Action" description="Listen to your intuition. Act on opportunities that align with your goal, and let go of controlling the 'how'." />
          </div>
        </CardContent>
      </Card>

      {/* Manifestation Techniques */}
      <Card className="shadow-lg border-primary/30 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl text-secondary flex items-center gap-2">
            <Heart className="w-5 h-5 text-secondary" />
            Popular Manifestation Techniques
          </CardTitle>
          <CardDescription>Explore different methods to enhance your practice.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="hover:no-underline">
                 <div className="flex items-center gap-3">
                    <ImageIcon className="w-5 h-5 text-primary" />
                    <span className="text-lg">Vision Boarding</span>
                 </div>
                </AccordionTrigger>
              <AccordionContent className="text-foreground/90 pl-10">
                Create a physical or digital collage of images, words, and quotes representing your goals. Place it where you'll see it often to keep your intentions top of mind and evoke positive feelings.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="hover:no-underline">
                 <div className="flex items-center gap-3">
                    <Edit className="w-5 h-5 text-primary" />
                    <span className="text-lg">Scripting</span>
                 </div>
                </AccordionTrigger>
              <AccordionContent className="text-foreground/90 pl-10">
                Write about your desire in the present tense, as if it has already happened. Describe the details, your feelings, and the experience. This helps solidify the belief and emotional connection. Example: "I am so grateful and happy now that I am living in my beautiful new home..."
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-primary" />
                    <span className="text-lg">Affirmations for Goals</span>
                 </div>
                </AccordionTrigger>
              <AccordionContent className="text-foreground/90 pl-10">
                Use positive statements focused specifically on your manifestation goals. Repeat them daily with belief and feeling. Find relevant affirmations in our <Link href="/affirmations" className="text-primary underline hover:text-secondary">Affirmations</Link> section or craft your own. Example: "I am attracting my ideal clients with ease and grace."
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-4">
              <AccordionTrigger className="hover:no-underline">
                 <div className="flex items-center gap-3">
                    <Brain className="w-5 h-5 text-primary" />
                    <span className="text-lg">Visualization</span>
                 </div>
                </AccordionTrigger>
              <AccordionContent className="text-foreground/90 pl-10">
                Regularly spend time vividly imagining your desired outcome. Engage all your senses – what do you see, hear, smell, taste, and touch in that reality? Focus on the feeling of having achieved it.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

       {/* Important Considerations */}
       <Card className="shadow-md bg-accent/10 border-accent/30">
         <CardHeader>
            <CardTitle className="text-lg text-accent-foreground flex items-center gap-2">
                <Star className="w-5 h-5 text-accent" />
                Key Considerations
            </CardTitle>
         </CardHeader>
          <CardContent className="space-y-4">
            {[
                { title: "Consistency is key:", text: "Regular practice strengthens your focus and belief." },
                { title: "Let go of attachment:", text: "Trust the process and release desperate energy. Focus on the joy of the journey." },
                { title: "Gratitude:", text: "Be thankful for what you already have and for what is coming." },
                { title: "Patience:", text: "Manifestation timelines vary. Stay positive and persistent." },
            ].map(item => (
                <div key={item.title} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent mt-1 shrink-0" />
                    <p className="text-foreground/90">
                        <strong className="text-foreground">{item.title}</strong> {item.text}
                    </p>
                </div>
            ))}
          </CardContent>
      </Card>
    </div>
  );
}
