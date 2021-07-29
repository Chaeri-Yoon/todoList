import express from "express";
import { onlyPrivate } from "@/middlewares";
import { addToDoList, deleteToDoList, loadToDoList, updateToDoList } from "@controllers/toDoController";
import routes from "@/routes";

const router = express.Router();

router.get(routes.loadToDoList, onlyPrivate, loadToDoList);
router.post(routes.addToDoList, onlyPrivate, addToDoList);
router.post(routes.deleteToDoList, onlyPrivate, deleteToDoList);
router.post(routes.updateToDoList, onlyPrivate, updateToDoList);
export default router;