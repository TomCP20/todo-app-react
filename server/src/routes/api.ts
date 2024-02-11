import express from "express"
import path from "path"
import fs from "fs"


const router = express.Router()
const dataPath = path.join(__dirname, "..", "..", "db", "data.json");


router.post("/", (req, res) => {
    fs.writeFile(dataPath, JSON.stringify(req.body, null, 4), (err) => {
        if (err) throw err;
    });
    res.json(req.body);
})

router.get("/", (req, res) => {
    res.header("Content-Type", 'application/json');
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) throw err;
        res.send(data)
    })
})

export default router