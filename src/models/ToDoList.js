import mongoose from "mongoose";

const ToDoListSchema = new mongoose.Schema({
    date: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    toDo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
    }]
});

const model = mongoose.model("ToDoList", ToDoListSchema);

export default model;