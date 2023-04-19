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
exports.signup = void 0;
const db_1 = __importDefault(require("../configs/db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Register
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { vorname, nachname, email, password } = req.body;
    try {
        // Checking if user is already present in database
        const data = yield db_1.default.query('SELECT * FROM users WHERE email = $1;', [email]);
        const arr = data.rows;
        if (arr.length !== 0) {
            return res.status(400).json({
                error: 'Email already exists, no need to register again.'
            });
        }
        else {
            // Hashing user Password
            bcrypt_1.default.hash(password, 10, (err, hash) => {
                if (err) {
                    res.status(500).json({
                        error: 'Server error'
                    });
                }
                else {
                    const user = {
                        vorname,
                        nachname,
                        email,
                        password: hash
                    };
                    // Inserting User Information in database
                    let flag = 1; // Declaring a flag
                    db_1.default.query('INSERT INTO users (vorname, nachname, email, password) VALUES ($1, $2, $3, $4);', [user.vorname, user.nachname, user.email, user.password], (err) => {
                        if (err) {
                            flag = 0; // If user is not inserted is not inserted to database assigning flag as 0/false.
                            console.error(err);
                            return res.status(500).json({
                                error: 'Database error'
                            });
                        }
                        else {
                            flag = 1;
                            res.status(200).send({ message: 'User added to database' });
                        }
                    });
                    // Signing JWT for each User
                    if (flag) {
                        const token = jsonwebtoken_1.default.sign(//Signing a jwt token
                        { email: user.email }, process.env.SECRET_KEY);
                    }
                }
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Database error while registering user!' // Database connection error
        });
    }
});
exports.signup = signup;
