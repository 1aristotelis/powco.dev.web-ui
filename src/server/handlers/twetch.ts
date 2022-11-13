
import { badRequest, notFound } from 'boom'

import { loadMessage, loadMessages } from '../../messages'

import { loadPosts, loadPost, buildPost } from '../../posts'
import { postDetailQuery } from '../../rabbi/twetch'


/* export async function create(req, h) {

}

export async function build(req, h) {
  
  try {
    
    let outputs = await buildPost(req.query)

    return outputs 

    
    
  } catch (error) {

    return badRequest(error)
    
  }

}

export async function index(req, h) {

  try {

    let posts = await loadPosts(req.query)

    return {

      posts

    }

  } catch(error) {

    return badRequest(error)

  }

}

interface Answer {

}

interface Question {

} */

export async function show(req, h) {

  try {
    const twetch = await postDetailQuery(req.params.tx_id)

    if (!twetch) {

      return notFound()

    }

    return { twetch }

  } catch(error) {

    return badRequest(error)

  }

}

