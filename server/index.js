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
const filepath = path_1.default.join(__dirname, "db", "data.json");
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "client", "build")));
app.use(express_1.default.json());
app.post("/api", (req, res) => {
    fs_1.default.writeFile(filepath, JSON.stringify(req.body, null, 4), (err) => {
        if (err)
            throw err;
    });
    res.json(req.body);
});
app.get("/api", (req, res) => {
    res.header("Content-Type", 'application/json');
    fs_1.default.readFile(filepath, 'utf8', (err, data) => {
        if (err)
            throw err;
        console.log(data);
        res.send(data);
    });
});
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "..", "client", "build", "index.html"));
});
app.listen(PORT, () => console.log(`server is running at http://localhost:${PORT}.`));
