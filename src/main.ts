
import config from './config'

import { start as server } from './server'

import { knex } from './knex'

import { start as actors } from './rabbi/actors'
import { bitsocket } from './rabbi/bitsocket';
import { sync_bitchat } from './planaria';

import { spawn } from 'child_process'

export async function start() {

  await knex.migrate.latest();

  if (config.get('webui_enabled')){

    const nexjs = spawn("npm", ["run", "dev"], {

      cwd: `${process.cwd()}/web-ui`

    })

  }

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
