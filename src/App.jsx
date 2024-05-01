import { useState, useEffect, useRef } from "react";

import { useThemeContext } from "./hooks/useThemeContext";

import AccountData from "./components/AccountData";
import AccountInfo from "./components/AccountInfo";

import themeButtonMoon from "./assets/icon-moon.svg";
import themeButtonSun from "./assets/icon-sun.svg";
import iconCompany from "./assets/icon-company.svg";
import iconLocation from "./assets/icon-location.svg";
import iconTwitter from "./assets/icon-twitter.svg";
import iconWebsite from "./assets/icon-website.svg";
import search from "./assets/icon-search.svg";

function App() {
  const [user, setUser] = useState({ name: null, info: null });
  const [error, setError] = useState(null);
  const inputRef = useRef();
  const { isDark, handleTheme } = useThemeContext();

  let classTheme = isDark ? "dark" : "light";

  useEffect(() => {
    async function getUser() {
      const response = await fetch(
        `https://api.github.com/users/${user.name ? user.name : "octocat"}`
      );
      const data = await response.json();
      if (data.message) {
        setError("No results");
        return;
      }

      setError(null);
      setUser((prev) => ({ ...prev, info: data }));
    }

    getUser();
  }, [user.name]);

  function handleSearch() {
    setUser((prev) => ({ ...prev, name: inputRef.current.value }));
  }

  const {
    avatar_url,
    bio,
    public_repos,
    company,
    location,
    twitter_username,
    blog,
    following,
    followers,
    created_at,
    name,
  } = user.info || {};

  return (
    <div className={`container ${classTheme}`}>
      <nav>
        <p>devfinder</p>{" "}
        <button className={`buttonTheme ${classTheme}`} onClick={handleTheme}>
          <p>{isDark ? "LIGHT" : "DARK"}</p>
          <img src={isDark ? themeButtonSun : themeButtonMoon} alt="" />
        </button>
      </nav>

      <section className={`search-section ${classTheme}`}>
        <img src={search} alt="" />
        <input
          type="text"
          placeholder="Search GitHub username..."
          ref={inputRef}
        />
        <p className="error">{error}</p>
        <button onClick={handleSearch}>
          <p>Search</p>
        </button>
      </section>

      <section className={`card-section ${classTheme}`}>
        <div className="main-info-div">
          <img src={avatar_url} alt="" />
          <div>
            <h3>{name}</h3>
            <p className="color-0079FF">{company}</p>
            <p className="date">
              Joined{" "}
              {new Date(created_at).toLocaleDateString("en-us", {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
            <p className="bio bio-info">
              {bio ? bio : "This profile has no bio"}
            </p>
          </div>
        </div>
        <p className="bio bio-out">{bio ? bio : "This profile has no bio"}</p>
        <div className={`back data-div ${classTheme}`}>
          <AccountData label="Repos" number={public_repos} />
          <AccountData label="Followers" number={followers} />
          <AccountData label="Following" number={following} />
        </div>
        <div className="div-footer-info">
          <AccountInfo icon={iconLocation} text={location} />
          <AccountInfo icon={iconWebsite} text={blog} />
          <AccountInfo icon={iconTwitter} text={twitter_username} />
          <AccountInfo icon={iconCompany} text={company} />
        </div>
      </section>
    </div>
  );
}

export default App;
