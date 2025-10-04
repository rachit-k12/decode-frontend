// PDF Export Utility for Contribution Profile
// Using client-side approach with html2canvas and jsPDF

export const exportToPDF = async (
  elementId: string,
  filename: string = "contribution-profile"
) => {
  // Dynamically import to avoid SSR issues
  const html2canvas = (await import("html2canvas")).default;
  const jsPDF = (await import("jspdf")).default;

  const element = document.getElementById(elementId);
  if (!element) {
    console.error("Element not found for PDF export");
    return;
  }

  try {
    // Create canvas from the element
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    });

    // Convert canvas to image
    const imgData = canvas.toDataURL("image/png");

    // Calculate PDF dimensions
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 30;

    // Add header
    pdf.setFontSize(20);
    pdf.text("Maintainer Contribution Profile", pdfWidth / 2, 15, {
      align: "center",
    });

    // Add the image
    pdf.addImage(
      imgData,
      "PNG",
      imgX,
      imgY,
      imgWidth * ratio,
      imgHeight * ratio
    );

    // Save the PDF
    pdf.save(`${filename}.pdf`);

    return true;
  } catch (error) {
    console.error("Error generating PDF:", error);
    return false;
  }
};

// LinkedIn format export
export const exportToLinkedIn = (profile: any): string => {
  const linkedInText = `
🚀 Open Source Maintainer Profile

📊 Impact Metrics:
• ${profile.impactSummary.totalReviews.toLocaleString()} Code Reviews Completed
• ${profile.impactSummary.issuesTriaged.toLocaleString()} Issues Triaged
• ${profile.impactSummary.contributorsHelped} New Contributors Mentored
• ${profile.impactSummary.documentationPages} Documentation Pages Improved
• ${profile.impactSummary.communityImpact}% Community Impact Score

🏆 Key Achievements:
${profile.achievements
  .slice(0, 3)
  .map((a: any) => `• ${a.title}: ${a.description}`)
  .join("\n")}

💼 Top Repository Contributions:
${profile.topRepositories.map((r: any) => `• ${r.repository} - ${r.role} (${r.contributions} contributions)`).join("\n")}

🎯 Skills:
${profile.skills
  .slice(0, 5)
  .map((s: any) => `• ${s.skill}: ${s.score}/${s.maxScore}`)
  .join("\n")}

💬 Testimonials:
${profile.testimonials[0]?.content ? `"${profile.testimonials[0].content}" - ${profile.testimonials[0].author}` : ""}

#OpenSource #Maintainer #SoftwareDevelopment #Community
  `;

  return linkedInText.trim();
};

// Generate shareable URL
export const generateShareableURL = (username: string): string => {
  const baseURL = window.location.origin;
  return `${baseURL}/profile/${username}`;
};

// Copy to clipboard utility
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Error copying to clipboard:", error);
    return false;
  }
};
