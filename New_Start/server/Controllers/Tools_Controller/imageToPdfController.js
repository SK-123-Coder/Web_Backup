import PDFDocument from "pdfkit";
import sharp from "sharp";

const DPI = 300;

// PDF page size (POINTS)
const A4_WIDTH_PT = 595;
const A4_HEIGHT_PT = 842;

// Image resolution (PIXELS)
const A4_WIDTH_PX = Math.round(8.27 * DPI);   // 2480
const A4_HEIGHT_PX = Math.round(11.69 * DPI); // 3508

export const downloadPdf = async (req, res) => {
  const files = req.files;

  if (!files || files.length === 0) {
    return res.status(400).json({ error: "No images uploaded" });
  }

  const doc = new PDFDocument({
    size: "A4",
    margin: 0,
    autoFirstPage: false,
    compress: true,
  });

  try {
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="images.pdf"'
    );

    doc.pipe(res);

    for (const file of files) {
      if (!file?.buffer?.length) continue;

      let imageBuffer;

      try {
        imageBuffer = await sharp(file.buffer)
          .rotate()
          .resize({
            width: A4_WIDTH_PX,
            height: A4_HEIGHT_PX,
            fit: "inside",
            withoutEnlargement: true,
          })
          .jpeg({
            quality: 98,
            chromaSubsampling: "4:4:4",
          })
          .toBuffer();
      } catch (err) {
        console.error("Sharp error:", err);
        continue;
      }

      // Add A4 page in POINTS
      doc.addPage({ size: "A4", margin: 0 });

      // Place image using POINT units
      doc.image(imageBuffer, 0, 0, {
        fit: [A4_WIDTH_PT, A4_HEIGHT_PT],
        align: "center",
        valign: "center",
      });
    }

    doc.end();
  } catch (err) {
    console.error("PDF generation error:", err);
    if (!res.headersSent) {
      res.status(500).json({ error: "PDF generation failed" });
    }
  }
};
