# Quick Start - PDF Export

## 🚀 Start Using PDF Export in 3 Steps

### Step 1: Start Your Server

```bash
npm run dev
```

### Step 2: Export a PDF

Choose one method:

**Method A: Via Web UI** (Easiest)

1. Go to `http://localhost:3000/dashboard`
2. Click "Export PDF" button
3. Done! PDF downloads automatically

**Method B: Via Command Line**

```bash
npx ts-node scripts/generate-pdf.ts \
  --url="http://localhost:3000/dashboard" \
  --output="my-dashboard.pdf"
```

**Method C: Via API**

```javascript
fetch("/api/export-pdf", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    url: "http://localhost:3000/dashboard",
    filename: "my-dashboard",
  }),
});
```

### Step 3: Verify Quality

Open the PDF and check:

- [ ] Charts are complete (not split)
- [ ] Header doesn't overlap content
- [ ] Section headers are visible
- [ ] Text is readable

---

## 📋 What's Fixed

| Issue                        | Status   | Solution                         |
| ---------------------------- | -------- | -------------------------------- |
| Charts breaking across pages | ✅ Fixed | Added `page-break-inside: avoid` |
| Header overlapping content   | ✅ Fixed | Increased top margin to 25mm     |
| Missing section headers      | ✅ Fixed | Auto-generated headers added     |
| Poor component spacing       | ✅ Fixed | Added 30px margins for charts    |

---

## 🎯 Common Use Cases

### Export Current Dashboard

```bash
# Web UI: Click "Export PDF" button
# OR
npx ts-node scripts/generate-pdf.ts \
  --url="http://localhost:3000/dashboard" \
  --output="dashboard.pdf"
```

### Export All Dashboard Tabs

```bash
npx ts-node scripts/generate-pdf.ts \
  --url="http://localhost:3000" \
  --tabs \
  --output-dir="./all-dashboards"
```

### Export with Extra Wait Time (for slow charts)

```bash
npx ts-node scripts/generate-pdf.ts \
  --url="http://localhost:3000/dashboard" \
  --output="dashboard.pdf" \
  --wait-time=5000
```

---

## 🔧 Troubleshooting

### PDF Generation Fails

```bash
# Check if Puppeteer is installed
npm ls puppeteer

# Reinstall if needed
npm install puppeteer
```

### Charts Not Rendering

```bash
# Add more wait time
--wait-time=10000
```

### Header Still Overlaps

Edit `utils/puppeteer-pdf-generator.ts`:

```javascript
margin: {
  top: "30mm",  // Increase from 25mm
  // ...
}
```

---

## 📚 More Resources

- **Detailed fixes**: See `PDF_FIXES_SUMMARY.md`
- **Complete guide**: See `PDF_GENERATION_GUIDE.md`
- **Testing guide**: See `TEST_PDF_EXPORT.md`

---

## ✨ Features

✅ Full page capture with scrolling  
✅ Chart/graph rendering (SVG, Canvas, Recharts)  
✅ Automatic pagination  
✅ Section headers  
✅ Dark mode conversion  
✅ Selectable text  
✅ Professional layout

---

## 💡 Pro Tips

1. **For best results**: Wait for all charts to load before exporting
2. **For large dashboards**: Use command-line tool with `--wait-time`
3. **For batch exports**: Use the `--tabs` flag
4. **For debugging**: Check browser console and server logs

---

Need help? Check the full documentation in `PDF_GENERATION_GUIDE.md`
