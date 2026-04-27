import Link from "next/link";
import { Button } from "@/components/ui/button";

const LINKS = ["Services", "About Us", "Projects", "Team", "Contacts"] as const;

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-8 lg:px-16 py-5">
      <nav className="flex items-center justify-between">
        <Link href="#" className="text-foreground text-xl font-semibold tracking-tight">
          SENTINEL
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest"
            >
              {link}
            </a>
          ))}
        </div>

        <Button
          variant="navCta"
          size="lg"
          className="hidden md:inline-flex rounded-lg uppercase text-xs tracking-widest px-6"
        >
          Get Quote
        </Button>
      </nav>
    </header>
  );
}
