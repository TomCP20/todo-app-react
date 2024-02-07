"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const PORT = 3001;
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "client", "build")));
app.use(express_1.default.json());
app.post("/api", (req, res) => {
    console.log(req.body);
    const filepath = path_1.default.join(__dirname, "db", "data.json");
    fs_1.default.writeFile(filepath, JSON.stringify(req.body), (err) => {
        if (err)
            throw err;
        console.log('Saved!');
    });
    res.json(req.body);
});
app.get("/api", (req, res) => {
    res.send({ message: "hello" });
});
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "..", "client", "build", "index.html"));
});
app.listen(PORT, () => console.log(`server is running at http://localhost:${PORT}.`));
