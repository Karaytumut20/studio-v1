export type WorkItem = {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string; // In a real app, this would be an object with width/height/alt
  description: string;
};

export const WORKS: WorkItem[] = [
  {
    id: 'project-alpha',
    title: 'Alpha Protocol',
    category: 'Fintech',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1614064641938-3bcee5297404?q=80&w=2670&auto=format&fit=crop',
    description: 'Redefining the future of digital asset management through immersive interfaces.',
  },
  {
    id: 'project-nebula',
    title: 'Nebula Studios',
    category: 'Architecture',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop',
    description: 'A brutalist approach to modern architectural portfolios.',
  },
  {
    id: 'project-vertex',
    title: 'Vertex Labs',
    category: 'AI Research',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2665&auto=format&fit=crop',
    description: 'Visualizing neural networks in real-time WebGL environments.',
  },
  {
    id: 'project-mono',
    title: 'Mono Type',
    category: 'Typography',
    year: '2022',
    image: 'https://images.unsplash.com/photo-1555449372-55536136d895?q=80&w=2670&auto=format&fit=crop',
    description: 'An exploration of kinetic typography and swiss design principles.',
  }
];