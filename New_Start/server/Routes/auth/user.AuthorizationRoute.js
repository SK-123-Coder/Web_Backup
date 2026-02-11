// Verifying user and returning true or false route

import express from 'express'
import {userAuthVerifier} from '../../Middlewares/user.Authorization.js'

const userAuthVerifierRoute = express.Router();

userAuthVerifierRoute.get('/userVerify', userAuthVerifier);

export default userAuthVerifierRoute;