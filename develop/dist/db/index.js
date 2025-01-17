//Class for running db queries
import { pool } from './connection.js';
export default class Db {
    constructor() { }
    //define methods
    async query(sql, args = []) {
        //create client pool
        const client = await pool.connect();
        try {
            const result = await client.query(sql, args);
            return result;
            //creates a query through the class, replaces pool.query from the mini project in server.ts file
        }
        finally {
            client.release();
            //must always return a client to the pool, regardless if there is an error or not
        }
    }
}
