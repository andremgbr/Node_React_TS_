import { Router } from "express";
import { DestionationTasksController } from "./controllers/DestionationTasksController";
import { ProjectsController } from "./controllers/ProjectsController";
import { TasksController } from "./controllers/TasksController";
import { UsersController } from "./controllers/UsersController";

const passport = require("./passport")

export const routes = Router();

const usersController = new UsersController();
const projectsController = new ProjectsController();
const tasksController = new TasksController();
const destionationTasksController = new DestionationTasksController();

routes.post("/api/users", usersController.create);
routes.get("/api/users", usersController.showAll);

routes.get("/auth/user", (req, res) => {
    if (req.user) {
        console.log("Auth user executado!..--> OK");
        res.status(200);
        res.send(req.user);
    } else {
        console.log("Auth user executado!..--> Fail");
        res.status(404);
        res.send({ "Error": "Usuáio não logado." });
    }
})


routes.post("/api/projects", projectsController.create);
routes.get("/api/projects", projectsController.showAll);

routes.post("/api/tasks", tasksController.create);
routes.get("/api/tasks", tasksController.showTaskUser);
routes.get("/api/mytasks", tasksController.showByOwnerUserId);

routes.get("/api/task/:id", tasksController.getByid);
routes.put("/api/task/:id", tasksController.putByid);
routes.delete("/api/task/:id", tasksController.delByid);

routes.post("/api/destinationTasks", destionationTasksController.create);
routes.get("/api/destinationTasks", destionationTasksController.showByDestUserId);

routes.post("/api/login", passport.authenticate('local'), (req, res, next) => {
    res.status(200);
    res.send({ "Accept": "Usuário logado!" });
});

routes.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect('http://localhost:3000/login');
});

/**
routes.get("/api/", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("index", { name: "André" });
    } else {
        console.log(req.user);
        res.send("Voce não pode!")
    }
})
**/

