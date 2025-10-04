"use client";

import { useState } from "react";
import { Download, Loader2, CheckCircle2, XCircle } from "lucide-react";

interface ExportButtonProps {
  pageName: string;
  className?: string;
}

export function ExportButton({ pageName, className }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleExport = async () => {
    setIsExporting(true);
    setExportStatus("idle");

    try {
      const currentUrl = window.location.href;
      console.log("Exporting:", currentUrl);

      const response = await fetch("/api/export-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: currentUrl,
          filename: pageName,
        }),
      });

      if (response.ok) {
        const blob = await response.blob();

        // Check if the blob is actually a PDF
        if (blob.size === 0) {
          throw new Error("Generated PDF is empty");
        }

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${pageName}-${new Date().toISOString().split("T")[0]}.pdf`;
        document.body.appendChild(a);
        a.click();

        // Clean up
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }, 100);

        setExportStatus("success");
        setTimeout(() => setExportStatus("idle"), 3000);
      } else {
        const errorData = await response
          .json()
          .catch(() => ({ error: "Unknown error" }));
        console.error("PDF generation failed:", errorData);
        setExportStatus("error");
        setTimeout(() => setExportStatus("idle"), 3000);
      }
    } catch (error) {
      console.error("Export error:", error);
      setExportStatus("error");
      setTimeout(() => setExportStatus("idle"), 3000);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className={`flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {isExporting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : exportStatus === "success" ? (
        <CheckCircle2 className="h-4 w-4 text-green-600" />
      ) : exportStatus === "error" ? (
        <XCircle className="h-4 w-4 text-red-600" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      {isExporting
        ? "Generating PDF..."
        : exportStatus === "success"
          ? "Downloaded!"
          : exportStatus === "error"
            ? "Failed - Retry"
            : "Export PDF"}
    </button>
  );
}
