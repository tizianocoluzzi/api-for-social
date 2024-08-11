import express from'express';
import { def } from '../controllers/default-controller.js';
const router = express.Router();


router.get("/", def);
export default router;