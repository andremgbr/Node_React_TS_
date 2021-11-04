import { createServer } from "http";
import { routes } from "./routes";


const session = require("express-session");
const express = require("express");
const bodyParser = require("body-parser")
const passport = require("./passport")
const cookieParser = require("cookie-parser");


var cors = require('cors');



const app = express();


app.use(cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
}))




/**

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', "http://localhost:3000");

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.header("Access-Control-Allow-Headers", "accept, content-type");
    res.header("Access-Control-Max-Age", "1728000");

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
**/

//app.use('/static', express.static(__dirname + './../my-app/public'));

//app.engine('jsx', require('express-react-views').createEngine());
//app.set('views', __dirname + "./../my-app/views");
//app.set('view engine', 'jsx');

app.use(cookieParser('keyboard cat'));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { _expires: 6000000000000, }

    //cookie: { secure: true }
}));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use((req, res, next) => {
    res.set("charset",'utf8');
    next();
})

app.use(routes);

const http = createServer(app);





export { http };