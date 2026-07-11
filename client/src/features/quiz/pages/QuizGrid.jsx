import QuizCard from "./QuizCard";

function QuizGrid({ quizzes, selectedId, onSelect }) {
  return (
    <div className=" bg-[#0d0d0d] rounded-xl mb-4.5">
      
      <div className="text-[#c5c8cc] mb-4">
        <h4>Quiz</h4>
        <p className="text-[13px] text-gray-400">Test you knowledge here</p>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {quizzes.map((quiz) => (
          <QuizCard
            key={quiz.id}
            quiz={quiz}
            isSelected={selectedId === quiz.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

export default QuizGrid;