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
  Loader,
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
  const { tx_id } = router.query;
  const { authenticated } = useBitcoin();
  const { startTimestamp } = useTuning();

  let { data, error, refresh, loading } = useAPI(
    tx_id !== undefined ? `/answers/${tx_id}` : null //?start_timestamp=${startTimestamp}`
  );

  useEffect(() => {
    console.log(data, loading, error);
    if (data?.answer) {
      setPost(data.answer);
    }
  }, [data]);

  return (
    <ThreeColumnLayout>
      <div className="col-span-12 lg:col-span-6 min-h-screen pb-20">
        <div className="mt-4 lg:mt-10">
          {loading && <Loader />}
          {!loading && !error && <SimplePostCard post={post} />}
        </div>
      </div>
    </ThreeColumnLayout>
  );
}
