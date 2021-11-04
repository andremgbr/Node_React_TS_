import { stringify } from "querystring";
import { UsersService } from "./service/UsersService"

const usersService = new UsersService();

const LocalStrategy = require("passport-local");




var passport = require("passport");


passport.use(new LocalStrategy(
    async function (username, password, done) {
        console.log(username, password);
        const user = await usersService.findBycompanyId(username)
        if (user) {
            console.log("passou mizeravi");
            return done(null, user);
        } else {
            console.log("não passou!");

            return done(null, false, { message: "Incorrect username" });
        }
    }
));


passport.serializeUser(function (user, done) {
    console.log("tentando serializar o User...", user.id);
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    console.log("Deserializando esse user_id", id);
    const user = await usersService.findById(id)
    done(null, user);
});

module.exports = passport;