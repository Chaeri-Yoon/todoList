const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const CHANGEINFO = "/change-info";

const LOADTODOLIST = "/api/:id/load-todolist";
const ADDTODOLIST = "/api/:id/add-todolist";
const DELETETODOLIST = "/api/:id/delete-todolist";
const UPDATETODOLIST = "/api/:id/update-todolist";

const routes = {
    home : HOME,
    join : JOIN,
    login : LOGIN,
    logout : LOGOUT,
    changeInfo : CHANGEINFO,
    loadToDoList : LOADTODOLIST,
    addToDoList : ADDTODOLIST,
    deleteToDoList : DELETETODOLIST,
    updateToDoList : UPDATETODOLIST
}

export default routes;