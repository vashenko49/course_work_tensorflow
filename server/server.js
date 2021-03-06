const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const bodyParser = require('body-parser');
const passport = require('passport');
const run = require('./train/main');

const app = express();


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


new Promise(async (resolve, reject) => {
    try {
        await mongoose.connect("mongodb+srv://sergey:vashenko@cluster0-zdqsh.mongodb.net/courser_work?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
        resolve();
    } catch (e) {
        reject(e);
    }
}).then(res => {
    app.use(passport.initialize());
    require("./passport")(passport);
}).catch(err => {
    console.log("Error connect to database!");
    process.exit(1);
});

app.use("/api/user", require('./routes/Users'));

app.get("/model.json", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./modelTF/model.json"));
});
app.get("/weights.bin", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./modelTF/weights.bin"));
});

app.use(express.static("../client/build"));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../", "client/build/index.html"));
});

const PORT = process.env.PORT || 5000;
module.exports = app.listen(PORT, () => {
    console.log('Server has been started')
});

if (process.env.NODE_TRAIN) {
    run(100, 64, './modelTF');
}


