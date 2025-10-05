import puppeteer, { Browser, Page, PDFOptions } from "puppeteer";

interface PDFGeneratorOptions {
  url: string;
  filename?: string;
  waitForSelectors?: string[];
  customCSS?: string;
  pageRanges?: string;
  fullPage?: boolean;
  timeout?: number;
}

interface PageSection {
  selector: string;
  name: string;
  waitForSelector?: string;
}

export class PuppeteerPDFGenerator {
  private browser: Browser | null = null;
  private page: Page | null = null;

  /**
   * Initialize the Puppeteer browser instance
   */
  async initialize() {
    this.browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--disable-gpu",
        "--window-size=1920,1080",
        "--force-color-profile=srgb",
      ],
    });

    this.page = await this.browser.newPage();

    // Set viewport for proper rendering
    await this.page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 2, // Higher quality rendering
    });
  }

  /**
   * Wait for all charts and graphs to be fully rendered
   */
  private async waitForChartsToRender(page: Page) {
    console.log("Waiting for charts to render...");

    // Wait for SVG elements (charts)
    try {
      await page.waitForSelector("svg", {
        timeout: 10000,
        visible: true,
      });

      // Wait for Recharts containers to be properly sized
      await page.waitForFunction(
        () => {
          const svgs = document.querySelectorAll("svg");
          const rechartContainers =
            document.querySelectorAll(".recharts-wrapper");

          // Check if SVGs have proper dimensions
          const svgsReady = Array.from(svgs).every((svg) => {
            const rect = svg.getBoundingClientRect();
            return rect.width > 50 && rect.height > 50;
          });

          // Check if Recharts containers are rendered
          const rechartsReady =
            rechartContainers.length === 0 ||
            Array.from(rechartContainers).every((container) => {
              const rect = container.getBoundingClientRect();
              return rect.width > 0 && rect.height > 0;
            });

          return svgsReady && rechartsReady;
        },
        { timeout: 15000 }
      );

      console.log("Charts rendered successfully");
    } catch (error) {
      console.log("Charts may not be fully rendered, continuing...");
    }

    // Wait for Canvas elements (if any)
    try {
      const hasCanvas = await page.evaluate(() => {
        return document.querySelectorAll("canvas").length > 0;
      });

      if (hasCanvas) {
        await page.waitForFunction(
          () => {
            const canvases = document.querySelectorAll("canvas");
            return Array.from(canvases).every((canvas) => {
              const ctx = canvas.getContext("2d");
              if (!ctx) return false;
              const imageData = ctx.getImageData(
                0,
                0,
                canvas.width,
                canvas.height
              );
              return imageData.data.some((pixel) => pixel !== 0);
            });
          },
          { timeout: 5000 }
        );
      }
    } catch (error) {
      console.log("Canvas elements check completed");
    }
  }

  /**
   * Scroll through the entire page to trigger lazy loading
   */
  private async scrollThroughPage(page: Page) {
    console.log("Scrolling through page to load all content...");

    await page.evaluate(async () => {
      const distance = 100;
      const delay = 100;
      const maxScrolls = 100; // Prevent infinite scrolling
      let scrollCount = 0;

      // Get initial height
      let lastHeight = document.documentElement.scrollHeight;

      while (scrollCount < maxScrolls) {
        // Scroll down
        window.scrollBy(0, distance);
        await new Promise((resolve) => setTimeout(resolve, delay));

        // Check if we've reached the bottom
        if (
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight
        ) {
          // Wait a bit for dynamic content to load
          await new Promise((resolve) => setTimeout(resolve, 500));

          // Check if height changed
          const currentHeight = document.documentElement.scrollHeight;
          if (currentHeight === lastHeight) {
            break; // No new content loaded
          }
          lastHeight = currentHeight;
        }

        scrollCount++;
      }

      // Scroll back to top
      window.scrollTo(0, 0);
      await new Promise((resolve) => setTimeout(resolve, 500));
    });
  }

  /**
   * Extract and prepare content for PDF generation
   */
  private async preparePageForPDF(page: Page) {
    console.log("Preparing page for PDF export...");

    await page.evaluate(() => {
      // Add print-specific styles
      const style = document.createElement("style");
      style.innerHTML = `
        @media print {
          /* Reset and visibility */
          * {
            overflow: visible !important;
            max-height: none !important;
          }
          
          /* Hide navigation and interactive elements */
          nav, 
          aside, 
          .sidebar, 
          [class*="sidebar"],
          [class*="Sidebar"],
          button, 
          .export-button,
          [role="button"] {
            display: none !important;
          }
          
          header:not(:has(h1)) {
            display: none !important;
          }
          
          /* Full width for main content */
          main {
            margin: 0 !important;
            padding: 15px !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          
          /* Page break rules - keep components together */
          .grid > div,
          [class*="MetricCard"],
          [class*="ChartContainer"],
          .recharts-wrapper,
          .recharts-surface {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          
          /* Force page breaks before major chart sections */
          [class*="ChartContainer"] {
            page-break-before: auto !important;
            margin-top: 30px !important;
            margin-bottom: 30px !important;
          }
          
          /* Add page breaks after every 2 metric cards */
          .grid > div:nth-child(2n) {
            page-break-after: auto !important;
          }
          
          /* Headings */
          h1, h2 {
            page-break-after: avoid !important;
            break-after: avoid !important;
            margin-top: 0 !important;
            padding-top: 5px !important;
          }
          
          /* Grid layouts */
          .grid {
            display: grid !important;
            page-break-inside: auto !important;
            gap: 15px !important;
          }
          
          /* Charts need proper sizing */
          .recharts-wrapper {
            width: 100% !important;
            min-height: 350px !important;
            page-break-inside: avoid !important;
          }
          
          svg {
            max-width: 100% !important;
            height: auto !important;
            page-break-inside: avoid !important;
          }
          
          canvas {
            page-break-inside: avoid !important;
            max-width: 100% !important;
          }
          
          /* Dark mode adjustments */
          body,
          [class*="dark"] {
            background: white !important;
            color: black !important;
          }
          
          /* Card styling for print */
          [class*="card"],
          [class*="Card"],
          .border {
            background: white !important;
            border: 1px solid #d1d5db !important;
            padding: 15px !important;
          }
          
          /* Text visibility */
          p, span, div, label {
            color: #1f2937 !important;
          }
          
          /* Muted text */
          [class*="muted"],
          .text-muted-foreground {
            color: #6b7280 !important;
          }
          
          /* Prevent widows and orphans */
          p {
            widows: 3 !important;
            orphans: 3 !important;
          }
        }
      `;
      document.head.appendChild(style);

      // Add section headers before major components
      const addSectionHeaders = () => {
        // Add header before metric cards
        const metricGrid = document.querySelector(".grid");
        if (
          metricGrid &&
          !metricGrid.previousElementSibling?.classList.contains(
            "pdf-section-header"
          )
        ) {
          const header = document.createElement("div");
          header.className = "pdf-section-header";
          header.innerHTML =
            '<h2 style="font-size: 20px; font-weight: 600; margin: 20px 0 15px 0; color: black;">Key Performance Metrics</h2>';
          metricGrid.parentNode?.insertBefore(header, metricGrid);
        }

        // Add headers before charts
        const chartContainers = document.querySelectorAll(
          '[class*="ChartContainer"]'
        );
        chartContainers.forEach((chart, index) => {
          if (
            !chart.previousElementSibling?.classList.contains(
              "pdf-chart-header"
            )
          ) {
            const chartTitle =
              chart.querySelector("h3, h2")?.textContent ||
              `Analytics Chart ${index + 1}`;
            const header = document.createElement("div");
            header.className = "pdf-chart-header";
            header.innerHTML = `<h2 style="font-size: 18px; font-weight: 600; margin: 25px 0 10px 0; color: black; page-break-after: avoid;">${chartTitle}</h2>`;
            chart.parentNode?.insertBefore(header, chart);
          }
        });
      };

      addSectionHeaders();

      // Force re-render of charts
      window.dispatchEvent(new Event("resize"));
    });

    // Wait for resize event to complete
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  /**
   * Generate PDF from a single URL
   */
  async generatePDF(options: PDFGeneratorOptions): Promise<Buffer> {
    if (!this.browser || !this.page) {
      await this.initialize();
    }

    const page = this.page!;

    try {
      console.log(`Navigating to: ${options.url}`);

      // Navigate to the page
      await page.goto(options.url, {
        waitUntil: ["networkidle0", "domcontentloaded"],
        timeout: options.timeout || 60000,
      });

      // Wait for specific selectors if provided
      if (options.waitForSelectors && options.waitForSelectors.length > 0) {
        for (const selector of options.waitForSelectors) {
          try {
            await page.waitForSelector(selector, {
              timeout: 10000,
              visible: true,
            });
          } catch (error) {
            console.log(`Selector ${selector} not found, continuing...`);
          }
        }
      }

      // Wait for charts to render
      await this.waitForChartsToRender(page);

      // Scroll through the page to load all content
      await this.scrollThroughPage(page);

      // Apply custom CSS if provided
      if (options.customCSS) {
        await page.addStyleTag({ content: options.customCSS });
      }

      // Prepare page for PDF
      await this.preparePageForPDF(page);

      // Emulate print media
      await page.emulateMediaType("print");

      console.log("Generating PDF...");

      // Generate PDF with optimized settings
      const pdfOptions: PDFOptions = {
        format: "A4",
        printBackground: true,
        margin: {
          top: "25mm",
          right: "15mm",
          bottom: "20mm",
          left: "15mm",
        },
        preferCSSPageSize: false,
        displayHeaderFooter: true,
        headerTemplate: `
          <div style="font-size: 9px; text-align: right; width: 100%; padding: 5px 15mm 0 15mm; color: #9ca3af;">
            ${options.filename || "Dashboard Export"} | ${new Date().toLocaleDateString()}
          </div>
        `,
        footerTemplate: `
          <div style="font-size: 9px; text-align: center; width: 100%; padding: 0 15mm 5px 15mm; color: #9ca3af;">
            Page <span class="pageNumber"></span> of <span class="totalPages"></span>
          </div>
        `,
      };

      // Add page ranges if specified
      if (options.pageRanges) {
        pdfOptions.pageRanges = options.pageRanges;
      }

      const pdf = await page.pdf(pdfOptions);

      console.log(`PDF generated successfully, size: ${pdf.length} bytes`);

      return Buffer.from(pdf);
    } catch (error) {
      console.error("Error generating PDF:", error);
      throw error;
    }
  }

  /**
   * Generate PDFs for multiple tabs/sections
   */
  async generateMultiTabPDF(
    tabs: PageSection[],
    baseUrl: string
  ): Promise<{ name: string; pdf: Buffer }[]> {
    const results: { name: string; pdf: Buffer }[] = [];

    for (const tab of tabs) {
      console.log(`Processing tab: ${tab.name}`);

      try {
        // Navigate to tab URL or section
        const url = `${baseUrl}${tab.selector}`;

        const pdf = await this.generatePDF({
          url,
          filename: tab.name,
          waitForSelectors: tab.waitForSelector
            ? [tab.waitForSelector]
            : undefined,
        });

        results.push({ name: tab.name, pdf });
      } catch (error) {
        console.error(`Error generating PDF for ${tab.name}:`, error);
      }
    }

    return results;
  }

  /**
   * Generate a single combined PDF from multiple sections on the same page
   */
  async generateCombinedPDF(
    url: string,
    sections: string[],
    filename: string = "combined-export"
  ): Promise<Buffer> {
    if (!this.browser || !this.page) {
      await this.initialize();
    }

    const page = this.page!;

    try {
      // Navigate to the page
      await page.goto(url, {
        waitUntil: ["networkidle0", "domcontentloaded"],
        timeout: 60000,
      });

      // Wait for all sections to load
      for (const section of sections) {
        try {
          await page.waitForSelector(section, { timeout: 5000 });
        } catch (error) {
          console.log(`Section ${section} not found`);
        }
      }

      // Wait for charts
      await this.waitForChartsToRender(page);

      // Scroll to load everything
      await this.scrollThroughPage(page);

      // Hide everything except specified sections
      await page.evaluate((sectionSelectors) => {
        // First, hide everything
        document.body.style.visibility = "hidden";

        // Then show only the specified sections and their parents
        sectionSelectors.forEach((selector: string) => {
          const elements = document.querySelectorAll(selector);
          elements.forEach((element) => {
            let current = element as HTMLElement | null;
            while (current) {
              current.style.visibility = "visible";
              current = current.parentElement;
            }
          });
        });

        // Remove hidden elements from flow
        const allElements = document.querySelectorAll("body *");
        allElements.forEach((element) => {
          const el = element as HTMLElement;
          if (el.style.visibility === "hidden") {
            el.style.display = "none";
          }
        });
      }, sections);

      // Prepare for PDF
      await this.preparePageForPDF(page);
      await page.emulateMediaType("print");

      // Generate PDF
      const pdf = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: {
          top: "20mm",
          right: "15mm",
          bottom: "20mm",
          left: "15mm",
        },
        displayHeaderFooter: true,
        headerTemplate: `
          <div style="font-size: 10px; text-align: center; width: 100%;">
            <span style="color: #666;">${filename}</span>
          </div>
        `,
        footerTemplate: `
          <div style="font-size: 10px; text-align: center; width: 100%;">
            <span style="color: #666;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
          </div>
        `,
      });

      return Buffer.from(pdf);
    } catch (error) {
      console.error("Error generating combined PDF:", error);
      throw error;
    }
  }

  /**
   * Clean up resources
   */
  async cleanup() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.page = null;
    }
  }
}

// Export utility function for easy use
export async function generateFullPagePDF(
  url: string,
  filename: string = "export"
): Promise<Buffer> {
  const generator = new PuppeteerPDFGenerator();

  try {
    await generator.initialize();
    const pdf = await generator.generatePDF({
      url,
      filename,
      fullPage: true,
    });
    return pdf;
  } finally {
    await generator.cleanup();
  }
}
