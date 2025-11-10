import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { processPDF } from './pdfProcessor.js';
import { generateCards } from './cardGenerator.js';

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const text = await processPDF(req.file.path);
    const cards = await generateCards(text);
    res.json(cards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Fehler bei der Verarbeitung' });
  }
});

app.listen(3001, () => console.log('✅ Backend läuft auf Port 3001'));
