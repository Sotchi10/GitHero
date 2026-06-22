import { NavLink } from 'react-router-dom';

const DashSideBarRight = () => {
  return (
    <>
      {/* Right Sidebar */}
      <aside className="space-y-4">
        {/* Empty Placeholder Card */}
        <div className="h-64 rounded-xl border border-[#242424] bg-[#0d0d0d]" />

        {/* Workflow Hub Card */}
        <div className="overflow-hidden rounded-xl border border-[#242424] bg-[#111111]">
          <div className="border-b border-[#242424] px-5 py-4">
            <h3 className="text-sm font-medium text-white">Workflow Hub</h3>
          </div>

          <div className="px-5 py-4">
            <p className="mb-3 text-sm text-[#8a8a8a]">
              See what senior developers share regarding their progress of
              learning Git
            </p>

            <NavLink
              to="/community"
              className="text-sm text-blue-500 transition hover:underline"
            >
              Go to workflow hub →
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  );
};
export default DashSideBarRight;
