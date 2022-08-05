import { Fragment, useEffect, useState } from "react";
import Header from "../components/Header";
import TableComponent from "../components/TableComponent";
import Copyright from "../components/copyright";
import { useApi } from "../hooks/api_hook";

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
      setData(fetchedData.tasks);
      setSearchData(fetchedData.tasks);
      setJobs(fetchedData.jobs);
    }
  }, [fetchedData]);

  // To Handle Reschedules and task creation
  const TaskCreationHandler = (job_id, environment_id) => {
    const body = JSON.stringify({
      job_id,
      environment_id,
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
