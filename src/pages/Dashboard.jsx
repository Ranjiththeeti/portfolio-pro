import { useState, useEffect } from "react";

import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc
} from "firebase/firestore";

import { db } from "../firebase/config";

import { uploadToCloudinary } from "../services/upload";

export default function Dashboard() {

  // BASIC

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [headline, setHeadline] = useState("");
  const [about, setAbout] = useState("");

  // CONTACT

  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  // PROFESSIONAL

  const [skills, setSkills] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [projects, setProjects] = useState("");
  const [certifications, setCertifications] = useState("");

  // LINKS

  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");

  // THEME

  const [theme, setTheme] = useState("developer");

  // FILES

  const [photo, setPhoto] = useState(null);
  const [resume, setResume] = useState(null);

  // UI

  const [loading, setLoading] = useState(false);

  const [myPortfolio, setMyPortfolio] = useState(null);

  // FETCH PORTFOLIO

  const fetchPortfolioData = async (usernameValue) => {

    try {

      const q = query(
        collection(db, "portfolios"),
        where("username", "==", usernameValue)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {

        setMyPortfolio({
          id: querySnapshot.docs[0].id,
          ...querySnapshot.docs[0].data(),
        });
      }

    } catch (error) {

      console.log(error);
    }
  };

  // LIVE STATUS

  useEffect(() => {

    const interval = setInterval(() => {

      if (username) {

        fetchPortfolioData(username);
      }

    }, 2000);

    return () => clearInterval(interval);

  }, [username]);

  // LOAD DATA

  const loadPortfolioData = () => {

    if (!myPortfolio) return;

    setUsername(myPortfolio.username || "");
    setName(myPortfolio.name || "");
    setEmail(myPortfolio.email || "");
    setTitle(myPortfolio.title || "");
    setHeadline(myPortfolio.headline || "");
    setAbout(myPortfolio.about || "");

    setPhone(myPortfolio.phone || "");
    setLocation(myPortfolio.location || "");

    setSkills(myPortfolio.skills || "");
    setEducation(myPortfolio.education || "");
    setExperience(myPortfolio.experience || "");
    setProjects(myPortfolio.projects || "");
    setCertifications(myPortfolio.certifications || "");

    setGithub(myPortfolio.github || "");
    setLinkedin(myPortfolio.linkedin || "");

    setTheme(myPortfolio.theme || "developer");
  };

  // SUBMIT

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      // CHECK DUPLICATE USERNAME

      const existingQuery = query(
        collection(db, "portfolios"),
        where("username", "==", username)
      );

      const existingSnapshot = await getDocs(existingQuery);

      if (!existingSnapshot.empty && !myPortfolio) {

        alert("Username already taken");

        setLoading(false);

        return;
      }

      // UPLOAD FILES

      const photoURL = photo
        ? await uploadToCloudinary(photo)
        : myPortfolio?.photoURL;

      const resumeURL = resume
        ? await uploadToCloudinary(resume)
        : myPortfolio?.resumeURL;

      // DATA

      const portfolioData = {

        username,
        name,
        email,
        title,
        headline,
        about,

        phone,
        location,

        skills,
        education,
        experience,
        projects,
        certifications,

        github,
        linkedin,

        theme,

        photoURL,
        resumeURL,

        status: myPortfolio?.status || "pending",

        createdAt: new Date(),
      };

      // UPDATE

      if (myPortfolio) {

        const docRef = doc(
          db,
          "portfolios",
          myPortfolio.id
        );

        await updateDoc(
          docRef,
          portfolioData
        );

        alert("Portfolio Updated");

      } else {

        // CREATE

        await addDoc(
          collection(db, "portfolios"),
          portfolioData
        );

        alert("Portfolio Created");
      }

      // REFRESH

      await fetchPortfolioData(username);

    } catch (error) {

      console.log(error);

      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-gray-100 py-10 px-5">

      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-[40px] p-10">

        {/* HEADER */}

        <div className="text-center mb-10">

          <h1 className="text-5xl font-black text-blue-700">
            Portfolio Generator
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Build Your Professional Portfolio
          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* BASIC */}

          <input
            type="text"
            placeholder="Unique Username"
            className="border p-4 rounded-2xl w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Full Name"
            className="border p-4 rounded-2xl w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            className="border p-4 rounded-2xl w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Professional Title"
            className="border p-4 rounded-2xl w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Professional Headline"
            className="border p-4 rounded-2xl w-full"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
          />

          {/* ABOUT */}

          <textarea
            placeholder="About You"
            className="border p-4 rounded-2xl w-full h-36"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            required
          />

          {/* CONTACT */}

          <div className="grid md:grid-cols-2 gap-5">

            <input
              type="text"
              placeholder="Phone Number"
              className="border p-4 rounded-2xl"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <input
              type="text"
              placeholder="Location"
              className="border p-4 rounded-2xl"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

          </div>

          {/* THEME */}

          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="border p-4 rounded-2xl w-full"
          >

            <option value="developer">
              Developer Theme
            </option>

            <option value="minimal">
              Minimal Theme
            </option>

            <option value="glass">
              Glass Theme
            </option>

            <option value="creative">
              Creative Theme
            </option>

          </select>

          {/* PROFESSIONAL */}

          <textarea
            placeholder="Skills (comma separated)"
            className="border p-4 rounded-2xl w-full h-24"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />

          <textarea
            placeholder="Education Details"
            className="border p-4 rounded-2xl w-full h-28"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
          />

          <textarea
            placeholder="Work Experience"
            className="border p-4 rounded-2xl w-full h-28"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />

          <textarea
            placeholder="Projects"
            className="border p-4 rounded-2xl w-full h-28"
            value={projects}
            onChange={(e) => setProjects(e.target.value)}
          />

          <textarea
            placeholder="Certifications"
            className="border p-4 rounded-2xl w-full h-28"
            value={certifications}
            onChange={(e) => setCertifications(e.target.value)}
          />

          {/* LINKS */}

          <div className="grid md:grid-cols-2 gap-5">

            <input
              type="text"
              placeholder="GitHub URL"
              className="border p-4 rounded-2xl"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />

            <input
              type="text"
              placeholder="LinkedIn URL"
              className="border p-4 rounded-2xl"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />

          </div>

          {/* FILES */}

          <div className="grid md:grid-cols-2 gap-5">

            <div>

              <label className="font-semibold">
                Upload Profile Photo
              </label>

              <input
                type="file"
                accept="image/*"
                className="border p-3 rounded-2xl w-full mt-2"
                onChange={(e) => setPhoto(e.target.files[0])}
              />

            </div>

            <div>

              <label className="font-semibold">
                Upload Resume PDF
              </label>

              <input
                type="file"
                accept=".pdf"
                className="border p-3 rounded-2xl w-full mt-2"
                onChange={(e) => setResume(e.target.files[0])}
              />

            </div>

          </div>

          {/* STATUS */}

          {myPortfolio && (

            <div className="bg-gray-100 rounded-3xl p-6 mt-5">

              <h2 className="text-3xl font-bold mb-5">
                Portfolio Status
              </h2>

              <p className="text-xl">

                Status:

                <span className={`ml-3 font-bold ${
                  myPortfolio.status === "approved"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}>

                  {myPortfolio.status}

                </span>

              </p>

              {myPortfolio.status === "approved" && (

                <div className="flex gap-4 mt-6 flex-wrap">

                  <a
                    href={`/u/${myPortfolio.username}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl"
                  >
                    View Public Portfolio
                  </a>

                  <button
                    onClick={loadPortfolioData}
                    type="button"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-2xl"
                  >
                    Edit Portfolio
                  </button>

                </div>
              )}

            </div>
          )}

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-5 rounded-2xl w-full text-xl font-bold transition duration-300"
          >

            {loading
              ? "Processing..."
              : myPortfolio
                ? "Update Portfolio"
                : "Generate Portfolio"}

          </button>

        </form>

      </div>

    </div>
  );
}