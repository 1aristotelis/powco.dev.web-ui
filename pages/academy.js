import React from "react";
import Head from "next/head";
import { ThreeColumnLayout } from "../components";

export default function Lab() {
  return (
    <>
      <Head>
        <title>Cozy Homes - Academy</title>
        <meta name="description" content="Cozy spaces for Twetch people" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/app-icon.png"></link>
      </Head>
      <ThreeColumnLayout>
        <div className="col-span-12 lg:col-span-6 min-h-screen">
          <div className="mt-3 lg:mt-8 mb-[200px] lg:rounded-xl bg-gray-100 dark:bg-gray-700 px-4 pt-4 pb-3">
            <h1>The Academy</h1>
          </div>
        </div>
      </ThreeColumnLayout>
    </>
  );
}
