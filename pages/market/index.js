import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { PanelLayout } from "../../components";
import architect from "../../public/architect.jpeg";
import blueprints from "../../public/blueprints.jpeg";

export default function Market() {
  return (
    <>
      <Head>
        <title>Cozy Homes - Market</title>
        <meta name="description" content="Cozy spaces for Twetch people" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/app-icon.png"></link>
      </Head>
      <PanelLayout>
        <div className="mb-[200px] ">
          <div className="bg-gray-100 dark:bg-gray-600 lg:rounded-lg mt-7 py-8 px-7 w-full flex flex-col lg:flex-row justify-between">
            <div className="flex grow flex-col items-center lg:items-start max-w-[420px]">
              <p className="mt-4 text-3xl font-bold text-gray-900 dark:text-white text-center lg:text-left">
                Welcome to the Twetchsteading company!
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-base mt-2 text-center lg:text-left">
                We are building cozy 😌 homes in Twetchland. <br />
                🌱 Make the most of your Twetch Experience by building
                specialized instances of Twetch with our tools.
                <br />
                Experimentation is the key to progress. We help frens explore
                new ways to twetch 🚀
              </p>
              {/* <p className="text-xs text-gray-700 dark:text-gray-300 mt-5 text-center lg:text-left">
                * If Twetch wins we all win, that&apos;s why 21.8% of all our
                Cozy Homes NFT sales will go into funding Twetch Features and
                develop our long-term partnership.
              </p> */}
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
            {/* <Link
              //target="_blank"
              //rel="noreferrer"
              //href="https://relayx.com/market/6385528ebd373613ec3135877ef095b3410c8a9f2d2b5f26757b81e9a6246a7a_o2"
              href="/market/homes"
            >
              <div className="hover:shadow-2xl transition duration-500 transform hover:-translate-y-1 bg-gray-100 dark:bg-gray-600 rounded-xl w-full relative flex flex-col overflow-hidden">
                <Image src={homes} alt="Cozy Homes" className="h-[300px]" />
                <div className="flex flex-col p-4 grow">
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    Cozy Homes NFT
                  </p>
                  <p className="text-gray-900 text-center dark:text-white opacity-70 text-sm mt-1 grow">
                    The Cozy Homes NFT is the key to your personnal space in
                    TwetchLand. <br />
                    Each of the 218 Cozy Homes NFT is redeemable against a
                    turnkey fully customizable Twetch client. <br />
                    Upon redeem, we will manually put your new Home online, and
                    direct it to a domain name you will have to purchase
                    separately.
                  </p>
                  <button className="transition duration-500 transform hover:-translate-y-1 mt-4 text-white bg-gradient-to-tr from-blue-400 to-blue-500 leading-6 py-1 px-4 font-semibold border-none rounded cursor-pointer flex items-center text-center justify-center disabled:opacity-50">
                    Learn more
                  </button>
                </div>
              </div>
            </Link> */}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://relayx.com/market/cdc38853522ad0a20b82ef271554ed87ab0f0f1ba4b7c95a558a3bb93eb0afbf_o2"
              //href="/market/blueprints"
            >
              <div className="hover:shadow-2xl transition duration-500 transform hover:-translate-y-1 bg-gray-100 dark:bg-gray-600 rounded-xl w-full relative flex flex-col overflow-hidden">
                <Image
                  src={blueprints}
                  alt="Cozy Homes Blueprints"
                  className="min-h-[300px]"
                />
                <div className="flex flex-col p-4 grow">
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    Cozy Homes Blueprints
                  </p>
                  <p className="text-gray-900 dark:text-white opacity-70 text-sm mt-1 grow text-center">
                    Want to build homes too? This NFT grants you access to the
                    Cozy Homes repository, that you can fork at will. Owners get
                    also granted access to our{" "}
                    <span className="text-blue-500 cursor-pointer hover:underline font-semibold">
                      Academy
                    </span>
                    , a place to learn, build and get paid for your work.
                  </p>
                  <p className="text-green-500 dark:text-green-400 font-semibold opacity-70 text-sm mt-1 grow text-center">
                    Will open source for everyone once they sell out 👀
                  </p>
                  <button className="transition duration-500 transform hover:-translate-y-1 mt-4 text-white bg-gradient-to-tr from-blue-400 to-blue-500 leading-6 py-1 px-4 font-semibold border-none rounded cursor-pointer flex items-center text-center justify-center disabled:opacity-50">
                    Buy now
                  </button>
                </div>
              </div>
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://twetch.com/u/76407"
              className="hover:shadow-2xl transition duration-500 transform hover:-translate-y-1 bg-gray-100 dark:bg-gray-600 rounded-xl w-full relative flex flex-col overflow-hidden"
            >
              <Image
                src={architect}
                alt="Tete Carrée Sapience"
                className="h-[300px] object-cover"
              />
              <div className="flex flex-col p-4 grow">
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  Custom Project
                </p>
                <p className="text-gray-900 dark:text-white opacity-70 text-sm mt-1 grow">
                  Have a Twetch idea you want to explore? We will help you
                  tailor your Twetch experience to your needs.
                </p>
                <button className="transition duration-500 transform hover:-translate-y-1 mt-4 text-white bg-gradient-to-tr from-blue-400 to-blue-500 leading-6 py-1 px-4 font-semibold border-none rounded cursor-pointer flex items-center text-center justify-center disabled:opacity-50">
                  dm us now
                </button>
              </div>
            </a>
          </div>
        </div>
      </PanelLayout>
    </>
  );
}
