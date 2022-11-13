import react, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { ThreeColumnLayout, Loader, PostCard, Composer } from "../components";
import InfiniteScroll from "react-infinite-scroll-component";
import { getGlobalFeed, getGlobalFeedPagination } from "../services";
import Link from "next/link";
import { UserContext } from "../components/UserContext";

export default function GlobalFeed() {
  const { me } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState(null);

  useEffect(() => {
    getGlobalFeed().then((data) => {
      setPosts(data.edges.map((post) => post.node));
      setHasMore(data.pageInfo.hasNextPage);
      setCursor(data.pageInfo.endCursor);
    });
  }, []);

  const refresh = async () => {
    setPosts([]);
    setCursor("");
    setHasMore(true);
    getGlobalFeed().then((data) => {
      setPosts(data.edges.map((post) => post.node));
      setHasMore(data.pageInfo.hasNextPage);
      setCursor(data.pageInfo.endCursor);
    });
  };

  const fetchMore = async () => {
    cursor &&
      getGlobalFeedPagination(cursor).then((data) => {
        setPosts(posts.concat(data.edges.map((post) => post.node)));
        setHasMore(data.pageInfo.hasNextPage);
        setCursor(data.pageInfo.endCursor);
      });
  };

  return (
    <>
      <Head>
        <title>Cozy Homes</title>
        <meta name="description" content="Cozy spaces for Twetch people" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/app-icon.png"></link>
      </Head>
      <ThreeColumnLayout>
        <div className="col-span-12 lg:col-span-6 min-h-screen">
          <div className="hidden lg:block mt-8">
            <Composer />
          </div>
          <div className="px-4 mt-2">
            <div className=""></div>
            <div className="flex my-6">
              <div className="flex">
                <Link href="/">
                  <div className="text-sm leading-4 py-2 px-3 text-gray-700 dark:text-gray-300 font-normal mr-2 cursor-pointer rounded-md whitespace-nowrap">
                    Local
                  </div>
                </Link>
                <Link href="/global">
                  <div className="text-sm leading-4 py-2 px-3 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-600 font-medium mr-2 cursor-pointer rounded-md whitespace-nowrap">
                    Global
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="relative">
              <InfiniteScroll
                dataLength={posts.length}
                hasMore={hasMore}
                next={fetchMore}
                loader={<Loader />}
                pullDownToRefresh
                pullDownToRefreshThreshold={50}
                refreshFunction={refresh}
              >
                {posts.map((post) => (
                  <PostCard key={post.transaction} post={post} />
                ))}
              </InfiniteScroll>
            </div>
          </div>
          {me.id && (
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
    </>
  );
}
