import { FaBars, FaSearch, FaMoon, FaSun } from "react-icons/fa";

export default function Topbar({ setSidebarOpen, theme, setTheme }) {
  const darkMode = theme === "dark";

  const toggleTheme = () => {
    setTheme(darkMode ? "light" : "dark");
  };

  return (
    <header
      className={`
        shadow px-4 py-3 flex justify-between items-center sticky top-0 z-30 transition-all duration-300
        bg-gradient-to-l from-[rgb(18,95,172)] to-[rgb(145,185,224)]
        dark:from-gray-800 dark:to-gray-900
      `}
    >
      {/* Left side */}
      <div className="flex items-center gap-4">
        {/* Sidebar toggle */}
        <button
          className="md:hidden text-white text-xl focus:outline-none"
          onClick={() => setSidebarOpen(true)}
        >
          <FaBars />
        </button>

        {/* Search bar */}
        <div className="relative hidden sm:block">
          <FaSearch className="absolute left-3 top-2.5 text-gray-200" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-lg border border-transparent bg-white/20 text-white placeholder-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
          />
        </div>
      </div>

      {/* Right side: Dark Mode Toggle */}
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg bg-white/20 text-white hover:scale-110 hover:rotate-12 transition-all duration-300"
        title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {darkMode ? (
          <FaSun className="text-yellow-300 transition-transform duration-300" />
        ) : (
          <FaMoon className="text-white transition-transform duration-300" />
        )}
      </button>
    </header>
  );
}
