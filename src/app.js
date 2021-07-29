import path from "path";
import express from "express";
import router from './routers/router';
import apiRouter from './routers/apiRouter';
import routes from "./routes";

import session from "express-session";
import passport from "passport";
import "./passport";
import flash from "connect-flash";
import { localsMiddleware } from "./middlewares";
// In theory, this can be moved as we load dotenv in the entry file, 'init.js'
// However, the problem in loading env file keeps occuring for some reason and will be dealt with soon.
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.set('view engine', "pug");
app.set('views', process.cwd() + "/src/views");
app.use('/static', express.static('static'));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);
app.use(routes.home, router);
app.use(routes.api, apiRouter);
export default app;