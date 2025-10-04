import { notFound } from "next/navigation";

interface MaintainerDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: MaintainerDetailPageProps) {
  const { id } = await params;
  // In production, fetch maintainer data here for OG metadata
  return {
    title: `Maintainer Profile | ${id}`,
    description:
      "View detailed maintainer activity, sentiment analysis, and contribution CV",
  };
}

export default async function MaintainerDetailPage({
  params,
}: MaintainerDetailPageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-4">Maintainer Profile</h1>
        <p className="text-muted-foreground">Maintainer ID: {id}</p>
      </div>
    </div>
  );
}
