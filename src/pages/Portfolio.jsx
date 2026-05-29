import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import {
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";

import { db } from "../firebase/config";

export default function Portfolio() {

  const { username } = useParams();

  const [portfolio, setPortfolio] = useState(null);

  const [loading, setLoading] = useState(true);
const navigate = useNavigate();
  useEffect(() => {

    const fetchPortfolio = async () => {

      try {

        const q = query(
          collection(db, "portfolios"),
          where("username", "==", username)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {

          const data = querySnapshot.docs[0].data();

          if (data.status !== "approved") {

            alert("Portfolio not approved");

            return;
          }

          setPortfolio(data);

        } else {

          alert("Portfolio not found");
        }

      } catch (error) {

        console.log(error);
      }

      setLoading(false);
    };

    fetchPortfolio();

  }, [username]);

  // LOADING

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-black text-white text-3xl font-bold">
        Loading...
      </div>
    );
  }

  // NOT FOUND

  if (!portfolio) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-black text-red-500 text-3xl font-bold">
        Portfolio Not Found
      </div>
    );
  }

  // THEMES

  const themes = {

    developer: {
      bg: "bg-gradient-to-br from-black via-gray-900 to-blue-950",
      card: "bg-white/10 border-white/20",
      text: "text-white",
      sub: "text-gray-300",
    },

    minimal: {
      bg: "bg-gray-100",
      card: "bg-white border-gray-200",
      text: "text-black",
      sub: "text-gray-700",
    },

    glass: {
      bg: "bg-gradient-to-br from-slate-900 to-gray-950",
      card: "bg-white/10 border-white/20 backdrop-blur-2xl",
      text: "text-white",
      sub: "text-gray-300",
    },

    creative: {
      bg: "bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600",
      card: "bg-white/10 border-white/20",
      text: "text-white",
      sub: "text-gray-200",
    },
  };

  const currentTheme =
    themes[portfolio.theme] ||
    themes.developer;

  // SECTION CARD

  const SectionCard = ({ title, content }) => {

    if (!content) return null;

    return (

      <div className="mt-10">

        <div className={`rounded-[32px] p-10 border shadow-2xl ${currentTheme.card}`}>

          <h2 className={`text-4xl font-black mb-6 ${currentTheme.text}`}>
            {title}
          </h2>

          <div className="h-[1px] bg-gray-400/30 mb-6"></div>

          <p className={`leading-9 text-lg whitespace-pre-line ${currentTheme.sub}`}>
            {content}
          </p>

        </div>

      </div>
    );
  };

  return (

    <div className={`min-h-screen ${currentTheme.bg}`}>

      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* HERO */}

        <div className={`rounded-[40px] p-10 border shadow-2xl ${currentTheme.card}`}>

          <div className="flex flex-col md:flex-row items-center gap-10">

            {/* IMAGE */}

            <img
              src={portfolio.photoURL}
              alt="profile"
              className="w-56 h-56 rounded-full object-cover border-4 border-cyan-400 shadow-2xl"
            />

            {/* DETAILS */}

            <div className="flex-1">

              <h1 className={`text-5xl md:text-6xl font-black ${currentTheme.text}`}>
                {portfolio.name}
              </h1>

              <p className="text-3xl text-cyan-400 mt-4 font-semibold">
                {portfolio.title}
              </p>

              {portfolio.headline && (

                <p className={`mt-6 text-lg leading-8 ${currentTheme.sub}`}>
                  {portfolio.headline}
                </p>
              )}

              {/* CONTACT */}

              <div className="flex flex-wrap gap-4 mt-8">

                {portfolio.location && (

                  <div className="bg-white/10 px-5 py-3 rounded-2xl">
                    📍 {portfolio.location}
                  </div>
                )}

                {portfolio.phone && (

                  <div className="bg-white/10 px-5 py-3 rounded-2xl">
                    📞 {portfolio.phone}
                  </div>
                )}

                {portfolio.email && (

                  <div className="bg-white/10 px-5 py-3 rounded-2xl">
                    📧 {portfolio.email}
                  </div>
                )}

              </div>

              {/* BUTTONS */}

              <div className="flex flex-wrap gap-5 mt-10">

                {portfolio.github && (

                  <a
                    href={portfolio.github}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-black hover:bg-gray-800 text-white px-7 py-4 rounded-2xl font-semibold transition duration-300"
                  >
                    GitHub
                  </a>
                )}

                {portfolio.linkedin && (

                  <a
                    href={portfolio.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-4 rounded-2xl font-semibold transition duration-300"
                  >
                    LinkedIn
                  </a>
                )}

                {portfolio.resumeURL && (

                  <a
                    href={portfolio.resumeURL}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white px-7 py-4 rounded-2xl font-semibold transition duration-300"
                  >
                    Download Resume
                  </a>
                )}

              </div>

            </div>

          </div>

        </div>

        {/* ABOUT */}

        <SectionCard
          title="About Me"
          content={portfolio.about}
        />

        {/* SKILLS */}

        {portfolio.skills && (

          <div className="mt-10">

            <div className={`rounded-[32px] p-10 border shadow-2xl ${currentTheme.card}`}>

              <h2 className={`text-4xl font-black mb-8 ${currentTheme.text}`}>
                Skills
              </h2>

              <div className="flex flex-wrap gap-4">

                {portfolio.skills
                  ?.split(",")
                  .map((skill, index) => (

                    <span
                      key={index}
                      className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg"
                    >
                      {skill.trim()}
                    </span>
                  ))}

              </div>

            </div>

          </div>
        )}

        {/* OTHER SECTIONS */}

        <SectionCard
          title="Education"
          content={portfolio.education}
        />

        <SectionCard
          title="Experience"
          content={portfolio.experience}
        />

        <SectionCard
          title="Projects"
          content={portfolio.projects}
        />

        <SectionCard
          title="Certifications"
          content={portfolio.certifications}
        />

        {/* FOOTER */}

        <div className={`text-center py-16 ${currentTheme.sub}`}>

          <p className="text-lg">
            Built with Portfolio Generator  @RanjithTheeti🚀
          </p>

        </div>

      </div>

    </div>
  );
}