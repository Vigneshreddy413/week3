export async function downloadResumePdf(element, fileName = "resume.pdf") {
  const html2pdf = (await import("html2pdf.js")).default;
  const options = {
    margin: [0, 0, 0, 0],
    filename: fileName,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  };
  return html2pdf().set(options).from(element).save();
}
