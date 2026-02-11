// Handle search bar request route

import express from 'express'
import {SearchController} from '../../Controllers/Search_Controller/user.SearchController.js'

const searchRoute = express.Router();

searchRoute.post('/search', SearchController);

export default searchRoute;