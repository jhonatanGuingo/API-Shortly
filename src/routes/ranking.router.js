import {Router} from "express";
import { ranking } from "../controllers/ranking.controller.js";

const routerRanking = Router();

routerRanking.get('/ranking', ranking);

export default routerRanking;