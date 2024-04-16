import express from 'express';
const app = express();
const port = 8080;


import mongoose from 'mongoose';
import cors from 'cors';
import axios from 'axios';
import session from 'express-session';
import passport from 'passport';

import path from 'path';
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

import User from './models/user.js';
import Query from './models/query.js';

import authRoutes from './routes/auth.route.js';
import queryRoutes from './routes/query.route.js';

import govAuth from './routes/gov/auth.route.js';
import govQuerys from './routes/gov/query.route.js';
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

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

// app.use((req, res, next) => {
//     res.locals.currUser = req.session.currUser || null;
//     console.log(res.locals.currUser + " this person is logged in");
//     next();
// });

// app.get('currUser', (req, res) => {
//     res.send({ currUser: res.locals.currUser });
// });

app.get('/', (req, res) => {
    res.status(200).json({ message: "this is home route" });
});

app.use("/api/auth", authRoutes);
app.use("/api/query", queryRoutes);
app.use("/api/gov/auth", govAuth);
app.use("/api/gov/query", govQuerys);
// app.get('/Signup', (req, res) => {
//     let currUser = "" 
//     res.render("user/signup.ejs", { currUser })
// })

// app.post('/Signup', async (req, res) => {
//     console.log(req.body);
//     console.log("afjbhdb");
//     // res.send({ mess: "ok" });
//     // return;
//     let { userName, latitude, longitude, email, password } = req.body;
//     const ans = await getLocationData(latitude, longitude);
//     // if (ans.country != "India") {
//     //     res.send("not an indian user").status(400);
//     // }
//     let user = new User({
//         userName: userName,
//         address: {
//             village: ans.village,
//             county: ans.county,
//             district: ans.state_district,
//             state: ans.state,
//             country: ans.country
//         },
//         email: email,
//         password: password

//     });
//     user.save()
//         .then((result) => {
//             console.log(result)
//         }).catch((err) => {
//             console.log(err)
//         })
//     console.log(user);
//     res.send({ message: "success" }).status(200);
// });

app.get("/Login", (req, res) => {
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

app.post('/Login', async (req, res) => {
    let { email, password } = req.body;
    console.log(req.body);
    // return;
    try {
        let users = await User.find({ email: email, password: password });
        console.log("found user : " + users)
        if (users.length > 0) {
            let user = users[0];

            if (user.password === password) {
                req.session.currUser = user; // Store currUser in the session
                res.locals.currUser = user;
                console.log(res.locals.currUser)

                //res.render('user/signup.ejs', { currUser: res.locals.currUser, sessions: req.session.views })
                res.send({ currUser: res.locals.currUser }).status(200);
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

app.post('/query', async (req, res) => {
    console.log(req.body);
    let { latitude, longitude, raisedBy, description, img } = req.body;
    const ans = await getLocationData(latitude, longitude);
    console.log("this is ans : " + ans.country)
    //console.log("these are the info " + latitude)
    let query = new Query({
        raisedBy: raisedBy,
        address: {
            village: ans.village,
            county: ans.county,
            district: ans.state_district,
            state: ans.state,
            country: ans.country
        },
        description: description,
        img: img
    });

    query.save()
        .then((result) => {
            console.log(result)
        }).catch((err) => {
            console.log(err)
        })
    console.log(query);
    res.send({ mess: "ok" });
    return;
});

app.listen(port, () => {

    console.log(`Server is listening on port number ${port}`);

});

// async function getLocationData(latitude, longitude) {
//     const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
//     const response = await axios.get(url);
//     return response.data.address;
// }