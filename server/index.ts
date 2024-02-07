import express from "express"
import path from "path"
import fs from "fs"

const app = express()
const PORT = 3001

app.use(express.static(path.join(__dirname, "..", "client", "build")))

app.use(express.json())

app.post("/api", (req, res) => {
    console.log(req.body);
    const filepath = path.join(__dirname, "db", "data.json");
    fs.writeFile(filepath, JSON.stringify(req.body), (err) => {
        if (err) throw err;
        console.log('Saved!');
    });
    res.json(req.body);
})

app.get("/api", (req, res) => {
    res.send({ message: "hello" })
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"))
})

app.listen(PORT, () => console.log(`server is running at http://localhost:${PORT}.`))