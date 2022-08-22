import { useTranslation } from "react-i18next";
import "./styles/copyright.css";

const Copyright = () => {
  // For globalization
  const { t } = useTranslation();

  return (
    <div className="foot">
      <p className="copyright"> {t("fcopyright")}</p>
      <p className="credits">
        {" "}
        <span>{`version: v${process.env.REACT_APP_VERSION} - `}</span>
        {t("fcredits")}
      </p>
    </div>
  );
};
export default Copyright;
