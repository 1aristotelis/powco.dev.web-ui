import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { PanelLayout } from "../../components";

export default function Features() {
  const [amount, setAmount] = useState(0.218);

  const handleChange = (e) => {
    setAmount(e.target.value);
  };
  return (
    <>
      <Head>
        <title>Cozy Homes - Features</title>
      </Head>
      <PanelLayout>
        <div className="mb-[200px] min-h-screen">
          <div className="bg-gray-100 dark:bg-gray-600 lg:rounded-lg mt-7 py-8 px-7 w-full flex flex-col lg:flex-row justify-between">
            <div>
              <p className="mt-4 text-2xl font-bold text-gray-900 dark:text-white text-center lg:text-left">
                Cozy Homes Features
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-base mt-2 text-center lg:text-left">
                You buy it, we will build it. Contribute to our next big feature
                release and who knows, you might even get a reward 🙃.
              </p>
            </div>
            {/* <div className="hidden lg:block w-[479px] ml-10">
              <div className="flex p-4 bg-gray-200 dark:bg-gray-700 flex-col rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Latest Release
                </p>
                <p className="text-base font-bold text-gray-900 dark:text-white mb-4">
                  Encrypt and Delete Posts
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Average Contribution
                </p>
                <p className="text-base font-bold text-gray-900 dark:text-white mb-4">
                  0.06765393 BSV
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Reward
                </p>
                <Link href="#">
                  <a className="mt-2 w-[276px] bg-gray-300 dark:bg-gray-800 rounded-xl relative flex p-4 hover:translate-y-1 hover:shadow-xl">
                    <div className="flex">
                      <span
                        style={{
                          boxSizing: "border-box",
                          display: "inline-block",
                          overflow: "hidden",
                          width: "initial",
                          height: "initial",
                          background: "none",
                          opacity: 1,
                          border: "0px",
                          margin: "0px",
                          padding: "0px",
                          position: "relative",
                          maxWidth: "100%",
                        }}
                      >
                        <span
                          style={{
                            boxSizing: "border-box",
                            display: "block",
                            width: "initial",
                            height: "initial",
                            background: "none",
                            opacity: 1,
                            border: "0px",
                            margin: "0px",
                            padding: "0px",
                            position: "relative",
                            maxWidth: "100%",
                          }}
                        >
                          <img
                            aria-hidden={true}
                            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iNTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmVyc2lvbj0iMS4xIi8+"
                            style={{
                              display: "block",
                              maxWidth: "100%",
                              width: "initial",
                              height: "initial",
                              background: "none",
                              opacity: 1,
                              border: "0px",
                              margin: "0px",
                              padding: "0px",
                            }}
                          />
                        </span>
                        <img
                          src="https://media.bitcoinfiles.org/0d2c1c80a558cbedaf09d33a4671413e75f6e6c0f6447c7e4bdc22d0464ec6f7"
                          decoding="async"
                          style={{
                            position: "absolute",
                            inset: "0px",
                            boxSizing: "border-box",
                            padding: "0px",
                            border: "none",
                            margin: "auto",
                            display: "block",
                            width: "0px",
                            height: "0px",
                            minWidth: "100%",
                            maxWidth: "100%",
                            minHeight: "100%",
                            maxHeight: "100%",
                          }}
                        />
                      </span>
                    </div>
                    <div className="flex flex-col justify-center ml-2.5">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        Lock
                      </p>
                      <p className="mt-1.5 text-sm text-gray-900 dark:text-white">
                        Floor:
                        <span className="ml-1 text-green-700 dark:text-green-500">
                          99 BSV
                        </span>
                      </p>
                    </div>
                  </a>
                </Link>
              </div>
            </div> */}
          </div>
          <div className="px-4 my-4">
            <div className="flex">
              <Link href="/features">
                <a className="text-gray-700 dark:text-gray-300 text-sm py-2 px-3 mr-2 cursor-pointer rounded-md whitespace-nowrap">
                  In Progress
                </a>
              </Link>
              <Link href="/features/completed">
                <a className="bg-gray-100 dark:bg-gray-600 font-semibold  text-gray-900 dark:text-white text-sm py-2 px-3 mr-2 cursor-pointer rounded-md whitespace-nowrap">
                  Completed
                </a>
              </Link>
            </div>
          </div>
          {/* <div className="px-4 lg:px-0 grid mt-4 lg:mt-7 gap-4 lg:gap-7 grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
                <div className="bg-gray-100 rounded-lg p-4 w-full relative flex flex-col">
                  <p className="text-xs text-blue-500 mb-1.5">🔦 Spotlight</p>
                  <p className="text-lg font-semibold text-gray-900">No code website builder</p>
                  <p className="text-sm text-gray-900 mt-2">Create your own Twetch client in a few clicks.</p>
                  <div className="grow"/>
                  <div className="mt-3">
                    <div className="flex items-center">
                        <p className="text-sm text-gray-900">Progress</p>
                        <div className="grow"/>
                        <p className="text-xs text-gray-900">0/218 BSV</p>
                    </div>
                    <div className="relative w-full bg-green-900 bg-opacity-50  h-2 rounded-lg">
                      <div className="h-2 absolute top-0 left-0 bg-green-500 rounded-lg" style={{width:"0%"}}/>
                    </div>  
                  </div>
                  <div className="mt-4">
                    <div className="flex">
                      <div className="mr-3 flex items-center">
                        <input 
                          className="border-none rounded-l-md text-gray-900 bg-gray-300 py-1 pl-2.5 text-base focus:outline-none" 
                          type="number" 
                          autoComplete="off" 
                          min={0.1} 
                          step={0.1} 
                          value={amount} 
                          onChange={handleChange}/>
                        <div className="bg-gray-300 rounded-r-md py-1 pr-2.5">BSV</div>
                      </div>
                      <button className="py-1 px-4 border-none rounded-md text-white bg-gradient-to-tr from-blue-400 to-blue-500 cursor-pointer flex items-center text-center justify-center disabled:opacity-50 transition duration-500 transform hover:-translate-y-1">Pay</button>
                    </div>
                  </div>
                </div>
          </div> */}
        </div>
      </PanelLayout>
    </>
  );
}
