import express from'express';
const router = express.Router();
//import {getAllUser, signup, login} from "../controllers/user-controller";
import {getAllUser} from "../controllers/user-controller";

//router.post router.get ...

router.get("/", getAllUser);
//router.post("/signup", signup);
//router.post("/login", login);
export default router;
