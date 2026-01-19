import { WORKS } from "@/data/works";
import { notFound } from "next/navigation";
import ProjectHero from "@/components/work/ProjectHero";
import ProjectGallery from "@/components/work/ProjectGallery";
import NextProject from "@/components/work/NextProject";
import { Metadata } from "next";

// Static Generation for Performance
export async function generateStaticParams() {
  return WORKS.map((project) => ({
    id: project.id,
  }));
}

// Dynamic SEO Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = WORKS.find((p) => p.id === id);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} — Studio V1`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.coverImage],
    },
  };
}

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProjectDetail({ params }: Props) {
  const { id } = await params;

  const project = WORKS.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  // Find next project
  const currentIndex = WORKS.findIndex((p) => p.id === id);
  const nextProject = WORKS[(currentIndex + 1) % WORKS.length];

  return (
    <main>
      <ProjectHero project={project} />
      <ProjectGallery images={project.gallery} />
      <div className="py-20 px-page-padding grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-black/10">
         <div>
            <h3 className="uppercase text-sm tracking-widest opacity-50 mb-4">Challenge</h3>
            <p className="text-lg opacity-80 max-w-md">To create a unique digital identity that stands out in a saturated market, utilizing bleeding-edge web technologies while maintaining accessibility.</p>
         </div>
         <div>
            <h3 className="uppercase text-sm tracking-widest opacity-50 mb-4">Solution</h3>
            <p className="text-lg opacity-80 max-w-md">We built a bespoke WebGL rendering engine that allows for real-time manipulation of the visual data, wrapped in a minimalist UI system.</p>
         </div>
      </div>
      <NextProject project={nextProject} />
    </main>
  );
}