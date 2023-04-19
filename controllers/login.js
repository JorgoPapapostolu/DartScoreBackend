"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const db_1 = __importDefault(require("../configs/db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Login function
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Checking if User registered to our application or not
    const { email, password } = req.body;
    try {
        const data = yield db_1.default.query(`SELECT * FROM users WHERE email= $1;`, [
            email,
        ]);
        const user = data.rows;
        if (user.length === 0) {
            res.status(400).json({
                error: "User is not registered, Sign Up first",
            });
        }
        else {
            // Comparing hashed Password with User Password
            bcrypt_1.default.compare(password, user[0].password, (err, result) => {
                if (err) {
                    res.status(500).json({
                        error: "Server error",
                    });
                }
                else if (result === true) {
                    //Checking if credentials match
                    const token = jsonwebtoken_1.default.sign({
                        email: email,
                    }, process.env.SECRET_KEY);
                    res.status(200).json({
                        message: "User signed in!",
                        token: token,
                    });
                }
                else {
                    // Returning error message
                    res.status(400).json({
                        error: "Enter correct password!",
                    });
                }
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error occurred while signing in!", //Database connection error
        });
    }
});
exports.login = login;
