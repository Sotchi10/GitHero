import DashSideBarRight from "./../../../layouts/dashboardlayout/DashSideBarRight";

const DashboardHome = ({ className = "" }) => {
  return (
    <>
      <section
        className={`flex min-h-full flex-col bg-[#080808] text-[#e0e0e0] px-4 py-8`}
      >
        <div className=" flex-1 overflow-hidden mt-5">
          <main className="h-full overflow-y-auto px-5">
            <div className="grid gap-6 xl:grid-cols-[1fr_280px]">
              {/* Left Content */}
              <div className="space-y-5">
                <p>Dasboard</p>
              </div>

              <DashSideBarRight title="Developers" link="See more developers" />
            </div>
          </main>
        </div>
      </section>
    </>
  );
};
export default DashboardHome;
