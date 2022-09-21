import React from 'react'

const moment = require('moment')

export interface Message {
    id: number;
    tx_id: string;
    content: string;
    timestamp: Date;
    user: string;
    url: string
}

export const MessageCard = (msg:Message) => {
  return (
    <div >
        <div className='text-[#21E800] break-words'>
            <span>{`${msg.user}: `}</span>
            <span>{msg.content}</span>
        </div>
        <div className='text-gray-600 text-xs'>
            <a href={`${msg.url}${msg.tx_id}`} target="_blank" rel="noreferrer">
                {moment(msg.timestamp).format("M/D, h:mm:ss a")}
            </a>
        </div>
    </div>
  )
}

