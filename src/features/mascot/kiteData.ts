export type KiteExpression =
  | 'welcome'
  | 'curious'
  | 'happy'
  | 'excited'
  | 'thoughtful'
  | 'surprised'
  | 'proud'
  | 'playful'
  | 'calm'
  | 'goodbye';

export type KiteMouth = 'smile' | 'grin' | 'open' | 'flat' | 'smirk' | 'small' | 'o';

export interface KiteEyeState {
  /** Pixels the upper lid is lowered. Negative values open the eye wider. */
  lid: number;
  pupilX: number;
  pupilY: number;
  pupilR: number;
  /** Replaces the open eye with a drawn arc. */
  closed?: 'happy';
  scaleY?: number;
}

export interface KiteExpressionSpec {
  label: string;
  note: string;
  line: string;
  mouth: KiteMouth;
  eyes: {
    left: KiteEyeState;
    right: KiteEyeState;
  };
}

export const KITE_EXPRESSIONS: Record<KiteExpression, KiteExpressionSpec> = {
  welcome: {
    label: 'Welcome',
    note: 'Open eyes, settled posture, a tail with a little life in it.',
    line: 'Hey. Glad you made it.',
    mouth: 'smile',
    eyes: {
      left: { lid: -5, pupilX: 0, pupilY: 0, pupilR: 4.2 },
      right: { lid: -5, pupilX: 0, pupilY: 0, pupilR: 4.2 },
    },
  },
  curious: {
    label: 'Curious',
    note: 'The eyes lead to one side. The body follows a beat later.',
    line: "Wait — what's over there?",
    mouth: 'small',
    eyes: {
      left: { lid: -6, pupilX: 4, pupilY: -1, pupilR: 4 },
      right: { lid: -6, pupilX: 4, pupilY: -1, pupilR: 4 },
    },
  },
  happy: {
    label: 'Happy',
    note: 'Both eyes close into arcs and the tail lifts with the body.',
    line: 'Now this is a good breeze.',
    mouth: 'grin',
    eyes: {
      left: { lid: 0, pupilX: 0, pupilY: 0, pupilR: 4, closed: 'happy' },
      right: { lid: 0, pupilX: 0, pupilY: 0, pupilR: 4, closed: 'happy' },
    },
  },
  excited: {
    label: 'Excited',
    note: 'Wide eyes, a quicker float, and a tail that cuts through the air.',
    line: "Did you see that? Let's do it again.",
    mouth: 'open',
    eyes: {
      left: { lid: -9, pupilX: 0, pupilY: -1, pupilR: 4.6, scaleY: 1.06 },
      right: { lid: -9, pupilX: 0, pupilY: -1, pupilR: 4.6, scaleY: 1.06 },
    },
  },
  thoughtful: {
    label: 'Thoughtful',
    note: 'One lid lowers, the gaze drifts up, and the tail slows down.',
    line: "Give me a second. I'm thinking.",
    mouth: 'flat',
    eyes: {
      left: { lid: 1, pupilX: -3.5, pupilY: -2, pupilR: 3.8 },
      right: { lid: -6, pupilX: -2.5, pupilY: -2, pupilR: 3.8 },
    },
  },
  surprised: {
    label: 'Surprised',
    note: 'The eyes open wider than usual and the body pulls back.',
    line: "Oh! I didn't see you coming.",
    mouth: 'o',
    eyes: {
      left: { lid: -10, pupilX: 0, pupilY: 0, pupilR: 3, scaleY: 1.12 },
      right: { lid: -10, pupilX: 0, pupilY: 0, pupilR: 3, scaleY: 1.12 },
    },
  },
  proud: {
    label: 'Proud',
    note: 'A small lift, a steady gaze, and a tail held high.',
    line: 'We built that. Properly.',
    mouth: 'smirk',
    eyes: {
      left: { lid: -2, pupilX: 0, pupilY: -1.5, pupilR: 4 },
      right: { lid: -2, pupilX: 0, pupilY: -1.5, pupilR: 4 },
    },
  },
  playful: {
    label: 'Playful',
    note: 'A wink, a tilt, and a tail that will not sit still.',
    line: 'Catch me if you can.',
    mouth: 'smirk',
    eyes: {
      left: { lid: 0, pupilX: 0, pupilY: 0, pupilR: 4, closed: 'happy' },
      right: { lid: -6, pupilX: 3, pupilY: -1, pupilR: 4.2 },
    },
  },
  calm: {
    label: 'Calm',
    note: 'Half-lidded eyes, a slow float, and a loose ribbon tail.',
    line: "No rush. The wind isn't going anywhere.",
    mouth: 'small',
    eyes: {
      left: { lid: 2, pupilX: 0, pupilY: 1.5, pupilR: 3.8 },
      right: { lid: 2, pupilX: 0, pupilY: 1.5, pupilR: 3.8 },
    },
  },
  goodbye: {
    label: 'Goodbye',
    note: 'A softer gaze, the body turning away, and a tail trailing behind.',
    line: 'Come back when you have something to build.',
    mouth: 'smile',
    eyes: {
      left: { lid: 1, pupilX: -2, pupilY: 2, pupilR: 3.8 },
      right: { lid: 1, pupilX: -2, pupilY: 2, pupilR: 3.8 },
    },
  },
};

export const KITE_EXPRESSION_ORDER: KiteExpression[] = [
  'welcome',
  'curious',
  'happy',
  'excited',
  'thoughtful',
  'surprised',
  'proud',
  'playful',
  'calm',
  'goodbye',
];

export interface KiteSectionLine {
  id: string;
  label: string;
  expression: KiteExpression;
  line: string;
}

export const KITE_SECTION_LINES: KiteSectionLine[] = [
  {
    id: 'home',
    label: 'Home',
    expression: 'welcome',
    line: "Hey. You found the start. I'm Changa — I keep an eye on things around here.",
  },
  {
    id: 'about',
    label: 'About',
    expression: 'curious',
    line: "There's a person behind the pixels. This is the part where you meet him.",
  },
  {
    id: 'journey',
    label: 'Journey',
    expression: 'thoughtful',
    line: 'No straight lines here. Just a string, some wind, and a lot of learning.',
  },
  {
    id: 'projects',
    label: 'Projects',
    expression: 'proud',
    line: 'These are real: real users, real constraints, still being improved.',
  },
  {
    id: 'experiments',
    label: 'Experiments',
    expression: 'excited',
    line: 'This is where curiosity gets to break things on purpose.',
  },
  {
    id: 'capabilities',
    label: 'Capabilities',
    expression: 'calm',
    line: 'Tools are useful. Knowing what to build with them is the real skill.',
  },
  {
    id: 'writing',
    label: 'Writing',
    expression: 'thoughtful',
    line: 'A few thoughts that survived the editing pass.',
  },
  {
    id: 'article',
    label: 'Article',
    expression: 'calm',
    line: 'Longer thoughts. Take your time with this one.',
  },
  {
    id: 'contact',
    label: 'Contact',
    expression: 'happy',
    line: "Got something worth making? I'm listening.",
  },
  {
    id: 'not-found',
    label: 'Not found',
    expression: 'surprised',
    line: "This string doesn't lead anywhere. Let's get you back to the field.",
  },
];
