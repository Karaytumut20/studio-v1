import Link from 'next/link';
import Button from './ui/Button';

export default function Footer() {
  return (
    <footer className="w-full pt-32 pb-10 px-page-padding bg-black text-white relative z-10">

      <div className="flex flex-col md:flex-row justify-between items-start mb-32">
        <div className="mb-10 md:mb-0">
          <h2 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter mb-8 leading-none">
            Let's work<br />together
          </h2>
          <Button href="/contact" className="bg-white text-black hover:bg-neutral-200 border-none">
            Start a project
          </Button>
        </div>

        <div className="flex gap-20 text-sm uppercase tracking-widest opacity-60">
           <div className="flex flex-col gap-4">
              <span className="opacity-50 mb-2 block">Socials</span>
              <a href="#" className="hover:text-white hover:opacity-100 transition-colors">Instagram</a>
              <a href="#" className="hover:text-white hover:opacity-100 transition-colors">Twitter</a>
              <a href="#" className="hover:text-white hover:opacity-100 transition-colors">LinkedIn</a>
           </div>
           <div className="flex flex-col gap-4">
              <span className="opacity-50 mb-2 block">Sitemap</span>
              <Link href="/work" className="hover:text-white hover:opacity-100 transition-colors">Work</Link>
              <Link href="/about" className="hover:text-white hover:opacity-100 transition-colors">About</Link>
              <Link href="/contact" className="hover:text-white hover:opacity-100 transition-colors">Contact</Link>
           </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-end">
        <div className="text-[14vw] font-bold leading-none select-none pointer-events-none opacity-20">
           STUDIO
        </div>
        <div className="flex gap-10 text-xs opacity-40 mt-4 md:mt-0">
           <span>© 2024 Studio Inc.</span>
           <span>Privacy Policy</span>
        </div>
      </div>
    </footer>
  );
}