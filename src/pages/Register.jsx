import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const register = async () => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", res.user.uid), {
        email,
        role: "user",
      });

      alert("Registration successful");

      navigate("/");

    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-10 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold">Register</h1>

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

      <button
        className="bg-green-600 text-white p-2"
        onClick={register}
      >
        Register
      </button>
    </div>
  );
}