# PDF Generation Guide

This guide explains how to generate PDFs from your dashboard pages with full content capture, including graphs and charts.

## 🎉 Recent Updates (Latest)

### Fixed Issues:

- ✅ **Charts no longer break** across pages
- ✅ **Header overlap fixed** - proper spacing maintained
- ✅ **Automatic section headers** added for better organization
- ✅ **Improved component spacing** for professional layout
- ✅ **Better page break handling** for all components

See `PDF_FIXES_SUMMARY.md` for detailed technical information about the fixes.

## Overview

The application now supports multiple methods for generating PDFs:

1. **Server-side generation** using Puppeteer (high quality, full content)
2. **Client-side generation** using html2canvas + jsPDF (fast, no server required)
3. **Command-line generation** for batch exports and automation

## Features

- ✅ Full page capture with scrolling content
- ✅ Proper chart and graph rendering (SVG, Canvas, Recharts)
- ✅ Automatic pagination for long content
- ✅ Multi-tab PDF generation
- ✅ Custom CSS injection for print styles
- ✅ Dark mode handling
- ✅ Lazy-loaded content capture
- ✅ Interactive element removal (buttons, navigation)

## Usage Methods

### 1. In-App Export Button

The simplest way to export PDFs is using the Export Button in the dashboard:

```tsx
import { ExportButton } from "@/components/dashboard/ExportButton";

// Basic usage
<ExportButton pageName="dashboard-overview" />

// With export options (server/client/both)
<ExportButton
  pageName="dashboard-overview"
  exportMode="both"  // Shows dropdown with options
/>

// With specific sections
<ExportButton
  pageName="dashboard"
  sections={[".metric-cards", ".charts-section"]}
/>
```

### 2. API Endpoint

You can generate PDFs programmatically by calling the API endpoint:

```javascript
// Single page export
const response = await fetch("/api/export-pdf", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    url: "http://localhost:3000/dashboard",
    filename: "dashboard-report",
  }),
});

const blob = await response.blob();
// Save or display the PDF blob

// Multiple tabs export
const response = await fetch("/api/export-pdf", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    url: "http://localhost:3000",
    tabs: [
      { selector: "/dashboard", name: "overview" },
      { selector: "/dashboard/sentiment", name: "sentiment" },
      { selector: "/dashboard/burnout", name: "burnout" },
    ],
  }),
});

// Export specific sections
const response = await fetch("/api/export-pdf", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    url: "http://localhost:3000/dashboard",
    sections: ["#metrics", "#charts", "#activity"],
    filename: "dashboard-sections",
  }),
});
```

### 3. Command Line Tool

Use the standalone script for batch exports and automation:

```bash
# Single page export
npx ts-node scripts/generate-pdf.ts \
  --url="http://localhost:3000/dashboard" \
  --output="dashboard.pdf"

# Export all dashboard tabs
npx ts-node scripts/generate-pdf.ts \
  --url="http://localhost:3000" \
  --tabs \
  --output-dir="./pdfs"

# Export entire site
npx ts-node scripts/generate-pdf.ts \
  --url="http://localhost:3000" \
  --full-site \
  --output-dir="./site-pdfs"

# With additional options
npx ts-node scripts/generate-pdf.ts \
  --url="http://localhost:3000/dashboard" \
  --output="report.pdf" \
  --landscape \
  --format="Letter" \
  --wait-time=3000
```

Or use the npm scripts:

```bash
# Generate single PDF (interactive)
npm run pdf:single -- --url="http://localhost:3000/dashboard" --output="dashboard.pdf"

# Generate PDFs for all tabs
npm run pdf:tabs -- --url="http://localhost:3000" --output-dir="./pdfs"

# Generate PDFs for full site
npm run pdf:full -- --url="http://localhost:3000" --output-dir="./site-pdfs"

# Show help
npm run pdf:help
```

### 4. Client-Side Utilities

For direct client-side PDF generation:

```javascript
import { EnhancedPDFExporter } from "@/utils/enhanced-pdf-export";

// Export single element
const exporter = new EnhancedPDFExporter();
await exporter.exportToPDF({
  elementId: "dashboard-content",
  filename: "dashboard",
  orientation: "portrait",
  includeHeaders: true,
});

// Export multiple sections
await exporter.exportMultipleSectionsToPDF({
  filename: "complete-report",
  sections: [
    { selector: ".header-section", title: "Overview" },
    { selector: ".metrics-grid", title: "Key Metrics", pageBreak: true },
    { selector: ".charts-container", title: "Analytics", pageBreak: true },
  ],
});

// Export full page with scroll
await exporter.exportFullPageToPDF({
  filename: "full-page-export",
  orientation: "portrait",
  quality: 2,
});
```

