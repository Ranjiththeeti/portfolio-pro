import { Link } from "react-router-dom";

export default function Home() {

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 text-white">

      {/* HERO */}

      <section className="max-w-7xl mx-auto px-6 py-28 text-center">

        <h1 className="text-6xl md:text-7xl font-black leading-tight">

          Build Stunning
          <br />

          Developer Portfolios 🚀

        </h1>

        <p className="text-gray-300 text-xl mt-8 max-w-3xl mx-auto leading-9">

          Create professional portfolios with themes,
          resume uploads, public links, and admin approval.

        </p>

        <div className="flex flex-wrap justify-center gap-6 mt-12">

          <Link
            to="/register"
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl text-lg font-bold transition duration-300"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-4 rounded-2xl text-lg font-bold transition duration-300"
          >
            Login
          </Link>

        </div>

      </section>

      {/* FEATURES */}

      <section className="max-w-6xl mx-auto px-6 py-20">

        <h2 className="text-5xl font-black text-center mb-20">
          Features
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20">

            <h3 className="text-3xl font-bold mb-5">
              Portfolio Themes
            </h3>

            <p className="text-gray-300 leading-8">
              Choose from modern portfolio themes
              including developer, minimal,
              glassmorphism, and creative layouts.
            </p>

          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20">

            <h3 className="text-3xl font-bold mb-5">
              Resume Upload
            </h3>

            <p className="text-gray-300 leading-8">
              Upload resumes directly with Cloudinary
              integration and allow employers
              to download instantly.
            </p>

          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20">

            <h3 className="text-3xl font-bold mb-5">
              Admin Approval
            </h3>

            <p className="text-gray-300 leading-8">
              Portfolios are verified through
              admin approval with automated
              email notifications.
            </p>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="text-center py-24 px-6">

        <h2 className="text-5xl font-black">
          Start Building Today
        </h2>

        <p className="text-gray-300 text-xl mt-6">
          Launch your professional portfolio in minutes.
        </p>

        <Link
          to="/register"
          className="inline-block mt-10 bg-blue-600 hover:bg-blue-700 px-10 py-5 rounded-2xl text-xl font-bold transition duration-300"
        >
          Create Portfolio
        </Link>

      </section>

    </div>
  );
}