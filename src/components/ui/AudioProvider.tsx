'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

type AudioContextType = {
  isPlaying: boolean;
  toggleAudio: () => void;
  playHover: () => void;
  playClick: () => void;
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

// Short "Pop" sound for hover
const HOVER_SOUND = 'data:audio/wav;base64,UklGRl9vT1dNXAMAAAB4AAAAAGVuY2RXZTAwMS4wMC4wMKQAAABQAQAAAQAAAAADAAEA'; // Placeholder - Real implementations use actual files

// Short "Click" sound
const CLICK_SOUND = 'data:audio/wav;base64,UklGRl9vT1dNXAMAAAB4AAAAAGVuY2RXZTAwMS4wMC4wMKQAAABQAQAAAQAAAAADAAEA'; // Placeholder

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const hoverAudio = useRef<HTMLAudioElement | null>(null);
  const clickAudio = useRef<HTMLAudioElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Create audio objects
    // Note: In a real app, replace src with actual file paths like '/sounds/hover.mp3'
    // For this demo, we use a silent placeholder to prevent 404s,
    // but the logic assumes valid files.
    hoverAudio.current = new Audio(HOVER_SOUND);
    clickAudio.current = new Audio(CLICK_SOUND);

    hoverAudio.current.volume = 0.2;
    clickAudio.current.volume = 0.4;
  }, []);

  const toggleAudio = () => setIsPlaying(!isPlaying);

  const playHover = () => {
    if (isPlaying && hoverAudio.current) {
      hoverAudio.current.currentTime = 0;
      // hoverAudio.current.play().catch(() => {}); // Commented out to prevent errors with placeholder
    }
  };

  const playClick = () => {
    if (isPlaying && clickAudio.current) {
      clickAudio.current.currentTime = 0;
      // clickAudio.current.play().catch(() => {});
    }
  };

  // Add event listeners to interactive elements
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button') || target.classList.contains('interactive')) {
        playHover();
      }
    };

    const handleClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest('a') || target.closest('button')) {
          playClick();
        }
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('click', handleClick);
    };
  }, [pathname, isPlaying]);

  return (
    <AudioContext.Provider value={{ isPlaying, toggleAudio, playHover, playClick }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}