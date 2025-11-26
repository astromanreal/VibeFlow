
'use client';

import { useState, useEffect, useRef, type FormEvent } from 'react';
import { useParams, notFound, useRouter } from 'next/navigation';
import { ArrowLeft, Flag, Handshake, Heart, Send, User, LoaderCircle, Shield } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { supportCirclesData } from '../page';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { moderateContent } from '@/ai/flows/moderate-content';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ChatMessage {
    id: string;
    authorAlias: string;
    text: string;
    timestamp: string; // ISO string
    reactions: {
        heart: number;
        handshake: number;
    };
}

// --- MOCK DATA ---
const mockMessages: Record<string, ChatMessage[]> = {
    'anxiety-circle': [
        { id: 'msg1', authorAlias: 'Brave River', text: "Feeling really overwhelmed with work deadlines this week. It's hard to breathe sometimes.", timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), reactions: { heart: 2, handshake: 1 } },
        { id: 'msg2', authorAlias: 'Calm Willow', text: "I hear you, Brave River. When I feel that way, I try to do a 5-minute box breathing exercise. It sometimes helps.", timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(), reactions: { heart: 1, handshake: 0 } },
    ],
    'grief-loss-circle': [
        { id: 'msg3', authorAlias: 'Gentle Star', text: "It's been a year, and it still hurts so much. Does it ever get easier?", timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(), reactions: { heart: 5, handshake: 3 } },
    ],
    'healing-circle': [
        { id: 'msg4', authorAlias: 'Wise Mountain', text: "Today, I chose to be kind to myself, even when old feelings came up. It felt like a small victory.", timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), reactions: { heart: 3, handshake: 0 } },
    ],
};


const adjectives = ["Brave", "Gentle", "Kind", "Wise", "Calm", "Happy", "Hopeful", "Strong", "Radiant"];
const nouns = ["River", "Mountain", "Star", "Koala", "Lion", "Oak", "Willow", "Ocean", "Sky"];

const generateAlias = () => {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${adj} ${noun}`;
};

export default function SupportCirclePage() {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const circleId = params.circleId as string;
    const circle = supportCirclesData.find(c => c.id === circleId);

    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [userAlias, setUserAlias] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showGuidelines, setShowGuidelines] = useState(true);

    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let alias = localStorage.getItem('vibeflow_user_alias');
        if (!alias) {
            alias = generateAlias();
            localStorage.setItem('vibeflow_user_alias', alias);
        }
        setUserAlias(alias);

        // Load mock messages for the current circle
        setMessages(mockMessages[circleId] || []);

        const hasSeenGuidelines = localStorage.getItem(`seen_guidelines_${circleId}`);
        if (hasSeenGuidelines) {
            setShowGuidelines(false);
        }
    }, [circleId]);
    
    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
    }, [messages]);

    if (!circle) {
        notFound();
    }

    const handleDismissGuidelines = () => {
        setShowGuidelines(false);
        localStorage.setItem(`seen_guidelines_${circleId}`, 'true');
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || isLoading) return;

        setIsLoading(true);
        try {
            const moderationResult = await moderateContent({ content: newMessage });
            if (!moderationResult.isAppropriate) {
                toast({
                    title: "Message Not Sent",
                    description: moderationResult.reason || "This message doesn't align with our community guidelines. Please be respectful and supportive.",
                    variant: "destructive",
                });
                setIsLoading(false);
                return;
            }

            const messageToAdd: ChatMessage = {
                id: crypto.randomUUID(),
                authorAlias: userAlias,
                text: newMessage,
                timestamp: new Date().toISOString(),
                reactions: { heart: 0, handshake: 0 },
            };

            setMessages(prev => [...prev, messageToAdd]);
            setNewMessage('');

        } catch (error) {
            console.error("Error posting message:", error);
            toast({
                title: "Error",
                description: "Could not send your message at this time. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-8 px-4 flex flex-col h-[calc(100vh-8rem)]">
            <header className="mb-6">
                <Link href="/support-circles" className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-4">
                    <ArrowLeft className="w-4 h-4" />
                    Back to All Circles
                </Link>
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-primary/10">
                        <circle.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-primary">{circle.title}</h1>
                        <p className="text-muted-foreground">{circle.description}</p>
                    </div>
                </div>
            </header>

            {showGuidelines && (
                <Alert className="mb-4 border-accent bg-accent/10">
                    <Shield className="h-4 w-4 text-accent-foreground" />
                    <AlertTitle className="text-accent-foreground">Community Guidelines</AlertTitle>
                    <AlertDescription className="text-accent-foreground/80">
                        This is a safe space for support, not advice. Be kind, be respectful, and honor each other's journeys.
                         <Button onClick={handleDismissGuidelines} variant="link" className="p-0 h-auto ml-2 text-accent-foreground font-bold">Dismiss</Button>
                    </AlertDescription>
                </Alert>
            )}

            <Card className="flex-1 flex flex-col shadow-lg border-primary/20 bg-card/80 backdrop-blur-sm overflow-hidden">
                <CardContent className="flex-1 flex flex-col p-0">
                    <ScrollArea className="flex-1 p-4">
                        <div ref={scrollAreaRef} className="space-y-6">
                            {messages.map((message) => {
                                const isUserMessage = message.authorAlias === userAlias;
                                return (
                                    <div key={message.id} className={cn("flex items-start gap-3", isUserMessage && "justify-end")}>
                                        {!isUserMessage && (
                                            <Avatar className="w-8 h-8 border">
                                                <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                                                    {message.authorAlias.split(' ').map(n => n[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                        )}
                                        <div className={cn("max-w-[75%] group", isUserMessage && "flex flex-col items-end")}>
                                            <div className="text-xs text-muted-foreground mb-1">
                                                {isUserMessage ? 'You' : message.authorAlias}
                                                <span className="ml-2">{format(new Date(message.timestamp), 'p')}</span>
                                            </div>
                                            <div className={cn(
                                                "rounded-lg p-3 text-sm shadow-md relative",
                                                isUserMessage
                                                    ? "bg-primary text-primary-foreground rounded-br-none"
                                                    : "bg-muted text-muted-foreground rounded-bl-none"
                                            )}>
                                                <p className="whitespace-pre-wrap">{message.text}</p>
                                                <div className="absolute -bottom-5 right-0 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                     <Button variant="ghost" size="icon" className="h-6 w-6"><Heart className="w-3 h-3 text-pink-500" /></Button>
                                                     <Button variant="ghost" size="icon" className="h-6 w-6"><Handshake className="w-3 h-3 text-blue-500" /></Button>
                                                     <Button variant="ghost" size="icon" className="h-6 w-6"><Flag className="w-3 h-3 text-destructive" /></Button>
                                                </div>
                                            </div>
                                        </div>
                                        {isUserMessage && (
                                            <Avatar className="w-8 h-8 border">
                                                <AvatarFallback className="bg-primary text-primary-foreground">
                                                    <User className="w-4 h-4" />
                                                </AvatarFallback>
                                            </Avatar>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </ScrollArea>
                    <CardFooter className="border-t p-4 bg-background">
                        <form onSubmit={handleSubmit} className="flex gap-2 w-full">
                            <Textarea
                                placeholder="Share with kindness..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                disabled={isLoading}
                                className="flex-1"
                                rows={1}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSubmit(e as any);
                                    }
                                }}
                            />
                            <Button type="submit" disabled={isLoading || !newMessage.trim()} size="icon" aria-label="Send message">
                                {isLoading ? <LoaderCircle className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                            </Button>
                        </form>
                    </CardFooter>
                </CardContent>
            </Card>
        </div>
    );
}
