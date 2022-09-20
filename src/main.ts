
import config from './config'

import { start as server } from './server'

import { start as actors } from './rabbi/actors'
import { bitsocket } from './rabbi/bitsocket';
import { sync_bitchat } from './planaria';

export async function start() {

  if (config.get('http_api_enabled')) {

    server();

  }

  if (config.get('amqp_enabled')) {

    actors();

  }

  sync_bitchat()

  return


  bitsocket().on('message', (msg) => {

    console.log(msg)

  })

}

if (require.main === module) {

  start()

}
