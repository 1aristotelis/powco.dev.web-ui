import React from "react";
import Head from "next/head";
import { ThreeColumnLayout } from "../components";

export default function Invite() {
  return (
    <>
      <Head>
        <title>Cozy Homes</title>
        <meta name="description" content="Cozy spaces for Twetch people" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/app-icon.png"></link>
      </Head>
      <ThreeColumnLayout>Invite</ThreeColumnLayout>
    </>
  );
}
