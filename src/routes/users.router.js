import {Router} from "express";
import authValidation from "../middlewares/authValidation.js";
import { getUser } from "../controllers/user.controller.js";

const routerUser = Router();

routerUser.get('/users/me', authValidation, getUser);

export default routerUser;