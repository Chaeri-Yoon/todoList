import routes from "../routes";

import User from "../models/User";
import passport from "passport";
import { setUserDB } from "./toDoController";

export const home = (req, res) => {
    if(res.locals.loggedUser !== null) setUserDB(req.user._id);
    res.render("home");
}
export const getLogin = (req, res) => res.render("login");
export const postLogin = passport.authenticate('local', {
    successRedirect: routes.home,
    failureRedirect: routes.login
})
export const getJoin = (req, res) => res.render("join");
export const postJoin =  async(req, res, next) => {
    const{
        body: {nickname, userId, password, password2}
    } = req;
    if(password !== password2){
        console.log("패스워드 불일치");
        res.status(400);
        res.render("join");
    }
    else{
        try{
            const newUser = new User({nickname, userId});
            await User.register(newUser, password);
            next();
        }
        catch(error){
            console.log(error);
            res.redirect(routes.home);
        }
    }
}
export const getChangeInfo = (req, res) => res.render("changeInfo", {user:req.user});
export const postChangeInfo = async (req, res) => {
    const{
        body: {nickname, userId, oldPassword, newPassword, newPassword2}
    } = req;
    try{
        await User.findOneAndUpdate({userId}, {nickname});
    }
    catch(error){
        console.log(error);
        res.redirect(routes.home);
    }
    
    if(newPassword !== ""){
        if(newPassword !== newPassword2){
            console.log("패스워드 불일치");
            res.status(400);
            res.render("changeInfo", {user:req.user});
        }
        else{
            try{
                await req.user.changePassword(oldPassword, newPassword);
                res.redirect(routes.home);
            }
            catch(error){
                console.log(error);
                res.status(400);
                res.render("changeInfo", {user:req.user});
            }
        }
    }
    else res.redirect(routes.home);
}
export const logout = (req, res) => {
    req.logout();
    res.redirect(routes.home);
}