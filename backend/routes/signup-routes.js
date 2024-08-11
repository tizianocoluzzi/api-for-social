import express from'express';
const login = express.Router();
import {signup} from "../controllers/user-controller.js";
import router from './user-routes.js';

//router.post router.get ...


router.post("/", signup);
export default router;