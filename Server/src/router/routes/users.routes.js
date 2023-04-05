import { Router } from 'express';

import {checkToken, signup, signin} from '../../controllers/users.js';
import { auth } from '../../middlewares/auth.js';


const router = Router();


router.get("/checkToken", auth, checkToken);


router.post("/signup", signup);
router.post("/signin", signin);





export default router;