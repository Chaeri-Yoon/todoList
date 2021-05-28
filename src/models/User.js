import mongoose from "mongoose";
import passport from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
    nickname: String,
    id: String,
    toDoList : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ToDoList"
    }]
});
UserSchema.plugin(passport, {usernameField: "id"});
const model = mongoose.model("User", UserSchema);

export default model;