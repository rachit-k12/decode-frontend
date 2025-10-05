import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface PDFExportOptions {
  elementId?: string;
  selector?: string;
  filename?: string;
  orientation?: "portrait" | "landscape";
  format?: string;
  quality?: number;
  pageBreakSelector?: string;
  includeHeaders?: boolean;
  includeFooters?: boolean;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

interface MultiPageOptions extends PDFExportOptions {
  sections: Array<{
    selector: string;
    title?: string;
    pageBreak?: boolean;
  }>;
}

/**
 * Enhanced HTML to PDF converter with full page capture
 */
export class EnhancedPDFExporter {
  private pdf: jsPDF | null = null;
  private currentPage = 1;
  private totalHeight = 0;

  /**
   * Initialize a new PDF document
   */
  private initializePDF(options: PDFExportOptions) {
    this.pdf = new jsPDF({
      orientation: options.orientation || "portrait",
      unit: "mm",
      format: options.format || "a4",
      compress: true,
    });

    this.currentPage = 1;
    this.totalHeight = 0;
  }

  /**
   * Capture element as canvas with full content
   */
  private async captureElement(
    element: HTMLElement,
    options: PDFExportOptions
  ): Promise<HTMLCanvasElement> {
    // Store original styles
    const originalStyles = {
      overflow: element.style.overflow,
      height: element.style.height,
      maxHeight: element.style.maxHeight,
    };

    try {
      // Temporarily expand element to show all content
      element.style.overflow = "visible";
      element.style.height = "auto";
      element.style.maxHeight = "none";

      // Wait for reflow
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Capture with html2canvas
      const canvas = await html2canvas(element, {
        scale: options.quality || 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        onclone: (clonedDoc) => {
          // Ensure all content is visible in clone
          const clonedElement = clonedDoc.getElementById(element.id);
          if (clonedElement) {
            clonedElement.style.overflow = "visible";
            clonedElement.style.height = "auto";
            clonedElement.style.maxHeight = "none";
          }

          // Ensure charts are visible
          clonedDoc.querySelectorAll("svg").forEach((svg) => {
            svg.setAttribute("style", "overflow: visible;");
          });

          // Hide buttons and interactive elements
          clonedDoc
            .querySelectorAll('button, [role="button"]')
            .forEach((btn) => {
              (btn as HTMLElement).style.display = "none";
            });
        },
      });

      return canvas;
    } finally {
      // Restore original styles
      element.style.overflow = originalStyles.overflow;
      element.style.height = originalStyles.height;
      element.style.maxHeight = originalStyles.maxHeight;
    }
  }

  /**
   * Add canvas to PDF with automatic pagination
   */
  private addCanvasToPDF(canvas: HTMLCanvasElement, options: PDFExportOptions) {
    if (!this.pdf) return;

    const margin = options.margin || {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10,
    };

    const pageWidth = this.pdf.internal.pageSize.getWidth();
    const pageHeight = this.pdf.internal.pageSize.getHeight();
    const contentWidth = pageWidth - margin.left - margin.right;
    const contentHeight = pageHeight - margin.top - margin.bottom;

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = contentWidth / imgWidth;
    const scaledHeight = imgHeight * ratio;

    // Convert canvas to image
    const imgData = canvas.toDataURL("image/jpeg", 0.95);

    // Handle pagination if content is taller than page
    if (scaledHeight > contentHeight) {
      const totalPages = Math.ceil(scaledHeight / contentHeight);

      for (let i = 0; i < totalPages; i++) {
        if (i > 0) {
          this.pdf.addPage();
        }

        const sourceY = (i * contentHeight) / ratio;
        const sourceHeight = Math.min(
          contentHeight / ratio,
          imgHeight - sourceY
        );

        // Create a temporary canvas for this page section
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = imgWidth;
        pageCanvas.height = sourceHeight;

        const ctx = pageCanvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(
            canvas,
            0,
            sourceY,
            imgWidth,
            sourceHeight,
            0,
            0,
            imgWidth,
            sourceHeight
          );

          const pageImgData = pageCanvas.toDataURL("image/jpeg", 0.95);

          this.pdf.addImage(
            pageImgData,
            "JPEG",
            margin.left,
            margin.top,
            contentWidth,
            sourceHeight * ratio
          );
        }
      }
    } else {
      // Fits on one page
      this.pdf.addImage(
        imgData,
        "JPEG",
        margin.left,
        margin.top,
        contentWidth,
        scaledHeight
      );
    }
  }

  /**
   * Export single element to PDF with full content
   */
  async exportToPDF(options: PDFExportOptions): Promise<boolean> {
    try {
      let element: HTMLElement | null = null;

      if (options.elementId) {
        element = document.getElementById(options.elementId);
      } else if (options.selector) {
        element = document.querySelector(options.selector);
      }

      if (!element) {
        console.error("Element not found for PDF export");
        return false;
      }

      // Initialize PDF
      this.initializePDF(options);

      // Add header if requested
      if (options.includeHeaders && this.pdf) {
        this.pdf.setFontSize(16);
        this.pdf.text(
          options.filename || "Export",
          this.pdf.internal.pageSize.getWidth() / 2,
          15,
          { align: "center" }
        );
      }

      // Capture element
      const canvas = await this.captureElement(element, options);

      // Add to PDF
      this.addCanvasToPDF(canvas, options);

      // Save PDF
      if (this.pdf) {
        this.pdf.save(`${options.filename || "export"}.pdf`);
      }

      return true;
    } catch (error) {
      console.error("Error generating PDF:", error);
      return false;
    }
  }

  /**
   * Export multiple sections to a single PDF
   */
  async exportMultipleSectionsToPDF(
    options: MultiPageOptions
  ): Promise<boolean> {
    try {
      // Initialize PDF
      this.initializePDF(options);

      for (const section of options.sections) {
        const element = document.querySelector(section.selector) as HTMLElement;

        if (!element) {
          console.warn(`Section ${section.selector} not found, skipping...`);
          continue;
        }

        // Add page break if requested (except for first section)
        if (section.pageBreak && this.currentPage > 1 && this.pdf) {
          this.pdf.addPage();
        }

        // Add section title if provided
        if (section.title && this.pdf) {
          this.pdf.setFontSize(14);
          this.pdf.text(section.title, 10, this.totalHeight + 20);
          this.totalHeight += 30;
        }

        // Capture and add section
        const canvas = await this.captureElement(element, options);
        this.addCanvasToPDF(canvas, options);

        this.currentPage++;
      }

      // Save PDF
      if (this.pdf) {
        this.pdf.save(`${options.filename || "export"}.pdf`);
      }

      return true;
    } catch (error) {
      console.error("Error generating multi-section PDF:", error);
      return false;
    }
  }

  /**
   * Export entire page with scroll capture
   */
  async exportFullPageToPDF(options: PDFExportOptions): Promise<boolean> {
    try {
      // Create a temporary container
      const tempContainer = document.createElement("div");
      tempContainer.style.position = "absolute";
      tempContainer.style.left = "-9999px";
      tempContainer.style.top = "0";
      tempContainer.style.width = `${document.body.scrollWidth}px`;
      tempContainer.style.height = "auto";

      // Clone the entire body
      const bodyClone = document.body.cloneNode(true) as HTMLElement;

      // Remove unwanted elements from clone
      bodyClone
        .querySelectorAll("script, style, nav, aside, .sidebar")
        .forEach((el) => {
          el.remove();
        });

      // Expand all collapsed content
      bodyClone
        .querySelectorAll('[class*="collapse"], [class*="accordion"]')
        .forEach((el) => {
          (el as HTMLElement).style.height = "auto";
          (el as HTMLElement).style.maxHeight = "none";
          (el as HTMLElement).style.overflow = "visible";
        });

      tempContainer.appendChild(bodyClone);
      document.body.appendChild(tempContainer);

      try {
        // Wait for content to render
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Capture the full page
        const canvas = await html2canvas(tempContainer, {
          scale: options.quality || 2,
          useCORS: true,
          logging: false,
          backgroundColor: "#ffffff",
          height: tempContainer.scrollHeight,
          windowHeight: tempContainer.scrollHeight,
        });

        // Initialize PDF
        this.initializePDF(options);

        // Add canvas to PDF with pagination
        this.addCanvasToPDF(canvas, options);

        // Save PDF
        if (this.pdf) {
          this.pdf.save(`${options.filename || "fullpage-export"}.pdf`);
        }

        return true;
      } finally {
        // Clean up
        document.body.removeChild(tempContainer);
      }
    } catch (error) {
      console.error("Error generating full page PDF:", error);
      return false;
    }
  }
}

