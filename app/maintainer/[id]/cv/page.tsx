import { notFound } from "next/navigation";

interface CVPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: CVPageProps) {
  const { id } = await params;
  // In production, fetch maintainer data for rich OG metadata
  return {
    title: `Contribution CV | ${id}`,
    description:
      "Public contribution CV showcasing open source activity and impact",
    openGraph: {
      title: `${id}'s Contribution CV`,
      description: "View my open source contributions and impact",
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: `${id}'s Contribution CV`,
      description: "View my open source contributions and impact",
    },
  };
}

export default async function CVPage({ params }: CVPageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-4">Contribution CV</h1>
        <p className="text-muted-foreground">Maintainer ID: {id}</p>
      </div>
    </div>
  );
}
