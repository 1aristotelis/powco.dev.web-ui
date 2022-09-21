import { Crawler } from "./rabbi/bitbus";

import events from "./events";
import { knex } from "./knex";

const moment = require('moment')

export const transactionQueue = require('fastq').promise(handleBMAPTransaction, 2)

export interface BMAPTransaction {
  AIP?: any,
  B: any,
  MAP: any,
  tx_id: string,
  timestamp: Date,
  url?: string
}

export async function sync_bitchat() {

  const query = {
    "v": 3,
    "q": {
      "find": {
        "MAP.type": "message"
      },
      "sort": {
        "blk.t": 1
      },
      "limit": 1000
    }
}
  let query_b64 = btoa(JSON.stringify(query)) 

  const crawler = new Crawler({

      query: query_b64,

      onTransaction: (res) => {
        let outputs = res.c
        outputs.forEach((item) => {
          try {
            item.m = `${item.MAP.paymail || item.AIP.address}: ${item.B.content.trim()}`
          } catch (e) {
          }
          item.timestamp = moment(item.blk.t*1000).format('M/D, h:mm:ss a');
          item.url = item.MAP.type === 'post' ? item.MAP.app === 'twetch' ? 'https://cozy-homes.xyz/t/' : 'https://blockpost.network/post/' : 'https://whatsonchain.com/tx/'
        })
        outputs = [...outputs.sort((a, b) => a.blk.t > b.blk.t ? -1 : 1)]

        outputs.map(output => {

          let message = {
            AIP: output.AIP,
            B: output.B,
            MAP: output.MAP,
            timestamp: output.timestamp,
            tx_id: output.tx.h,
            url: output.url
          }
          //console.log(message)   
          transactionQueue.push(message)

        })
      }
  })

  crawler.start()
}

export async function handleBMAPTransaction(data: BMAPTransaction) {
  var { AIP, B, MAP, timestamp, tx_id, url } = data

  //console.log(data)
  var [record] = await knex('messages').where({tx_id}).select('*')

  if (record) { 
    
    console.log('message.duplicate', record.tx_id)
  } else {
    
    try {
    
      const insert = {
        tx_id,
        timestamp,
        content: B.content,
        user: AIP ? AIP.address : MAP.paymail,
        url 
      }

      record = await knex('messages').insert(insert)

      console.log('message.recorded', {insert,record})
  
    } catch (error) {
      
      console.log('message.record.error', error)
  
    }

  }

  
}