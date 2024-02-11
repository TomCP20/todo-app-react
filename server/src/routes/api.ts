import express from "express"
import path from "path"
import fs from "fs"
import {isValidList} from "shared"


const router = express.Router()
const dataPath = path.join(__dirname, "..", "..", "db", "data.json");


router.post("/", (req, res) => {
    if (isValidList(req.body)) {
        fs.writeFile(dataPath, JSON.stringify(req.body, null, 4), (err) => { if (err) { throw err; } });
        res.json(req.body);
    }
    else {
        res.status(400);
        res.send(`Invalid type from client: ${req.body}.`);
        console.log(`Invalid type from client: ${req.body}.`)
    }
})

router.get("/", (req, res) => {
    res.header("Content-Type", 'application/json');
    fs.readFile(dataPath, 'utf8', (err, data) => { if (err) { throw err; } res.send(data) })
})

export default router