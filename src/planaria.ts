import { Crawler } from "./rabbi/bitbus";

import { models, Message } from "./models"
import events from "./events";

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
          "MAP.type": { "$in": ["post","message"] }, 
        },
        "sort": {
          "blk.t": -1
        },
        "limit": 100
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
  
  try {
    var record = await models.Message.findOne({
      where: {
        tx_id
      }
    })
    
  } catch (error) {
    console.log('sync_bitchat.find.message.error')
  }
  
  
  if (record) { 
    
    console.log('sync_bitchat.message.duplicate')
    return record
  } else {
    
    console.log("trying to record tx:", tx_id)
    try {
    
      const [_message, isNew] = await Message.findOrCreate({
        where: {
          tx_id
        },
  
        defaults: {
          tx_id,
          timestamp,
          content: B.content,
          user : AIP? AIP.address : MAP.paymail,
          url
        }
      })
      console.log(isNew, _message)
  
      if (isNew) {
  
        console.log('sync_bitchat.message.created', _message)
  
        events.emit('sync_bitchat.message.created', _message)
  
      }
  
    } catch (error) {
      
      console.log('sync_bitchat.message.created', error)
  
    }

  }

  
}