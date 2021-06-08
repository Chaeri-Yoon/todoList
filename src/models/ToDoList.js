import mongoose from "mongoose";
import passport from "passport-local-mongoose";

const ToDoListSchema = new mongoose.Schema({
    date: String,
    toDo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
    }]
});

ToDoListSchema.plugin(passport);
const model = mongoose.model("ToDoList", ToDoListSchema);

export default model;