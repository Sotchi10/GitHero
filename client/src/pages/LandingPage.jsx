import { ArrowRight, BarChart3, BookOpen, CheckCircle2, Code2, HelpCircle, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import NavBar from "../components/layout/NavBar";
import Feature from "./sections/Feature";
import Hero from "./sections/Hero";

const modules = [
  ["Git Foundations", "Learn repositories, commits, and the everyday Git workflow.", "Beginner"],
  ["Branching & Merging", "Work confidently with branches and bring changes together.", "Intermediate"],
  ["Working with GitHub", "Push, pull, and collaborate with remote repositories.", "Beginner"],
];

const steps = [
  [BookOpen, "Learn", "Short lessons explain the why behind each Git command."],
  [Code2, "Practise", "Try workflows in guided, low-pressure exercises."],
  [HelpCircle, "Quiz", "Check your understanding before moving forward."],
  [BarChart3, "Track Progress", "See completed lessons and stay motivated."],
];

const Preview = ({ label, children }) => <div className="rounded-2xl border border-default bg-surface p-4 shadow-sm sm:p-6"><div className="flex min-h-70 flex-col justify-between rounded-xl border border-dashed border-default bg-surface-raised p-6"><span className="w-fit rounded-full bg-btn-primary px-3 py-1 text-xs font-semibold text-white">{label}</span>{children}<p className="text-sm text-muted">Image or product screenshot placeholder</p></div></div>;

const LandingPage = () => (
  <div className="min-h-screen bg-primary text-primary">
    <NavBar />
    <main>
      <Hero sectionID="home" />
      <Feature sectionID="features" />

      <section id="how-it-works" className="border-y border-default bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24"><div className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">A simple path forward</p><h2 className="mt-3 text-primary">How GitHero Works</h2></div><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{steps.map(([Icon, title, text], index) => <article key={title} className="rounded-xl border border-default bg-primary p-5"><span className="text-sm font-semibold text-accent">0{index + 1}</span><Icon className="mt-5 text-accent" size={25} /><h3 className="mt-4 text-xl text-primary">{title}</h3><p className="mt-2 text-base text-muted">{text}</p></article>)}</div></div>
      </section>

      <section id="modules" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Start where you are</p><h2 className="mt-3 text-primary">Featured learning modules</h2></div><Link to="/modules" className="font-semibold text-accent hover:underline focus-visible:outline-2">View all modules</Link></div><div className="mt-10 grid gap-5 md:grid-cols-3">{modules.map(([title, description, level]) => <article key={title} className="rounded-xl border border-default bg-surface p-6"><span className="text-sm font-semibold text-accent">{level}</span><h3 className="mt-4 text-xl text-primary">{title}</h3><p className="mt-3 text-base text-muted">{description}</p><Link to="/modules" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline">Explore module <ArrowRight size={16} /></Link></article>)}</div></section>

      <section className="border-y border-default bg-surface"><div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:items-center lg:py-24"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Practice makes progress</p><h2 className="mt-3 text-primary">Try Git commands before using them in a project</h2><p className="mt-5 text-base text-muted">Command practice breaks a workflow into clear steps, so you can build muscle memory without worrying about making a mistake.</p><Link to="/references" className="mt-7 inline-flex items-center gap-2 font-semibold text-accent hover:underline">Explore quick references <ArrowRight size={16} /></Link></div><Preview label="Command Practice Preview"><div className="rounded-lg border border-default bg-primary p-4 font-mono text-sm"><p className="text-muted">$ git status</p><p className="mt-3 text-accent">On branch main</p><p className="text-muted">working tree clean</p></div></Preview></div></section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:items-center lg:py-24"><Preview label="Dashboard Preview"><div className="grid grid-cols-3 gap-3"><div className="rounded-lg bg-primary p-3"><p className="text-xs text-muted">Modules</p><p className="mt-1 text-2xl font-bold text-accent">06</p></div><div className="rounded-lg bg-primary p-3"><p className="text-xs text-muted">Lessons</p><p className="mt-1 text-2xl font-bold text-accent">18</p></div><div className="rounded-lg bg-primary p-3"><p className="text-xs text-muted">Progress</p><p className="mt-1 text-2xl font-bold text-accent">72%</p></div></div></Preview><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Stay motivated</p><h2 className="mt-3 text-primary">See your learning progress at a glance</h2><p className="mt-5 text-base text-muted">A clear dashboard shows the lessons you have completed and helps you pick up exactly where you left off.</p><Link to="/signup"><Button bcolor="primary" className="mt-7">Create your learning plan</Button></Link></div></section>

      <section id="about" className="border-y border-default bg-surface"><div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24"><div className="text-center"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Why GitHero?</p><h2 className="mt-3 text-primary">A calmer way to learn a powerful tool</h2></div><div className="mt-10 grid gap-5 md:grid-cols-3">{[[CheckCircle2, "Clear explanations", "Plain language and practical examples, without unnecessary jargon."], [Trophy, "Small wins", "Focused lessons make it easy to build confidence one step at a time."], [Code2, "Useful skills", "Learn workflows you can use in class, personal projects, and teams."]].map(([Icon, title, text]) => <div key={title} className="rounded-xl border border-default bg-primary p-6"><Icon className="text-accent" /><h3 className="mt-4 text-xl text-primary">{title}</h3><p className="mt-3 text-base text-muted">{text}</p></div>)}</div></div></section>

      <section className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-8 lg:py-24"><div className="rounded-2xl border border-default bg-surface px-6 py-12 sm:px-12"><h2 className="text-primary">Ready to Become a Git Hero?</h2><p className="mx-auto mt-4 max-w-2xl text-base text-muted">Start with the fundamentals and build the confidence to work with Git every day.</p><Link to="/signup" className="mt-8 inline-block"><Button bcolor="primary">Get Started <ArrowRight className="ml-2" size={17} /></Button></Link></div></section>
    </main>
    <footer className="border-t border-default bg-surface"><div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:px-8 md:grid-cols-3"><div><p className="text-xl font-bold text-primary">GitHero</p><p className="mt-3 text-sm text-muted">Practical Git learning for confident beginners.</p></div><div><p className="font-semibold text-primary">Quick links</p><div className="mt-3 grid gap-2 text-sm"><a href="#features" className="text-muted hover:text-primary">Features</a><a href="#how-it-works" className="text-muted hover:text-primary">How it works</a><Link to="/modules" className="text-muted hover:text-primary">Modules</Link></div></div><div><p className="font-semibold text-primary">Support</p><div className="mt-3 grid gap-2 text-sm"><a href="https://github.com" className="text-muted hover:text-primary">GitHub</a>{/* TODO: replace placeholders when support and legal routes exist. */}<a href="#support" className="text-muted hover:text-primary">Support</a><a href="#privacy" className="text-muted hover:text-primary">Privacy</a><a href="#terms" className="text-muted hover:text-primary">Terms</a></div></div></div><div className="border-t border-default px-5 py-5 text-center text-sm text-muted">© {new Date().getFullYear()} GitHero. All rights reserved.</div></footer>
  </div>
);

export default LandingPage;
