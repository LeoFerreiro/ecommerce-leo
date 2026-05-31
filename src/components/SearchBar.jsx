import { FaSearch } from "react-icons/fa";
import useTheme from "../hooks/useTheme";

function SearchBar({ search, setSearch }) {
  const { theme } = useTheme();

  return (
    <div
      className={`
        flex items-center gap-4
        rounded-2xl
        px-5 py-4
        transition-colors duration-300

        ${
          theme === "dark"
            ? "bg-slate-900 border border-white/10"
            : "bg-white border border-black/5"
        }
      `}
    >
      <FaSearch
        className={
          theme === "dark"
            ? "text-gray-400"
            : "text-gray-500"
        }
      />

      <input
        type="text"
        placeholder="Buscar productos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={`
          w-full
          outline-none
          bg-transparent

          ${
            theme === "dark"
              ? "text-white placeholder:text-gray-400"
              : "text-slate-900 placeholder:text-gray-500"
          }
        `}
      />
    </div>
  );
}

export default SearchBar;