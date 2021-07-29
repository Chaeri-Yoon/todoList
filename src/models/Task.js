import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    taskDescription: String,
    isDone: Boolean
});

const model = mongoose.model("Task", TaskSchema);

export default model;