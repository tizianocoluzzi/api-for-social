import express from'express';
const router = express.Router();
import {login} from "../controllers/user-controller.js";

//router.post router.get ...


router.post("/", login);
export default router;