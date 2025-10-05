import { ScrollProgress } from "@/components/magicui/scroll-progress";
import { cn } from "@/lib/utils";
import ClientProviders from "@/providers/client-providers";
import { Metadata } from "next";
import React from "react";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Foozi - Open Source Maintainer Dashboard",
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION! },
  description:
    "Foozi - Track your invisible labor as an open source maintainer. Monitor code reviews, issue triage, mentorship, community engagement, and prevent burnout.",
  keywords:
    "Foozi, open source, maintainer dashboard, GitHub analytics, code reviews, issue triage, PR management, developer productivity, burnout prevention, community health",
  openGraph: {
    title: "Foozi - Open Source Maintainer Dashboard",
    description:
      "Track invisible labor, monitor community health, and prevent burnout. The dashboard for open source maintainers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="light"
      suppressHydrationWarning
      style={{ colorScheme: "light" }}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                document.documentElement.classList.remove('dark');
                document.documentElement.classList.add('light');
                document.documentElement.style.colorScheme = 'light';
              })();
            `,
          }}
        />
      </head>
      <body className={cn("antialiased bg-white overflow-x-hidden")}>
        <ClientProviders>
          <ScrollProgress />
          <main>{children}</main>
          <Toaster position="top-right" offset={15} />
        </ClientProviders>
      </body>
    </html>
  );
}
