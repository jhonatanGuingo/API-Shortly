import {Router} from "express";

const routerUrl = Router();

routerUrl.post('/urls/shorten');
routerUrl.get('/urls/:id');
routerUrl.get('urls/open/:shortUrl');
routerUrl.delete('/urls/:id');

export default routerUrl;

