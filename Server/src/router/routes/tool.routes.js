import { Router } from "express";
import {all, one, lastInserted, add_tool, add_toolPackaging, update, remove, toolsByCategory} from "../../controllers/tool.js";
import { isAdmin } from '../../middlewares/auth.js';

const router = Router();

router.get("/all", all);
router.get("/byCategory/:id", toolsByCategory);
router.get("/lastInserted", lastInserted);
router.get("/:val", one);

router.post("/add", isAdmin, add_tool);
router.post("/addPackaging", isAdmin, add_toolPackaging);

router.put("/update/:id", isAdmin, update);
router.delete("/remove/:id", isAdmin, remove);

export default router;