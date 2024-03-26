const express = require("express");
const app = express();
const port = 8080;

const mongoose = require("mongoose");
const cors = require("cors");
const axios = require('axios');
const session = require("express-session");
const passport = require("passport")

const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const User = require('./models/user.js');


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const MONGO_URL = "mongodb://127.0.0.1:27017/resilience-radar"
async function main() {
    await mongoose.connect(MONGO_URL);
}

main()
    .then(() => {
        console.log("CONNECCTED TO DB");
    })
    .catch(err => {
        console.log("ERROR DURING DB CONNECTION : " + err);
    })


const sessionOption = {
    secret: "dsmp",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};


app.use(session(sessionOption));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.currUser = req.session.currUser || null;
    next();
});

app.get('/', (req, res) => {
    res.render("user/index.ejs");
});


app.get('/signup', (req, res) => {
    let currUser = ""
    res.render("user/signup.ejs", { currUser })
})

app.post('/signup', async (req, res) => {
    console.log(req.body);
    let { userName, latitude, longitude, email, password } = req.body;
    const ans = await getLocationData(latitude, longitude);
    // if (ans.country != "India") {
    //     res.send("not an indian user").status(400);
    // }
    let user = new User({
        userName: userName,
        address: {
            village: ans.village,
            county: ans.county,
            district: ans.state_district,
            state: ans.state,
            country: ans.country
        },
        email: email,
        password: password

    });
    user.save()
        .then((result) => {
            console.log(result)
        }).catch((err) => {
            console.log(err)
        })
    console.log(user);
    res.send("ok").status(200);
});

app.get("/login", (req, res) => {
    res.render("user/login.ejs")
})

// app.post('/login', async (req, res) => {
//     let { email, password } = req.body;
//     try {
//         let users = await User.find({ email: email }); // Using find, which returns an array

//         if (users.length > 0) {
//             let user = users[0]; // Access the first element of the array
//             console.log(user);
//             console.log(password + email);
//             console.log(user.password === password);

//             if (user.password === password) {
//                 res.locals.currUser = user;
//                 currUser = res.locals.currUser
//                 console.log(res.locals.currUser)
//                 //return res.send("Authorized user" + res.locals.currUser).status(200);
//                 res.render('user/signup.ejs');
//                 //res.send(currUser);
//             }
//         }

//         res.send("Unauthorized user").status(401);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Internal Server Error");
//     }
// });

app.post('/login', async (req, res) => {
    let { email, password } = req.body;
    console.log(req.body);
    return;
    try {
        let users = await User.find({ email: email });

        if (users.length > 0) {
            let user = users[0];

            if (user.password === password) {
                req.session.currUser = user; // Store currUser in the session
                res.locals.currUser = user;
                console.log(res.locals.currUser)
                res.render('user/signup.ejs')
            }
        }

        //res.send("Unauthorized user").status(401);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})

app.get('/query', (req, res) => {
    console.log(res.locals.currUser);
    if (!res.locals.currUser) {
        res.redirect('/login');
        return;
    }
    res.render('query/new.ejs', { currUser: (res.locals.currUser) })

});

app.post('/query', (req, res) => {

});

app.listen(port, () => {

    console.log(`Server is listening on port number ${port}`);

});

async function getLocationData(latitude, longitude) {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
    const response = await axios.get(url);
    return response.data.address;
}