import { FaEye, FaPlus, FaRegEdit, FaTrashAlt } from "react-icons/fa";

const lessons = [
  { title: "What is Git?", module: "Git Fundamentals", type: "Video", status: "Published" },
  { title: "Creating commits", module: "Git Fundamentals", type: "Article", status: "Published" },
  { title: "Working with branches", module: "Branching Strategy", type: "Video", status: "Draft" },
  { title: "Resolving merge conflicts", module: "Repository Collaboration", type: "Lab", status: "Review" },
  { title: "Tagging releases", module: "Release Workflow", type: "Article", status: "Draft" },
];

const AdminLessons = () => {
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-normal text-gray-400">Lesson manager</p>
          <h1 className="mt-2 text-3xl font-bold">Lessons</h1>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-btn-primary px-5 py-2 text-sm font-semibold hover:bg-btn-primary-hover">
          <FaPlus />
          Add lesson
        </button>
      </header>

      <section className="overflow-hidden rounded-lg border border-default">
        <div className="grid grid-cols-[1.2fr_1fr_.6fr_.7fr_.9fr] border-b border-default px-5 py-3 text-xs uppercase text-gray-400">
          <span>Lesson</span>
          <span>Module</span>
          <span>Type</span>
          <span>Status</span>
          <span className="text-right">Actions</span>
        </div>

        {lessons.map((lesson) => (
          <div
            key={lesson.title}
            className="grid grid-cols-[1.2fr_1fr_.6fr_.7fr_.9fr] items-center border-b border-[#242424] px-5 py-4 last:border-b-0"
          >
            <p className="text-sm font-medium leading-6">{lesson.title}</p>
            <p className="text-sm leading-6 text-gray-400">{lesson.module}</p>
            <p className="text-sm leading-6 text-gray-400">{lesson.type}</p>
            <span className="w-fit rounded-lg border border-[#242424] px-3 py-1 text-xs text-gray-300">
              {lesson.status}
            </span>
            <div className="flex justify-end gap-2">
              <button className="rounded-lg border border-default p-2 hover:bg-[#161616]" aria-label="Preview lesson">
                <FaEye />
              </button>
              <button className="rounded-lg border border-default p-2 hover:bg-[#161616]" aria-label="Edit lesson">
                <FaRegEdit />
              </button>
              <button className="rounded-lg border border-red-900/70 p-2 text-red-300 hover:bg-red-950/30" aria-label="Delete lesson">
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default AdminLessons;
