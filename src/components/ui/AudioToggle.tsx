'use client';

import { useAudio } from './AudioProvider';
import { cn } from '@/lib/utils';

export default function AudioToggle() {
  const { isPlaying, toggleAudio } = useAudio();

  return (
    <button
      onClick={toggleAudio}
      className="fixed bottom-10 right-10 z-[9000] mix-blend-difference text-white hidden md:flex flex-col items-center gap-2 group"
    >
      <div className={cn(
        "flex gap-[3px] items-end h-4",
        !isPlaying && "opacity-50"
      )}>
        <span className={cn("w-[2px] bg-white transition-all duration-300", isPlaying ? "h-4 animate-[bounce_1s_infinite]" : "h-1")} />
        <span className={cn("w-[2px] bg-white transition-all duration-300 delay-75", isPlaying ? "h-3 animate-[bounce_1.2s_infinite]" : "h-1")} />
        <span className={cn("w-[2px] bg-white transition-all duration-300 delay-150", isPlaying ? "h-2 animate-[bounce_0.8s_infinite]" : "h-1")} />
        <span className={cn("w-[2px] bg-white transition-all duration-300 delay-100", isPlaying ? "h-4 animate-[bounce_1.1s_infinite]" : "h-1")} />
      </div>
      <span className="text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity absolute -top-6">
        {isPlaying ? 'Sound On' : 'Mute'}
      </span>
    </button>
  );
}