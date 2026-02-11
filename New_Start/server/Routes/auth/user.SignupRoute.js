// User signup route

import express from 'express'
import { signUpController } from '../../Controllers/Auth_Controller/user.signUpAuth.js';

const userSignupRouter = express.Router();

userSignupRouter.post('/signup', signUpController);

export default userSignupRouter;