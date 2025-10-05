# Testing PDF Export - Quick Guide

## Quick Test Steps

### 1. Start Your Development Server

```bash
npm run dev
```

### 2. Test via Web Interface

1. **Navigate to Dashboard**:

   ```
   http://localhost:3000/dashboard
   ```

2. **Click "Export PDF" button** in the top right

3. **Check the generated PDF** for:
   - ✅ No chart splitting across pages
   - ✅ Header not overlapping content
   - ✅ "Key Performance Metrics" header appears
   - ✅ Individual chart sections have titles
   - ✅ Proper spacing between components

### 3. Test via Command Line

```bash
# Test single page export
npx ts-node scripts/generate-pdf.ts \
  --url="http://localhost:3000/dashboard" \
  --output="test-dashboard.pdf"

# Test all dashboard tabs
npx ts-node scripts/generate-pdf.ts \
  --url="http://localhost:3000" \
  --tabs \
  --output-dir="./test-pdfs"
```

## What to Look For

### ✅ Fixed Issues

1. **Charts Not Breaking**:

   - Weekly Activity Breakdown chart: Should be complete on one page
   - Activity Distribution pie chart: Should be complete on one page
   - Any other SVG/Canvas charts: Should be complete

2. **Header Spacing**:

   - Look at page 1: Header should be at the top with clear spacing
   - Content should start ~25mm from top edge
   - No text should be hidden under the header

3. **Section Headers**:

   - Should see "Key Performance Metrics" before the metric cards
   - Each major chart should have a title/header above it
   - Headers should not break from their content

4. **Component Spacing**:
   - Metric cards should have consistent spacing
   - Charts should have 30px margins top and bottom
   - No cramped layouts

### ❌ Potential Issues to Check

1. **If charts still break**:

   - The chart might be too large for one page
   - Consider reducing chart height or splitting into smaller charts
   - May need to adjust `min-height` setting

2. **If header overlaps**:

   - Increase `top` margin in the code
   - Currently set to 25mm, can go up to 30mm if needed

3. **If sections missing headers**:
   - Check if your components use the expected class names
   - Update the header detection logic for custom components

## Testing Different Pages

### Dashboard Overview

```bash
npx ts-node scripts/generate-pdf.ts \
  --url="http://localhost:3000/dashboard" \
  --output="dashboard-overview.pdf"
```

### Sentiment Analysis

```bash
npx ts-node scripts/generate-pdf.ts \
  --url="http://localhost:3000/dashboard/sentiment" \
  --output="sentiment-analysis.pdf"
```

### Burnout Metrics

```bash
npx ts-node scripts/generate-pdf.ts \
  --url="http://localhost:3000/dashboard/burnout" \
  --output="burnout-metrics.pdf"
```

### Invisible Labor

```bash
npx ts-node scripts/generate-pdf.ts \
  --url="http://localhost:3000/dashboard/invisible-labor" \
  --output="invisible-labor.pdf"
```

## Advanced Testing

### Test with Wait Time

For pages with complex animations:

```bash
npx ts-node scripts/generate-pdf.ts \
  --url="http://localhost:3000/dashboard" \
  --output="test.pdf" \
  --wait-time=5000
```

### Test Landscape Mode

For wide charts:

```bash
npx ts-node scripts/generate-pdf.ts \
  --url="http://localhost:3000/dashboard" \
  --output="landscape.pdf" \
  --landscape
```

### Test Different Page Formats

```bash
# Letter format
npx ts-node scripts/generate-pdf.ts \
  --url="http://localhost:3000/dashboard" \
  --output="letter.pdf" \
  --format="Letter"

# A3 format (larger)
npx ts-node scripts/generate-pdf.ts \
  --url="http://localhost:3000/dashboard" \
  --output="a3.pdf" \
  --format="A3"
```

## Debugging Tips

### Enable Debug Mode

Add debug logging to see what's happening:

```bash
npx ts-node scripts/generate-pdf.ts \
  --url="http://localhost:3000/dashboard" \
  --output="debug.pdf" \
  --debug
```

### Check Browser Console

When using web export:

1. Open browser DevTools (F12)
2. Go to Console tab
3. Click "Export PDF"
4. Watch for any errors or warnings

### Check Server Logs

When using API endpoint:

```bash
# In your terminal where dev server is running
# You'll see console.log output like:
# "Waiting for charts to render..."
# "Charts rendered successfully"
# "Generating PDF..."
# "PDF generated successfully"
```

## Performance Benchmarks

Expected times (approximate):

- **Simple page** (no charts): 2-3 seconds
- **Dashboard with 2-3 charts**: 5-8 seconds
- **Complex dashboard** (5+ charts): 10-15 seconds
- **Full site** (all pages): 1-2 minutes

If times are significantly longer:

- Check network connection (if loading external resources)
- Verify charts are not infinitely loading
- Check for JavaScript errors on the page

## Comparing Before/After

### Before Fixes

Generate a PDF using old method (if you have the old code):

```bash
# Save current version
git stash

# Checkout old version
git checkout HEAD~1

# Generate PDF
npm run dev
# Export via UI

# Return to current version
git stash pop
```

### After Fixes

Generate with new method:

```bash
npm run dev
# Export via UI or CLI
```

Compare the two PDFs:

- Chart completeness
- Header positioning
- Overall layout quality

## Quick Checklist

Before considering the export complete:

- [ ] Dashboard overview exports successfully
- [ ] All charts are complete (not split)
- [ ] Header doesn't overlap content
- [ ] Section headers are present
- [ ] Metric cards are organized well
- [ ] Text is readable (good contrast)
- [ ] Page numbers are correct
- [ ] File size is reasonable (< 5MB typical)
- [ ] PDF opens without errors
- [ ] Text is selectable (not an image)

## Common Use Cases

### Export for Client Report

```bash
npx ts-node scripts/generate-pdf.ts \
  --url="http://localhost:3000/dashboard" \
  --output="client-report-$(date +%Y-%m-%d).pdf"
```

### Batch Export All Sections

```bash
#!/bin/bash
# Save as export-all.sh

pages=("dashboard" "sentiment" "burnout" "invisible-labor" "repositories" "timeline" "profile")

for page in "${pages[@]}"; do
  echo "Exporting $page..."
  npx ts-node scripts/generate-pdf.ts \
    --url="http://localhost:3000/dashboard/$page" \
    --output="exports/$page-$(date +%Y-%m-%d).pdf"
done

echo "All exports complete!"
```

### Scheduled Export (Cron Job)

```bash
# Add to crontab: crontab -e
# Daily at 2 AM:
0 2 * * * cd /path/to/project && npx ts-node scripts/generate-pdf.ts --url="http://localhost:3000/dashboard" --output="daily-report.pdf"
```

## Getting Help

If issues persist:

1. **Check the fixes summary**: `PDF_FIXES_SUMMARY.md`
2. **Review the full guide**: `PDF_GENERATION_GUIDE.md`
3. **Check for updates**: `git pull origin main`
4. **Verify dependencies**: `npm install`
5. **Check Puppeteer**: `npm ls puppeteer`

## Success Indicators

Your PDF export is working correctly when:

1. ✅ All charts render completely
2. ✅ No content hidden under headers/footers
3. ✅ Professional-looking layout
4. ✅ Clear section organization
5. ✅ Readable text throughout
6. ✅ Proper page breaks
7. ✅ Reasonable file size
8. ✅ Fast generation time (< 15s typical)

Congratulations! Your PDF export system is now production-ready. 🎉
