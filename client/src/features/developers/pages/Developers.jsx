import { useEffect, useState } from "react";
import { getDevelopers } from "../../../api/apiCommunity";
import DevCard from "../../community/components/DevCard";
import { NavLink } from "react-router-dom";

const Developers = () => {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getDevelopers()
      .then((res) => {
        if (!active) return;
        setDevelopers(res.data);
        setError("");
      })
      .catch((err) => {
        if (!active) return;
        setError(err.response?.data?.message || "Failed to load developers");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="min-h-full px-30 py-8 text-[#e0e0e0]">
      <div className="w-full">
        <h4 className="mb-5">Developers</h4>

        {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

        {loading ? (
          <p className="text-sm text-gray-400">Loading developers...</p>
        ) : developers.length > 0 ? (
          <div className=" w-full gap-4 ">
            <div className="w-full rounded border border-[#242424] bg-[#0d0d0d] px-8 py-4">
              <div className="w-full flex flex-col gap-5">
                {developers.map((developer, index) => (
                  <div key={index} className="grid grid-cols-3 items-center">
                    <div>
                      <DevCard developer={developer} />
                    </div>
                    <div className="text-gray-400">
                      <p className="text-[12px]">
                        {developer.bio === null ? "No Bio" : developer.bio}
                        </p>
                    </div>
                    <div className="flex justify-end">
                      <NavLink to={`/profile/${developer.username}`}>
                        <button className="text-[12px] cursor-pointer border-default border px-2 py-1 rounded-sm">View Profile</button>
                      </NavLink>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-400">No developers found.</p>
        )}
      </div>
    </section>
  );
};

export default Developers;
