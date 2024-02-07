import express from "express"
import path from "path"
import fs from "fs"

const app = express()
const PORT = 3001
const filepath = path.join(__dirname, "..", "db", "data.json");

app.use(express.static(path.join(__dirname, "..", "..", "client", "build")))

app.use(express.json())

app.post("/api", (req, res) => {
    fs.writeFile(filepath, JSON.stringify(req.body, null, 4), (err) => {
        if (err) throw err;
    });
    res.json(req.body);
})

app.get("/api", (req, res) => {
    res.header("Content-Type",'application/json');
    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data)
        res.send(data)
    })
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"))
})

app.listen(PORT, () => console.log(`server is running at http://localhost:${PORT}.`))