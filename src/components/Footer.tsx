export default function Footer() {
  return (
    <footer className="w-full py-20 px-page-padding bg-black text-white mt-20">
      <div className="border-t border-white/20 pt-10 flex flex-col md:flex-row justify-between items-start">
        <div>
          <h2 className="text-h2 uppercase mb-4">Let's Talk</h2>
          <a href="mailto:hello@studio.com" className="text-xl underline underline-offset-4 hover:no-underline">hello@studio.com</a>
        </div>
        <div className="flex gap-8 mt-10 md:mt-0 text-sm uppercase text-white/60">
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
        </div>
      </div>
      <div className="mt-20 text-[10vw] font-bold leading-none text-center opacity-10 uppercase select-none">
        Studio©
      </div>
    </footer>
  );
}