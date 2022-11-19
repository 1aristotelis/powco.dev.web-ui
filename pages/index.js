import React, { useEffect, useState } from "react";
import Dashboard from "./dashboard";
import { useAPI } from "../hooks/useAPI";
import { useTuning } from "../context/TuningContext";

const Index = () => {
  const [recentQuestions, setRecentQuestions] = useState([]);
  const { startTimestamp } = useTuning();
  let { data, error, refresh, loading } = useAPI(
    `/questions?start_timestamp=${startTimestamp}`
  );
  let { data: recent } = useAPI("/recent/questions?limit=100");

  useEffect(() => {
    console.log(recent);
    setRecentQuestions(recent?.questions);
  }, [recent]);

  return (
    <Dashboard
      data={data}
      recent={recentQuestions}
      error={error}
      loading={loading}
    />
  );
};

export default Index;
