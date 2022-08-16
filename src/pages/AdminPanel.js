import { Fragment, useEffect, useState } from "react";
import Header from "../components/Header";
import TableComponent from "../components/TableComponent";
import Copyright from "../components/copyright";
import { useApi } from "../hooks/api_hook";
import { message } from "antd";

const AdminPanel = () => {
  const { fetchedData, isLoading, sendRequest } = useApi();
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    sendRequest(`${process.env.REACT_APP_BACKEND_URL}/data`);
    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (fetchedData !== undefined) {
      if (fetchedData.tasks) {
        setData(fetchedData.tasks);
        setSearchData(fetchedData.tasks);
        message.success(fetchedData.detail, 3);
      }
      if (fetchedData.jobs) {
        setJobs(fetchedData.jobs);
      }
      if (fetchedData.detail && !fetchedData.tasks) {
        message.error(fetchedData.detail, 10);
      }
    }
  }, [fetchedData]);

  // To Handle Reschedules and task creation
  const TaskCreationHandler = (job_environment_id) => {
    const body = JSON.stringify({
      job_environment_id,
    });
    sendRequest(`${process.env.REACT_APP_BACKEND_URL}/data`, "POST", body, {
      "Content-Type": "application/json",
    });
  };

  // To Search Data through search bar
  const handleSearch = (value) => {
    const filteredTask = searchData.filter((tasks) => {
      return tasks.taskname
        .toLowerCase()
        .startsWith(value.toLowerCase().trim());
    });
    if (value.length < 1) {
      setData(searchData);
    } else {
      setData(filteredTask);
    }
  };

  return (
    <Fragment>
      <Header
        jobs={jobs}
        handleSearch={handleSearch}
        isLoading={isLoading}
        createTask={TaskCreationHandler}
      />
      {/* {error && <Alert type="error" message={error} showIcon closable />} */}
      {/* {error && message.error(error, 10)} */}
      <TableComponent
        data={data}
        isLoading={isLoading}
        scheduleHandler={TaskCreationHandler}
      />
      <Copyright />
    </Fragment>
  );
};

export default AdminPanel;
