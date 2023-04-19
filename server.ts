import express, { Application, Request, Response } from "express";
import { router } from './routes/users';
import cors from 'cors';

const app: Application = express();

import pool from "./configs/db";

pool.connect((err) => { // Connection Check
  if (err) {
    console.log(err);
  } else {
    console.log("Data logging initiated!");
  }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", router);

export default app;
