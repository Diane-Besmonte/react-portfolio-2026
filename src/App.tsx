import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useParams } from 'react-router-dom';
import { ExternalLink, Github, Sun, Moon, Send, ArrowLeft, Mail, ChevronRight } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { projects } from './data/projects';
import type { Project } from './types';
import './index.css';

/* -------------------- Theme Toggle -------------------- */
const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      return saved ? saved === "dark" : true;
    }
    return true;
  });

  useEffect(() => {
      const root = window.document.documentElement;
      if (isDark) {
        root.classList.add('dark');
        root.style.colorScheme = 'dark';
      } else {
        root.classList.remove('dark');
        root.style.colorScheme = 'light';
      }
      localStorage.setItem("theme", isDark ? "dark" : "light");
    }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="fixed top-8 right-8 p-3 rounded-2xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-md border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-yellow-400 shadow-xl z-50 transition-all duration-300 hover:scale-110 active:scale-95 group"
      aria-label="Toggle Theme"
    >
      {isDark ? (
        <Sun size={22} className="group-hover:rotate-45 transition-transform" />
      ) : (
        <Moon size={22} className="group-hover:-rotate-12 transition-transform" />
      )}
    </button>
  );
};

/* -------------------- Project Card -------------------- */
const ProjectCard = ({ project }: { project: Project }) => (
  <Link
    to={`/project/${project.id}`}
    className="group relative flex flex-col h-full border border-neutral-200 dark:border-neutral-800 rounded-3xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-white dark:bg-neutral-800/50 overflow-hidden"
  >
    <div className="aspect-[16/10] relative overflow-hidden">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        onError={(e) => (e.currentTarget.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop")}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
    
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {project.title}
        </h3>
        <ChevronRight size={20} className="text-neutral-400 group-hover:translate-x-1 transition-transform" />
      </div>
      <p className="text-neutral-600 dark:text-neutral-400 mb-6 text-sm leading-relaxed line-clamp-2">
        {project.description}
      </p>
      <div className="flex gap-2 flex-wrap mt-auto">
        {project.tech.map((t: string) => (
          <span key={t} className="px-3 py-1 bg-neutral-100 dark:bg-neutral-700/50 text-neutral-600 dark:text-neutral-300 rounded-lg text-xs font-semibold uppercase tracking-wider">
            {t}
          </span>
        ))}
      </div>
    </div>
  </Link>
);

/* -------------------- Project Detail Page -------------------- */
const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) return <div className="p-20 text-center font-bold">Project not found</div>;

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-6xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-neutral-500 hover:text-indigo-600 dark:hover:text-indigo-400 mb-12 group transition-colors font-medium">
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
      </Link>
      
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-neutral-900 dark:text-neutral-50 leading-none">
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t: string) => (
              <span key={t} className="px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 rounded-xl text-sm font-bold">
                {t}
              </span>
            ))}
          </div>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">
            {project.longDesc}
          </p>
          <div className="flex gap-4 pt-4">
            <a href={project.link} target="_blank" rel="noreferrer" className="flex-1 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 dark:shadow-none transition-all hover:-translate-y-1">
              <ExternalLink size={20} /> Live Demo
            </a>
            <a href={project.github} target="_blank" rel="noreferrer" className="px-8 py-4 border border-neutral-200 dark:border-neutral-700 rounded-2xl font-bold flex items-center gap-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all">
              <Github size={20} /> Source
            </a>
          </div>
        </div>
        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[2.5rem] opacity-20 blur-2xl group-hover:opacity-30 transition-opacity" />
          <img src={project.image} alt={project.title} className="relative w-full aspect-square object-cover rounded-[2rem] shadow-2xl border border-white/10" />
        </div>
      </div>
    </div>
  );
};

/* -------------------- Contact Form -------------------- */
const ContactForm = () => {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState('');

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('Sending...');
    emailjs.sendForm(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, e.currentTarget, import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
      .then(() => {
        setStatus('Sent Successfully');
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setStatus(''), 4000);
      })
      .catch(() => {
        setStatus('Error Sending');
        setTimeout(() => setStatus(''), 4000);
      });
  };

  const inputStyle = "w-full p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800/50 border border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-neutral-800 outline-none transition-all dark:text-white placeholder-neutral-400 text-neutral-900";

  return (
    <form ref={form} onSubmit={sendEmail} className="space-y-4 p-1">
      <div className="grid md:grid-cols-2 gap-4">
        <input type="text" name="name" placeholder="Full Name" required className={inputStyle} />
        <input type="email" name="email" placeholder="Email Address" required className={inputStyle} />
      </div>
      <input type="text" name="title" placeholder="Subject" required className={inputStyle} />
      <textarea name="message" placeholder="Describe your project..." rows={5} required className={inputStyle} />
      <button 
        type="submit" 
        disabled={status === 'Sending...'} 
        className="group relative w-full py-5 bg-neutral-900 hover:bg-indigo-700 hover:text-white cursor-pointer dark:bg-white text-white dark:text-neutral-900 rounded-2xl font-black text-lg overflow-hidden transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 shadow-2xl"
      >
        <span className="relative z-10 flex items-center justify-center gap-3">
          {status || 'Initialize Project'} <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </span>
      </button>
    </form>
  );
};

