
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Check, Palette, Settings as SettingsIcon, Download } from 'lucide-react'; // Renamed Settings to SettingsIcon, Added Download
import { THEME_STORAGE_KEY, applyTheme } from '@/components/theme-applicator';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";
import type { JournalEntry } from '../journal/page'; // Import JournalEntry type

const themes = [
  { name: 'Default', value: 'theme-default', colors: { primary: 'hsl(300 70% 40%)', accent: 'hsl(51 100% 60%)', background: 'hsl(348 100% 97%)' } },
  { name: 'Serene Sky', value: 'theme-serene-sky', colors: { primary: 'hsl(210 70% 50%)', accent: 'hsl(45 100% 85%)', background: 'hsl(200 100% 95%)' } },
  { name: 'Forest Whisper', value: 'theme-forest-whisper', colors: { primary: 'hsl(90 45% 35%)', accent: 'hsl(30 70% 60%)', background: 'hsl(40 50% 96%)' } },
  { name: 'Midnight Bloom', value: 'theme-midnight-bloom', colors: { primary: 'hsl(270 60% 55%)', accent: 'hsl(320 70% 65%)', background: 'hsl(240 30% 12%)' } },
];

export default function SettingsPage() {
  const [activeTheme, setActiveTheme] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    setActiveTheme(storedTheme || 'theme-serene-sky');
  }, []);

  const handleThemeChange = (themeValue: string) => {
    applyTheme(themeValue);
    localStorage.setItem(THEME_STORAGE_KEY, themeValue);
    setActiveTheme(themeValue);
  };

  const handleExportJournal = () => {
    try {
      const storedEntries = localStorage.getItem('journalEntries');
      if (!storedEntries) {
        toast({
          title: "No Data",
          description: "No journal entries found to export.",
          variant: "destructive",
        });
        return;
      }

      const entries: JournalEntry[] = JSON.parse(storedEntries);
      if (entries.length === 0) {
        toast({
          title: "No Data",
          description: "No journal entries found to export.",
          variant: "destructive",
        });
        return;
      }

      const jsonString = JSON.stringify(entries, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const TDate = new Date();
      a.download = `vibeflow_journal_entries_${TDate.getFullYear()}-${String(TDate.getMonth() + 1).padStart(2, '0')}-${String(TDate.getDate()).padStart(2, '0')}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Export Successful",
        description: "Your journal entries have been downloaded.",
      });

    } catch (error) {
      console.error("Error exporting journal entries:", error);
      toast({
        title: "Export Failed",
        description: "Could not export journal entries. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 flex justify-center items-start min-h-screen">
      <Card className="w-full max-w-lg shadow-lg border-accent/30 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl text-primary flex items-center justify-center gap-2">
            <SettingsIcon className="w-7 h-7" />
            Settings
          </CardTitle>
          <CardDescription>Manage your application settings and appearance.</CardDescription>
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
              <Download className="w-5 h-5" />
              Data Export
            </h3>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground mb-3">Download your personal data stored in the application.</p>
              <Button
                variant="outline"
                className="w-full justify-start h-12 text-left group"
                onClick={handleExportJournal}
              >
                <div className="flex items-center gap-3">
                  <Download className="w-4 h-4 text-primary group-hover:text-accent transition-colors" />
                  <span className="font-medium">Export Journal Entries (JSON)</span>
                </div>
              </Button>
            </div>
          </section>

           <section>
            <h3 className="text-xl font-semibold text-secondary mb-3">More Settings</h3>
             <p className="text-center text-muted-foreground py-8">
                More application settings will be available here in the future.
             </p>
             <div className="flex justify-center items-center h-20">
                 <SettingsIcon className="w-12 h-12 text-muted-foreground opacity-20" />
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}

