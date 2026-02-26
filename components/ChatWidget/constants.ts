export const BOT_AVATAR = "/images/kalpana-face.png";
export const POSTER_BASE_URL = "/posters/";
export const FALLBACK_AVATAR =
  "https://i.pinimg.com/1200x/5c/0b/fd/5c0bfd43a67433771a66d46ab09bef06.jpg";

export interface Message {
  role: "user" | "assistant";
  content: string;
  link?: string | null;
  poster?: string | null;
  drive_link?: string | null;
  status?: string | null;
}

export const QUICK_QUESTIONS = [
  {
    id: 1,
    label: "How to sign up or login?",
    answer:
      "1. Click on the 'Login' button at the top right.\n2. Sign up or in using your Google Account or Email.\n3. New Users: Complete your profile (College, Dept, Phone).\n4. Once done, you will be navigated to the dashboard.",
    link: "/login",
  },
  {
    id: 2,
    label: "How to participate in an event?",
    answer:
      "1. Ensure you are logged in.\n2. Go to the 'Events' tab and choose an event.\n3. Click the 'Register' button.\n4. Team Events: Create a team to get a Team Code, or use a code to join one.\n5. Individual Events: Simply click Register to confirm.",
    link: "/events",
  },
  {
    id: 3,
    label: "Date and Timeline of Srijan 2026",
    answer:
      "Srijan 2026 is scheduled from April 9th to 12th, 2026.\n\nIt will be held at Jadavpur University Salt Lake Campus.",
    link: null,
  },
];