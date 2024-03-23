const express = require("express");
const app = express();
const port = 8080;

const mongoose = require("mongoose");
const cors = require("cors");
const axios = require('axios');

const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const User = require('./models/user.js');

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

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', (req, res) => {
    res.send('this is home route');
});


app.get('/test', (req, res) => {
    res.render("user.ejs")
})

app.post('/test', async (req, res) => {
    console.log(req.body);
    let { userName, latitude, longitude } = req.body;
    const ans = await getLocationData(latitude, longitude);
    let user = new User({
        userName: userName,
        address: {
            village: ans.village,
            county: ans.county,
            district: ans.state_district,
            state: ans.state,
            country: ans.country
        }
    });

    user.save()
        .then((result) => {
            console.log(result)
        }).catch((err) => {
            console.log(err)
        })
    console.log(user);
    res.send(ans);
})


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

async function getLocationData(latitude, longitude) {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
    const response = await axios.get(url);
    return response.data.address;
}