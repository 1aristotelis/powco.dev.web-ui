import { knex } from './knex'
import  fetch  from "node-fetch"

interface Message {
    tx_id: string;
    content: string;
    user: string;
    timestamp: Date;
    url: string;
}

interface MessagesQuery {
    channel?:string;
    start_timestamp?: string;
    end_timestamp?: string;
}

export async function loadMessages (query: MessagesQuery={}): Promise<Message[]> {


    const bmap_query = {
        "v": 3,
        "q": {
          "find": {
            "MAP.type": "message",
            "MAP.channel":query.channel
          },
          "sort": {
            "blk.t": -1
          },
          "limit": 100
        }
    }

    let query_b64 = btoa(JSON.stringify(bmap_query)) 

    let query_url = `https://b.map.sv/q/${query_b64}`

    let res = await fetch(query_url)
    let json = await res.json()
    let result = json.c   
    let messages = result.map((msg)=>{
        return {
            tx_id: msg.tx.h,
            timestamp: msg.timestamp,
            content: msg.B.content,
            channel: msg.MAP.channel,
            user: msg.AIP ? msg.AIP.address : msg.MAP.paymail
        }
    })
    return messages
    // Do we really want to store messages ? 

    let messages1 = await knex('messages')
        .orderBy('id', 'asc')
        .select('*')
    return messages 
}

interface MessageQuery {
    tx_id: string;
    start_timestamp?: string;
    end_timestamp?: string;
}

export async function loadMessage (query: MessageQuery): Promise<Message> {

    let message = await knex('messages')
        .where('messages.tx_id', query.tx_id)
        .select('*')
    
    return message 
}