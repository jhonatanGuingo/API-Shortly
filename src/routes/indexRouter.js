import {Router} from "express";
import routerSignUp from "./signup.router.js";
import routerSignIn from "./signin.router.js";
import routerRanking from "./ranking.router.js";
import routerUrl from "./urls.router.js";
import routerUser from "./users.router.js";

const router = Router();

router.use(routerSignUp);
router.use(routerSignIn);
router.use(routerRanking);
router.use(routerUrl);
router.use(routerUser);

export default router;
