
import { knex } from '../../knex'

import { badRequest, notFound } from 'boom'

import { loadMessage, loadMessages } from '../../messages'


export async function create(req, h) {

}

export async function build(req, h) {

}

export async function index(req, h) {

  try {

    let messages = await loadMessages(req.query)

    return {

      messages

    }

  } catch(error) {

    return badRequest(error)

  }

}

interface Answer {

}

interface Question {

}

export async function show(req, h) {

  try {

    const message = await loadMessage({ tx_id: req.params.tx_id })

    if (!message) {

      return notFound()

    }

    return { message }

  } catch(error) {

    return badRequest(error)

  }



}

