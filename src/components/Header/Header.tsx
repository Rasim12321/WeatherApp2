import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import languageIcon from "../../image/language.png";
import styles from "./Header.module.css";
function Header() {
  const { i18n, t } = useTranslation();
  const [opacity, setOpacity] = useState<boolean>(false);
  const [language, setLanguage] = useState<string | null>(
    localStorage.getItem("language")
  );

  const changeLanguage = useCallback(
    (lang: "RU" | "EN" | "UA") => {
      localStorage.setItem("language", lang);
      i18n.changeLanguage(lang.toLowerCase());
    },
    [i18n]
  );

  const changeHandler = (e: any) => {
    changeLanguage(e.target.id);
    setLanguage(e.target.id.toUpperCase());
    setOpacity(false);
  };

  return (
    <>
      <div className={styles.main} onClick={() => setOpacity((prev) => !prev)}>
        <div>
          <img src={languageIcon} width="20px" height="20px" alt="" />
        </div>
        <div className={styles.en}>{language === null ? "EN" : language}</div>
        <div className="m-1 ">^</div>
      </div>
      {opacity === true ? (
        <div className={styles.burgerFlex}>
          <div className={styles.burger}>
            <div id="EN" onClick={changeHandler}>
              EN
            </div>
            <div id="UA" onClick={changeHandler}>
              UA
            </div>
            <div id="RU" onClick={changeHandler}>
              RU
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Header;
