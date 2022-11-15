/* import React, { useContext, useState, useEffect } from "react";
import Head from "next/head";
import {
  NotificationCard,
  ThreeColumnLayout,
  Loader,
  NotificationsLayout,
} from "../components";
import { UserContext } from "../components/UserContext";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  getNotificationsFeed,
  getNotificationsFeedPagination,
} from "../services"; */

export default function Notifications() {
  /* const { me } = useContext(UserContext);
  const [notifications, setNotifications] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState(null);

  useEffect(() => {
    me.id &&
      getNotificationsFeed(me.id).then((data) => {
        setNotifications(data.edges.map((edge) => edge.node));
        setCursor(data.pageInfo.endCursor);
        setHasMore(data.pageInfo.hasNextPage);
      });
  }, [me]);

  const refetch = async () => {
    setNotifications([]);
    setCursor("");
    setHasMore(true);
    me.id &&
      getNotificationsFeed(me.id).then((data) => {
        setNotifications(data.edges.map((edge) => edge.node));
        setCursor(data.pageInfo.endCursor);
        setHasMore(data.pageInfo.hasNextPage);
      });
  };

  const fetchMore = async () => {
    me.id &&
      getNotificationsFeedPagination(me.id, cursor).then((data) => {
        setNotifications(
          notifications.concat(data.edges.map((edge) => edge.node))
        );
        setCursor(data.pageInfo.endCursor);
        setHasMore(data.pageInfo.hasNextPage);
      });
  }; */

  return (
    <>
      notifications
      {/* <Head>
        <title>Cozy Homes - Notifications</title>
        <meta name="description" content="Cozy spaces for Twetch people" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/app-icon.png"></link>
      </Head>
      <NotificationsLayout>
        <div className="col-span-12 lg:col-span-6 min-h-screen">
          <div className="w-full mt-5">
            <div className="relative">
              <InfiniteScroll
                dataLength={notifications.length}
                hasMore={hasMore}
                next={fetchMore}
                loader={<Loader />}
                pullDownToRefresh
                pullDownToRefreshThreshold={50}
                refreshFunction={refetch}
              >
                {notifications.map((notification, index) => (
                  <NotificationCard key={index} {...notification} />
                ))}
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </NotificationsLayout> */}
    </>
  );
}
