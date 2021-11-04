import { Request, Response } from "express";
import { ProjectsService } from "../service/ProjectsService";
import { TasksService } from "../service/TasksService"
import { UsersService } from "../service/UsersService";

export class TasksController {
    async create(req: Request, res: Response) {

        const { name, info, is_filed, situation, project_id, req_user_id } = req.body;
        const tasksService = new TasksService();


        const project = await tasksService.createManual({
            name,
            info,
            is_filed,
            situation,
            project_id,
            req_user_id
        });

        if (project) {
            return (
                res.json(project));
        } else {
            res.status(400)
            res.json({ "Error": "Faltando input ou inválido!" });
        }



    }

    async showAll(req: Request, res: Response) {

        const tasksService = new TasksService();
        const allTasks = await tasksService.showAll();
        return res.json(allTasks);

    }


    async showTaskUser(req: Request, res: Response) {
        if (req.user) {
            const tasksService = new TasksService();

            const allTasks = await tasksService.showAll();
            return res.json(allTasks);

        } else {

            return res.status(404);
        }
    }
    async showByOwnerUserId(req: Request, res: Response) {

        if (req.user) {

            const user_object_id = req.user["id"];

            console.log("Este é o req.user -> ", user_object_id);

            const TaskService = new TasksService();

            const Task = await TaskService.showByOwnerUserId(user_object_id);

            return res.json(Task);
        } else {
            return res.status(404);
        }
    }



    async getByid(req: Request, res: Response) {
        if (req.user) {

            const tasksService = new TasksService();

            console.log(req.params.id);
            const task = await tasksService.taskById(req.params.id, true);
            if (task) {
                return res.json(task);
            } else {
                return (res.status(404), res.send({ "Error": "Task não encontrada" }))
            }

        } else {

            return res.status(404), res.send({ "Error": "Usuário não logado" });
        }

    }

    async putByid(req: Request, res: Response) {

        if (req.user) {

            const tasksService = new TasksService();

            const { info, situation } = req.body;

            console.log("Modificando  ", req.params.id, "Com task Service-->", tasksService);

            const task = await tasksService.taskById(req.params.id, false);

            console.log(task);

            if (task) {
                task.info = info;
                task.situation = situation;
                console.log("Tentativa de save do task-->", task, "E tasksService", tasksService)
                const result = await tasksService.putTaks(task);
                console.log("O result do resutl --> ", result);
                return (res.status(200), res.send(result));
            } else {
                return (res.status(404), res.send({ "Error": "Task não encontrada" }))
            }
        } else {
            return res.status(404), res.send({ "Error": "Usuário não logado" });
        }
    }

    async delByid(req: Request, res: Response) {
        if (req.user) {
            console.log("Executando o delte do ID-->", req.params.id)
            const tasksService = new TasksService();

            const task = await tasksService.delById(req.params.id);

            return (res.status(200));

        } else {
            return res.status(404), res.send({ "Error": "Usuário não logado" });
        }
    }

}

