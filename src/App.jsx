import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Admin from "./pages/Admin";

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