
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Wind, ShieldQuestion, Edit } from "lucide-react";
import { BreathingGuide } from '@/components/breathing-guide';
import { breathingPresetsData } from '@/app/meditation/page';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { helplines, type Helpline } from "@/services/helplines";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function CrisisSupportPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>('International');

  const groundingTechniques = [
    {
      title: "The 5-4-3-2-1 Grounding Method",
      steps: [
        "Acknowledge 5 things you can see around you.",
        "Acknowledge 4 things you can touch around you.",
        "Acknowledge 3 things you can hear.",
        "Acknowledge 2 things you can smell.",
        "Acknowledge 1 thing you can taste."
      ],
      description: "This technique helps you return to the present moment by connecting with your senses."
    },
    {
      title: "Categorization Game",
      steps: [
        "Look around you and start naming things in a category.",
        "For example, name all the blue things you can see.",
        "Or, think of all the animals you can that start with the letter 'A'.",
      ],
      description: "Engaging your logical brain can help dial down intense emotions."
    },
    {
        title: "Body Awareness",
        steps: [
            "Focus on the feeling of your feet on the ground. Wiggle your toes.",
            "Notice the feeling of your back against the chair, or your clothes on your skin.",
            "Clench and release your fists, paying close attention to the changing sensation."
        ],
        description: "Reconnect with your physical self to anchor you in the now."
    }
  ];
  
  const regions = ['International', ...new Set(helplines.map(h => h.region))];
  const filteredHelplines = helplines.filter(h => selectedRegion === 'International' || h.region === selectedRegion);

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      {/* Background Style */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-100 via-teal-50 to-green-100 dark:from-blue-950 dark:via-teal-950 dark:to-green-950"></div>

      <header className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary flex items-center justify-center gap-3">
          <ShieldQuestion className="w-8 h-8 text-accent" />
          Immediate Support
        </h1>
        <p className="text-lg text-muted-foreground">
          You are not alone. Use these self-help tools to find your center.
        </p>
      </header>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card className="shadow-lg border-secondary/30 bg-card/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Wind className="w-5 h-5 text-secondary" /> Guided Breathing</CardTitle>
                <CardDescription>Focus on your breath to calm your nervous system. Try our <Link href="/meditation#breathing-exercises" className="text-primary underline">other exercises</Link> too.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center pt-4">
                <BreathingGuide preset={breathingPresetsData[0]} />
                <p className="mt-4 text-center text-sm text-muted-foreground">{breathingPresetsData[0].description}</p>
            </CardContent>
        </Card>
        <Card className="shadow-lg border-secondary/30 bg-card/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Edit className="w-5 h-5 text-secondary" /> Quick Journal</CardTitle>
                <CardDescription>Write down what you are feeling. No judgment.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center h-full pt-4">
                 <p className="text-center text-muted-foreground mb-4">Expressing your thoughts can provide immediate relief.</p>
                 <Link href="/journal" passHref className="w-full">
                    <Button variant="secondary" size="lg" className="w-full">
                        Go to your Therapeutic Journal
                    </Button>
                 </Link>
            </CardContent>
        </Card>
      </div>

      {/* Grounding Techniques */}
      <Card className="max-w-4xl mx-auto shadow-lg border-primary/30 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl text-primary">Grounding Techniques</CardTitle>
          <CardDescription>Simple exercises to anchor you in the present moment.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {groundingTechniques.map((tech, index) => (
               <AccordionItem key={index} value={`item-${index}`}>
                 <AccordionTrigger>{tech.title}</AccordionTrigger>
                 <AccordionContent className="space-y-3">
                    <p className="text-sm text-muted-foreground italic">{tech.description}</p>
                    <ul className="list-disc pl-5 space-y-1">
                        {tech.steps.map((step, stepIndex) => (
                            <li key={stepIndex}>{step}</li>
                        ))}
                    </ul>
                 </AccordionContent>
               </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Helplines */}
      <Card className="max-w-4xl mx-auto shadow-lg border-destructive/30 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl text-destructive-foreground flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Find Help Now
          </CardTitle>
          <CardDescription className="text-destructive-foreground/80">
            If you are in immediate crisis, please reach out. These services are free, confidential, and available 24/7.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="mb-4">
                <Label htmlFor="region-select" className="text-foreground">Filter by Region:</Label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger id="region-select" className="w-full md:w-1/2 mt-1">
                        <SelectValue placeholder="Select a region" />
                    </SelectTrigger>
                    <SelectContent>
                        {regions.map(region => (
                            <SelectItem key={region} value={region}>{region}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
          <div className="space-y-4">
            {filteredHelplines.map((helpline: Helpline) => (
              <div key={helpline.name} className="p-3 border rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-background/50">
                <div>
                  <h4 className="font-semibold">{helpline.name} ({helpline.region})</h4>
                  <p className="text-sm text-muted-foreground">{helpline.description}</p>
                </div>
                <Button asChild variant="destructive">
                  <a href={`tel:${helpline.phone.replace(/\s/g, '')}`}>
                    <Phone className="w-4 h-4 mr-2" />
                    Call {helpline.phone}
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
