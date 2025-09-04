import fs from 'fs';
import path from 'path';
import asyncHandler from '../middleware/asyncHandler.js';
import { pdfToXlsxStream } from '../services/convertapi.service.js';

export const convert = asyncHandler(async (req, res) => {
  const uploaded = req.file;
  if (!uploaded) {
    res.status(400);
    throw new Error('No file uploaded (field name must be "file")');
  }

  const baseName = path.basename(uploaded.originalname, path.extname(uploaded.originalname)) || 'converted';

  try {
    const { stream, outName } = await pdfToXlsxStream(uploaded.path, baseName);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="${outName}"`);

    stream.pipe(res);

    stream.on('end', () => fs.unlink(uploaded.path, () => {}));
    req.on('aborted', () => {
      stream.destroy();
      fs.unlink(uploaded.path, () => {});
    });
  } catch (err) {
    fs.unlink(uploaded.path, () => {});
    throw err;
  }
});
