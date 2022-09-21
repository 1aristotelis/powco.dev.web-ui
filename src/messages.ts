import { knex } from './knex'

interface Message {
    tx_id: string;
    content: string;
    user: string;
    timestamp: Date;
    url: string;
}

interface MessagesQuery {
    start_timestamp?: string;
    end_timestamp?: string;
}

export async function loadMessages (query: MessagesQuery={}): Promise<Message[]> {

    let messages = await knex('messages')
        .orderBy('id', 'desc')
        .select('*')
    return messages 
}

interface MessageQuery {
    tx_id: string;
    start_timestamp?: string;
    end_timestamp?: string;
}

export async function loadMessage (query: MessageQuery): Promise<Message> {

    let message = await knex('messages')
        .where('messages.tx_id', query.tx_id)
        .select('*')
    
    return message 
}