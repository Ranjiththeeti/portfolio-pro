import { useState } from "react";

import {
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../firebase/config";

import { useNavigate } from "react-router-dom";

import "../styles/auth.css";

export default function Register() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert(
        "Registration Successful"
      );

      // REDIRECT TO LOGIN

      navigate("/login");

    } catch (error) {

      console.log(error);

      alert(error.message);
    }
  };

  return (

    <div className="auth-page">

      <div className="auth-box">

        <h1>
          Create Account
        </h1>

        <form onSubmit={handleRegister}>

          <input
            type="email"
            placeholder="Enter Email"
            required
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Enter Password"
            required
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button type="submit">
            Register
          </button>

        </form>

        <p>

          Already have account?

          <span
            onClick={() =>
              navigate("/login")
            }
          >
            {" "}Login
          </span>

        </p>

      </div>

    </div>
  );
}