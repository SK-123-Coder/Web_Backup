// Authentication of admin for dashboard route

import express from 'express'
import {adminAuthController} from "../../Controllers/Auth_Controller/admin.AuthController.js"

const adminAuthRoute = express.Router();

adminAuthRoute.post('/adminAuth', adminAuthController);

export default adminAuthRoute;