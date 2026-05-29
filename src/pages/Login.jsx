import { useState } from "react";

import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  sendPasswordResetEmail
} from "firebase/auth";
import { auth } from "../firebase/config";

import { useNavigate } from "react-router-dom";

import "../styles/auth.css";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      const userEmail =
        userCredential.user.email;

      // STORE EMAIL

      localStorage.setItem(
        "userEmail",
        userEmail
      );

      alert("Login Successful");

      // ADMIN LOGIN

      if (
        userEmail ===
        "ranjithkumartheeti961@gmail.com"
      ) {

        navigate("/admin");

      } else {

        navigate("/dashboard");
      }

    } catch (error) {

      console.log(error);

      alert(error.message);
    }
  };
const forgotPassword = async () => {

  if (!email) {

    alert("Enter your email");

    return;
  }

  try {

    await sendPasswordResetEmail(
      auth,
      email
    );

    alert(
      "Password reset email sent"
    );

  } catch (error) {

    console.log(error);

    alert("Failed to send email");
  }
};
  return (

    <div className="auth-page">

      <div className="auth-box">

        <h1>
          Login
        </h1>

        <form onSubmit={handleLogin}>

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
            Login
          </button>
<button
  type="button"
  onClick={forgotPassword}
  className="text-blue-500 mt-3"
>
  Forgot Password?
</button>
        </form>

        <p>

          Don't have account?

          <span
            onClick={() =>
              navigate("/register")
            }
          >
            {" "}Register
          </span>

        </p>

      </div>

    </div>
  );
}