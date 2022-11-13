import { Crawler_BitBus, Crawler_BMAP } from "./rabbi/bitbus";

import { log } from "./log"
import events from "./events";
import { knex } from "./knex";

const moment = require('moment')

export const transactionQueue = require('fastq').promise(handleBitcoinTransaction, 1)

export interface BMAPTransaction {
  AIP?: any,
  B: any,
  MAP: any,
  tx_id: string,
  timestamp: Date,
  source:string,
}

interface SapiencePost {
  reply_tx_id?: string;
  question_tx_id?: string;
  content:string;
}

export interface BitBusTransaction {
  tx_id: string;
  tx_index: number;
  app_id: string;
  timestamp:Date;
  key: string;
  value: SapiencePost;
  nonce?: string;
  author?: string;
  signature?: string;
  source: string;
}

export async function sync_askbitcoin_bitbus(){
  const block_height_start = 738000
  const app_id = "1HWaEAD5TXC2fWHDiua9Vue3Mf8V1ZmakN"


  const crawler = new Crawler_BitBus({

    query: {
      q: {
        find: {
          "out.s1": "onchain",
          "out.s3": app_id,
          "blk.i": {
            "$gt": block_height_start
          }
        },
        project: {
          "blk": 1,
          "tx.h": 1,
          "tx.t": 1,
          "out.i": 1,
          "out.s2": 1,
          "out.s3": 1,
          "out.s4": 1,
          "out.s5": 1,
          "out.s6": 1,
          "out.s7": 1,
          "out.s8": 1,
          "out.s9": 1,
          "out.s10": 1,
          "out.s11": 1,
          "out.o1": 1
        }
      }
    },

    onTransaction: (json) => {

      let outputs = json.out
        .filter(({s2}) => s2 === 'onchain')
        .filter(({s3}) => s3 === app_id)

      outputs.map(output => {

        var value = output['s5']

        if (typeof value === 'string') {

          value = JSON.parse(value)

        }

        let post: BitBusTransaction = {
          tx_id: json['tx']['h'],
          tx_index: output['i'],
          timestamp:json['blk']['t'],
          app_id: output['s3'],
          key: output['s4'],
          value,
          nonce: output['s6'],
          author: output['s7'],
          signature: output['s8'],
          source: 'bitbus'
        }

        transactionQueue.push(post)

      })

    }
  })

  crawler.start()

  const crawler_sv = new Crawler_BitBus({

    query: {
      q: {
        find: {
          "out.s2": "onchain",
          "out.s3": app_id,
          "blk.i": {
            "$gt": block_height_start
          }
        },
        project: {
          "blk": 1,
          "tx.h": 1,
          "tx.t": 1,
          "out.i": 1,
          "out.s2": 1,
          "out.s3": 1,
          "out.s4": 1,
          "out.s5": 1,
          "out.s6": 1,
          "out.s7": 1,
          "out.s8": 1,
          "out.s9": 1,
          "out.s10": 1,
          "out.s11": 1,
          "out.o1": 1
        }
      }
    },

    onTransaction: (json) => {

      let outputs = json.out
        .filter(({s2}) => s2 === 'onchain')
        .filter(({s3}) => s3 === app_id)

      outputs.map(output => {

        var value = output['s5']

        if (typeof value === 'string') {

          value = JSON.parse(value)

        }

        let post: BitBusTransaction = {
          tx_id: json['tx']['h'],
          tx_index: output['i'],
          timestamp: json['blk']['t'],
          app_id: output['s3'],
          key: output['s4'],
          value,
          nonce: output['s6'],
          author: output['s7'],
          signature: output['s8'],
          source: 'bitbus'
        }

        transactionQueue.push(post)

      })

    }
  })

  crawler_sv.start()
}

export async function sync_sapience_bitbus(){
  const block_height_start = 738000
  const app_id = "1HWaEAD5TXC2fWHDiua9Vue3Mf8V1ZmakN"


  const crawler = new Crawler_BitBus({

    query: {
      q: {
        find: {
          "out.s1": "onchain",
          "out.s3": app_id,
          "blk.i": {
            "$gt": block_height_start
          }
        },
        project: {
          "blk": 1,
          "tx.h": 1,
          "tx.t": 1,
          "out.i": 1,
          "out.s2": 1,
          "out.s3": 1,
          "out.s4": 1,
          "out.s5": 1,
          "out.s6": 1,
          "out.s7": 1,
          "out.s8": 1,
          "out.s9": 1,
          "out.s10": 1,
          "out.s11": 1,
          "out.o1": 1
        }
      }
    },

    onTransaction: (json) => {

      let outputs = json.out
        .filter(({s2}) => s2 === 'onchain')
        .filter(({s3}) => s3 === app_id)

      outputs.map(output => {

        var value = output['s5']

        if (typeof value === 'string') {

          value = JSON.parse(value)

        }

        let post: BitBusTransaction = {
          tx_id: json['tx']['h'],
          tx_index: output['i'],
          timestamp:json['blk']['t'],
          app_id: output['s3'],
          key: output['s4'],
          value,
          nonce: output['s6'],
          author: output['s7'],
          signature: output['s8'],
          source: 'bitbus'
        }

        transactionQueue.push(post)

      })

    }
  })

  crawler.start()

  const crawler_sv = new Crawler_BitBus({

    query: {
      q: {
        find: {
          "out.s2": "onchain",
          "out.s3": app_id,
          "blk.i": {
            "$gt": block_height_start
          }
        },
        project: {
          "blk": 1,
          "tx.h": 1,
          "tx.t": 1,
          "out.i": 1,
          "out.s2": 1,
          "out.s3": 1,
          "out.s4": 1,
          "out.s5": 1,
          "out.s6": 1,
          "out.s7": 1,
          "out.s8": 1,
          "out.s9": 1,
          "out.s10": 1,
          "out.s11": 1,
          "out.o1": 1
        }
      }
    },

    onTransaction: (json) => {

      let outputs = json.out
        .filter(({s2}) => s2 === 'onchain')
        .filter(({s3}) => s3 === app_id)

      outputs.map(output => {

        var value = output['s5']

        if (typeof value === 'string') {

          value = JSON.parse(value)

        }

        let post: BitBusTransaction = {
          tx_id: json['tx']['h'],
          tx_index: output['i'],
          timestamp: json['blk']['t'],
          app_id: output['s3'],
          key: output['s4'],
          value,
          nonce: output['s6'],
          author: output['s7'],
          signature: output['s8'],
          source: 'bitbus'
        }

        transactionQueue.push(post)

      })

    }
  })

  crawler_sv.start()
}

