import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const QUICK_LINKS = [
  { title: "Trending", href: "https://nailib.com/schools" },
  { title: "Videos", href: "https://nailib.com/videos" },
  { title: "Question Bank", href: "https://nailib.com/question-bank" },
  { title: "Past Papers", href: "https://nailib.com/past-papers" },
  { title: "Examples", href: "https://nailib.com/examples" },
  { title: "Flashcards", href: "/" },
  { title: "Guides", href: "https://nailib.com/guides" },
];

const SUBJECTS = [
  "English A Language & Literature HL",
  "English A Language & Literature SL",
  "English Literature HL",
  "English Literature SL",
  "English B HL",
  "English B SL",
  "Business Management HL",
  "Business Management SL",
  "Economics HL",
  "Economics SL",
  "Psychology HL",
  "Psychology SL",
  "Biology HL",
  "Biology SL",
  "Physics HL",
  "Physics SL",
  "Chemistry HL",
  "Chemistry SL",
  "Mathematics AA HL",
  "Mathematics AA SL",
  "Mathematics AI HL",
  "Mathematics AI SL",
  "Design Technology HL",
  "Design Technology SL",
  "Environmental Systems & Societies SL",
  "Sports, Exercise & Health Science HL",
  "Sports, Exercise & Health Science SL",
  "Computer Science HL",
  "Computer Science SL",
  "History HL",
  "History SL",
  "Geography HL",
  "Geography SL",
  "Global Politics HL",
  "Global Politics SL",
  "Philosophy HL",
  "Philosophy SL",
  "Visual Arts HL",
  "Visual Arts SL",
  "Music HL",
  "Music SL",
  "Film HL",
  "Film SL",
  "Theory of Knowledge (TOK)",
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [ibOpen, setIbOpen] = useState(false);
  const [search, setSearch] = useState("");

  



  const filteredSubjects = SUBJECTS.filter((s) =>
    s.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <nav className="bg-[#0A1931] text-white font-sans fixed top-0 w-full z-50 shadow">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 font-bold text-2xl tracking-wide flex flex-row items-center ml-2">
            Nail<span className="text-[#00C2CB]">IB</span>
            <ThemeToggle />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="/" className="hover:text-[#00C2CB] transition">Home</a>

            {/* IB Resources */}
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-[#00C2CB] transition">
                IB Resources <ChevronDown size={16} />
              </button>

              {/* Mega Menu */}
              <div className="absolute left-0 w-[750px] mt-2 bg-white text-black shadow-lg rounded-xl p-6 hidden group-hover:grid grid-cols-2 gap-6 z-50">
                {/* Search Bar */}
                <div className="col-span-2 mb-4">
                  <input
                    type="text"
                    placeholder="Search subjects..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border rounded-md p-2"
                  />
                </div>

                {/* Quick Links */}
                <div>
                  <h4 className="font-semibold mb-3 text-[#0A1931]">Quick Links</h4>
                  <ul className="space-y-2">
                    {QUICK_LINKS.map((q, i) => (
                      <li key={i}>
                        <a
                          href={q.href}
                          className="block hover:text-[#00C2CB] transition"
                        >
                          {q.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Subjects */}
                <div>
                  <h4 className="font-semibold mb-3 text-[#0A1931]">Subjects</h4>
                  <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                    {filteredSubjects.length > 0 ? (
                      filteredSubjects.map((sub, i) => (
                        <a
                          key={i}
                          href={`/subjects/${sub.toLowerCase().replace(/\s+/g, "-")}`}
                          className="px-2 py-1 rounded-md text-sm hover:text-[#00C2CB] transition"
                        >
                          {sub}
                        </a>
                      ))
                    ) : (
                      <p className="text-gray-500 col-span-full">No results found</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <a href="https://nailib.com/schools" className="hover:text-[#00C2CB] transition">Schools</a>
            <a href="https://nailib.com/ib-past-papers" className="hover:text-[#00C2CB] transition">Past Papers</a>
            <a href="https://nailib.com/ib-question-bank" className="hover:text-[#00C2CB] transition">Question Bank</a>
            <a href="https://nailib.com/pricing" className="hover:text-[#00C2CB] transition">Pricing</a>
            <a
              href="/login"
              className="border border-white px-4 py-1 rounded-md hover:bg-[#00C2CB] hover:text-white transition"
            >
              Login
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="md:hidden bg-white text-black shadow-lg"
          >
            <div className="p-4 space-y-4">
              <a href="/" className="block hover:text-[#00C2CB] transition">Home</a>

              {/* Mobile IB Resources Accordion */}
              <div>
                <button
                  className="flex justify-between w-full font-medium"
                  onClick={() => setIbOpen(!ibOpen)}
                >
                  IB Resources <ChevronDown className={`${ibOpen ? "rotate-180" : ""} transition`} />
                </button>

                <AnimatePresence>
                  {ibOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 mt-2 space-y-3"
                    >
                      {/* Mobile Search */}
                      <input
                        type="text"
                        placeholder="Search subjects..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border rounded-md p-2 mb-3"
                      />

                      <h4 className="font-semibold">Quick Links</h4>
                      {QUICK_LINKS.map((q, i) => (
                        <a
                          key={i}
                          href={q.href}
                          className="block hover:text-[#00C2CB] transition"
                        >
                          {q.title}
                        </a>
                      ))}

                      <h4 className="font-semibold mt-4">Subjects</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {filteredSubjects.length > 0 ? (
                          filteredSubjects.map((sub, i) => (
                            <a
                              key={i}
                              href={`/subjects/${sub.toLowerCase().replace(/\s+/g, "-")}`}
                              className="text-sm hover:text-[#00C2CB] transition"
                            >
                              {sub}
                            </a>
                          ))
                        ) : (
                          <p className="text-gray-500 col-span-full">No results found</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a href="https://nailib.com/schools" className="block hover:text-[#00C2CB] transition">Schools</a>
              <a href="https://nailib.com/ib-past-papers" className="block hover:text-[#00C2CB] transition">Past Papers</a>
              <a href="https://nailib.com/ib-question-bank" className="block hover:text-[#00C2CB] transition">Question Bank</a>
              <a href="https://nailib.com/pricing" className="block hover:text-[#00C2CB] transition">Pricing</a>
              <a
                href="/login"
                className="block border border-[#0A1931] px-4 py-1 rounded-md text-center hover:bg-[#00C2CB] hover:text-white transition"
              >
                Login
              </a>
            </div>
          </motion.div>

        )}
      </AnimatePresence>
      
    </nav>
  );
}
