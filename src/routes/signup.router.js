import {Router} from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { schemaSignUp } from "../schemas/validate.schema.js";
import { signUp } from "../controllers/user.controller.js";


const routerSignUp = Router();

routerSignUp.post('/signup', validateSchema(schemaSignUp), signUp);

export default routerSignUp;