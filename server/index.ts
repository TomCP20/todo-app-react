import express from "express"
import path from "path"

const app = express()
const PORT = 3001

app.use(express.static(path.join(__dirname, "..", "client", "build")))

app.get("/api", (req, res) => {
    res.send({ message: "hello"})
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"))
})

app.listen(PORT, ()=>console.log(`server is running at localhost:${PORT}.`))