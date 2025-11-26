
'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { type AskVibeOutput } from '@/ai/flows/ask-vibe';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Sparkles, User, ShieldAlert } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export default function AskVibePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  };

   useEffect(() => {
     // Scroll to bottom when messages change
     scrollToBottom();
   }, [messages]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // The askVibe flow is removed, so we will mock a response
      // const aiResponse: AskVibeOutput = await askVibe({ query: input });
      const aiResponse: AskVibeOutput = { response: "Thank you for your question. The Ask Vibe feature is currently under maintenance. Please check back later!" };
      const aiMessage: Message = { sender: 'ai', text: aiResponse.response };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error calling Ask Vibe:", error);
      const errorMessage: Message = { sender: 'ai', text: "Sorry, I encountered an issue. Please try again." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
       // Ensure scroll after AI response might take time
      setTimeout(scrollToBottom, 100);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 flex flex-col h-[calc(100vh-8rem)] max-h-[800px]">
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6 text-center flex items-center justify-center gap-2">
        <Sparkles className="w-8 h-8 text-accent" />
        Ask Vibe
        <Sparkles className="w-8 h-8 text-accent" />
      </h1>

      <Card className="flex-1 flex flex-col shadow-lg border-accent/30 bg-card/80 backdrop-blur-sm overflow-hidden">
         <CardHeader className="border-b">
           <CardTitle className="text-xl text-secondary text-center">AI-Guided Insights for Reflection</CardTitle>
         </CardHeader>
         <CardContent className="flex-1 flex flex-col p-0">
           <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
             <div ref={viewportRef} className="space-y-4 h-full">
              {messages.length === 0 && (
                 <Alert className="border-accent bg-accent/10">
                    <ShieldAlert className="h-4 w-4 text-accent-foreground" />
                    <AlertTitle className="text-accent-foreground">Important</AlertTitle>
                    <AlertDescription className="text-accent-foreground/80">
                        Vibe is an AI assistant and not a replacement for professional medical advice. If you are in crisis, please seek professional help.
                    </AlertDescription>
                </Alert>
              )}
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-start gap-3",
                    message.sender === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  {message.sender === 'ai' && (
                    <Avatar className="w-8 h-8 border border-accent">
                       {/* Placeholder Vibe icon */}
                       <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                         <Sparkles className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "max-w-[75%] rounded-lg p-3 text-sm shadow-md",
                      message.sender === 'user'
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {message.text}
                  </div>
                   {message.sender === 'user' && (
                     <Avatar className="w-8 h-8 border">
                      <AvatarFallback>
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                     </Avatar>
                   )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-3 justify-start">
                   <Avatar className="w-8 h-8 border border-accent">
                     <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                        <Sparkles className="w-4 h-4 animate-pulse" />
                     </AvatarFallback>
                   </Avatar>
                   <div className="max-w-[75%] rounded-lg p-3 text-sm shadow-md bg-muted space-y-2">
                     <Skeleton className="h-4 w-24" />
                     <Skeleton className="h-4 w-32" />
                   </div>
                </div>
              )}
             </div>
           </ScrollArea>
           <div className="border-t p-4 bg-background">
             <form onSubmit={handleSubmit} className="flex gap-2">
               <Input
                 type="text"
                 placeholder="Ask Vibe anything..."
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
                 disabled={isLoading}
                 className="flex-1"
                 aria-label="Chat input"
               />
               <Button type="submit" disabled={isLoading || !input.trim()} size="icon" aria-label="Send message">
                 <Send className="w-5 h-5" />
               </Button>
             </form>
           </div>
         </CardContent>
      </Card>
    </div>
  );
}
