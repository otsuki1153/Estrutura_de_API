import {Router} from "express";
import TaskControll from "../controllers/TaskControll.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import validationMiddleware from "../middlewares/validation.middleware.js";

const route = Router();

route.get("/", TaskControll.GetControll.bind(TaskControll));

route.get("/:id", TaskControll.SearchControll.bind(TaskControll));

route.post("/",authMiddleware, validationMiddleware,TaskControll.PostControll.bind(TaskControll));


route.put("/:id",authMiddleware, validationMiddleware, TaskControll.PutControll.bind(TaskControll));

route.delete("/:id",authMiddleware, TaskControll.DeleteControll.bind(TaskControll));

export default route;