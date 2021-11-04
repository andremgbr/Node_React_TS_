import { getMongoRepository } from "typeorm";
import { Project } from "../entity/Project";

export class ProjectsService {



    async create(name:string) {

        if (name) {

            const projectRepository = getMongoRepository(Project);

            const projectExist = await projectRepository.findOne({
                name
            })

            if (projectExist) {
                return false;
            }

            const project = await projectRepository.create({
                name

            })

            await projectRepository.save(project)

            return project;

        } else {
            return false;
        }

    };

    async showAll() {

        const projectRepository = getMongoRepository(Project);

        const allProjects = projectRepository.find()

        return allProjects;
    }

    async showProjectByName(name: string) {
        const projectRepository = getMongoRepository(Project);

        const project = projectRepository.findOne({
            name
        });

        return project;

    }

}