"use client";

import { useState } from "react";
import {
  Download,
  Loader2,
  CheckCircle2,
  XCircle,
  FileDown,
  Server,
} from "lucide-react";
import { EnhancedPDFExporter } from "@/utils/enhanced-pdf-export";

interface ExportButtonProps {
  pageName: string;
  className?: string;
  exportMode?: "server" | "client" | "both";
  sections?: string[]; // CSS selectors for sections to export
}

export function ExportButton({
  pageName,
  className,
  exportMode = "server",
  sections,
}: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [showOptions, setShowOptions] = useState(false);

  const handleServerExport = async () => {
    setIsExporting(true);
    setExportStatus("idle");

    try {
      const currentUrl = window.location.href;
      console.log("Server-side PDF export:", currentUrl);

      const response = await fetch("/api/export-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: currentUrl,
          filename: pageName,
          sections: sections, // Pass sections if provided
        }),
      });

      if (response.ok) {
        const blob = await response.blob();

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
      setShowOptions(false);
    }
  };

  const handleClientExport = async () => {
    setIsExporting(true);
    setExportStatus("idle");

    try {
      console.log("Client-side PDF export");

      const exporter = new EnhancedPDFExporter();

      // Determine what to export
      let success = false;

      if (sections && sections.length > 0) {
        // Export specific sections
        success = await exporter.exportMultipleSectionsToPDF({
          filename: pageName,
          orientation: "portrait",
          includeHeaders: true,
          sections: sections.map((selector) => ({
            selector,
            pageBreak: true,
          })),
        });
      } else {
        // Export the main content area
        success = await exporter.exportToPDF({
          selector: "main",
          filename: pageName,
          orientation: "portrait",
          includeHeaders: true,
          quality: 2,
        });
      }

      if (success) {
        setExportStatus("success");
        setTimeout(() => setExportStatus("idle"), 3000);
      } else {
        throw new Error("Client-side PDF generation failed");
      }
    } catch (error) {
      console.error("Client export error:", error);
      setExportStatus("error");
      setTimeout(() => setExportStatus("idle"), 3000);
    } finally {
      setIsExporting(false);
      setShowOptions(false);
    }
  };

  const handleFullPageExport = async () => {
    setIsExporting(true);
    setExportStatus("idle");

    try {
      console.log("Full page PDF export");

      const exporter = new EnhancedPDFExporter();
      const success = await exporter.exportFullPageToPDF({
        filename: `${pageName}-full`,
        orientation: "portrait",
        includeHeaders: true,
        quality: 2,
      });

      if (success) {
        setExportStatus("success");
        setTimeout(() => setExportStatus("idle"), 3000);
      } else {
        throw new Error("Full page PDF generation failed");
      }
    } catch (error) {
      console.error("Full page export error:", error);
      setExportStatus("error");
      setTimeout(() => setExportStatus("idle"), 3000);
    } finally {
      setIsExporting(false);
      setShowOptions(false);
    }
  };

  const handleExport = () => {
    if (exportMode === "both") {
      setShowOptions(!showOptions);
    } else if (exportMode === "client") {
      handleClientExport();
    } else {
      handleServerExport();
    }
  };

  return (
    <div className="relative">
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

      {/* Export Options Dropdown */}
      {showOptions && !isExporting && (
        <div className="absolute right-0 top-full mt-2 w-64 rounded-lg border border-gray-200 bg-white shadow-lg z-50">
          <div className="p-2">
            <button
              onClick={handleServerExport}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded hover:bg-gray-50 transition-colors"
            >
              <Server className="h-4 w-4" />
              <div className="text-left">
                <div className="font-medium">Server Export</div>
                <div className="text-xs text-gray-500">
                  High quality, full content
                </div>
              </div>
            </button>

            <button
              onClick={handleClientExport}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded hover:bg-gray-50 transition-colors"
            >
              <FileDown className="h-4 w-4" />
              <div className="text-left">
                <div className="font-medium">Quick Export</div>
                <div className="text-xs text-gray-500">Fast, client-side</div>
              </div>
            </button>

            <button
              onClick={handleFullPageExport}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded hover:bg-gray-50 transition-colors"
            >
              <Download className="h-4 w-4" />
              <div className="text-left">
                <div className="font-medium">Full Page Export</div>
                <div className="text-xs text-gray-500">
                  Entire page with scroll
                </div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
