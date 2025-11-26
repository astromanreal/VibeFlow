
export interface Helpline {
  region: string;
  name: string;
  phone: string;
  description: string;
  website?: string;
}

export const helplines: Helpline[] = [
  {
    region: 'USA',
    name: '988 Suicide & Crisis Lifeline',
    phone: '988',
    description: '24/7, free and confidential support for people in distress, prevention and crisis resources.',
    website: 'https://988lifeline.org/'
  },
  {
    region: 'USA',
    name: 'Crisis Text Line',
    phone: 'Text HOME to 741741',
    description: 'Text with a trained crisis counselor for free, 24/7.',
    website: 'https://www.crisistextline.org/'
  },
  {
    region: 'UK',
    name: 'Samaritans',
    phone: '116 123',
    description: 'A safe place for you to talk any time you like, in your own way – about whatever’s getting to you.',
    website: 'https://www.samaritans.org/'
  },
   {
    region: 'UK',
    name: 'Shout',
    phone: 'Text SHOUT to 85258',
    description: 'Confidential 24/7 text service for people in crisis.',
    website: 'https://giveusashout.org/'
  },
  {
    region: 'India',
    name: 'iCall Psychosocial Helpline',
    phone: '022-25521111',
    description: 'Provides counseling and support from Monday to Saturday, 10:00 AM to 8:00 PM.',
    website: 'http://icallhelpline.org/'
  },
  {
    region: 'India',
    name: 'Vandrevala Foundation',
    phone: '9999666555',
    description: '24/7 crisis intervention and mental health support.',
    website: 'https://www.vandrevalafoundation.com/'
  },
  {
    region: 'Canada',
    name: 'Talk Suicide Canada',
    phone: '1-833-456-4566',
    description: 'Connect to a crisis responder to get help without judgment.',
    website: 'https://talksuicide.ca/'
  },
  {
    region: 'Australia',
    name: 'Lifeline Australia',
    phone: '13 11 14',
    description: '24-hour crisis support and suicide prevention services.',
    website: 'https://www.lifeline.org.au/'
  },
];

    