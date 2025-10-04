import { Suspense } from "react";
import { notFound } from "next/navigation";
import { MilestoneDetail } from "@/components/milestones/MilestoneDetail";
import { DetailSkeleton } from "@/components/shared/DetailSkeleton";

interface MilestoneDetailPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: MilestoneDetailPageProps) {
  // In production, fetch milestone data for OG metadata
  return {
    title: `Milestone Celebration | ${params.id}`,
    description: "Celebrate this open source milestone achievement",
    openGraph: {
      title: "Milestone Achievement!",
      description: "Celebrating an open source milestone",
      type: "website",
    },
  };
}

export default function MilestoneDetailPage({
  params,
}: MilestoneDetailPageProps) {
  if (!params.id) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<DetailSkeleton />}>
        <MilestoneDetail milestoneId={params.id} />
      </Suspense>
    </div>
  );
}
