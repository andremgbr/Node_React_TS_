import { getMongoRepository } from "typeorm";
import { User } from "../entity/User";
import { ObjectId } from "mongodb";

export class UsersService {



    async create(firstName: string, lastName: string, sha256_password: string, companyId: string) {

        if (firstName && lastName && lastName && sha256_password && companyId) {

            const userRepository = getMongoRepository(User);

            const userExist = await userRepository.findOne({
                companyId
            })

            if (userExist) {
                return false;
            }

            const user = await userRepository.create({
                firstName,
                lastName,
                sha256_password,
                companyId,

            })

            await userRepository.save(user)

            return user;

        } else {
            return false;
        }

    };

    async showAll() {

        const userRepository = getMongoRepository(User);

        const allUsers = userRepository.find()

        return allUsers;
    }

    async findBycompanyId(companyId: string) {

        const userRepository = getMongoRepository(User);

        const user = await userRepository.findOne({
            companyId
        });

        return user;

    }

    async findById(id: string) {

        const id_obj = new ObjectId(id);

        const userRepository = getMongoRepository(User);

        const user = await userRepository.findByIds([id_obj]);


        return user[0];

    }

}