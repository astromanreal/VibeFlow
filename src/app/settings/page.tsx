
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Check, Palette, Settings as SettingsIcon, Download, Trash2, User, RefreshCw, Sparkles } from 'lucide-react';
import { THEME_STORAGE_KEY, applyTheme } from '@/components/theme-applicator';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const themes = [
  { name: 'Default', value: 'theme-default', colors: { primary: 'hsl(300 70% 40%)', accent: 'hsl(51 100% 60%)', background: 'hsl(348 100% 97%)' } },
  { name: 'Serene Sky', value: 'theme-serene-sky', colors: { primary: 'hsl(210 70% 50%)', accent: 'hsl(45 100% 85%)', background: 'hsl(200 100% 95%)' } },
  { name: 'Forest Whisper', value: 'theme-forest-whisper', colors: { primary: 'hsl(90 45% 35%)', accent: 'hsl(30 70% 60%)', background: 'hsl(40 50% 96%)' } },
  { name: 'Midnight Bloom', value: 'theme-midnight-bloom', colors: { primary: 'hsl(270 60% 55%)', accent: 'hsl(320 70% 65%)', background: 'hsl(240 30% 12%)' } },
];

const adjectives = ["Brave", "Gentle", "Kind", "Wise", "Calm", "Happy", "Hopeful", "Strong", "Radiant"];
const nouns = ["River", "Mountain", "Star", "Koala", "Lion", "Oak", "Willow", "Ocean", "Sky"];

