import React, { useContext, useState, useEffect } from "react";
import { postDetailQuery } from "../../services";
import { BigNumber } from "bignumber.js";
import Link from "next/link";
import {
  ThreeColumnLayout,
  PostDetailCard,
  PostReplyCard,
  Composer,
  SimplePostCard,
  DetailPostCard,
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
  const [answers, setAnswers] = useState([]);
  const router = useRouter();
  const { tx_id } = router.query;
  const { authenticated } = useBitcoin();
  const { startTimestamp } = useTuning();

  let { data, error, refresh, loading } = useAPI(
    tx_id !== undefined ? `/questions/${tx_id}` : null //?start_timestamp=${startTimestamp}`
  );

  useEffect(() => {
    console.log(data, loading, error);
    let newData;
    if (data?.question !== undefined) {
      newData = data.question;
      newData.difficulty = newData.boostpow_proofs.reduce((sum, proof) => {
        return new BigNumber(sum).plus(proof.difficulty).toNumber();
      }, 0);

      newData.answers = newData.answers.map((answer) => {
        return Object.assign(answer, {
          difficulty: answer.boostpow_proofs.reduce((sum, { difficulty }) => {
            return new BigNumber(sum).plus(difficulty).toNumber();
          }, 0),
        });
      });
      newData.answers = newData.answers.sort((a, b) =>
        a.difficulty < b.difficulty ? 1 : -1
      );
    } else {
      return;
    }

    if (data) {
      setPost(newData);
      setAnswers(newData.answers);
    } else {
      !error && !loading && data && setPost(newData);
      !error && !loading && data && setAnswers(newData.answers);
    }

    //console.log(data, loading, error);
  }, [data, tx_id, router, startTimestamp]);

  return (
    <ThreeColumnLayout>
      <div className="col-span-12 lg:col-span-6 min-h-screen pb-20">
        <div className="mt-4 lg:mt-10">
          {!loading && !error && <DetailPostCard post={post} />}
          {!loading && !error && (
            <div className="bg-gray-100 dark:bg-gray-600 rounded-b-lg py-3 px-4 mb-1">
              <Composer reply_tx={tx_id} />
            </div>
          )}
          {answers?.map((answer) => (
            <DetailPostCard key={answer.tx_id} post={answer} />
          ))}
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
