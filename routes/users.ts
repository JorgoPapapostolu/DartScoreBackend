import express, { Router } from 'express';
import { signup } from '../controllers/signup';
// import { login } from '../controllers/login';

export const router: Router = Router();

router.post('/signup', signup); // POST Request to register 
// router.post('/login', login); // POST Request to login

