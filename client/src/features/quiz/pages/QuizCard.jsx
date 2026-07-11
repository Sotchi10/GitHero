import "./QuizCard.css";

function QuizCard({ quiz, isSelected, onSelect }) {
  return (
    <div className={`card ${isSelected ? "selected" : ""}`}>
      <div className="num">Quiz {quiz.num}</div>
      <div className="title">{quiz.title}</div>
      <div className="desc">{quiz.desc}</div>
      <button
        className="selectBtn"
        onClick={() => onSelect(quiz)}
      >
        Select for quiz
      </button>
    </div>
  );
}

export default QuizCard;