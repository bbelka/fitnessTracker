const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitnessDB", { useNewUrlParser: true });

app.get("/", (req, res) => {
    res.render("index.html")
})

app.post("/api/plans", (req, res) => {
    db.Plan.create({ name: req.body.name })
        .then(dbPlan => {
            console.log(dbPlan);
            res.redirect("/index.html")
        })
        .catch(({ message }) => {
            console.log(message);
        });
})

app.get("/api/exercises", (req, res) => {
    db.Exercise.find({})
        .then(dbExercise => {
            res.redirect("/index.html")
        })
        .catch(err => {
            res.json(err);
        });
});

app.get("/api/plans", (req, res) => {
    db.Plan.find({})
        .then(dbPlan => {
            res.json(dbPlan);
        })
        .catch(err => {
            res.json(err);
        });
});

app.post("/api/exercises", (req, res) => {
    let planName = req.body.plan;
    db.Exercise.create({
        name: req.body.name,
        type: req.body.type,
        weight: req.body.weight,
        sets: req.body.sets,
        reps: req.body.reps,
        distance: req.body.distance,
        duration: req.body.duration
    })
        .then(({ _id }) => db.Plan.findOneAndUpdate({ name: planName }, { $push: { exercises: _id } }, { new: true }))
        .then(dbPlan => {
            res.redirect("/index.html")
        })
        .catch(err => {
            res.json(err);
        });
});

app.get("/populated/:name", (req, res) => {
    console.log(req.body.name);
    
    db.Plan.findOne({
        name:req.params.name
    })
        .populate("exercises")
        .then(dbUser => {
            res.json(dbUser);
        })
        .catch(err => {
            res.json(err);
        });
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
