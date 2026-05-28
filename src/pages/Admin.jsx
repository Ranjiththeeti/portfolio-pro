import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase/config";

export default function Admin() {
const navigate = useNavigate();
  const [portfolios, setPortfolios] = useState([]);

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

 useEffect(() => {

  const email =
    localStorage.getItem("userEmail");

  // BLOCK NON-ADMIN USERS

  if (
    email !==
    "ranjithkumartheeti961@gmail.com"
  ) {

    alert("Access Denied");

    navigate("/");

    return;
  }

  // ADMIN ALLOWED

  fetchPortfolios();

}, []);

  // APPROVE

  const approvePortfolio = async (item) => {

  try {

    // UPDATE STATUS

    const docRef = doc(
      db,
      "portfolios",
      item.id
    );

    await updateDoc(docRef, {
      status: "approved",
    });

    // SEND EMAIL

    if (item.email) {

      await emailjs.send(

        "service_uymz8gw",

        "template_dxss7do",

        {
          name: item.name,

          email: item.email,

          portfolio_link:
            `https://ranjith-portfolio-pro.vercel.app/u/${item.username}`,
        },

        "bzl2trN7UOiEPLy7x"
      );
    }

    alert("Portfolio Approved & Email Sent");

    fetchPortfolios();

  } catch (error) {

    console.log(error);

    alert("Approval Failed");
  }
};

  // DELETE

  const deletePortfolio = async (item) => {

  try {

    // SEND DELETE EMAIL

    if (item.email) {

      await emailjs.send(

        "service_uymz8gw",

        "template_maod83p",

        {
          name: item.name,

          email: item.email,
        },

        "bzl2trN7UOiEPLy7x"
      );
    }

    // DELETE FROM FIRESTORE

    await deleteDoc(
      doc(db, "portfolios", item.id)
    );

    alert("Portfolio Deleted");

    fetchPortfolios();

  } catch (error) {

    console.log(error);

    alert("Delete Failed");
  }
};
  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">
        Admin Panel
      </h1>

      <div className="grid gap-8">

        {portfolios.map((item) => (

          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-lg p-6"
          >

            <div className="flex flex-col md:flex-row gap-6">

              {/* IMAGE */}

              <img
                src={item.photoURL}
                alt="profile"
                className="w-40 h-40 object-cover rounded-xl"
              />

              {/* DETAILS */}

              <div className="flex-1">

                <h2 className="text-2xl font-bold">
                  {item.name}
                </h2>

                <p className="text-blue-600 font-semibold mt-1">
                  {item.title}
                </p>

                <p className="mt-4 text-gray-700">
                  {item.about}
                </p>

                {/* STATUS */}

                <div className="mt-4">

                  <span
                    className={`px-4 py-2 rounded-full text-white font-semibold ${
                      item.status === "approved"
                        ? "bg-green-600"
                        : "bg-yellow-500"
                    }`}
                  >
                    {item.status}
                  </span>

                </div>

                {/* BUTTONS */}

                <div className="flex gap-4 mt-6 flex-wrap">

                  <a
                    href={`/u/${item.username}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-blue-600 text-white px-5 py-3 rounded-lg"
                  >
                    View Portfolio
                  </a>

                  <a
                    href={item.resumeURL}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-green-600 text-white px-5 py-3 rounded-lg"
                  >
                    Resume
                  </a>

                  {item.status !== "approved" && (

                    <button
                      onClick={() => approvePortfolio(item)}
                      className="bg-purple-600 text-white px-5 py-3 rounded-lg"
                    >
                      Approve
                    </button>
                  )}

                  <button
                    onClick={() => deletePortfolio(item)}
                    className="bg-red-600 text-white px-5 py-3 rounded-lg"
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
  );
}