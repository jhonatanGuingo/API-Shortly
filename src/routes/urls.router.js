import {Router} from "express";
import { postUrl } from "../controllers/url.controllers.js";
import  authValidation  from "../middlewares/authValidation.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { schemaUrl } from "../schemas/validate.schema.js";

const routerUrl = Router();

routerUrl.post('/urls/shorten',authValidation, validateSchema(schemaUrl), postUrl);
routerUrl.get('/urls/:id');
routerUrl.get('urls/open/:shortUrl');
routerUrl.delete('/urls/:id');

export default routerUrl;

