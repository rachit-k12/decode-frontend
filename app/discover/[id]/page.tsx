import { notFound } from "next/navigation";

interface ProjectDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  // In production, fetch project data for OG metadata
  return {
    title: `Project Details | ${id}`,
    description: "Detailed information about this open source project",
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-4">Project Details</h1>
        <p className="text-muted-foreground">Project ID: {id}</p>
      </div>
    </div>
  );
}