/**
 * Simple export function for backward compatibility
 */
export async function exportToPDF(
  elementId: string,
  filename: string = "export"
): Promise<boolean> {
  const exporter = new EnhancedPDFExporter();
  return exporter.exportToPDF({ elementId, filename });
}

/**
 * Export dashboard tabs to separate PDFs
 */
export async function exportDashboardTabs(): Promise<void> {
  const exporter = new EnhancedPDFExporter();

  // Define dashboard sections
  const sections = [
    { selector: ".dashboard-overview", title: "Overview" },
    { selector: ".activity-chart", title: "Activity Charts" },
    { selector: ".sentiment-analysis", title: "Sentiment Analysis" },
    { selector: ".burnout-metrics", title: "Burnout Metrics" },
    { selector: ".invisible-labor", title: "Invisible Labor" },
  ];

  // Export each section
  for (const section of sections) {
    const element = document.querySelector(section.selector);
    if (element) {
      await exporter.exportToPDF({
        selector: section.selector,
        filename: section.title.toLowerCase().replace(/\s+/g, "-"),
        includeHeaders: true,
        orientation: "portrait",
      });

      // Small delay between exports
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}

/**
 * Export all dashboard content to a single PDF
 */
export async function exportCompleteDashboard(): Promise<boolean> {
  const exporter = new EnhancedPDFExporter();

  return exporter.exportMultipleSectionsToPDF({
    filename: "complete-dashboard",
    orientation: "portrait",
    includeHeaders: true,
    sections: [
      {
        selector: "main > div:nth-child(1)",
        title: "Dashboard Header",
        pageBreak: false,
      },
      { selector: ".metric-cards", title: "Key Metrics", pageBreak: true },
      {
        selector: ".charts-section",
        title: "Charts & Analytics",
        pageBreak: true,
      },
      {
        selector: ".activity-section",
        title: "Activity Timeline",
        pageBreak: true,
      },
    ],
  });
}
