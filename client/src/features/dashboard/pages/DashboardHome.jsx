import { BookOpen, ClipboardCheck, Flame } from "lucide-react";
import DashSideBarRight from "../../../layouts/dashboardlayout/DashSideBarRight";
import { useAuth } from "../../../context/AuthContext";

const DashboardHome = ({ className = "" }) => {
  const { authUser } = useAuth();
  // Demo data
  const overallProgress = 72;
  const streak = 6;

  const completedModules = 8;
  const totalModules = 12;

  const completedQuizzes = 10;
  const totalQuizzes = 15;

  const quizAverage = 86;

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
      className={`flex min-h-full flex-col bg-[#080808] text-[#e0e0e0] px-4 py-8 ${className}`}
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
                    {completedModules}/{totalModules}
                  </p>

                  <p className="text-sm text-gray-400 mt-2">
                    Lessons Completed
                  </p>
                </div>

                {/* Quiz */}
                <div className="rounded-xl border border-[#242424] bg-[#111111] p-6">
                  <ClipboardCheck size={28} className="text-purple-500" />

                  <h3 className="mt-4 text-[16px] font-semibold">
                    Quiz Average
                  </h3>

                  <p className="mt-3 text-[22px] font-bold">{quizAverage}%</p>

                  <p className="text-sm text-gray-400 mt-2">
                    {completedQuizzes}/{totalQuizzes} Completed
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
                      {completedModules} of {totalModules} modules completed
                    </p>
                  </div>

                  <h1 className="text-[20px] font-bold text-blue-500">
                    {overallProgress}%
                  </h1>
                </div>

                <div className="mt-6 h-2 w-full rounded-full bg-[#1d1d1d]">
                  <div
                    className="h-2 rounded-full bg-blue-500"
                    style={{
                      width: `${overallProgress}%`,
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
                    value={`${overallProgress}%`}
                  />

                  <SummaryItem
                    label="Current Streak"
                    value={`${streak} Days`}
                  />

                  <SummaryItem
                    label="Modules Completed"
                    value={`${completedModules}/${totalModules}`}
                  />

                  <SummaryItem
                    label="Quizzes Completed"
                    value={`${completedQuizzes}/${totalQuizzes}`}
                  />

                  <SummaryItem
                    label="Average Quiz Score"
                    value={`${quizAverage}%`}
                  />
                </div>
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
