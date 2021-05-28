import express from "express";
import passport from "passport";
import { getJoin, getLogin, home, logout, postJoin, postLogin } from "./controller";
import { onlyPrivate, onlyPublic } from "./middlewares";
import routes from "./routes";

const router = express.Router();

router.get(routes.home, home);
router.get(routes.login, onlyPublic, getLogin);
router.post(routes.login, onlyPublic, postLogin);
router.get(routes.join, onlyPublic, getJoin);
router.post(routes.join, onlyPublic, postJoin, postLogin);
router.get(routes.logout, onlyPrivate, logout);
export default router;