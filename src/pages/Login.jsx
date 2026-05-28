import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const login = async () => {

  try {

    const userCredential =
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

    // SAVE USER EMAIL

    localStorage.setItem(
      "userEmail",
      userCredential.user.email
    );

    alert("Login successful");

    // ADMIN CHECK

    if (
      userCredential.user.email ===
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
};  return (
    <div className="flex flex-col gap-4 p-10 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold">Login</h1>

      <input
        className="border p-2"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="border p-2"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="bg-blue-500 text-white p-2" onClick={login}>
        Login
      </button>
    </div>
  );
}