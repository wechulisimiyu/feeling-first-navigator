// Mood Enum
export enum Mood {
  OKAY = "okay",
  NOT_OKAY = "not_okay", 
  LOW_MOOD = "low_mood",
  ANXIOUS = "anxious",
  UNUSUAL_THOUGHTS = "unusual_thoughts"
}

// PHQ9 Enum
export enum PHQ9 {
  NOT_AT_ALL = 0,
  SEVERAL_DAYS = 1,
  MORE_THAN_HALF_DAYS = 2,
  NEARLY_EVERY_DAY = 3
}

// GAD7 Enum
export enum GAD7 {
  NOT_AT_ALL = 0,
  SEVERAL_DAYS = 1,
  MORE_THAN_HALF_DAYS = 2,
  NEARLY_EVERY_DAY = 3
}

// PSQ Enum
export enum PSQ {
  NEVER = 0,
  SOMETIMES = 1,
  OFTEN = 2,
  ALWAYS = 3
}

// Severity maps for assessments
export const PHQ9_SEVERITY = {
  0: { label: "None-minimal", color: "bg-green-100 text-green-800" },
  1: { label: "Mild", color: "bg-yellow-100 text-yellow-800" },
  2: { label: "Moderate", color: "bg-orange-100 text-orange-800" },
  3: { label: "Moderately severe", color: "bg-red-100 text-red-800" },
  4: { label: "Severe", color: "bg-purple-100 text-purple-800" }
};

export const GAD7_SEVERITY = {
  0: { label: "Minimal anxiety", color: "bg-green-100 text-green-800" },
  1: { label: "Mild anxiety", color: "bg-yellow-100 text-yellow-800" },
  2: { label: "Moderate anxiety", color: "bg-orange-100 text-orange-800" },
  3: { label: "Severe anxiety", color: "bg-red-100 text-red-800" }
};

export const PSQ_SEVERITY = {
  0: { label: "Low risk", color: "bg-green-100 text-green-800" },
  1: { label: "Medium risk", color: "bg-yellow-100 text-yellow-800" },
  2: { label: "High risk", color: "bg-red-100 text-red-800" }
};

// Score ranges for the severity levels
export const PHQ9_RANGES = [
  { min: 0, max: 4, level: 0 },
  { min: 5, max: 9, level: 1 },
  { min: 10, max: 14, level: 2 },
  { min: 15, max: 19, level: 3 },
  { min: 20, max: 27, level: 4 }
];

export const GAD7_RANGES = [
  { min: 0, max: 4, level: 0 },
  { min: 5, max: 9, level: 1 },
  { min: 10, max: 14, level: 2 },
  { min: 15, max: 21, level: 3 }
];

export const PSQ_RANGES = [
  { min: 0, max: 8, level: 0 },
  { min: 9, max: 15, level: 1 },
  { min: 16, max: 24, level: 2 }
];

// Data interfaces
export interface User {
  id: string;
  username: string;
  created_at: string;
}

export interface Professional {
  id: string;
  name: string;
  specialty: string;
  location: string;
  contact: string;
}

export interface Session {
  id: string;
  user_id: string;
  mood: Mood;
  assessment_type?: "PHQ9" | "GAD7" | "PSQ";
  assessment_score?: number;
  severity_level?: number;
  recommendation?: string;
  timestamp: string;
  responses?: Record<string, number>;
}

// Recommendations based on severity levels
export const RECOMMENDATIONS = {
  PHQ9: {
    0: "Your symptoms are minimal. Continue with self-care practices.",
    1: "You're showing mild symptoms of depression. Consider talking to someone you trust.",
    2: "You're showing moderate symptoms of depression. Consider speaking with a mental health professional.",
    3: "You're showing moderately severe symptoms of depression. We recommend consulting with a healthcare provider.",
    4: "You're showing severe symptoms of depression. Please seek professional help as soon as possible."
  },
  GAD7: {
    0: "Your anxiety symptoms are minimal. Continue with self-care practices.",
    1: "You're showing mild anxiety symptoms. Try relaxation techniques and mindfulness.",
    2: "You're showing moderate anxiety symptoms. Consider speaking with a mental health professional.",
    3: "You're showing severe anxiety symptoms. Please seek professional help as soon as possible."
  },
  PSQ: {
    0: "You're at low risk. Continue your current strategies and self-care.",
    1: "You're at medium risk. It may be helpful to talk to a mental health professional about your experiences.",
    2: "You're at high risk. Please reach out to a mental health professional as soon as possible."
  }
};

