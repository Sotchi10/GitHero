import { BookOpen, Code2, LineChart } from "lucide-react";

const features = [
  { icon: BookOpen, title: "Learn with context", text: "Understand what each command changes before you run it." },
  { icon: Code2, title: "Practise safely", text: "Build confidence through guided Git workflows and examples." },
  { icon: LineChart, title: "See your progress", text: "Track completed lessons and keep your next step clear." },
];

const Feature = ({ sectionID }) => (
  <section id={sectionID} className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
    <div className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Built for beginners</p><h2 className="mt-3 text-primary">Everything you need to make Git click</h2></div>
    <div className="mt-10 grid gap-5 md:grid-cols-3">
      {features.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-xl border border-default bg-surface p-6 transition hover:-translate-y-1 hover:bg-surface-raised"><Icon className="text-accent" size={25} /><h3 className="mt-5 text-xl text-primary">{title}</h3><p className="mt-3 text-base text-muted">{text}</p></article>)}
    </div>
  </section>
);

export default Feature;
