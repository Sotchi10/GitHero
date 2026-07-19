import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import DevCard from "../../features/community/components/DevCard";
import { getDevelopers, getPosts } from "../../api/apiCommunity";

const DashSideBarRight = ({ title, link }) => {
  const { pathname } = useLocation();

  const [developers, setDevelopers] = useState([]);
  const [postsCount, setPostsCount] = useState(0);

  const activities = [
    "Ali updated index.js",
    "John created utils.js",
    "Sara edited README.md",
    "Mike deleted old.js",
  ];

  const isRef = pathname.startsWith("/references");
  const isCommunity = pathname.startsWith("/community");
  const isDashboard = pathname.startsWith("/dashboard");
  const isDevpath = pathname.startsWith("/developers");

  useEffect(() => {
    if (isRef) return;

    const loadData = async () => {
      try {
        const [devRes, postRes] = await Promise.all([
          getDevelopers(),
          getPosts(5),
        ]);

        setDevelopers(devRes.data.slice(0, 4));
        setPostsCount(postRes.data.length);
      } catch (err) {
        console.error(err);
      }
    };

    loadData();
  }, [isRef]);

  /* ---------------- References ---------------- */

  if (isRef) {
    return (
      <aside className="space-y-4">
        <LinkCard
          title="What to know about GitHub Workflow?"
          desc="See all posts that our developers shared and learn from them."
          link="/developers"
          linkTitle="See developer posts"
        />
      </aside>
    );
  }

  /* ---------------- Community ---------------- */

  if (isCommunity) {
    return (
      <aside className="space-y-4">
        <LinkCard
          title="What to know about GitHub Workflow?"
          desc="See all posts that our developers shared and learn from them."
          link="/developers"
          linkTitle="See all developers"
        />
      </aside>
    );
  }

  /* ---------------- Dashboard ---------------- */

  if (isDashboard) {
    return (
      <aside className="space-y-4">
        <aside className="space-y-4">
          <LinkCard
            title="Current Platform Status"
            desc={`Total Community posts ${postsCount} Total developers ${developers.length}`}
            link="/community"
            linkTitle="See community posts"
          />
        </aside>
      </aside>
    );
  }

  /* ---------------- Developers ---------------- */

  if (isDevpath) {
    return (
      <aside className="space-y-4">
        <div className="overflow-hidden rounded-xl border border-[#242424] bg-[#111111]">
          <div className="border-b border-[#242424] px-5 py-4">
            <h3 className="text-sm font-medium text-white">{title}</h3>
          </div>

          <div className="flex flex-col gap-4 px-5 py-4">
            <p className="text-[13px]">
              See what senior developers share regarding their Git learning
              journey.
            </p>

            <div className="flex flex-col gap-2">
              {developers.length ? (
                developers.map((developer) => (
                  <DevCard key={developer.profile_id} developer={developer} />
                ))
              ) : (
                <p className="text-[13px] text-gray-400">No developers yet.</p>
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
  }

  /* ---------------- Default ---------------- */

  //return (
  //  <aside className="space-y-4">
  //    <div className="rounded-xl border border-[#242424] bg-[#0d0d0d] p-4">
  //      <h3 className="mb-3 font-semibold">Activity</h3>

  //      <ul className="space-y-2 text-sm text-gray-400">
  //        {activities.map((item, index) => (
  //          <li
  //            key={index}
  //            className="rounded bg-[#161b22] p-2"
  //          >
  //            {item}
  //          </li>
  //        ))}
  //      </ul>
  //    </div>
  //  </aside>
  //);
};

export default DashSideBarRight;

/* -------------------------------------------------------------------------- */

const LinkCard = ({ title, desc, linkTitle, link }) => (
  <div className="rounded-xl border border-[#242424] bg-[#0d0d0d]">
    <div className="flex flex-col gap-4 px-5 py-4">
      <h3 className="text-[15px] font-medium text-white">{title}</h3>

      <p className="text-[14px]">{desc}</p>

      <NavLink to={link} className="text-[14px] text-blue-500 hover:underline">
        {linkTitle}
      </NavLink>
    </div>
  </div>
);
