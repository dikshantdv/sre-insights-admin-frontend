import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import SearchBar from "./SearchBar";
import ModalComponent from "./ModalComponent";
import "./styles/Header.css";

const Header = (props) => {
  // For globalization
  const { t } = useTranslation();

  return (
    <Fragment>
      <div className="tab">
        <img
          className="logoimg"
          src="https://www.decurtis.com/wp-content/uploads/2019/11/logo-decurtis-corporation.png"
          alt="Logo"
        />

        <h1 className="project-title">{t("Title")}</h1>

        <SearchBar handleSearch={props.handleSearch} />

        <ModalComponent
          addTask
          createTask={props.createTask}
          isLoading={props.isLoading}
          jobs={props.jobs}
          setIsLoading={props.setIsLoading}
        />
      </div>
      <div style={{ backgroundColor: "#0474cc", height: 5 }}></div>
    </Fragment>
  );
};

export default Header;
