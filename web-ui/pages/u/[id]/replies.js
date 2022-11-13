import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import {
  ThreeColumnLayout,
  Loader,
  PostCard,
  UserProfileCard,
} from "../../../components";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRouter } from "next/router";
import {
  userProfileCardAnonQuery,
  userProfileReplyFeedQuery,
  userProfileReplyFeedPaginationQuery,
} from "../../../services";
import { UserContext } from "../../../components/UserContext";

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  const userProfileCard = await userProfileCardAnonQuery(id);
  return { props: { userProfileCard } };
}

export default function UserPageReplies({ userProfileCard }) {
  const { me } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState("");
  const router = useRouter();
  const { id } = router.query;
  const [isMe, setIsMe] = useState(false);
  const [followsMe, setFollowsMe] = useState(false);
  const [meFollows, setMeFollows] = useState(false);
  const [numPosts, setNumPosts] = useState("--");
  const [itemsOwned, setItemsOwned] = useState("N/A");
  const [earned, setEarned] = useState("--");

  useEffect(() => {
    fetch(`/api/user/${userProfileCard.id}/stats`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenTwetchAuth")}`,
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        setNumPosts(resp.numPosts);
        setItemsOwned("N/A");
        setEarned(Math.round(resp.postsEarnedCalc + resp.payEarnedCalc));
      });
  }, [userProfileCard]);

  useEffect(() => {
    if (me.id) {
      if (me.id === userProfileCard.id) {
        setIsMe(true);
      } else {
        fetch(
          `/api/user/${userProfileCard.id}/follows?id=${userProfileCard.id}&&me=${me.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "tokenTwetchAuth"
              )}`,
              "content-type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((resp) => {
            if (resp.followersByUserId.totalCount !== 0) {
              setFollowsMe(true);
            }
            if (resp.followersByFollowerUserId.nodes.length !== 0) {
              setMeFollows(true);
            }
          });
      }
    }
  }, [me]);

  useEffect(() => {
    userProfileReplyFeedQuery(id).then((data) => {
      setPosts(data.edges.map((post) => post.node));
      setHasMore(data.pageInfo.hasNextPage);
      setCursor(data.pageInfo.endCursor);
    });
  }, [id]);

  const refresh = async () => {
    setPosts([]);
    setCursor("");
    setHasMore(true);
    userProfileReplyFeedQuery(id).then((data) => {
      setPosts(data.edges.map((post) => post.node));
      setHasMore(data.pageInfo.hasNextPage);
      setCursor(data.pageInfo.endCursor);
    });
  };

  const fetchMore = async () => {
    cursor &&
      userProfileReplyFeedPaginationQuery(id, cursor).then((data) => {
        setPosts(posts.concat(data.edges.map((post) => post.node)));
        setHasMore(data.pageInfo.hasNextPage);
        setCursor(data.pageInfo.endCursor);
      });
  };

  return (
    <>
      <Head>
        <title>Cozy Homes - {userProfileCard.name}&apos;s Profile </title>
        <meta name="description" content="Cozy spaces for Twetch people" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/app-icon.png"></link>
      </Head>
      <ThreeColumnLayout>
        <div className="col-span-12 lg:col-span-6 min-h-screen">
          <div className="">
            <div className="px-4">
              <UserProfileCard
                numPosts={numPosts}
                itemsOwned={itemsOwned}
                earned={earned}
                me={me}
                isMe={isMe}
                followsMe={followsMe}
                meFollows={meFollows}
                userProfileCard={userProfileCard}
              />
              <div className="flex mt-6 mb-4 mx-0">
                <div className="flex">
                  <Link href={`/u/${userProfileCard.id}/latest`}>
                    <div className="text-sm leading-4 py-2 px-3 text-gray-700 dark:text-gray-300 font-normal mr-2 cursor-pointer rounded-md whitespace-nowrap">
                      Latest
                    </div>
                  </Link>
                  <Link href={`/u/${userProfileCard.id}/replies`}>
                    <div className="text-sm leading-4 py-2 px-3 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-600 font-medium mr-2 cursor-pointer rounded-md whitespace-nowrap">
                      Replies
                    </div>
                  </Link>
                  <Link href={`/u/${userProfileCard.id}/likes`}>
                    <div className="text-sm leading-4 py-2 px-3 text-gray-700 dark:text-gray-300 font-normal mr-2 cursor-pointer rounded-md whitespace-nowrap">
                      Likes
                    </div>
                  </Link>
                  {/* <Link href={`/u/${userProfileCard.id}/media`}>
                    <div className="text-sm leading-4 py-2 px-3 text-gray-700 dark:text-gray-300 font-normal mr-2 cursor-pointer rounded-md whitespace-nowrap">
                      Media
                    </div>
                  </Link> */}
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
          </div>
          {me.id && (
            <Link href="/compose">
              <div className="lg:hidden fixed bottom-[73px] right-[14px] h-14 w-14 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 flex items-center justify-center cursor-pointer">
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
