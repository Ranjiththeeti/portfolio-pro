import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";

import Portfolio from "./pages/Portfolio";

export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* HOME */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* LOGIN */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* REGISTER */}

        <Route
          path="/register"
          element={<Register />}
        />

        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* ADMIN */}

        <Route
          path="/admin"
          element={<Admin />}
        />

        {/* PUBLIC PORTFOLIO */}

        <Route
          path="/u/:username"
          element={<Portfolio />}
        />

      </Routes>

    </BrowserRouter>
  );
}