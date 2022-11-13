
require('dotenv').config()

import config from './config'

import { Server } from '@hapi/hapi'

import { log } from './log'

import { join } from 'path'

import { plugin as websockets } from './socket.io/plugin'

const Joi = require('joi')

const Pack = require('../package');

import { load } from './server/handlers'

import { connectClient } from './socket.io/client'


const handlers = load(join(__dirname, './server/handlers'))

export const server = new Server({
  host: config.get('host'),
  port: config.get('port'),
  routes: {
    cors: true,
    validate: {
      options: {
        stripUnknown: true
      }
    }
  }
});

server.ext('onRequest', function(request, h) {

  log.debug('server.request', { id: request.info.id, headers: request.headers })

  if ('application/payment' === request.headers['content-type']) {
    request.headers['content-type'] = 'application/json';
    request.headers['x-content-type'] = 'application/payment';
  }

  if ('application/payment' === request.headers['accept']) {
    request.headers['content-type'] = 'application/json';
    request.headers['x-content-type'] = 'application/payment';
  }

  if ('application/bitcoinsv-payment' === request.headers['content-type']) {
    request.headers['content-type'] = 'application/json';
    request.headers['x-content-type'] = 'application/bitcoinsv-payment';
  }

  if ('application/dash-payment' === request.headers['content-type']) {
    request.headers['content-type'] = 'application/json';
    request.headers['x-content-type'] = 'application/dash-payment';
  }

  if ('application/dash-payment' === request.headers['accept']) {
    request.headers['accept'] = 'application/json';
    request.headers['x-accept'] = 'application/dash-payment';
  }

  if ('application/dash-paymentack' === request.headers['accept']) {
    request.headers['accept'] = 'application/json';
    request.headers['x-accept'] = 'application/dash-paymentack';
  }

  if ('application/bitcoinsv-paymentack' === request.headers['accept']) {
    request.headers['content-type'] = 'application/json';
    request.headers['x-content-type'] = 'application/bitcoinsv-payment';
    request.headers['x-accept'] = 'application/bitcoinsv-paymentack';
  }

  if ('application/verify-payment' === request.headers['content-type']) {
    request.headers['content-type'] = 'application/json';
    request.headers['x-content-type'] = 'application/verify-payment';
  }

  if ('application/verify-payment' === request.headers['accept']) {
    request.headers['content-type'] = 'application/json';
    request.headers['x-content-type'] = 'application/verify-payment';
  }

  return h.continue;
});

if (config.get('prometheus_enabled')) {

  log.info('server.metrics.prometheus', { path: '/metrics' })

  const { register: prometheus } = require('./metrics')

  server.route({
    method: 'GET',
    path: '/metrics',
    handler: async (req, h) => {
      return h.response(await prometheus.metrics())
    },
    options: {
      description: 'Prometheus Metrics about Node.js Process & Business-Level Metrics',
      tags: ['system']
    }
  })

}

const Post = Joi.object().label('Post')
const Posts = Joi.array().items(Post).label('Posts')

const Twetch = Joi.object().label('Twetch')
const Twetches = Joi.array().items(Twetch).label('Twetches')

const Message = Joi.object().label('Message')
const Messages = Joi.array().items(Message).label('Messages')

const Link = Joi.object({
  name: Joi.string().required(),
  href: Joi.string().required()
}).label('Link')
const Links = Joi.array().items(Link).label('Links')

const Output = Joi.object({
  script: Joi.string().required(),
  value: Joi.number().optional()
}).label('Output')

const Outputs = Joi.array().items(Output).label('Outputs')

server.route({
  method: 'GET', path: '/api/v0/status',
  handler: handlers.Status.index,
  options: {
    description: 'Simply check to see that the server is online and responding',
    tags: ['api', 'system'],
    response: {
      failAction: 'log',
      schema: Joi.object({
        status: Joi.string().valid('OK', 'ERROR').required(),
        error: Joi.string().optional()
      }).label('ServerStatus')
    }
  }
})

server.route({
  method: 'POST',
  path: '/api/v1/messages/new',
  handler: handlers.Messages.build,
  options: {
    description: 'Return required Transaction Outputs for a BitChat message',
    tags: ['api', 'messages'],
    response: {
      failAction: 'log',
      schema: Joi.object({
        outputs: Outputs.required(),
        error: Joi.string().optional()
      }).label('BuildMessageResponse')
    }
  }
})

server.route({
  method: 'POST',
  path: '/api/v1/posts/new',
  handler: handlers.Posts.build,
  options: {
    description: 'Return required Transaction Outputs for a Pow Co Post',
    tags: ['api', 'posts'],
    response: {
      failAction: 'log',
      schema: Joi.object({
        outputs: Outputs.required(),
        error: Joi.string().optional()
      }).label('BuildPostResponse')
    }
  }
})

server.route({
  method: 'POST',
  path: '/api/v1/messages',
  handler: handlers.Messages.create,
  options: {
    description: 'Submit signed bitcoin transaction containing a BitChat message',
    tags: ['api', 'messages'],
    response: {
      failAction: 'log',
      schema: Joi.object({
        outputs: Outputs.required(),
        error: Joi.string().optional()
      }).label('BitchatTransaction')
    }
  }
})

