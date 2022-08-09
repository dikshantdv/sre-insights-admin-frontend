import { useTranslation } from "react-i18next";
import { Cascader } from "antd";
import "./styles/Dropdown.css";

const Dropdown = (props) => {
  // For globalization
  const { t } = useTranslation();

  // To handle input selection
  const changeHandler = (value, label) => {
    if (value === undefined) {
      props.setSelectedOption(undefined);
    } else {
      props.setSelectedOption(label[0]);
      props.setIsError({});
    }
  };

  return (
    <Cascader
      showSearch
      status={props.isError ? "error" : ""}
      allowClear="false"
      disabled={props.disabled ? props.disabled : false}
      onChange={changeHandler}
      value={props.value}
      options={props.options}
      dropdownClassName={
        props.options?.length > 6 ? "bigDropdown" : "smallDropDown"
      }
      placeholder={props.placeholder || t("phHolder")}
      style={{
        width: props.width || 300,
        display: "inline-block",
        position: "absolute",
        right: 20,
      }}
    />
  );
};

export default Dropdown;
