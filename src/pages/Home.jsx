import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-6 border-b border-white/10">

        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="TRK"
            className="w-12 h-12 rounded-full"
          />

          <h1 className="text-2xl font-black text-cyan-400">
            Portfolio Generator
          </h1>
        </div>

        <div className="flex gap-4">

          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 font-bold transition"
          >
            Get Started
          </button>

        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div>

            <span className="bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-full">
              🚀 AI Powered Portfolio Builder
            </span>

            <h1 className="text-6xl md:text-7xl font-black mt-8 leading-tight">

              Create Your

              <span className="text-cyan-400">
                {" "}Professional Portfolio
              </span>

              <br />

              In Minutes

            </h1>

            <p className="text-gray-400 text-xl mt-8 leading-9">

              Build beautiful portfolios,
              upload resumes,
              get admin approval,
              and share your public profile
              with recruiters instantly.

            </p>

            <div className="flex flex-wrap gap-6 mt-10">

              <button
                onClick={() => navigate("/register")}
                className="bg-cyan-500 hover:bg-cyan-600 px-10 py-5 rounded-2xl text-xl font-bold transition"
              >
                Get Started
              </button>

              <button
                onClick={() => navigate("/login")}
                className="border border-white/20 px-10 py-5 rounded-2xl text-xl font-bold hover:bg-white/10 transition"
              >
                Login
              </button>

            </div>

          </div>

          {/* RIGHT */}
          <div className="flex justify-center">

            <img
              src="/logo.png"
              alt="TRK Logo"
              className="w-[400px] md:w-[500px] animate-pulse"
            />

          </div>

        </div>

      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <h2 className="text-5xl font-black text-center">

          Why Choose

          <span className="text-cyan-400">
            {" "}Portfolio Generator?
          </span>

        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-20">

          <div className="bg-white/10 p-8 rounded-3xl border border-white/10">

            <div className="text-5xl">🎨</div>

            <h3 className="text-2xl font-bold mt-5">
              Beautiful Themes
            </h3>

            <p className="text-gray-400 mt-4">
              Multiple premium portfolio themes.
            </p>

          </div>

          <div className="bg-white/10 p-8 rounded-3xl border border-white/10">

            <div className="text-5xl">📩</div>

            <h3 className="text-2xl font-bold mt-5">
              Email Notifications
            </h3>

            <p className="text-gray-400 mt-4">
              Automatic approval and rejection emails.
            </p>

          </div>

          <div className="bg-white/10 p-8 rounded-3xl border border-white/10">

            <div className="text-5xl">🚀</div>

            <h3 className="text-2xl font-bold mt-5">
              Instant Deployment
            </h3>

            <p className="text-gray-400 mt-4">
              Public portfolio links for every user.
            </p>

          </div>

        </div>

      </section>

      {/* STATS */}
      <section className="py-20 bg-white/5">

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">

          <div>
            <h2 className="text-6xl font-black text-cyan-400">
              100+
            </h2>

            <p className="text-gray-400 mt-3">
              Portfolios Created
            </p>
          </div>

          <div>
            <h2 className="text-6xl font-black text-purple-400">
              24/7
            </h2>

            <p className="text-gray-400 mt-3">
              Cloud Access
            </p>
          </div>

          <div>
            <h2 className="text-6xl font-black text-pink-400">
              AI
            </h2>

            <p className="text-gray-400 mt-3">
              Smart Builder
            </p>
          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10 text-center">

        <p className="text-gray-500 text-lg">
          Built with ❤️ by Ranjith Theeti
        </p>

      </footer>

    </div>
  );
}