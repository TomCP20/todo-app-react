import express from "express"
import path from "path"
import fs from "fs"

const app = express()
const PORT = 3001
const dataDirPath = path.join(__dirname, "..", "db");
const dataPath = path.join(dataDirPath, "data.json");
const buildPath = path.join(__dirname, "..", "..", "client", "build")

if (!fs.existsSync(dataDirPath)){
    fs.mkdirSync(dataDirPath);
}

fs.stat(dataPath, (err, stat) => {
    if (err != null && err.code === 'ENOENT') {
        fs.writeFile(dataPath, "[]", (err) => {
            if (err) throw err;
        });
    }
});

app.use(express.static(buildPath))

app.use(express.json())

app.post("/api", (req, res) => {
    fs.writeFile(dataPath, JSON.stringify(req.body, null, 4), (err) => {
        if (err) throw err;
    });
    res.json(req.body);
})

app.get("/api", (req, res) => {
    res.header("Content-Type", 'application/json');
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) throw err;
        res.send(data)
    })
})

app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"))
})

app.listen(PORT, () => console.log(`server is running at http://localhost:${PORT}.`))