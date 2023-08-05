import {Router} from "express";

const routerUser = Router();

routerUser.get('/users/me');

export default routerUser;