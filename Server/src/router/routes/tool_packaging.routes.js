import { Router } from 'express';

import { isAdmin } from "../../controllers/admin.js";
import {all, one, add, update, remove} from '../../controllers/toolPackaging.js'

const router = Router();

router.get("/all", all);
router.get("/:id", one);

router.post("/add", add);

router.put("/update", update);

router.delete("/remove", remove);

export default router;