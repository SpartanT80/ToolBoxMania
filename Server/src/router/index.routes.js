import { Router } from "express";
import tool_routes from "./routes/tool.routes.js";
import packagings_routes from "./routes/packagings.routes.js";
import tool_packaging_routes from "./routes/tool_packaging.routes.js";
import categories_routes from "./routes/categories.routes.js";
import users_routes from "./routes/users.routes.js";
import {isAdmin, auth} from "../middlewares/auth.js";

const router = Router();


router
.use("/tool", auth, tool_routes)
.use("/packaging", auth, packagings_routes)
.use("/tool_packaging", auth, tool_packaging_routes)
.use("/category", auth, categories_routes)
.use("/user", users_routes);
router.use("/admin", isAdmin);


export default router;