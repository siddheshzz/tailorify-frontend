import { Link } from "react-router-dom";

const services = [
  {
    title: "Custom Stitching",
    desc: "Perfect-fit tailoring for all outfits",
    image: "/images/stitching.png",
  },
  {
    title: "Alterations",
    desc: "Resize, repair & refine your clothes",
    image: "/images/alteration.png",
  },
  {
    title: "Bulk Orders",
    desc: "Uniforms & corporate tailoring",
    image: "/images/bulk.png",
  },
  {
    title: "Doorstep Pickup",
    desc: "Pickup & delivery at your convenience",
    image: "/images/pickup.png",
  },
];

export const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white overflow-hidden">
      {/* NAVBAR */}
      <header className="flex justify-between items-center px-8 py-6">
        <h1 className="text-2xl font-bold text-indigo-600">Tailorify</h1>
        <div className="space-x-4">
          <Link to="/login" className="text-gray-700 hover:text-indigo-600">
            Login
          </Link>
          <Link
            to="/register"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
          >
            Register
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="relative max-w-7xl mx-auto px-8 py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div>
          <h2 className="text-5xl font-extrabold leading-tight text-gray-900">
            Smart Tailoring.
            <br /> Perfect Fit.
          </h2>
          <p className="mt-6 text-lg text-gray-600">
            Book tailoring services, track orders, and get doorstep delivery —
            all from one modern app.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              to="/register"
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="border border-gray-300 px-6 py-3 rounded-xl hover:bg-gray-100 transition"
            >
              Login
            </Link>
          </div>
        </div>

        {/* FAKE 3D SHOWCASE */}
        <div className="relative h-[340px]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="relative w-64 h-64 rounded-3xl bg-indigo-600 shadow-2xl
              transform rotate-12 hover:rotate-6 transition duration-500"
            >
              <div
                className="absolute -top-6 -right-6 w-32 h-32 bg-indigo-400 rounded-2xl
                transform rotate-12 shadow-xl"
              />

              <div className="absolute bottom-6 left-6 bg-white rounded-xl p-4 shadow-xl">
                <p className="font-semibold">Tailorify App</p>
                <p className="text-sm text-gray-500">Live order tracking</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="max-w-7xl mx-auto px-8 pb-24 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((s) => (
          <div
            key={s.title}
            className="bg-white rounded-2xl p-6 shadow-lg
              transform transition-all duration-300
              hover:-translate-y-4 hover:rotate-[1deg] hover:shadow-2xl"
          >
            <img
              src={s.image}
              alt={s.title}
              className="h-28 mx-auto mb-4 object-contain"
            />
            <h3 className="text-lg font-semibold text-center">{s.title}</h3>
            <p className="text-sm text-gray-500 text-center mt-2">{s.desc}</p>
          </div>
        ))}
      </section>
      <footer className="border-t py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Tailorify · Crafted for perfect fit
      </footer>
    </div>
  );
};
