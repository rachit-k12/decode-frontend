#!/usr/bin/env node

/**
 * Standalone Puppeteer PDF Generator Script
 *
 * Usage:
 *   npx ts-node scripts/generate-pdf.ts --url="http://localhost:3000/dashboard" --output="dashboard.pdf"
 *   npx ts-node scripts/generate-pdf.ts --url="http://localhost:3000/dashboard" --tabs --output-dir="./pdfs"
 *   npx ts-node scripts/generate-pdf.ts --url="http://localhost:3000" --full-site --output-dir="./site-pdfs"
 */

import puppeteer, { Browser, Page } from "puppeteer";
import * as fs from "fs";
import * as path from "path";
import { program } from "commander";

interface PDFGeneratorOptions {
  url: string;
  output?: string;
  outputDir?: string;
  tabs?: boolean;
  fullSite?: boolean;
  waitTime?: number;
  format?: string;
  landscape?: boolean;
  debug?: boolean;
}

class StandalonePDFGenerator {
  private browser: Browser | null = null;
  private options: PDFGeneratorOptions;

  constructor(options: PDFGeneratorOptions) {
    this.options = options;
  }

  async initialize() {
    console.log("🚀 Initializing browser...");

    this.browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--window-size=1920,1080",
        "--force-device-scale-factor=1",
      ],
      defaultViewport: {
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
      },
    });
  }

  async waitForPageLoad(page: Page) {
    console.log("⏳ Waiting for page to load completely...");

    // Wait for any React/Vue/Angular apps to render
    await page.evaluate(() => {
      return new Promise<void>((resolve) => {
        // Check for common framework indicators
        const checkFrameworks = () => {
          const hasReact = document.querySelector(
            "[data-reactroot], #root, #app"
          );
          const hasAngular = document.querySelector("[ng-version]");
          const hasVue = document.querySelector("#app[data-v-]");

          if (hasReact || hasAngular || hasVue) {
            setTimeout(resolve, 1000);
          } else {
            resolve();
          }
        };

        if (document.readyState === "complete") {
          checkFrameworks();
        } else {
          window.addEventListener("load", checkFrameworks);
        }
      });
    });

    // Wait for charts (SVG/Canvas)
    try {
      await page.waitForSelector("svg, canvas", {
        timeout: 5000,
        visible: true,
      });

      console.log("📊 Charts detected, waiting for render...");

      // Ensure charts are fully rendered
      await page.waitForFunction(
        () => {
          const svgs = document.querySelectorAll("svg");
          const canvases = document.querySelectorAll("canvas");

          const svgsReady = Array.from(svgs).every((svg) => {
            const rect = svg.getBoundingClientRect();
            return rect.width > 10 && rect.height > 10;
          });

          const canvasesReady = Array.from(canvases).every((canvas) => {
            return canvas.width > 0 && canvas.height > 0;
          });

          return svgsReady && canvasesReady;
        },
        { timeout: 10000 }
      );
    } catch {
      console.log("⚠️ No charts detected or timeout reached");
    }

    // Additional wait time if specified
    if (this.options.waitTime) {
      console.log(`⏱️ Additional wait time: ${this.options.waitTime}ms`);
      await new Promise((resolve) =>
        setTimeout(resolve, this.options.waitTime)
      );
    }
  }

  async scrollPage(page: Page) {
    console.log("📜 Scrolling through page to load lazy content...");

    await page.evaluate(async () => {
      const scrollHeight = () => document.documentElement.scrollHeight;
      const currentHeight = () => window.innerHeight + window.scrollY;

      while (currentHeight() < scrollHeight()) {
        window.scrollBy(0, window.innerHeight);
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      // Scroll back to top
      window.scrollTo(0, 0);
      await new Promise((resolve) => setTimeout(resolve, 500));
    });
  }

  async preparePrintStyles(page: Page) {
    console.log("🎨 Applying print styles...");

    await page.addStyleTag({
      content: `
        @media print {
          /* Remove navigation and sidebars */
          nav, aside, [class*="sidebar"], [class*="Sidebar"] {
            display: none !important;
          }
          
          /* Remove buttons and interactive elements */
          button, [role="button"], .btn, .button {
            display: none !important;
          }
          
          /* Ensure content is visible */
          * {
            overflow: visible !important;
            max-height: none !important;
          }
          
          /* Full width for main content */
          main, [role="main"], .main-content {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 15px !important;
          }
          
          /* Avoid page breaks in important elements */
          h1, h2, h3, h4, h5, h6 {
            page-break-after: avoid !important;
            break-after: avoid !important;
          }
          
          /* Keep charts and components together */
          [class*="ChartContainer"],
          [class*="MetricCard"],
          .chart-container, 
          .graph-container, 
          .recharts-wrapper,
          figure {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          
          /* Add spacing for charts */
          [class*="ChartContainer"] {
            margin-top: 30px !important;
            margin-bottom: 30px !important;
          }
          
          /* Ensure charts are visible and properly sized */
          svg, canvas {
            max-width: 100% !important;
            height: auto !important;
            page-break-inside: avoid !important;
          }
          
          .recharts-wrapper {
            width: 100% !important;
            min-height: 350px !important;
          }
          
          /* Handle dark mode */
          body, [class*="dark"] {
            background-color: white !important;
            color: black !important;
          }
          
          /* Card styling */
          [class*="card"], [class*="Card"] {
            background: white !important;
            border: 1px solid #d1d5db !important;
          }
          
          /* Text visibility */
          p, span, div, label {
            color: #1f2937 !important;
          }
        }
      `,
    });
  }

  async generateSinglePDF(url: string, outputPath: string) {
    const page = await this.browser!.newPage();

    try {
      console.log(`📄 Generating PDF for: ${url}`);

      // Navigate to URL
      await page.goto(url, {
        waitUntil: ["networkidle0", "domcontentloaded"],
        timeout: 60000,
      });

      // Wait for page to fully load
      await this.waitForPageLoad(page);

      // Scroll to load lazy content
      await this.scrollPage(page);

      // Apply print styles
      await this.preparePrintStyles(page);

      // Set print media type
      await page.emulateMediaType("print");

      // Generate PDF
      console.log(`💾 Saving PDF to: ${outputPath}`);

      await page.pdf({
        path: outputPath,
        format: (this.options.format as any) || "A4",
        landscape: this.options.landscape || false,
        printBackground: true,
        preferCSSPageSize: false,
        margin: {
          top: "25mm",
          right: "15mm",
          bottom: "20mm",
          left: "15mm",
        },
        displayHeaderFooter: true,
        headerTemplate: `
          <div style="font-size: 9px; text-align: right; width: 100%; padding: 5px 15mm 0 15mm; color: #9ca3af;">
            Generated: ${new Date().toLocaleDateString()}
          </div>
        `,
        footerTemplate: `
          <div style="font-size: 9px; text-align: center; width: 100%; padding: 0 15mm 5px 15mm; color: #9ca3af;">
            Page <span class="pageNumber"></span> of <span class="totalPages"></span>
          </div>
        `,
      });

      console.log("✅ PDF generated successfully!");
    } finally {
      await page.close();
    }
  }

  async generateTabPDFs(baseUrl: string, outputDir: string) {
    // Common dashboard tabs
    const tabs = [
      { path: "/dashboard", name: "dashboard-overview" },
      { path: "/dashboard/sentiment", name: "sentiment-analysis" },
      { path: "/dashboard/burnout", name: "burnout-metrics" },
      { path: "/dashboard/invisible-labor", name: "invisible-labor" },
      { path: "/dashboard/repositories", name: "repositories" },
      { path: "/dashboard/timeline", name: "timeline" },
      { path: "/dashboard/profile", name: "profile" },
    ];

    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    for (const tab of tabs) {
      const url = `${baseUrl}${tab.path}`;
      const outputPath = path.join(outputDir, `${tab.name}.pdf`);

      try {
        await this.generateSinglePDF(url, outputPath);
      } catch (error) {
        console.error(`❌ Failed to generate PDF for ${tab.name}:`, error);
      }
    }
  }

  async generateFullSite(baseUrl: string, outputDir: string) {
    const page = await this.browser!.newPage();

    try {
      // Navigate to homepage
      await page.goto(baseUrl, {
        waitUntil: "networkidle0",
        timeout: 60000,
      });

      // Find all internal links
      const links = await page.evaluate((base) => {
        const allLinks = Array.from(document.querySelectorAll("a[href]"));
        return allLinks
          .map((link) => (link as HTMLAnchorElement).href)
          .filter((href) => href.startsWith(base))
          .filter((href, index, self) => self.indexOf(href) === index);
      }, baseUrl);

      console.log(`🔗 Found ${links.length} unique pages`);

      // Create output directory
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Generate PDF for each page
      for (const link of links) {
        const pageName =
          link.replace(baseUrl, "").replace(/\//g, "-") || "index";
        const outputPath = path.join(outputDir, `${pageName}.pdf`);

        try {
          await this.generateSinglePDF(link, outputPath);
        } catch (error) {
          console.error(`❌ Failed to generate PDF for ${link}:`, error);
        }
      }
    } finally {
      await page.close();
    }
  }

  async run() {
    try {
      await this.initialize();

      if (this.options.tabs && this.options.outputDir) {
        // Generate PDFs for all tabs
        await this.generateTabPDFs(this.options.url, this.options.outputDir);
      } else if (this.options.fullSite && this.options.outputDir) {
        // Generate PDFs for entire site
        await this.generateFullSite(this.options.url, this.options.outputDir);
      } else if (this.options.output) {
        // Generate single PDF
        await this.generateSinglePDF(this.options.url, this.options.output);
      } else {
        throw new Error(
          "Please specify either --output for single PDF or --output-dir for multiple PDFs"
        );
      }
    } catch (error) {
      console.error("❌ Error:", error);
      process.exit(1);
    } finally {
      if (this.browser) {
        await this.browser.close();
      }
    }
  }
}

// CLI setup
program
  .name("pdf-generator")
  .description("Generate PDFs from web pages using Puppeteer")
  .version("1.0.0");

program
  .requiredOption("-u, --url <url>", "URL to generate PDF from")
  .option("-o, --output <path>", "Output file path for single PDF")
  .option("-d, --output-dir <dir>", "Output directory for multiple PDFs")
  .option("-t, --tabs", "Generate PDFs for all dashboard tabs")
  .option("-f, --full-site", "Generate PDFs for entire site")
  .option(
    "-w, --wait-time <ms>",
    "Additional wait time in milliseconds",
    parseInt
  )
  .option("--format <format>", "Page format (A4, Letter, etc.)", "A4")
  .option("-l, --landscape", "Use landscape orientation")
  .option("--debug", "Enable debug mode");

program.parse();

const options = program.opts() as PDFGeneratorOptions;

// Run the generator
const generator = new StandalonePDFGenerator(options);
generator.run();
