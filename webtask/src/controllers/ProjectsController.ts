import { Request, Response } from "express";
import { ProjectsService } from "../service/ProjectsService"

export class ProjectsController {
    async create(req: Request, res: Response) {
        const { name } = req.body;

        const projectsService = new ProjectsService();

    
        const project = await projectsService.create(name);

        if (project) {
            return res.json(project);

        } else {
            res.status(400)
            res.json({ "Error": "Faltando input inválido!" });
        }



    }

    async showAll(req: Request, res: Response) {

        const projectsService = new ProjectsService();

        const allProjects = await projectsService.showAll();

        console.log(req.params);

        return res.json(allProjects);

    }

}

