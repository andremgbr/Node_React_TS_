import {Entity, ObjectIdColumn, ObjectID, Column, CreateDateColumn} from "typeorm";

@Entity("destinationTasks")
export class DestinationTask {

    @ObjectIdColumn()
    id: ObjectID;


    @Column()
    task_id: string

    @Column()
    user_id: string

    @CreateDateColumn()
    created_at: Date;

    constructor() {
    }

}