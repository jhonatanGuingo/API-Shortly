import {
    db
} from "../database/database.js";
import bcrypt from "bcrypt";
import {
    v4 as uuid
} from "uuid";

export async function signUp(req, res) {
    const {
        email,
        name,
        password,
        confirmPassword
    } = req.body;

    const hash = bcrypt.hashSync(password, 10);

    if (password != confirmPassword) {
        res.status(422).send("As senhas devem ser iguais")
        return
    }

    try {
        const emailExist = await db.query(`SELECT * FROM users WHERE email = $1`, [email])
        if (emailExist.rowCount > 0) {
            res.status(409).send("E-mail já cadastrado");
            return
        }

        await db.query(`INSERT INTO users ("name", "email", "password") VALUES ($1, $2, $3)`, [name, email, hash])

        res.sendStatus(201)
    } catch (err) {
        res.send(err);
    }
}

export async function singIn(req, res) {
    const {
        email,
        password
    } = req.body;

    try {
        const searchEmail = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
        if (!searchEmail.rowCount > 0) {
            res.status(401).send("e-mail não cadastrado")
            return
        }

        const userId = searchEmail.rows[0].id;
        if (searchEmail.rows[0].password && bcrypt.compareSync(password, searchEmail.rows[0].password)) {
            const token = uuid();
            console.log("oi")
            const date = new Date();
            await db.query(`INSERT INTO sessions ("token", "date", "userId") VALUES ($1, $2, $3)`, [token, date, userId])
            const meuToken = {
                token: token
            }
            res.status(200).send(meuToken)
        } else {
            res.status(401).send("senhas incorreta");
        }


    } catch (err) {
        res.send(err);
    }
}

export async function getUser(req, res){
    const {user} = res.locals;
    try {

        const aboutUser = await db.query(`SELECT users.id, users.name, SUM(urls."visitCount") AS "visitCount" 
        FROM users
        JOIN urls ON users.email = urls."emailUser"
        WHERE users.id =$1
        GROUP BY users.id, users.name;`, [user.id])

      

        const aboutUrl = await db.query(`SELECT urls.id, urls."shortUrl", urls.url, urls."visitCount"
        FROM urls WHERE urls."emailUser" = $1`, [user.email] )

      

        const userInfo = {
            ...aboutUser.rows[0],
            shortenedUrls: aboutUrl.rows,
          }

        console.log(userInfo)

        res.send(userInfo)
    } catch (err) {
        res.status(500).send(err.message);
    }
}
