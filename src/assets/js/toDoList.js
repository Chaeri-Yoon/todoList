import axios from "axios";
import routes from "@/routes";
import { getDisplayDate } from "./calender";

const toDoForm = document.querySelector('.jsToDoForm');
const enterSpace = document.querySelector('.jsEnterSpace');
const unDone = document.querySelector('.jsToDoList');
const done = document.querySelector('.jsDoneList');

const UNDONE = "undone";
const DONE = "done";
const UNDONEBUTTON = "fa-square";
const DONEBUTTON = "fa-check-square";

export const resetToDoList = () => {
    if (unDone.childNodes != null) {
        while (unDone.firstChild) {
            unDone.removeChild(unDone.lastChild);
        }
    }
    if (done.childNodes != null) {
        while (done.firstChild) {
            done.removeChild(done.lastChild);
        }
    }
    loadData();
}
const onTaskEntered = (event) => {
    event.preventDefault();
    addData(enterSpace.value, false);
    enterSpace.value = "";
}
const addTask = (_task, _isDone, _taskID) => {
    const li = document.createElement('li');
    const checkButton = document.createElement('button');
    const modifyButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    const checkButtonIcon = document.createElement('i');
    const modifyButtonIcon = document.createElement('i');
    const span = document.createElement('span');

    span.innerText = _task;
    span.classList.add('taskName');
    span.addEventListener('keypress', function (e) { if (e.code == "Enter") updateTask(e); });

    checkButtonIcon.classList.add('far');
    checkButtonIcon.classList.add(_isDone ? DONEBUTTON : UNDONEBUTTON);
    checkButtonIcon.classList.add('fa-lg');
    checkButtonIcon.addEventListener('click', checkTask);

    modifyButtonIcon.classList.add('fas');
    modifyButtonIcon.classList.add('fa-pencil-alt');
    modifyButtonIcon.classList.add('fa-lg');
    modifyButtonIcon.addEventListener('click', modifyTaskText);
    modifyButton.style.display = "none";
    modifyButton.classList.add('btn__modify');

    deleteButton.innerText = "❌"
    deleteButton.classList.add('btn__delete');
    deleteButton.addEventListener('click', deleteTask);
    deleteButton.style.display = "none";

    checkButton.appendChild(checkButtonIcon);
    modifyButton.appendChild(modifyButtonIcon);

    li.classList.add(_isDone ? DONE : UNDONE);
    li.addEventListener('mouseover', () => {
        modifyButton.style.display = "inline";
        deleteButton.style.display = "inline";
    });
    li.addEventListener('mouseleave', () => {
        modifyButton.style.display = "none";
        deleteButton.style.display = "none";
    });
    li.appendChild(checkButton);
    li.appendChild(span);
    li.appendChild(modifyButton);
    li.appendChild(deleteButton);

    li.name = _taskID;
    if (_isDone) done.appendChild(li);
    else unDone.appendChild(li);
}
const checkTask = (event) => {
    const clickedButton = event.target;
    const selectedTask = event.target.parentNode.parentNode;

    const _isDone = selectedTask.classList.contains(DONE);
    clickedButton.classList.remove(_isDone ? DONEBUTTON : UNDONEBUTTON);
    clickedButton.classList.add(_isDone ? UNDONEBUTTON : DONEBUTTON);
    selectedTask.classList.remove(_isDone ? DONE : UNDONE);
    selectedTask.classList.add(_isDone ? UNDONE : DONE);

    if (_isDone) unDone.appendChild(event.target.parentNode.parentNode);
    else done.appendChild(event.target.parentNode.parentNode);

    updateData(null, selectedTask.name, !_isDone);
}
const loadData = async () => {
    try {
        const response = await axios({
            url: `${routes.api}${routes.loadToDoList}`,
            method: "GET",
            params: {
                date: getDisplayDate()
            }
        });
        const toDoList = response.data["toDoList"];
        if (toDoList !== null) toDoList.forEach(element => addTask(element.taskDescription, element.isDone, element._id));
    } catch (e) { }
}
const addData = async (taskDescription, isDone) => {
    try {
        const response = await axios({
            url: `${routes.api}${routes.addToDoList}`,
            method: "POST",
            data: {
                date: getDisplayDate(),
                taskDescription,
                isDone
            }
        });
        if (response.status === 200) {
            const taskID = response.data["task-id"];
            addTask(taskDescription, isDone, taskID);
        }
    }
    catch {
        console.log(error);
    }
}
const updateData = async (taskDescription, taskID, isDone) => {
    await axios({
        url: `${routes.api}${routes.updateToDoList}`,
        method: "POST",
        data: {
            date: getDisplayDate(),
            taskDescription,
            taskID,
            isDone
        }
    });
}
const removeData = async (taskID) => {
    await axios({
        url: `${routes.api}${routes.deleteToDoList}`,
        method: "POST",
        data: {
            date: getDisplayDate(),
            taskID
        }
    });
}
const modifyTaskText = (event) => {
    const modifyItem = event.target.parentNode.parentNode.querySelector('.taskName');
    modifyItem.contentEditable = true;
    modifyItem.focus();
}
const updateTask = (event) => {
    event.target.contentEditable = false;

    const updatedTask = event.target.parentNode;
    const text = event.target.innerText;

    updateData(text, updatedTask.name, null);
}
const deleteTask = (event) => {
    const selectedTask = event.target.parentNode;
    selectedTask.parentNode.removeChild(selectedTask);

    removeData(selectedTask.name);
}

const init = () => {
    if (toDoForm != null) toDoForm.addEventListener('submit', event => onTaskEntered(event));
}
init();