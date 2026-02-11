// Decoding jwt token and return it route

import express from 'express'
import {userAuthDetail} from "../../Middlewares/user.AuthDetaile.js"

const userAuthDetailSender = express.Router();

userAuthDetailSender.get('/user', userAuthDetail);

export default userAuthDetailSender;