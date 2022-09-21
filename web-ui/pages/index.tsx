import { useEffect, useRef } from 'react';
import type { NextPage } from 'next'
import { MissingStaticPage } from 'next/dist/shared/lib/utils';
import { useAPI } from "../hooks/useAPI"
import { Message, MessageCard } from "../components/MessageCard"
import Composer from "../components/Composer"
import Welcome from '../components/Welcome';


const Home: NextPage = () => {
  const bottomRef = useRef<null | HTMLDivElement>(null); 

  const { data, error, refresh, loading } = useAPI(`/messages`);

  useEffect(()=> {
    console.log("here")
    bottomRef.current?.scrollIntoView({ behavior: 'auto' })
  },[data])

  if (error) {
    console.log('ERROR', error);
    return <p>Error</p>;
  }
  
  if (loading && !data){
    return (
      <div>
        <p>loading...</p>
      </div>
    )
  }

  const { messages } = data
  return (
    <div className='md:container md:md:mx-auto bg-black' >
      <div className='px-4 md:px-8 flex flex-col'>
        {messages.map((msg:Message)=>{
          return <MessageCard key={msg.tx_id} {...msg}/>
        })}
        <Welcome/>
        <Composer/>
        <div ref={bottomRef}/>
      </div>
    </div>
  )
}

export default Home
