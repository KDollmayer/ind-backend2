

const express = require("express")
const cors = require("cors")
const { authUser } = require("./controllers/auth.js");

const app = express()


app.use(cors());
app.use(express.json());
app.use(authUser);
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes/userRoutes'))
app.use('/', require('./routes/todoRoutes'))

app.get("/", (req, res) => {
    res.send("helloo")
})


module.exports = app