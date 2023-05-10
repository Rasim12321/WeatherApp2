import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import languageIcon from "../../image/language.png";
import styles from "./Header.module.css";
function Header() {
  const { i18n, t } = useTranslation();
  const [opacity, setOpacity] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("EN");

  const changeLanguage = useCallback(
    (lang: "ru" | "en" | "ua") => {
      i18n.changeLanguage(lang);
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
        <div className={styles.en}>{language}</div>
        <div className="m-1 ">^</div>
      </div>
      {opacity === true ? (
        <div className={styles.burgerFlex}>
          <div className={styles.burger}>
            <div id="en" onClick={changeHandler}>
              EN
            </div>
            <div id="ua" onClick={changeHandler}>
              UA
            </div>
            <div id="ru" onClick={changeHandler}>
              RU
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Header;
