import QuizCard from "./QuizCard";

function QuizGrid({ quizzes, selectedId, onSelect }) {
  return (
    <div className="flex h-full flex-col rounded-[28px] border border-black bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#0d0d0d] dark:shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
      <div className="mb-5 border-b border-black pb-4 text-gray-600 dark:border-white/10 dark:text-[#c5c8cc]">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-white/40">
          Quiz library
        </p>
        <h4 className="mt-2 text-2xl font-semibold text-black dark:text-white">
          Choose a quiz
        </h4>
        <p className="mt-2 text-sm leading-6 text-gray-600">
          Pick one quiz card to open the questions on the right.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 overflow-y-auto pr-1">
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