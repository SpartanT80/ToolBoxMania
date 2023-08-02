import { Router } from 'express';
import {all, one, add, update, remove} from '../../controllers/categories.js';
import { isAdmin } from '../../middlewares/auth.js';

const router = Router();


router.get("/all", all);
router.get("/:id", one);

router.post("/add", isAdmin, add);

router.put("/update", isAdmin, update);

router.delete("/remove", isAdmin, remove);

export default router;