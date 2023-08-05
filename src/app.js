import {Router} from "express"
import dotenv from "dotenv"
import express from "express"
import router from "./routes/indexRouter.js";
import cors from "cors"

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`)
})