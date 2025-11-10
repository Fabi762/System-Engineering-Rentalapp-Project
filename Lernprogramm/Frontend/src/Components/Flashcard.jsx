function Flashcard({ question, answer }) {
  return (
    <div className="flashcard">
      <h3>{question}</h3>
      <p>{answer}</p>
    </div>
  );
}

export default Flashcard;
