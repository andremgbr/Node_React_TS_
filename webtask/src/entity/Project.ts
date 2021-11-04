import {Entity, ObjectIdColumn, ObjectID, Column, PrimaryColumn, CreateDateColumn, OneToMany} from "typeorm";
import {v4 as uuid} from"uuid"
import { Task } from "./Task";


@Entity("projects")
export class Project {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
     
    }

}