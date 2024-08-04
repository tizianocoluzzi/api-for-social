import express from'express';
const router = express.Router();
import {login} from "../controllers/user-controller";

//router.post router.get ...


router.post("/login", login);
export default router;