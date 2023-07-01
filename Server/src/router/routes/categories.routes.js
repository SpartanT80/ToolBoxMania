import { Router } from 'express';
import {all, one, add, update, remove} from '../../controllers/categories.js';

const router = Router();


router.get("/all", all);
router.get("/:id", one);

router.post("/add", add);

router.put("/update", update);

router.delete("/remove", remove);

export default router;