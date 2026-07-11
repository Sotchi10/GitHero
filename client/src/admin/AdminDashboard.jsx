import { useEffect, useMemo, useState } from "react";
import { MdLibraryBooks, MdOutlinePlayLesson } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { RiPulseLine } from "react-icons/ri";

import modulesData from "../features/modules/data/modulesData";
import { getUsers, getDevelopers, getStudents } from "../api/apiCommunity";

const moduleProgress = [
  {
    name: "Git Fundamentals",
    progress: 86,
  },
  {
    name: "Collaboration Workflow",
    progress: 64,
  },
  {
    name: "Advanced Repository Tools",
    progress: 42,
  },
];

const AdminDashboard = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [studentsCount, setStudentsCount] = useState(0);
  const [developersCount, setDevelopersCount] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [usersRes, studentsRes, developersRes] = await Promise.all([
          getUsers(),
          getStudents(),
          getDevelopers(),
        ]);

        setUsersCount(usersRes.data.length);
        setStudentsCount(studentsRes.data.length);
        setDevelopersCount(developersRes.data.length);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load dashboard data",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const stats = useMemo(
    () => [
      {
        label: "Modules",
        value: modulesData.length,
        detail: "3 drafts",
        icon: MdLibraryBooks,
      },
      {
        label: "Lessons",
        value: 84,
        detail: "18 published this month",
        icon: MdOutlinePlayLesson,
      },
      {
        label: "Total Users",
        value: loading ? "..." : usersCount,
        detail: `${studentsCount} students · ${developersCount} developers`,
        icon: PiStudentFill,
      },
      {
        label: "Completion",
        value: "68%",
        detail: "Average course progress",
        icon: RiPulseLine,
      },
    ],
    [loading, usersCount, studentsCount, developersCount],
  );

  return (
    <div className="space-y-7">
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase text-gray-400">Admin dashboard</p>

          <h1 className="mt-2 text-3xl font-bold">Learning overview</h1>
        </div>

        <button className="rounded-lg bg-btn-primary px-5 py-2 text-sm font-semibold hover:bg-btn-primary-hover">
          Add module
        </button>
      </header>

      {error && (
        <div className="rounded-lg border border-red-500 bg-red-500/10 p-4 text-red-400">
          {error}
        </div>
      )}

      {/* Statistics */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.label}
              className="rounded-lg border border-default p-5"
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold text-white">{stat.label}</p>

                <Icon className="text-xl text-gray-300" />
              </div>

              <p className="mt-3 text-3xl font-bold text-blue-500">
                {stat.value}
              </p>

              <p className="mt-2 text-sm text-gray-400">{stat.detail}</p>
            </article>
          );
        })}
      </section>

      {/* Module Progress */}
      <section className="rounded-lg border border-default p-5">
        <h2 className="text-xl font-semibold">Module progress</h2>

        <div className="mt-5 space-y-4">
          {moduleProgress.map((module) => (
            <div key={module.name}>
              <div className="mb-2 flex justify-between text-sm">
                <span>{module.name}</span>

                <span className="text-gray-400">{module.progress}%</span>
              </div>

              <div className="h-2 rounded-full bg-[#161616]">
                <div
                  className="h-2 rounded-full bg-btn-primary"
                  style={{
                    width: `${module.progress}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
