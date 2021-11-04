import { Request, Response } from "express";
import { DestinationTasksService } from "../service/DestinationTasksService";
import { ObjectId } from "mongodb";
import { User } from "../entity/User";

export class DestionationTasksController {
    async create(req: Request, res: Response) {
        const { task_id,user_id } = req.body;

        const destionationTaskService = new DestinationTasksService();

        const destionationTask = await destionationTaskService.create({
            task_id,
            user_id
        });

        if (destionationTask) {
            return res.json(destionationTask);

        } else {
            res.status(400)
            res.json({ "Error": "Faltando input inválido!" });
        }



    }

    async showAll(req: Request, res: Response) {

        const destionationTaskService = new DestinationTasksService();
        const allDestionationTask = await destionationTaskService.showAll();

        return res.json(allDestionationTask);

    }

    async showByDestUserId(req: Request, res: Response) {

        if (req.user) {

            const user_object_id = req.user["id"];

            //console.log("Este é o req.user -> ", user_object_id);

            const destionationTaskService = new DestinationTasksService();

            const destionationTask = await destionationTaskService.showByDestUserId(user_object_id);

            return res.json(destionationTask);
        } else {
            return res.status(404);
        }
    }

}

