import { db } from "../database/database.js";

export async function ranking(req, res){
    try {
        const ranking = await db.query(`SELECT users.id, users.name, 
        COUNT(urls.url) AS "linksCount",
        SUM(urls."visitCount") AS "visitCount"
        FROM users
        JOIN urls ON urls."emailUser" = users.email
        GROUP BY users.name, users.id
        ORDER BY "visitCount" DESC LIMIT 10
        ;`);

        res.status(200).send(ranking.rows)
    } catch (err) {
        res.send(err.message);
    }
}