// Get data controller route

import express from 'express'
import {getAdminNotifications} from '../../Controllers/Dashboard/admin.getNotification.js'

const getNotification = express.Router();

getNotification.get('/getNotification', getAdminNotifications);

export default getNotification;