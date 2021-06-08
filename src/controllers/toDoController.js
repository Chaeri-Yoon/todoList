import routes from "../routes";
import ToDoList from "../models/ToDoList";
import Task from "../models/Task";

export const loadToDoList = async(req, res) => {
    const {
        body: {date}
    } = req;
    try{
        const findByDate = await ToDoList.findOne({date}).populate('toDo');
        if(findByDate !== null)    res.send({"toDoList" : findByDate.toDo});
    }
    catch(error){
        console.log(error);
        res.status(400);
    }
}

export const addToDoList = async (req, res) => {
    const {
        body : {date, taskDescription, isDone}
    } = req;
    try{
        const findByDate = await ToDoList.findOne({date});
        const newTask = await Task.create({
            taskDescription,
            isDone
        });

        if(findByDate){
            findByDate.toDo.push(newTask._id);
            findByDate.save();
            console.log(findByDate);
        }
        else{
            await ToDoList.create({date, toDo: newTask._id});
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
        const findByDate = await ToDoList.findOne({date}).populate('toDo');
        if(findByDate){
            const cleanArray = findByDate.toDo.filter(function(_element){
                return _element._id.toString() !== taskID
            });
            findByDate.toDo = cleanArray;
            findByDate.save();
            
            await Task.findByIdAndRemove({_id:taskID});
        }
    }
    catch(error){
        console.log(error);
        res.status(400);
    }
}
export const updateToDoList = async (req, res) => {
    const {
        body : {date, taskDescription, taskID}
    } = req;
    try{
        const findByDate = await ToDoList.findOne({date}).populate('toDo');
        if(findByDate){
            findByDate.toDo.forEach(async (element) => {
                if(element._id.toString() == taskID){
                    await Task.findByIdAndUpdate(taskID, {taskDescription});
                    return; 
                }
            })
        }
    }
    catch(error){
        console.log(error);
        res.status(400);
    }
}