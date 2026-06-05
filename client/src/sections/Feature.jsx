import { useState } from "react";

const features = [
  {
    id: 1,
    name: "Feature1",
    img: null,
    title: "Learn Git commands with context",
    subtitle:
      "See what each command does, when to use it, and what changes it makes before you run it.",
  },
  {
    id: 2,
    name: "Feature2",
    img: null,
    title: "Practice common workflows",
    subtitle:
      "Build confidence with branching, committing, merging, and undoing mistakes in guided examples.",
  },
  {
    id: 3,
    name: "Feature3",
    img: null,
    title: "Understand repository state",
    subtitle:
      "Translate confusing Git output into clear next steps so you know what your project needs.",
  },
  {
    id: 4,
    name: "Feature4",
    img: null,
    title: "Move from beginner to teammate",
    subtitle:
      "Learn the collaboration habits behind pull requests, reviews, conflict handling, and clean history.",
  },
];

const Feature = ({ sectionID }) => {
  const [selectedFeature, setSelectedFeature] = useState(features[0]);

  return (
    <>
      <section
        id={sectionID}
        className="flex flex-col items-center gap-12 px-40 py-10 pb-30"
      >
        <nav className="w-150 px-5 py-2 bg-transparent border border-default rounded-[25px]">
          <ul className="w-full flex items-center justify-between text-white">
            {features.map((f) => (
              <li key={f.id}>
                <button
                  type="button"
                  onClick={() => setSelectedFeature(f)}
                  className={`cursor-pointer rounded-[15px] font-semibold px-8 py-1.5 transition-colors hover:bg-[#363742a5] ${
                    selectedFeature.id === f.id ? "bg-[#363742a5] " : ""
                  }`}
                >
                  {f.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="w-full grid grid-cols-2 items-center gap-12">
          <div className="flex flex-col gap-4">
            <h4 className="font-bold">{selectedFeature.title}</h4>
            <p className="text-gray">{selectedFeature.subtitle}</p>
          </div>
          <div className="w-135 h-100 bg-gray-400 rounded-2xl justify-self-end">
            {selectedFeature.img && (
              <img
                src={selectedFeature.img}
                alt={selectedFeature.title}
                className="h-full w-full rounded-2xl object-cover"
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
};
export default Feature;
