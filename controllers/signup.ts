import { Request, Response, NextFunction } from "express";
import pool from "../configs/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

// Register

export const signup = async (req: Request, res: Response) => {
    const { vorname, nachname, email, password } = req.body;
    try {
        // Checking if user is already present in database
      const data = await pool.query('SELECT * FROM users WHERE email = $1;', [email]);
      const arr = data.rows;
      if (arr.length !== 0) {
        return res.status(400).json({
          error: 'Email already exists, no need to register again.'
        });
      } else {
        // Hashing user Password
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({
              error: 'Server error'
            });
          } else {
            const user = {
              vorname,
              nachname,
              email,
              password: hash
            };

            // Inserting User Information in database
            let flag = 1; // Declaring a flag

            pool.query(
              'INSERT INTO users (vorname, nachname, email, password) VALUES ($1, $2, $3, $4);',
              [user.vorname, user.nachname, user.email, user.password],
              (err: Error) => {
                if (err) {
                  flag = 0; // If user is not inserted is not inserted to database assigning flag as 0/false.
                  console.error(err);
                  return res.status(500).json({
                    error: 'Database error'
                  });
                } else {
                  flag = 1;
                  res.status(200).send({ message: 'User added to database' });
                }
              }
            );
            // Signing JWT for each User
            if (flag) {
              const token = jwt.sign( //Signing a jwt token
                { email: user.email },
                process.env.SECRET_KEY as string
              );
            }
          }
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: 'Database error while registering user!' // Database connection error
      });
    }
  };
