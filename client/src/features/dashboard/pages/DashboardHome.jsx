import { BookOpen, ClipboardCheck, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import DashSideBarRight from "../../../layouts/dashboardlayout/DashSideBarRight";
import { useAuth } from "../../../context/AuthContext";
import { getUserDashboardSummary } from "../../../api/apiModule";

const DashboardHome = ({ className = "" }) => {
  const { authUser } = useAuth();
  const streak = 6;
  const [learning, setLearning] = useState({
    completedModules: 0,
    totalModules: 0,
    completedLessons: 0,
    totalLessons: 0,
    overallProgress: 0,
    nextLesson: null,
  });
  const [progressLoading, setProgressLoading] = useState(true);
  const [progressError, setProgressError] = useState("");

  const loadLearningProgress = useCallback(async () => {
    try {
      setProgressError("");
      const { data } = await getUserDashboardSummary();
      setLearning({
        completedModules: data.completed_modules,
        totalModules: data.total_modules,
        completedLessons: data.completed_lessons,
        totalLessons: data.total_lessons,
        overallProgress: data.overall_progress,
        nextLesson: data.next_lesson && {
          moduleId: data.next_lesson.module_id,
          lessonId: data.next_lesson.lesson_id,
          moduleTitle: data.next_lesson.module_title,
          title: data.next_lesson.lesson_title,
        },
      });
    } catch (err) {
      setProgressError(
        err.response?.data?.message || "Failed to load learning progress.",
      );
    } finally {
      setProgressLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLearningProgress();
    window.addEventListener("focus", loadLearningProgress);
    window.addEventListener("learning-progress-updated", loadLearningProgress);
    return () => {
      window.removeEventListener("focus", loadLearningProgress);
      window.removeEventListener("learning-progress-updated", loadLearningProgress);
    };
  }, [loadLearningProgress]);

  const gitTips = [
    "Commit early, commit often.",
    "Small commits make debugging easier.",
    "Branches are cheap. Create them freely.",
    "Pull before you push.",
    "Write meaningful commit messages.",
    "Practice Git every day to build confidence.",
  ];

  const todayTip = gitTips[new Date().getDate() % gitTips.length];

  return (
    <section
      className={`flex min-h-full flex-col  text-[#e0e0e0] px-4 py-8 ${className}`}
    >
      <div className="mt-5 flex-1 overflow-hidden">
        <main className="h-full overflow-y-auto px-5">
          <div className="grid gap-6 xl:grid-cols-[1fr_280px]">
            {/* LEFT */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h1 className="text-[20px] font-semibold">
                  Welcome back, {authUser?.username}!
                </h1>

                <p className="mt-2 text-gray-400 text-[14px]">
                  Continue learning Git and GitHub with GitHero.
                </p>
              </div>
              {/* Statistics */}
              <div className="grid gap-5 md:grid-cols-3">
                {/* Streak */}
                <div className="rounded-xl border border-[#242424] bg-[#111111] p-6">
                  <Flame size={28} className="text-orange-500" />

                  <h3 className="mt-4 text-[16px] font-semibold">
                    Learning Streak
                  </h3>

                  <p className="mt-3 text-[22px] font-bold">{streak}</p>

                  <p className="text-sm text-gray-400 mt-2">Consecutive Days</p>
                </div>

                {/* Modules */}
                <div className="rounded-xl border border-[#242424] bg-[#111111] p-6">
                  <BookOpen size={28} className="text-green-500" />

                  <h3 className="mt-4 text-[16px] font-semibold">Modules</h3>

                  <p className="mt-3 text-[22px] font-bold">
                    {progressLoading
                      ? "…"
                      : `${learning.completedModules}/${learning.totalModules}`}
                  </p>

                  <p className="text-sm text-gray-400 mt-2">
                    Published Modules Completed
                  </p>
                </div>

                {/* Lessons */}
                <div className="rounded-xl border border-[#242424] bg-[#111111] p-6">
                  <ClipboardCheck size={28} className="text-purple-500" />

                  <h3 className="mt-4 text-[16px] font-semibold">
                    Lessons
                  </h3>

                  <p className="mt-3 text-[22px] font-bold">
                    {progressLoading
                      ? "…"
                      : `${learning.completedLessons}/${learning.totalLessons}`}
                  </p>

                  <p className="text-sm text-gray-400 mt-2">
                    Published Lessons Completed
                  </p>
                </div>
              </div>
              {/* Overall Progress */}
              <div className="rounded-xl border border-[#242424] bg-[#111111] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-[16px] font-semibold">
                      Overall Progress
                    </h2>

                    <p className="mt-2 text-sm text-gray-400">
                      {progressLoading
                        ? "Loading learning progress..."
                        : `${learning.completedModules} of ${learning.totalModules} published modules completed`}
                    </p>
                  </div>

                  <h1 className="text-[20px] font-bold text-blue-500">
                    {learning.overallProgress}%
                  </h1>
                </div>

                <div className="mt-6 h-2 w-full rounded-full bg-[#1d1d1d]">
                  <div
                    className="h-2 rounded-full bg-blue-500"
                    style={{
                      width: `${learning.overallProgress}%`,
                    }}
                  />
                </div>
              </div>

              {/* Learning Summary */}
              <div className="rounded-xl border border-[#242424] bg-[#111111] p-6">
                <h2 className="text-[16px] font-semibold mb-5">
                  Learning Summary
                </h2>

                <div className="grid gap-4 md:grid-cols-2">
                  <SummaryItem
                    label="Overall Progress"
                    value={`${learning.overallProgress}%`}
                  />

                  <SummaryItem
                    label="Lessons Completed"
                    value={`${learning.completedLessons}/${learning.totalLessons}`}
                  />

                  <SummaryItem
                    label="Modules Completed"
                    value={`${learning.completedModules}/${learning.totalModules}`}
                  />

                  <div className="rounded-lg bg-[#181818] p-4">
                    <p className="text-xs uppercase tracking-wider text-gray-400">
                      {learning.nextLesson ? "Continue Learning" : "Learning Status"}
                    </p>
                    {learning.nextLesson ? (
                      <Link
                        to={`/modules/${learning.nextLesson.moduleId}?lesson=${learning.nextLesson.lessonId}`}
                        className="mt-2 block text-[15px] font-semibold text-blue-500 hover:underline"
                      >
                        {learning.nextLesson.title} · {learning.nextLesson.moduleTitle}
                      </Link>
                    ) : (
                      <h3 className="mt-2 text-[15px] font-semibold">
                        {learning.totalLessons ? "All published lessons completed" : "No published lessons"}
                      </h3>
                    )}
                  </div>
                </div>
                {progressError && <p className="text-sm text-red-400">{progressError}</p>}
              </div>

              {/* Daily Git Tip */}
              <div className="rounded-xl border border-[#242424] bg-[#111111] p-6">
                <h2 className="text-[16px] font-semibold">Daily Git Tip</h2>

                <p className="mt-5 text-[16px] italic text-gray-300">
                  "{todayTip}"
                </p>
              </div>
            </div>

            {/* Right Sidebar */}
            <DashSideBarRight title="Developers" link="See more developers" />
          </div>
        </main>
      </div>
    </section>
  );
};

export default DashboardHome;

const SummaryItem = ({ label, value }) => {
  return (
    <div className="flex justify-between items-center rounded-lg bg-[#181818] p-4">
      <p className="text-xs uppercase tracking-wider text-gray-400">{label}</p>

      <h3 className="mt-2 text-[15px] font-semibold">{value}</h3>
    </div>
  );
};
