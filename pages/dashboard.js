import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import {
  ThreeColumnLayout,
  Loader,
  SimplePostCard,
  QuestionCard,
  Placeholder,
  Composer,
  PostCard,
  OnchainPostCard,
} from "../components";

import moment from "moment";
import { useTuning } from "../context/TuningContext";
import { useRouter } from "next/router";
import { useBitcoin } from "../context/BitcoinContext";
import GithubIssueCard from "../components/GithubIssueCard";

function ago(period) {
  return moment().subtract(1, period).unix() * 1000;
}

const Dashboard = ({ data, error, loading }) => {
  console.log(data);
  //const [issues, setIssues] = useState([]);
  const router = useRouter();
  const { authenticated } = useBitcoin();
  const { startTimestamp, tag, setTag } = useTuning();

  if (loading) {
    return (
      <ThreeColumnLayout>
        <div className="min-h-screen py-5">
          <Loader />
        </div>
      </ThreeColumnLayout>
    );
  }

  let { events } = data;

  let issues = events.map((e) => {
    if (e.content.action === "opened") {
      return e;
    }
  });
  //console.log(issues);

  return (
    <ThreeColumnLayout>
      <div className="col-span-12 lg:col-span-6 min-h-screen">
        <div className="w-full py-5">
          <div className="relative">
            {issues?.map((entry) => {
              if (entry) {
                return <GithubIssueCard {...entry} />;
              }
            })}
          </div>
        </div>
        {/* {authenticated && (
          <Link href="/compose">
            <div className=" lg:hidden fixed bottom-[73px] right-[14px] h-14 w-14 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
          </Link>
        )} */}
      </div>
    </ThreeColumnLayout>
  );
};

export default Dashboard;
