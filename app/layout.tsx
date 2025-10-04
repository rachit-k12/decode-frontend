import { ScrollProgress } from "@/components/magicui/scroll-progress";
import { cn } from "@/lib/utils";
import ClientProviders from "@/providers/client-providers";
import { Metadata } from "next";
import React from "react";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "DKMC - Maintainer Dashboard",
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION! },
  description:
    "DKMC - Developer & Maintainer Dashboard that surfaces maintainer efforts including reviews, discussions, issue triage, PR comments, mentorship, docs, and CI fixes",
  keywords:
    "DKMC, developer dashboard, maintainer dashboard, GitHub analytics, open source, code reviews, issue triage, PR management, developer productivity",
  openGraph: {
    title: "DKMC - Maintainer Dashboard",
    description:
      "Surface and track maintainer efforts including reviews, discussions, issue triage, PR comments, mentorship, docs, and CI fixes",
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