## Key Improvements Over Screenshot-Based Approach

### Previous Issues (Screenshot → PDF)

- ❌ Only captured visible viewport
- ❌ Charts/graphs often cut off or missing
- ❌ No pagination for long content
- ❌ Poor text quality (image-based)
- ❌ Large file sizes
- ❌ No selectable/searchable text

### Current Solution (HTML → PDF)

- ✅ Captures entire page content
- ✅ Waits for charts to fully render
- ✅ Automatic pagination with proper breaks
- ✅ Vector graphics for charts (when possible)
- ✅ Smaller file sizes
- ✅ Selectable/searchable text
- ✅ Proper print CSS handling

## How It Works

### Server-Side (Puppeteer)

1. **Page Navigation**: Opens URL in headless Chrome
2. **Content Loading**: Waits for network idle and DOM content
3. **Chart Detection**: Specifically waits for SVG/Canvas elements
4. **Lazy Loading**: Scrolls through page to trigger all content
5. **Style Injection**: Applies print-specific CSS
6. **PDF Generation**: Uses Chrome's print-to-PDF with pagination

### Client-Side (html2canvas + jsPDF)

1. **DOM Capture**: Takes snapshot of specified elements
2. **Canvas Rendering**: Converts HTML to canvas with full height
3. **Pagination**: Splits content across multiple pages
4. **PDF Creation**: Converts canvas to PDF format

## Configuration Options

### Puppeteer Options

```typescript
{
  url: string;              // Page URL to convert
  filename?: string;        // Output filename
  waitForSelectors?: string[];  // Wait for specific elements
  customCSS?: string;      // Inject custom styles
  pageRanges?: string;     // Specific pages (e.g., "1-3")
  fullPage?: boolean;      // Capture full scrollable area
  timeout?: number;        // Navigation timeout (ms)
}
```

### Print Styles

The system automatically applies print-optimized styles:

```css
/* Removes navigation and sidebars */
/* Hides interactive elements */
/* Ensures full content visibility */
/* Prevents awkward page breaks */
/* Handles dark mode conversion */
```

## Troubleshooting

### Charts Not Rendering

If charts aren't appearing in PDFs:

1. Increase wait time:

```javascript
--wait-time=5000  // CLI
timeout: 5000     // API
```

2. Add specific selectors to wait for:

```javascript
waitForSelectors: [".recharts-wrapper", "svg.chart"];
```

### Content Cut Off

If content is being cut off:

1. Use full page capture:

```javascript
fullPage: true;
```

2. Adjust margins:

```javascript
margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' }
```

### Large File Sizes

To reduce PDF file size:

1. Lower quality for client-side:

```javascript
quality: 1; // Default is 2
```

2. Use JPEG compression:

```javascript
// Automatically handled in enhanced exporter
```

## Docker Deployment

When deploying with Docker, ensure Puppeteer dependencies are installed:

```dockerfile
# Install Chrome dependencies
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgbm1 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    lsb-release \
    xdg-utils

# Install Chrome
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
    && rm -rf /var/lib/apt/lists/*
```

## Examples

### Generate Dashboard Report

```javascript
// Complete dashboard with all tabs
async function generateDashboardReport(userId) {
  const generator = new PuppeteerPDFGenerator();
  await generator.initialize();

  const tabs = [
    "overview",
    "sentiment",
    "burnout",
    "invisible-labor",
    "repositories",
    "timeline",
    "profile",
  ];

  const pdfs = [];

  for (const tab of tabs) {
    const pdf = await generator.generatePDF({
      url: `http://localhost:3000/dashboard/${tab}`,
      filename: `${userId}-${tab}`,
      fullPage: true,
    });
    pdfs.push(pdf);
  }

  await generator.cleanup();
  return pdfs;
}
```

### Export Specific Metrics

```javascript
// Export only metric cards and charts
async function exportMetricsOnly() {
  const response = await fetch("/api/export-pdf", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      url: window.location.href,
      sections: [".metric-cards", ".activity-chart", ".sentiment-chart"],
      filename: "metrics-report",
    }),
  });

  const blob = await response.blob();
  // Download the PDF
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "metrics-report.pdf";
  a.click();
}
```

## Performance Considerations

- **Server Load**: Server-side generation uses more resources
- **Client Performance**: Client-side may struggle with large pages
- **Caching**: Consider caching generated PDFs for frequently accessed content
- **Batch Processing**: Use command-line tool for bulk exports
- **Timeout Settings**: Adjust based on page complexity

## Support

For issues or questions about PDF generation:

1. Check browser console for client-side errors
2. Review server logs for Puppeteer errors
3. Ensure all dependencies are installed
4. Verify Chrome/Chromium is available (for Puppeteer)
5. Test with simpler pages first
