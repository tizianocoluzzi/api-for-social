import express from'express';
const login = express.Router();
import {signup} from "../controllers/user-controller";
import router from './user-routes';

//router.post router.get ...


router.post("/signup", signup);
export default router;