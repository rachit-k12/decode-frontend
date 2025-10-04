import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ContributionCV } from "@/components/maintainer/ContributionCV";
import { CVSkeleton } from "@/components/shared/CVSkeleton";

interface CVPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: CVPageProps) {
  // In production, fetch maintainer data for rich OG metadata
  return {
    title: `Contribution CV | ${params.id}`,
    description:
      "Public contribution CV showcasing open source activity and impact",
    openGraph: {
      title: `${params.id}'s Contribution CV`,
      description: "View my open source contributions and impact",
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: `${params.id}'s Contribution CV`,
      description: "View my open source contributions and impact",
    },
  };
}

export default function CVPage({ params }: CVPageProps) {
  if (!params.id) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<CVSkeleton />}>
        <ContributionCV maintainerId={params.id} />
      </Suspense>
    </div>
  );
}
