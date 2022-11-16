import React, { useContext, useState, useEffect } from "react";
import { postDetailQuery } from "../../services";
import Link from "next/link";
import BigNumber from "bignumber.js";
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
import DetailPostCard from "../../components/DetailPostCard";
import axios from "axios";

/* export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  const postDetail = await postDetailQuery(id);
  return { props: { postDetail } };
} */

export default function DetailPage() {
  const [children, setChildren] = useState([]);
  const [parent, setParent] = useState();
  const [post, setPost] = useState();
  const router = useRouter();
  const { tx_id } = router.query;
  const { authenticated } = useBitcoin();
  const { startTimestamp } = useTuning();

  useEffect(() => {
    if (!tx_id) {
      return;
    }
    try {
      axios
        .get(
          `https://askbitcoin.ai/api/v1/questions/${tx_id}?start_timestamp=${startTimestamp}`
        )
        .then((res) => {
          console.log(res.data);
          setPost(res.data.question);
          //setChildren(res.data.question.answers);
          return;
        });
    } catch (error) {
      console.log("question detail not found, trying answer");
    }
    try {
      axios
        .get(
          `https://askbitcoin.ai/api/v1/answers/${tx_id}?start_timestamp=${startTimestamp}`
        )
        .then((res) => {
          console.log(res.data);
          setPost(res.data.answer);
          setParent(res.data.answer.question);
          return;
        });
    } catch (error) {
      console.log("answer detail not found, trying onchain");
    }
    try {
      axios
        .get(
          `https://onchain.sv/api/v1/events/${tx_id}` //?start_timestamp=${startTimestamp}`
        )
        .then((res) => {
          console.log(res.data);
          setPost(res.data.events);
          return;
        });
    } catch (error) {
      console.log("answer detail not found, trying onchain");
    }
  }, [startTimestamp, router]);

  return (
    <ThreeColumnLayout>
      <div className="col-span-12 lg:col-span-6 min-h-screen">
        <div className="mt-4 lg:mt-10">
          {parent && <DetailPostCard post={parent} />}
          {post && <DetailPostCard post={post} />}
          <div className="bg-gray-100 dark:bg-gray-600 rounded-b-lg py-3 px-4 mb-1">
            <Composer reply_tx={tx_id} />
          </div>
          {children?.map((reply) => {
            return <DetailPostCard key={reply.tx_id} post={reply} />;
          })}
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
  );
}
