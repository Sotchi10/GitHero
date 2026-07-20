import QuizCard from "./QuizCard";

function QuizGrid({ quizzes, selectedId, onSelect }) {
  return (
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
    <div className=" rounded-xl mb-4.5">
=======
    <div className="rounded-xl mb-4.5">
>>>>>>> c80c81371d78870aa2dacc63d8c8570ff549f0de
      <div className="text-[#c5c8cc] mb-4">
        <h4>Quiz</h4>
        <p className="text-[13px] text-gray-400">Test you knowledge here</p>
>>>>>>> f2a9bcab4362cf3db2b6f77b342368f09167d970
      </div>
      <div className="flex h-full flex-col rounded-[8px] border border-white/10 bg-[#0d0d0d] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
        <div className="mb-5 border-b border-white/10 pb-4 text-[#c5c8cc]">
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">
            Quiz library
          </p>
          <h4 className="mt-2 text-2xl font-semibold text-white">
            Choose a quiz
          </h4>
          <p className="mt-2 text-sm leading-6 text-gray-400">
            Pick one quiz card to open the questions on the right.
          </p>
        </div>

<<<<<<< HEAD
<<<<<<< HEAD
      <div className="grid grid-cols-3 gap-3 overflow-y-auto pr-1">
        {quizzes.map((quiz) => (
          <QuizCard
            key={quiz.id}
            quiz={quiz}
            isSelected={selectedId === quiz.id}
            onSelect={onSelect}
          />
        ))}
=======
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-1">
=======
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
>>>>>>> c80c81371d78870aa2dacc63d8c8570ff549f0de
          {quizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              isSelected={selectedId === quiz.id}
              onSelect={onSelect}
            />
          ))}
        </div>
>>>>>>> f2a9bcab4362cf3db2b6f77b342368f09167d970
      </div>
    </div>
  );
}

export default QuizGrid;