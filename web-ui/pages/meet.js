import React from "react";
import Head from "next/head";
import { PanelLayout } from "../components";

const Meet = () => {
  return (
    <>
      <Head>
        <title>Cozy Homes - Discover</title>
        <meta name="description" content="Cozy spaces for Twetch people" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/app-icon.png"></link>
      </Head>
      <PanelLayout>
        <div className="h-full w-full flex items-center mx-auto">
          <div className="grow" />
          <div className="items-center w-[690px] h-[420px]  bg-gray-300 dark: bg-gray-800">
            <div className="bg-black h-full w-full"></div>
            <p className="p-5 bg-gray-100 dark:bg-gray-800 text-xl font-semibold">
              Next PoW Co meeting in: 2 hours 18 min
            </p>
          </div>
          <div className="grow" />
        </div>
      </PanelLayout>
    </>
  );
};

export default Meet;
