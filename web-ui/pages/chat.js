import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { mutate } from "swr";
import { ChatComposer, ChatLayout, MessageCard } from "../components";
import { useAPI } from "../hooks/useAPI";

export default function Chat() {
  let channelId = "powco"; //duplicate on chatcomposer
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const bmap_query = {
      v: 3,
      q: {
        find: {
          "MAP.type": "message",
          "MAP.channel": channelId,
        },
        project: {
          out: 0,
          in: 0,
        },
      },
    };

    let query_b64 = btoa(JSON.stringify(bmap_query));

    let query_url = `https://b.map.sv/s/${query_b64}`;
    if (typeof EventSource !== "undefined") {
      const stream = new EventSource(query_url);
      stream.onmessage = (e) => {
        let payload = JSON.parse(e.data);
        //console.log(payload);
        if (payload.type === "push") {
          let data = payload.data[0];
          console.log(data);
          let message = {
            tx_id: data.tx.h,
            timestamp: data.timestamp,
            content: data.B.content,
            channel: data.MAP.channel,
            user: data.AIP ? data.AIP.address : data.MAP.paymail,
          };
          mutate("http://localhost:5200", message, false);
        }
      };
      stream.onerror = (e) => {
        e.data && console.log("stream.error", e.data);
      };
    }
  }, []);

  const { data, error, loading } = useAPI(`/messages?channel=${channelId}`);

  useEffect(() => {
    !error && !loading && setMessages(data.messages);
  }, [data, loading]);

  // Scroll to bottom of the chat history whenever there is a new message
  const containerBottomRef = useRef(null);
  useEffect(() => {
    containerBottomRef.current.scrollIntoView(false);
  }, [messages, containerBottomRef]);

  return (
    <ChatLayout>
      <div className="flex flex-col col-span-12 lg:col-span-6 min-h-screen">
        <div className="grow flex flex-col-reverse pt-5 ">
          {messages.length > 0 &&
            messages.map((msg) => <MessageCard key={msg.tx_id} {...msg} />)}
        </div>
        <div className="sticky bottom-0 bg-gray-300 dark:bg-gray-700">
          <ChatComposer />
        </div>
        <div ref={containerBottomRef}></div>
      </div>
    </ChatLayout>
  );
}
