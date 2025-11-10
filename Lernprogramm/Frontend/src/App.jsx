import React, { useState } from 'react';
import Flashcard from './Components/Flashcard';
import { uploadPDF } from './utils/api';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const result = await uploadPDF(file);
    setCards(result);
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Lernkarten Generator 📘</h1>
      <input type="file" onChange={handleUpload} accept=".pdf" />
      {loading && <p>Verarbeite PDF...</p>}
      <div className="cards">
        {cards.map((card, i) => (
          <Flashcard key={i} question={card.question} answer={card.answer} />
        ))}
      </div>
    </div>
  );
}

export default App;
