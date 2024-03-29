const mongoDBConnectionString = "mongodb+srv://dbUser:seneconnectUserPassword@seneconnect.ttyedir.mongodb.net/SeneConnect?retryWrites=true&w=majority";
const HTTP_PORT = process.env.PORT || 8080;

const express = require("express");
const bodyParser = require('body-parser');

const cors = require("cors");
const dataService = require("./modules/data-service.js");

const data = dataService(mongoDBConnectionString);
const app = express();

app.use(express.static('public'));

const jwt = require('jsonwebtoken');
const passport = require("passport");
const passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");

jwtOptions.secretOrKey = 'rTJrzG4!b5Cnq*M91l!6#QuYxfL^J&Ch!w7L$kis2QglSGOd0F';

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);

    if (jwt_payload) {
        next(null, {
            _id: jwt_payload._id,
            email: jwt_payload.email,
            userName: jwt_payload.userName,
            password: jwt_payload.password
        });
    } else {
        next(null, false);
    }
});

passport.use(strategy);

app.use(passport.initialize());

app.use(bodyParser.json());
app.use(cors());

app.post("/api/posts", async (req, res) => {
    data.addNewPost(req.body).then((msg) => {
        res.json({ message: msg });
    }).catch((err) => {
        res.json({ message: `an error occurred: ${err}` });
    });
});

app.post("/api/users", async (req, res) => {
    data.addNewUser(req.body).then((msg) => {
        res.json({ message: msg });
    }).catch((err) => {
        res.status(422).json({ message: `an error occurred: ${err}` });
    });
});

app.post("/api/profiles", async (req, res) => {
    data.addNewProfile(req.body).then((msg) => {
        res.json({ message: msg });
    }).catch((err) => {
        res.status(422).json({ message: `an error occurred: ${err}` });
    });
});

app.post("/api/login", async (req, res) => {
    data.LoginUser(req.body).then((user) => {
        var payload = {
            _id: user._id,
            email: user.email,
            userName: user.userName,
            password: user.password
        };

        var token = jwt.sign(payload, jwtOptions.secretOrKey);

        var isAdmin = false;

        if (user.userName == "admin") {
            isAdmin = true;
        }

        res.json({ message: "login successful", token: token, isAdmin: isAdmin, username: user.userName });
    }).catch((err) => {
        res.status(422).json({ message: JSON.stringify(err) });
    });
});

app.get("/api/posts", async (req, res) => {
    data.getAllPosts(req.query.page, req.query.perPage).then((data) => {
        res.json(data);
    })
        .catch((err) => {
            res.json({ message: `an error occurred: ${err}` });
        })
});

app.get("/api/users", async (req, res) => {
    data.getAllUsers().then((data) => {
        res.json(data);
    })
        .catch((err) => {
            res.json({ message: `an error occurred: ${err}` });
        })
});

app.get("/api/posts/:id", async (req, res) => {
    data.getPostById(req.params.id).then(data => {
        res.json(data);
    }).catch((err) => {
        res.json({ message: `an error occurred: ${err}` });
    });
});

app.get("/api/users/:id", async (req, res) => {
    data.getUserById(req.params.id).then(data => {
        res.json(data);
    }).catch((err) => {
        res.json({ message: `an error occurred: ${err}` });
    });
});

app.get("/api/profiles/:userName", async (req, res) => {
    data.getProfileByUsername(req.params.userName).then(data => {
        res.json(data);
    }).catch((err) => {
        res.json({ message: `an error occurred: ${err}` });
    });
});

app.get("/api/users/username/:userName", async (req, res) => {
    data.getUserByUserName(req.params.userName).then(data => {
        res.json(data);
    }).catch((err) => {
        res.json({ message: `an error occurred: ${err}` });
    });
});

app.put("/api/posts/:id", (req,res)=>{
    data.updatePostById(req.body,req.params.id).then((msg)=>{
        res.json({message: msg});
    }).catch((err)=>{
        res.json({message: `an error occurred: ${err}`, body: req.body, params: req.params.id});
    });
});

app.put("/api/profiles/:id", (req,res)=>{
    data.updateProfileById(req.body,req.params.id).then((msg)=>{
        res.json({message: msg});
    }).catch((err)=>{
        res.json({message: `an error occurred: ${err}`, body: req.body, params: req.params.id});
    });
});

app.delete("/api/posts/:id", async (req, res) => {
    data.deletePostById(req.params.id).then((msg) => {
        res.json({ message: msg });
    }).catch((err) => {
        res.json({ message: `an error occurred: ${err}` });
    });
});

app.delete("/api/users/:id", async (req, res) => {
    data.deleteUserById(req.params.id).then((msg) => {
        res.json({ message: msg });
    }).catch((err) => {
        res.json({ message: `an error occurred: ${err}` });
    });
});

// Connect to the DB and start the server

data.connect().then(() => {
    app.listen(HTTP_PORT, () => { console.log("API listening on: " + HTTP_PORT) });
})
    .catch((err) => {
        console.log("unable to start the server: " + err);
        process.exit();
    });
//testing

module.exports = app;
