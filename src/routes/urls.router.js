import {Router} from "express";
import { getUrl, openUrl, postUrl } from "../controllers/url.controllers.js";
import  authValidation  from "../middlewares/authValidation.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { schemaUrl } from "../schemas/validate.schema.js";


const routerUrl = Router();

routerUrl.post('/urls/shorten',authValidation, validateSchema(schemaUrl), postUrl);
routerUrl.get('/urls/:id', getUrl);
routerUrl.get('/urls/open/:shortUrl', openUrl);
routerUrl.delete('/urls/:id');

export default routerUrl;

