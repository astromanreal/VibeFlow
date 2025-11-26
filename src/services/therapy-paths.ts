
import type { LucideIcon } from 'lucide-react';
import { Route, Zap, Heart, Brain, BookOpen, Edit, Mic, Milestone, Star, Shield, Flame, Award, UserCheck, Feather, HeartCrack, Recycle, Target, Wind, Smartphone, HandHeart, Gift } from 'lucide-react';


// --- Data Structures ---

export interface TherapyPathInfo {
  id: string;
  title: string;
  duration: string;
  description: string;
  icon: LucideIcon;
  theme: string;
  color: string;
}

export interface DailySession {
  day: number;
  title: string;
  lesson: string;
  practiceType: 'Journal' | 'Meditation' | 'Reflection' | 'Exercise';
  practiceDetails: string;
  affirmation: string;
}

export interface TherapyPath extends TherapyPathInfo {
  sessions: DailySession[];
}


// --- Shared Data ---

export const therapyPathsList: TherapyPathInfo[] = [
  // Existing
  {
    id: 'anxiety-management',
    title: 'Anxiety Management',
    duration: '3 Days',
    description: 'Learn techniques to understand, manage, and reduce anxiety in your daily life.',
    icon: Zap,
    theme: 'Anxiety',
    color: 'border-purple-500/30 hover:shadow-purple-400/20'
  },
  {
    id: 'inner-child-healing',
    title: 'Inner Child Healing',
    duration: '2 Days',
    description: 'Gently reconnect with and heal your inner child through compassion and reflection.',
    icon: Heart,
    theme: 'Trauma & Healing',
    color: 'border-pink-500/30 hover:shadow-pink-400/20'
  },
  {
    id: 'mindfulness-foundations',
    title: 'Mindfulness Foundations',
    duration: '1 Day',
    description: 'Build a solid foundation in mindfulness to cultivate presence and awareness.',
    icon: Brain,
    theme: 'Mindfulness',
    color: 'border-blue-500/30 hover:shadow-blue-400/20'
  },
  // New Paths
  {
    id: 'emotional-resilience',
    title: 'Emotional Resilience',
    duration: '7 Days',
    description: 'Bounce back from stress and setbacks using grounding and validation tools.',
    icon: Shield,
    theme: 'Emotional Regulation',
    color: 'border-green-500/30 hover:shadow-green-400/20'
  },
  {
    id: 'managing-anger',
    title: 'Managing Anger',
    duration: '5 Days',
    description: 'Understand, defuse, and express anger in a healthy, non-harmful way.',
    icon: Flame,
    theme: 'Emotional Regulation',
    color: 'border-red-500/30 hover:shadow-red-400/20'
  },
  {
    id: 'self-esteem-rebuilding',
    title: 'Self-Esteem Rebuilding',
    duration: '7 Days',
    description: 'Boost inner worth, set boundaries, and practice daily confidence rituals.',
    icon: Award,
    theme: 'Self-Esteem & Identity',
    color: 'border-yellow-500/30 hover:shadow-yellow-400/20'
  },
  {
    id: 'authentic-self-discovery',
    title: 'Authentic Self Discovery',
    duration: '5 Days',
    description: 'Get in touch with your true self beneath roles and expectations.',
    icon: UserCheck,
    theme: 'Self-Esteem & Identity',
    color: 'border-teal-500/30 hover:shadow-teal-400/20'
  },
  {
    id: 'letting-go-of-the-past',
    title: 'Letting Go of the Past',
    duration: '7 Days',
    description: 'Use reflection, release techniques, and forgiveness to move forward.',
    icon: Feather,
    theme: 'Healing & Recovery',
    color: 'border-gray-500/30 hover:shadow-gray-400/20'
  },
  {
    id: 'healing-toxic-relationships',
    title: 'Healing from Toxic Relationships',
    duration: '10 Days',
    description: 'Rebuild inner safety, trust, and self-identity after emotional harm.',
    icon: HeartCrack,
    theme: 'Healing & Recovery',
    color: 'border-indigo-500/30 hover:shadow-indigo-400/20'
  },
  {
    id: 'cbt-starter',
    title: 'CBT Starter',
    duration: '7 Days',
    description: 'Introduce core CBT tools for identifying and reframing thoughts.',
    icon: Recycle,
    theme: 'Mental Skills & Focus',
    color: 'border-blue-500/30 hover:shadow-blue-400/20'
  },
  {
    id: 'focus-clarity-booster',
    title: 'Focus & Clarity Booster',
    duration: '5 Days',
    description: 'Clear mental clutter and improve focus through mindfulness hacks.',
    icon: Target,
    theme: 'Mental Skills & Focus',
    color: 'border-sky-500/30 hover:shadow-sky-400/20'
  },
  {
    id: 'stress-detox',
    title: 'Stress Detox',
    duration: '5 Days',
    description: 'Reduce overwhelm with daily calming rituals and nervous system resets.',
    icon: Wind,
    theme: 'Lifestyle & Balance',
    color: 'border-cyan-500/30 hover:shadow-cyan-400/20'
  },
  {
    id: 'digital-mindfulness',
    title: 'Digital Mindfulness',
    duration: '4 Days',
    description: 'Rebuild healthy screen habits and reclaim your attention span.',
    icon: Smartphone,
    theme: 'Lifestyle & Balance',
    color: 'border-slate-500/30 hover:shadow-slate-400/20'
  },
  {
    id: 'compassion-practice',
    title: 'Compassion Practice',
    duration: '5 Days',
    description: 'Cultivate kindness, empathy, and gentle presence for yourself and others.',
    icon: HandHeart,
    theme: 'Spiritual & Inner Growth',
    color: 'border-rose-500/30 hover:shadow-rose-400/20'
  },
  {
    id: 'gratitude-pathway',
    title: 'Gratitude Pathway',
    duration: '3 Days',
    description: 'Daily reflections to build appreciation and elevate your emotional state.',
    icon: Gift,
    theme: 'Spiritual & Inner Growth',
    color: 'border-amber-500/30 hover:shadow-amber-400/20'
  },
];


