import { Fragment, useEffect, useState } from "react";
import Header from "../components/Header";
import TableComponent from "../components/TableComponent";
import Copyright from "../components/copyright";
import { useApi } from "../hooks/api_hook";

const AdminPanel = () => {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [jobs, setJobs] = useState({});
  const [isLoading, setIsLoading] = useState({});

  // Fetch Table Data and Jobs
  // const { isLoading, fetchedData } = useApi(
  //   `${process.env.REACT_APP_BACKEND_URL}/data`
  // );
  // setData(fetchedData.tasks);
  // setSearchData(fetchedData.tasks);
  // setJobs(fetchedData.jobs);

  // To Handle Reschedules and task creation
  const TaskCreationHandler = (job_id, environment_id) => {
    const body = JSON.stringify({
      job_id,
      environment_id,
    });
    // sendRequest(`${process.env.REACT_APP_BACKEND_URL}/data`, "POST", body, {
    //   "Content-Type": "application/json",
    // }).then((json) => {
    //   setData(json.tasks);
    //   setSearchData(json.tasks);
    // });
  };

  // To Search Data through search bar
  const handleSearch = (value) => {
    const filteredTask = data.filter((tasks) => {
      return tasks.taskname
        .toLowerCase()
        .startsWith(value.toLowerCase().trim());
    });
    if (value.length < 1) {
      setSearchData(data);
    } else {
      setSearchData(filteredTask);
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
        data={searchData}
        isLoading={isLoading}
        scheduleHandler={TaskCreationHandler}
      />
      <Copyright />
    </Fragment>
  );
};

export default AdminPanel;
