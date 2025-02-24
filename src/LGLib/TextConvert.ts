import Tesseract from "tesseract.js";
import mammoth from "mammoth";
import fs from 'fs/promises';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import panic from "src/Support/Panic";
import { TextItem } from "pdfjs-dist/types/src/display/api";

async function file2Text(file: Express.Multer.File) {
    let result = 'Cannot be parsed';
    console.log('Parsing:', file.mimetype);

    if (!file || !file.path || !file.mimetype) {
        console.error("Invalid file input");
        return result;
    }

    try {
        await fs.access(file.path);

        if (file.mimetype.startsWith('image')) {
            const { data } = await Tesseract.recognize(file.path, "eng");
            result = data.text;
        } else if (file.mimetype === 'application/pdf') {
            result = await extractTextFromPDF(file.path);
        } else if (file.mimetype.startsWith('text')) {
            result = await fs.readFile(file.path, 'utf8');
        } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            result = await extractTextFromDocx(file.path);
        }
    } catch (error) {
        panic();
    }

    return result;
}

async function extractTextFromPDF(pdfPath: string) {
    try {
        const data = new Uint8Array(await fs.readFile(pdfPath));
        const pdfDoc = await getDocument({ data }).promise;
        let extractedText = '';

        for (let i = 1; i <= pdfDoc.numPages; i++) {
            const page = await pdfDoc.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => (item as TextItem).str).join(' ');
            extractedText += `Page ${i}:
${pageText}

`;
        }
        return extractedText;
    } catch (error) {
        panic();
    }
}

async function extractTextFromDocx(docxPath: string) {
    try {
        const data = await fs.readFile(docxPath);
        const { value: text } = await mammoth.extractRawText({ buffer: data });
        return text;
    } catch (error) {
        panic();
    }
}

export default file2Text;
