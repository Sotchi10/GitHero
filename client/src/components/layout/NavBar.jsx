import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import ThemeToggle from "../ui/ThemeToggle";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);
  const links = [["Home", "#home"], ["Features", "#features"], ["How it works", "#how-it-works"], ["Modules", "#modules"]];

  return (
    <nav className="sticky top-0 z-50 border-b border-default bg-primary/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link to="/" className="text-xl font-bold text-primary focus-visible:outline-2" onClick={closeMenu}>GitHero</Link>
        <div className="hidden items-center gap-6 md:flex"><div className="flex items-center gap-5">{links.map(([label, href]) => <a key={href} href={href} className="text-sm font-medium text-muted transition hover:text-primary focus-visible:outline-2">{label}</a>)}</div><ThemeToggle /><Link to="/login"><Button bcolor="nonoutline" className="px-4 py-2 text-primary">Log In</Button></Link><Link to="/signup"><Button bcolor="primary" className="px-4 py-2">Get Started</Button></Link></div>
        <div className="flex items-center gap-2 md:hidden"><ThemeToggle /><button type="button" onClick={() => setIsOpen((open) => !open)} className="rounded-lg border border-default p-2 text-primary hover:bg-surface-raised focus-visible:outline-2" aria-expanded={isOpen} aria-label="Toggle navigation menu">{isOpen ? <X size={20} /> : <Menu size={20} />}</button></div>
      </div>
      {isOpen && <div className="border-t border-default bg-primary px-5 py-4 md:hidden"><div className="mx-auto grid max-w-6xl gap-2">{links.map(([label, href]) => <a key={href} href={href} onClick={closeMenu} className="rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-surface-raised hover:text-primary">{label}</a>)}<div className="mt-2 flex gap-3"><Link to="/login" onClick={closeMenu}><Button bcolor="nonoutline" className="px-4 py-2 text-primary">Log In</Button></Link><Link to="/signup" onClick={closeMenu}><Button bcolor="primary" className="px-4 py-2">Get Started</Button></Link></div></div></div>}
    </nav>
  );
};

export default NavBar;
