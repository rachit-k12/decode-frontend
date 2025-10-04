import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/discover/ProjectDetail";
import { DetailSkeleton } from "@/components/shared/DetailSkeleton";

interface ProjectDetailPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  // In production, fetch project data for OG metadata
  return {
    title: `Project Details | ${params.id}`,
    description: "Detailed information about this open source project",
  };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  if (!params.id) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<DetailSkeleton />}>
        <ProjectDetail projectId={params.id} />
      </Suspense>
    </div>
  );
}
