import mongoose from "mongoose";
import passport from "passport-local-mongoose";

const TaskSchema = new mongoose.Schema({
    taskDescription : String,
    isDone : Boolean
});

TaskSchema.plugin(passport);
const model = mongoose.model("Task", TaskSchema);

export default model;