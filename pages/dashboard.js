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
import InfiniteScroll from "react-infinite-scroll-component";
import { getLocalFeed, getLocalFeedPagination } from "../services";
import Link from "next/link";
import { useRelay } from "../context/RelayContext";
import { useAPI } from "../hooks/useAPI";

import moment from "moment";
import { useTuning } from "../context/TuningContext";
import { useRouter } from "next/router";
import { useBitcoin } from "../context/BitcoinContext";

function ago(period) {
  return moment().subtract(1, period).unix() * 1000;
}

const Dashboard = ({ data, error, loading }) => {
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const { authenticated } = useBitcoin();
  const { startTimestamp, tag, setTag } = useTuning();

  useEffect(() => {
    if (data) {
      setPosts(data.posts || data.questions || data.answers || data.events);
    } else {
      !error &&
        !loading &&
        data &&
        setPosts(data.posts || data.questions || data.answers || data.events);
    }
    console.log(data, loading, error);
  }, [data, posts, router, startTimestamp]);
  /* let {
    data: recent,
    error: recentError,
    loading: recentLoading,
  } = useAPI(`/recent/problems`); */

  //const posts = [];

  const handleChangeTab = (tag) => {
    switch (tag) {
      case "":
        router.push("/", undefined, { shallow: true });
        break;
      case "1F9E9":
        router.push("/intents", undefined, { shallow: true });
        break;
      case "1F4A1":
        router.push("/methods", undefined, { shallow: true });
        break;
      case "1F48E":
        router.push("/projects", undefined, { shallow: true });
        break;
      case "test":
        router.push("/test", undefined, { shallow: true });
        break;
      default:
        console.log("unknown tag");
    }
  };

  return (
    <ThreeColumnLayout>
      <div className="col-span-12 lg:col-span-6 min-h-screen">
        <div className="hidden lg:block mt-8">
          <Composer />
        </div>
        <div className="px-1 sm:px-4 mt-2">
          <div className="flex my-6">
            <div className="flex">
              {/* <div
                onClick={() => handleChangeTab("")}
                className={
                  tag === ""
                    ? "text-sm leading-4 py-2 px-2 sm:px-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 font-medium mr-2 cursor-pointer rounded-md whitespace-nowrap"
                    : "text-sm leading-4 py-2 px-2 sm:px-3 text-gray-700 dark:text-gray-300 font-normal mr-2 cursor-pointer rounded-md whitespace-nowrap"
                }
              >
                All 🦚
              </div> */}
              <div
                onClick={() => handleChangeTab("1F9E9")}
                className={
                  tag === "1F9E9"
                    ? "text-sm leading-4 py-2 px-2 sm:px-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 font-medium mr-2 cursor-pointer rounded-md whitespace-nowrap"
                    : "text-sm leading-4 py-2 px-2 sm:px-3 text-gray-700 dark:text-gray-300 font-normal mr-2 cursor-pointer rounded-md whitespace-nowrap"
                }
              >
                Puzzles 🧩
              </div>
              <div
                onClick={() => handleChangeTab("1F4A1")}
                className={
                  tag === "1F4A1"
                    ? "text-sm leading-4 py-2 px-2 sm:px-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 font-medium mr-2 cursor-pointer rounded-md whitespace-nowrap"
                    : "text-sm leading-4 py-2 px-2 sm:px-3 text-gray-700 dark:text-gray-300 font-normal mr-2 cursor-pointer rounded-md whitespace-nowrap"
                }
              >
                Ideas 💡
              </div>
              <div
                onClick={() => handleChangeTab("1F48E")}
                className={
                  tag === "1F48E"
                    ? "text-sm leading-4 py-2 px-2 sm:px-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 font-medium mr-2 cursor-pointer rounded-md whitespace-nowrap"
                    : "text-sm leading-4 py-2 px-2 sm:px-3 text-gray-700 dark:text-gray-300 font-normal mr-2 cursor-pointer rounded-md whitespace-nowrap"
                }
              >
                Experiments 💎
              </div>
              {/* <div
                  onClick={() => handleChangeTab("test")}
                  className={
                    tag === "test"
                      ? "text-sm leading-4 py-2 px-2 sm:px-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 font-medium mr-2 cursor-pointer rounded-md whitespace-nowrap"
                      : "text-sm leading-4 py-2 px-2 sm:px-3 text-gray-700 dark:text-gray-300 font-normal mr-2 cursor-pointer rounded-md whitespace-nowrap"
                  }
                >
                  Tests 🐛
                </div> */}
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="relative">
            {/* <InfiniteScroll
                dataLength={posts.length}
                hasMore={hasMore}
                next={fetchMore}
                loader={<Loader />}
                pullDownToRefresh
                pullDownToRefreshThreshold={50}
                refreshFunction={refresh}
              >
              </InfiniteScroll> */}
            {!loading &&
              !error &&
              posts.map((post) => {
                if (post.txid) {
                  return <OnchainPostCard key={post.txid} post={post} />;
                } else {
                  return <SimplePostCard key={post.tx_id} post={post} />;
                }
              })}
            {/* {!recentLoading &&
                !recentError &&
                recent.questions.map((post) => (
                  <QuestionCard key={post.tx_id} post={post} />
                ))} */}
          </div>
        </div>
        {authenticated && (
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
        )}
      </div>
    </ThreeColumnLayout>
  );
};

export default Dashboard;
