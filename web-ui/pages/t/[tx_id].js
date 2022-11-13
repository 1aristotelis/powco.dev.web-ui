import React, { useContext, useState, useEffect } from "react";
import Head from "next/head";
import { postDetailQuery } from "../../services";
import Link from "next/link";
import {
  ThreeColumnLayout,
  PostDetailCard,
  PostReplyCard,
  Composer,
  SimplePostCard,
} from "../../components";
import { useRouter } from "next/router";
import { useTuning } from "../../context/TuningContext";
import { useAPI } from "../../hooks/useAPI";
import { useBitcoin } from "../../context/BitcoinContext";

/* export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  const postDetail = await postDetailQuery(id);
  return { props: { postDetail } };
} */

export default function DetailPage() {
  const [post, setPost] = useState();
  const router = useRouter();
  const tx_id = router.query.tx_id;
  const { authenticated } = useBitcoin();
  const { startTimestamp } = useTuning();

  let { data, error, refresh, loading } = useAPI(
    `/posts/${tx_id}?start_timestamp=${startTimestamp}`
  );

  useEffect(() => {
    !error && !loading && data && setPost(data.post[0]);

    //console.log(data, loading, error);
  }, [data, tx_id, router, startTimestamp]);

  return (
    <>
      <Head>
        <title>Cozy Homes - Post Detail</title>
        <meta name="description" content="Cozy spaces for Twetch people" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/app-icon.png"></link>
      </Head>
      <ThreeColumnLayout>
        <div className="col-span-12 lg:col-span-6 min-h-screen">
          <div className="mt-4 lg:mt-10">
            {!loading && !error && <SimplePostCard post={post} />}
            <div className="bg-gray-100 dark:bg-gray-600 rounded-b-lg py-3 px-4 mb-1">
              <Composer reply_tx={tx_id} />
            </div>
            {/* {parents.edges.map((post) => (
              <PostReplyCard key={post.node.transaction} post={post.node} />
            ))}
            <PostDetailCard post={OP} />
            {me.id && (
              <div className="bg-gray-100 dark:bg-gray-600 rounded-b-lg py-3 px-4 mb-1">
                <Composer postDetail={OP} />
              </div>
            )}
            {firstchild && <PostReplyCard post={firstchild.node} isChild />}
            {children.edges.map((post) => (
              <PostReplyCard key={post.node.transaction} post={post.node} />
            ))}  */}
          </div>
        </div>
      </ThreeColumnLayout>
    </>
  );
}
