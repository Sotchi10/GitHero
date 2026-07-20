import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MdLibraryBooks, MdOutlinePlayLesson } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";

import { getAdminDashboardSummary } from "../api/apiModule";

const errorMessage = (err) =>
  err.response?.data?.message || err.message || "Failed to load dashboard data";

const formatDate = (value) =>
  value ? new Date(value).toLocaleDateString() : "No date available";

const emptySummary = {
  modules: {},
  lessons: {},
  users: {},
  recent_modules: [],
  recent_lessons: [],
  modules_without_lessons: [],
};

const AdminDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getAdminDashboardSummary();
        const data = response.data ?? {};
        setSummary({
          ...emptySummary,
          ...data,
          recent_modules: data.recent_modules ?? [],
          recent_lessons: data.recent_lessons ?? [],
          modules_without_lessons: data.modules_without_lessons ?? [],
        });
      } catch (err) {
        setError(errorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const stats = useMemo(() => {
    if (!summary) return [];

    const modules = summary.modules ?? {};
    const lessons = summary.lessons ?? {};
    const users = summary.users ?? {};

    return [
      {
        label: "Modules",
        value: modules.total ?? 0,
        detail: `${modules.published ?? 0} published · ${modules.unpublished ?? 0} unpublished`,
        icon: MdLibraryBooks,
      },
      {
        label: "Lessons",
        value: lessons.total ?? 0,
        detail: `${lessons.with_pdf ?? 0} with PDFs · ${lessons.without_pdf ?? 0} without PDFs`,
        icon: MdOutlinePlayLesson,
      },
      {
        label: "Registered users",
        value: users.total ?? 0,
        detail: "All registered accounts",
        icon: PiStudentFill,
      },
      {
        label: "Modules without lessons",
        value: summary.modules_without_lessons?.length ?? 0,
        detail: "Need lesson content",
        icon: MdLibraryBooks,
      },
    ];
  }, [summary]);

  return (
    <div className="space-y-7">
      <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm uppercase text-gray-400">Admin dashboard</p>
          <h1 className="mt-2 text-3xl font-bold">Learning overview</h1>
        </div>
        <Link
          to="/admin/modules"
          className="rounded-lg bg-btn-primary px-5 py-2 text-center text-sm font-semibold hover:bg-btn-primary-hover"
        >
          Add module
        </Link>
      </header>

      {error && (
        <div className="rounded-lg border border-red-500 bg-red-500/10 p-4 text-red-400">
          {error}
        </div>
      )}

      {loading ? (
        <div className="rounded-lg border border-default p-6 text-gray-400">
          Loading dashboard data...
        </div>
      ) : summary ? (
        <>
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <article key={stat.label} className="rounded-lg border border-default p-5">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-white">{stat.label}</p>
                    <Icon className="text-xl text-gray-300" />
                  </div>
                  <p className="mt-3 text-3xl font-bold text-blue-500">{stat.value}</p>
                  <p className="mt-2 text-sm text-gray-400">{stat.detail}</p>
                </article>
              );
            })}
          </section>

          <section className="grid gap-4 xl:grid-cols-2">
            <article className="rounded-lg border border-default p-5">
              <h2 className="text-xl font-semibold">Recently updated modules</h2>
              <div className="mt-5 space-y-3">
                {summary.recent_modules?.length ? summary.recent_modules.map((module) => (
                  <Link key={module.module_id} to="/admin/modules" className="block rounded-lg border border-default p-3 hover:bg-[#161616]">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-medium">{module.title}</span>
                      <span className="text-xs text-gray-400">{module.is_published ? "Published" : "Unpublished"}</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-400">Updated {formatDate(module.updated_at)}</p>
                  </Link>
                )) : <p className="text-sm text-gray-400">No modules yet.</p>}
              </div>
            </article>

            <article className="rounded-lg border border-default p-5">
              <h2 className="text-xl font-semibold">Recently updated lessons</h2>
              <div className="mt-5 space-y-3">
                {summary.recent_lessons?.length ? summary.recent_lessons.map((lesson) => (
                  <Link key={lesson.lesson_id} to="/admin/lessons" className="block rounded-lg border border-default p-3 hover:bg-[#161616]">
                    <p className="font-medium">{lesson.title}</p>
                    <p className="mt-1 text-sm text-gray-400">{lesson.module_title} · Updated {formatDate(lesson.updated_at)}</p>
                  </Link>
                )) : <p className="text-sm text-gray-400">No lessons yet.</p>}
              </div>
            </article>
          </section>

          <section className="grid gap-4 xl:grid-cols-2">
            <article className="rounded-lg border border-default p-5">
              <h2 className="text-xl font-semibold">Modules without lessons</h2>
              <div className="mt-5 space-y-3">
                {summary.modules_without_lessons?.length ? summary.modules_without_lessons.map((module) => (
                  <Link key={module.module_id} to={`/admin/lessons?moduleId=${module.module_id}`} className="flex items-center justify-between rounded-lg border border-default p-3 hover:bg-[#161616]">
                    <span className="font-medium">{module.title}</span>
                    <span className="text-xs text-gray-400">Add lesson</span>
                  </Link>
                )) : <p className="text-sm text-gray-400">Every module has at least one lesson.</p>}
              </div>
            </article>

            <article className="rounded-lg border border-default p-5">
              <h2 className="text-xl font-semibold">Quick links</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <Link to="/admin/modules" className="rounded-lg border border-default p-3 text-sm font-medium hover:bg-[#161616]">Add or manage modules</Link>
                <Link to="/admin/lessons" className="rounded-lg border border-default p-3 text-sm font-medium hover:bg-[#161616]">Add or manage lessons</Link>
                <Link to="/admin/users" className="rounded-lg border border-default p-3 text-sm font-medium hover:bg-[#161616]">Manage users</Link>
              </div>
            </article>
          </section>
        </>
      ) : null}
    </div>
  );
};

export default AdminDashboard;
