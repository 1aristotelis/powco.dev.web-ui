import { EventEmitter } from 'events'

import fetch from 'node-fetch';

import config from '../config'

interface CrawlerParams {
    query: any;
    onTransaction: Function
}

export class Crawler extends EventEmitter {

    query: string;

    onTransaction: Function;

    constructor(params: CrawlerParams) {
        super()
        this.query = params.query;
        this.onTransaction = params.onTransaction;
    }

    start() {
        
        let query_url = `https://b.map.sv/q/${this.query}`

        fetch(query_url)
            .then((res)=> res.json())
            .then(async (json) => {
                this.emit('chunk', json);
                await this.onTransaction(json)
            })
        
        return this
    }

}