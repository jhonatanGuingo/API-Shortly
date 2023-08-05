import {Router} from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { schemaSigIn } from "../schemas/validate.schema.js";
import { singIn } from "../controllers/user.controller.js";


const routerSignIn = Router();

routerSignIn.post('/signin',validateSchema(schemaSigIn), singIn);

export default routerSignIn;