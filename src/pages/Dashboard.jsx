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

  const [myPortfolio, setMyPortfolio] =
    useState(null);

  // AUTO LOAD USER PORTFOLIO

  useEffect(() => {

    const fetchUserPortfolio = async () => {

      try {

        const userEmail =
          localStorage.getItem("userEmail");

        if (!userEmail) return;

        const q = query(
          collection(db, "portfolios"),
          where("email", "==", userEmail)
        );

        const querySnapshot =
          await getDocs(q);

        if (!querySnapshot.empty) {

          const data =
            querySnapshot.docs[0].data();

          const id =
            querySnapshot.docs[0].id;

          const portfolioData = {
            id,
            ...data,
          };

          setMyPortfolio(portfolioData);

          // AUTO RESTORE FORM

          setUsername(data.username || "");
          setName(data.name || "");
          setTitle(data.title || "");
          setHeadline(data.headline || "");
          setAbout(data.about || "");

          setPhone(data.phone || "");
          setLocation(data.location || "");

          setSkills(data.skills || "");
          setEducation(data.education || "");
          setExperience(data.experience || "");
          setProjects(data.projects || "");
          setCertifications(
            data.certifications || ""
          );

          setGithub(data.github || "");
          setLinkedin(data.linkedin || "");

          setTheme(data.theme || "developer");
        }

      } catch (error) {

        console.log(error);
      }
    };

    fetchUserPortfolio();

  }, []);

  // SUBMIT

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      // CHECK USERNAME

      const existingQuery = query(
        collection(db, "portfolios"),
        where("username", "==", username)
      );

      const existingSnapshot =
        await getDocs(existingQuery);

      // BLOCK ONLY NEW USERS

      if (
        !existingSnapshot.empty &&
        !myPortfolio
      ) {

        alert("Username already taken");

        setLoading(false);

        return;
      }

      // FILE UPLOADS

      const photoURL = photo
        ? await uploadToCloudinary(photo)
        : myPortfolio?.photoURL;

      const resumeURL = resume
        ? await uploadToCloudinary(resume)
        : myPortfolio?.resumeURL;

      // DATA

      const portfolioData = {

        email:
          localStorage.getItem(
            "userEmail"
          ),

        username,
        name,
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

        // IMPORTANT

        status: "pending",

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

        alert(
          "Portfolio Updated Successfully. Waiting for admin approval."
        );

      } else {

        // CREATE

        await addDoc(
          collection(db, "portfolios"),
          portfolioData
        );

        alert(
          "Portfolio Created Successfully"
        );
      }

      // REFRESH DATA

      const refreshQuery = query(
        collection(db, "portfolios"),
        where(
          "email",
          "==",
          localStorage.getItem(
            "userEmail"
          )
        )
      );

      const refreshSnapshot =
        await getDocs(refreshQuery);

      if (!refreshSnapshot.empty) {

        const updatedData = {
          id:
            refreshSnapshot.docs[0].id,
          ...refreshSnapshot.docs[0].data(),
        };

        setMyPortfolio(updatedData);
      }

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

        {/* STATUS */}

        {myPortfolio && (

          <div className="mb-8 bg-gray-100 rounded-3xl p-6">

            <h2 className="text-2xl font-bold">
              Portfolio Status
            </h2>

            <p className="mt-3 text-lg">

              Status:

              <span className={`ml-3 font-bold ${
                myPortfolio.status ===
                "approved"
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}>

                {myPortfolio.status}

              </span>

            </p>

          </div>
        )}

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <input
            type="text"
            placeholder="Username"
            className="border p-4 rounded-2xl w-full"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            required
          />

          <input
            type="text"
            placeholder="Full Name"
            className="border p-4 rounded-2xl w-full"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />

          <input
            type="text"
            placeholder="Professional Title"
            className="border p-4 rounded-2xl w-full"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            required
          />

          <input
            type="text"
            placeholder="Headline"
            className="border p-4 rounded-2xl w-full"
            value={headline}
            onChange={(e) =>
              setHeadline(e.target.value)
            }
          />

          <textarea
            placeholder="About"
            className="border p-4 rounded-2xl w-full h-32"
            value={about}
            onChange={(e) =>
              setAbout(e.target.value)
            }
          />

          <div className="grid md:grid-cols-2 gap-5">

            <input
              type="text"
              placeholder="Phone"
              className="border p-4 rounded-2xl"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
            />

            <input
              type="text"
              placeholder="Location"
              className="border p-4 rounded-2xl"
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
            />

          </div>

          <textarea
            placeholder="Skills"
            className="border p-4 rounded-2xl w-full h-24"
            value={skills}
            onChange={(e) =>
              setSkills(e.target.value)
            }
          />

          <textarea
            placeholder="Education"
            className="border p-4 rounded-2xl w-full h-28"
            value={education}
            onChange={(e) =>
              setEducation(e.target.value)
            }
          />

          <textarea
            placeholder="Experience"
            className="border p-4 rounded-2xl w-full h-28"
            value={experience}
            onChange={(e) =>
              setExperience(e.target.value)
            }
          />

          <textarea
            placeholder="Projects"
            className="border p-4 rounded-2xl w-full h-28"
            value={projects}
            onChange={(e) =>
              setProjects(e.target.value)
            }
          />

          <textarea
            placeholder="Certifications"
            className="border p-4 rounded-2xl w-full h-28"
            value={certifications}
            onChange={(e) =>
              setCertifications(
                e.target.value
              )
            }
          />

          <div className="grid md:grid-cols-2 gap-5">

            <input
              type="text"
              placeholder="GitHub URL"
              className="border p-4 rounded-2xl"
              value={github}
              onChange={(e) =>
                setGithub(e.target.value)
              }
            />

            <input
              type="text"
              placeholder="LinkedIn URL"
              className="border p-4 rounded-2xl"
              value={linkedin}
              onChange={(e) =>
                setLinkedin(e.target.value)
              }
            />

          </div>

          {/* THEME */}

          <select
            value={theme}
            onChange={(e) =>
              setTheme(e.target.value)
            }
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

          {/* FILES */}

          <div className="grid md:grid-cols-2 gap-5">

            <div>

              <label className="font-semibold">
                Upload Photo
              </label>

              <input
                type="file"
                accept="image/*"
                className="border p-3 rounded-2xl w-full mt-2"
                onChange={(e) =>
                  setPhoto(
                    e.target.files[0]
                  )
                }
              />

            </div>

            <div>

              <label className="font-semibold">
                Upload Resume
              </label>

              <input
                type="file"
                accept=".pdf"
                className="border p-3 rounded-2xl w-full mt-2"
                onChange={(e) =>
                  setResume(
                    e.target.files[0]
                  )
                }
              />

            </div>

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-5 rounded-2xl w-full text-xl font-bold"
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