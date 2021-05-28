import express from "express";
import passport from "passport";
import { getChangeInfo, getJoin, getLogin, home, logout, postChangeInfo, postJoin, postLogin } from "./controller";
import { onlyPrivate, onlyPublic } from "./middlewares";
import routes from "./routes";

const router = express.Router();

router.get(routes.home, home);
router.get(routes.login, onlyPublic, getLogin);
router.post(routes.login, onlyPublic, postLogin);
router.get(routes.join, onlyPublic, getJoin);
router.post(routes.join, onlyPublic, postJoin, postLogin);
router.get(routes.logout, onlyPrivate, logout);
router.get(routes.changeInfo, onlyPrivate, getChangeInfo);
router.post(routes.changeInfo, onlyPrivate, postChangeInfo);
export default router;