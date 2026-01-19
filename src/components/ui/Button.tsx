import { cn } from "@/lib/utils";
import Link from "next/link";

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Button({ href, children, className }: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center px-8 py-4 bg-black text-white text-sm uppercase tracking-wider rounded-full hover:bg-neutral-800 transition-colors duration-300";

  if (href) {
    return (
      <Link href={href} className={cn(baseClasses, className)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cn(baseClasses, className)}>
      {children}
    </button>
  );
}