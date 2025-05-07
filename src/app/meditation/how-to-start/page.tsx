
'use client'; // Add this directive

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users, MapPin, Clock, Headphones, Smile, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';

export default function HowToStartMeditationPage() {
  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
       {/* Background Gradient - Consistent with Meditation Page */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 dark:from-indigo-950 dark:via-purple-950 dark:to-blue-950 animate-gradient-xy"></div>
      <style jsx>{`
        @keyframes gradient-xy {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
        .animate-gradient-xy {
            background-size: 200% 200%;
            animation: gradient-xy 15s ease infinite;
        }
      `}</style>

      <header className="text-center space-y-2 mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white flex items-center justify-center gap-3">
           <CheckCircle className="w-8 h-8 text-purple-300" />
           How to Start Meditating: A Simple Guide
        </h1>
        <p className="text-lg md:text-xl text-purple-200/80">
          Begin your journey to inner peace and mindfulness.
        </p>
         <Link href="/meditation">
            <Badge variant="secondary" className="cursor-pointer hover:bg-purple-700/50 transition-colors">← Back to Meditation Sanctuary</Badge>
         </Link>
      </header>

      {/* Step-by-Step Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Step 1: Find Your Space */}
        <Card className="bg-white/10 backdrop-blur-md border-purple-300/30 shadow-lg text-white flex flex-col">
          <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-purple-100">
                  <MapPin className="w-5 h-5 text-purple-300" />
                  Step 1: Find Your Space
              </CardTitle>
              <CardDescription className="text-purple-200/80">Choose a quiet and comfortable location.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
              <p className="mb-2">Select a place where you're unlikely to be disturbed. It doesn't need to be special – a chair in a quiet room, a corner of your bedroom, or even a park bench can work.</p>
              <p>Consistency in location can help, but flexibility is key. The aim is minimal distraction.</p>
          </CardContent>
        </Card>

        {/* Step 2: Set a Time */}
        <Card className="bg-white/10 backdrop-blur-md border-purple-300/30 shadow-lg text-white flex flex-col">
          <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-purple-100">
                 <Clock className="w-5 h-5 text-purple-300" />
                 Step 2: Set a Time
              </CardTitle>
              <CardDescription className="text-purple-200/80">Start small and be consistent.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
              <p className="mb-2">Begin with short sessions, perhaps just 5-10 minutes. You can gradually increase the duration as you feel comfortable.</p>
              <p>Try meditating at the same time each day to build a habit, like first thing in the morning or before bed.</p>
          </CardContent>
        </Card>

        {/* Step 3: Get Comfortable */}
        <Card className="bg-white/10 backdrop-blur-md border-purple-300/30 shadow-lg text-white flex flex-col">
          <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-purple-100">
                 <Users className="w-5 h-5 text-purple-300" /> {/* Using Users icon for posture/body */}
                 Step 3: Get Comfortable
              </CardTitle>
              <CardDescription className="text-purple-200/80">Find a stable and relaxed posture.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
              <p className="mb-2">Sit comfortably on a chair with your feet flat on the floor, or cross-legged on a cushion. Keep your back straight but not stiff. You can also lie down if sitting is uncomfortable, but be mindful of falling asleep.</p>
              <p>Rest your hands gently on your lap or knees. Close your eyes softly or keep a soft, unfocused gaze downwards.</p>
          </CardContent>
        </Card>

        {/* Step 4: Focus on Your Breath */}
        <Card className="bg-white/10 backdrop-blur-md border-purple-300/30 shadow-lg text-white flex flex-col">
          <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-purple-100">
                  <Headphones className="w-5 h-5 text-purple-300" /> {/* Using Headphones for focus/awareness */}
                  Step 4: Focus on Your Breath
              </CardTitle>
              <CardDescription className="text-purple-200/80">Use your breath as an anchor.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
              <p className="mb-2">Bring your attention to the natural sensation of your breath. Notice the feeling of air entering and leaving your body – perhaps at the tip of your nose, the rise and fall of your chest, or your abdomen.</p>
              <p>Don't try to control your breath; just observe it. Let it be natural.</p>
          </CardContent>
        </Card>

        {/* Step 5: Notice Wandering Thoughts */}
        <Card className="bg-white/10 backdrop-blur-md border-purple-300/30 shadow-lg text-white flex flex-col">
          <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-purple-100">
                 <MessageSquare className="w-5 h-5 text-purple-300" /> {/* Using MessageSquare for thoughts */}
                 Step 5: Notice Wandering Thoughts
              </CardTitle>
              <CardDescription className="text-purple-200/80">Acknowledge thoughts without judgment.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
              <p className="mb-2">Your mind will naturally wander – this is completely normal! When you notice your attention has drifted to thoughts, sounds, or sensations, gently acknowledge it without criticizing yourself.</p>
              <p>Think of thoughts like clouds passing in the sky. Simply notice them and then gently guide your focus back to your breath.</p>
          </CardContent>
        </Card>

        {/* Step 6: Be Kind to Yourself */}
        <Card className="bg-white/10 backdrop-blur-md border-purple-300/30 shadow-lg text-white flex flex-col">
          <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-purple-100">
                 <Smile className="w-5 h-5 text-purple-300" />
                 Step 6: Be Kind to Yourself
              </CardTitle>
              <CardDescription className="text-purple-200/80">Practice patience and self-compassion.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
              <p className="mb-2">There's no "perfect" way to meditate. Some days will feel easier than others. Avoid judging your meditation sessions as "good" or "bad."</p>
              <p>The practice is simply about noticing when your mind wanders and gently returning your focus. Each time you do this, you are strengthening your mindfulness muscle. Celebrate the effort!</p>
          </CardContent>
        </Card>

      </div>

       {/* Additional Tips */}
       <Card className="bg-white/10 backdrop-blur-md border-purple-300/30 shadow-lg text-white mt-12">
         <CardHeader>
            <CardTitle className="text-xl text-purple-100">Quick Tips for Beginners</CardTitle>
         </CardHeader>
          <CardContent className="space-y-3 text-purple-200/90">
             <p><strong>Use a Timer:</strong> Set a gentle alarm so you don't worry about the time.</p>
             <p><strong>Guided Meditations:</strong> Explore the <Link href="/meditation#guided-meditations" className="text-purple-300 underline hover:text-white">Guided Sessions</Link> in our sanctuary to get started.</p>
             <p><strong>Breathing Exercises:</strong> Try the simple <Link href="/meditation#breathing-exercises" className="text-purple-300 underline hover:text-white">Breathing Exercises</Link> for quick relaxation.</p>
             <p><strong>Be Patient:</strong> Benefits often build gradually over time. Stick with it!</p>
             <p><strong>Experiment:</strong> Find what works best for you – different times, postures, or focus points.</p>
         </CardContent>
      </Card>

    </div>
  );
}
