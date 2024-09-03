import { decodeFromBase64, PDFDocument } from 'pdf-lib';
import { convertDocxToPdf } from '../../../requests/documents/converter';

export const convertDocx = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', 'general');
  const res = await convertDocxToPdf(formData);
  const buffer = Buffer.from(res.data.readFile.data);
  return buffer;
};

export const createImageDoc = async (file) => {
  const f = await convertBase64(file);
  const pdfDoc = await PDFDocument.create();
  if (file.type.includes('png')) {
    const pngImage = await pdfDoc.embedPng(f);
    const pngDims = pngImage.scale(0.5);
    const page = pdfDoc.addPage();
    page.drawImage(pngImage, {
      x: 0,
      y: page.getHeight() / 2 - pngDims.height / 2 + 250,
      width: pngDims.width / 2,
      height: pngDims.height / 2
    });
  } else {
    const jpgImage = await pdfDoc.embedJpg(f);
    const jpgDims = jpgImage.scale(0.5);
    const page = pdfDoc.addPage();
    page.drawImage(jpgImage, {
      x: 0,
      y: page.getHeight() / 2 - jpgDims.height / 2 + 250,
      width: jpgDims.width / 2,
      height: jpgDims.height / 2
    });
  }
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};

export const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const blobToBase64 = (blob) => {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};

export function b64toBlob(dataURI) {
  var byteString = atob(dataURI.split(',')[1], 'base64');
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);

  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: 'image/png' });
}

export const mergeAllFiles = async (documentFiles) => {
  const mergedDoc = await PDFDocument.create();
  for (const file of documentFiles) {
    if (file.type.startsWith('image')) {
      const pdf = await createImageDoc(file);
      const pdfFile = await PDFDocument.load(pdf);
      const copiedPdfPages = await mergedDoc.copyPages(pdfFile, pdfFile.getPageIndices());
      copiedPdfPages.forEach((page) => mergedDoc.addPage(page));
    } else if (
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      const buffer = await convertDocx(file);
      const pdfFile = await PDFDocument.load(buffer);
      const copiedPdfPages = await mergedDoc.copyPages(pdfFile, pdfFile.getPageIndices());
      copiedPdfPages.forEach((page) => mergedDoc.addPage(page));
    } else {
      const f = await convertBase64(file);
      const fromBase64 = decodeFromBase64(f);
      const pdfFile = await PDFDocument.load(fromBase64);
      const copiedPdfPages = await mergedDoc.copyPages(pdfFile, pdfFile.getPageIndices());
      copiedPdfPages.forEach((page) => mergedDoc.addPage(page));
    }
  }
  const res = await mergedDoc.save();
  var blob = new Blob([res], { type: 'application/pdf' });
  const fileName = (Math.random() + 1).toString(36).substring(2);
  const newFile = new File([blob], `${fileName}.pdf`, {
    type: 'application/pdf;charset=utf-8'
  });

  return newFile;
};

export const generateDocCode = (documentId, recipient) => {
  const str = String(documentId + recipient);
  let output = '';
  for (let index = 0; index < str.length; index++) {
    output = output + str.charCodeAt(index);
  }
  return parseInt(output)
    .toString(36)
    .replace(/^0+|0+$/g, '');
};