// Default data for professionals
export const DEFAULT_PROFESSIONALS: Professional[] = [
  {
    id: "prof-001",
    name: "Dr. Aisha Osman",
    specialty: "Clinical Psychologist",
    location: "Nairobi, Kenya",
    contact: "aisha.osman@mentalhealthea.org"
  },
  {
    id: "prof-002",
    name: "Michael Kwizera, MHC",
    specialty: "Mental Health Counselor",
    location: "Kigali, Rwanda",
    contact: "michael.kwizera@rwandamentalhealth.org"
  },
  {
    id: "prof-003",
    name: "Dr. Fatima Ibrahim",
    specialty: "Psychiatrist",
    location: "Dar es Salaam, Tanzania",
    contact: "fatima.ibrahim@mhtz.org"
  },
  {
    id: "prof-004",
    name: "Solomon Abebe, MSW",
    specialty: "Social Worker",
    location: "Addis Ababa, Ethiopia",
    contact: "solomon.abebe@ethmentalhealth.com"
  },
  {
    id: "prof-005",
    name: "Dr. Grace Mugisha",
    specialty: "Neuropsychologist",
    location: "Kampala, Uganda",
    contact: "grace.mugisha@ugmentalhealth.org"
  }
];

// PHQ-9 questions
export const PHQ9_QUESTIONS = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading the newspaper or watching television",
  "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
  "Thoughts that you would be better off dead or of hurting yourself in some way"
];

// GAD-7 questions
export const GAD7_QUESTIONS = [
  "Feeling nervous, anxious or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it is hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid as if something awful might happen"
];

// PSQ questions
export const PSQ_QUESTIONS = [
  "I hear or see things that others cannot",
  "I feel that others want to hurt me",
  "I have unusual thoughts that others don't understand",
  "I feel my thoughts are being controlled or interfered with",
  "I feel others are monitoring or watching me",
  "I hear voices commenting on my thoughts or actions",
  "I feel I have special powers that others don't have",
  "I think people are plotting against me"
];

// Self-care tips for the "I'm okay" tree
export interface SelfCareTip {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

export const SELF_CARE_TIPS: SelfCareTip[] = [
  {
    id: "tip-001",
    title: "Deep Breathing",
    description: "Take 5 deep breaths, inhaling for 4 counts and exhaling for 6 counts.",
    tags: ["quick", "stress", "anxiety"]
  },
  {
    id: "tip-002",
    title: "Mindful Moment",
    description: "Focus your attention on the present moment. Notice 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.",
    tags: ["mindfulness", "anxiety", "grounding"]
  },
  {
    id: "tip-003",
    title: "Physical Movement",
    description: "Do 10 minutes of stretching, walking, or any physical activity you enjoy.",
    tags: ["physical", "energy", "mood"]
  },
  {
    id: "tip-004",
    title: "Connect with Nature",
    description: "Spend a few minutes outside. Notice the sky, trees, or any natural elements around you.",
    tags: ["outdoors", "mindfulness", "calm"]
  },
  {
    id: "tip-005",
    title: "Gratitude Practice",
    description: "Write down three things you're grateful for today, no matter how small.",
    tags: ["positivity", "mood", "reflection"]
  }
];

// First aid resources for the "not okay" route
export interface FirstAidResource {
  id: string;
  title: string;
  description: string;
  contactInfo?: string;
  website?: string;
}

export const FIRST_AID_RESOURCES: FirstAidResource[] = [
  {
    id: "resource-001",
    title: "Crisis Text Line",
    description: "Free 24/7 text support for those in crisis.",
    contactInfo: "Text HOME to 741741",
    website: "https://www.crisistextline.org/"
  },
  {
    id: "resource-002",
    title: "National Suicide Prevention Lifeline",
    description: "24/7, free and confidential support for people in distress.",
    contactInfo: "1-800-273-8255",
    website: "https://suicidepreventionlifeline.org/"
  },
  {
    id: "resource-003",
    title: "SAMHSA's National Helpline",
    description: "Treatment referral and information service for individuals facing mental health or substance use disorders.",
    contactInfo: "1-800-662-HELP (4357)",
    website: "https://www.samhsa.gov/find-help/national-helpline"
  },
  {
    id: "resource-004",
    title: "Emergency Services",
    description: "If you or someone you know is in immediate danger, please call emergency services.",
    contactInfo: "911 (US) or your local emergency number"
  }
];
