import { Entity, ObjectIdColumn, ObjectID, Column, CreateDateColumn, JoinColumn, ManyToOne } from "typeorm";


@Entity("tasks")
export class Task {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    info: string;

    @Column()
    is_filed: boolean;

    @Column()
    situation: string;


    @Column()
    req_user_id: string;

    @Column()
    project_id: string ;


    @CreateDateColumn()
    created_at: Date;

    constructor(req_user_id,project_id) {

        if (!this.is_filed) {
            this.is_filed = false;
        }
        if (!this.situation) {
            this.situation = "ipg";
        }

    }

}