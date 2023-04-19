"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("./routes/users");
const app = (0, express_1.default)();
const db_1 = __importDefault(require("./configs/db"));
db_1.default.connect((err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Data logging initiated!");
    }
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/user", users_1.router);
exports.default = app;
