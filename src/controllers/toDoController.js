import User from "../models/User";
import ToDoList from "../models/ToDoList";
import Task from "../models/Task";

let userDB;
let selectedToDoList;

export const loadToDoList = async(req, res) => {
    const {
        body: {date}
    } = req;
    if(userDB !== null){
        try{
            selectedToDoList = await ToDoList.findOne({date, user:req.user._id}).populate('toDo');
            res.send({"toDoList" : selectedToDoList != null ? selectedToDoList.toDo : null});
        }
        catch(error){
            console.log(error);
            res.status(400);
        }
    }
}

export const addToDoList = async (req, res) => {
    const {
        body : {date, taskDescription, isDone}
    } = req;
    try{
        const newTask = await Task.create({
            taskDescription,
            isDone
        });
        if(selectedToDoList !== null){
            selectedToDoList.toDo.push(newTask._id);
            selectedToDoList.save();
        }
        else{
            selectedToDoList = await ToDoList.create({date, user: req.user._id, toDo: newTask._id});
            userDB.toDoList.push(selectedToDoList._id);
            selectedToDoList.populate('toDo');
            userDB.save();
        }
        res.send({"task-id" : newTask._id});
    }
    catch(error){
        console.log(error);
        res.status(400);
    }
}
export const deleteToDoList = async (req, res) => {
    const {
        body : {date, taskID}
    } = req;
    try{
        if(selectedToDoList !== null){
            const cleanArray = selectedToDoList.toDo.filter((_element) => {return _element._id.toString() !== taskID;});
            if(cleanArray.length == 0)  {
                const _find = await ToDoList.findOne({date});
                await ToDoList.findOneAndDelete({date});
                
                const cleanTodo = userDB.toDoList.filter((_element) => {return _element._id.toString() !== _find._id.toString();});
                userDB.toDoList = cleanTodo;
                userDB.save();
            }
            else{
                selectedToDoList.toDo = cleanArray;
                selectedToDoList.save();
            }
            
            await Task.findOneAndDelete({_id:taskID});
        }
        res.send();
    }
    catch(error){
        console.log(error);
        res.status(400);
    }
}
export const updateToDoList = async (req, res) => {
    const {
        body : {taskDescription, taskID, isDone}
    } = req;
    try{
        if(selectedToDoList !== null){
            selectedToDoList.toDo.forEach(async (element) => {
                if(element._id.toString() == taskID){
                    if(taskDescription !== null)    await Task.findByIdAndUpdate(taskID, {taskDescription});
                    else if(isDone !== null) await Task.findByIdAndUpdate(taskID, {isDone});
                    return; 
                }
            })
        }
        res.send();
    }
    catch(error){
        console.log(error);
        res.status(400);
    }
}
export const setUserDB = async (_userData) => {
    userDB = await User.findById(_userData).populate('toDoList').populate('toDo');
}