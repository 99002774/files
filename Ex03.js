const app = require('express')();
const parser = require("body-parser");
const fs = require("fs");
const dir = __dirname;

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());


let User = [];
let flag = 1;

function readData() {
    const filename = "data.json"; //new file... 
    const jsonContent = fs.readFileSync(filename, 'utf-8');
    User = JSON.parse(jsonContent);
}

function saveData() {
    const filename = "data.json";
    const jsonData = JSON.stringify(User);
    fs.writeFileSync(filename, jsonData, 'utf-8');
}
app.get("/User", (req, res) => {
    readData();
    res.send(JSON.stringify(User));
})

app.get("/User/:id", (req, res) => {
    const Userid = req.params.id;
    if (User.length == 0) {
        readData();
    }
    let foundRec = User.find((e) => e.UserId == Userid);
    if (foundRec == null)
        throw "User not found";
    res.send(JSON.stringify(foundRec))
})



app.post('/User', (req, res) => {
    if (User.length == 0)
        readData();
    let body = req.body;
    for (let index = 0; index < User.length; index++) {
        let element = User[index];
        if (element.UserName == body.UserName) { //find the matching record
            res.send("User name already exists");
            flag = flag + 1;
        }
        flag = 0;
    }
    if (flag == 0) {
        User.push(body);
        saveData(); //updating to the JSON file...
        res.send("User added successfully");
    }

})


app.listen(3001, () => {
    console.log("Server available at 3001");
})