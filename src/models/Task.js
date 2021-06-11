import mongoose from "mongoose";
import passport from "passport-local-mongoose";

const TaskSchema = new mongoose.Schema({
    taskDescription : String,
    isDone : Boolean
});

const model = mongoose.model("Task", TaskSchema);

export default model;