server.route({
  method: 'POST',
  path: '/api/v1/posts',
  handler: handlers.Posts.create,
  options: {
    description: 'Submit signed bitcoin transaction containing a Pow Co Post',
    tags: ['api', 'posts'],
    response: {
      failAction: 'log',
      schema: Joi.object({
        outputs: Outputs.required(),
        error: Joi.string().optional()
      }).label('SapiencePost')
    }
  }
})

server.route({
  method: 'GET',
  path: '/api/v1/messages',
  handler: handlers.Messages.index,
  options: {
    description: 'List all BitChat messages',
    tags: ['api', 'messages'],
    response: {
      failAction: 'log',
      schema: Joi.object({
        messages: Messages.required(),
        error: Joi.string().optional()
      }).label('ListMessageResponse')
    }
  }
})



server.route({
  method: 'GET',
  path: '/api/v1/posts',
  handler: handlers.Posts.index,
  options: {
    description: 'List all Pow Co Posts',
    tags: ['api', 'posts'],
    response: {
      failAction: 'log',
      schema: Joi.object({
        posts: Posts.required(),
        error: Joi.string().optional()
      }).label('ListPostResponse')
    }
  }
})

server.route({
  method: 'GET',
  path: '/api/v1/twetch/{tx_id}',
  handler: handlers.Twetch.show,
  options: {
    description: 'Show a Twetch Post',
    tags: ['api', 'twetch'],
    response: {
      failAction: 'log',
      schema: Joi.object({
        twetch: Twetches.required(),
        error: Joi.string().optional()
      }).label('ListPostResponse')
    }
  }
})

server.route({
  method: 'GET',
  path: '/api/v1/messages/{tx_id}',
  handler: handlers.Messages.show,
  options: {
    description: 'Show a BitChat message',
    tags: ['api', 'messages'],
    response: {
      failAction: 'log',
      schema: Joi.object({
        message: Messages.required(),
        link: Links.required(),
      }).label('ShowMessageResponse')
    }
  }
})

server.route({
  method: 'GET',
  path: '/api/v1/posts/{tx_id}',
  handler: handlers.Posts.show,
  options: {
    description: 'Show a specific PowCo Post',
    tags: ['api', 'posts'],
    response: {
      failAction: 'log',
      schema: Joi.object({
        post: Posts.required(),
        link: Links.required(),
      }).label('ShowPostResponse')
    }
  }
})


/* server.route({
  method: 'GET',
  path: '/api/v1/boostpow/{tx_id}/new',
  handler: handlers.Boostpow.build,
  options: {
    description: 'Create new Boost Pow job script for payment',
    tags: ['api', 'boostpow'],
    validate: {
      query: Joi.object({
        currency: Joi.string().default('USD').optional(),
        value: Joi.number().default(0.05).optional()
      }).label('NewBoostPowOptions'),
      params: Joi.object({
        tx_id: Joi.string().required()
      })
    },
    response: {
      failAction: 'log',
      schema: Joi.object({
        network: Joi.string().required(),
        outputs: Joi.array().items(Joi.object({
          script: Joi.string().required(),
          amount: Joi.number().integer().required()
        }).required().label('PaymentRequestOutput')).required(),
        creationTimestamp: Joi.number().integer().required(),
        expirationTimestamp: Joi.number().integer().required(),
        memo: Joi.string().optional(),
        paymentUrl: Joi.string().required(),
        merchantData: Joi.string().optional()
      })
        
    }
  }
}) */

/* server.route({
  method: 'POST',
  path: '/api/v1/transactions',
  handler: handlers.Transactions.create,
  options: {
    description: 'Submit new, signed transactions to the network',
    tags: ['api', 'transactions'],
    validate: {
      failAction: 'log',
      payload: Joi.object({
        transaction: Joi.string().required()
      }).label('SubmitTransaction')
    },
    response: {
      failAction: 'log',
      schema: Joi.object({
        payment: Joi.string().required(),
        memo: Joi.string().optional(),
        error: Joi.number().optional()
      }).label('PaymentAck')
    }

  }
}) */



var started = false

export async function start() {

  if (started) return;

  started = true

  if (config.get('swagger_enabled')) {

    const swaggerOptions = {
      info: {
        title: 'Pow Co API Docs',
        version: Pack.version,
        description: 'Proof of Work Company'
      },
      schemes: ['https', 'http'],
      host: 'https://pow.co',
      documentationPath: '/',
      grouping: 'tags'
    }

    const Inert = require('@hapi/inert');

    const Vision = require('@hapi/vision');

    const HapiSwagger = require('hapi-swagger');

    await server.register([
        Inert,
        Vision,
        {
          plugin: HapiSwagger,
          options: swaggerOptions
        }
    ]);

    log.info('server.api.documentation.swagger', swaggerOptions)
  }

  //await server.register(websockets)
  //await connectClient(`ws://${config.get('host')}:${config.get('port')}`)


  if (config.get('webui_enabled')) {

    const H2o2 = require('@hapi/h2o2');

    log.debug('webui.enabled')

    await server.register(H2o2);

    server.route({
      method: 'GET',
      path: '/{param*}',
      handler: {
          proxy: {
              host: config.get('webui_host'),
              port: config.get('webui_port'),
              protocol: 'http',
              passThrough: true
          }
      }
    });

  }

  await server.start();

  log.info(server.info)

  return server;

}

if (require.main === module) {

  start()

}
