
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Lightbulb, Target, Brain, Heart, Edit, Image as ImageIcon } from "lucide-react"; // Changed Sparkles to Lightbulb, added more icons
import { Badge } from "@/components/ui/badge";
import Link from 'next/link'; // Import Link component

export default function ManifestationPage() {
  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2 flex items-center justify-center gap-2">
          <Lightbulb className="w-8 h-8 text-accent" />
          Manifestation Hub
          <Lightbulb className="w-8 h-8 text-accent" />
        </h1>
        <p className="text-lg text-muted-foreground">Your space to consciously create your reality.</p>
      </header>


      {/* What is Manifestation? */}
      <Card className="shadow-lg border-accent/30 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl text-secondary flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Understanding Manifestation
          </CardTitle>
          <CardDescription>Bringing your desires from thought into reality.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-foreground/90">
          <p>
            Manifestation is the practice of bringing something tangible into your life through attraction and belief. It's based on the idea that your thoughts, feelings, and beliefs create your reality. By focusing intentionally on what you desire, aligning your energy, and taking inspired action, you can attract experiences, opportunities, and outcomes that match your intentions.
          </p>
          <p>
            It's not just wishful thinking; it involves clarity, belief, feeling, and action working together. Think of it as co-creating with the universe.
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
            <Target className="w-5 h-5" />
            Steps to Manifest Your Desires
          </CardTitle>
           <CardDescription>A simple framework to guide your practice.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Step 1 */}
            <Card className="bg-background/50 p-4">
              <div className="flex items-center gap-2 mb-2">
                 <Badge variant="outline" className="text-lg">1</Badge>
                 <h4 className="font-semibold text-primary">Get Clear</h4>
              </div>
               <p className="text-sm text-muted-foreground">Define exactly what you want to manifest. Be specific and detailed. Write it down.</p>
            </Card>
             {/* Step 2 */}
            <Card className="bg-background/50 p-4">
               <div className="flex items-center gap-2 mb-2">
                 <Badge variant="outline" className="text-lg">2</Badge>
                 <h4 className="font-semibold text-primary">Visualize & Feel</h4>
               </div>
               <p className="text-sm text-muted-foreground">Imagine already having your desire. Feel the emotions associated with it (joy, gratitude, relief).</p>
            </Card>
             {/* Step 3 */}
            <Card className="bg-background/50 p-4">
               <div className="flex items-center gap-2 mb-2">
                 <Badge variant="outline" className="text-lg">3</Badge>
                 <h4 className="font-semibold text-primary">Believe & Trust</h4>
               </div>
                <p className="text-sm text-muted-foreground">Believe it's possible and that you deserve it. Release doubts and trust the process.</p>
            </Card>
            {/* Step 4 */}
            <Card className="bg-background/50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-lg">4</Badge>
                <h4 className="font-semibold text-primary">Take Inspired Action</h4>
              </div>
               <p className="text-sm text-muted-foreground">Listen to your intuition and act on opportunities that align with your goal. Let go of the 'how'.</p>
            </Card>
          </div>
        </CardContent>
      </Card>


      {/* Manifestation Techniques */}
      <Card className="shadow-lg border-primary/30 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl text-secondary flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Popular Manifestation Techniques
          </CardTitle>
          <CardDescription>Explore different methods to enhance your practice.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="hover:no-underline">
                 <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-primary" />
                    <span>Vision Boarding</span>
                 </div>
                </AccordionTrigger>
              <AccordionContent className="text-foreground/90">
                Create a physical or digital collage of images, words, and quotes representing your goals and desires. Place it where you'll see it often to keep your intentions top of mind and evoke positive feelings.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="hover:no-underline">
                 <div className="flex items-center gap-2">
                    <Edit className="w-4 h-4 text-primary" />
                    <span>Scripting</span>
                 </div>
                </AccordionTrigger>
              <AccordionContent className="text-foreground/90">
                Write about your desire in the present tense, as if it has already happened. Describe the details, your feelings, and the experience. This helps solidify the belief and emotional connection. Example: "I am so grateful and happy now that I am living in my beautiful new home..."
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-primary" /> {/* Reusing Heart icon */}
                    <span>Affirmations for Goals</span>
                 </div>
                </AccordionTrigger>
              <AccordionContent className="text-foreground/90">
                Use positive statements focused specifically on your manifestation goals. Repeat them daily with belief and feeling. Find relevant affirmations in our <Link href="/affirmations" className="text-primary underline hover:text-secondary">Affirmations</Link> section or craft your own. Example: "I am attracting my ideal clients with ease and grace."
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-4">
              <AccordionTrigger className="hover:no-underline">
                 <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-primary" /> {/* Reusing Brain icon */}
                    <span>Visualization</span>
                 </div>
                </AccordionTrigger>
              <AccordionContent className="text-foreground/90">
                Regularly spend time vividly imagining your desired outcome. Engage all your senses – what do you see, hear, smell, taste, and touch in that reality? Focus on the feeling of having achieved it.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

       {/* Important Considerations */}
       <Card className="shadow-md border-muted/50 bg-muted/30">
         <CardHeader>
            <CardTitle className="text-lg text-muted-foreground">Key Considerations</CardTitle>
         </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p><strong>Consistency is key:</strong> Regular practice strengthens your focus and belief.</p>
            <p><strong>Let go of attachment:</strong> Trust the process and release desperate energy. Focus on the joy of the journey.</p>
            <p><strong>Gratitude:</strong> Be thankful for what you already have and for what is coming.</p>
            <p><strong>Patience:</strong> Manifestation timelines vary. Stay positive and persistent.</p>
         </CardContent>
      </Card>

    </div>
  );
}
