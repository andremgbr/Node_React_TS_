import { Request, Response } from "express";
import { UsersService } from "../service/UsersService"

export class UsersController {
    async create(req: Request, res: Response) {

        const { firstName, lastName, sha256_password, companyId } = req.body;

        const usersService = new UsersService();
        const user = await usersService.create(firstName, lastName, sha256_password, companyId);
        if (user) {

            return res.json(user);

        } else {
            res.status(400)
            res.json({ "Error": "User with companyId already exist or missing inputs" });
            return res;
        }

    }

    async showAll(req: Request, res: Response) {

        const usersService = new UsersService();

        const allUsers = await usersService.showAll();

        return res.json(allUsers);

    }

}

