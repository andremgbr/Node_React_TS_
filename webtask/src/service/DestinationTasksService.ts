import { getMongoRepository, ObjectID } from "typeorm";
import { Task } from "../entity/Task";
import { ObjectId } from "mongodb"
import { User } from "../entity/User";
import { DestinationTask } from "../entity/DestionationTask";

interface IDestionatioTaskCreate {
    task_id: string;
    user_id: string;
}

export class DestinationTasksService {

    async create({ task_id, user_id }: IDestionatioTaskCreate) {

        if (task_id && user_id) {

            const destinationTaskRepository = getMongoRepository(DestinationTask);

            const destionationTask = await destinationTaskRepository.create({
                task_id,
                user_id
            });

            console.log(destionationTask);

            await destinationTaskRepository.save(destionationTask);

            return destionationTask;

        } else {
            return false;
        }

    };

    async showAll() {

        const destinationTaskRepository = getMongoRepository(DestinationTask);
        const taskRepository = getMongoRepository(Task);
        const userRepository = getMongoRepository(User);

        const allDestionationTask = await destinationTaskRepository.find();

        for (var i = 0; i < allDestionationTask.length; i++) {
            const id_user = new ObjectId(allDestionationTask[i].user_id);
            const user = await userRepository.findByIds([id_user])
            delete allDestionationTask[i]["user_id"];
            allDestionationTask[i]["user"] = user[0];


            const task_id = new ObjectId(allDestionationTask[i].task_id);
            const project = await taskRepository.findByIds([task_id])
            delete allDestionationTask[i]["task_id"];
            allDestionationTask[i]["task"] = project[0];
        }

        return (allDestionationTask);
    }

    async findById(id: string) {

        const id_obj = new ObjectId(id);
        const destinationTaskRepository = getMongoRepository(DestinationTask);
        const destinationTask = await destinationTaskRepository.findByIds([id_obj]);


        return destinationTask[0];

    }

    async showByDestUserId(id: string) {

        //const id_obj = new ObjectId(id);
        //console.log("id_obj", id_obj)
        //console.log(id);

        const destinationTaskRepository = getMongoRepository(DestinationTask);
        const taskRepository = getMongoRepository(Task);
        const userRepository = getMongoRepository(User);

        const allDestionationTask = await destinationTaskRepository.find({
            where: {
                user_id: id.toString()
            }
        });

        console.log("Resultado encontrado",allDestionationTask);

        for (var i = 0; i < allDestionationTask.length; i++) {
            const id_user = new ObjectId(allDestionationTask[i].user_id);
            const user = await userRepository.findByIds([id_user])
            delete allDestionationTask[i]["user_id"];
            allDestionationTask[i]["user"] = user[0];


            const task_id = new ObjectId(allDestionationTask[i].task_id);
            const project = await taskRepository.findByIds([task_id])
            delete allDestionationTask[i]["task_id"];
            allDestionationTask[i]["task"] = project[0];

            const req_user_id = new ObjectId(project[0].req_user_id);
            const req_user = await userRepository.findByIds([req_user_id]);
            console.log(req_user);
            delete allDestionationTask[i]["task"]["req_user_id"];
            allDestionationTask[i]["task"]["req_user"] = req_user[0];

        }

        return (allDestionationTask);
    }


}