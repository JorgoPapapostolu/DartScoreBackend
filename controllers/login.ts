import { Request, Response, NextFunction } from "express";
import pool from "../configs/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Login function

export const login = async (req: Request, res: Response) => {

    // Checking if User registered to our application or not
  const { email, password } = req.body;
  try {
    const data = await pool.query(`SELECT * FROM users WHERE email= $1;`, [
      email,
    ]); 
    const user = data.rows;
    if (user.length === 0) {
      res.status(400).json({
        error: "User is not registered, Sign Up first",
      });
    } else {

        // Comparing hashed Password with User Password
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (err) {
          res.status(500).json({
            error: "Server error",
          });
        } else if (result === true) {
          //Checking if credentials match
          const token = jwt.sign(
            {
              email: email,
            },
            process.env.SECRET_KEY as string
          );
          res.status(200).json({
            message: "User signed in!",
            token: token,
          });
        } else {
          // Returning error message
            res.status(400).json({
              error: "Enter correct password!",
            });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    });
  }
};
