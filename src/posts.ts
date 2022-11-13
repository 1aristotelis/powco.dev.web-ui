import { knex } from './knex'
import  fetch  from "node-fetch"
import ABI from './abi'

export interface Post {
    tx_id: string;
    content: string;
    user: string;
    timestamp: Date;
    url: string;
    tag: string;
}

interface PostsQuery {
    start_timestamp?: number;
    end_timestamp?: number;
    tag?: string;
}



export async function loadPosts (query: PostsQuery={}): Promise<Post[]> {

    let posts = await knex('posts')
        .where('posts.tag',query.tag)
        .orderBy('id', 'desc')
        .select('*')

    return posts 
}

interface PostQuery {
    tx_id: string;
    start_timestamp?: string;
    end_timestamp?: string;
}

export async function loadPost (query: PostQuery): Promise<Post> {

    let post = await knex('posts')
        .where('posts.tx_id', query.tx_id)
        .select('*')
    
    return post 
}



interface BuildQuery {
    content: string;
    replyTxId?: string;
    tags?: string;
}

interface BuildQueryOuputs {
    outputs: string[];
    contentHash: string;
}


export async function buildPost(query: BuildQuery={content:""}): Promise<BuildQueryOuputs>{
    const action= 'sapience/post@0.0.1'; 
    const args = {
        bContent: query.content,
        bFilename: `sapience_text_${new Date().getTime()}.txt`,
        type: 'post',
        mapReply: query.replyTxId,
        mapTwdata: 'null',
        mapTag:query.tags
    
    }
    const abi =  new ABI().action(action).fromObject(args)

    //const { payees, invoice } = await this._fetchPayees(action, abi.toArray())

    //abi.replace('#{invoice}', invoice)

    return {outputs: abi.toArray(), contentHash: abi.contentHash()}
}