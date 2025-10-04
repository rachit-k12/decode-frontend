import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let browser;

  try {
    const { url, filename = "dashboard" } = await request.json();

    console.log("Starting PDF generation for:", url);

    // Dynamically import puppeteer to avoid bundling issues
    const puppeteer = await import("puppeteer");

    // Launch browser with optimized settings
    browser = await puppeteer.default.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--disable-gpu",
        "--window-size=1920,1080",
      ],
    });

    const page = await browser.newPage();

    // Set desktop viewport for proper rendering
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
    });

    // Emulate media type for print
    await page.emulateMediaType("screen");

    console.log("Navigating to:", url);

    // Navigate to the page with longer timeout
    await page.goto(url, {
      waitUntil: ["networkidle0", "domcontentloaded"],
      timeout: 60000,
    });

    console.log("Page loaded, waiting for charts...");

    // Wait for charts to be present
    try {
      await page.waitForSelector("svg", { timeout: 15000 });
      console.log("Charts found");
    } catch (e) {
      console.log("No SVG elements found, continuing...");
    }

    // Wait for ResponsiveContainer to render charts properly
    await page
      .waitForFunction(
        () => {
          const svgs = document.querySelectorAll("svg");
          return (
            svgs.length > 0 &&
            Array.from(svgs).every((svg) => {
              const rect = svg.getBoundingClientRect();
              return rect.width > 100 && rect.height > 100;
            })
          );
        },
        { timeout: 15000 }
      )
      .catch(() => {
        console.log("Charts may not be fully sized, continuing...");
      });

    // Scroll through the page to trigger lazy loading
    console.log("Scrolling through page...");
    await page.evaluate(async () => {
      const distance = 100;
      const delay = 100;

      while (
        document.scrollingElement!.scrollTop + window.innerHeight <
        document.scrollingElement!.scrollHeight
      ) {
        document.scrollingElement!.scrollBy(0, distance);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      // Scroll back to top
      document.scrollingElement!.scrollTo(0, 0);
    });

    // Additional wait for animations and final rendering
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Preparing page for PDF export...");

    // Hide/modify elements for cleaner PDF and get main content
    const contentSelector = await page.evaluate(() => {
      // Hide sidebar
      const sidebar =
        document.querySelector('[class*="sidebar"]') ||
        document.querySelector("aside") ||
        document.querySelector('nav[class*="side"]');
      if (sidebar) {
        (sidebar as HTMLElement).style.display = "none";
      }

      // Hide header/top bar (keep page title though)
      const headers = document.querySelectorAll("header");
      headers.forEach((header) => {
        const isMainHeader = header.querySelector("h1");
        if (!isMainHeader) {
          (header as HTMLElement).style.display = "none";
        }
      });

      // Hide all buttons
      document.querySelectorAll("button").forEach((btn) => {
        (btn as HTMLElement).style.display = "none";
      });

      // Hide navigation elements
      document.querySelectorAll("nav").forEach((nav) => {
        (nav as HTMLElement).style.display = "none";
      });

      // Adjust main content to full width
      const mainContent = document.querySelector("main");
      if (mainContent) {
        (mainContent as HTMLElement).style.marginLeft = "0";
        (mainContent as HTMLElement).style.paddingLeft = "20px";
        (mainContent as HTMLElement).style.paddingRight = "20px";
        (mainContent as HTMLElement).style.width = "100%";
        (mainContent as HTMLElement).style.maxWidth = "100%";
      }

      // Return the main content selector
      return mainContent ? "main" : "body";
    });

    console.log("Generating PDF...");

    // Get the height of the main content for proper PDF pagination
    const contentHeight = await page.evaluate(() => {
      const main = document.querySelector("main");
      return main ? main.scrollHeight : document.body.scrollHeight;
    });

    console.log(`Content height: ${contentHeight}px`);

    // Generate PDF with optimized settings
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "15mm",
        right: "15mm",
        bottom: "15mm",
        left: "15mm",
      },
      preferCSSPageSize: false,
      displayHeaderFooter: false,
    });

    await browser.close();
    browser = null;

    console.log("PDF generated successfully, size:", pdf.length, "bytes");

    // Return PDF as response
    return new NextResponse(pdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}.pdf"`,
        "Cache-Control": "no-cache",
      },
    });
  } catch (error: any) {
    console.error("PDF generation error:", error);

    // Ensure browser is closed
    if (browser) {
      try {
        await browser.close();
      } catch (closeError) {
        console.error("Error closing browser:", closeError);
      }
    }

    return NextResponse.json(
      {
        error: "Failed to generate PDF",
        details: error?.message || "Unknown error",
        stack:
          process.env.NODE_ENV === "development" ? error?.stack : undefined,
      },
      { status: 500 }
    );
  }
}
