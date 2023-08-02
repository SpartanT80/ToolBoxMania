import { Router } from 'express';
import {checkToken, signup, signin, update} from '../../controllers/users.js';
import { auth } from '../../middlewares/auth.js';

const router = Router();

router.get("/checkToken", auth, checkToken);

router.post("/signup", signup);
router.post("/signin", signin);

router.put("/update/:id", auth, update);

export default router;