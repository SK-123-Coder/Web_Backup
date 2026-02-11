//  User account recover controller route

import express from 'express'
import {accountRecoverController} from '../../Controllers/Auth_Controller/user.accountRecoverAuth.js'

const userAccountRecoverRouter = express.Router();

userAccountRecoverRouter.post('/accountRecover', accountRecoverController);

export default userAccountRecoverRouter;