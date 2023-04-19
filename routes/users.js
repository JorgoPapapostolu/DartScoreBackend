"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const signup_1 = require("../controllers/signup");
const login_1 = require("../controllers/login");
exports.router = (0, express_1.Router)();
exports.router.post('/signup', signup_1.signup); // POST Request to register 
exports.router.post('/login', login_1.login); // POST Request to login
