import { Router } from "express";
import tool_routes from "./routes/tool.routes.js";
import packagings_routes from "./routes/packagings.routes.js";
import tool_packaging_routes from "./routes/tool_packaging.routes.js";
import categories_routes from "./routes/categories.routes.js";
import users_routes from "./routes/users.routes.js";

const router = Router();

router.use("/tool", tool_routes);
router.use("/packaging", packagings_routes);
router.use("/tool_packaging", tool_packaging_routes);
router.use("/category", categories_routes);
router.use("/user", users_routes);

export default router;