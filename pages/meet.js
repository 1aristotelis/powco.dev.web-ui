import React from "react";
import Head from "next/head";
import { PanelLayout } from "../components";

const Meet = () => {
  return (
    <PanelLayout>
      <div className="h-full w-full flex items-center mx-auto">
        <div className="grow" />
        <div className="items-center w-[690px] h-[420px]  bg-gray-300 dark: bg-gray-800">
          <div className="bg-black h-full w-full flex justify-center items-center text-[100px]">
            🚧
          </div>
          <p className="text-center p-5 bg-gray-100 dark:bg-gray-800 text-xl font-semibold">
            Join us{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://pow.co/daily-standup"
              className="font-semibold text-blue-500 hover:underline cursor-pointer"
            >
              here
            </a>
            , 15min everyday at 6:pm UTC
          </p>
        </div>
        <div className="grow" />
      </div>
    </PanelLayout>
  );
};

export default Meet;