export const therapyPathsDetailed: Record<string, TherapyPath> = {
  // Existing Paths
  'anxiety-management': {
    id: 'anxiety-management',
    title: 'Anxiety Management Path',
    duration: '3 Days',
    description: 'Learn evidence-based techniques to understand, manage, and reduce anxiety in your daily life.',
    theme: 'Anxiety',
    icon: Zap,
    color: 'border-purple-500/30 hover:shadow-purple-400/20',
    sessions: [
      { day: 1, title: 'Understanding Your Anxiety', lesson: 'Anxiety is a normal human emotion, but when it becomes overwhelming, it can interfere with our lives. Today, we will explore what anxiety is, how it manifests in your body, and what your personal triggers are.', practiceType: 'Journal', practiceDetails: 'Write down three situations from the past month where you felt anxious. What were the physical sensations? What thoughts were running through your mind?', affirmation: 'I can observe my anxiety without judgment.' },
      { day: 2, title: 'Mindful Body Scan', lesson: 'Your body holds onto stress. A body scan meditation helps you notice physical sensations without reacting, fostering a sense of calm and grounding.', practiceType: 'Meditation', practiceDetails: 'Find a quiet place and follow a 10-minute guided body scan meditation. Notice areas of tension and breathe into them, allowing them to soften.', affirmation: 'My body is my anchor to the present moment.' },
      { day: 3, title: 'Challenging Anxious Thoughts', lesson: 'Anxious thoughts are often based on cognitive distortions. Today, we practice identifying and challenging these thoughts to see situations more clearly.', practiceType: 'Exercise', practiceDetails: 'Use the CBT Thought Record tool to analyze one anxious thought you had today. Identify the distortion and write a more balanced alternative.', affirmation: 'My thoughts are not always facts.' },
    ]
  },
  'inner-child-healing': {
    id: 'inner-child-healing',
    title: 'Inner Child Healing Path',
    duration: '2 Days',
    description: 'Gently reconnect with and heal your inner child through reflection, compassion, and reparenting exercises.',
    theme: 'Trauma & Healing',
    icon: Heart,
    color: 'border-pink-500/30 hover:shadow-pink-400/20',
    sessions: [
      { day: 1, title: 'Meeting Your Inner Child', lesson: 'Your inner child is the part of you that holds your childhood experiences, emotions, and beliefs. Today, we begin the gentle process of acknowledging this part of yourself with curiosity and love.', practiceType: 'Reflection', practiceDetails: 'Find a quiet space. Close your eyes and imagine yourself as a child. What do you see? What age are you? Simply observe without judgment. How does it feel to connect with this younger version of you?', affirmation: 'I am here for my inner child with love and safety.' },
      { day: 2, title: 'A Letter to Your Younger Self', lesson: 'Communication is key to healing. Today, you will write a letter to your younger self, offering the words of comfort, validation, and support you may have needed back then.', practiceType: 'Journal', practiceDetails: 'Write a letter starting with "Dear Little Me...". Tell your inner child that they are loved, seen, and that you are here to protect them now. What promises do you want to make to them?', affirmation: 'I provide the love and support my inner child deserves.' },
    ]
  },
   'mindfulness-foundations': {
    id: 'mindfulness-foundations',
    title: 'Mindfulness Foundations Path',
    duration: '1 Day',
    description: 'Build a solid foundation in mindfulness to cultivate presence, focus, and a non-judgmental awareness.',
    theme: 'Mindfulness',
    icon: Brain,
    color: 'border-blue-500/30 hover:shadow-blue-400/20',
    sessions: [
      { day: 1, title: 'What is Mindfulness?', lesson: 'Mindfulness is the practice of paying attention to the present moment on purpose, without judgment. We will explore what this means and why it is a foundational skill for mental well-being.', practiceType: 'Reflection', practiceDetails: 'For five minutes today, simply notice your breath. When your mind wanders, gently guide it back. Note how many times your mind wandered. There is no goal, just gentle observation.', affirmation: 'I am present in this moment.' },
    ]
  },
  // New Detailed Paths
  'emotional-resilience': {
    ...therapyPathsList.find(p => p.id === 'emotional-resilience')!,
    sessions: [
      { day: 1, title: 'Understanding Resilience', lesson: 'Emotional resilience is the ability to adapt to stressful situations. It\'s not about avoiding difficulty, but about navigating it and bouncing back. It\'s a skill we can all build.', practiceType: 'Journal', practiceDetails: 'Think of a time you faced a difficult situation and got through it. What skills or strengths did you use? How did you feel afterward?', affirmation: 'My ability to handle challenges is greater than I think.' },
      { day: 2, title: 'Naming Your Emotions', lesson: 'You can\'t regulate what you don\'t recognize. Naming your emotions (e.g., "This is grief," "I feel anxious") reduces their power and is the first step toward managing them.', practiceType: 'Reflection', practiceDetails: 'Pause three times today. Each time, ask "What am I feeling right now?" Name the emotion without judgment. Just notice it.', affirmation: 'I can name my feelings without being consumed by them.' },
      { day: 3, title: 'The 5-4-3-2-1 Grounding Technique', lesson: 'When overwhelmed, grounding brings you back to the present moment. The 5-4-3-2-1 technique uses your senses to anchor you.', practiceType: 'Exercise', practiceDetails: 'When you feel stressed, stop and name: 5 things you can see, 4 things you can feel, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.', affirmation: 'I am grounded and safe in the present moment.' },
      { day: 4, title: 'Building a Support System', lesson: 'Resilience is not built in isolation. Identifying people who support you is crucial for navigating tough times.', practiceType: 'Journal', practiceDetails: 'List 3 people you can turn to for support. What kind of support does each person offer (e.g., a listening ear, practical advice, a good laugh)?', affirmation: 'I am supported and connected to others.' },
      { day: 5, title: 'Acceptance and Letting Go', lesson: 'Radical acceptance means acknowledging reality without judgment. It doesn\'t mean you approve of it, but that you stop fighting what you cannot change.', practiceType: 'Meditation', practiceDetails: 'Find a 5-minute guided meditation on acceptance. Focus on breathing into any resistance you feel and gently letting it go.', affirmation: 'I accept what is, releasing what was, and have faith in what will be.' },
      { day: 6, title: 'Self-Compassion Break', lesson: 'Treating yourself with the same kindness you\'d offer a friend is a core part of resilience. Today, we practice a structured self-compassion break.', practiceType: 'Exercise', practiceDetails: 'When you feel stressed, place a hand on your heart and say: 1. "This is a moment of suffering." 2. "Suffering is a part of life." 3. "May I be kind to myself in this moment."', affirmation: 'I treat myself with kindness and compassion.' },
      { day: 7, title: 'Reflecting on Your Strengths', lesson: 'You\'ve practiced several resilience skills this week. Today, we reflect on your inner resources and how you can carry them forward.', practiceType: 'Reflection', practiceDetails: 'Look back at your journal entries from this week. What have you learned about yourself? What is one resilience skill you want to continue practicing?', affirmation: 'I am resilient, and I grow stronger with every challenge.' },
    ]
  },
  'managing-anger': {
    ...therapyPathsList.find(p => p.id === 'managing-anger')!,
    sessions: [
        { day: 1, title: 'What is Anger?', lesson: 'Anger is a messenger. It often signals that a boundary has been crossed or a need is unmet. Understanding its message is the first step to managing it.', practiceType: 'Journal', practiceDetails: 'Describe a recent time you felt angry. What was the trigger? What was the underlying need or violated boundary?', affirmation: 'My anger is a signal, and I can listen to its message.' },
        { day: 2, title: 'Physical Release', lesson: 'Anger creates a physical charge in the body. Healthy physical release can prevent it from turning into destructive behavior.', practiceType: 'Exercise', practiceDetails: 'When you feel anger rising, try one of these: a brisk walk for 10 minutes, clenching and releasing your fists 10 times, or deep, slow breathing for 2 minutes.', affirmation: 'I can move this energy through my body safely.' },
        { day: 3, title: 'The "Pause" Technique', lesson: 'The space between a trigger and a reaction is where your power lies. Practicing the "pause" builds this space.', practiceType: 'Reflection', practiceDetails: 'Today, if you feel anger, consciously say "Pause" to yourself. Take three deep breaths before responding or acting. Note how this changes the outcome.', affirmation: 'I have the power to pause before I react.' },
        { day: 4, title: '"I" Statements', lesson: 'Expressing anger healthily involves clear, non-blaming communication. "I" statements focus on your feelings rather than accusing others.', practiceType: 'Journal', practiceDetails: 'Reframe a recent angry thought from "You always..." to "I feel [emotion] when [situation] because [need]."', affirmation: 'I can express my feelings clearly and respectfully.' },
        { day: 5, title: 'Finding the Emotion Underneath', lesson: 'Anger is often a "secondary" emotion, protecting us from more vulnerable feelings like sadness, hurt, or fear.', practiceType: 'Reflection', practiceDetails: 'Think about the last time you were angry. Ask yourself, "What vulnerable feeling might be underneath this anger?" Sit with that feeling for a moment.', affirmation: 'I am brave enough to feel what is beneath my anger.' },
    ]
  },
  'self-esteem-rebuilding': {
    ...therapyPathsList.find(p => p.id === 'self-esteem-rebuilding')!,
    sessions: [
      { day: 1, title: 'Your Inner Critic', lesson: 'We all have an inner critic. Today, we will learn to notice its voice without believing its stories.', practiceType: 'Journal', practiceDetails: 'Listen for your inner critic today. Write down one thing it says. Then, write a compassionate response to it, as if you were talking to a friend.', affirmation: 'I am more than the voice of my inner critic.' },
      { day:2, title: 'Evidence Log', lesson: 'Low self-esteem often ignores evidence of our worth. We will actively look for it.', practiceType: 'Journal', practiceDetails: 'At the end of the day, write down three things you did well, no matter how small. (e.g., "I made a healthy breakfast," "I was kind to a coworker," "I finished a task.")', affirmation: 'I recognize my own competence and effort.' },
      { day: 3, title: 'Setting a Small Boundary', lesson: 'Boundaries are a powerful act of self-worth. They teach others how to treat us and affirm our own value.', practiceType: 'Exercise', practiceDetails: 'Practice setting one small, low-stakes boundary today. This could be saying "no" to a small request, or simply stating "I need a few minutes to myself."', affirmation: 'My needs are valid, and I can express them.' },
      { day: 4, title: 'Values Alignment', lesson: 'Living in alignment with your core values builds authentic self-esteem. What is truly important to you?', practiceType: 'Journal', practiceDetails: 'List your top 3-5 core values (e.g., kindness, creativity, honesty, adventure). How can you honor one of these values with a small action today?', affirmation: 'I live a life that is true to me.' },
      { day: 5, title: 'Body Gratitude', lesson: 'Shifting from criticism to gratitude for our bodies can be transformative for self-esteem.', practiceType: 'Meditation', practiceDetails: 'Do a 5-minute body gratitude meditation. Instead of focusing on appearance, thank your body for what it allows you to do (e.g., "Thank you, legs, for carrying me.").', affirmation: 'I am grateful for my body and all it does for me.' },
      { day: 6, title: 'Accepting a Compliment', lesson: 'People with low self-esteem often deflect compliments. Today, we practice receiving them gracefully.', practiceType: 'Exercise', practiceDetails: 'If you receive a compliment today, your only task is to respond with a simple "Thank you." Notice how it feels to let the positive words in.', affirmation: 'I am worthy of praise and kindness.' },
      { day: 7, title: 'Letter of Self-Appreciation', lesson: 'To conclude our week, you will integrate these lessons by writing a letter of appreciation to yourself.', practiceType: 'Journal', practiceDetails: 'Write a short letter to yourself, acknowledging your strengths, your efforts this week, and your inherent worth. Seal it to read on a difficult day.', affirmation: 'I deeply and completely love and accept myself.' },
    ]
  },
  // Add all other paths here...
  'authentic-self-discovery': {
    ...therapyPathsList.find(p => p.id === 'authentic-self-discovery')!,
    sessions: [
        { day: 1, title: 'Shedding the Masks', lesson: 'We all wear masks or play roles. Today is about noticing them.', practiceType: 'Journal', practiceDetails: 'List the different "roles" you play (e.g., employee, parent, friend). What mask do you wear for each? Who are you when you\'re alone?', affirmation: 'It is safe for me to be my authentic self.' },
        { day: 2, title: 'Childhood Joys', lesson: 'What did you love to do as a child, before you were told what you "should" be?', practiceType: 'Reflection', practiceDetails: 'Think back to what brought you pure joy as a child (e.g., drawing, building forts, being in nature). How can you incorporate a small piece of that joy into your life this week?', affirmation: 'My inner child knows the way to joy.' },
        { day: 3, title: 'Following Curiosity', lesson: 'Authenticity is fueled by curiosity. What are you genuinely curious about right now?', practiceType: 'Exercise', practiceDetails: 'Spend 15 minutes today exploring something you\'re curious about with no goal in mind. Watch a documentary, read an article, or browse a topic online.', affirmation: 'I follow the whispers of my curiosity.' },
        { day: 4, title: 'Your "No" is Sacred', lesson: 'Knowing what you stand for means knowing what you won\'t stand for. Your "no" defines your "yes".', practiceType: 'Journal', practiceDetails: 'Write about a time you said "yes" when you wanted to say "no." How did it feel? What would it feel like to honor your "no" in the future?', affirmation: 'Saying "no" to others can be saying "yes" to myself.' },
        { day: 5, title: 'Your Authentic Bill of Rights', lesson: 'You have the right to be you. Let\'s put it in writing.', practiceType: 'Journal', practiceDetails: 'Create your own "Authentic Bill of Rights." Include statements like: "I have the right to change my mind," "I have the right to put my needs first," "I have the right to be imperfect."', affirmation: 'I give myself permission to be fully me.' },
    ]
  },
    'letting-go-of-the-past': {
    ...therapyPathsList.find(p => p.id === 'letting-go-of-the-past')!,
    sessions: [
        { day: 1, title: 'Acknowledging the Weight', lesson: 'The first step to letting go is acknowledging what you are carrying.', practiceType: 'Journal', practiceDetails: 'Write down a memory, belief, or resentment you are holding onto. Describe how it feels in your body to carry this weight.', affirmation: 'I acknowledge what I am carrying without judgment.' },
        { day: 2, title: 'The Story I Tell Myself', lesson: 'We often replay a story about the past. What is your story, and is it serving you?', practiceType: 'Journal', practiceDetails: 'Write out the story of a past event that still bothers you. Then, ask: "Is there another way to see this? What did I learn from this experience?"', affirmation: 'I can change the story I tell myself about the past.' },
        { day: 3, title: 'Cutting the Cord Meditation', lesson: 'Visualization is a powerful tool for release.', practiceType: 'Meditation', practiceDetails: 'Find a quiet space. Visualize the person or event you wish to release from. Imagine a cord connecting you. See yourself lovingly, but firmly, cutting that cord and wishing them well.', affirmation: 'I release what no longer serves me.' },
        { day: 4, title: 'Forgiveness for Yourself', lesson: 'Often, the hardest person to forgive is ourselves. Forgiveness is not excusing behavior; it is releasing the burden.', practiceType: 'Journal', practiceDetails: 'Write a letter of forgiveness to yourself for a past mistake. Offer yourself the same compassion you would a friend.', affirmation: 'I forgive myself and release myself from the past.' },
        { day: 5, title: 'Focusing on the Present', lesson: 'Letting go happens in the now. The more we anchor in the present, the less power the past has.', practiceType: 'Exercise', practiceDetails: 'Practice a "Mindful Minute." For 60 seconds, bring all your attention to one sense. What do you see right now? What do you hear? What do you feel?', affirmation: 'My power is in the present moment.' },
        { day:6, title: 'Creating a New Future', lesson: 'Letting go creates space. What do you want to fill that space with?', practiceType: 'Journal', practiceDetails: 'Write about one small thing you can do this week that aligns with the future you want, not the past you are leaving behind.', affirmation: 'I am the creator of my future.' },
        { day: 7, title: 'Release Ritual', lesson: 'A physical ritual can symbolize emotional release.', practiceType: 'Exercise', practiceDetails: 'Write what you are letting go of on a piece of paper. Safely burn it, tear it up, or bury it in the earth. As you do, state aloud: "I release this with love and gratitude."', affirmation: 'I am free.' },
    ]
  },
  'healing-toxic-relationships': {
    ...therapyPathsList.find(p => p.id === 'healing-toxic-relationships')!,
    sessions: [
        { day: 1, title: 'Recognizing the Impact', lesson: 'Understanding how a toxic relationship affected you is the first step. This is about validation, not blame.', practiceType: 'Journal', practiceDetails: 'In a safe space, list some of the ways the relationship impacted your self-esteem, your trust in others, or your sense of safety. Acknowledge the hurt.', affirmation: 'I validate my own experiences and feelings.' },
        { day: 2, title: 'Reclaiming Your Narrative', lesson: 'Toxic relationships often warp our sense of self. It\'s time to rewrite your story.', practiceType: 'Journal', practiceDetails: 'Write down three positive qualities about yourself that have nothing to do with the relationship. For each quality, write a sentence about how you can express it today.', affirmation: 'I am redefining who I am on my own terms.' },
        { day: 3, title: 'Setting Energetic Boundaries', lesson: 'Even if you are no longer in contact, you can set energetic boundaries to protect your peace.', practiceType: 'Meditation', practiceDetails: 'Visualize a shield of protective light around you. See it deflecting any negative energy, thoughts, or memories related to the past relationship. Hold this image for 5 minutes.', affirmation: 'My energy is sacred, and I am in control of it.' },
        { day: 4, title: 'Identifying Healthy Patterns', lesson: 'To avoid repeating history, we must define what "healthy" looks like for us.', practiceType: 'Journal', practiceDetails: 'List 5 characteristics of a healthy relationship (with anyone - friends, family, partners). Examples: mutual respect, open communication, feeling safe.', affirmation: 'I attract and cultivate healthy, respectful relationships.' },
        { day: 5, title: 'Rebuilding Self-Trust', lesson: 'Toxic dynamics can make us doubt our own judgment. We can learn to trust ourselves again.', practiceType: 'Exercise', practiceDetails: 'Make one small decision today (e.g., what to eat, what to wear) and consciously trust your choice without second-guessing it. Say to yourself, "I trust my judgment."', affirmation: 'I am learning to trust my intuition again.' },
        { day: 6, title: 'The Grieving Process', lesson: 'It\'s okay to grieve the good parts of a toxic relationship, or the future you thought you would have. Grief is part of healing.', practiceType: 'Reflection', practiceDetails: 'Allow yourself to feel any sadness or loss today without judgment. What do you need to feel comforted? A warm blanket? A cup of tea? A good cry?', affirmation: 'I allow myself to grieve and heal in my own time.' },
        { day: 7, title: 'A Letter You Don\'t Send', lesson: 'Writing can be a powerful tool for processing complex emotions without needing to engage.', practiceType: 'Journal', practiceDetails: 'Write a raw, honest letter to the person from the toxic relationship. Say everything you need to say. Then, delete it or tear it up. This is for you, not for them.', affirmation: 'I release my unspoken words and free myself.' },
        { day: 8, title: 'Cultivating Self-Soothing', lesson: 'Learning to be your own source of comfort is a superpower.', practiceType: 'Exercise', practiceDetails: 'Create a "self-soothing" kit. This could be a mental list or a physical box with things that calm your senses: a favorite scent, a soft texture, a calming song, a comforting taste.', affirmation: 'I can be my own safe space.' },
        { day: 9, title: 'Finding Joy in Solitude', lesson: 'Reconnecting with yourself and finding joy in your own company is a vital part of healing.', practiceType: 'Reflection', practiceDetails: 'Schedule 30 minutes of "me time" today. Do something you genuinely enjoy, by yourself. Notice the feeling of peace and independence.', affirmation: 'I enjoy my own company and cherish my solitude.' },
        { day: 10, title: 'Looking Forward with Hope', lesson: 'Healing is not about forgetting, but about integrating the lessons so you can look forward with wisdom and hope.', practiceType: 'Journal', practiceDetails: 'Write about one thing you are looking forward to in your future that is just for you. What is one step you can take towards it this month?', affirmation: 'My past has prepared me for a beautiful future.' },
    ]
  },
  'cbt-starter': {
    ...therapyPathsList.find(p => p.id === 'cbt-starter')!,
    sessions: [
        { day: 1, title: 'Thoughts Are Not Facts', lesson: 'The foundation of CBT is that our thoughts, feelings, and behaviors are connected. We begin by learning to observe our thoughts as separate from ourselves.', practiceType: 'Reflection', practiceDetails: 'Today, when you have a strong feeling, practice saying, "I am having the thought that..." before the thought. Example: Instead of "I\'m a failure," try "I am having the thought that I am a failure." Notice the distance this creates.', affirmation: 'I am the observer of my thoughts.' },
        { day: 2, title: 'The Thought-Feeling Link', lesson: 'How we think directly impacts how we feel. Today we practice identifying this link in real-time.', practiceType: 'Journal', practiceDetails: 'Use the CBT Thought Record tool for one event today. Fill out only the "Trigger," "Automatic Thought," and "Emotion" sections. See the direct connection.', affirmation: 'My thoughts influence my feelings, and I can influence my thoughts.' },
        { day: 3, title: 'Identifying Cognitive Distortions', lesson: 'Our brains use mental shortcuts that are often unhelpful. These are "cognitive distortions." Today we learn to spot one: All-or-Nothing thinking.', practiceType: 'Exercise', practiceDetails: 'Listen for "all-or-nothing" words today (always, never, everyone, nobody, perfect, failure). When you spot one, challenge it by asking, "Is that 100% true?"', affirmation: 'I am moving from black-and-white thinking to seeing the shades of gray.' },
        { day: 4, title: 'Distortion Detective: Mind Reading', lesson: 'Mind reading is assuming you know what others are thinking without any real evidence. This distortion fuels social anxiety.', practiceType: 'Journal', practiceDetails: 'Think of a recent situation where you assumed someone was thinking negatively about you. Ask yourself: "What is the evidence for this thought? What are some alternative explanations?"', affirmation: 'I cannot read minds, and others cannot read mine.' },
        { day: 5, title: 'Distortion Detective: Fortune Telling', lesson: 'Fortune telling is predicting a negative outcome with certainty. We treat our prediction as a fact.', practiceType: 'Reflection', practiceDetails: 'Catch yourself predicting a negative future today. Ask, "What is the worst that could happen? What is the best? What is most realistic?"', affirmation: 'I cannot predict the future, so I will focus on the present.' },
        { day: 6, title: 'Generating a Balanced Thought', lesson: 'A balanced thought is not "toxic positivity." It\'s a more realistic, compassionate, and helpful perspective.', practiceType: 'Exercise', practiceDetails: 'Take one negative thought from this week. Write it down. Now, write a new thought that is more balanced and kind. Use the AI suggestion tool in the CBT record for help if needed.', affirmation: 'I can find a more balanced and helpful way to see this.' },
        { day: 7, title: 'Putting It All Together', lesson: 'CBT is a practice. Today, we review the full cycle from thought to balanced thought.', practiceType: 'Journal', practiceDetails: 'Complete one full CBT Thought Record, from trigger to balanced thought. Notice how changing the thought can change the associated feeling and behavior.', affirmation: 'I have the power to challenge and reframe my thoughts.' },
    ]
  },
  'focus-clarity-booster': {
    ...therapyPathsList.find(p => p.id === 'focus-clarity-booster')!,
    sessions: [
        { day: 1, title: 'The "Brain Dump"', lesson: 'Mental clutter kills focus. A "brain dump" gets all your nagging to-dos, worries, and ideas out of your head and onto paper.', practiceType: 'Journal', practiceDetails: 'Set a timer for 10 minutes. Write down everything and anything that is on your mind. Don\'t organize or edit it. Just get it out.', affirmation: 'I am clearing my mind to make space for focus.' },
        { day: 2, title: 'Single-Tasking', lesson: 'Multitasking is a myth. It\'s actually "task-switching," and it drains your mental energy. Today, we practice single-tasking.', practiceType: 'Exercise', practiceDetails: 'Choose one important task. Set a timer for 25 minutes (Pomodoro Technique). Work only on that task. When the timer rings, take a 5-minute break.', affirmation: 'I give my full attention to one thing at a time.' },
        { day: 3, title: 'Mindful Breathing for Focus', lesson: 'A few moments of mindful breathing can reset your brain and bring your attention back to the present.', practiceType: 'Meditation', practiceDetails: 'Before starting a work block, close your eyes and take 5 deep, slow breaths. Focus only on the sensation of the air moving in and out.', affirmation: 'My breath is my anchor to the present moment.' },
        { day: 4, title: 'Digital Boundaries', lesson: 'Notifications are focus-killers. Today, we create a small bubble of digital peace.', practiceType: 'Exercise', practiceDetails: 'Turn off all non-essential notifications on your phone and computer for at least one hour. Notice the difference in your ability to concentrate.', affirmation: 'I am in control of my attention.' },
        { day: 5, title: 'The "Two-Minute" Rule', lesson: 'Procrastination clutters our minds. The "two-minute rule" helps clear small tasks quickly.', practiceType: 'Reflection', practiceDetails: 'Identify a task you\'ve been putting off. If it can be done in two minutes or less, do it immediately. Enjoy the feeling of mental space you\'ve created.', affirmation: 'I create momentum by taking small, immediate actions.' },
    ]
  },
  'stress-detox': {
    ...therapyPathsList.find(p => p.id === 'stress-detox')!,
    sessions: [
      { day: 1, title: 'Identify Your Stressors', lesson: 'Awareness is the first step. What are the primary sources of stress in your life right now?', practiceType: 'Journal', practiceDetails: 'Categorize your stressors into three columns: 1. Things I can control. 2. Things I can influence. 3. Things I cannot control.', affirmation: 'I focus my energy on what I can control.' },
      { day: 2, title: 'Nervous System Reset: Sighing', lesson: 'A physiological sigh (a double inhale followed by a long exhale) is one of the fastest ways to calm your nervous system.', practiceType: 'Exercise', practiceDetails: 'Throughout the day, whenever you feel a wave of stress, take a moment to perform 1-3 physiological sighs. Inhale through the nose, then take another short inhale, then exhale slowly through the mouth.', affirmation: 'I can calm my body and mind with my breath.' },
      { day: 3, title: 'Mindful Movement', lesson: 'Stress gets trapped in the body. Gentle, mindful movement helps release it.', practiceType: 'Meditation', practiceDetails: 'Do a 10-minute mindful stretching session. Pay close attention to the sensations in your muscles as you stretch. Don\'t push, just breathe into the feelings.', affirmation: 'I release tension from my body with gentle movement.' },
      { day: 4, title: 'Sensory Soothing', lesson: 'Engaging your senses can pull you out of a stress spiral. What is calming for your senses?', practiceType: 'Reflection', practiceDetails: 'Make a list of "sensory soothers" for each sense. Sight: a plant. Sound: a favorite song. Smell: essential oil. Touch: a soft blanket. Taste: a cup of herbal tea. Use one today.', affirmation: 'I can soothe my nervous system through my senses.' },
      { day: 5, title: 'The "Worry Window"', lesson: 'Constant worrying is draining. A "worry window" contains it.', practiceType: 'Journal', practiceDetails: 'Schedule a 10-minute "worry window" for later today. If a worry comes up before then, jot it down and tell yourself, "I will think about this at [time]." During the window, let yourself worry freely. When it\'s over, move on.', affirmation: 'I am in charge of when and how I engage with my worries.' },
    ]
  },
    'digital-mindfulness': {
    ...therapyPathsList.find(p => p.id === 'digital-mindfulness')!,
    sessions: [
      { day: 1, title: 'The Awareness Audit', lesson: 'The first step is to become aware of your current digital habits without judgment.', practiceType: 'Reflection', practiceDetails: 'For one day, simply notice how many times you pick up your phone. What is the trigger? Is it boredom, anxiety, or a specific need? Don\'t change anything yet, just observe.', affirmation: 'I am aware of my digital habits.' },
      { day: 2, title: 'Mindful Entry', lesson: 'We often unlock our phones on autopilot. Today, we create a "mindful entry" point.', practiceType: 'Exercise', practiceDetails: 'Before unlocking your phone or opening a social media app, take one deep breath and ask yourself, "What is my intention?" This small pause breaks the habit loop.', affirmation: 'I use my devices with intention.' },
      { day: 3, title: 'Curate Your Feed', lesson: 'Your digital space affects your mental space. It\'s time to do some gardening.', practiceType: 'Exercise', practiceDetails: 'Spend 15 minutes unfollowing or muting accounts that make you feel anxious, inadequate, or angry. Follow 3 new accounts that are inspiring, calming, or educational.', affirmation: 'I curate a digital environment that supports my well-being.' },
      { day: 4, title: 'Tech-Free Transition', lesson: 'The first and last hour of the day are crucial for mental health. Let\'s protect them.', practiceType: 'Journal', practiceDetails: 'Tonight, put your phone away at least 30 minutes before you plan to sleep. In the morning, wait at least 15 minutes before checking it. Journal about how this changes your state of mind.', affirmation: 'I create tech-free space to begin and end my day in peace.' },
    ]
  },
  'compassion-practice': {
    ...therapyPathsList.find(p => p.id === 'compassion-practice')!,
    sessions: [
      { day: 1, title: 'What is Compassion?', lesson: 'Compassion is not pity. It is the practice of recognizing suffering and responding with kindness. It starts with ourselves.', practiceType: 'Reflection', practiceDetails: 'Think of a time you were hard on yourself. Now, imagine a dear friend was in the same situation. What would you say to them? Write down those kind words.', affirmation: 'I can offer myself the same compassion I offer to others.' },
      { day: 2, title: 'Loving-Kindness Meditation for Self', lesson: 'We will use traditional phrases to actively cultivate feelings of kindness towards ourselves.', practiceType: 'Meditation', practiceDetails: 'Find a comfortable seat. For 5 minutes, silently repeat these phrases to yourself: "May I be safe. May I be happy. May I be healthy. May I live with ease."', affirmation: 'I am worthy of my own love and kindness.' },
      { day: 3, title: 'Extending Compassion to a Loved One', lesson: 'Now we extend the circle of compassion outwards to someone we care about deeply.', practiceType: 'Meditation', practiceDetails: 'Bring a loved one to mind. For 5 minutes, repeat the phrases for them: "May you be safe. May you be happy. May you be healthy. May you live with ease."', affirmation: 'I wish for the happiness and well-being of others.' },
      { day: 4, title: 'Compassion for a Neutral Person', lesson: 'The practice expands our capacity when we offer compassion to someone we don\'t have strong feelings about.', practiceType: 'Exercise', practiceDetails: 'Think of a neutral person you encounter in your daily life (e.g., a cashier, a bus driver). Hold them in your mind and offer them the same loving-kindness phrases for 2-3 minutes.', affirmation: 'My capacity for compassion is growing.' },
      { day: 5, title: 'Common Humanity', lesson: 'The ultimate practice of compassion is recognizing that everyone, just like us, wants to be happy and free from suffering.', practiceType: 'Journal', practiceDetails: 'Reflect on a recent challenge. Now, consider how many other people in the world might be facing a similar struggle. Write about this shared "common humanity." How does it make you feel?', affirmation: 'Just like me, others want to be happy. Just like me, others feel pain. We are connected.' },
    ]
  },
  'gratitude-pathway': {
    ...therapyPathsList.find(p => p.id === 'gratitude-pathway')!,
    sessions: [
      { day: 1, title: 'Three Good Things', lesson: 'Gratitude rewires our brain to notice the positive. The "Three Good Things" exercise is a simple, powerful way to start.', practiceType: 'Journal', practiceDetails: 'Before bed, write down three things that went well today and your role in them. They can be very small (e.g., "I enjoyed my coffee this morning because I took the time to make it.").', affirmation: 'I notice the good that surrounds me.' },
      { day: 2, title: 'Sensory Gratitude', lesson: 'Today we practice gratitude through our senses, anchoring us in the present moment.', practiceType: 'Reflection', practiceDetails: 'Throughout your day, find one thing to be grateful for with each sense. A beautiful sight, a pleasant sound, a comforting touch, a delicious taste, a lovely smell.', affirmation: 'I am grateful for the simple gifts of my senses.' },
      { day: 3, title: 'A Letter of Gratitude', lesson: 'Expressing gratitude to others amplifies its effects for both the giver and receiver.', practiceType: 'Journal', practiceDetails: 'Write a short letter to someone you are grateful for. You don\'t have to send it. Focus on specifically why you are thankful for them and what they mean to you.', affirmation: 'My heart is filled with gratitude for the people in my life.' },
    ]
  },
};

export const getPracticeIcon = (type: DailySession['practiceType']) => {
    switch (type) {
        case 'Journal': return Edit;
        case 'Meditation': return Mic;
        case 'Reflection': return BookOpen;
        case 'Exercise': return Milestone;
        default: return Edit;
    }
};
