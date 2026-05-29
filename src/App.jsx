import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Portfolio from "./pages/Portfolio";

export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* LOGIN PAGE */}

        <Route
          path="/"
          element={<Login />}
        />

        {/* USER DASHBOARD */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* ADMIN PANEL */}

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