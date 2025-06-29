const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const { width, height } = page.getSize();

    page.drawText('Bukti Pendaftaran Mahasiswa Baru', {
      x: 50,
      y: height - 50,
      size: 24,
      font,
      color: rgb(0, 0, 0)
    });

    let y = height - 100;
    for (const [key, value] of Object.entries(data)) {
      page.drawText(`${key}: ${value}`, {
        x: 50,
        y,
        size: 14,
        font
      });
      y -= 25;
    }

    const pdfBytes = await pdfDoc.save();
    const base64PDF = Buffer.from(pdfBytes).toString('base64');

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Bukti_Pendaftaran.pdf"'
      },
      body: base64PDF,
      isBase64Encoded: true
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify(err.message) };
  }
};
