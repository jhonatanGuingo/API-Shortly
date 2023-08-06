import { db } from "../database/database.js";

export default async function authValidation(req, res, next){
    const {authorization} = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if(!token){
        res.sendStatus(401)
        return
    }
    
    try {
        const sessionUser = await db.query(`SELECT * FROM sessions WHERE token = $1`, [token])
        if(!sessionUser.rowCount > 0){
            res.sendStatus(401)
            return
        }

        const user = await db.query (`SELECT * FROM users WHERE id=$1`, [sessionUser.rows[0].userId])
        delete user.password
        res.locals.user = user.rows[0]
        next();
    } catch (err) {
        res.send(err);
    }
} 