const generateAlias = () => {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${adj} ${noun}`;
};

export default function SettingsPage() {
  const [activeTheme, setActiveTheme] = useState<string | null>(null);
  const [userAlias, setUserAlias] = useState<string>('');
  const { toast } = useToast();
  const [appVersion, setAppVersion] = useState('');

  useEffect(() => {
    // Fetch version from package.json
    fetch('/package.json')
      .then(res => res.json())
      .then(data => setAppVersion(data.version || '1.0.0'))
      .catch(() => setAppVersion('1.0.0'));


    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    setActiveTheme(storedTheme || 'theme-serene-sky');

    const alias = localStorage.getItem('vibeflow_user_alias');
    if (alias) {
      setUserAlias(alias);
    } else {
        const newAlias = generateAlias();
        setUserAlias(newAlias);
        localStorage.setItem('vibeflow_user_alias', newAlias);
    }
  }, []);

  const handleThemeChange = (themeValue: string) => {
    applyTheme(themeValue);
    localStorage.setItem(THEME_STORAGE_KEY, themeValue);
    setActiveTheme(themeValue);
  };

  const handleExportData = (dataType: 'journal' | 'mood') => {
    const storageKey = dataType === 'journal' ? 'journalEntries' : 'moodEntries';
    const fileName = dataType === 'journal' ? 'vibeflow_journal_entries' : 'vibeflow_mood_logs';
    const toastTitle = dataType === 'journal' ? 'Journal Export' : 'Mood Log Export';

    try {
      const storedData = localStorage.getItem(storageKey);
      if (!storedData || JSON.parse(storedData).length === 0) {
        toast({
          title: "No Data",
          description: `No ${dataType} entries found to export.`,
          variant: "destructive",
        });
        return;
      }

      const jsonString = JSON.stringify(JSON.parse(storedData), null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const TDate = new Date();
      a.download = `${fileName}_${TDate.getFullYear()}-${String(TDate.getMonth() + 1).padStart(2, '0')}-${String(TDate.getDate()).padStart(2, '0')}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Export Successful",
        description: `Your ${dataType} entries have been downloaded.`,
      });

    } catch (error) {
      console.error(`Error exporting ${dataType} entries:`, error);
      toast({
        title: "Export Failed",
        description: `Could not export your ${dataType} entries. Please try again.`,
        variant: "destructive",
      });
    }
  };

  const handleClearData = () => {
    try {
        const keysToRemove = [
            'journalEntries', 'moodEntries', 'thoughtRecords',
            'favoriteAffirmations', 'soundFavorites', 'vibeflow_user_alias',
            'hasVisitedBefore'
        ];
        
        // Also remove path progress keys
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('therapy-path-progress-') || key.startsWith('seen_guidelines_')) {
                keysToRemove.push(key);
            }
        });

        keysToRemove.forEach(key => localStorage.removeItem(key));

        toast({
            title: "Data Cleared",
            description: "All your local application data has been removed. The app will now reload.",
        });

        // Reload to apply changes and regenerate alias etc.
        setTimeout(() => window.location.reload(), 2000);

    } catch (error) {
        console.error("Error clearing data:", error);
        toast({
            title: "Error",
            description: "Could not clear all data. Please try again.",
            variant: "destructive"
        });
    }
  };
  
  const handleRegenerateAlias = () => {
    const newAlias = generateAlias();
    setUserAlias(newAlias);
    localStorage.setItem('vibeflow_user_alias', newAlias);
    toast({
        title: "Alias Updated",
        description: `Your new anonymous alias is ${newAlias}.`
    });
  };

  return (
    <div className="container mx-auto py-8 px-4 flex justify-center items-start min-h-screen">
      <Card className="w-full max-w-2xl shadow-lg border-accent/30 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl text-primary flex items-center justify-center gap-2">
            <SettingsIcon className="w-7 h-7" />
            Settings
          </CardTitle>
          <CardDescription>Manage your application settings and personal data.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <section>
            <h3 className="text-xl font-semibold text-secondary mb-3 flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Appearance
            </h3>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground mb-3">Choose your preferred color theme for the application.</p>
              {themes.map((theme) => (
                <Button
                  key={theme.value}
                  variant={activeTheme === theme.value ? 'default' : 'outline'}
                  className={cn(
                    "w-full justify-start h-14 text-left transition-all duration-200 ease-in-out group",
                    activeTheme === theme.value && "ring-2 ring-primary shadow-lg"
                  )}
                  onClick={() => handleThemeChange(theme.value)}
                  aria-pressed={activeTheme === theme.value}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                       <div className="flex -space-x-1">
                        <span
                          className="block w-5 h-5 rounded-full border-2 border-card"
                          style={{ backgroundColor: theme.colors.primary }}
                          aria-hidden="true"
                        ></span>
                        <span
                          className="block w-5 h-5 rounded-full border-2 border-card"
                          style={{ backgroundColor: theme.colors.accent }}
                          aria-hidden="true"
                        ></span>
                         <span
                          className="block w-5 h-5 rounded-full border-2 border-card"
                          style={{ backgroundColor: theme.colors.background }}
                          aria-hidden="true"
                        ></span>
                      </div>
                      <span className="font-medium">{theme.name}</span>
                    </div>
                    {activeTheme === theme.value && (
                      <Check className="w-5 h-5 text-primary-foreground group-hover:text-primary-foreground text-lg" />
                    )}
                  </div>
                </Button>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-secondary mb-3 flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile
            </h3>
             <p className="text-sm text-muted-foreground mb-3">Manage your public-facing anonymous alias used in Support Circles.</p>
             <div className="flex items-center justify-between p-3 border rounded-lg bg-background/50">
                <div>
                    <p className="text-xs text-muted-foreground">Your Current Alias</p>
                    <p className="font-semibold text-primary">{userAlias || 'Generating...'}</p>
                </div>
                <Button variant="outline" size="icon" onClick={handleRegenerateAlias} aria-label="Regenerate Alias">
                    <RefreshCw className="w-4 h-4" />
                </Button>
             </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-secondary mb-3 flex items-center gap-2">
              <Download className="w-5 h-5" />
              Data Management
            </h3>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Export your personal data or clear it from this device. All data is stored locally.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="justify-start h-12 text-left group"
                    onClick={() => handleExportData('journal')}
                  >
                    <div className="flex items-center gap-3">
                      <Download className="w-4 h-4 text-primary group-hover:text-accent transition-colors" />
                      <span className="font-medium">Export Journal Entries</span>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start h-12 text-left group"
                    onClick={() => handleExportData('mood')}
                  >
                    <div className="flex items-center gap-3">
                      <Download className="w-4 h-4 text-primary group-hover:text-accent transition-colors" />
                      <span className="font-medium">Export Mood Logs</span>
                    </div>
                  </Button>
              </div>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        variant="destructive"
                        className="w-full justify-start h-12 text-left group mt-4"
                    >
                        <div className="flex items-center gap-3">
                            <Trash2 className="w-4 h-4" />
                            <span className="font-medium">Clear All App Data</span>
                        </div>
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete all your
                        journal entries, mood logs, favorites, and other saved progress
                        from this device.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClearData}>
                        Yes, delete my data
                    </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

            </div>
          </section>
        </CardContent>
        <CardFooter className="bg-muted/50 p-4 border-t mt-4">
            <div className="text-center w-full text-xs text-muted-foreground space-y-1">
                <p>VibeFlow Version {appVersion}</p>
                 <div className="flex items-center justify-center gap-2">
                    <Sparkles className="w-3 h-3 text-accent" />
                     <p>Crafted with care for your healing journey.</p>
                 </div>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}

    