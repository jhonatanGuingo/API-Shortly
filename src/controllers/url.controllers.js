import { db } from "../database/database.js";
import {nanoid} from "nanoid"

export async function postUrl(req, res){
    console.log("estou aqui")
    const {url} = req.body;
    const {user} = res.locals;
    try {
        const shortUrl = nanoid();
        console.log(shortUrl)
        await db.query(`INSERT INTO urls ("url", "emailUser", "shortUrl") VALUES ($1, $2, $3)`, [url, user.email, shortUrl])
        const response = {
            id: user.id,
            shortUrl: shortUrl
        }
        res.status(201).send(response);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getUrl(req, res) {
    const {
        id
    } = req.params;
    
    try {
  
        const searchUrl = await db.query(`SELECT * FROM urls WHERE id = $1`, [id]);
       
        if (!searchUrl.rowCount > 0) {
            res.status(404).send('URL não encontrada')
            return
        }
 
        const response = {
            id: searchUrl.rows[0].id,
            shortUrl: searchUrl.rows[0].shortUrl,
            url: searchUrl.rows[0].url
        }

        res.status(200).json(response)

    } catch (err) {
        res.status(500).send(err.message);
    }

}

export async function openUrl(req, res){
    const {shortUrl} = req.params;
    try {
        const searchShortUrl = await db.query(`SELECT * FROM urls WHERE "shortUrl"=$1;`, [shortUrl])
        if (!searchShortUrl.rowCount > 0) {
            res.status(404).send('URL não encontrada')
            return
        }


        await db.query(`UPDATE urls SET "visitCount"= "visitCount" +1 WHERE "shortUrl"=$1;`, [shortUrl]);
        
        res.status(302).redirect(shortUrl);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function deleteUrl(req, res){
    const {user} = res.locals;
    const {id} = req.params;
    try {
        const searchUrl = await db.query(`SELECT * FROM urls WHERE id = $1`, [id]);
        console.log(searchUrl)
        if (!searchUrl.rowCount > 0) {
            res.status(404).send('URL não encontrada')
            return
        }

        if (user.email != searchUrl.rows[0].emailUser){
            res.status(401).send('a URL não pertence ao usuario');
            return
        }

        await db.query(`DELETE FROM urls WHERE id =$1`, [searchUrl.rows[0].id])
        res.sendStatus(204);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

