import { useEffect, useMemo, useState } from "react";
import { FiSearch, FiUsers } from "react-icons/fi";
import { getUsers, getStudents, getDevelopers } from "../api/apiCommunity";
import Avatar from "./../features/profile/components/Avatar";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [students, setStudents] = useState([]);
  const [developers, setDevelopers] = useState([]);

  const [role, setRole] = useState("all");
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const [usersRes, studentsRes, developersRes] = await Promise.all([
          getUsers(),
          getStudents(),
          getDevelopers(),
        ]);

        setUsers(usersRes.data);
        setStudents(studentsRes.data);
        setDevelopers(developersRes.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchRole = role === "all" || user.role.toLowerCase() === role;

      const keyword = search.toLowerCase();

      const matchSearch =
        user.full_name?.toLowerCase().includes(keyword) ||
        user.username?.toLowerCase().includes(keyword);

      return matchRole && matchSearch;
    });
  }, [users, role, search]);

  if (loading) {
    return <div className="p-6 text-gray-400">Loading users...</div>;
  }

  return (
    <div className="space-y-7">
      {/* Header */}
      <header>
        <p className="text-sm uppercase text-gray-400">Admin dashboard</p>

        <h1 className="mt-2 text-3xl font-bold">User Management</h1>

        <p className="mt-2 text-sm text-gray-400">
          Manage registered students and developers
        </p>
      </header>

      {error && (
        <div className="rounded-lg border border-red-500 bg-red-500/10 p-4 text-red-400">
          {error}
        </div>
      )}

      {/* Summary */}
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-default p-5">
          <FiUsers className="text-xl text-gray-300" />

          <p className="mt-3 text-3xl font-bold">{users.length}</p>

          <p className="text-[13px] text-gray-400">Total users</p>
        </div>

        <div className="rounded-lg border border-default p-5">
          <p className="text-3xl font-bold">{students.length}</p>

          <p className="text-[13px]  text-gray-400">Students</p>
        </div>

        <div className="rounded-lg border border-default p-5">
          <p className="text-3xl font-bold">{developers.length}</p>

          <p className="text-[13px] text-gray-400">Developers</p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />

          <input
            type="text"
            placeholder="Search username or name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-[14px] w-full rounded-lg border border-default bg-transparent py-2 pl-10 pr-4 outline-none"
          />
        </div>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="rounded-lg  text-[14px] border border-default px-4 "
        >
          <option className="bg-[#111] rounded-[12px]" value="all">
            All Users
          </option>
          <option className="bg-[#111] rounded-[12px]" value="student">
            Students
          </option>
          <option className="bg-[#111] rounded-[12px]" value="developer">
            Developers
          </option>
        </select>
      </section>

      {/* Users Table */}
      <section className="overflow-hidden rounded-lg border border-default">
        <table className="w-full">
          <thead className="bg-[#111]">
            <tr className="text-left text-sm text-gray-400">
              <th className="p-4">User</th>
              <th className="p-4">Username</th>
              <th className="p-4">Role</th>
              <th className="p-4">Bio</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.user_id} className="border-t border-default">
                <td className="p-4 flex items-center gap-3">
                  <Avatar profile={user} />

                  <div>
                    <p className="text-sm font-semibold">{user.full_name}</p>

                    <p className="text-[14px] text-gray-400">
                      ID: {user.user_id}
                    </p>
                  </div>
                </td>

                <td className="text-[14px] p-4">{user.username}</td>

                <td className="p-4">
                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-[12px] text-blue-400">
                    {user.role}
                  </span>
                </td>

                <td className="max-w-xs truncate p-4 text-[14px] text-gray-400">
                  {user.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminUsers;
