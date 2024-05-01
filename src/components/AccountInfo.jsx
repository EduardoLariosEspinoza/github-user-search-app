import { useThemeContext } from "../hooks/useThemeContext";

function AccountInfo({ icon, text = "" }) {
  const { isDark } = useThemeContext();
  const classTheme = isDark ? "dark" : "light";

  let infoText = text ? (
    <p>{text}</p>
  ) : (
    <p className="not-available">Not available</p>
  );

  if (text && text.startsWith("http")) {
    infoText = (
      <a href={text} target="_blank" className={classTheme}>
        {text}
      </a>
    );
  }

  return (
    <div className="info-div">
      <img src={icon} alt="Icon" />
      {infoText}
    </div>
  );
}

export default AccountInfo;
