
import { knex } from '../../knex'

import { badRequest, notFound } from 'boom'

import { loadMessage, loadMessages } from '../../messages'

import { loadPosts, loadPost, buildPost } from '../../posts'


export async function create(req, h) {

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

}

export async function show(req, h) {

  if (!req.params.tx_id){
    
    return null
  }

  try {
    
    const post = await loadPost({ tx_id: req.params.tx_id })

    if (!post) {

      return notFound()

    }

    return { post }

  } catch(error) {

    return badRequest(error)

  }



}

