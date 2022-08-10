import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, message, Modal, Spin } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import Dropdown from "./Dropdown";
import { useApi } from "../hooks/api_hook";
import "./styles/ModalComponent.css";

const ModalComponent = (props) => {
  // For globalization
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isError, setIsError] = useState({});
  const [selectedEnvironment, setSelectedEnvironment] = useState(undefined);
  const [selectedJob, setSelectedJob] = useState(undefined);
  const [environments, setEnvironments] = useState([]);
  const { isLoading, sendRequest, fetchedData } = useApi();

  // To handle modal visibility
  const showModal = () => {
    setIsModalVisible(true);
  };

  // For sending request to get linked environment list
  useEffect(() => {
    if (selectedJob !== undefined && selectedJob.value !== "") {
      sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/data/${selectedJob.key}/environments`
      );
    }
    if (selectedJob === undefined || selectedJob.value !== "") {
      setEnvironments([]);
      setSelectedEnvironment("");
    }
    //eslint-disable-next-line
  }, [selectedJob]);

  useEffect(() => {
    if (fetchedData !== null) {
      setEnvironments(fetchedData.environments);
    }
  }, [fetchedData]);

  //For validating dropdown input selection and sending task scheduling request
  const handleOk = () => {
    if (
      selectedJob !== undefined &&
      selectedEnvironment !== undefined &&
      selectedEnvironment !== "" &&
      selectedJob.value !== "" &&
      selectedEnvironment.value !== ""
    ) {
      setIsModalVisible(false);
      props.createTask(selectedEnvironment.key);
      setIsError({});
    } else {
      if (
        selectedEnvironment === undefined ||
        selectedEnvironment === "" ||
        selectedEnvironment.value === ""
      ) {
        setIsError({ environment: true });
        selectedJob !== undefined &&
          message.error("Please select environment", 1);
      }
      if (selectedJob === undefined || selectedJob.value === "") {
        setIsError({ job: true });
        message.error("Please select job and environment", 1);
      }
    }
  };

  // To close the modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedJob(undefined);
    setIsError({});
  };

  // To show the modal containing dropdowns which is opened by add task button
  if (props.addTask) {
    return (
      <div className="modalbtn">
        <Button
          data-textid="addbutton"
          disabled={props.isLoading}
          type="primary"
          onClick={showModal}
          size="middle"
          style={{ textAlign: "center" }}
        >
          {t("buttonText")}
        </Button>
        <Modal
          destroyOnClose
          loading="true"
          footer={[
            <Button
              style={{
                width: "30%",
                height: 35,
                fontSize: 15,
              }}
              key="submit"
              type="primary"
              onClick={handleOk}
            >
              {t("schedule")}
            </Button>,
          ]}
          title={t("buttonText")}
          visible={isModalVisible}
          onCancel={handleCancel}
          style={{ textAlign: "center" }}
        >
          <div className="j-modal-body">
            <p className="p-job">{t("phJob")}</p>
            <Dropdown
              setIsError={setIsError}
              isError={isError.job}
              name="Job"
              className="d-job"
              options={props.jobs}
              setSelectedOption={setSelectedJob}
            />
          </div>
          <div className="e-modal-body">
            <p className="p-env">{t("phEnvironment")}</p>
            {isLoading ? (
              <Spin style={{ marginRight: 140 }} size="small" />
            ) : (
              <Dropdown
                setIsError={setIsError}
                isError={isError.environment}
                name="Environment"
                className="d-env"
                value={
                  selectedEnvironment === undefined
                    ? ""
                    : selectedEnvironment.value
                }
                disabled={environments ? environments.length === 0 : true}
                options={environments}
                setSelectedOption={setSelectedEnvironment}
              />
            )}
          </div>
        </Modal>
      </div>
    );
  }

  // To Show the modal containing response data and which is opened by eye button
  return (
    <Fragment>
      <EyeOutlined className="eye" onClick={showModal} />
      <Modal
        footer={[]}
        title={t("responsedata")}
        visible={isModalVisible}
        onCancel={handleCancel}
        style={{ textAlign: "center" }}
      >
        <div style={{ textAlign: "center" }}>
          <p style={{ display: "inline-block", marginTop: 5 }}>
            {props.responseData}
          </p>
        </div>
      </Modal>
    </Fragment>
  );
};

export default ModalComponent;
