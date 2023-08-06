import { db } from "../database/database.js";
import {nanoid} from "nanoid"

export async function postUrl(req, res){
    
    try {
        const {url} = req.body;
        const {user} = req.locals;
        console.log(url, user, "aqui")
        url.id = nanoid();
        const shortUrl = url.id;
       
        await db.query(`INSERT INTO urls ("url", "emailUser", "shortUrl") VALUES ($1, $2, $3)`, [url, user.email, shortUrl])
        const response = {
            id: user.id,
            shortUrl: shortUrl
        }
        res.status(201).send(response);
    } catch (err) {
        res.send(err);
    }
}