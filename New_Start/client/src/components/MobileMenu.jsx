import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";


function MobileMenu({
  Menu,
  setMenu,
  searchText,
  setSearchText,
  handleSearch,
  error,
  setError,
}) {

  const linkBase =
    "flex items-center gap-3 px-6 py-3 border-b border-gray-800 transition-all duration-300 ease-out";

  const linkInactive =
    "text-gray-300 hover:bg-gray-800/70 hover:text-[#5FBFF9] hover:pl-8";

  const linkActive =
    "bg-gray-800 text-[#5FBFF9] pl-8 font-semibold shadow-inner";

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // New user direction
  const [ state, setState ] = useState('/signup');

  // It change state of get started button depending on user authorisation
  useEffect(() => {

    const checkButtonState = async () => {
      try {
        const res = await fetch("/api/user/userVerify", {
          method: "GET",
          credentials: "include"
        });

        if (res.ok) {
          const data = await res.json();
          if (data) {
            setState('/tools');
          }
        }
      } catch (error) {
        console.error("Auth check failed");
      }
    }

    checkButtonState();

  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/user", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          setUser(null);
          return;
        }

        const data = await res.json();
        setUser(data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // SAFE early returns
  if (!Menu || loading) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-20 bg-black/40 backdrop-blur-sm"
        onClick={() => setMenu(false)}
      />

      <div
        className="fixed top-16 inset-x-0 z-30 flex flex-col
                   bg-gray-900/90 backdrop-blur-xl
                   border-t border-gray-800
                   animate-slideDown"
        onClick={(e) => e.stopPropagation()}
      >
        {/* =====================
            Mobile Search
        ===================== */}
        <div className="md:hidden px-4 py-3 border-b border-gray-800">
          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

            <input
              type="text"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                if (error) setError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch();
                  setMenu(false);
                  e.target.blur();
                }
              }}
              placeholder="Search tools, docs..."
              className="
                w-full rounded-full bg-gray-800/60
                border border-gray-700
                pl-10 pr-4 py-2
                text-gray-200 placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-[#5FBFF9]
                transition shadow-inner
              "
            />
          </div>

          {/* Error */}
          {error && searchText.trim() && (
            <p className="mt-2 text-xs text-red-300 text-center">
              {error}
            </p>
          )}

          <button
            onClick={() => {
              handleSearch();
              setMenu(false);
            }}
            className="
              mt-3 w-full rounded-full px-4 py-2 text-sm font-semibold
              bg-[#5FBFF9] text-gray-900
              hover:bg-[#4bb5f3]
              active:scale-95 transition
            "
          >
            Search
          </button>
        </div>

        {/* =====================
            Links
        ===================== */}
        <NavLink to="/" onClick={() => setMenu(false)}
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }>
          <i className="fa-solid fa-house text-sm text-[#5FBFF9]" />
          Home
        </NavLink>

        <NavLink to={state} onClick={() => setMenu(false)}
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }>
          <i className="fa-solid fa-wrench text-sm text-[#5FBFF9]" />
          Tools
        </NavLink>

        <NavLink to="/docs" onClick={() => setMenu(false)}
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }>
          <i className="fa-solid fa-book text-sm text-[#5FBFF9]" />
          Docs
        </NavLink>

        {/* =====================
            Auth
        ===================== */}
        {!user && (
          <NavLink
            to="/signup"
            onClick={() => setMenu(false)}
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : linkInactive}`
            }
          >
            <i className="fa-solid fa-user text-sm text-[#5FBFF9]" />
            Login / Sign Up
          </NavLink>
        )}
      </div>
    </>
  );
}

export default MobileMenu;