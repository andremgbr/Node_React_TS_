import { Entity, ObjectIdColumn, ObjectID, Column, CreateDateColumn} from "typeorm";

@Entity("users")
export class User {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    companyId: string;

    @Column()
    sha256_password: string;


    @CreateDateColumn()
    created_at: Date;

    constructor() {
    }

}