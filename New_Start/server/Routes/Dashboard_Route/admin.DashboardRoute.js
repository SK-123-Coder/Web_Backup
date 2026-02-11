// Admin dashboard server statics route

import express from 'express'
import {getSystemInfo} from "../../Controllers/Dashboard/admin.Dashboard.js"

const systemInfo_Route = express.Router();

systemInfo_Route.get('/systemInfo', getSystemInfo);

export default systemInfo_Route;