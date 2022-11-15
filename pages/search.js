/* import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { ThreeColumnLayout, Loader, PostCard, UserIcon } from "../components";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  getPostResults,
  getUserResults,
  getPostResultsPagination,
  getUserResultsPagination,
} from "../services";
import { UserContext } from "../components/UserContext";
import { useRouter } from "next/router"; */

export default function Search() {
  /* const { me } = useContext(UserContext);
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState(router.query.v);
  const [postResults, setPostResults] = useState([]);
  const [userResults, setUserResults] = useState([]);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [cursorPosts, setCursorPosts] = useState(null);
  const [hasMoreUsers, setHasMoreUsers] = useState(true);
  const [cursorUsers, setCursorUsers] = useState(null);

  useEffect(() => {
    if (searchInput === undefined) {
      setSearchInput("");
    } else {
      setUserResults([]);
      setCursorUsers("");
      setHasMoreUsers(true);
      getUserResults(searchInput, me.id).then((data) => {
        setUserResults(data.edges.map((user) => user.node).splice(0, 3));
        setHasMoreUsers(data.pageInfo.hasNextPage);
        setCursorUsers(data.pageInfo.endCursor);
      });
    }
  }, [searchInput]);

  useEffect(() => {
    if (searchInput === undefined) {
      setSearchInput("");
    } else {
      setPostResults([]);
      setCursorPosts("");
      setHasMorePosts(true);
      getPostResults(searchInput).then((data) => {
        setPostResults(data.edges.map((post) => post.node));
        setHasMorePosts(data.pageInfo.hasNextPage);
        setCursorPosts(data.pageInfo.endCursor);
      });
    }
  }, [searchInput]);

  const refreshUsers = async () => {
    setUserResults([]);
    setCursorUsers("");
    setHasMoreUsers(true);
    getUserResults(searchInput, me.id).then((data) => {
      setUserResults(data.edges.map((user) => user.node).splice(0, 3));
      setHasMoreUsers(data.pageInfo.hasNextPage);
      setCursorUsers(data.pageInfo.endCursor);
    });
  };

  const fetchMoreUsers = async () => {
    cursorUsers &&
      getUserResultsPagination(searchInput, me.id, cursorUsers).then((data) => {
        setUserResults(userResults.concat(data.edges.map((user) => user.node)));
        setHasMoreUser(data.pageInfo.hasNextPage);
        setCursorUser(data.pageInfo.endCursor);
      });
  };

  const refreshPosts = async () => {
    setPostResults([]);
    setCursorPosts("");
    setHasMorePosts(true);
    getPostResults(searchInput).then((data) => {
      setPostResults(data.edges.map((post) => post.node));
      setHasMorePosts(data.pageInfo.hasNextPage);
      setCursorPosts(data.pageInfo.endCursor);
    });
  };

  const fetchMorePosts = async () => {
    cursorPosts &&
      getPostResultsPagination(searchInput, cursorPosts).then((data) => {
        setPostResults(postResults.concat(data.edges.map((post) => post.node)));
        setHasMorePosts(data.pageInfo.hasNextPage);
        setCursorPosts(data.pageInfo.endCursor);
      });
  };

  const handleChange = async (e) => {
    clearTimeout(SearchTimeOut);
    e.preventDefault();
    setSearchTerm(e.target.value);
    router.push(`/search?v=${searchTerm}&p=posts`, undefined, {
      shallow: true,
    });

    const SearchTimeOut = setTimeout(() => {
      console.log("here");
      setSearchInput(searchTerm);
    }, 1000);
  }; */

  return (
    <>
      search
      {/* <Head>
        <title>Cozy Homes - Search</title>
        <meta name="description" content="Cozy spaces for Twetch people" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/app-icon.png"></link>
      </Head>
      <ThreeColumnLayout>
        <div className="col-span-12 lg:col-span-6 min-h-screen">
          <div className="mt-8">
            <div className="relative flex flex-col mb-4">
              <div className="mb-0 flex items-center">
                <input
                  className="rounded-lg bg-gray-100 dark:bg-gray-600 appearance-none border-none focus:outline-none text-gray-900 dark:text-white w-full py-2.5 px-4 text-lg"
                  placeholder="Search"
                  id="search-input"
                  autoComplete="off"
                  value={searchTerm}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col rounded-lg bg-gray-100 dark:bg-gray-600 w-full mb-4">
            <div className="flex flex-row  py-0 px-4 h-[50px] items-center">
              <p className="text-lg font-bold text-gray-700 dark:text-white text-left ">
                People
              </p>
              <div className="grow" />
              <Link href={`/search?v=${searchInput}&p=users`}>
                <p className="text-blue-500 font-semibold text-xs cursor-pointer ">
                  View all
                </p>
              </Link>
            </div>
            {userResults.map((user) => (
              <Link key={user.id} href={`/u/${user.id}`}>
                <a className="sm:last:rounded-b-lg overflow-hidden flex items-center py-3 px-4 cursor-pointer bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 hover:dark:bg-gray-800  w-full">
                  <UserIcon src={user.icon} size={36} />
                  <div className="ml-3 grow w-[calc(100%-138px)]">
                    <p className="text-sm font-bold text-gray-900 dark:text-white whitespace-nowrap overflow-hidden text-ellipsis ">
                      {user.name}
                    </p>
                    <p className="text-sm font-semibold text-gray-600">
                      @{user.id}
                    </p>
                  </div>
                  {meFollows ? (
                    <button className="h-8 text-white text-sm leading-4 font-semibold p-4  border-none rounded-md bg-gradient-to-r from-sky-500 to-indigo-500 cursor-pointer flex items-center text-center justify-content">
                      Following
                    </button>
                  ) : isMe ? (
                    <></>
                  ) : (
                    <button className="h-8 text-sm leading-4 font-semibold p-4  rounded-md border border-solid border-blue-500 cursor-pointer flex items-center text-center justify-content">
                      Follow
                    </button>
                  )}
                </a>
              </Link>
            ))}
          </div>
          <div className="w-full">
            <div className="relative">
              <InfiniteScroll
                dataLength={postResults.length}
                hasMore={hasMorePosts}
                next={fetchMorePosts}
                loader={<Loader />}
                pullDownToRefresh
                pullDownToRefreshThreshold={50}
                refreshFunction={refreshPosts}
              >
                {postResults.map((post) => (
                  <PostCard key={post.transaction} post={post} />
                ))}
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </ThreeColumnLayout> */}
    </>
  );
}
