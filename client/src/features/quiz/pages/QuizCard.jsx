import "./QuizCard.css";

function QuizCard({ quiz, isSelected, onSelect }) {
  return (
    <div className={`card ${isSelected ? "selected" : ""}`}>
      <div className="cardTop">
        <div>
          <div className="num">Quiz {quiz.num}</div>
          <div className="title">{quiz.title}</div>
        </div>

        <div className="quizBadge">{quiz.questions.length} Qs</div>
      </div>

      <div className="desc">{quiz.desc}</div>

      <button className="selectBtn" onClick={() => onSelect(quiz)}>
        {isSelected ? "Selected" : "Start quiz"}
      </button>
    </div>
  );
}

export default QuizCard;
