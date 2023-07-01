import { Router } from "express";
import {all, one, lastInserted, add_tool, add_toolPackaging, update, remove, toolsByCategory} from "../../controllers/tool.js";

const router = Router();

router.get("/all", all);
router.get("/byCategory/:id", toolsByCategory);
router.get("/lastInserted", lastInserted);
router.get("/:val", one);

router.post("/add", add_tool);
router.post("/addPackaging", add_toolPackaging);

router.put("/update/:id", update);
router.delete("/remove/:id", remove);

export default router;