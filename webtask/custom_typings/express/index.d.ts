import { Request } from "express"

declare global {
    namespace Express {


        interface RequestUser {
            id: string;
        }

        export interface Request {
            user?: RequestUser;
        }
    }
}