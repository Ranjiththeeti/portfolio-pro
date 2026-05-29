import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import emailjs from "@emailjs/browser";

import {
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db, auth } from "../firebase/config";

export default function Admin() {

  const navigate = useNavigate();

  const [portfolios, setPortfolios] = useState([]);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("all");

  // ADMIN CHECK

  useEffect(() => {

    const adminEmail =
      localStorage.getItem("userEmail");

    if (
      adminEmail !==
      "ranjithkumartheeti961@gmail.com"
    ) {

      navigate("/login");

      return;
    }

    fetchPortfolios();

  }, []);

  // FETCH PORTFOLIOS

  const fetchPortfolios = async () => {

    try {

      const querySnapshot = await getDocs(
        collection(db, "portfolios")
      );

      const data = querySnapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
      }));

      setPortfolios(data);

    } catch (error) {

      console.log(error);
    }
  };

  // APPROVE PORTFOLIO

  const approvePortfolio = async (item) => {

    try {

      const docRef = doc(
        db,
        "portfolios",
        item.id
      );

      await updateDoc(docRef, {
        status: "approved",
      });

      // SEND EMAIL TO USER

      if (item.email) {

        await emailjs.send(

          "service_uymz8gw",

          "template_dxss7do",

          {
            name: item.name,

            email: item.email,

            portfolio_link:
              `https://portfolio-pro-ranjith.vercel.app/u/${item.username}`,
          },

          "bzl2trN7UOiEPLy7x"
        );
      }

      alert(
        "Portfolio Approved & Email Sent"
      );

      fetchPortfolios();

    } catch (error) {

      console.log(error);

      alert("Approval Failed");
    }
  };

  // DELETE PORTFOLIO

  const deletePortfolio = async (item) => {

    const confirmDelete =
      window.confirm(
        "Delete this portfolio?"
      );

    if (!confirmDelete) return;

    try {

      await deleteDoc(
        doc(db, "portfolios", item.id)
      );

      alert("Portfolio Deleted");

      fetchPortfolios();

    } catch (error) {

      console.log(error);
    }
  };

  // RESET PASSWORD

  const resetPassword = async () => {

    try {

      const email =
        localStorage.getItem("userEmail");

      await sendPasswordResetEmail(
        auth,
        email
      );

      alert(
        "Password reset email sent"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Failed to send reset email"
      );
    }
  };

  // LOGOUT

  const logout = async () => {

    await signOut(auth);

    localStorage.removeItem(
      "userEmail"
    );

    navigate("/login");
  };

  // FILTER

  const filteredPortfolios =
    portfolios.filter((item) => {

      const matchesSearch =

        item.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        item.username
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesFilter =

        filter === "all"
          ? true
          : item.status === filter;

      return (
        matchesSearch &&
        matchesFilter
      );
    });

  // STATS

  const totalPortfolios =
    portfolios.length;

  const approvedPortfolios =
    portfolios.filter(
      (p) =>
        p.status === "approved"
    ).length;

  const pendingPortfolios =
    portfolios.filter(
      (p) =>
        p.status !== "approved"
    ).length;

  return (

    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}

      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white p-6 shadow-xl">

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

          {/* LEFT */}

          <div>

            <h1 className="text-4xl font-black">
              Welcome Ranjith Theeti 👋
            </h1>

            <p className="text-blue-100 mt-2 text-lg">
              Portfolio Management System
            </p>

          </div>

          {/* RIGHT */}

          <div className="flex gap-4 flex-wrap">

            <button
              onClick={resetPassword}
              className="bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-xl font-semibold transition"
            >
              Change Password
            </button>

            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl font-semibold transition"
            >
              Logout
            </button>

          </div>

        </div>

      </div>

      {/* CONTENT */}

      <div className="max-w-7xl mx-auto p-6">

        {/* STATS */}

        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <h2 className="text-gray-500 text-lg">
              Total Portfolios
            </h2>

            <p className="text-5xl font-black mt-3 text-blue-700">
              {totalPortfolios}
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <h2 className="text-gray-500 text-lg">
              Approved
            </h2>

            <p className="text-5xl font-black mt-3 text-green-600">
              {approvedPortfolios}
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <h2 className="text-gray-500 text-lg">
              Pending
            </h2>

            <p className="text-5xl font-black mt-3 text-yellow-500">
              {pendingPortfolios}
            </p>

          </div>

        </div>

        {/* SEARCH */}

        <div className="bg-white rounded-3xl shadow-lg p-6 mb-8 flex flex-col md:flex-row gap-4">

          <input
            type="text"
            placeholder="Search by name or username"
            className="flex-1 border p-4 rounded-2xl outline-none"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <select
            className="border p-4 rounded-2xl outline-none"
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
          >

            <option value="all">
              All
            </option>

            <option value="approved">
              Approved
            </option>

            <option value="pending">
              Pending
            </option>

          </select>

        </div>

        {/* PORTFOLIOS */}

        <div className="grid gap-8">

          {filteredPortfolios.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-3xl shadow-xl p-6"
            >

              <div className="flex flex-col lg:flex-row gap-8">

                {/* IMAGE */}

                <img
                  src={item.photoURL}
                  alt="profile"
                  className="w-48 h-48 rounded-3xl object-cover"
                />

                {/* DETAILS */}

                <div className="flex-1">

                  <div className="flex flex-col md:flex-row justify-between gap-4">

                    <div>

                      <h2 className="text-4xl font-black text-gray-800">
                        {item.name}
                      </h2>

                      <p className="text-blue-600 text-xl font-semibold mt-2">
                        {item.title}
                      </p>

                    </div>

                    <div>

                      <span
                        className={`px-5 py-3 rounded-full text-white font-bold ${
                          item.status === "approved"
                            ? "bg-green-600"
                            : "bg-yellow-500"
                        }`}
                      >
                        {item.status}
                      </span>

                    </div>

                  </div>

                  <p className="mt-6 text-gray-600 leading-8">
                    {item.about}
                  </p>

                  {/* INFO */}

                  <div className="grid md:grid-cols-2 gap-4 mt-6">

                    <div className="bg-gray-100 p-4 rounded-2xl">

                      <p className="font-bold">
                        Username
                      </p>

                      <p>
                        {item.username}
                      </p>

                    </div>

                    <div className="bg-gray-100 p-4 rounded-2xl">

                      <p className="font-bold">
                        Email
                      </p>

                      <p>
                        {item.email}
                      </p>

                    </div>

                  </div>

                  {/* BUTTONS */}

                  <div className="flex flex-wrap gap-4 mt-8">

                    <a
                      href={`/u/${item.username}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-semibold transition"
                    >
                      View Portfolio
                    </a>

                    <a
                      href={item.resumeURL}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-2xl font-semibold transition"
                    >
                      Resume
                    </a>

                    {item.status !==
                      "approved" && (

                      <button
                        onClick={() =>
                          approvePortfolio(item)
                        }
                        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-4 rounded-2xl font-semibold transition"
                      >
                        Approve
                      </button>
                    )}

                    <button
                      onClick={() =>
                        deletePortfolio(item)
                      }
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-2xl font-semibold transition"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}