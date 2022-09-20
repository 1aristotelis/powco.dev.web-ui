const EventSource = require('eventsource')
const moment = require('moment')

import { EventEmitter } from 'events'

import config from "../config"

import { transactionQueue } from '../planaria'

export function bitsocket(): EventEmitter {
    
    const emitter = new EventEmitter()

    const sock = {
        "v":3,
        "q":{
          "find":{
            "MAP.type": {"$in": ["post","message"]}, 
          },
          "sort": {
            "blk.t": -1
          }
        }
    }

    const sock_b64 = btoa(JSON.stringify(sock))
    const socket_url = `https://b.map.sv/s/${sock_b64}`

    const bitsocket = new EventSource(socket_url)
    bitsocket.onmessage = (e) => {
        let res = JSON.parse(e.data)
        //console.log(res)
        let data = res.data[0]
        if (res.type === 'push'){
          
          data.m = `${data.MAP.paymail || data.AIP?.address}: ${data.B.content.trim()}`
          data.timestamp = moment(data.blk.t*1000).format('M/D, h:mm:ss a');
          data.h = data.tx.h
          data.url = data.MAP.type === 'post' ? data.MAP.app === 'twetch' ? 'https://cozy-homes.xyz/t/' : 'https://blockpost.network/post/' : 'https://whatsonchain.com/tx/'
          

          if (emitter) {

            try {
              
              emitter.emit('message', data)

            } catch (error) {
              
            }

          }

          transactionQueue.push(data)


        } else if (res.type === 'block') {
            // TODO: put a new block message in the chat, BSV yellow color
            // var header = `NEW BLOCK ${data.block_height}`
        }
    }

    return emitter
}