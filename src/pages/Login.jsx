import "./Login.css";

import { useState } from "react";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";

import { auth } from "../firebase/config";

import { useNavigate } from "react-router-dom";

export default function Login() {

  const [isSignup, setIsSignup] =
    useState(false);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();

  // LOGIN

  const login = async (e) => {

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

      localStorage.setItem(
        "userEmail",
        userEmail
      );

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

  // REGISTER

  const register = async (e) => {

    e.preventDefault();

    try {

      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Account Created");

      setIsSignup(false);

    } catch (error) {

      console.log(error);

      alert(error.message);
    }
  };

  return (

    <div className="login-page">

      <div className={`auth-wrapper ${isSignup ? "toggled" : ""}`}>

        {/* SHAPES */}

        <div className="background-shape"></div>

        <div className="secondary-shape"></div>

        {/* LOGIN */}

        <div className="credentials-panel signin">

          <h2 className="slide-element">
            Login
          </h2>

          <form onSubmit={login}>

            <div className="field-wrapper slide-element">

              <input
                type="email"
                required
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

              <label>Email</label>

            </div>

            <div className="field-wrapper slide-element">

              <input
                type="password"
                required
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <label>Password</label>

            </div>

            <div className="field-wrapper slide-element">

              <button
                className="submit-button"
                type="submit"
              >
                Login
              </button>

            </div>

            <div className="switch-link slide-element">

              <p>

                Don't have an account?

                <br />

                <a
                  href="/#"
                  onClick={(e) => {

                    e.preventDefault();

                    setIsSignup(true);
                  }}
                >
                  Sign Up
                </a>

              </p>

            </div>

          </form>

        </div>

        {/* WELCOME */}

        <div className="welcome-section signin">

          <h2 className="slide-element">
            WELCOME BACK!
          </h2>

        </div>

        {/* REGISTER */}

        <div className="credentials-panel signup">

          <h2 className="slide-element">
            Register
          </h2>

          <form onSubmit={register}>

            <div className="field-wrapper slide-element">

              <input
                type="email"
                required
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

              <label>Email</label>

            </div>

            <div className="field-wrapper slide-element">

              <input
                type="password"
                required
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <label>Password</label>

            </div>

            <div className="field-wrapper slide-element">

              <button
                className="submit-button"
                type="submit"
              >
                Register
              </button>

            </div>

            <div className="switch-link slide-element">

              <p>

                Already have an account?

                <br />

                <a
                  href="/#"
                  onClick={(e) => {

                    e.preventDefault();

                    setIsSignup(false);
                  }}
                >
                  Sign In
                </a>

              </p>

            </div>

          </form>

        </div>

        {/* WELCOME */}

        <div className="welcome-section signup">

          <h2 className="slide-element">
            WELCOME!
          </h2>

        </div>

      </div>

    </div>
  );
}