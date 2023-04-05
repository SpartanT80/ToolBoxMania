import { Router } from 'express';

import { isAdmin } from "../../controllers/admin.js";
import {all, one, add, update, remove} from '../../controllers/categories.js'

const router = Router();

router.get("/all", all);
router.get("/:id", one);

router.post("/add", add);

router.put("/update", isAdmin, update);

router.delete("/remove", isAdmin, remove);

export default router;