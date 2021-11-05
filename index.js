const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const port = 80;

// EJS specific
app.set("view engine", "ejs");

// Express specific
app.use("/static", express.static("static"));
app.use(express.urlencoded());

// BODY PARSER
app.use(bodyParser.urlencoded({ extended: true }));

let todoDaily = [];
let completedDaily = [];

let todoWeekly = [];
let completedWeekly = [];

let todoMonthly = [];
let completedMonthly = [];
// End points
app.get("/", (req, res) => {
    res.status(200).render("daily.ejs", { todolist: todoDaily, completedList: completedDaily });
});
app.post("/dailyPost", (req, res) => {
    if (req.body.newTask.length != 0)
        todoDaily.push(req.body.newTask);
    res.redirect("/");
});
app.post("/dailyRemove", (req, res) => {
    let obj = req.body.check;
    if (typeof obj == "string") {
        completedDaily.push(obj);
        todoDaily.splice(todoDaily.indexOf(obj), 1);
    }
    else if (typeof obj == "object") {
        for (let i = 0; i < obj.length; i++) {
            completedDaily.push(obj[i]);
            todoDaily.splice(todoDaily.indexOf(obj[i]), 1);
        }
    }
    res.redirect("/");
});
app.post("/resetDaily", (req, res) => {
    todoDaily = [];
    completedDaily = [];
    res.redirect("/");
})

app.get("/weekly", (req, res) => {
    res.status(200).render("week.ejs", { todolist: todoWeekly, completedList: completedWeekly });
});
app.post("/weeklyPost", (req, res) => {
    if (req.body.newTask.length != 0)
        todoWeekly.push(req.body.newTask);
    res.redirect("/weekly");
});
app.post("/weeklyRemove", (req, res) => {
    let obj = req.body.check;
    if (typeof obj == "string") {
        completedWeekly.push(obj);
        todoWeekly.splice(todoWeekly.indexOf(obj), 1);
    }
    else if (typeof obj == "object") {
        for (let i = 0; i < obj.length; i++) {
            completedWeekly.push(obj[i]);
            todoWeekly.splice(todoWeekly.indexOf(obj[i]), 1);
        }
    }
    res.redirect("/weekly");
})
app.post("/resetWeekly", (req, res) => {
    todoWeekly = [];
    completedWeekly = [];
    res.redirect("/weekly");
})


app.get("/monthly", (req, res) => {
    res.status(200).render("month.ejs", { todolist: todoMonthly, completedList: completedMonthly});
});
app.post("/monthlyPost", (req, res) => {
    if (req.body.newTask.length != 0)
        todoMonthly.push(req.body.newTask);
    res.redirect("/monthly");
});
app.post("/monthlyRemove", (req, res) => {
    let obj = req.body.check;
    if (typeof obj == "string") {
        completedMonthly.push(obj);
        todoMonthly.splice(todoMonthly.indexOf(obj), 1);
    }
    else if (typeof obj == "object") {
        for (let i = 0; i < obj.length; i++) {
            completedMonthly.push(obj[i]);
            todoMonthly.splice(todoMonthly.indexOf(obj[i]), 1);
        }
    }
    res.redirect("/monthly");
})
app.post("/resetMonthly", (req, res) => {
    todoMonthly = [];
    completedMonthly = [];
    res.redirect("/monthly");
})

// listen
app.listen(port, (err) => {
    if (err) {
        console.log(err);
        throw err;
    }
    console.log(`http://localhost:${port}`)
})