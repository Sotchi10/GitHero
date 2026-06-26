import { NavLink, useLocation } from "react-router-dom";
import DevCard from "./../../features/community/components/DevCard";
import { useEffect, useState } from "react";
import { getDevelopers, getPosts } from "../../api/apiCommunity";

const DashSideBarRight = ({ title, link }) => {
  const { pathname } = useLocation();
  const [developers, setDevelopers] = useState([]);
  const [postsCount, setPostsCount] = useState(0);

  useEffect(() => {
    if (pathname === "/references") return;

    const loadData = async () => {
      try {
        const [devRes, postRes] = await Promise.all([
          getDevelopers(),
          getPosts(5),
        ]);

        setDevelopers(devRes.data.slice(0, 4));
        setPostsCount(postRes.data.length);
      } catch (err) {
        console.log(err);
      }
    };

    loadData();
  }, [pathname]);

  return (
    <aside className="space-y-4">
      {/* Special UI for /community */}
      {pathname === "/community" ? (
        <div className="h-auto rounded-xl border border-[#242424] bg-[#0d0d0d]">
          <div className="border-[#242424] px-5 py-4 flex flex-col gap-4">
            <h3 className="text-[15px] font-medium text-white">What to know about GitHub Workflow?</h3>
            <p className="text-[14px]">
              See all posts that our developers shared and learn from them
            </p>
            <NavLink to="/community/posts">
              <button className="text-blue-500 cursor-pointer hover:underline text-[14px]">
                Click to read
              </button>
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <p className="text-[13px]">
            Total Community posts {postsCount}
          </p>
          <p className="text-[13px]">
            Total developers {developers.length}
          </p>
        </div>
      )}

      {/* Developers Card */}
      <div className="overflow-hidden rounded-xl border border-[#242424] bg-[#111111]">
        <div className="border-b border-[#242424] px-5 py-4">
          <h3 className="text-sm font-medium text-white">{title}</h3>
        </div>

        <div className="flex flex-col gap-4 px-5 py-4">
          <p className="text-[13px]">
            See what senior developers share regarding their Git learning journey
          </p>

          <div className="flex flex-col gap-2">
            {developers.length > 0 ? (
              developers.map((developer) => (
                <DevCard
                  key={developer.profile_id} // ✅ fixed key
                  developer={developer}
                />
              ))
            ) : (
              <p className="text-[13px] text-gray-400">
                No developers yet.
              </p>
            )}
          </div>

          <NavLink
            to={
              title.toLowerCase() === "developers"
                ? "/developers"
                : `/${title.toLowerCase()}`
            }
            className="text-sm text-blue-500 hover:underline"
          >
            {link}
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

export default DashSideBarRight;