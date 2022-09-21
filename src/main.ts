
import config from './config'

import { start as server } from './server'

import { knex } from './knex'

import { start as actors } from './rabbi/actors'
import { bitsocket } from './rabbi/bitsocket';
import { sync_bitchat } from './planaria';

export async function start() {

  await knex.migrate.latest();

  if (config.get('http_api_enabled')) {

    server();

  }

  if (config.get('amqp_enabled')) {

    actors();

  }

  sync_bitchat()

  bitsocket().on('message', (msg) => {

    console.log(msg)

  })

}

if (require.main === module) {

  start()

}
