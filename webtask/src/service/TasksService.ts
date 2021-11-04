import { EntityRepository, getMongoRepository, ObjectID, Repository } from "typeorm";
import { Task } from "../entity/Task";
import { ObjectId } from "mongodb"
import { User } from "../entity/User";
import { Project } from "../entity/Project";
import { DestinationTask } from "../entity/DestionationTask";

interface ITaskCreate {
    name: string;
    info?: string;
    is_filed?: boolean;
    situation?: string;
    req_user_id: string;
    project_id: string;
}

@EntityRepository(Task)
export class TasksService extends Repository<Task>{

    async createManual({ name, info, is_filed, situation, project_id, req_user_id }: ITaskCreate) {


        if (name && project_id && req_user_id) {

            const taskRepository = getMongoRepository(Task);

            const task = await taskRepository.create({
                name,
                info,
                is_filed,
                situation,
                req_user_id,
                project_id

            });

            console.log(task);

            await taskRepository.save(task);

            return task;

        } else {
            return false;
        }

    };

    async showAll() {

        const taskRepository = getMongoRepository(Task);
        const userRepository = getMongoRepository(User);
        const projectRepository = getMongoRepository(Project);



        const allTask = await taskRepository.find();


        for (var i = 0; i < allTask.length; i++) {
            const id_user = new ObjectId(allTask[i].req_user_id);
            const user = await userRepository.findByIds([id_user])
            delete allTask[i]["req_user_id"];
            allTask[i]["user"] = user[0];


            const id_project = new ObjectId(allTask[i].project_id);
            const project = await projectRepository.findByIds([id_project])
            delete allTask[i]["project_id"];
            allTask[i]["project"] = project[0];
        }

        return (allTask);
    }

    async taskById(id, full: boolean) {
        const taskRepository = getMongoRepository(Task);
        const userRepository = getMongoRepository(User);
        const projectRepository = getMongoRepository(Project);

        console.log("id no serviço", id);
        try {
            const id_obj = new ObjectId(id);

        } catch (err) {
            return (null);
        }

        const id_obj = new ObjectId(id);


        const taskFind = await taskRepository.findByIds([id_obj]);

        var task = taskFind[0];

        if (full) {

            const id_user = new ObjectId(task.req_user_id);
            const user = await userRepository.findByIds([id_user])
            delete task["req_user_id"];
            task["user"] = user[0];


            const id_project = new ObjectId(task.project_id);
            const project = await projectRepository.findByIds([id_project])
            delete task["project_id"];
            task["project"] = project[0];
        }

        return task;
    }

    async putTaks(taskObj) {
        const taskRepository = getMongoRepository(Task);
        const updated  = await taskRepository.save(taskObj);
        return updated;
    }

    async delById(id) {
        const taskRepository = getMongoRepository(Task);
        const destinationTask = getMongoRepository(DestinationTask)

        console.log("id no serviço", id);
        try {
            const id_obj = new ObjectId(id);

        } catch (err) {
            return (null);
        }

        const id_obj = new ObjectId(id);


        const taskFind = await taskRepository.findByIds([id_obj]);


        const destionationTasks = await destinationTask.find({
            where: {
                task_id: id
            }
        });

        console.log(destionationTasks);
        destionationTasks.forEach(async item => {
            await destinationTask.delete(item)
        });

        await taskRepository.delete(taskFind[0]);

    }


    async showByOwnerUserId(id: string) {

        //const id_obj = new ObjectId(id);
        //console.log("id_obj", id_obj)
        //console.log(id);

        const projectRepository = getMongoRepository(Project);
        const taskRepository = getMongoRepository(Task);
        const userRepository = getMongoRepository(User);

        const UserOwnerTask = await taskRepository.find({
            where: {
                req_user_id: id.toString()
            }
        });

        console.log("Resultado encontrado", UserOwnerTask);

        for (var i = 0; i < UserOwnerTask.length; i++) {
            const id_user = new ObjectId(UserOwnerTask[i].req_user_id);
            const user = await userRepository.findByIds([id_user])
            delete UserOwnerTask[i]["req_user_id"];
            UserOwnerTask[i]["req_user"] = user[0];


            const id_project = new ObjectId(UserOwnerTask[i].project_id);
            const project = await projectRepository.findByIds([id_project])
            delete UserOwnerTask[i]["project_id"];
            UserOwnerTask[i]["project"] = project[0];
        }

        return (UserOwnerTask);
    }

}