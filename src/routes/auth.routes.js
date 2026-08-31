import { Router } from "express";

import { validate } from "../middleware/validate.middleware.js";

import { loginSchema } from "../validators/auth.validator.js";

import * as authController from "../controllers/auth.controller.js"

const router = Router();

router.post(
    "/login",
    validate(loginSchema),
    authController.login
);  

export default router;