import path from "path";
import express from "express";
import router from "./router";
import routes from "./routes";

import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";
import "./passport";
import flash from "connect-flash";
import { localsMiddleware } from "./middlewares";

const app = express();
app.set('view engine', "pug");
app.set('views', process.cwd() + "/src/views");
app.use('/static', express.static('static'));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);
app.use(routes.home, router);
export default app;