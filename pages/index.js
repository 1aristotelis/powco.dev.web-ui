import React from "react";
import Dashboard from "./dashboard";
import { useAPI } from "../hooks/useAPI";
import { useTuning } from "../context/TuningContext";

const Index = () => {
  const { startTimestamp } = useTuning();
  let { data, error, refresh, loading } = useAPI(
    `/questions?start_timestamp=${startTimestamp}`
  );
  return <Dashboard data={data} error={error} loading={loading} />;
};

export default Index;