export async function sync_sapience_bmap() {
  const bmap_query = {
    "v": 3,
    "q": {
      "find": {
        "MAP.type": "post",
        "MAP.tags": {"$in": ["1F9E9","1F4A1","1F48E", "test"]}
      },
      "sort": {
        "blk.t": -1
      },
      "project": {
        out:0,
        in:0
    },
      "limit": 100
    }
  }  
  let query_b64 = btoa(JSON.stringify(bmap_query)) 

  const crawler = new Crawler_BMAP({

    query: query_b64,

    onTransaction: (res) => {
      let outputs = res.c

      outputs.map(output => {

        let post = {
          AIP: output.AIP,
          B: output.B,
          MAP: output.MAP,
          timestamp: output.timestamp,
          tx_id: output.tx.h,
          source: "bmap"
        }
        console.log("syncing tx:", post.tx_id)
        transactionQueue.push(post)

      })
    }
  })



crawler.start()


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

  const crawler = new Crawler_BMAP({

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

        outputs.map(output => {

          let message = {
            AIP: output.AIP,
            B: output.B,
            MAP: output.MAP,
            timestamp: output.timestamp,
            tx_id: output.tx.h,
            url: output.url, 
            source: "bmap"
          }
          //console.log(message)   
          transactionQueue.push(message)

        })
      }
  })

  crawler.start()
}

export async function handleBitcoinTransaction(data: any){
  if (data.source === "bitbus" || data.source === "bitsocket"){
    handleBitBusTransaction(data)
  } else if (data.source === "bmap"){
    handleBMAPTransaction(data)
  } else {
    console.error("handleBitcoinTransaction.error.sourceNotFound", data)
  }
}

export async function handleBitBusTransaction(data: BitBusTransaction){

  var { tx_id, tx_index, timestamp, app_id, key, value, nonce, author, signature } = data

  
  //insert posts
  
  var [record] = await knex('posts').where({tx_id}).select('*')
  
  if (record) { 
    
    console.log('post.duplicate', record.tx_id)
  } else {

    try {

      if (typeof value === 'string') {
  
        value = JSON.parse(value)
  
      }
  
    } catch(error) {
  
      log.debug('handleOnchainTransaction.error', error)
  
      return
  
    }
    
    if (key === "1F9E9" || key === "1F4A1" || key === "1F48E" || key === "test" || key === "question" || key === "answer"){
      console.log(value)

      let tag 

      if (key === "question"){
        tag = "1F9E9"
      } else if (key === "answer") {
        tag = "1F4A1"
      } else {
        tag = key
      }
      
      try {
        const insert = {
          tx_id,
          reply_tx_id: value.reply_tx_id || value.question_tx_id,
          timestamp,
          content: value.content,
          user: "anonymous@relayx.io",
          tag: tag,
        }
        
        record = await knex('posts').insert(insert)
        
        console.log('post.recorded', {insert,record})
        
      } catch (error) {
        
        console.log('bitbus.post.record.error', error)
        
      }
  }

  }

}

export async function handleBMAPTransaction(data: BMAPTransaction) {
  var { AIP, B, MAP, timestamp, tx_id } = data

  if (MAP.type === "message"){
    //we don't want to store messages
    return
  }

  //insert posts

  var [record] = await knex('posts').where({tx_id}).select('*')

  if (record) { 

    console.log('post.duplicate', record.tx_id)
  } else {
    
    try {
    
      const insert = {
        tx_id,
        reply_tx_id:MAP[0].tx,
        timestamp,
        content: B.content,
        user: AIP ? AIP.address : MAP[0].paymail,
        tag: MAP[1].tags[0]
      }

      record = await knex('posts').insert(insert)

      console.log('post.recorded', {insert,record})
      events.emit('post.create', record)
  
    } catch (error) {
      
      console.log('bmap.post.record.error', error)
  
    }

  }

}