import { NextRequest, NextResponse } from "next/server";
import { PuppeteerPDFGenerator } from "@/utils/puppeteer-pdf-generator";

export async function POST(request: NextRequest) {
  const generator = new PuppeteerPDFGenerator();

  try {
    const {
      url,
      filename = "dashboard",
      sections,
      tabs,
    } = await request.json();

    console.log("Starting PDF generation for:", url);

    // Initialize the generator
    await generator.initialize();

    let pdf: Buffer;

    // Handle different export scenarios
    if (tabs && Array.isArray(tabs)) {
      // Multiple tabs export - generates multiple PDFs
      console.log("Generating PDFs for multiple tabs");
      const results = await generator.generateMultiTabPDF(tabs, url);

      // For now, return the first PDF (you could zip them all together)
      if (results.length > 0) {
        pdf = results[0].pdf;
      } else {
        throw new Error("No PDFs generated");
      }
    } else if (sections && Array.isArray(sections)) {
      // Combined sections export - single PDF with specific sections
      console.log("Generating combined PDF with sections:", sections);
      pdf = await generator.generateCombinedPDF(url, sections, filename);
    } else {
      // Single page full export
      console.log("Generating full page PDF");
      pdf = await generator.generatePDF({
        url,
        filename,
        fullPage: true,
        waitForSelectors: [
          "svg", // Wait for charts
          ".recharts-wrapper", // Wait for Recharts
          ".metric-card", // Wait for metric cards
          ".chart-container", // Wait for chart containers
        ],
        customCSS: `
          /* Custom print styles */
          @media print {
            /* Ensure dark mode elements are visible in print */
            .dark * {
              color: black !important;
              background-color: white !important;
            }
            
            /* Ensure charts are properly sized */
            .recharts-wrapper {
              width: 100% !important;
            }
            
            /* Hide interactive elements */
            .hover\\:bg-gray-50, button[role="button"] {
              display: none !important;
            }
          }
        `,
      });
    }

    console.log("PDF generated successfully, size:", pdf.length, "bytes");

    // Return PDF as response
    return new NextResponse(pdf as any, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}.pdf"`,
        "Cache-Control": "no-cache",
      },
    });
  } catch (error: any) {
    console.error("PDF generation error:", error);

    return NextResponse.json(
      {
        error: "Failed to generate PDF",
        details: error?.message || "Unknown error",
        stack:
          process.env.NODE_ENV === "development" ? error?.stack : undefined,
      },
      { status: 500 }
    );
  } finally {
    // Always cleanup resources
    await generator.cleanup();
  }
}

// GET endpoint for testing
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const testUrl = searchParams.get("url");

  if (!testUrl) {
    return NextResponse.json(
      {
        error: "URL parameter is required",
        example: "/api/export-pdf?url=http://localhost:3000/dashboard",
      },
      { status: 400 }
    );
  }

  const generator = new PuppeteerPDFGenerator();

  try {
    await generator.initialize();

    const pdf = await generator.generatePDF({
      url: testUrl,
      filename: "test-export",
      fullPage: true,
    });

    return new NextResponse(pdf as any, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="test-export.pdf"',
      },
    });
  } catch (error: any) {
    console.error("Test PDF generation error:", error);

    return NextResponse.json(
      {
        error: "Failed to generate test PDF",
        details: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  } finally {
    await generator.cleanup();
  }
}
