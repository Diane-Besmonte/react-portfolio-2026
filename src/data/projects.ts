import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: "tracktive",
    title: "Tracktive",
    description: "AI-powered learning planner assistant.",
    longDesc: "A full-stack application that uses AI to track and optimize study habits for better retention.",
    tech: ["React", "TypeScript", "OpenAI", "FastAPI", "Langchain", "Supabase"],
    link: "https://tracktive-ai.vercel.app/",
    github: "https://github.com/Diane-Besmonte/tracktive.ai",
    image: "/images/tracktive_homepage.png"
  },
  {
    id: "booking",
    title: "N8N Calendar Booking Agent",
    description: "A simple AI agent for automated calendar event creation.",
    longDesc: "A simple AI agent with automation workflow of creating calendar blockers for users by connecting the google account.",
    tech: ["N8N", "OpenAI"],
    link: "https://dbesmonte.app.n8n.cloud/webhook/71b5e0d1-8c29-4f16-916d-6795c96f3b6b/chat",
    github: "",
    image: "/images/n8n_booking_workflow.png"
  },
  {
    id: "travelbot",
    title: "N8N Travel Guide Chatbot",
    description: "A simple AI chatbot for Travel Iteneraries assistance.",
    longDesc: "A simple chatbot that assists users with their travel plan by getting the place, range, mood, and budget.",
    tech: ["N8N", "OpenAI"],
    link: "https://dbesmonte.app.n8n.cloud/webhook/12aebc13-3a1a-45f9-bc48-298901de3edf/chat",
    github: "",
    image: "/images/n8n_travel_chat.png"
  }
];