import axios from 'axios';
import createConvertApi from 'convertapi';
import { CONVERTAPI_SECRET } from '../config/index.js';

if (!CONVERTAPI_SECRET) {
  throw new Error('Missing CONVERTAPI_SECRET in environment');
}

// convertapi Node SDK is CommonJS; default import returns the function factory
const convertapi = createConvertApi(CONVERTAPI_SECRET);

/**
 * Convert local PDF to XLSX and return a stream + suggested filename.
 */
export async function pdfToXlsxStream(localPdfPath, outBaseName = 'converted') {
  const result = await convertapi.convert('xlsx', { File: localPdfPath });

  const fileObj = result?.file || (Array.isArray(result?.files) && result.files[0]);
  const fileUrl = fileObj?.url || fileObj?.Url;
  if (!fileUrl) throw new Error('ConvertAPI: no output file URL returned');

  const response = await axios.get(fileUrl, { responseType: 'stream' });
  const outName = `${outBaseName}.xlsx`;

  return { stream: response.data, outName };
}
