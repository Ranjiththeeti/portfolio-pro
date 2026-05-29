import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();

  return (

    <div className="min-h-screen bg-black text-white overflow-hidden">

      {/* HERO SECTION */}

      <div className="relative min-h-screen flex items-center justify-center px-6">

        {/* BACKGROUND GLOW */}

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500 rounded-full blur-[180px] opacity-20"></div>

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500 rounded-full blur-[180px] opacity-20"></div>

        {/* CONTENT */}

        <div className="relative z-10 max-w-7xl w-full grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT */}

          <div>

            <p className="text-cyan-400 font-bold tracking-[4px] uppercase">
              AI Powered Portfolio Platform
            </p>

            <h1 className="text-6xl md:text-7xl font-black leading-tight mt-6">

              Build Your
              <span className="text-cyan-400">
                {" "}Dream Portfolio
              </span>

              <br />

              In Minutes 🚀

            </h1>

            <p className="text-gray-400 text-xl leading-10 mt-8">

              Create stunning portfolios,
              upload resumes,
              manage approvals,
              share your public profile,
              and impress recruiters instantly.

            </p>

            {/* BUTTONS */}

            <div className="flex flex-wrap gap-6 mt-12">

              <button
                onClick={() => navigate("/login")}
                className="bg-cyan-500 hover:bg-cyan-600 px-10 py-5 rounded-2xl text-xl font-bold shadow-2xl hover:scale-105 transition duration-300"
              >
                Get Started
              </button>

              <button
                onClick={() => navigate("/login")}
                className="border border-white/20 bg-white/10 hover:bg-white/20 px-10 py-5 rounded-2xl text-xl font-bold backdrop-blur-xl hover:scale-105 transition duration-300"
              >
                Login
              </button>

            </div>

            {/* STATS */}

            <div className="flex flex-wrap gap-10 mt-16">

              <div>

                <h2 className="text-4xl font-black text-cyan-400">
                  100+
                </h2>

                <p className="text-gray-400 mt-2">
                  Portfolios Created
                </p>

              </div>

              <div>

                <h2 className="text-4xl font-black text-purple-400">
                  24/7
                </h2>

                <p className="text-gray-400 mt-2">
                  Cloud Access
                </p>

              </div>

              <div>

                <h2 className="text-4xl font-black text-pink-400">
                  AI
                </h2>

                <p className="text-gray-400 mt-2">
                  Smart Portfolio Builder
                </p>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="relative">

            {/* MAIN CARD */}

            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[40px] p-8 shadow-2xl">

              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                alt="portfolio"
                className="rounded-3xl shadow-2xl"
              />

              <div className="mt-8">

                <h2 className="text-3xl font-black">
                  Modern Portfolio Experience
                </h2>

                <p className="text-gray-300 mt-4 leading-8">

                  Beautiful themes,
                  real-time approvals,
                  admin dashboard,
                  email notifications,
                  resume hosting,
                  and custom portfolio links.

                </p>

              </div>

            </div>

            {/* FLOATING CARDS */}

            <div className="absolute -top-8 -left-8 bg-cyan-500 px-6 py-4 rounded-2xl shadow-2xl animate-bounce">

              ⚡ Fast Deployment

            </div>

            <div className="absolute -bottom-8 -right-8 bg-purple-500 px-6 py-4 rounded-2xl shadow-2xl animate-pulse">

              🔥 Premium UI

            </div>

          </div>

        </div>

      </div>

      {/* FEATURES */}

      <div className="py-24 px-6">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-5xl font-black text-center">

            Why Choose
            <span className="text-cyan-400">
              {" "}Portfolio Generator?
            </span>

          </h2>

          <div className="grid md:grid-cols-3 gap-10 mt-20">

            {/* CARD */}

            <div className="bg-white/10 border border-white/10 rounded-[32px] p-10 hover:scale-105 transition duration-300 backdrop-blur-xl">

              <div className="text-6xl">
                🎨
              </div>

              <h3 className="text-3xl font-bold mt-6">
                Beautiful Designs
              </h3>

              <p className="text-gray-400 mt-5 leading-8">

                Stunning modern portfolio themes
                with responsive layouts.

              </p>

            </div>

            {/* CARD */}

            <div className="bg-white/10 border border-white/10 rounded-[32px] p-10 hover:scale-105 transition duration-300 backdrop-blur-xl">

              <div className="text-6xl">
                📩
              </div>

              <h3 className="text-3xl font-bold mt-6">
                Email Notifications
              </h3>

              <p className="text-gray-400 mt-5 leading-8">

                Users receive approval
                and rejection emails instantly.

              </p>

            </div>

            {/* CARD */}

            <div className="bg-white/10 border border-white/10 rounded-[32px] p-10 hover:scale-105 transition duration-300 backdrop-blur-xl">

              <div className="text-6xl">
                🚀
              </div>

              <h3 className="text-3xl font-bold mt-6">
                Instant Deployment
              </h3>

              <p className="text-gray-400 mt-5 leading-8">

                Deploy your portfolio globally
                with one click using Vercel.

              </p>

            </div>

          </div>

        </div>

      </div>

      {/* FOOTER */}

      <div className="border-t border-white/10 py-10 text-center text-gray-500">

        <p className="text-lg">
          Built with ❤️ by Ranjith Theeti
        </p>

      </div>

    </div>
  );
}