/* -------------------- Home Page -------------------- */
const Home = () => (
  <div className="max-w-6xl mx-auto px-6 pt-10 pb-32">
    <header className="py-24 md:py-32">
      <div className="max-w-3xl">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-bold tracking-widest uppercase">
          Open to New Ventures
        </div>
        <h1 className="text-6xl md:text-[10rem] font-black leading-[0.85] tracking-tighter text-neutral-900 dark:text-neutral-50 mb-10">
          BUILD <br /> <span className="text-indigo-600 transition-all hover:italic">BEYOND.</span>
        </h1>
        <p className="text-2xl md:text-3xl text-neutral-500 dark:text-neutral-400 mb-12 leading-tight max-w-2xl font-light">
          Crafting high-performance digital experiences through <span className="text-neutral-900 dark:text-white font-medium">AI automation</span> and precision engineering.
        </p>
        <div className="flex flex-wrap gap-6">
          <a href="#contact" className="px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-xl transition-all hover:shadow-[0_20px_40px_rgba(79,70,229,0.3)] hover:-translate-y-1">
            Start a Project
          </a>
          <a href="#projects" className="px-10 py-5 border-2 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white rounded-2xl font-bold text-xl hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all">
            View Works
          </a>
        </div>
      </div>
    </header>

    <section className="mb-48">
      <h2 className="text-xs font-black uppercase tracking-[0.4em] text-neutral-400 mb-12">Core Stack</h2>
      <div className="flex flex-wrap gap-3">
        {['React', 'TypeScript', 'Tailwind CSS', 'Python', 'FastAPI', 'Django', 'OpenAI', 'Groq', 'HTML', 'CSS', 'JavaScript', 'Next.js', 'Git', 'Github', 'SQL', 'PostgreSQL', 'Supabase', 'MongoDB', 'Figma', 'LLM', 'N8N'].map((tech: string) => (
          <span key={tech} className="px-8 py-4 bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 rounded-2xl text-xl font-bold shadow-sm hover:border-indigo-500 dark:hover:border-indigo-400 transition-all cursor-default">
            {tech}
          </span>
        ))}
      </div>
    </section>

    <section id="projects" className="mb-48">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <h2 className="text-6xl font-black dark:text-neutral-50 tracking-tighter">Project <br /> Showcase</h2>
        </div>
        <p className="max-w-xs text-neutral-500 dark:text-neutral-400 font-medium pb-2">
          List of projects created upon exploration with AI and automation.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-10">
        {projects.map((p: Project) => <ProjectCard key={p.id} project={p} />)}
      </div>
    </section>

    <section id="contact" className="grid lg:grid-cols-5 gap-20 items-start">
      <div className="lg:col-span-2">
        <h2 className="text-6xl font-black dark:text-neutral-50 tracking-tighter mb-8">Let’s build <br /> something meaningful.</h2>
        <p className="text-xl text-neutral-500 dark:text-neutral-400 mb-10 leading-relaxed font-light">
           I’m always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out—I’d love to hear from you.
        </p>
        <div className="inline-flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-neutral-800 border dark:border-neutral-700 shadow-sm">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 rounded-xl">
            <Mail size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Email Me</p>
            <p className="text-neutral-900 dark:text-white font-bold">dianecoding@gmail.com</p>
          </div>
        </div>
      </div>
      <div className="lg:col-span-3 bg-white dark:bg-neutral-800/30 p-2 md:p-8 rounded-[2.5rem] border border-neutral-100 dark:border-neutral-700/50 shadow-2xl">
        <ContactForm />
      </div>
    </section>
  </div>
);

function App() {
  return (
    /* bg-neutral-50 is for Light Mode | dark:bg-[#0a0a0a] is for Dark Mode */
    <div className="min-h-screen transition-colors duration-700 bg-neutral-50 dark:bg-[#0a0a0a] text-neutral-900 dark:text-neutral-50 selection:bg-indigo-500 selection:text-white">
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
      </Routes>
    </div>
  );
}

export default App;