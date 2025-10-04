import { notFound } from "next/navigation";

interface MilestoneDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: MilestoneDetailPageProps) {
  const { id } = await params;
  // In production, fetch milestone data for OG metadata
  return {
    title: `Milestone Celebration | ${id}`,
    description: "Celebrate this open source milestone achievement",
    openGraph: {
      title: "Milestone Achievement!",
      description: "Celebrating an open source milestone",
      type: "website",
    },
  };
}

export default async function MilestoneDetailPage({
  params,
}: MilestoneDetailPageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-4">Milestone Celebration</h1>
        <p className="text-muted-foreground">Milestone ID: {id}</p>
      </div>
    </div>
  );
}
