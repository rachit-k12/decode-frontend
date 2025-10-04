import { Suspense } from "react";
import { notFound } from "next/navigation";
import { MaintainerProfile } from "@/components/maintainer/MaintainerProfile";
import { ProfileSkeleton } from "@/components/shared/ProfileSkeleton";

interface MaintainerDetailPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: MaintainerDetailPageProps) {
  // In production, fetch maintainer data here for OG metadata
  return {
    title: `Maintainer Profile | ${params.id}`,
    description:
      "View detailed maintainer activity, sentiment analysis, and contribution CV",
  };
}

export default function MaintainerDetailPage({
  params,
}: MaintainerDetailPageProps) {
  if (!params.id) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<ProfileSkeleton />}>
        <MaintainerProfile maintainerId={params.id} />
      </Suspense>
    </div>
  );
}
