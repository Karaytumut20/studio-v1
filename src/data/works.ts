export type WorkItem = {
  id: string;
  title: string;
  category: string;
  client: string;
  year: string;
  description: string;
  coverImage: string;
  gallery: string[];
};

export const WORKS: WorkItem[] = [
  {
    id: 'project-alpha',
    title: 'Alpha Protocol',
    category: 'Fintech',
    client: 'Alpha Inc.',
    year: '2024',
    description: 'Redefining the future of digital asset management through immersive interfaces. We focused on creating a dashboard that feels alive, using WebGL data visualization and micro-interactions to guide the user.',
    coverImage: 'https://images.unsplash.com/photo-1614064641938-3bcee5297404?q=80&w=2000&auto=format&fit=crop',
    gallery: [
        'https://images.unsplash.com/photo-1639322537228-ad506d134842?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1639322537504-6427a16b0a28?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 'project-nebula',
    title: 'Nebula Studios',
    category: 'Architecture',
    client: 'Nebula Architects',
    year: '2023',
    description: 'A brutalist approach to modern architectural portfolios. The site reflects the raw materials used in their buildings—concrete, glass, and steel—translated into a digital layout.',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop',
    gallery: [
        'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 'project-vertex',
    title: 'Vertex Labs',
    category: 'AI Research',
    client: 'Vertex',
    year: '2024',
    description: 'Visualizing neural networks in real-time WebGL environments. The challenge was to make complex AI data accessible and beautiful to the general public.',
    coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop',
    gallery: [
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  {
    id: 'project-mono',
    title: 'Mono Type',
    category: 'Typography',
    client: 'Foundry',
    year: '2022',
    description: 'An exploration of kinetic typography and swiss design principles. We stripped away all color to focus purely on form and motion.',
    coverImage: 'https://images.unsplash.com/photo-1555449372-55536136d895?q=80&w=2000&auto=format&fit=crop',
    gallery: [
        'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format&fit=crop'
    ]
  }
];