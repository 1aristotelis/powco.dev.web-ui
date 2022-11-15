import React from "react";
import Head from "next/head";
import { PanelLayout } from "../components";

export default function Discover() {
  return (
    <>
      <Head>
        <title>Cozy Homes - Discover</title>
        <meta name="description" content="Cozy spaces for Twetch people" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/app-icon.png"></link>
      </Head>
      <PanelLayout>
        <div className="mb-[200px] ">
          <div className="bg-gray-100 dark:bg-gray-600 lg:rounded-lg mt-7 py-8 px-7 w-full flex flex-col lg:flex-row justify-between">
            <div className="flex grow flex-col items-center lg:items-start">
              <p className="mt-4 text-5xl font-bold text-gray-900 dark:text-white text-center">
                Explore the Twetchverse
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-base mt-2 text-center">
                Find the Twetch sub-community you like.
              </p>
            </div>
            <div className="flex grow justify-end ml-0 mt-5 lg:mt-0lg:ml-5">
              <img
                width={560}
                height={315}
                className="rounded-xl"
                src="https://dogefiles.twetch.app/44c128cd568c8cf937761bc0ae5120ae00d045903cd074a9f6078b6e58349b61"
                alt="TwetchArk"
              />
            </div>
          </div>
          <div className="px-4 lg:px-0 grid mt-4 lg:mt-7 gap-4 lg:gap-7 grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://eggdao.xyz"
              className="hover:shadow-2xl transition duration-500 transform hover:-translate-y-1 bg-gray-100 dark:bg-gray-600 rounded-xl w-full relative flex flex-col overflow-hidden"
            >
              <div className="pt-4 my-0 mx-auto flex justify-center">
                <img
                  src="https://dogefiles.twetch.app/cda826e6d22fca774eada35d0317a4b6a5e2ff35732a438c0d726510c5ec4fd1"
                  alt="Twetch Egg"
                  className="h-[284px]"
                />
              </div>
              <div className="flex flex-col p-4 grow">
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  EggDao
                </p>
                <p className="text-gray-900 dark:text-white opacity-70 text-sm mt-1 grow">
                  We like the Egg.
                </p>
                <button className="transition duration-500 transform hover:-translate-y-1 mt-4 text-white bg-gradient-to-tr from-blue-400 to-blue-500 leading-6 py-1 px-4 font-semibold border-none rounded cursor-pointer flex items-center text-center justify-center disabled:opacity-50">
                  Visit
                </button>
              </div>
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://pxlone.xyz"
              className="hover:shadow-2xl transition duration-500 transform hover:-translate-y-1 bg-gray-100 dark:bg-gray-600 rounded-xl w-full relative flex flex-col overflow-hidden"
            >
              <img
                src="https://berry2.relayx.com/586a572b7f94e2a03c9ef2fc4d9abbcc90da96ac1d42b1f21373da3e45638ab8"
                alt="Pxl One"
                className="h-[300px] object-cover"
              />
              <div className="flex flex-col p-4 grow">
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  PxlOne
                </p>
                <p className="text-gray-900 dark:text-white opacity-70 text-sm mt-1 grow">
                  The BSV token representing user PXL-3000 and his efforts to
                  build a based community of creative heads on Twetch. The token
                  is backed by secret powers and comes with different use cases
                  to support you and your awesome projects with positive vibes.
                </p>
                <button className="transition duration-500 transform hover:-translate-y-1 mt-4 text-white bg-gradient-to-tr from-blue-400 to-blue-500 leading-6 py-1 px-4 font-semibold border-none rounded cursor-pointer flex items-center text-center justify-center disabled:opacity-50">
                  Visit
                </button>
              </div>
            </a>
            {/* <a
              target="_blank"
              rel="noreferrer"
              href="https://sapience.space"
              className="hover:shadow-2xl transition duration-500 transform hover:-translate-y-1 bg-gray-100 dark:bg-gray-600 rounded-xl w-full relative flex flex-col overflow-hidden"
            >
              <img
                src="https://dogefiles.twetch.app/99f250ea1dcb325abdaa87aea28a7ff7b935ab7d87de24b62d800bcf956c9325"
                alt="Tete Carrée Sapience"
                className="h-[300px] object-cover"
              />
              <div className="flex flex-col p-4 grow">
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  Sapience
                </p>
                <p className="dark:text-white text-gray-900 opacity-70 text-sm mt-1 grow">
                  Networked micro-schools for based families in Nice, France.
                </p>
                <button className="transition duration-500 transform hover:-translate-y-1 mt-4 text-white bg-gradient-to-tr from-blue-400 to-blue-500 leading-6 py-1 px-4 font-semibold border-none rounded cursor-pointer flex items-center text-center justify-center disabled:opacity-50">
                  Visit
                </button>
              </div>
            </a> */}
            {/* <a target="_blank" rel="noreferrer" href="https://retrotwetch.com" className="hover:shadow-2xl transition duration-500 transform hover:-translate-y-1 bg-gray-100 rounded-xl w-full relative flex flex-col overflow-hidden opacity-70"> */}
            <a
              target="_blank"
              rel="noreferrer"
              href=""
              className="cursor-default pointer-events-none bg-gray-100 dark:bg-gray-600 rounded-xl w-full relative flex flex-col overflow-hidden opacity-50"
            >
              <img
                src="https://media.twetch.app/dyt/256x256/avatars/2020/09/16/2c06b5dddd668fc5b7f55615643e1dfe1a7db097a17c1b0750336a68b6b4b8e0.b998ed71-82ef-46f9-b987-830f07b3dac6"
                alt="Retro Twetch"
                className="h-[300px] object-cover"
              />
              <div className="flex flex-col p-4 grow">
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  RetroTwetch
                </p>
                <p className="text-gray-900 dark:text-white opacity-70 text-sm mt-1 grow">
                  The first alternative Twetch client. Gaming Curation and News.
                  $osg
                </p>
                <button className="transition duration-500 transform hover:-translate-y-1 mt-4 text-white bg-gradient-to-tr from-blue-400 to-blue-500 leading-6 py-1 px-4 font-semibold border-none rounded cursor-pointer flex items-center text-center justify-center disabled:opacity-50">
                  Visit
                </button>
              </div>
            </a>
          </div>
        </div>
      </PanelLayout>
    </>
  );
}
