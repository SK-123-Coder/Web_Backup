// User login route

import express from 'express'
import {loginController} from '../../Controllers/Auth_Controller/user.loginAuth.js'

const userLoginRouter = express.Router();

userLoginRouter.post('/login', loginController);

export default userLoginRouter;