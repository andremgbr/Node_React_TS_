import "reflect-metadata";
import { createConnection } from "typeorm";
import { http } from "./http";

createConnection().then(() => { console.log("Creating a Connection to DB") });

http.listen(3333, () => { console.log("Server is running on port 3333") });
