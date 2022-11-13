
import config from './config'

import { start as server } from './server'

import { knex } from './knex'

import { start as actors } from './rabbi/actors'
import {sync_askbitcoin_bitbus, sync_sapience_bitbus} from './planaria';

import { spawn } from 'child_process'

import { log } from './log'

import events from './events';
import { buildPost } from './posts';
import { onchain, sapience_bmap_socket } from './rabbi/bitsocket';
import { postDetailQuery } from './rabbi/twetch';

import { Job, BoostPowJobProof as Proof } from 'boostpow'

import { stream } from 'powco'

export async function start() {

  await knex.migrate.latest();

  if (config.get('webui_enabled')){

    const nextjs = spawn("npm", ["run", "dev"], {

      cwd: `${process.cwd()}/web-ui`

    })

  }

  if (config.get('http_api_enabled')) {

    server();

  }

  if (config.get('amqp_enabled')) {

    actors();

  }

  sync_askbitcoin_bitbus()

  sync_sapience_bitbus()

  const app_id = "1HWaEAD5TXC2fWHDiua9Vue3Mf8V1ZmakN"

  const sapience = onchain(app_id)

  sapience.on('*', (event) => {

    log.info(`onchain.${app_id}.event`, event)

  })

  sapience.on('post', (value) => {


    log.info(`onchain.${app_id}.post`, value)

  })

  stream.on('boostpow.job', (job: Job) => {

    console.log('boostpow.job', job)
  
  })
  
  stream.on('boostpow.proof', (proof: Proof) => {
  
    console.log('boostpow.proof', proof)
  
  })
  //sync_ask_bitcoin()

  

}

if (require.main === module) {

  start()

}
