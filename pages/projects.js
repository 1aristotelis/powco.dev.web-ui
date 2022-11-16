import React from "react";
import Dashboard from "./dashboard";
import { useOnchain } from "../hooks/useOnchain";
import { useTuning } from "../context/TuningContext";

const Projects = () => {
  const { startTimestamp } = useTuning();
  let { data, error, refresh, loading } = useOnchain("/events", "type=project");
  return <Dashboard data={data} error={error} loading={loading} />;
};

export default Projects;
