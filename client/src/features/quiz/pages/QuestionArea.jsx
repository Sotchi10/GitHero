import { useState } from "react";
import "./QuestionArea.css";

const LETTERS = ["A", "B", "C", "D"];

function QuestionArea({ quiz }) {
  const [current, setCurrent] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  if (!quiz) {
    return (
      <div className="section">
        <div className="header">
          <span className="headerTitle">Select a quiz to begin</span>
        </div>
        <div className="empty">
          Pick a quiz above to start answering questions.
        </div>
      </div>
    );
  }

  const q = quiz.questions[current] || quiz.questions[0];
  const total = quiz.questions.length;

  function handleMC(i) {
    if (answered) return;
    setAnswered(true);
    setSelected(i);
    if (i === q.answer) setScore((s) => s + 1);
  }

  function handleTF(val) {
    if (answered) return;
    setAnswered(true);
    setSelected(val);
    if (val === q.answer) setScore((s) => s + 1);
  }

  function handleNext() {
    if (current < total - 1) {
      setCurrent((c) => c + 1);
      setAnswered(false);
      setSelected(null);
    } else {
      setFinished(true);
    }
  }

  function handleRetry() {
    setCurrent(0);
    setAnswered(false);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  if (finished) {
    const perfect = score === total;
    const good = score >= Math.ceil(total / 2);
    const resultColor = perfect ? "#72c45a" : good ? "#7ab3f0" : "#e07a7a";
    const resultMsg = perfect
      ? "Perfect score!"
      : good
      ? "Good effort — keep going"
      : "Keep practising";

    return (
      <div className="section">
        <div className="header">
          <span className="headerTitle">{quiz.title} — Result</span>
        </div>
        <div className="result">
          <div className="resultSub">Quiz complete</div>
          <div className="resultScore">
            {score}
            <span className="resultTotal"> / {total}</span>
          </div>
          <div className="resultMsg" style={{ color: resultColor }}>
            {resultMsg}
          </div>
          <button className="retryBtn" onClick={handleRetry}>
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="header">
        <span className="headerTitle">
          Answer {quiz.title}'s questions
        </span>
        <span className="counter">
          {current + 1} / {total}
        </span>
      </div>

      <div className="body">
        <span className="typeTag">
          {q.type === "mc" ? "Multiple choice" : "True / False"}
        </span>

        <div className="qText">{q.text}</div>

        {q.type === "mc" ? (
          <div className="options">
            {q.options.map((opt, i) => {
              let cls = "option";
              if (answered) {
                if (i === q.answer) cls += " correct";
                else if (i === selected) cls += " wrong";
              } else if (i === selected) {
                cls += " optSelected";
              }

              return (
                <div key={i} className={cls} onClick={() => handleMC(i)}>
                  <div className="letter">{LETTERS[i]}</div>
                  <span className="optText">{opt}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="tfRow">
            {[true, false].map((val) => {
              let cls = "tfBtn";
              if (answered && selected === val) {
                cls += val ? " tSel" : " fSel";
              }

              return (
                <button
                  key={String(val)}
                  className={cls}
                  onClick={() => handleTF(val)}
                  disabled={answered}
                >
                  {val ? "True" : "False"}
                </button>
              );
            })}
          </div>
        )}

        <div className="footer">
          <span
            className="feedback"
            style={{
              color: answered
                ? selected === q.answer
                  ? "#72c45a"
                  : "#e07a7a"
                : "transparent",
            }}
          >
            {answered
              ? selected === q.answer
                ? "✓ Correct"
                : "✗ Incorrect"
              : "—"}
          </span>

          <button
            className="nextBtn"
            onClick={handleNext}
            disabled={!answered}
          >
            {current === total - 1 ? "Finish" : "Next →"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuestionArea;