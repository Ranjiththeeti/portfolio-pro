import React, { useMemo } from "react";
import { GRADIENTS } from "./ThemeSelector";

function cx(...a) {
  return a.filter(Boolean).join(" ");
}

export default function PortfolioCard({ data }) {
  const gradient = useMemo(() => data.theme || GRADIENTS[0], [data.theme]);
  const skills = (data.skills || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div
      className={cx(
        "rounded-3xl p-8 sm:p-12 shadow-2xl",
        `bg-gradient-to-br ${gradient}`
      )}
    >
      <div className="grid grid-cols-1 sm:grid-cols-[1.5fr_1fr] gap-8 items-center">
        {/* Left Content */}
        <div>
          <h2 className="text-lg font-bold tracking-wide text-purple-900 uppercase">
            {data.name?.toUpperCase() || "YOUR NAME"}
          </h2>

          <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">
            🚀 Exploring the World of{" "}
            {data.name || "Your Name"}
          </h1>

          <p className="mt-5 text-slate-700 leading-relaxed text-base">
            {data.about ||
              "Write something about yourself, your goals, and what excites you."}
          </p>

          {/* Resume Download */}
          {data.resumeUrl ? (
            <a
              href={data.resumeUrl}
              download="resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-6 px-6 py-3 rounded-full bg-purple-600 text-white font-semibold shadow-md hover:bg-purple-700 transition"
            >
              📄 Download Resume
            </a>
          ) : (
            <p className="mt-6 text-sm italic text-slate-600">
              No resume uploaded yet
            </p>
          )}
        </div>

        {/* Right Profile Image */}
        <div className="justify-self-center">
          {data.photoUrl ? (
            <img
              src={data.photoUrl}
              alt="profile"
              className="w-60 h-60 sm:w-72 sm:h-72 object-cover rounded-2xl shadow-xl"
            />
          ) : (
            <div className="w-60 h-60 sm:w-72 sm:h-72 rounded-2xl bg-white/60 grid place-items-center text-slate-600">
              Upload a profile image in the form
            </div>
          )}
        </div>
      </div>

      {/* Skills Section */}
      {skills.length > 0 && (
        <div className="mt-10 rounded-2xl bg-white p-5 sm:p-6 shadow">
          <h3 className="text-center font-semibold tracking-wide text-slate-900">
            Skills
          </h3>
          <div className="mt-4 flex flex-wrap gap-3 justify-center">
            {skills.map((s, i) => (
              <span
                key={i}
                className="px-4 py-1 rounded-full bg-slate-100 border text-sm font-medium"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects Section */}
      {Array.isArray(data.projects) && data.projects.length > 0 && (
        <div className="mt-10">
          <h3 className="text-center font-semibold tracking-wide text-slate-900">
            Projects
          </h3>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {data.projects.map((p, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition"
              >
                <div className="mt-2 font-semibold text-slate-900">
                  {p.title || `Project ${i + 1}`}
                </div>
                <p className="text-slate-600 text-sm mt-1">
                  {p.desc || "Add description"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
