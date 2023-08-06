import {Router} from "express";
import { postUrl } from "../controllers/url.controllers.js";
import  authValidation  from "../middlewares/authValidation.js";

const routerUrl = Router();

routerUrl.post('/urls/shorten',authValidation, postUrl);
routerUrl.get('/urls/:id');
routerUrl.get('urls/open/:shortUrl');
routerUrl.delete('/urls/:id');

export default routerUrl;

