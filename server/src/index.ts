import express from "express"
import path from "path"
import fs from "fs"
import api from "./routes/api"
const app = express()
const PORT = 3001
const dataPath = path.join(__dirname, "..", "db", "data.json");
const buildPath = path.join(__dirname, "..", "..", "client", "build")

fs.promises.mkdir(path.dirname(dataPath), {recursive: true})
    .then(() => fs.promises.writeFile(dataPath, "[]", { flag: 'wx' }))
    .catch((e) => { console.error("Database exists."); })



app.use(express.static(buildPath))

app.use(express.json())

app.use("/api", api)

app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"))
})

app.listen(PORT, () => console.log(`server is running at http://localhost:${PORT}.`))