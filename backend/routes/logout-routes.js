import express from'express';
const router = express.Router();
import {logout} from "../controllers/logout-controller";

router.get("/", login);
export default router;